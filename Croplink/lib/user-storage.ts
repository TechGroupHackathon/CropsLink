// User data management for JSON file storage simulation

export interface UserData {
  id: string
  role: "farmer" | "distributor"
  registrationDate: string
  verified: boolean

  // Common fields
  phone: string
  email: string

  // Farmer specific fields
  name?: string
  aadhaarNumber?: string
  dateOfBirth?: string
  address?: string
  spokenName?: string
  location?: string
  crops?: string[]
  farmSize?: string
  experience?: string
  organicCertified?: boolean
  description?: string

  // Distributor specific fields
  businessName?: string
  ownerName?: string
  businessType?: string
  state?: string
  district?: string
  cropsInterested?: string[]
  minOrderQuantity?: string
  certifications?: string[]
}

// Simulate database operations with localStorage
export const saveUserData = (userData: UserData): void => {
  try {
    // Get existing users
    const existingUsers = getUsersFromStorage()

    // Add or update user
    const userIndex = existingUsers.findIndex((user) => user.id === userData.id)
    if (userIndex >= 0) {
      existingUsers[userIndex] = userData
    } else {
      existingUsers.push(userData)
    }

    // Save back to localStorage (simulating JSON file)
    localStorage.setItem("farmconnect_users_db", JSON.stringify(existingUsers))
    localStorage.setItem("farmconnect_user", JSON.stringify(userData))

    console.log("User data saved to DB:", userData)
  } catch (error) {
    console.error("Error saving user data:", error)
  }
}

export const getUserData = (): UserData | null => {
  try {
    const userData = localStorage.getItem("farmconnect_user")
    return userData ? JSON.parse(userData) : null
  } catch (error) {
    console.error("Error retrieving user data:", error)
    return null
  }
}

export const getUsersFromStorage = (): UserData[] => {
  try {
    const usersData = localStorage.getItem("farmconnect_users_db")
    return usersData ? JSON.parse(usersData) : []
  } catch (error) {
    console.error("Error retrieving users data:", error)
    return []
  }
}

export const getUserById = (id: string): UserData | null => {
  try {
    const users = getUsersFromStorage()
    return users.find((user) => user.id === id) || null
  } catch (error) {
    console.error("Error finding user by ID:", error)
    return null
  }
}

export const getAllUsers = (): UserData[] => {
  return getUsersFromStorage()
}

export const deleteUser = (id: string): boolean => {
  try {
    const users = getUsersFromStorage()
    const filteredUsers = users.filter((user) => user.id !== id)

    localStorage.setItem("farmconnect_users_db", JSON.stringify(filteredUsers))

    // If deleting current user, clear current session
    const currentUser = getUserData()
    if (currentUser && currentUser.id === id) {
      localStorage.removeItem("farmconnect_user")
    }

    return true
  } catch (error) {
    console.error("Error deleting user:", error)
    return false
  }
}

// Export users data as JSON (simulating file download)
export const exportUsersAsJSON = (): string => {
  const users = getUsersFromStorage()
  return JSON.stringify(users, null, 2)
}

// Import users data from JSON (simulating file upload)
export const importUsersFromJSON = (jsonData: string): boolean => {
  try {
    const users = JSON.parse(jsonData)
    if (Array.isArray(users)) {
      localStorage.setItem("farmconnect_users_db", JSON.stringify(users))
      return true
    }
    return false
  } catch (error) {
    console.error("Error importing users data:", error)
    return false
  }
}
