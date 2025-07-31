"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import FarmerRegistration from "@/components/farmer-registration"
import DistributorRegistration from "@/components/distributor-registration"
import { Wheat } from "lucide-react"

function RegistrationContent() {
  const searchParams = useSearchParams()
  const role = searchParams.get("role")
  const lang = searchParams.get("lang") || "en"

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid Registration Link</h2>
          <p className="text-gray-600">Please select a role from the homepage.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center gap-2">
            <Wheat className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">FarmConnect</h1>
          </div>
        </div>
      </header>

      {/* Registration Form */}
      <div className="container mx-auto px-4 py-8">
        {role === "farmer" ? <FarmerRegistration language={lang} /> : <DistributorRegistration language={lang} />}
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Wheat className="h-12 w-12 text-green-600 mx-auto mb-4 animate-spin" />
            <p>Loading registration...</p>
          </div>
        </div>
      }
    >
      <RegistrationContent />
    </Suspense>
  )
}
