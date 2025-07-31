"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Mic, User, MapPin, Phone, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"

interface DistributorRegistrationProps {
  language: string
}

export default function DistributorRegistration({ language }: DistributorRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1: Voice Assistant
    voiceAssistant: false,

    // Step 2: Basic Information
    businessName: "",
    ownerName: "",
    businessType: "",

    // Step 3: Contact Details
    phone: "",
    email: "",
    whatsapp: "",
    address: "",

    // Step 4: Business Details
    state: "",
    district: "",
    cropsInterested: [] as string[],
    minOrderQuantity: "",

    // Step 5: Profile Completion
    experience: "",
    description: "",
    certifications: [] as string[],
  })

  const router = useRouter()
  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100
  const { t } = useLanguage()

  const cropOptions = [
    { key: "rice", label: t("common.crops.rice") },
    { key: "wheat", label: t("common.crops.wheat") },
    { key: "sugarcane", label: t("common.crops.sugarcane") },
    { key: "cotton", label: t("common.crops.cotton") },
    { key: "maize", label: t("common.crops.maize") },
    { key: "pulses", label: t("common.crops.pulses") },
    { key: "oilseeds", label: t("common.crops.oilseeds") },
    { key: "vegetables", label: t("common.crops.vegetables") },
    { key: "fruits", label: t("common.crops.fruits") },
    { key: "spices", label: t("common.crops.spices") },
    { key: "tea", label: t("common.crops.tea") },
    { key: "coffee", label: t("common.crops.coffee") },
  ]

  const stateOptions = [
    "Andhra Pradesh",
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "Gujarat",
    "Rajasthan",
    "Madhya Pradesh",
    "Uttar Pradesh",
    "West Bengal",
    "Punjab",
  ]

  const businessTypes = [
    { key: "wholesale", label: t("common.businessTypes.wholesale") },
    { key: "retail", label: t("common.businessTypes.retail") },
    { key: "export", label: t("common.businessTypes.export") },
    { key: "processing", label: t("common.businessTypes.processing") },
    { key: "cooperative", label: t("common.businessTypes.cooperative") },
    { key: "individual", label: t("common.businessTypes.individual") },
  ]

  const certificationOptions = [
    "FSSAI License",
    "Import/Export License",
    "Organic Certification",
    "ISO Certification",
    "HACCP Certification",
  ]

  const handleCropToggle = (crop: string) => {
    setFormData((prev) => ({
      ...prev,
      cropsInterested: prev.cropsInterested.includes(crop)
        ? prev.cropsInterested.filter((c) => c !== crop)
        : [...prev.cropsInterested, crop],
    }))
  }

  const handleCertificationToggle = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter((c) => c !== cert)
        : [...prev.certifications, cert],
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeRegistration = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "distributor",
          ...formData,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem("farmconnect_user", JSON.stringify(data.user))
        router.push("/dashboard")
      } else {
        console.error("Registration failed:", data.error)
      }
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-6 w-6" />
                {t("registration.distributor.steps.voice.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">{t("registration.distributor.steps.voice.description")}</p>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant={voiceEnabled ? "default" : "outline"}
                    onClick={() => setVoiceEnabled(true)}
                    className="flex items-center gap-2"
                  >
                    <Mic className="h-4 w-4" />
                    {t("registration.distributor.steps.voice.enable")}
                  </Button>
                  <Button variant={!voiceEnabled ? "default" : "outline"} onClick={() => setVoiceEnabled(false)}>
                    {t("registration.distributor.steps.voice.continue")}
                  </Button>
                </div>
              </div>
              {voiceEnabled && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">{t("registration.distributor.steps.voice.enabled")}</p>
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
                <User className="h-6 w-6" />
                {t("registration.distributor.steps.basic.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">{t("registration.distributor.steps.basic.businessName")}</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                    placeholder="Enter business name"
                  />
                </div>
                <div>
                  <Label htmlFor="ownerName">{t("registration.distributor.steps.basic.ownerName")}</Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, ownerName: e.target.value }))}
                    placeholder="Enter owner name"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="businessType">{t("registration.distributor.steps.basic.businessType")}</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, businessType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("registration.distributor.steps.basic.selectType")} />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type.key} value={type.label}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-6 w-6" />
                {t("registration.distributor.steps.contact.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">{t("registration.distributor.steps.contact.phone")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">{t("registration.distributor.steps.contact.whatsapp")}</Label>
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
                <Label htmlFor="email">{t("registration.distributor.steps.contact.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="distributor@example.com"
                />
              </div>
              <div>
                <Label htmlFor="address">{t("registration.distributor.steps.contact.address")}</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  placeholder={t("registration.distributor.steps.contact.addressPlaceholder")}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6" />
                {t("registration.distributor.steps.business.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">{t("registration.distributor.steps.business.state")}</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, state: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("registration.distributor.steps.business.selectState")} />
                    </SelectTrigger>
                    <SelectContent>
                      {stateOptions.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="district">{t("registration.distributor.steps.business.district")}</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => setFormData((prev) => ({ ...prev, district: e.target.value }))}
                    placeholder={t("registration.distributor.steps.business.districtPlaceholder")}
                  />
                </div>
              </div>

              <div>
                <Label>{t("registration.distributor.steps.business.cropsInterested")}</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {cropOptions.map((crop) => (
                    <div key={crop.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={crop.key}
                        checked={formData.cropsInterested.includes(crop.key)}
                        onCheckedChange={() => handleCropToggle(crop.key)}
                      />
                      <Label htmlFor={crop.key} className="text-sm">
                        {crop.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {formData.cropsInterested.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      {t("registration.distributor.steps.business.selectedCrops")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {formData.cropsInterested.map((crop) => (
                        <Badge key={crop} variant="secondary">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="minOrder">{t("registration.distributor.steps.business.minOrder")}</Label>
                <Input
                  id="minOrder"
                  value={formData.minOrderQuantity}
                  onChange={(e) => setFormData((prev) => ({ ...prev, minOrderQuantity: e.target.value }))}
                  placeholder="e.g., 50"
                />
              </div>
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6" />
                {t("registration.distributor.steps.completion.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="experience">{t("registration.distributor.steps.completion.experience")}</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                  placeholder="e.g., 10"
                />
              </div>

              <div>
                <Label>{t("registration.distributor.steps.completion.certifications")}</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {certificationOptions.map((cert) => (
                    <div key={cert} className="flex items-center space-x-2">
                      <Checkbox
                        id={cert}
                        checked={formData.certifications.includes(cert)}
                        onCheckedChange={() => handleCertificationToggle(cert)}
                      />
                      <Label htmlFor={cert} className="text-sm">
                        {cert}
                      </Label>
                    </div>
                  ))}
                </div>
                {formData.certifications.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      {t("registration.distributor.steps.completion.selectedCerts")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {formData.certifications.map((cert) => (
                        <Badge key={cert} variant="secondary">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="description">{t("registration.distributor.steps.completion.description")}</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder={t("registration.distributor.steps.completion.descriptionPlaceholder")}
                  rows={4}
                />
              </div>

              {/* Profile Overview */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{t("registration.distributor.steps.completion.overview")}</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>{t("registration.distributor.steps.completion.business")}:</strong> {formData.businessName}
                  </p>
                  <p>
                    <strong>{t("registration.distributor.steps.completion.owner")}:</strong> {formData.ownerName}
                  </p>
                  <p>
                    <strong>{t("registration.distributor.steps.completion.type")}:</strong> {formData.businessType}
                  </p>
                  <p>
                    <strong>{t("registration.distributor.steps.completion.location")}:</strong> {formData.district},{" "}
                    {formData.state}
                  </p>
                  <p>
                    <strong>{t("registration.distributor.steps.completion.crops")}:</strong>{" "}
                    {formData.cropsInterested.join(", ")}
                  </p>
                  <p>
                    <strong>{t("registration.distributor.steps.completion.minOrder")}:</strong>{" "}
                    {formData.minOrderQuantity} tons
                  </p>
                  <p>
                    <strong>{t("registration.distributor.steps.completion.exp")}:</strong> {formData.experience} years
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
          <h2 className="text-2xl font-bold">{t("registration.distributor.title")}</h2>
          <span className="text-sm text-gray-600">
            {t("registration.common.step")} {currentStep} {t("registration.common.of")} {totalSteps}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      {renderStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          {t("registration.common.previous")}
        </Button>

        {currentStep === totalSteps ? (
          <Button onClick={completeRegistration} disabled={isProcessing} className="bg-blue-600 hover:bg-blue-700">
            {isProcessing ? "Registering..." : t("registration.common.complete")}
          </Button>
        ) : (
          <Button onClick={nextStep}>{t("registration.common.next")}</Button>
        )}
      </div>
    </div>
  )
}
