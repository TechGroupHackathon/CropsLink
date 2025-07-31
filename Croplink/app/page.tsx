"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wheat, Truck, Users, Shield, Mic, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"

export default function LandingPage() {
  const { language, setLanguage, t } = useLanguage()
  const router = useRouter()

  const handleRoleSelection = (role: string) => {
    router.push(`/register?role=${role}&lang=${language}`)
  }

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "hi", label: "हिंदी" },
    { value: "mr", label: "मराठी" },
  ]

  // Get translated feature arrays safely
  const getFarmerFeatures = () => {
    try {
      return [
        t("landingPage.roleSelection.farmer.features.0"),
        t("landingPage.roleSelection.farmer.features.1"),
        t("landingPage.roleSelection.farmer.features.2"),
        t("landingPage.roleSelection.farmer.features.3"),
      ]
    } catch {
      return [
        "Document verification with Aadhaar",
        "Voice-assisted registration",
        "Crop portfolio management",
        "Connect with verified distributors",
      ]
    }
  }

  const getDistributorFeatures = () => {
    try {
      return [
        t("landingPage.roleSelection.distributor.features.0"),
        t("landingPage.roleSelection.distributor.features.1"),
        t("landingPage.roleSelection.distributor.features.2"),
        t("landingPage.roleSelection.distributor.features.3"),
      ]
    } catch {
      return [
        "Quick registration process",
        "Advanced search filters",
        "Crop requirement management",
        "Connect with verified farmers",
      ]
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wheat className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">{t("landingPage.title")}</h1>
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">{t("landingPage.subtitle")}</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t("landingPage.description")}</p>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="flex flex-col items-center p-4">
              <Shield className="h-12 w-12 text-green-600 mb-2" />
              <h3 className="font-semibold">{t("landingPage.features.verified.title")}</h3>
              <p className="text-sm text-gray-600">{t("landingPage.features.verified.description")}</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Mic className="h-12 w-12 text-blue-600 mb-2" />
              <h3 className="font-semibold">{t("landingPage.features.voice.title")}</h3>
              <p className="text-sm text-gray-600">{t("landingPage.features.voice.description")}</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Search className="h-12 w-12 text-purple-600 mb-2" />
              <h3 className="font-semibold">{t("landingPage.features.search.title")}</h3>
              <p className="text-sm text-gray-600">{t("landingPage.features.search.description")}</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Users className="h-12 w-12 text-orange-600 mb-2" />
              <h3 className="font-semibold">{t("landingPage.features.community.title")}</h3>
              <p className="text-sm text-gray-600">{t("landingPage.features.community.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">{t("landingPage.roleSelection.title")}</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Farmer Card */}
            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleRoleSelection("farmer")}
            >
              <CardHeader className="text-center">
                <Wheat className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">{t("landingPage.roleSelection.farmer.title")}</CardTitle>
                <CardDescription>{t("landingPage.roleSelection.farmer.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  {getFarmerFeatures().map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
                <Button className="w-full" size="lg">
                  {t("landingPage.roleSelection.farmer.button")}
                </Button>
              </CardContent>
            </Card>

            {/* Distributor Card */}
            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleRoleSelection("distributor")}
            >
              <CardHeader className="text-center">
                <Truck className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">{t("landingPage.roleSelection.distributor.title")}</CardTitle>
                <CardDescription>{t("landingPage.roleSelection.distributor.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  {getDistributorFeatures().map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
                <Button className="w-full bg-transparent" size="lg" variant="outline">
                  {t("landingPage.roleSelection.distributor.button")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Wheat className="h-6 w-6" />
            <span className="text-xl font-bold">{t("landingPage.title")}</span>
          </div>
          <p className="text-gray-400">{t("landingPage.footer")}</p>
        </div>
      </footer>
    </div>
  )
}
