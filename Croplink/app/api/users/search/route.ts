import { type NextRequest, NextResponse } from "next/server"
import { searchFarmers, searchDistributors } from "@/lib/db-storage"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userRole = searchParams.get("userRole")
    const cropType = searchParams.get("cropType")
    const location = searchParams.get("location")
    const organic = searchParams.get("organic") === "true"
    const businessType = searchParams.get("businessType")

    if (!userRole || !["farmer", "distributor"].includes(userRole)) {
      return NextResponse.json({ error: "Invalid user role" }, { status: 400 })
    }

    let results = []

    if (userRole === "farmer") {
      // Farmers search for distributors
      results = await searchDistributors({
        cropType,
        location,
        businessType,
      })
    } else {
      // Distributors search for farmers
      results = await searchFarmers({
        cropType,
        location,
        organic,
      })
    }

    return NextResponse.json({
      success: true,
      results,
      count: results.length,
    })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Search failed. Please try again." }, { status: 500 })
  }
}
