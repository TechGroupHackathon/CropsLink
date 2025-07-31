"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Camera, CheckCircle, X, AlertCircle, Loader2 } from "lucide-react"

interface SimpleFileUploadProps {
  onFileUpload: (file: File, type: "front" | "back") => void
  uploadedFiles: {
    front?: { file: File; preview: string } | null
    back?: { file: File; preview: string } | null
  }
  errors: {
    front?: string
    back?: string
  }
  isProcessing: boolean
}

export default function SimpleFileUpload({ onFileUpload, uploadedFiles, errors, isProcessing }: SimpleFileUploadProps) {
  const frontInputRef = useRef<HTMLInputElement>(null)
  const backInputRef = useRef<HTMLInputElement>(null)

  const handleFrontClick = () => {
    frontInputRef.current?.click()
  }

  const handleBackClick = () => {
    backInputRef.current?.click()
  }

  const handleFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file, "front")
    }
    // Reset input value to allow re-uploading same file
    e.target.value = ""
  }

  const handleBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file, "back")
    }
    // Reset input value to allow re-uploading same file
    e.target.value = ""
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-6 w-6" />
          Aadhar Card Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please upload clear, high-quality images of your Aadhar card. Supported formats: JPEG, PNG, WebP (Max 5MB
            each)
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Front Side Upload */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Aadhar Front Side *</Label>

            {!uploadedFiles.front ? (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer"
                onClick={handleFrontClick}
              >
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-4">Click to upload front side</p>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isProcessing}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleFrontClick()
                  }}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Camera className="h-4 w-4 mr-2" />
                      Choose File
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={uploadedFiles.front.preview || "/placeholder.svg"}
                  alt="Aadhar Front"
                  className="w-full h-48 object-cover rounded-lg border"
                />
                <div className="absolute top-2 right-2">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      URL.revokeObjectURL(uploadedFiles.front!.preview)
                      // You'll need to implement removeFile function
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 flex items-center text-green-600 text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  File uploaded successfully
                </div>
              </div>
            )}

            <input
              ref={frontInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFrontChange}
              style={{ display: "none" }}
              disabled={isProcessing}
            />

            {errors.front && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.front}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Back Side Upload */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Aadhar Back Side *</Label>

            {!uploadedFiles.back ? (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer"
                onClick={handleBackClick}
              >
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-4">Click to upload back side</p>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isProcessing}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleBackClick()
                  }}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Camera className="h-4 w-4 mr-2" />
                      Choose File
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={uploadedFiles.back.preview || "/placeholder.svg"}
                  alt="Aadhar Back"
                  className="w-full h-48 object-cover rounded-lg border"
                />
                <div className="absolute top-2 right-2">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      URL.revokeObjectURL(uploadedFiles.back!.preview)
                      // You'll need to implement removeFile function
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 flex items-center text-green-600 text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  File uploaded successfully
                </div>
              </div>
            )}

            <input
              ref={backInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleBackChange}
              style={{ display: "none" }}
              disabled={isProcessing}
            />

            {errors.back && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.back}</AlertDescription>
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
}
