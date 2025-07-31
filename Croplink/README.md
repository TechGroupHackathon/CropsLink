# FarmConnect 🌾

A comprehensive web-based platform that connects farmers and distributors through a searchable, profile-based community system. Built with modern web technologies and enhanced with simulated AI-powered features for seamless user onboarding and interaction.

![FarmConnect Banner](https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=400&fit=crop&crop=center)

## 🎯 Project Overview

FarmConnect bridges the gap between farmers and distributors by providing:

- **📋 Document-verified farmer registration** with simulated Aadhaar OCR extraction and location parsing
- **🎤 Voice-assisted onboarding** in multiple languages (English, Hindi, Marathi)
- **🔍 Advanced search and filtering** with dropdown selectors for connecting relevant parties
- **👥 Community-based networking** (non-transactional platform)
- **📱 Responsive, accessible user interface** designed for users with varying digital literacy
- **🎨 Color-optimized design** with gradient backgrounds for enhanced user engagement
- **📊 JSON-based user management** system with file storage
- **🌍 Multi-language support** with comprehensive translation system

## 🚀 Tech Stack

### **Frontend Framework & Core**
- **Next.js 14** - React framework with App Router for server-side rendering and routing
- **TypeScript** - Type-safe development with static type checking
- **React 18** - Component-based UI library with hooks and context
- **React Hooks** - useState, useEffect, useCallback, useContext for state management

### **Styling & UI Components**
- **Tailwind CSS** - Utility-first CSS framework with custom color theory implementation
- **shadcn/ui** - Modern, accessible UI component library built on Radix UI
- **Radix UI** - Unstyled, accessible UI primitives (Avatar, Progress, Tabs, etc.)
- **Lucide React** - Beautiful, customizable SVG icon library
- **CSS Custom Properties** - Dynamic theming and color management
- **Responsive Design** - Mobile-first approach with breakpoint optimization

### **State Management & Context**
- **React Context API** - Global state management for language and user data
- **Custom Hooks** - Reusable logic for translations, user management, and UI state
- **Local Storage API** - Client-side data persistence and session management

### **File Handling & Media**
- **File API** - Native browser file upload and validation
- **Canvas API** - Image processing and validation for Aadhaar cards
- **Blob API** - File preview generation and memory management
- **Image Processing** - Client-side image validation and optimization

### **OCR & AI Features (Simulated)**
- **Simulated OCR Engine** - Demo implementation with realistic data patterns
- **Address Parsing** - Regex-based location extraction from Indian addresses
- **Text Recognition Patterns** - Aadhaar-specific data extraction algorithms
- **Confidence Scoring** - OCR accuracy measurement and validation
- **Realistic Demo Data** - Multiple profile variations for comprehensive testing

### **Voice & Speech (Simulated)**
- **Web Speech API** - Browser-based speech recognition (demo implementation)
- **Text-to-Speech** - Voice guidance for registration process
- **Multi-language Voice** - Support for English, Hindi, and Marathi

### **Internationalization (i18n)**
- **Custom Translation System** - Multi-language support with fallback mechanisms
- **Language Context** - React context for dynamic language switching
- **Locale Management** - Persistent language preferences with localStorage

### **Data Management**
- **JSON File Storage** - File-based database operations with structured data
- **TypeScript Interfaces** - Strongly typed data models for users and profiles
- **Data Validation** - Form validation and error handling
- **Export/Import** - User data management capabilities

### **Development Tools**
- **ESLint** - Code linting with Next.js and TypeScript rules
- **Prettier** - Code formatting and style consistency
- **TypeScript Compiler** - Static type checking and IntelliSense
- **Next.js Dev Tools** - Hot reloading and development optimization

### **Build & Deployment**
- **Next.js Build System** - Optimized production builds with code splitting
- **Vercel Platform** - Seamless deployment and hosting
- **Static Site Generation** - Pre-rendered pages for optimal performance
- **Asset Optimization** - Automatic image and bundle optimization

## 📱 Pages & Features

### 1. **Landing Page** (`/`)
- **URL**: `http://localhost:3000/`
- **Features**:
  - 🌐 **Dynamic Language Selection** (English, Hindi, Marathi) with persistent storage
  - 👤 **Role-based Navigation** (Farmer vs Distributor) with visual cards
  - 📱 **Fully Responsive Design** with mobile-first approach
  - 🎨 **Gradient Backgrounds** and engaging color schemes
  - 🧭 **Smart Routing** to registration with language parameters
  - ⚡ **Performance Optimized** with lazy loading and code splitting

