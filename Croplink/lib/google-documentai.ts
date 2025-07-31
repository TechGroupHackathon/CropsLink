// Google Document AI OCR Service
import { DocumentProcessorServiceClient } from "@google-cloud/documentai"

export interface DocumentAIConfig {
  projectId: string
  location: string
  processorId: string
  keyFilename?: string
}

export interface ExtractedAadhaarData {
  fullName?: string
  aadhaarNumber?: string
  dateOfBirth?: string
  age?: number
  address?: string
  location?: string
  state?: string
  district?: string
  pincode?: string
  photo?: string
  confidence: number
  rawText: string
}

export class GoogleDocumentAI {
  private client: DocumentProcessorServiceClient
  private config: DocumentAIConfig

  constructor(config: DocumentAIConfig) {
    this.config = config

    // Initialize the client with credentials
    this.client = new DocumentProcessorServiceClient({
      projectId: config.projectId,
      keyFilename: config.keyFilename,
    })
  }

  /**
   * Process Aadhaar card images using Google Document AI
   */
  async processAadhaarCard(frontImageBuffer: Buffer, backImageBuffer?: Buffer): Promise<ExtractedAadhaarData> {
    try {
      // Process front side (contains name, photo, Aadhaar number, DOB)
      const frontResult = await this.processDocument(frontImageBuffer)

      // Process back side if provided (contains address)
      let backResult = null
      if (backImageBuffer) {
        backResult = await this.processDocument(backImageBuffer)
      }

      // Extract and combine information from both sides
      const extractedData = this.extractAadhaarInformation(frontResult, backResult)

      return extractedData
    } catch (error) {
      console.error("Document AI processing error:", error)
      throw new Error("Failed to process Aadhaar card with Document AI")
    }
  }

  /**
   * Process a single document using Document AI
   */
  private async processDocument(imageBuffer: Buffer) {
    const name = `projects/${this.config.projectId}/locations/${this.config.location}/processors/${this.config.processorId}`

    const request = {
      name,
      rawDocument: {
        content: imageBuffer.toString("base64"),
        mimeType: "image/jpeg",
      },
    }

    const [result] = await this.client.processDocument(request)
    return result
  }

  /**
   * Extract Aadhaar-specific information from Document AI results
   */
  private extractAadhaarInformation(frontResult: any, backResult?: any): ExtractedAadhaarData {
    const frontText = frontResult.document?.text || ""
    const backText = backResult?.document?.text || ""
    const combinedText = `${frontText} ${backText}`.trim()

    // Extract entities using Document AI's entity extraction
    const entities = [...(frontResult.document?.entities || []), ...(backResult?.document?.entities || [])]

    // Regex patterns for Aadhaar information
    const patterns = {
      name: /(?:Name|नाम)[:\s]*([A-Za-z\u0900-\u097F\s]+?)(?=\n|DOB|जन्म|Aadhaar|आधार|\d{4})/i,
      aadhaar: /(\d{4}\s\d{4}\s\d{4})/,
      dob: /(?:DOB|जन्म|Birth)[:\s]*(\d{2}\/\d{2}\/\d{4})/i,
      address: /(?:Address|पता|S\/O|D\/O|W\/O)[:\s]*([^]+?)(?=PIN|पिन|Mobile|मोबाइल|$)/i,
      pincode: /(\d{6})/,
    }

    // Extract information using patterns
    const name =
      this.extractWithPattern(combinedText, patterns.name) || this.extractFromEntities(entities, ["PERSON", "NAME"])

    const aadhaarNumber = this.extractWithPattern(combinedText, patterns.aadhaar)

    const dateOfBirth =
      this.extractWithPattern(combinedText, patterns.dob) || this.extractFromEntities(entities, ["DATE"])

    const address =
      this.extractWithPattern(backText || combinedText, patterns.address) ||
      this.extractFromEntities(entities, ["ADDRESS", "LOCATION"])

    // Calculate age from date of birth
    let age: number | undefined
    if (dateOfBirth) {
      try {
        const birthDate = new Date(dateOfBirth.split("/").reverse().join("-"))
        const today = new Date()
        age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--
        }
      } catch (error) {
        console.warn("Failed to calculate age:", error)
      }
    }

    // Extract location components from address
    const locationInfo = this.parseIndianAddress(address || "")

    // Calculate confidence based on extracted fields
    const fieldsFound = [name, aadhaarNumber, dateOfBirth, address].filter(Boolean).length
    const confidence = Math.min((fieldsFound / 4) * 100, 95) // Max 95% confidence

    return {
      fullName: name?.trim(),
      aadhaarNumber: aadhaarNumber?.trim(),
      dateOfBirth: dateOfBirth?.trim(),
      age,
      address: address?.trim(),
      ...locationInfo,
      confidence: Math.round(confidence),
      rawText: combinedText,
    }
  }

  /**
   * Extract information using regex patterns
   */
  private extractWithPattern(text: string, pattern: RegExp): string | undefined {
    const match = text.match(pattern)
    return match?.[1]?.trim()
  }

  /**
   * Extract information from Document AI entities
   */
  private extractFromEntities(entities: any[], types: string[]): string | undefined {
    for (const entity of entities) {
      if (types.includes(entity.type)) {
        return entity.mentionText?.trim()
      }
    }
    return undefined
  }

  /**
   * Parse Indian address to extract location components
   */
  private parseIndianAddress(address: string): {
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
    const villagePattern = /Village\s+([A-Za-z\s]+)|Vill\.?\s+([A-Za-z\s]+)|V\.?\s+([A-Za-z\s]+)/i

    const stateMatch = address.match(statePattern)
    const districtMatch = address.match(districtPattern)
    const pincodeMatch = address.match(pincodePattern)
    const tehsilMatch = address.match(tehsilPattern)
    const villageMatch = address.match(villagePattern)

    const state = stateMatch?.[1]?.trim()
    const district = (districtMatch?.[1] || districtMatch?.[2] || districtMatch?.[3])?.trim()
    const pincode = pincodeMatch?.[1]
    const tehsil = (tehsilMatch?.[1] || tehsilMatch?.[2])?.trim()
    const village = (villageMatch?.[1] || villageMatch?.[2] || villageMatch?.[3])?.trim()

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
      state,
      district,
      pincode,
    }
  }
}

// Factory function to create Document AI instance
export function createDocumentAI(): GoogleDocumentAI | null {
  try {
    const config: DocumentAIConfig = {
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID!,
      location: process.env.GOOGLE_CLOUD_LOCATION || "us",
      processorId: process.env.DOCUMENT_AI_PROCESSOR_ID!,
      keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
    }

    // Validate required environment variables
    if (!config.projectId || !config.processorId) {
      console.warn("Google Document AI not configured. Missing required environment variables.")
      return null
    }

    return new GoogleDocumentAI(config)
  } catch (error) {
    console.error("Failed to initialize Google Document AI:", error)
    return null
  }
}
