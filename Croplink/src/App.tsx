import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import './i18n' // Import i18n configuration
import LanguageSelectionPage from './components/onboarding/LanguageSelectionPage'
import RoleSelectionPage from './components/onboarding/RoleSelectionPage'
import FarmerRegistration from './components/onboarding/FarmerRegistration'
import DistributorRegistration from './components/onboarding/DistributorRegistration'
import Dashboard from './components/dashboard/Dashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Redirect root to language selection */}
          <Route path="/" element={<Navigate to="/language-selection" />} />
          
          {/* Onboarding Routes */}
          <Route path="/language-selection" element={<LanguageSelectionPage />} />
          <Route path="/role-selection" element={<RoleSelectionPage />} />
          <Route path="/farmer-registration" element={<FarmerRegistration />} />
          <Route path="/distributor-registration" element={<DistributorRegistration />} />
          
          {/* Main App Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