### 2. **Farmer Registration** (`/register?role=farmer&lang=en`)
- **URL**: `http://localhost:3000/register?role=farmer&lang=en`
- **Enhanced Features**:
  - **Step 1**: 🎤 **Voice Assistant Toggle** with TTS guidance
  - **Step 2**: 📄 **Advanced Aadhaar Upload** with drag-drop, validation, and preview
  - **Step 3**: 🔍 **Simulated OCR Processing** with location extraction and confidence scoring
  - **Step 4**: 🗣️ **Voice Input Integration** with automatic location pre-filling
  - **Step 5**: 📞 **Contact Validation** with email format checking
  - **Step 6**: ✅ **Profile Completion** with comprehensive overview
  - 📊 **Progress Tracking** with visual indicators
  - ✔️ **Multi-step Validation** with error handling and user feedback
  - 📍 **Smart Location Extraction** from Aadhaar address parsing

### 3. **Distributor Registration** (`/register?role=distributor&lang=en`)
- **URL**: `http://localhost:3000/register?role=distributor&lang=en`
- **Streamlined Features**:
  - **Step 1**: 🌐 **Language & Voice Setup** with consistent UX
  - **Step 2**: ℹ️ **Business Information** with type selection
  - **Step 3**: 📞 **Contact & Address** with validation
  - **Step 4**: 🌾 **Crop Interests** with multi-select and location
  - **Step 5**: ✅ **Business Completion** with certification management
  - ⚡ **Optimized Flow** compared to farmer registration
  - 🏢 **Business-focused** validation and data collection

### 4. **Simple Login System** (`/login`)
- **URL**: `http://localhost:3000/login`
- **Development Features**:
  - 👤 **Name-based Authentication** - Login with just name and role
  - 🔍 **User Lookup** - Searches JSON files for existing users
  - 🚀 **Quick Access** - No password required for development
  - 📱 **Responsive Design** - Works on all devices
  - 🔄 **Session Management** - Maintains user state across pages

### 5. **Enhanced Dashboard** (`/dashboard`)
- **URL**: `http://localhost:3000/dashboard` (requires registration/login)
- **Advanced Features**:
  - **🎨 Modern UI Design**: 
    - Color-coded navigation with gradients
    - Responsive sidebar with auto-collapse
    - Mobile-friendly overlay navigation
    - Smooth animations and transitions
  - **📊 Dashboard Overview**: 
    - Welcome message with user personalization
    - Activity statistics with visual cards
    - Recent activity feed with avatars
    - Performance metrics and engagement data
  - **👤 Enhanced Profile Section**: 
    - Complete user information display
    - Verification badges and status
    - Contact information with icons
    - Role-specific data presentation
  - **🌾 Crop Manager** (Farmers only): 
    - Visual crop portfolio with cards
    - Availability status and pricing
    - Quantity management
    - Update functionality
  - **🔍 Advanced Search & Connect**: 
    - **Dropdown Filter System** with proper translations
    - Crop type selection with all major crops
    - Location-based filtering by states
    - Rating-based filtering (4+, 3+, 2+ stars)
    - Smart search results with profile cards
    - Direct messaging and profile viewing
  - **💬 Messages System**: 
    - "Coming Soon" feature preview
    - Feature roadmap display
    - Real-time messaging preparation
    - File sharing and voice message planning

## 🗄️ JSON File-Based Database System

