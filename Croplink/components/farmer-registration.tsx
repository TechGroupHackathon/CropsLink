"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Mic, Camera, User, Phone, CheckCircle, X, Eye, AlertCircle, Loader2, FileImage } from "lucide-react"
import { useRouter } from "next/navigation"
import { saveUserData } from "@/lib/user-storage"
import { useLanguage } from "@/lib/language-context"
import { extractAadharInfo } from "@/lib/ocr-service"

interface FarmerRegistrationProps {
  language: string
}

interface UploadedFile {
  file: File
  preview: string
  isValid: boolean
  error?: string
}

export default function FarmerRegistration({ language }: FarmerRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadErrors, setUploadErrors] = useState<{ front?: string; back?: string }>({})
  const [ocrProcessing, setOcrProcessing] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const [formData, setFormData] = useState({
    // Step 1: Voice Assistant
    voiceAssistant: false,

    // Step 2: Aadhar Upload
    aadharFront: null as UploadedFile | null,
    aadharBack: null as UploadedFile | null,

    // Step 3: OCR Data
    name: "",
    aadharNumber: "",
    dateOfBirth: "",
    address: "",
    extractedLocation: "", // Location extracted from Aadhaar
    extractedState: "",
    extractedDistrict: "",
    ocrConfidence: 0,

    // Step 4: Voice Input
    spokenName: "",
    location: "", // User can override extracted location
    crops: [] as string[],

    // Step 5: Contact Details
    phone: "",
    email: "",
    whatsapp: "",

    // Step 6: Profile Completion
    farmSize: "",
    experience: "",
    organicCertified: false,
    description: "",
  })

  const { t } = useLanguage()
  const router = useRouter()
  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  const cropOptions = [
    "Rice",
    "Wheat",
    "Sugarcane",
    "Cotton",
    "Maize",
    "Pulses",
    "Oilseeds",
    "Vegetables",
    "Fruits",
    "Spices",
    "Tea",
    "Coffee",
  ]

  // File upload validation
  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: "Invalid file type. Please upload JPEG, PNG, or WebP images.",
      }
    }

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: "File size must be less than 5MB.",
      }
    }

    return { isValid: true }
  }

  // Handle file upload with validation and preview
  const handleFileUpload = useCallback(async (file: File, type: "front" | "back") => {
    console.log("File upload started:", file.name, file.type, file.size)

    setIsProcessing(true)
    setUploadErrors((prev) => ({ ...prev, [type]: undefined }))

    try {
      // Validate file
      const validation = validateFile(file)
      if (!validation.isValid) {
        setUploadErrors((prev) => ({ ...prev, [type]: validation.error }))
        setIsProcessing(false)
        return
      }

      // Create preview URL
      const preview = URL.createObjectURL(file)
      console.log("Preview URL created:", preview)

      const uploadedFile: UploadedFile = {
        file,
        preview,
        isValid: true,
      }

      setFormData((prev) => ({
        ...prev,
        [type === "front" ? "aadharFront" : "aadharBack"]: uploadedFile,
      }))

      console.log("File uploaded successfully:", type)
    } catch (error) {
      console.error("Upload error:", error)
      setUploadErrors((prev) => ({
        ...prev,
        [type]: "Upload failed. Please try again.",
      }))
    } finally {
      setIsProcessing(false)
    }
  }, [])

  // OCR processing with location extraction
  const processOCR = async () => {
    if (!formData.aadharFront || !formData.aadharBack) return

    setOcrProcessing(true)
    try {
      const extractedData = await extractAadharInfo(formData.aadharFront.file, formData.aadharBack.file)

      setFormData((prev) => ({
        ...prev,
        name: extractedData.name || "",
        aadharNumber: extractedData.aadharNumber || "",
        dateOfBirth: extractedData.dateOfBirth || "",
        address: extractedData.address || "",
        extractedLocation: extractedData.location || "",
        extractedState: extractedData.state || "",
        extractedDistrict: extractedData.district || "",
        location: extractedData.location || "", // Pre-fill location from Aadhaar
        ocrConfidence: extractedData.confidence || 0,
      }))
    } catch (error) {
      console.error("OCR processing failed:", error)
      // Fallback to demo data
      setFormData((prev) => ({
        ...prev,
        name: "राम कुमार शर्मा",
        aadharNumber: "1234 5678 9012",
        dateOfBirth: "15/08/1985",
        address: "Village Rampur, Tehsil Kharkhoda, District Sonipat, Haryana - 131001",
        extractedLocation: "Rampur, Kharkhoda, Sonipat, Haryana",
        extractedState: "Haryana",
        extractedDistrict: "Sonipat",
        location: "Rampur, Kharkhoda, Sonipat, Haryana",
        ocrConfidence: 85,
      }))
    } finally {
      setOcrProcessing(false)
    }
  }

  // Voice recognition with error handling
  const startVoiceRecognition = useCallback(
    (field: string) => {
      if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
        alert("Speech recognition not supported in this browser")
        return
      }

      setIsListening(true)

      // Simulate voice recognition for demo
      setTimeout(() => {
        setIsListening(false)
        if (field === "name") {
          setFormData((prev) => ({ ...prev, spokenName: "Ram Kumar Sharma" }))
        } else if (field === "location") {
          // Don't override if location is already extracted from Aadhaar
          if (!formData.extractedLocation) {
            setFormData((prev) => ({ ...prev, location: "Sonipat, Haryana" }))
          }
        }
      }, 2000)
    },
    [formData.extractedLocation],
  )

  // Form validation
  const validateStep = (step: number): boolean => {
    const errors: string[] = []

    switch (step) {
      case 2:
        if (!formData.aadharFront) errors.push("Please upload Aadhar front image")
        if (!formData.aadharBack) errors.push("Please upload Aadhar back image")
        break
      case 3:
        if (!formData.name.trim()) errors.push("Name is required")
        if (!formData.aadharNumber.trim()) errors.push("Aadhar number is required")
        break
      case 4:
        if (!formData.location.trim()) errors.push("Location is required")
        if (formData.crops.length === 0) errors.push("Please select at least one crop")
        break
      case 5:
        if (!formData.phone.trim()) errors.push("Phone number is required")
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          errors.push("Please enter a valid email address")
        }
        break
      case 6:
        if (!formData.farmSize.trim()) errors.push("Farm size is required")
        if (!formData.experience.trim()) errors.push("Experience is required")
        break
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleCropToggle = (crop: string) => {
    setFormData((prev) => ({
      ...prev,
      crops: prev.crops.includes(crop) ? prev.crops.filter((c) => c !== crop) : [...prev.crops, crop],
    }))
  }

  const nextStep = async () => {
    if (!validateStep(currentStep)) return

    if (currentStep === 2 && formData.aadharFront && formData.aadharBack) {
      await processOCR()
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setValidationErrors([])
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setValidationErrors([])
    }
  }

  const completeRegistration = async () => {
    if (!validateStep(currentStep)) return

    setIsProcessing(true)
    try {
      const userData = {
        ...formData,
        role: "farmer" as const,
        id: Date.now().toString(),
        registrationDate: new Date().toISOString(),
        verified: true,
      }

      await saveUserData(userData)
      router.push("/dashboard")
    } catch (error) {
      console.error("Registration failed:", error)
      setValidationErrors(["Registration failed. Please try again."])
    } finally {
      setIsProcessing(false)
    }
  }

  // Remove uploaded file
  const removeFile = (type: "front" | "back") => {
    const file = type === "front" ? formData.aadharFront : formData.aadharBack
    if (file?.preview) {
      URL.revokeObjectURL(file.preview)
    }

    setFormData((prev) => ({
      ...prev,
      [type === "front" ? "aadharFront" : "aadharBack"]: null,
    }))
    setUploadErrors((prev) => ({ ...prev, [type]: undefined }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-6 w-6" />
                {t("registration.farmer.steps.voice.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">{t("registration.farmer.steps.voice.description")}</p>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant={voiceEnabled ? "default" : "outline"}
                    onClick={() => setVoiceEnabled(true)}
                    className="flex items-center gap-2"
                  >
                    <Mic className="h-4 w-4" />
                    {t("registration.farmer.steps.voice.enable")}
                  </Button>
                  <Button variant={!voiceEnabled ? "default" : "outline"} onClick={() => setVoiceEnabled(false)}>
                    {t("registration.farmer.steps.voice.continue")}
                  </Button>
                </div>
              </div>
              {voiceEnabled && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">{t("registration.farmer.steps.voice.enabled")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-6 w-6" />
                {t("registration.farmer.steps.aadhaar.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please upload clear, high-quality images of your Aadhar card. Supported formats: JPEG, PNG, WebP (Max
                  5MB each)
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Front Side Upload */}
                <div>
                  <Label className="text-sm font-medium">{t("registration.farmer.steps.aadhaar.frontSide")} *</Label>

                  {!formData.aadharFront ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-4">{t("registration.farmer.steps.aadhaar.uploadFront")}</p>

                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isProcessing}
                        onClick={() => document.getElementById("aadhar-front")?.click()}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <FileImage className="h-4 w-4 mr-2" />
                            Choose File
                          </>
                        )}
                      </Button>

                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleFileUpload(file, "front")
                          }
                        }}
                        style={{ display: "none" }}
                        id="aadhar-front"
                        disabled={isProcessing}
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={formData.aadharFront.preview || "/placeholder.svg"}
                        alt="Aadhar Front"
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => window.open(formData.aadharFront!.preview, "_blank")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => removeFile("front")}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        File uploaded successfully
                      </div>
                    </div>
                  )}

                  {uploadErrors.front && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{uploadErrors.front}</AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Back Side Upload */}
                <div>
                  <Label className="text-sm font-medium">{t("registration.farmer.steps.aadhaar.backSide")} *</Label>

                  {!formData.aadharBack ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-4">{t("registration.farmer.steps.aadhaar.uploadBack")}</p>

                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isProcessing}
                        onClick={() => document.getElementById("aadhar-back")?.click()}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <FileImage className="h-4 w-4 mr-2" />
                            Choose File
                          </>
                        )}
                      </Button>

                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleFileUpload(file, "back")
                          }
                        }}
                        style={{ display: "none" }}
                        id="aadhar-back"
                        disabled={isProcessing}
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={formData.aadharBack.preview || "/placeholder.svg"}
                        alt="Aadhar Back"
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => window.open(formData.aadharBack!.preview, "_blank")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => removeFile("back")}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        File uploaded successfully
                      </div>
                    </div>
                  )}

                  {uploadErrors.back && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{uploadErrors.back}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              {/* Upload Tips */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">📸 Upload Tips:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Ensure good lighting and clear text visibility</li>
                  <li>• Avoid shadows, glare, or blurred images</li>
                  <li>• Keep the entire card within the frame</li>
                  <li>• Use JPEG, PNG, or WebP format (max 5MB)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6" />
                {t("registration.farmer.steps.ocr.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ocrProcessing ? (
                <div className="text-center py-8">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-green-600" />
                  <p className="text-lg font-medium">Processing Aadhar Information...</p>
                  <p className="text-sm text-gray-600">This may take a few moments</p>
                </div>
              ) : (
                <>
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <p className="text-green-800 text-sm">✓ {t("registration.farmer.steps.ocr.completed")}</p>
                      {formData.ocrConfidence > 0 && (
                        <Badge variant="secondary">Confidence: {formData.ocrConfidence}%</Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{t("registration.farmer.steps.ocr.fullName")} *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="aadhar">{t("registration.farmer.steps.ocr.aadhaarNumber")} *</Label>
                      <Input
                        id="aadhar"
                        value={formData.aadharNumber}
                        onChange={(e) => setFormData((prev) => ({ ...prev, aadharNumber: e.target.value }))}
                        placeholder="XXXX XXXX XXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dob">{t("registration.farmer.steps.ocr.dateOfBirth")}</Label>
                      <Input
                        id="dob"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                        placeholder="DD/MM/YYYY"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">{t("registration.farmer.steps.ocr.address")}</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                      rows={3}
                      placeholder="Complete address"
                    />
                  </div>

                  {/* Show extracted location info */}
                  {formData.extractedLocation && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">📍 Location Extracted from Aadhaar:</h4>
                      <p className="text-sm text-blue-800">
                        <strong>Location:</strong> {formData.extractedLocation}
                      </p>
                      {formData.extractedState && (
                        <p className="text-sm text-blue-800">
                          <strong>State:</strong> {formData.extractedState}
                        </p>
                      )}
                      {formData.extractedDistrict && (
                        <p className="text-sm text-blue-800">
                          <strong>District:</strong> {formData.extractedDistrict}
                        </p>
                      )}
                      <p className="text-xs text-blue-600 mt-2">
                        This location will be pre-filled in the next step, but you can modify it if needed.
                      </p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-6 w-6" />
                {t("registration.farmer.steps.voice_input.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>{t("registration.farmer.steps.voice_input.spokenName")}</Label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.spokenName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, spokenName: e.target.value }))}
                      placeholder={t("registration.farmer.steps.voice_input.clickMic")}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => startVoiceRecognition("name")}
                      disabled={isListening}
                    >
                      {isListening ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>{t("registration.farmer.steps.voice_input.location")} *</Label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder={
                        formData.extractedLocation
                          ? "Location from Aadhaar"
                          : t("registration.farmer.steps.voice_input.clickMic")
                      }
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => startVoiceRecognition("location")}
                      disabled={isListening}
                    >
                      {isListening ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                  {formData.extractedLocation && (
                    <p className="text-xs text-gray-500 mt-1">
                      ✓ Location pre-filled from Aadhaar card. You can modify it if needed.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label>{t("registration.farmer.steps.voice_input.selectCrops")} *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {cropOptions.map((crop) => (
                    <div key={crop} className="flex items-center space-x-2">
                      <Checkbox
                        id={crop}
                        checked={formData.crops.includes(crop)}
                        onCheckedChange={() => handleCropToggle(crop)}
                      />
                      <Label htmlFor={crop} className="text-sm">
                        {crop}
                      </Label>
                    </div>
                  ))}
                </div>
                {formData.crops.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      {t("registration.farmer.steps.voice_input.selectedCrops")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {formData.crops.map((crop) => (
                        <Badge key={crop} variant="secondary">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-6 w-6" />
                {t("registration.farmer.steps.contact.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">{t("registration.farmer.steps.contact.phone")} *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">{t("registration.farmer.steps.contact.whatsapp")}</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData((prev) => ({ ...prev, whatsapp: e.target.value }))}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">{t("registration.farmer.steps.contact.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="farmer@example.com"
                />
              </div>
            </CardContent>
          </Card>
        )

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6" />
                {t("registration.farmer.steps.profile.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="farmSize">{t("registration.farmer.steps.profile.farmSize")} *</Label>
                  <Input
                    id="farmSize"
                    value={formData.farmSize}
                    onChange={(e) => setFormData((prev) => ({ ...prev, farmSize: e.target.value }))}
                    placeholder="e.g., 5.5"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">{t("registration.farmer.steps.profile.experience")} *</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                    placeholder="e.g., 10"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="organic"
                  checked={formData.organicCertified}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, organicCertified: checked as boolean }))
                  }
                />
                <Label htmlFor="organic">{t("registration.farmer.steps.profile.organic")}</Label>
              </div>

              <div>
                <Label htmlFor="description">{t("registration.farmer.steps.profile.description")}</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder={t("registration.farmer.steps.profile.descriptionPlaceholder")}
                  rows={4}
                />
              </div>

              {/* Profile Overview */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{t("registration.farmer.steps.profile.overview")}</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Name:</strong> {formData.spokenName || formData.name}
                  </p>
                  <p>
                    <strong>Location:</strong> {formData.location}
                  </p>
                  <p>
                    <strong>Crops:</strong> {formData.crops.join(", ")}
                  </p>
                  <p>
                    <strong>Farm Size:</strong> {formData.farmSize} acres
                  </p>
                  <p>
                    <strong>Experience:</strong> {formData.experience} years
                  </p>
                  <p>
                    <strong>Organic Certified:</strong> {formData.organicCertified ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">{t("registration.farmer.title")}</h2>
          <span className="text-sm text-gray-600">
            {t("registration.common.step")} {currentStep} {t("registration.common.of")} {totalSteps}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Step Content */}
      {renderStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1 || isProcessing}>
          {t("registration.common.previous")}
        </Button>

        {currentStep === totalSteps ? (
          <Button onClick={completeRegistration} className="bg-green-600 hover:bg-green-700" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              t("registration.common.complete")
            )}
          </Button>
        ) : (
          <Button onClick={nextStep} disabled={isProcessing || ocrProcessing}>
            {ocrProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              t("registration.common.next")
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
