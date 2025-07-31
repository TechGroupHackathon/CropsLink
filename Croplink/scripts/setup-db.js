const fs = require("fs").promises
const path = require("path")

async function setupDatabase() {
  const dbDir = path.join(process.cwd(), "db")

  try {
    // Create db directory if it doesn't exist
    await fs.access(dbDir)
    console.log("✅ Database directory already exists")
  } catch {
    await fs.mkdir(dbDir, { recursive: true })
    console.log("✅ Created database directory")
  }

  // Create farmers.json if it doesn't exist
  const farmersFile = path.join(dbDir, "farmers.json")
  try {
    await fs.access(farmersFile)
    console.log("✅ farmers.json already exists")
  } catch {
    await fs.writeFile(farmersFile, JSON.stringify([], null, 2))
    console.log("✅ Created farmers.json")
  }

  // Create distributors.json if it doesn't exist
  const distributorsFile = path.join(dbDir, "distributors.json")
  try {
    await fs.access(distributorsFile)
    console.log("✅ distributors.json already exists")
  } catch {
    await fs.writeFile(distributorsFile, JSON.stringify([], null, 2))
    console.log("✅ Created distributors.json")
  }

  console.log("\n🎉 Database setup complete!")
  console.log("📁 Database files location:", dbDir)
  console.log("👨‍🌾 Farmers data:", farmersFile)
  console.log("🚛 Distributors data:", distributorsFile)
}

setupDatabase().catch(console.error)
