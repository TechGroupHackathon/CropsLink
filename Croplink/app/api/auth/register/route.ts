import { type NextRequest, NextResponse } from "next/server"
import { saveFarmer, saveDistributor } from "@/lib/db-storage"
import type { FarmerProfile, DistributorProfile } from "@/lib/db-storage"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { role, ...userData } = body

    if (!role || !["farmer", "distributor"].includes(role)) {
      return NextResponse.json({ error: "Invalid role specified" }, { status: 400 })
    }

    // Generate unique ID
    const id = `${role}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Calculate age from date of birth if provided
    let age: number | undefined
    if (userData.dateOfBirth) {
      const birthDate = new Date(userData.dateOfBirth.split("/").reverse().join("-"))
      const today = new Date()
      age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
    }

    if (role === "farmer") {
      const farmerData: FarmerProfile = {
        id,
        name: userData.name || userData.spokenName || "",
        spokenName: userData.spokenName,
        aadhaarNumber: userData.aadhaarNumber,
        dateOfBirth: userData.dateOfBirth,
        age,
        address: userData.address,
        location: userData.location,
        extractedLocation: userData.extractedLocation,
        extractedState: userData.extractedState,
        extractedDistrict: userData.extractedDistrict,
        phone: userData.phone,
        email: userData.email,
        whatsapp: userData.whatsapp,
        crops: userData.crops || [],
        farmSize: userData.farmSize,
        experience: userData.experience,
        organicCertified: userData.organicCertified || false,
        description: userData.description,
        ocrConfidence: userData.ocrConfidence,
        registrationDate: new Date().toISOString(),
        verified: true,
        profilePhoto: userData.profilePhoto,
      }

      await saveFarmer(farmerData)

      return NextResponse.json({
        success: true,
        message: "Farmer registered successfully",
        user: { id: farmerData.id, role: "farmer", name: farmerData.name },
      })
    } else {
      const distributorData: DistributorProfile = {
        id,
        businessName: userData.businessName,
        ownerName: userData.ownerName,
        businessType: userData.businessType,
        state: userData.state,
        district: userData.district,
        phone: userData.phone,
        email: userData.email,
        whatsapp: userData.whatsapp,
        address: userData.address,
        cropsInterested: userData.cropsInterested || [],
        minOrderQuantity: userData.minOrderQuantity,
        experience: userData.experience,
        certifications: userData.certifications || [],
        description: userData.description,
        registrationDate: new Date().toISOString(),
        verified: true,
      }

      await saveDistributor(distributorData)

      return NextResponse.json({
        success: true,
        message: "Distributor registered successfully",
        user: { id: distributorData.id, role: "distributor", name: distributorData.ownerName },
      })
    }
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 })
  }
}
