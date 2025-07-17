
# Prd Farm Connect

## Product Requirements Document (PRD)

**Product Name**: FarmConnect  
**Version**: 1.0  
**Last Updated**: July 8, 2025

---

## 1. Purpose

FarmConnect is a web-based application that connects farmers and distributors at the state/regional level through a searchable, profile-based community platform. It facilitates discovery and networking (not ordering) between users and supports multi-language access, voice-enabled onboarding, and a simple, farmer-friendly UI.

---

## 2. Goals and Objectives

- Enable farmers to showcase crops and connect with relevant distributors.  
- Enable distributors to find suitable farmers based on location, crop type, and availability.  
- Ensure simplicity and accessibility for users with low digital literacy.  
- Provide multilingual and voice-assisted onboarding experiences.  
- Create a non-transactional, community-based platform.

---

## 3. User Roles

- **Farmer**  
- **Distributor**  

Each role has a distinct profile, dashboard, and crop management capabilities.

---

## 4. Core Features

### 4.1 Profile Registration and Onboarding

- Initial page displays three language selection buttons (Hindi, Marathi, English).
- After language selection, user chooses role (Farmer or Distributor).
- Separate flows for farmers and distributors:
  - **Farmer**: 
    - First page requires uploading Aadhaar card images and a selfie.
    - infomation extraction from images
    - Crop selection using voice 
  - **Distributor**: 
    - First page requires Name, Number, Address, and a selfie.
    - crop selection 
- Cannot proceed without validating all mandatory fields.  
- AI voice assistant to prompt for each required field (supports Hindi, Marathi, English).

### 4.2 AI Voice Assistant

- Uses Web Speech API or Google Cloud Speech-to-Text.  
- Guides users through profile creation by asking:  
  - Name  
  For Farmer using voice collect crop lists.
  - Location/Distributor  address  
  - Contact information (phone/WhatsApp)  
  - Crop type, quantity, and season  
- Multilingual prompts (EN/HI/MR).

### 4.3 Dashboard

- Sidebar navigation on the left:  
  - Profile  
  - Messages (future enhancement)  
  - Crop Manager  
  - Logout  
- Content Area:  
  - Initial login: Displays placeholder text like “You haven’t visited any profiles yet.”  
  - Visited Profiles: Grid of square cards showing previously viewed profiles.

### 4.4 Search & Filter

- Available after onboarding is complete.  
- Farmers can filter distributors by:  
  - Crop Type  
  - Location (state/district)  
  - Rating  
- Distributors can filter farmers by:  
  - Crop Type  
  - Location  
  - Availability/Harvest Date

### 4.5 Profile Cards

- Square-shaped cards.  
- Information on card:  
  - Profile image/logo  
  - Name & Location  
  - Crop list  
  - Star rating  
  - View Profile button  
  - Hover state: border highlight + quick contact icon

### 4.6 Crop Management (Farmer/Distributor)

- Add, Edit, Delete crop entries (no global listing).  
- Fields:  
  - Crop Name  
  - Variety  
  - Quantity  
  - Harvest Date  
  - Optional image

### 4.7 Multilingual Support

- UI language options:  
  - English, Hindi, Marathi (initial)  
- Implemented using `react-i18next` or equivalent i18n library.  
- All UI elements, system messages, voice prompts localized.

---

## 5. Technical Stack

- **Frontend**: React with Vite, Tailwind CSS, react-i18next  
- **Backend**: Python  
- **Database**: PostgreSQL  
- **AI/Voice**: Web Speech API or Google Cloud Speech-to-Text  
- **Hosting**:  
  - Vercel

---

## 6. Security & Privacy

- HTTPS enforced  
- Secure authentication (JWT or OAuth)  
- Passwords stored using bcrypt  
- Input validation and sanitation

---

## 7. Future Enhancements

- Chat/Messaging between users  
- Community forums for agricultural discussion  
- Insights dashboard (regional crop trends, demand tracking)  
- Mobile application with offline support

---

## 8. Milestones

| Phase       | Deliverables                                    | Timeline   |
|-------------|--------------------------------------------------|------------|
| Phase 1     | Wireframes, PRD, i18n setup, AI voice POC       | Week 1–2   |
| Phase 2     | Registration, Profile, Crop Mgmt, Search        | Week 3–5   |
| Phase 3     | UX feedback, accessibility, translations        | Week 6     |
| Phase 4     | Live deployment, user onboarding                | Week 7     |

---

## 9. Success Metrics

- % of users who complete profile via voice assistant  
- Number of daily connections (profile views)  
- Language selection rates (EN vs HI vs MR)  
- Profile completeness rate  
- Average time to onboard new users  

---

FarmConnect is designed to empower regional agriculture by building accessible, trust-based connections between farmers and distributors.
