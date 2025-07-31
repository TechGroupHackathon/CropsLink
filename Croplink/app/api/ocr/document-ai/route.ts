import { type NextRequest, NextResponse } from "next/server"
import { createDocumentAI } from "@/lib/google-documentai"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const frontImage = formData.get("frontImage") as File
    const backImage = formData.get("backImage") as File

    if (!frontImage) {
      return NextResponse.json({ error: "Front image is required" }, { status: 400 })
    }

    // Initialize Document AI
    const documentAI = createDocumentAI()
    if (!documentAI) {
      return NextResponse.json(
        { error: "Document AI service not available. Please check configuration." },
        { status: 503 },
      )
    }

    // Convert files to buffers
    const frontBuffer = Buffer.from(await frontImage.arrayBuffer())
    const backBuffer = backImage ? Buffer.from(await backImage.arrayBuffer()) : undefined

    // Process with Document AI
    const extractedData = await documentAI.processAadhaarCard(frontBuffer, backBuffer)

    return NextResponse.json({
      success: true,
      data: extractedData,
      message: "Aadhaar card processed successfully",
    })
  } catch (error) {
    console.error("Document AI OCR error:", error)

    // Fallback to mock data for development
    console.log("Falling back to mock OCR data...")

    const mockData = {
      fullName: "राम कुमार शर्मा",
      aadhaarNumber: "1234 5678 9012",
      dateOfBirth: "15/08/1985",
      age: 38,
      address: "Village Rampur, Tehsil Kharkhoda, District Sonipat, Haryana - 131001",
      location: "Rampur, Kharkhoda, Sonipat, Haryana",
      state: "Haryana",
      district: "Sonipat",
      pincode: "131001",
      confidence: 85,
      rawText: "Mock OCR data for development",
    }

    return NextResponse.json({
      success: true,
      data: mockData,
      message: "Using mock OCR data (Document AI not configured)",
      isMockData: true,
    })
  }
}
