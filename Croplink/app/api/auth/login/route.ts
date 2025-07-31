import { type NextRequest, NextResponse } from "next/server"
import { getFarmerByName, getDistributorByName } from "@/lib/db-storage"

export async function POST(request: NextRequest) {
  try {
    const { name, role } = await request.json()

    if (!name || !role) {
      return NextResponse.json({ error: "Name and role are required" }, { status: 400 })
    }

    if (!["farmer", "distributor"].includes(role)) {
      return NextResponse.json({ error: "Invalid role specified" }, { status: 400 })
    }

    let user = null

    if (role === "farmer") {
      user = await getFarmerByName(name)
      if (user) {
        return NextResponse.json({
          success: true,
          message: "Login successful",
          user: {
            id: user.id,
            role: "farmer",
            name: user.name,
            spokenName: user.spokenName,
            location: user.location,
            crops: user.crops,
            verified: user.verified,
          },
        })
      }
    } else {
      user = await getDistributorByName(name)
      if (user) {
        return NextResponse.json({
          success: true,
          message: "Login successful",
          user: {
            id: user.id,
            role: "distributor",
            name: user.ownerName,
            businessName: user.businessName,
            location: `${user.district}, ${user.state}`,
            cropsInterested: user.cropsInterested,
            verified: user.verified,
          },
        })
      }
    }

    return NextResponse.json({ error: "User not found. Please check your name and role." }, { status: 404 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 })
  }
}
