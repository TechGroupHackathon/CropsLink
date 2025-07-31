export interface Translation {
  [key: string]: string | Translation
}

export const translations: Record<string, Translation> = {
  en: {
    // Landing Page
    landingPage: {
      title: "FarmConnect",
      subtitle: "Connecting Farmers & Distributors",
      description:
        "A comprehensive platform that bridges the gap between farmers and distributors through verified profiles, voice assistance, and smart matching.",
      features: {
        verified: {
          title: "Document Verified",
          description: "Aadhaar OCR verification",
        },
        voice: {
          title: "Voice Assisted",
          description: "Multi-language support",
        },
        search: {
          title: "Smart Search",
          description: "Advanced filtering",
        },
        community: {
          title: "Community",
          description: "Network building",
        },
      },
      roleSelection: {
        title: "Choose Your Role",
        farmer: {
          title: "I'm a Farmer",
          description: "Register as a farmer to connect with distributors and showcase your crops",
          features: {
            "0": "Document verification with Aadhaar",
            "1": "Voice-assisted registration",
            "2": "Crop portfolio management",
            "3": "Connect with verified distributors",
          },
          button: "Register as Farmer",
        },
        distributor: {
          title: "I'm a Distributor",
          description: "Register as a distributor to find and connect with farmers",
          features: {
            "0": "Quick registration process",
            "1": "Advanced search filters",
            "2": "Crop requirement management",
            "3": "Connect with verified farmers",
          },
          button: "Register as Distributor",
        },
      },
      footer: "Built with ❤️ for the farming community",
    },

    // Registration
    registration: {
      farmer: {
        title: "Farmer Registration",
        steps: {
          voice: {
            title: "Voice Assistant Setup",
            description: "Enable voice assistant for a guided registration experience",
            enable: "Enable Voice Assistant",
            continue: "Continue Without Voice",
            enabled: "🎤 Voice assistant enabled! I'll guide you through each step.",
          },
          aadhaar: {
            title: "Aadhaar Card Upload",
            frontSide: "Aadhaar Front Side",
            backSide: "Aadhaar Back Side",
            uploadFront: "Upload front side",
            uploadBack: "Upload back side",
            chooseFile: "Choose File",
            fileUploaded: "✓ File uploaded",
          },
          ocr: {
            title: "OCR Data Verification",
            completed: "✓ OCR extraction completed. Please verify the extracted information:",
            fullName: "Full Name",
            aadhaarNumber: "Aadhaar Number",
            dateOfBirth: "Date of Birth",
            address: "Address",
          },
          voice_input: {
            title: "Voice Input & Crop Selection",
            spokenName: "Spoken Name (Voice Input)",
            location: "Location (Voice Input)",
            clickMic: "Click mic to speak",
            selectCrops: "Select Your Crops",
            selectedCrops: "Selected crops:",
          },
          contact: {
            title: "Contact Details",
            phone: "Phone Number *",
            whatsapp: "WhatsApp Number",
            email: "Email Address",
          },
          profile: {
            title: "Profile Completion",
            farmSize: "Farm Size (in acres)",
            experience: "Years of Experience",
            organic: "I have organic certification",
            description: "Brief Description",
            descriptionPlaceholder: "Tell us about your farming practices, specialties, etc.",
            overview: "Profile Overview",
            name: "Name:",
            location: "Location:",
            crops: "Crops:",
            size: "Farm Size:",
            exp: "Experience:",
            organicCert: "Organic Certified:",
            yes: "Yes",
            no: "No",
          },
        },
      },
      distributor: {
        title: "Distributor Registration",
        steps: {
          voice: {
            title: "Voice Assistant Setup",
            description: "Enable voice assistant for a guided registration experience",
            enable: "Enable Voice Assistant",
            continue: "Continue Without Voice",
            enabled: "🎤 Voice assistant enabled! I'll guide you through each step.",
          },
          basic: {
            title: "Basic Information",
            businessName: "Business Name *",
            ownerName: "Owner Name *",
            businessType: "Business Type *",
            selectType: "Select business type",
          },
          contact: {
            title: "Contact Details",
            phone: "Phone Number *",
            whatsapp: "WhatsApp Number",
            email: "Email Address *",
            address: "Business Address *",
            addressPlaceholder: "Complete business address",
          },
          business: {
            title: "Business Details",
            state: "Operating State *",
            district: "Primary District",
            selectState: "Select state",
            districtPlaceholder: "Enter district name",
            cropsInterested: "Crops of Interest *",
            selectedCrops: "Selected crops:",
            minOrder: "Minimum Order Quantity (in tons)",
          },
          completion: {
            title: "Profile Completion",
            experience: "Years in Business",
            certifications: "Certifications & Licenses",
            selectedCerts: "Selected certifications:",
            description: "Business Description",
            descriptionPlaceholder: "Describe your business, specialties, and what you're looking for...",
            overview: "Profile Overview",
            business: "Business:",
            owner: "Owner:",
            type: "Type:",
            location: "Location:",
            crops: "Crops:",
            minOrder: "Min Order:",
            exp: "Experience:",
          },
        },
      },
      common: {
        step: "Step",
        of: "of",
        previous: "Previous",
        next: "Next",
        complete: "Complete Registration",
        loading: "Loading registration...",
      },
    },

    // Dashboard
    dashboard: {
      welcome: "Welcome back",
      loading: "Loading dashboard...",
      navigation: "Navigation",

      overview: {
        description: "Here's what's happening with your FarmConnect account",
        profileViews: "Profile Views",
        newMessages: "New Messages",
        searchMatches: "Search Matches",
        recentActivity: "Recent Activity",
      },

      navigation: {
        overview: "Overview",
        profile: "Profile",
        cropManager: "Crop Manager",
        searchConnect: "Search & Connect",
        messages: "Messages",
      },

      profile: {
        profileInformation: "Profile Information",
        verifiedDetails: "Your verified profile details",
        farmSize: "Farm Size",
        experience: "Experience",
        organicCertified: "Organic Certified",
        businessType: "Business Type",
        minOrder: "Min Order",
        crops: "🌾 Crops",
        cropsOfInterest: "🔍 Crops of Interest",
        description: "Description",
      },

      cropManager: {
        title: "Crop Manager",
        description: "Manage your crop portfolio and availability",
        status: "Status",
        available: "Available",
        quantity: "Quantity",
        price: "Price",
        updateDetails: "Update Details",
      },

      search: {
        title: "Search Filters",
        searchButton: "Search",
        filters: {
          cropType: "Crop Type",
          location: "Location",
          minRating: "Min Rating",
          selectCrop: "Select crop type",
          selectLocation: "Select location",
          allCrops: "All Crops",
          allLocations: "All Locations",
          anyRating: "Any Rating",
          stars: "Stars",
        },
      },

      messages: {
        title: "Messages",
        description: "Connect with other farmers and distributors",
        comingSoon: "Coming Soon!",
        featureDescription:
          "We're working on an amazing messaging feature that will allow you to communicate directly with farmers and distributors. Stay tuned!",
        comingFeatures: "Coming features",
        realtimeMessaging: "Real-time messaging",
        fileSharing: "File sharing",
        voiceMessages: "Voice messages",
        groupConversations: "Group conversations",
      },
    },

    // Common
    common: {
      crops: {
        rice: "Rice",
        wheat: "Wheat",
        sugarcane: "Sugarcane",
        cotton: "Cotton",
        maize: "Maize",
        pulses: "Pulses",
        oilseeds: "Oilseeds",
        vegetables: "Vegetables",
        fruits: "Fruits",
        spices: "Spices",
        tea: "Tea",
        coffee: "Coffee",
      },
      locations: {
        punjab: "Punjab",
        haryana: "Haryana",
        maharashtra: "Maharashtra",
        gujarat: "Gujarat",
        karnataka: "Karnataka",
        tamilNadu: "Tamil Nadu",
        uttarPradesh: "Uttar Pradesh",
        rajasthan: "Rajasthan",
        madhyaPradesh: "Madhya Pradesh",
        westBengal: "West Bengal",
      },
      states: {
        "andhra-pradesh": "Andhra Pradesh",
        maharashtra: "Maharashtra",
        karnataka: "Karnataka",
        "tamil-nadu": "Tamil Nadu",
        gujarat: "Gujarat",
        rajasthan: "Rajasthan",
        "madhya-pradesh": "Madhya Pradesh",
        "uttar-pradesh": "Uttar Pradesh",
        "west-bengal": "West Bengal",
        punjab: "Punjab",
        haryana: "Haryana",
      },
      businessTypes: {
        wholesale: "Wholesale Distributor",
        retail: "Retail Chain",
        export: "Export Company",
        processing: "Processing Unit",
        cooperative: "Cooperative Society",
        individual: "Individual Trader",
      },
    },
  },

  hi: {
    // Landing Page
    landingPage: {
      title: "फार्मकनेक्ट",
      subtitle: "किसानों और वितरकों को जोड़ना",
      description:
        "एक व्यापक प्लेटफॉर्म जो सत्यापित प्रोफाइल, आवाज सहायता और स्मार्ट मैचिंग के माध्यम से किसानों और वितरकों के बीच की खाई को पाटता है।",
      features: {
        verified: {
          title: "दस्तावेज़ सत्यापित",
          description: "आधार OCR सत्यापन",
        },
        voice: {
          title: "आवाज़ सहायक",
          description: "बहु-भाषा समर्थन",
        },
        search: {
          title: "स्मार्ट खोज",
          description: "उन्नत फ़िल्टरिंग",
        },
        community: {
          title: "समुदाय",
          description: "नेटवर्क निर्माण",
        },
      },
      roleSelection: {
        title: "अपनी भूमिका चुनें",
        farmer: {
          title: "मैं एक किसान हूँ",
          description: "वितरकों से जुड़ने और अपनी फसलों को प्रदर्शित करने के लिए किसान के रूप में पंजीकरण करें",
          features: {
            "0": "आधार के साथ दस्तावेज़ सत्यापन",
            "1": "आवाज़-सहायक पंजीकरण",
            "2": "फसल पोर्टफोलियो प्रबंधन",
            "3": "सत्यापित वितरकों से जुड़ें",
          },
          button: "किसान के रूप में पंजीकरण करें",
        },
        distributor: {
          title: "मैं एक वितरक हूँ",
          description: "किसानों को खोजने और उनसे जुड़ने के लिए वितरक के रूप में पंजीकरण करें",
          features: {
            "0": "त्वरित पंजीकरण प्रक्रिया",
            "1": "उन्नत खोज फ़िल्टर",
            "2": "फसल आवश्यकता प्रबंधन",
            "3": "सत्यापित किसानों से जुड़ें",
          },
          button: "वितरक के रूप में पंजीकरण करें",
        },
      },
      footer: "कृषि समुदाय के लिए ❤️ के साथ निर्मित",
    },

    // Registration
    registration: {
      farmer: {
        title: "किसान पंजीकरण",
        steps: {
          voice: {
            title: "आवाज़ सहायक सेटअप",
            description: "निर्देशित पंजीकरण अनुभव के लिए आवाज़ सहायक सक्षम करें",
            enable: "आवाज़ सहायक सक्षम करें",
            continue: "आवाज़ के बिना जारी रखें",
            enabled: "🎤 आवाज़ सहायक सक्षम! मैं आपको हर चरण में मार्गदर्शन करूंगा।",
          },
          aadhaar: {
            title: "आधार कार्ड अपलोड",
            frontSide: "आधार अग्र भाग",
            backSide: "आधार पिछला भाग",
            uploadFront: "अग्र भाग अपलोड करें",
            uploadBack: "पिछला भाग अपलोड करें",
            chooseFile: "फ़ाइल चुनें",
            fileUploaded: "✓ फ़ाइल अपलोड की गई",
          },
          ocr: {
            title: "OCR डेटा सत्यापन",
            completed: "✓ OCR निष्कर्षण पूर्ण। कृपया निकाली गई जानकारी सत्यापित करें:",
            fullName: "पूरा नाम",
            aadhaarNumber: "आधार संख्या",
            dateOfBirth: "जन्म तिथि",
            address: "पता",
          },
          voice_input: {
            title: "आवाज़ इनपुट और फसल चयन",
            spokenName: "बोला गया नाम (आवाज़ इनपुट)",
            location: "स्थान (आवाज़ इनपुट)",
            clickMic: "बोलने के लिए माइक पर क्लिक करें",
            selectCrops: "अपनी फसलें चुनें",
            selectedCrops: "चयनित फसलें:",
          },
          contact: {
            title: "संपर्क विवरण",
            phone: "फ़ोन नंबर *",
            whatsapp: "व्हाट्सऐप नंबर",
            email: "ईमेल पता",
          },
          profile: {
            title: "प्रोफ़ाइल पूर्णता",
            farmSize: "खेत का आकार (एकड़ में)",
            experience: "अनुभव के वर्ष",
            organic: "मेरे पास जैविक प्रमाणन है",
            description: "संक्षिप्त विवरण",
            descriptionPlaceholder: "अपनी कृषि प्रथाओं, विशेषताओं आदि के बारे में बताएं।",
            overview: "प्रोफ़ाइल अवलोकन",
            name: "नाम:",
            location: "स्थान:",
            crops: "फसलें:",
            size: "खेत का आकार:",
            exp: "अनुभव:",
            organicCert: "जैविक प्रमाणित:",
            yes: "हाँ",
            no: "नहीं",
          },
        },
      },
      distributor: {
        title: "वितरक पंजीकरण",
        steps: {
          voice: {
            title: "आवाज़ सहायक सेटअप",
            description: "निर्देशित पंजीकरण अनुभव के लिए आवाज़ सहायक सक्षम करें",
            enable: "आवाज़ सहायक सक्षम करें",
            continue: "आवाज़ के बिना जारी रखें",
            enabled: "🎤 आवाज़ सहायक सक्षम! मैं आपको हर चरण में मार्गदर्शन करूंगा।",
          },
          basic: {
            title: "मूलभूत जानकारी",
            businessName: "व्यापार का नाम *",
            ownerName: "मालिक का नाम *",
            businessType: "व्यापार प्रकार *",
            selectType: "व्यापार प्रकार चुनें",
          },
          contact: {
            title: "संपर्क विवरण",
            phone: "फ़ोन नंबर *",
            whatsapp: "व्हाट्सऐप नंबर",
            email: "ईमेल पता *",
            address: "व्यापार पता *",
            addressPlaceholder: "पूरा व्यापार पता",
          },
          business: {
            title: "व्यापार विवरण",
            state: "संचालन राज्य *",
            district: "प्राथमिक जिला",
            selectState: "राज्य चुनें",
            districtPlaceholder: "जिले का नाम दर्ज करें",
            cropsInterested: "रुचि की फसलें *",
            selectedCrops: "चयनित फसलें:",
            minOrder: "न्यूनतम ऑर्डर मात्रा (टन में)",
          },
          completion: {
            title: "प्रोफ़ाइल पूर्णता",
            experience: "व्यापार में वर्ष",
            certifications: "प्रमाणन और लाइसेंस",
            selectedCerts: "चयनित प्रमाणन:",
            description: "व्यापार विवरण",
            descriptionPlaceholder: "अपने व्यापार, विशेषताओं और आप क्या खोज रहे हैं, इसका वर्णन करें...",
            overview: "प्रोफ़ाइल अवलोकन",
            business: "व्यापार:",
            owner: "मालिक:",
            type: "प्रकार:",
            location: "स्थान:",
            crops: "फसलें:",
            minOrder: "न्यूनतम ऑर्डर:",
            exp: "अनुभव:",
          },
        },
      },
      common: {
        step: "चरण",
        of: "का",
        previous: "पिछला",
        next: "अगला",
        complete: "पंजीकरण पूर्ण करें",
        loading: "पंजीकरण लोड हो रहा है...",
      },
    },

    // Dashboard
    dashboard: {
      welcome: "वापसी पर स्वागत",
      loading: "डैशबोर्ड लोड हो रहा है...",
      navigation: "नेवीगेशन",

      overview: {
        description: "यहाँ आपके फार्मकनेक्ट खाते के साथ क्या हो रहा है",
        profileViews: "प्रोफ़ाइल दृश्य",
        newMessages: "नए संदेश",
        searchMatches: "खोज मैच",
        recentActivity: "हाल की गतिविधि",
      },

      navigation: {
        overview: "अवलोकन",
        profile: "प्रोफ़ाइल",
        cropManager: "फसल प्रबंधक",
        searchConnect: "खोजें और जुड़ें",
        messages: "संदेश",
      },

      profile: {
        profileInformation: "प्रोफ़ाइल जानकारी",
        verifiedDetails: "आपके सत्यापित प्रोफ़ाइल विवरण",
        farmSize: "खेत का आकार",
        experience: "अनुभव",
        organicCertified: "जैविक प्रमाणित",
        businessType: "व्यापार प्रकार",
        minOrder: "न्यूनतम ऑर्डर",
        crops: "🌾 फसलें",
        cropsOfInterest: "🔍 रुचि की फसलें",
        description: "विवरण",
      },

      cropManager: {
        title: "फसल प्रबंधक",
        description: "अपने फसल पोर्टफोलियो और उपलब्धता का प्रबंधन करें",
        status: "स्थिति",
        available: "उपलब्ध",
        quantity: "मात्रा",
        price: "मूल्य",
        updateDetails: "विवरण अपडेट करें",
      },

      search: {
        title: "खोज फ़िल्टर",
        searchButton: "खोजें",
        filters: {
          cropType: "फसल प्रकार",
          location: "स्थान",
          minRating: "न्यूनतम रेटिंग",
          selectCrop: "फसल प्रकार चुनें",
          selectLocation: "स्थान चुनें",
          allCrops: "सभी फसलें",
          allLocations: "सभी स्थान",
          anyRating: "कोई भी रेटिंग",
          stars: "सितारे",
        },
      },

      messages: {
        title: "संदेश",
        description: "अन्य किसानों और वितरकों से जुड़ें",
        comingSoon: "जल्द आ रहा है!",
        featureDescription:
          "हम एक अद्भुत संदेश सुविधा पर काम कर रहे हैं जो आपको किसानों और वितरकों के साथ सीधे संवाद करने की अनुमति देगी। बने रहें!",
        comingFeatures: "आने वाली सुविधाएं",
        realtimeMessaging: "रियल-टाइम संदेश",
        fileSharing: "फ़ाइल साझाकरण",
        voiceMessages: "आवाज़ संदेश",
        groupConversations: "समूह बातचीत",
      },
    },

    // Common
    common: {
      crops: {
        rice: "चावल",
        wheat: "गेहूं",
        sugarcane: "गन्ना",
        cotton: "कपास",
        maize: "मक्का",
        pulses: "दालें",
        oilseeds: "तिलहन",
        vegetables: "सब्जियां",
        fruits: "फल",
        spices: "मसाले",
        tea: "चाय",
        coffee: "कॉफी",
      },
      locations: {
        punjab: "पंजाब",
        haryana: "हरियाणा",
        maharashtra: "महाराष्ट्र",
        gujarat: "गुजरात",
        karnataka: "कर्नाटक",
        tamilNadu: "तमिल नाडु",
        uttarPradesh: "उत्तर प्रदेश",
        rajasthan: "राजस्थान",
        madhyaPradesh: "मध्य प्रदेश",
        westBengal: "पश्चिम बंगाल",
      },
      states: {
        "andhra-pradesh": "आंध्र प्रदेश",
        maharashtra: "महाराष्ट्र",
        karnataka: "कर्नाटक",
        "tamil-nadu": "तमिल नाडु",
        gujarat: "गुजरात",
        rajasthan: "राजस्थान",
        "madhya-pradesh": "मध्य प्रदेश",
        "uttar-pradesh": "उत्तर प्रदेश",
        "west-bengal": "पश्चिम बंगाल",
        punjab: "पंजाब",
        haryana: "हरियाणा",
      },
      businessTypes: {
        wholesale: "थोक वितरक",
        retail: "खुदरा श्रृंखला",
        export: "निर्यात कंपनी",
        processing: "प्रसंस्करण इकाई",
        cooperative: "सहकारी समिति",
        individual: "व्यक्तिगत व्यापारी",
      },
    },
  },

  mr: {
    // Landing Page
    landingPage: {
      title: "फार्मकनेक्ट",
      subtitle: "शेतकरी आणि वितरकांना जोडणे",
      description: "सत्यापित प्रोफाइल, आवाज सहाय्य आणि स्मार्ट मॅचिंगद्वारे शेतकरी आणि वितरकांमधील अंतर भरणारे एक व्यापक प्लॅटफॉर्म.",
      features: {
        verified: {
          title: "दस्तऐवज सत्यापित",
          description: "आधार OCR सत्यापन",
        },
        voice: {
          title: "आवाज सहाय्यक",
          description: "बहु-भाषा समर्थन",
        },
        search: {
          title: "स्मार्ट शोध",
          description: "प्रगत फिल्टरिंग",
        },
        community: {
          title: "समुदाय",
          description: "नेटवर्क निर्माण",
        },
      },
      roleSelection: {
        title: "तुमची भूमिका निवडा",
        farmer: {
          title: "मी एक शेतकरी आहे",
          description: "वितरकांशी जुडण्यासाठी आणि तुमची पिके दाखवण्यासाठी शेतकरी म्हणून नोंदणी करा",
          features: {
            "0": "आधारासह दस्तऐवज सत्यापन",
            "1": "आवाज-सहाय्यक नोंदणी",
            "2": "पीक पोर्टफोलिओ व्यवस्थापन",
            "3": "सत्यापित वितरकांशी जुडा",
          },
          button: "शेतकरी म्हणून नोंदणी करा",
        },
        distributor: {
          title: "मी एक वितरक आहे",
          description: "शेतकऱ्यांना शोधण्यासाठी आणि त्यांच्याशी जुडण्यासाठी वितरक म्हणून नोंदणी करा",
          features: {
            "0": "जलद नोंदणी प्रक्रिया",
            "1": "प्रगत शोध फिल्टर",
            "2": "पीक आवश्यकता व्यवस्थापन",
            "3": "सत्यापित शेतकऱ्यांशी जुडा",
          },
          button: "वितरक म्हणून नोंदणी करा",
        },
      },
      footer: "शेती समुदायासाठी ❤️ सह निर्मित",
    },

    // Registration
    registration: {
      farmer: {
        title: "शेतकरी नोंदणी",
        steps: {
          voice: {
            title: "आवाज सहाय्यक सेटअप",
            description: "मार्गदर्शित नोंदणी अनुभवासाठी आवाज सहाय्यक सक्षम करा",
            enable: "आवाज सहाय्यक सक्षम करा",
            continue: "आवाजाशिवाय सुरू ठेवा",
            enabled: "🎤 आवाज सहाय्यक सक्षम! मी तुम्हाला प्रत्येक टप्प्यात मार्गदर्शन करेन.",
          },
          aadhaar: {
            title: "आधार कार्ड अपलोड",
            frontSide: "आधार समोरचा भाग",
            backSide: "आधार मागचा भाग",
            uploadFront: "समोरचा भाग अपलोड करा",
            uploadBack: "मागचा भाग अपलोड करा",
            chooseFile: "फाइल निवडा",
            fileUploaded: "✓ फाइल अपलोड झाली",
          },
          ocr: {
            title: "OCR डेटा सत्यापन",
            completed: "✓ OCR निष्कर्षण पूर्ण. कृपया काढलेली माहिती सत्यापित करा:",
            fullName: "पूर्ण नाव",
            aadhaarNumber: "आधार क्रमांक",
            dateOfBirth: "जन्म तारीख",
            address: "पत्ता",
          },
          voice_input: {
            title: "आवाज इनपुट आणि पीक निवड",
            spokenName: "बोललेले नाव (आवाज इनपुट)",
            location: "स्थान (आवाज इनपुट)",
            clickMic: "बोलण्यासाठी माइकवर क्लिक करा",
            selectCrops: "तुमची पिके निवडा",
            selectedCrops: "निवडलेली पिके:",
          },
          contact: {
            title: "संपर्क तपशील",
            phone: "फोन नंबर *",
            whatsapp: "व्हाट्सअप नंबर",
            email: "ईमेल पत्ता",
          },
          profile: {
            title: "प्रोफाइल पूर्णता",
            farmSize: "शेताचा आकार (एकरात)",
            experience: "अनुभवाची वर्षे",
            organic: "माझ्याकडे सेंद्रिय प्रमाणपत्र आहे",
            description: "संक्षिप्त वर्णन",
            descriptionPlaceholder: "तुमच्या शेती पद्धती, विशेषता इत्यादीबद्दल सांगा.",
            overview: "प्रोफाइल अवलोकन",
            name: "नाव:",
            location: "स्थान:",
            crops: "पिके:",
            size: "शेताचा आकार:",
            exp: "अनुभव:",
            organicCert: "सेंद्रिय प्रमाणित:",
            yes: "होय",
            no: "नाही",
          },
        },
      },
      distributor: {
        title: "वितरक नोंदणी",
        steps: {
          voice: {
            title: "आवाज सहाय्यक सेटअप",
            description: "मार्गदर्शित नोंदणी अनुभवासाठी आवाज सहाय्यक सक्षम करा",
            enable: "आवाज सहाय्यक सक्षम करा",
            continue: "आवाजाशिवाय सुरू ठेवा",
            enabled: "🎤 आवाज सहाय्यक सक्षम! मी तुम्हाला प्रत्येक टप्प्यात मार्गदर्शन करेन.",
          },
          basic: {
            title: "मूलभूत माहिती",
            businessName: "व्यवसायाचे नाव *",
            ownerName: "मालकाचे नाव *",
            businessType: "व्यवसाय प्रकार *",
            selectType: "व्यवसाय प्रकार निवडा",
          },
          contact: {
            title: "संपर्क तपशील",
            phone: "फोन नंबर *",
            whatsapp: "व्हाट्सअप नंबर",
            email: "ईमेल पत्ता *",
            address: "व्यवसाय पत्ता *",
            addressPlaceholder: "संपूर्ण व्यवसाय पत्ता",
          },
          business: {
            title: "व्यवसाय तपशील",
            state: "कार्यरत राज्य *",
            district: "प्राथमिक जिल्हा",
            selectState: "राज्य निवडा",
            districtPlaceholder: "जिल्ह्याचे नाव टाका",
            cropsInterested: "स्वारस्य असलेली पिके *",
            selectedCrops: "निवडलेली पिके:",
            minOrder: "किमान ऑर्डर प्रमाण (टनात)",
          },
          completion: {
            title: "प्रोफाइल पूर्णता",
            experience: "व्यवसायातील वर्षे",
            certifications: "प्रमाणपत्रे आणि परवाने",
            selectedCerts: "निवडलेली प्रमाणपत्रे:",
            description: "व्यवसाय वर्णन",
            descriptionPlaceholder: "तुमच्या व्यवसायाचे, विशेषतांचे आणि तुम्ही काय शोधत आहात याचे वर्णन करा...",
            overview: "प्रोफाइल अवलोकन",
            business: "व्यवसाय:",
            owner: "मालक:",
            type: "प्रकार:",
            location: "स्थान:",
            crops: "पिके:",
            minOrder: "किमान ऑर्डर:",
            exp: "अनुभव:",
          },
        },
      },
      common: {
        step: "टप्पा",
        of: "चा",
        previous: "मागील",
        next: "पुढील",
        complete: "नोंदणी पूर्ण करा",
        loading: "नोंदणी लोड होत आहे...",
      },
    },

    // Dashboard
    dashboard: {
      welcome: "परत स्वागत",
      loading: "डॅशबोर्ड लोड होत आहे...",
      navigation: "नेव्हिगेशन",

      overview: {
        description: "तुमच्या फार्मकनेक्ट खात्यात काय घडत आहे ते येथे आहे",
        profileViews: "प्रोफाइल दृश्ये",
        newMessages: "नवीन संदेश",
        searchMatches: "शोध जुळणी",
        recentActivity: "अलीकडील क्रियाकलाप",
      },

      navigation: {
        overview: "अवलोकन",
        profile: "प्रोफाइल",
        cropManager: "पीक व्यवस्थापक",
        searchConnect: "शोधा आणि जुडा",
        messages: "संदेश",
      },

      profile: {
        profileInformation: "प्रोफाइल माहिती",
        verifiedDetails: "तुमचे सत्यापित प्रोफाइल तपशील",
        farmSize: "शेताचा आकार",
        experience: "अनुभव",
        organicCertified: "सेंद्रिय प्रमाणित",
        businessType: "व्यवसाय प्रकार",
        minOrder: "किमान ऑर्डर",
        crops: "🌾 पिके",
        cropsOfInterest: "🔍 स्वारस्य असलेली पिके",
        description: "वर्णन",
      },

      cropManager: {
        title: "पीक व्यवस्थापक",
        description: "तुमच्या पीक पोर्टफोलिओ आणि उपलब्धतेचे व्यवस्थापन करा",
        status: "स्थिती",
        available: "उपलब्ध",
        quantity: "प्रमाण",
        price: "किंमत",
        updateDetails: "तपशील अपडेट करा",
      },

      search: {
        title: "शोध फिल्टर",
        searchButton: "शोधा",
        filters: {
          cropType: "पीक प्रकार",
          location: "स्थान",
          minRating: "किमान रेटिंग",
          selectCrop: "पीक प्रकार निवडा",
          selectLocation: "स्थान निवडा",
          allCrops: "सर्व पिके",
          allLocations: "सर्व स्थाने",
          anyRating: "कोणतेही रेटिंग",
          stars: "तारे",
        },
      },

      messages: {
        title: "संदेश",
        description: "इतर शेतकरी आणि वितरकांशी जुडा",
        comingSoon: "लवकरच येत आहे!",
        featureDescription:
          "आम्ही एक अद्भुत संदेश वैशिष्ट्यावर काम करत आहोत जे तुम्हाला शेतकरी आणि वितरकांशी थेट संवाद साधण्याची परवानगी देईल. संपर्कात रहा!",
        comingFeatures: "येणारी वैशिष्ट्ये",
        realtimeMessaging: "रिअल-टाइम संदेश",
        fileSharing: "फाइल शेअरिंग",
        voiceMessages: "आवाज संदेश",
        groupConversations: "गट संभाषणे",
      },
    },

    // Common
    common: {
      crops: {
        rice: "तांदूळ",
        wheat: "गहू",
        sugarcane: "ऊस",
        cotton: "कापूस",
        maize: "मका",
        pulses: "डाळी",
        oilseeds: "तेलबिया",
        vegetables: "भाज्या",
        fruits: "फळे",
        spices: "मसाले",
        tea: "चहा",
        coffee: "कॉफी",
      },
      locations: {
        punjab: "पंजाब",
        haryana: "हरियाणा",
        maharashtra: "महाराष्ट्र",
        gujarat: "गुजरात",
        karnataka: "कर्नाटक",
        tamilNadu: "तमिळनाडू",
        uttarPradesh: "उत्तर प्रदेश",
        rajasthan: "राजस्थान",
        madhyaPradesh: "मध्य प्रदेश",
        westBengal: "पश्चिम बंगाल",
      },
      states: {
        "andhra-pradesh": "आंध्र प्रदेश",
        maharashtra: "महाराष्ट्र",
        karnataka: "कर्नाटक",
        "tamil-nadu": "तमिळनाडू",
        gujarat: "गुजरात",
        rajasthan: "राजस्थान",
        "madhya-pradesh": "मध्य प्रदेश",
        "uttar-pradesh": "उत्तर प्रदेश",
        "west-bengal": "पश्चिम बंगाल",
        punjab: "पंजाब",
        haryana: "हरियाणा",
      },
      businessTypes: {
        wholesale: "घाऊक वितरक",
        retail: "किरकोळ साखळी",
        export: "निर्यात कंपनी",
        processing: "प्रक्रिया युनिट",
        cooperative: "सहकारी संस्था",
        individual: "वैयक्तिक व्यापारी",
      },
    },
  },
}

export function getTranslation(language: string, key: string): string {
  const keys = key.split(".")
  let value: any = translations[language] || translations.en

  for (const k of keys) {
    value = value?.[k]
    if (value === undefined) {
      // Fallback to English if translation not found
      value = translations.en
      for (const k of keys) {
        value = value?.[k]
        if (value === undefined) return key
      }
      break
    }
  }

  return typeof value === "string" ? value : key
}

export function useTranslation(language: string) {
  return {
    t: (key: string) => getTranslation(language, key),
    language,
  }
}