### **Database Structure**
\`\`\`
farmconnect/
├── db/
│   ├── farmers.json      ← All farmer profiles
│   └── distributors.json ← All distributor profiles
\`\`\`

### **User Data Interface**
\`\`\`typescript
interface FarmerProfile {
  id: string
  name: string
  spokenName?: string
  aadhaarNumber?: string
  dateOfBirth?: string
  address?: string
  location?: string
  extractedLocation?: string
  extractedState?: string
  extractedDistrict?: string
  phone: string
  email?: string
  crops: string[]
  farmSize: string
  experience: string
  organicCertified: boolean
  description?: string
  ocrConfidence?: number
  registrationDate: string
  verified: boolean
}

interface DistributorProfile {
  id: string
  businessName: string
  ownerName: string
  businessType: string
  state: string
  district: string
  phone: string
  email: string
  cropsInterested: string[]
  minOrderQuantity: string
  experience: string
  certifications: string[]
  description?: string
  registrationDate: string
  verified: boolean
}
\`\`\`

### **Database Operations**
- `saveFarmer(farmer)` - Save farmer profile to farmers.json
- `saveDistributor(distributor)` - Save distributor profile to distributors.json
- `getAllFarmers()` - Retrieve all farmer profiles
- `getAllDistributors()` - Retrieve all distributor profiles
- `getFarmerById(id)` - Find specific farmer
- `getDistributorById(id)` - Find specific distributor
- `searchFarmers(query)` - Search farmers with filters
- `searchDistributors(query)` - Search distributors with filters

## 🔍 Simulated OCR System

### **OCR Processing Features**
- **Image Validation**: Aspect ratio, brightness, and quality checks
- **Realistic Demo Data**: Multiple profile variations for testing
- **Location Extraction**: Regex-based parsing of Indian addresses
- **Confidence Scoring**: Simulated accuracy measurement
- **Error Handling**: Graceful fallback to demo data

### **Demo OCR Profiles**
\`\`\`typescript
const demoProfiles = [
  {
    name: "राम कुमार शर्मा",
    aadharNumber: "1234 5678 9012",
    dateOfBirth: "15/08/1985",
    address: "Village Rampur, Tehsil Kharkhoda, District Sonipat, Haryana - 131001",
    confidence: 87
  },
  // ... more profiles
]
\`\`\`

### **Address Parsing Engine**
- **State Recognition**: Identifies all Indian states
- **District Extraction**: Parses district information
- **Village/Tehsil**: Extracts local administrative units
- **Pincode Detection**: Identifies postal codes
- **Location String**: Creates readable location format

## 🌍 Internationalization System

### **Comprehensive Translation Support**
- **Languages**: English (en), Hindi (hi), Marathi (mr)
- **Translation Keys**: 200+ translation keys covering all UI elements
- **Fallback System**: Automatic fallback to English if translation missing
- **Context-Aware**: Role-specific translations for farmers and distributors
- **Persistent Language**: Language preference saved in localStorage

### **Translation Categories**
- **Landing Page**: Hero content, features, role selection
- **Registration**: Step-by-step guidance, form labels, validation messages
- **Dashboard**: Navigation, profile sections, search filters, messages
- **Common**: Crops, locations, business types, states
- **Error Messages**: Validation errors, upload issues, system messages

## 🧪 Comprehensive Testing Scenarios

### **Document Upload & Simulated OCR Testing**
1. **File Validation Testing**:
   - Upload various file formats (JPEG, PNG, WebP, invalid formats)
   - Test file size limits (under 5MB, over 5MB)
   - Validate image quality (too dark, too bright, blurred)
   - Test aspect ratio validation for Aadhaar cards

2. **OCR Processing Testing**:
   - Upload clear Aadhaar card images (front & back)
   - Test simulated OCR extraction with demo data
   - Verify location parsing from address
   - Test confidence scoring and validation
   - Try manual data correction and override

3. **Location Extraction Testing**:
   - Test address parsing with various Indian address formats
   - Verify state, district, village, pincode extraction
   - Test location pre-filling in registration step 4
   - Validate user override capabilities

### **Authentication & User Management Testing**
1. **Registration Testing**:
   - Complete farmer registration with all steps
   - Complete distributor registration
   - Test form validation at each step
   - Verify data saving to JSON files

2. **Login Testing**:
   - Login with registered farmer name
   - Login with registered distributor name
   - Test invalid name/role combinations
   - Verify session management

3. **Data Persistence Testing**:
   - Check farmers.json after registration
   - Check distributors.json after registration
   - Verify user data structure
   - Test data retrieval and search

### **Voice Assistant & Multi-language Testing**
1. **Voice Features Testing**:
   - Enable voice assistant during registration
   - Test simulated TTS (Text-to-Speech) prompts
   - Test simulated STT (Speech-to-Text) for name input
   - Try different languages (EN/HI/MR)

2. **Language Switching Testing**:
   - Test language selection on landing page
   - Verify translation persistence across pages
   - Test fallback to English for missing translations
   - Validate role-specific translations

### **Advanced Search & Filter Testing**
1. **Filter System Testing**:
   - Complete registration as both farmer and distributor
   - Test dropdown filters:
     - 🌾 **Crop Type**: All crops, Rice, Wheat, Cotton, etc.
     - 📍 **Location**: All locations, Punjab, Haryana, Maharashtra, etc.
     - ⭐ **Rating**: Any rating, 4+ stars, 3+ stars, 2+ stars
     - 🌿 **Organic Certification**: Filter for organic farmers
   - Test search result display and profile cards
   - Verify profile interactions and messaging buttons

2. **Search Results Testing**:
   - Test search with different filter combinations
   - Verify result accuracy and relevance
   - Test profile card interactions
   - Validate "View Profile" and "Message" buttons

## 🔧 Setup & Installation

### **Prerequisites**
- **Node.js 18+** - JavaScript runtime
- **npm or yarn** - Package manager
- **Modern Web Browser** - Chrome, Firefox, Safari, Edge
- **Git** - Version control system

### **Installation Steps**

1. **Clone and Install Dependencies**
   \`\`\`bash
   git clone <repository-url>
   cd farmconnect
   npm install
   # or
   yarn install
   \`\`\`

2. **Setup Database Files**
   \`\`\`bash
   npm run setup-db
   # or manually create:
   # mkdir db
   # echo "[]" > db/farmers.json
   # echo "[]" > db/distributors.json
   \`\`\`

3. **Environment Configuration**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your settings (optional for basic functionality)
   \`\`\`

4. **Run Development Server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Access Application**
   - Open `http://localhost:3000` in your browser
   - Start testing with the landing page
   - Try different languages and roles

