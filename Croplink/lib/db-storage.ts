import { promises as fs } from "fs"
import path from "path"

export interface FarmerProfile {
  id: string
  name: string
  spokenName?: string
  aadhaarNumber?: string
  dateOfBirth?: string
  age?: number
  address?: string
  location?: string
  extractedLocation?: string
  extractedState?: string
  extractedDistrict?: string
  phone: string
  email?: string
  whatsapp?: string
  crops: string[]
  farmSize: string
  experience: string
  organicCertified: boolean
  description?: string
  ocrConfidence?: number
  registrationDate: string
  verified: boolean
  profilePhoto?: string
}

export interface DistributorProfile {
  id: string
  businessName: string
  ownerName: string
  businessType: string
  state: string
  district: string
  phone: string
  email: string
  whatsapp?: string
  address?: string
  cropsInterested: string[]
  minOrderQuantity: string
  experience: string
  certifications: string[]
  description?: string
  registrationDate: string
  verified: boolean
}

const DB_DIR = path.join(process.cwd(), "db")
const FARMERS_FILE = path.join(DB_DIR, "farmers.json")
const DISTRIBUTORS_FILE = path.join(DB_DIR, "distributors.json")

// Ensure db directory exists
async function ensureDbDirectory() {
  try {
    await fs.access(DB_DIR)
  } catch {
    await fs.mkdir(DB_DIR, { recursive: true })
  }
}

// Initialize JSON files if they don't exist
async function initializeJsonFiles() {
  await ensureDbDirectory()

  try {
    await fs.access(FARMERS_FILE)
  } catch {
    await fs.writeFile(FARMERS_FILE, JSON.stringify([], null, 2))
  }

  try {
    await fs.access(DISTRIBUTORS_FILE)
  } catch {
    await fs.writeFile(DISTRIBUTORS_FILE, JSON.stringify([], null, 2))
  }
}

// Farmer operations
export async function saveFarmer(farmer: FarmerProfile): Promise<void> {
  await initializeJsonFiles()

  const farmers = await getAllFarmers()
  const existingIndex = farmers.findIndex((f) => f.id === farmer.id)

  if (existingIndex >= 0) {
    farmers[existingIndex] = farmer
  } else {
    farmers.push(farmer)
  }

  await fs.writeFile(FARMERS_FILE, JSON.stringify(farmers, null, 2))
}

export async function getAllFarmers(): Promise<FarmerProfile[]> {
  await initializeJsonFiles()

  try {
    const data = await fs.readFile(FARMERS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function getFarmerById(id: string): Promise<FarmerProfile | null> {
  const farmers = await getAllFarmers()
  return farmers.find((f) => f.id === id) || null
}

export async function getFarmerByName(name: string): Promise<FarmerProfile | null> {
  const farmers = await getAllFarmers()
  return (
    farmers.find(
      (f) =>
        f.name.toLowerCase().includes(name.toLowerCase()) || f.spokenName?.toLowerCase().includes(name.toLowerCase()),
    ) || null
  )
}

export async function deleteFarmer(id: string): Promise<boolean> {
  const farmers = await getAllFarmers()
  const filteredFarmers = farmers.filter((f) => f.id !== id)

  if (filteredFarmers.length !== farmers.length) {
    await fs.writeFile(FARMERS_FILE, JSON.stringify(filteredFarmers, null, 2))
    return true
  }

  return false
}

// Distributor operations
export async function saveDistributor(distributor: DistributorProfile): Promise<void> {
  await initializeJsonFiles()

  const distributors = await getAllDistributors()
  const existingIndex = distributors.findIndex((d) => d.id === distributor.id)

  if (existingIndex >= 0) {
    distributors[existingIndex] = distributor
  } else {
    distributors.push(distributor)
  }

  await fs.writeFile(DISTRIBUTORS_FILE, JSON.stringify(distributors, null, 2))
}

export async function getAllDistributors(): Promise<DistributorProfile[]> {
  await initializeJsonFiles()

  try {
    const data = await fs.readFile(DISTRIBUTORS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function getDistributorById(id: string): Promise<DistributorProfile | null> {
  const distributors = await getAllDistributors()
  return distributors.find((d) => d.id === id) || null
}

export async function getDistributorByName(name: string): Promise<DistributorProfile | null> {
  const distributors = await getAllDistributors()
  return (
    distributors.find(
      (d) =>
        d.ownerName.toLowerCase().includes(name.toLowerCase()) ||
        d.businessName.toLowerCase().includes(name.toLowerCase()),
    ) || null
  )
}

export async function deleteDistributor(id: string): Promise<boolean> {
  const distributors = await getAllDistributors()
  const filteredDistributors = distributors.filter((d) => d.id !== id)

  if (filteredDistributors.length !== distributors.length) {
    await fs.writeFile(DISTRIBUTORS_FILE, JSON.stringify(filteredDistributors, null, 2))
    return true
  }

  return false
}

// Search operations
export async function searchFarmers(query: {
  cropType?: string
  location?: string
  organic?: boolean
  minRating?: number
}): Promise<FarmerProfile[]> {
  const farmers = await getAllFarmers()

  return farmers.filter((farmer) => {
    if (query.cropType && query.cropType !== "all-crops") {
      const hasMatchingCrop = farmer.crops.some((crop) => crop.toLowerCase().includes(query.cropType!.toLowerCase()))
      if (!hasMatchingCrop) return false
    }

    if (query.location && query.location !== "all-locations") {
      const hasMatchingLocation =
        farmer.location?.toLowerCase().includes(query.location.toLowerCase()) ||
        farmer.extractedState?.toLowerCase().includes(query.location.toLowerCase()) ||
        farmer.extractedDistrict?.toLowerCase().includes(query.location.toLowerCase())
      if (!hasMatchingLocation) return false
    }

    if (query.organic !== undefined && farmer.organicCertified !== query.organic) {
      return false
    }

    return true
  })
}

export async function searchDistributors(query: {
  cropType?: string
  location?: string
  businessType?: string
}): Promise<DistributorProfile[]> {
  const distributors = await getAllDistributors()

  return distributors.filter((distributor) => {
    if (query.cropType && query.cropType !== "all-crops") {
      const hasMatchingCrop = distributor.cropsInterested.some((crop) =>
        crop.toLowerCase().includes(query.cropType!.toLowerCase()),
      )
      if (!hasMatchingCrop) return false
    }

    if (query.location && query.location !== "all-locations") {
      const hasMatchingLocation =
        distributor.state?.toLowerCase().includes(query.location.toLowerCase()) ||
        distributor.district?.toLowerCase().includes(query.location.toLowerCase())
      if (!hasMatchingLocation) return false
    }

    if (query.businessType && query.businessType !== "all-types") {
      if (!distributor.businessType.toLowerCase().includes(query.businessType.toLowerCase())) {
        return false
      }
    }

    return true
  })
}

// Export data
export async function exportAllData() {
  const farmers = await getAllFarmers()
  const distributors = await getAllDistributors()

  return {
    farmers,
    distributors,
    exportDate: new Date().toISOString(),
    totalFarmers: farmers.length,
    totalDistributors: distributors.length,
  }
}
