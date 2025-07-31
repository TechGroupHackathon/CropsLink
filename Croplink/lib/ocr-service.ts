// Simplified OCR Service for Aadhar card information extraction (Version 11 approach)

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

// Extract location components from address using regex patterns
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

// Simulated OCR extraction with realistic demo data (Version 11 approach)
export async function extractAadharInfo(frontImage: File, backImage: File): Promise<AadharInfo> {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 2000))

  try {
    // Validate images first
    const frontValidation = await validateAadharImage(frontImage)
    const backValidation = await validateAadharImage(backImage)

    if (!frontValidation.isValid) {
      throw new Error(frontValidation.error)
    }
    if (!backValidation.isValid) {
      throw new Error(backValidation.error)
    }

    // Generate realistic demo data based on file names or random selection
    const demoProfiles = [
      {
        name: "राम कुमार शर्मा",
        aadharNumber: "1234 5678 9012",
        dateOfBirth: "15/08/1985",
        address: "Village Rampur, Tehsil Kharkhoda, District Sonipat, Haryana - 131001",
        confidence: 87,
      },
      {
        name: "सुनीता देवी",
        aadharNumber: "2345 6789 0123",
        dateOfBirth: "22/03/1990",
        address: "Village Bhiwani, Tehsil Bhiwani, District Bhiwani, Haryana - 127021",
        confidence: 92,
      },
      {
        name: "अजय पटेल",
        aadharNumber: "3456 7890 1234",
        dateOfBirth: "10/12/1982",
        address: "Village Anand, Tehsil Anand, District Anand, Gujarat - 388001",
        confidence: 89,
      },
      {
        name: "प्रिया राव",
        aadharNumber: "4567 8901 2345",
        dateOfBirth: "05/07/1988",
        address: "Village Mysore, Tehsil Mysore, District Mysore, Karnataka - 570001",
        confidence: 85,
      },
    ]

    // Select a random profile for demo
    const selectedProfile = demoProfiles[Math.floor(Math.random() * demoProfiles.length)]

    // Extract location information from address
    const locationInfo = extractLocationFromAddress(selectedProfile.address)

    const extractedInfo: AadharInfo = {
      name: selectedProfile.name,
      aadharNumber: selectedProfile.aadharNumber,
      dateOfBirth: selectedProfile.dateOfBirth,
      address: selectedProfile.address,
      ...locationInfo,
      confidence: selectedProfile.confidence,
    }

    console.log("OCR Extraction completed:", extractedInfo)
    return extractedInfo
  } catch (error) {
    console.error("OCR processing failed:", error)

    // Fallback to default demo data
    const fallbackData: AadharInfo = {
      name: "राम कुमार शर्मा",
      aadharNumber: "1234 5678 9012",
      dateOfBirth: "15/08/1985",
      address: "Village Rampur, Tehsil Kharkhoda, District Sonipat, Haryana - 131001",
      location: "Rampur, Kharkhoda, Sonipat, Haryana",
      state: "Haryana",
      district: "Sonipat",
      pincode: "131001",
      confidence: 85,
    }

    return fallbackData
  }
}

// Process OCR results and extract Aadhar information using regex patterns
function processOCRResults(frontText: string, backText: string): AadharInfo {
  const combinedText = `${frontText} ${backText}`.trim()

  // Regex patterns for extracting information
  const patterns = {
    name: /(?:Name|नाम)[:\s]*([A-Za-z\u0900-\u097F\s]+?)(?=\n|DOB|जन्म|Aadhaar|आधार|\d{4})/i,
    aadhar: /(\d{4}\s\d{4}\s\d{4})/,
    dob: /(?:DOB|जन्म|Birth)[:\s]*(\d{2}\/\d{2}\/\d{4})/i,
    address: /(?:Address|पता|S\/O|D\/O|W\/O)[:\s]*([^]+?)(?=PIN|पिन|Mobile|मोबाइल|$)/i,
    pincode: /(\d{6})/,
  }

  // Extract information using patterns
  const name = combinedText.match(patterns.name)?.[1]?.trim()
  const aadharNumber = combinedText.match(patterns.aadhar)?.[1]
  const dateOfBirth = combinedText.match(patterns.dob)?.[1]
  const address = combinedText.match(patterns.address)?.[1]?.trim()

  // Extract location components from address
  const locationInfo = extractLocationFromAddress(address || "")

  // Calculate confidence based on extracted fields
  const fieldsFound = [name, aadharNumber, dateOfBirth, address].filter(Boolean).length
  const confidence = Math.min((fieldsFound / 4) * 100, 95) // Max 95% confidence

  return {
    name,
    aadharNumber,
    dateOfBirth,
    address,
    ...locationInfo,
    confidence: Math.round(confidence),
  }
}

// Alternative: Browser-based OCR using Tesseract.js (commented out for simplicity)
/*
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

    return processOCRResults(frontText, backText)
  } catch (error) {
    console.error("OCR processing failed:", error)
    throw new Error("Failed to extract information from images")
  }
}
*/
