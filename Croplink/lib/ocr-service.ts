// OCR Service for Aadhar card information extraction

export interface AadharInfo {
  name?: string
  aadharNumber?: string
  dateOfBirth?: string
  address?: string
  location?: string // Extracted location from address
  state?: string
  district?: string
  pincode?: string
  confidence: number
}

export interface ValidationResult {
  isValid: boolean
  error?: string
}

// Extract location components from address
function extractLocationFromAddress(address: string): {
  location?: string
  state?: string
  district?: string
  pincode?: string
} {
  if (!address) return {}

  // Common patterns for Indian addresses
  const statePattern =
    /(Punjab|Haryana|Maharashtra|Gujarat|Karnataka|Tamil Nadu|Uttar Pradesh|Rajasthan|Madhya Pradesh|West Bengal|Andhra Pradesh|Kerala|Odisha|Bihar|Jharkhand|Assam|Chhattisgarh|Himachal Pradesh|Uttarakhand|Goa|Manipur|Meghalaya|Mizoram|Nagaland|Sikkim|Tripura|Arunachal Pradesh)/i
  const districtPattern = /District\s+([A-Za-z\s]+)|Dist\.?\s+([A-Za-z\s]+)|([A-Za-z\s]+)\s+District/i
  const pincodePattern = /(\d{6})/
  const tehsilPattern = /Tehsil\s+([A-Za-z\s]+)|Teh\.?\s+([A-Za-z\s]+)/i
  const villagePattern = /Village\s+([A-Za-z\s]+)|Vill\.?\s+([A-Za-z\s]+)/i

  const stateMatch = address.match(statePattern)
  const districtMatch = address.match(districtPattern)
  const pincodeMatch = address.match(pincodePattern)
  const tehsilMatch = address.match(tehsilPattern)
  const villageMatch = address.match(villagePattern)

  const state = stateMatch?.[1]?.trim()
  const district = districtMatch?.[1] || districtMatch?.[2] || districtMatch?.[3]
  const pincode = pincodeMatch?.[1]
  const tehsil = tehsilMatch?.[1] || tehsilMatch?.[2]
  const village = villageMatch?.[1] || villageMatch?.[2]

  // Create a readable location string
  let location = ""
  if (village) location += village
  if (tehsil && location) location += ", " + tehsil
  else if (tehsil) location = tehsil
  if (district && location) location += ", " + district
  else if (district) location = district
  if (state && location) location += ", " + state
  else if (state) location = state

  return {
    location: location || undefined,
    state: state?.trim(),
    district: district?.trim(),
    pincode,
  }
}

// Validate if uploaded image is a valid Aadhar card
export async function validateAadharImage(file: File): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        resolve({ isValid: false, error: "Unable to process image" })
        return
      }

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      // Basic validation checks
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      // Check image dimensions (Aadhar cards have specific aspect ratios)
      const aspectRatio = img.width / img.height
      if (aspectRatio < 1.4 || aspectRatio > 1.8) {
        resolve({
          isValid: false,
          error: "Image doesn't appear to be an Aadhar card. Please check the aspect ratio.",
        })
        return
      }

      // Check if image is too dark or too bright
      const pixels = imageData.data
      let brightness = 0
      for (let i = 0; i < pixels.length; i += 4) {
        brightness += (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3
      }
      brightness = brightness / (pixels.length / 4)

      if (brightness < 50) {
        resolve({
          isValid: false,
          error: "Image is too dark. Please upload a clearer image.",
        })
        return
      }

      if (brightness > 200) {
        resolve({
          isValid: false,
          error: "Image is overexposed. Please upload a clearer image.",
        })
        return
      }

      resolve({ isValid: true })
    }

    img.onerror = () => {
      resolve({ isValid: false, error: "Unable to load image" })
    }

    img.src = URL.createObjectURL(file)
  })
}

// Extract information from Aadhar card images using OCR
export async function extractAadharInfo(frontImage: File, backImage: File): Promise<AadharInfo> {
  // In a real implementation, this would use:
  // 1. Tesseract.js for client-side OCR
  // 2. Google Cloud Vision API
  // 3. AWS Textract
  // 4. Azure Computer Vision
  // 5. Custom trained models

  return new Promise((resolve) => {
    // Simulate OCR processing time
    setTimeout(() => {
      // Demo extracted data - in real implementation, this would come from actual OCR
      const demoAddress = "Village Rampur, Tehsil Kharkhoda, District Sonipat, Haryana - 131001"
      const locationInfo = extractLocationFromAddress(demoAddress)

      const extractedInfo: AadharInfo = {
        name: "राम कुमार शर्मा",
        aadharNumber: "1234 5678 9012",
        dateOfBirth: "15/08/1985",
        address: demoAddress,
        ...locationInfo,
        confidence: Math.floor(Math.random() * 20) + 80, // 80-100% confidence
      }

      resolve(extractedInfo)
    }, 2000)
  })
}

// Real OCR implementation example using Tesseract.js
export async function extractWithTesseract(frontImage: File, backImage: File): Promise<AadharInfo> {
  try {
    // This would require installing tesseract.js
    // npm install tesseract.js

    const Tesseract = (await import("tesseract.js")).default

    // Process front image
    const frontResult = await Tesseract.recognize(frontImage, "eng+hin", {
      logger: (m) => console.log(m),
    })

    // Process back image
    const backResult = await Tesseract.recognize(backImage, "eng+hin", {
      logger: (m) => console.log(m),
    })

    // Extract specific information using regex patterns
    const frontText = frontResult.data.text
    const backText = backResult.data.text

    // Regex patterns for Aadhar information
    const namePattern = /Name[:\s]*([A-Za-z\s]+)/i
    const aadharPattern = /(\d{4}\s\d{4}\s\d{4})/
    const dobPattern = /DOB[:\s]*(\d{2}\/\d{2}\/\d{4})/i
    const addressPattern = /Address[:\s]*([^]+?)(?=PIN|$)/i

    const name = frontText.match(namePattern)?.[1]?.trim()
    const aadharNumber = frontText.match(aadharPattern)?.[1]
    const dateOfBirth = frontText.match(dobPattern)?.[1]
    const address = backText.match(addressPattern)?.[1]?.trim()

    const locationInfo = extractLocationFromAddress(address || "")

    const extractedInfo: AadharInfo = {
      name,
      aadharNumber,
      dateOfBirth,
      address,
      ...locationInfo,
      confidence: Math.min(frontResult.data.confidence, backResult.data.confidence),
    }

    return extractedInfo
  } catch (error) {
    console.error("OCR processing failed:", error)
    throw new Error("Failed to extract information from images")
  }
}

// Cloud-based OCR implementation example
export async function extractWithCloudVision(frontImage: File, backImage: File): Promise<AadharInfo> {
  try {
    const formData = new FormData()
    formData.append("frontImage", frontImage)
    formData.append("backImage", backImage)

    const response = await fetch("/api/ocr/extract-aadhar", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("OCR service failed")
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Cloud OCR failed:", error)
    throw new Error("Failed to process images with cloud service")
  }
}