6. **Build for Production**
   \`\`\`bash
   npm run build
   npm start
   # or
   yarn build
   yarn start
   \`\`\`

## 📊 Enhanced Mock Data

### **Comprehensive Farmer Profiles (8 profiles)**
- **Geographic Diversity**: Covers major agricultural states across India
- **Crop Variety**: Rice, Wheat, Cotton, Sugarcane, Vegetables, Fruits, Spices
- **Farm Sizes**: Small (2-5 acres) to Large (15-20 acres)
- **Experience Levels**: New farmers (5-7 years) to experienced (12-15 years)
- **Certification Status**: Mix of organic and conventional farming
- **Rating Distribution**: 4.3 to 4.9 stars with realistic variations
- **Language Diversity**: Names in Hindi script with English translations

### **Diverse Distributor Profiles (6 profiles)**
- **Business Types**: Wholesale, Retail, Export, Processing, Cooperative, Individual
- **Multi-state Coverage**: Punjab, Maharashtra, Gujarat, MP, Kerala, Rajasthan
- **Order Quantities**: 15-100 tons minimum order requirements
- **Specializations**: Different crop categories and market segments
- **Certifications**: FSSAI, Import/Export, ISO, HACCP, Organic
- **Experience Range**: 8-20 years in agricultural business

## 🎯 Key Features & Enhancements

### **Simplified OCR System**
- **No External Dependencies**: No Google Cloud or other OCR services required
- **Realistic Demo Data**: Multiple profile variations for comprehensive testing
- **Image Validation**: Client-side validation for uploaded images
- **Location Intelligence**: Smart address parsing with regex patterns
- **Confidence Scoring**: Simulated accuracy measurement
- **Error Handling**: Graceful fallback and user-friendly error messages

### **JSON File Database**
- **Simple Setup**: Just create two JSON files
- **No Database Server**: No PostgreSQL, MySQL, or cloud database needed
- **Version Control Friendly**: Track data changes in Git
- **Easy Backup**: Simple file copying
- **Development Focused**: Perfect for testing and development

### **Name-Based Authentication**
- **Development Friendly**: No complex password management
- **Quick Testing**: Instant login with just name and role
- **User Lookup**: Searches existing profiles in JSON files
- **Session Management**: Maintains user state across pages
- **Role-Based Access**: Different features for farmers vs distributors

## 🔮 Roadmap & Future Enhancements

### **Phase 1: Core Infrastructure** ✅
- [x] Multi-language support with comprehensive translations
- [x] Simulated OCR with location extraction
- [x] Responsive design with mobile-first approach
- [x] Enhanced search and filtering system
- [x] JSON file-based user management
- [x] Name-based authentication system

### **Phase 2: Real Integrations** 🚧
- [ ] **Real OCR Integration**: Google Cloud Vision, AWS Textract, Azure Computer Vision
- [ ] **Actual Voice Recognition**: Web Speech API implementation
- [ ] **Database Integration**: PostgreSQL, MongoDB, or Supabase
- [ ] **Authentication System**: NextAuth.js with multiple providers
- [ ] **File Storage**: AWS S3, Google Cloud Storage, or Vercel Blob

### **Phase 3: Advanced Features** 📋
- [ ] **Real-time Messaging**: WebSocket-based chat system
- [ ] **Video Calling**: WebRTC integration for farmer-distributor meetings
- [ ] **Payment Integration**: Razorpay, Stripe for transaction processing
- [ ] **GPS Integration**: Location-based services and mapping
- [ ] **Push Notifications**: Real-time alerts and updates

### **Phase 4: AI & Analytics** 🤖
- [ ] **Crop Recommendation**: AI-based crop suggestion system
- [ ] **Price Prediction**: Market price forecasting
- [ ] **Weather Integration**: Weather-based farming advice
- [ ] **Analytics Dashboard**: Business intelligence and insights
- [ ] **Machine Learning**: User behavior analysis and recommendations

## 🐛 Known Issues & Limitations

### **Current Limitations**
1. **OCR Simulation**: Uses mock data extraction instead of real OCR processing
2. **Voice Recognition**: Simulated responses for demo purposes only
3. **Authentication**: Simple name-based system (not production-ready)
4. **Data Storage**: JSON files (not suitable for production scale)
5. **Real-time Features**: No actual real-time messaging or notifications

### **Development Considerations**
1. **File Permissions**: Ensure write permissions for db folder
2. **Browser Compatibility**: Voice features work best in Chrome/Edge browsers
3. **Mobile Voice**: iOS Safari has limited Web Speech API support
4. **Data Persistence**: JSON files are stored locally
5. **Concurrent Access**: No file locking mechanism implemented

## 📞 Support & Contributing

### **Getting Help**
1. **Documentation**: Check this README for comprehensive information
2. **Browser Console**: Check for error messages and debugging info
3. **JSON Files**: Verify db/farmers.json and db/distributors.json exist
4. **File Structure**: Ensure proper project structure
5. **Dependencies**: Verify all packages are installed correctly

### **Development Workflow**
\`\`\`bash
# 1. Fork and clone the repository
git clone <your-fork-url>
cd farmconnect

# 2. Install dependencies
npm install

# 3. Setup database files
npm run setup-db

# 4. Create feature branch
git checkout -b feature/your-feature-name

# 5. Make changes and test
npm run dev
npm run type-check
npm run lint

# 6. Commit and push
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name

# 7. Create pull request
\`\`\`

## 📄 License & Credits

### **License**
This project is licensed under the MIT License - see the LICENSE file for details.

### **Credits & Acknowledgments**
- **UI Components**: Built with shadcn/ui and Radix UI
- **Icons**: Lucide React icon library
- **Styling**: Tailwind CSS framework
- **Framework**: Next.js and React
- **Typography**: Inter font family from Google Fonts
- **Images**: Unsplash for placeholder images
- **Inspiration**: Real-world agricultural challenges and solutions

---

**Built with ❤️ for the farming community**

### 🌟 **Latest Updates - Version 2.0 (Simplified)**

#### **v2.0 - Simplified OCR & Authentication** 🚀
1. **✅ Simplified OCR System**: Removed Google Cloud dependency, using realistic demo data
2. **✅ JSON File Database**: Simple file-based storage for development
3. **✅ Name-Based Authentication**: Quick login system for development testing
4. **✅ Enhanced User Experience**: Maintained all UI/UX improvements
5. **✅ Multi-language Support**: Complete translation system
6. **✅ Responsive Design**: Mobile-optimized interface
7. **✅ Advanced Search**: Dropdown filters with proper functionality

#### **Technical Achievements** 💻
- **Zero External Dependencies** for core OCR functionality
- **Simple Setup Process** with just JSON files
- **Development-Friendly** authentication system
- **Comprehensive Testing** scenarios and documentation
- **Production-Ready UI** with simplified backend
- **Easy Deployment** with minimal configuration

The platform is now simplified for easy development and testing while maintaining all the advanced UI features! 🎉
