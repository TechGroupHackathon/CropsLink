import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language resources
const resources = {
  en: {
    translation: {
      // Common
      'app.name': 'FarmConnect',
      'app.tagline': 'Connecting Farmers and Distributors',
      
      // Navigation
      'nav.profile': 'Profile',
      'nav.messages': 'Messages',
      'nav.cropManager': 'Crop Manager',
      'nav.logout': 'Logout',
      
      // Onboarding
      'onboarding.welcome': 'Welcome to FarmConnect',
      'onboarding.selectLanguage': 'Select your language',
      'onboarding.selectRole': 'Select your role',
      'onboarding.farmer': 'Farmer',
      'onboarding.distributor': 'Distributor',
      'onboarding.registration': 'Registration',
      'onboarding.next': 'Next',
      'onboarding.back': 'Back',
      'onboarding.documents': 'Documents',
      'onboarding.personalInfo': 'Personal Info',
      'onboarding.cropInfo': 'Crop Info',
      'onboarding.uploadDocuments': 'Upload Documents',
      'onboarding.aadhaarFront': 'Aadhaar Card (Front)',
      'onboarding.aadhaarBack': 'Aadhaar Card (Back)',
      'onboarding.selfie': 'Selfie',
      'onboarding.uploadFile': 'Upload a file',
      'onboarding.remove': 'Remove',
      'onboarding.cropPlaceholder': 'Enter your crops (e.g., Rice, Wheat, Vegetables)',
      
      // Profile Fields
      'profile.name': 'Name',
      'profile.address': 'Address',
      'profile.contact': 'Contact Information',
      'profile.number': 'Phone Number',
      'profile.crops': 'Crops',
      'profile.photo': 'Profile Photo (Optional)',
      'profile.save': 'Save Profile',
      
      // Voice Assistant
      'voice.start': 'Start Voice Assistant',
      'voice.stop': 'Stop Voice Assistant',
      'voice.listening': 'Listening...',
      'voice.instructions': 'Please speak clearly after the beep',
      
      // Dashboard
      'dashboard.welcome': 'Welcome to your Dashboard',
      'dashboard.noProfiles': 'You haven\'t visited any profiles yet.',
      'dashboard.recentlyViewed': 'Recently Viewed Profiles',
      
      // Search & Filter
      'search.placeholder': 'Search by crop, location...',
      'filter.cropType': 'Crop Type',
      'filter.location': 'Location',
      'filter.rating': 'Rating',
      'filter.availability': 'Availability',
      'filter.apply': 'Apply Filters',
      'filter.clear': 'Clear Filters',
      
      // Crop Management
      'crop.add': 'Add Crop',
      'crop.edit': 'Edit Crop',
      'crop.delete': 'Delete Crop',
      'crop.name': 'Crop Name',
      'crop.variety': 'Variety',
      'crop.quantity': 'Quantity',
      'crop.harvestDate': 'Harvest Date',
      'crop.image': 'Crop Image (Optional)',
      'crop.save': 'Save Crop',
      'crop.cancel': 'Cancel',
    },
  },
  hi: {
    translation: {
      // Common
      'app.name': 'फार्मकनेक्ट',
      'app.tagline': 'किसानों और वितरकों को जोड़ना',
      
      // Navigation
      'nav.profile': 'प्रोफाइल',
      'nav.messages': 'संदेश',
      'nav.cropManager': 'फसल प्रबंधक',
      'nav.logout': 'लॉगआउट',
      
      // Onboarding
      'onboarding.welcome': 'फार्मकनेक्ट में आपका स्वागत है',
      'onboarding.selectLanguage': 'अपनी भाषा चुनें',
      'onboarding.selectRole': 'अपनी भूमिका चुनें',
      'onboarding.farmer': 'किसान',
      'onboarding.distributor': 'वितरक',
      'onboarding.registration': 'पंजीकरण',
      'onboarding.next': 'अगला',
      'onboarding.back': 'पीछे',
      'onboarding.documents': 'दस्तावेज़',
      'onboarding.personalInfo': 'व्यक्तिगत जानकारी',
      'onboarding.cropInfo': 'फसल की जानकारी',
      'onboarding.uploadDocuments': 'दस्तावेज़ अपलोड करें',
      'onboarding.aadhaarFront': 'आधार कार्ड (सामने)',
      'onboarding.aadhaarBack': 'आधार कार्ड (पीछे)',
      'onboarding.selfie': 'सेल्फी',
      'onboarding.uploadFile': 'फ़ाइल अपलोड करें',
      'onboarding.remove': 'हटाएं',
      'onboarding.cropPlaceholder': 'अपनी फसलें दर्ज करें (जैसे, चावल, गेहूं, सब्जियां)',
      
      // Profile Fields
      'profile.name': 'नाम',
      'profile.address': 'पता',
      'profile.contact': 'संपर्क जानकारी',
      'profile.number': 'फोन नंबर',
      'profile.crops': 'फसलें',
      'profile.photo': 'प्रोफाइल फोटो (वैकल्पिक)',
      'profile.save': 'प्रोफाइल सहेजें',
      
      // Voice Assistant
      'voice.start': 'वॉइस असिस्टेंट शुरू करें',
      'voice.stop': 'वॉइस असिस्टेंट बंद करें',
      'voice.listening': 'सुन रहा है...',
      'voice.instructions': 'कृपया बीप के बाद स्पष्ट रूप से बोलें',
      
      // Dashboard
      'dashboard.welcome': 'अपने डैशबोर्ड में आपका स्वागत है',
      'dashboard.noProfiles': 'आपने अभी तक किसी प्रोफाइल को नहीं देखा है।',
      'dashboard.recentlyViewed': 'हाल ही में देखे गए प्रोफाइल',
      
      // Search & Filter
      'search.placeholder': 'फसल, स्थान से खोजें...',
      'filter.cropType': 'फसल प्रकार',
      'filter.location': 'स्थान',
      'filter.rating': 'रेटिंग',
      'filter.availability': 'उपलब्धता',
      'filter.apply': 'फिल्टर लागू करें',
      'filter.clear': 'फिल्टर साफ करें',
      
      // Crop Management
      'crop.add': 'फसल जोड़ें',
      'crop.edit': 'फसल संपादित करें',
      'crop.delete': 'फसल हटाएं',
      'crop.name': 'फसल का नाम',
      'crop.variety': 'किस्म',
      'crop.quantity': 'मात्रा',
      'crop.harvestDate': 'कटाई की तारीख',
      'crop.image': 'फसल की छवि (वैकल्पिक)',
      'crop.save': 'फसल सहेजें',
      'crop.cancel': 'रद्द करें',
    },
  },
  mr: {
    translation: {
      // Common
      'app.name': 'फार्मकनेक्ट',
      'app.tagline': 'शेतकरी आणि वितरक जोडणे',
      
      // Navigation
      'nav.profile': 'प्रोफाइल',
      'nav.messages': 'संदेश',
      'nav.cropManager': 'पीक व्यवस्थापक',
      'nav.logout': 'लॉगआउट',
      
      // Onboarding
      'onboarding.welcome': 'फार्मकनेक्टमध्ये आपले स्वागत आहे',
      'onboarding.selectLanguage': 'आपली भाषा निवडा',
      'onboarding.selectRole': 'आपली भूमिका निवडा',
      'onboarding.farmer': 'शेतकरी',
      'onboarding.distributor': 'वितरक',
      'onboarding.registration': 'नोंदणी',
      'onboarding.next': 'पुढे',
      'onboarding.back': 'मागे',
      'onboarding.documents': 'कागदपत्रे',
      'onboarding.personalInfo': 'वैयक्तिक माहिती',
      'onboarding.cropInfo': 'पीक माहिती',
      'onboarding.uploadDocuments': 'कागदपत्रे अपलोड करा',
      'onboarding.aadhaarFront': 'आधार कार्ड (समोर)',
      'onboarding.aadhaarBack': 'आधार कार्ड (मागे)',
      'onboarding.selfie': 'सेल्फी',
      'onboarding.uploadFile': 'फाईल अपलोड करा',
      'onboarding.remove': 'काढून टाका',
      'onboarding.cropPlaceholder': 'आपली पिके प्रविष्ट करा (उदा., तांदूळ, गहू, भाज्या)',
      
      // Profile Fields
      'profile.name': 'नाव',
      'profile.address': 'पत्ता',
      'profile.contact': 'संपर्क माहिती',
      'profile.number': 'फोन नंबर',
      'profile.crops': 'पिके',
      'profile.photo': 'प्रोफाइल फोटो (ऐच्छिक)',
      'profile.save': 'प्रोफाइल जतन करा',
      
      // Voice Assistant
      'voice.start': 'व्हॉइस असिस्टंट सुरू करा',
      'voice.stop': 'व्हॉइस असिस्टंट थांबवा',
      'voice.listening': 'ऐकत आहे...',
      'voice.instructions': 'कृपया बीप नंतर स्पष्टपणे बोला',
      
      // Dashboard
      'dashboard.welcome': 'आपल्या डॅशबोर्डवर आपले स्वागत आहे',
      'dashboard.noProfiles': 'आपण अद्याप कोणतेही प्रोफाइल पाहिले नाही.',
      'dashboard.recentlyViewed': 'अलीकडे पाहिलेले प्रोफाइल',
      
      // Search & Filter
      'search.placeholder': 'पीक, स्थान द्वारे शोधा...',
      'filter.cropType': 'पीक प्रकार',
      'filter.location': 'स्थान',
      'filter.rating': 'रेटिंग',
      'filter.availability': 'उपलब्धता',
      'filter.apply': 'फिल्टर लागू करा',
      'filter.clear': 'फिल्टर साफ करा',
      
      // Crop Management
      'crop.add': 'पीक जोडा',
      'crop.edit': 'पीक संपादित करा',
      'crop.delete': 'पीक हटवा',
      'crop.name': 'पिकाचे नाव',
      'crop.variety': 'प्रकार',
      'crop.quantity': 'प्रमाण',
      'crop.harvestDate': 'कापणीची तारीख',
      'crop.image': 'पिकाचा फोटो (ऐच्छिक)',
      'crop.save': 'पीक जतन करा',
      'crop.cancel': 'रद्द करा',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;