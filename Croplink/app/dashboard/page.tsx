"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Wheat,
  Search,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Star,
  Filter,
  Users,
  TrendingUp,
  Menu,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { mockFarmers, mockDistributors } from "@/lib/mock-data"
import { getUserData } from "@/lib/user-storage"
import { useLanguage } from "@/lib/language-context"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    cropType: "all-crops",
    location: "all-locations",
    rating: "",
    organic: false,
  })
  const [searchResults, setSearchResults] = useState<any[]>([])
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    // Get user data from JSON storage
    const userData = getUserData()
    if (!userData) {
      router.push("/")
      return
    }
    setUser(userData)
  }, [router])

  useEffect(() => {
    // Filter search results based on user role
    if (user) {
      const results = user.role === "farmer" ? mockDistributors : mockFarmers
      setSearchResults(results)
    }
  }, [user])

  const handleSearch = () => {
    let results = user.role === "farmer" ? mockDistributors : mockFarmers

    if (searchFilters.cropType !== "all-crops") {
      const cropName =
        searchFilters.cropType.charAt(0).toUpperCase() + searchFilters.cropType.slice(1).replace("-", " ")
      results = results.filter(
        (item) =>
          item.crops?.some((crop: string) => crop.toLowerCase().includes(cropName.toLowerCase())) ||
          item.cropsInterested?.some((crop: string) => crop.toLowerCase().includes(cropName.toLowerCase())),
      )
    }

    if (searchFilters.location !== "all-locations") {
      const locationName =
        searchFilters.location.charAt(0).toUpperCase() + searchFilters.location.slice(1).replace("-", " ")
      results = results.filter(
        (item) =>
          item.location?.toLowerCase().includes(locationName.toLowerCase()) ||
          item.state?.toLowerCase().includes(locationName.toLowerCase()),
      )
    }

    if (searchFilters.rating) {
      results = results.filter((item) => item.rating >= Number.parseFloat(searchFilters.rating))
    }

    if (searchFilters.organic && user.role === "farmer") {
      results = results.filter((item) => item.organicCertified)
    }

    setSearchResults(results)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <Wheat className="h-12 w-12 text-green-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">{t("dashboard.loading")}</p>
        </div>
      </div>
    )
  }

  const sidebarItems = [
    { id: "overview", label: t("dashboard.navigation.overview"), icon: TrendingUp, color: "text-blue-600" },
    { id: "profile", label: t("dashboard.navigation.profile"), icon: User, color: "text-green-600" },
    ...(user.role === "farmer"
      ? [{ id: "crops", label: t("dashboard.navigation.cropManager"), icon: Wheat, color: "text-yellow-600" }]
      : []),
    { id: "search", label: t("dashboard.navigation.searchConnect"), icon: Search, color: "text-purple-600" },
    { id: "messages", label: t("dashboard.navigation.messages"), icon: MessageCircle, color: "text-orange-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <Wheat className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                FarmConnect
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant={user.role === "farmer" ? "default" : "secondary"}
              className={
                user.role === "farmer" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700 text-white"
              }
            >
              {user.role === "farmer" ? "🌾 Farmer" : "🚛 Distributor"}
            </Badge>
            <Avatar className="ring-2 ring-green-200">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-400 text-white">
                {user.name?.[0] || user.ownerName?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Sidebar */}
          <div
            className={`
            lg:col-span-1 fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
            transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
            transition-transform duration-300 ease-in-out lg:transition-none
            w-64 lg:w-auto
          `}
          >
            <Card className="h-full lg:h-auto bg-white/80 backdrop-blur-sm border-green-200 shadow-xl lg:shadow-md">
              <CardHeader className="lg:hidden">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{t("dashboard.navigation")}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardHeader className="hidden lg:block">
                <CardTitle className="text-lg bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {t("dashboard.navigation")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sidebarItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className={`w-full justify-start transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md"
                        : "hover:bg-green-50 hover:text-green-700"
                    }`}
                    onClick={() => {
                      setActiveTab(item.id)
                      setSidebarOpen(false)
                    }}
                  >
                    <item.icon className={`h-4 w-4 mr-2 ${activeTab === item.id ? "text-white" : item.color}`} />
                    {item.label}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {t("dashboard.welcome")}, {user.name || user.ownerName}! 🌟
                    </CardTitle>
                    <CardDescription className="text-green-100">{t("dashboard.overview.description")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-lg">
                        <Users className="h-8 w-8 text-white mx-auto mb-2" />
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-sm text-green-100">{t("dashboard.overview.profileViews")}</p>
                      </div>
                      <div className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-lg">
                        <MessageCircle className="h-8 w-8 text-white mx-auto mb-2" />
                        <p className="text-2xl font-bold">5</p>
                        <p className="text-sm text-green-100">{t("dashboard.overview.newMessages")}</p>
                      </div>
                      <div className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-lg">
                        <Search className="h-8 w-8 text-white mx-auto mb-2" />
                        <p className="text-2xl font-bold">8</p>
                        <p className="text-sm text-green-100">{t("dashboard.overview.searchMatches")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      {t("dashboard.overview.recentActivity")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                        <Avatar className="h-10 w-10 ring-2 ring-green-200">
                          <AvatarFallback className="bg-green-500 text-white">RS</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">Raj Singh viewed your profile</p>
                          <p className="text-sm text-gray-600">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                        <Avatar className="h-10 w-10 ring-2 ring-blue-200">
                          <AvatarFallback className="bg-blue-500 text-white">AP</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">Agro Products Ltd sent you a message</p>
                          <p className="text-sm text-gray-600">5 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "profile" && (
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-green-600" />
                    {t("dashboard.profile.profileInformation")}
                  </CardTitle>
                  <CardDescription>{t("dashboard.profile.verifiedDetails")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 ring-4 ring-green-200">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" />
                      <AvatarFallback className="text-2xl bg-gradient-to-r from-green-400 to-blue-400 text-white">
                        {user.name?.[0] || user.ownerName?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{user.name || user.ownerName}</h3>
                      <p className="text-gray-600">{user.role === "farmer" ? "🌾 Farmer" : "🚛 Distributor"}</p>
                      <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">
                        ✓ Verified
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">{user.location || `${user.district}, ${user.state}`}</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-700">{user.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <Mail className="h-4 w-4 text-purple-600" />
                        <span className="text-gray-700">{user.email}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {user.role === "farmer" ? (
                        <>
                          <div className="p-3 bg-yellow-50 rounded-lg">
                            <Label className="text-sm font-medium text-yellow-800">
                              {t("dashboard.profile.farmSize")}
                            </Label>
                            <p className="text-gray-700">{user.farmSize} acres</p>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg">
                            <Label className="text-sm font-medium text-green-800">
                              {t("dashboard.profile.experience")}
                            </Label>
                            <p className="text-gray-700">{user.experience} years</p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <Label className="text-sm font-medium text-blue-800">
                              {t("dashboard.profile.organicCertified")}
                            </Label>
                            <p className="text-gray-700">{user.organicCertified ? "Yes ✓" : "No"}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <Label className="text-sm font-medium text-blue-800">
                              {t("dashboard.profile.businessType")}
                            </Label>
                            <p className="text-gray-700">{user.businessType}</p>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg">
                            <Label className="text-sm font-medium text-green-800">
                              {t("dashboard.profile.experience")}
                            </Label>
                            <p className="text-gray-700">{user.experience} years</p>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <Label className="text-sm font-medium text-purple-800">
                              {t("dashboard.profile.minOrder")}
                            </Label>
                            <p className="text-gray-700">{user.minOrderQuantity} tons</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <Label className="text-sm font-medium text-gray-800">
                      {user.role === "farmer" ? t("dashboard.profile.crops") : t("dashboard.profile.cropsOfInterest")}
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(user.crops || user.cropsInterested || []).map((crop: string) => (
                        <Badge key={crop} variant="outline" className="bg-white border-green-300 text-green-700">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {user.description && (
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Label className="text-sm font-medium text-gray-800">{t("dashboard.profile.description")}</Label>
                      <p className="mt-1 text-gray-700">{user.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === "crops" && user.role === "farmer" && (
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wheat className="h-5 w-5 text-yellow-600" />
                    {t("dashboard.cropManager.title")}
                  </CardTitle>
                  <CardDescription>{t("dashboard.cropManager.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(user.crops || []).map((crop: string, index: number) => (
                      <Card
                        key={crop}
                        className="bg-gradient-to-br from-green-50 to-yellow-50 border-green-200 hover:shadow-lg transition-all duration-200"
                      >
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg text-green-800">{crop}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">{t("dashboard.cropManager.status")}:</span>
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                {t("dashboard.cropManager.available")}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">{t("dashboard.cropManager.quantity")}:</span>
                              <span className="font-medium">{50 + index * 10} tons</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">{t("dashboard.cropManager.price")}:</span>
                              <span className="font-medium">₹{25 + index * 5}/kg</span>
                            </div>
                          </div>
                          <Button size="sm" className="w-full mt-3 bg-green-600 hover:bg-green-700">
                            {t("dashboard.cropManager.updateDetails")}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "search" && (
              <div className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5 text-purple-600" />
                      {t("dashboard.search.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="cropType">{t("dashboard.search.filters.cropType")}</Label>
                        <Select
                          value={searchFilters.cropType}
                          onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, cropType: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select crop type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all-crops">All Crops</SelectItem>
                            <SelectItem value="rice">{t("common.crops.rice")}</SelectItem>
                            <SelectItem value="wheat">{t("common.crops.wheat")}</SelectItem>
                            <SelectItem value="cotton">{t("common.crops.cotton")}</SelectItem>
                            <SelectItem value="sugarcane">{t("common.crops.sugarcane")}</SelectItem>
                            <SelectItem value="maize">{t("common.crops.maize")}</SelectItem>
                            <SelectItem value="vegetables">{t("common.crops.vegetables")}</SelectItem>
                            <SelectItem value="fruits">{t("common.crops.fruits")}</SelectItem>
                            <SelectItem value="spices">{t("common.crops.spices")}</SelectItem>
                            <SelectItem value="pulses">{t("common.crops.pulses")}</SelectItem>
                            <SelectItem value="oilseeds">{t("common.crops.oilseeds")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="location">{t("dashboard.search.filters.location")}</Label>
                        <Select
                          value={searchFilters.location}
                          onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, location: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all-locations">All Locations</SelectItem>
                            <SelectItem value="punjab">{t("common.locations.punjab")}</SelectItem>
                            <SelectItem value="haryana">{t("common.locations.haryana")}</SelectItem>
                            <SelectItem value="maharashtra">{t("common.locations.maharashtra")}</SelectItem>
                            <SelectItem value="gujarat">{t("common.locations.gujarat")}</SelectItem>
                            <SelectItem value="karnataka">{t("common.locations.karnataka")}</SelectItem>
                            <SelectItem value="tamil-nadu">{t("common.locations.tamilNadu")}</SelectItem>
                            <SelectItem value="uttar-pradesh">{t("common.locations.uttarPradesh")}</SelectItem>
                            <SelectItem value="rajasthan">{t("common.locations.rajasthan")}</SelectItem>
                            <SelectItem value="madhya-pradesh">{t("common.locations.madhyaPradesh")}</SelectItem>
                            <SelectItem value="west-bengal">{t("common.locations.westBengal")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="rating">{t("dashboard.search.filters.minRating")}</Label>
                        <Select
                          value={searchFilters.rating}
                          onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, rating: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Any rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Any Rating</SelectItem>
                            <SelectItem value="4">4+ Stars</SelectItem>
                            <SelectItem value="3">3+ Stars</SelectItem>
                            <SelectItem value="2">2+ Stars</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end">
                        <Button
                          onClick={handleSearch}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                          <Search className="h-4 w-4 mr-2" />
                          {t("dashboard.search.searchButton")}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle>
                      {user.role === "farmer" ? "🚛 Distributors" : "🌾 Farmers"} ({searchResults.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {searchResults.map((profile) => (
                        <Card
                          key={profile.id}
                          className="hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-green-50 border-green-200"
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="ring-2 ring-green-200">
                                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                  <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-400 text-white">
                                    {profile.name?.[0] || profile.businessName?.[0] || "U"}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-semibold text-gray-800">
                                    {profile.name || profile.businessName}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    📍 {profile.location || `${profile.district}, ${profile.state}`}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs font-medium">{profile.rating}</span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium mb-1 text-gray-700">
                                  {user.role === "farmer" ? "Interested in:" : "Grows:"}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {(profile.crops || profile.cropsInterested || []).slice(0, 3).map((crop: string) => (
                                    <Badge
                                      key={crop}
                                      variant="outline"
                                      className="text-xs bg-green-50 border-green-300 text-green-700"
                                    >
                                      {crop}
                                    </Badge>
                                  ))}
                                  {(profile.crops || profile.cropsInterested || []).length > 3 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs bg-blue-50 border-blue-300 text-blue-700"
                                    >
                                      +{(profile.crops || profile.cropsInterested || []).length - 3} more
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {profile.organicCertified && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                  🌿 Organic Certified
                                </Badge>
                              )}

                              <div className="flex gap-2">
                                <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                                  View Profile
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 bg-transparent border-blue-300 text-blue-600 hover:bg-blue-50"
                                >
                                  <MessageCircle className="h-3 w-3 mr-1" />
                                  Message
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "messages" && (
              <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-orange-600" />
                    {t("dashboard.messages.title")}
                  </CardTitle>
                  <CardDescription>{t("dashboard.messages.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="relative">
                      <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-pink-400 text-white text-xs px-2 py-1 rounded-full">
                        Soon
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-gray-600">
                      {t("dashboard.messages.comingSoon")} 🚀
                    </h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">{t("dashboard.messages.featureDescription")}</p>
                    <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-lg max-w-sm mx-auto border border-orange-200">
                      <p className="text-sm text-gray-600">
                        <strong className="text-orange-600">🎯 {t("dashboard.messages.comingFeatures")}:</strong>
                        <br />💬 {t("dashboard.messages.realtimeMessaging")}
                        <br />📎 {t("dashboard.messages.fileSharing")}
                        <br />🎤 {t("dashboard.messages.voiceMessages")}
                        <br />👥 {t("dashboard.messages.groupConversations")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
