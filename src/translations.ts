export type Language = 'en' | 'ar';

export const translations = {
  en: {
    brand: "BANAN Real Estate",
    nav: {
      home: "Home",
      projects: "Projects",
      media: "Media",
      social: "Social",
      contact: "Contact",
      contactBtn: "Contact Us",
      langToggle: "العربية"
    },
    hero: {
      badge: "The Architectural Curator",
      headline: "Your Gateway to Luxury Living & Residency.",
      subheadline: "Banan Real Estate: Invest in premium freehold properties and secure your permanent future in the Sultanate of Oman.",
      cta: "Explore Properties",
      watchStory: "Watch Our Story"
    },
    features: {
      badge: "Strategic Investment",
      title: "Why Invest in Oman?",
      description: "Discover the unique advantages of the Omani real estate market, from complete ownership to world-class lifestyle opportunities.",
      items: [
        {
          id: 1,
          icon: 'key',
          watermark: 'gavel',
          title: 'Freehold Ownership',
          subtitle: 'التملك الحر',
          description: 'Complete peace of mind with 100% foreign ownership of both property and land in designated Integrated Tourism Complexes.',
          details: [
            "Complete peace of mind with 100% foreign ownership of both property and land in designated Integrated Tourism Complexes (ITC) in Oman. Unlike many regional markets, Oman provides absolute title deeds for international investors, ensuring your asset is a permanent legacy for your family.",
            "This ownership includes the right to resell, mortgage, and lease your property without any local sponsorship requirements. The legal framework is designed to protect foreign capital and promote a stable, transparent investment environment in one of the most peaceful nations in the Middle East.",
            "Choosing a freehold property in an ITC also grants you and your immediate family the right to apply for a renewable residency permit, tethering your lifestyle to the beauty and security of the Sultanate."
          ],
          whatsappMessage: "I'm inquiring about 100% foreign ownership rules."
        },
        {
          id: 2,
          icon: 'badge',
          watermark: 'account_balance',
          title: 'Permanent Residency',
          subtitle: 'الإقامة الدائمة',
          description: 'Unlock long-term investment residency perks for you and your family when you invest in Oman\'s premium real estate sector.',
          details: [
            "Unlock a secure future through Oman's Investment Residency Program. By investing in the Sultanate's premium real estate sector, you and your family can qualify for long-term residency permits (5 or 10 years), providing stability and ease of travel.",
            "This program is specifically designed for high-net-worth individuals seeking a high quality of life, world-class healthcare, and a safe, stable environment. Residency holders enjoy the freedom to reside in Oman, open bank accounts, and access specialized services typically reserved for residents.",
            "The process is streamlined and supported by the government’s 'Oman Vision 2040', which prioritizes welcoming international investors who contribute to the nation’s growing luxury landscape."
          ],
          whatsappMessage: "I'm interested in the investor residency program."
        },
        {
          id: 3,
          icon: 'castle',
          watermark: 'travel_explore',
          title: 'Investment Tourism',
          subtitle: 'السياحة والاستثمار',
          description: 'Experience Oman’s natural beauty and high rental yields in a stable, flourishing economy poised for exponential growth.',
          details: [
            "Experience the unique blend of Oman’s natural beauty and high rental yields. With its dramatic mountain ranges, pristine coastlines, and year-round tourism appeal, properties in the Sultanate offer more than just a home—they offer a flourishing asset class.",
            "Oman’s economy is stable and focused on diversification, leading to consistent growth in property values in prime locations like Muscat and Jebel Sifah. Our portfolio focuses on developments that promise high occupancy rates and attractive ROI for savvy investors.",
            "By choosing an investment in Oman’s tourism complexes, you are positioning yourself in a market that remains resilient and poised for exponential growth as the nation expands its global travel footprint."
          ],
          whatsappMessage: "I'm interested in investment tourism and high rental yields in Oman."
        }
      ],
      learnMore: "Learn More",
      back: "Back to Features",
      consultExpert: "Consult an Expert"
    },
    media: {
      title: "Curated Showcase",
      tabs: {
        videos: "Videos",
        photos: "Photos"
      },
      featured: {
        title: "The Muscat Waterfront Collection",
        subtitle: "Exclusive Property Tour 2024"
      },
      gallery: [
        { title: "Jabal Akhdar Retreat", category: "Premium Interiors" },
        { title: "Sifah Beachside Estates", category: "Coastal Living" }
      ]
    },
    social: {
      badge: "Community",
      title: "The Social Pulse",
      description: "Connect with us on our digital channels for daily property inspiration and market updates in Oman.",
      whatsapp: {
        title: "Let's Chat on WhatsApp",
        subtitle: "Immediate consultation with our property experts.",
        online: "Online Now",
        general: "Hello Banan Real Estate, I would like to inquire about your luxury properties.",
        projectInquiry: "I am interested in {project}. Please provide more details.",
        featureInquiry: "I want to learn more about the {feature} program."
      }
    },
    footer: {
      description: "Oman's leading boutique agency specializing in high-net-worth real estate investments and permanent residency solutions.",
      quickLinks: "Quick Links",
      legal: "Legal",
      links: {
        properties: "Properties",
        residency: "Residency Guide",
        roi: "Investment ROI",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        cookies: "Cookie Settings"
      },
      rights: "© 2024 BANAN Real Estate. All rights reserved. Registered in Oman.",
      crafted: "Crafted with precision by",
      signature: "Asem Mamdouh",
      social: {
        instagram: "Instagram",
        facebook: "Facebook",
        tiktok: "TikTok"
      }
    },
    projects: {
      badge: "Real Estate Portfolio",
      title: "Iconic Destinations",
      description: "Discover a curated selection of Oman's most prestigious developments, redefining luxury living and sustainable investment.",
      modal: {
        area: "Total Area",
        bedrooms: "Bedrooms",
        type: "Property Type",
        inquiry: "Inquire via WhatsApp",
        close: "Close"
      },
      viewDetails: "View Details",
      items: {
        sultanHaitham: {
          title: "Sultan Haitham City",
          category: "Smart Sustainable City",
          description: "Oman’s flagship smart city, designed for a sustainable future by merging innovation with natural landscapes.",
          fullDescription: "Sultan Haitham City represents a quantum leap in urban living in the Sultanate. Spanning millions of square meters, this smart city integrates sustainable infrastructure with lush green spaces, offering a vibrant community for families and investors. It features world-class educational facilities, healthcare centers, and advanced transportation networks, making it the premier choice for future-forward living."
        },
        trumpAida: {
          title: "Trump International Aida",
          category: "Elite Golf Resort",
          description: "An extraordinary hilltop destination in Muscat, featuring a world-class golf course and ultra-luxury residential units.",
          fullDescription: "Perched 100 meters above sea level, Aida is a masterpiece of luxury and natural beauty. This extraordinary gated community features a Signature Trump International Golf Club, five-star hotels, and breathtaking cliffside residences. Residents enjoy panoramic views of the Gulf of Oman, exclusive beach club access, and a lifestyle that defines coastal elegance in Muscat."
        },
        jebelSifah: {
          title: "Jebel Sifah",
          category: "Integrated Tourism Complex",
          description: "A breathtaking coastal haven where mountains meet the sea, offering a world-class marina and tranquil luxury.",
          fullDescription: "Located just 45 minutes from Muscat, Jebel Sifah is an Integrated Tourism Complex (ITC) that offers a unique blend of sea and mountain living. With a world-class marina, a scenic 9-hole golf course, and a selection of boutique hotels and fine dining, it is the perfect escape for those seeking a tranquil yet active lifestyle in a Mediterranean-style setting."
        },
        greatEscape: {
          title: "The Great Escape",
          category: "Exclusive Hideaways",
          description: "A signature collection of luxury villas providing ultimate privacy and unmatched comfort in Oman's prime locations.",
          fullDescription: "The Great Escape is an exclusive collection of architectural gems nestled in Oman's most serene environments. These villas are designed for high-net-worth individuals who demand ultimate privacy and minimalist luxury. Each property features bespoke interiors, expansive terraces, and private pools, all crafted to harmonize with the surrounding natural beauty."
        }
      }
    },
    legal: {
      close: "Close",
      privacy: {
        title: "Privacy Policy",
        content: [
          "At BANAN Real Estate, we are committed to protecting your personal data in accordance with the laws of the Sultanate of Oman. This policy explains how we collect and manage your information.",
          "We primarily collect data through voluntary inquiries initiated via WhatsApp or our contact forms. This may include your name, phone number, and specific property interests. Your data is used exclusively to facilitate your real estate journey and provide personalized investment guidance.",
          "We do not sell or share your personal information with third parties for marketing purposes. Any data transfers are strictly limited to essential service providers (such as secure cloud storage or navigation maps) that adhere to our privacy standards.",
          "You have the right to request access to, correction of, or deletion of your personal data at any time. For any privacy inquiries, please contact our administrative team directly.",
          "This policy and all data handling practices are governed by the laws and regulations of the Sultanate of Oman."
        ]
      },
      terms: {
        title: "Terms of Service",
        content: [
          "Welcome to the BANAN Real Estate portal. By using this website, you agree to comply with our terms and conditions.",
          "All property descriptions, prices, and investment projections are provided for informational purposes only. While we strive for accuracy, availability and details are subject to change without prior notice.",
          "The information provided on this platform does not constitute professional legal or financial advice. We strongly recommend that all investors consult with certified legal and financial advisors before finalizing any real estate acquisition in Oman.",
          "All intellectual property, including site design, logos, and original architectural imagery, is the exclusive property of BANAN Real Estate and protected by Omani and international copyright laws.",
          "Any disputes arising from the use of this portal shall be subject to the exclusive jurisdiction of the courts of the Sultanate of Oman."
        ]
      }
    },
    cookies: {
      banner: "We use cookies to enhance your luxury browsing experience.",
      accept: "Accept",
      settings: "Cookie Settings"
    }
  },
  ar: {
    brand: "بنان العقارية",
    nav: {
      home: "الرئيسية",
      projects: "المشاريع",
      media: "الوسائط",
      social: "التواصل",
      contact: "اتصل بنا",
      contactBtn: "اتصل بنا",
      langToggle: "English"
    },
    hero: {
      badge: "منسق المعمار العصري",
      headline: "بوابتكم للحياة الفاخرة والاستثمار والإقامة.",
      subheadline: "بنان العقارية: استثمروا في عقارات التملك الحر الفاخرة وضمان مستقبل دائم في سلطنة عُمان.",
      cta: "استكشف العقارات",
      watchStory: "شاهد قصتنا"
    },
    features: {
      badge: "استثمار استراتيجي",
      title: "لماذا الاستثمار في عُمان؟",
      description: "اكتشف المزايا الفريدة لسوق العقارات العُماني، من التملك الكامل إلى فرص الحياة الراقية العالمية.",
      items: [
        {
          id: 1,
          icon: 'key',
          watermark: 'gavel',
          title: 'التملك الحر',
          subtitle: 'Freehold Ownership',
          description: 'راحة بال تامة مع ملكية أجنبية بنسبة 100٪ لكل من العقار والأرض في المجمعات السياحية المتكاملة المحددة.',
          details: [
            "تمتع براحة بال تامة مع ملكية أجنبية بنسبة 100٪ لكل من العقار والأرض في المجمعات السياحية المتكاملة (ITC) المحددة في عُمان. بخلاف العديد من الأسواق الإقليمية، توفر عُمان صكوك ملكية مطلقة للمستثمرين الدوليين، مما يضمن أن تكون أصولك إرثاً دائماً لعائلتك.",
            "تشمل هذه الملكية الحق في إعادة البيع والرهن والتأجير لعقارك دون أي متطلبات كفالة محلية. تم تصميم الإطار القانوني لحماية رأس المال الأجنبي وتعزيز بيئة استثمارية مستقرة وشفافة في واحدة من أكثر الدول سلاماً في الشرق الأوسط.",
            "يمنحك اختيار عقار بنظام التملك الحر في مجمع سياحي متكامل أيضاً الحق لك ولعائلتك المباشرة في التقدم بطلب للحصول على تصريح إقامة قابل للتجديد، مما يربط نمط حياتك بجمال وأمان السلطنة."
          ],
          whatsappMessage: "أنا أستفسر عن قوانين التملك الأجنبي بنسبة 100%."
        },
        {
          id: 2,
          icon: 'badge',
          watermark: 'account_balance',
          title: 'الإقامة الدائمة',
          subtitle: 'Permanent Residency',
          description: 'احصل على مزايا إقامة استثمارية طويلة الأمد لك ولعائلتك عند الاستثمار في قطاع العقارات الفاخر في عُمان.',
          details: [
            "افتح آفاق مستقبلك الآمن من خلال برنامج إقامة المستثمر في عُمان. من خلال الاستثمار في قطاع العقارات المتميز في السلطنة، يمكنك أنت وعائلتك التأهل للحصول على تصاريح إقامة طويلة الأمد (5 أو 10 سنوات)، مما يوفر الاستقرار وسهولة السفر.",
            "هذا البرنامج مصمم خصيصاً للأفراد ذوي الملاءة المالية العالية الذين يبحثون عن جودة حياة عالية، ورعاية صحية عالمية المستوى، وبيئة آمنة ومستقرة. يتمتع حاملو الإقامة بحرية الإقامة في عُمان، وفتح الحسابات المصرفية، والوصول إلى الخدمات المتخصصة.",
            "العملية مبسطة ومدعومة بـ 'رؤية عُمان 2040' الحكومية، التي تعطي الأولوية للترحيب بالمستثمرين الدوليين الذين يساهمون في المشهد الفاخر المتنامي للأمة."
          ],
          whatsappMessage: "أنا مهتم ببرنامج إقامة المستثمر."
        },
        {
          id: 3,
          icon: 'castle',
          watermark: 'travel_explore',
          title: 'السياحة والاستثمار',
          subtitle: 'Investment Tourism',
          description: 'استمتع بجمال عُمان الطبيعي وعوائد الإيجار المرتفعة في اقتصاد مستقر ومزدهر مستعد لنمو استثنائي.',
          details: [
            "استمتع بمزيج فريد من جمال عُمان الطبيعي وعوائد الإيجار المرتفعة. مع سلاسل الجبال الرائعة، والسواحل البكر، وجاذبية السياحة على مدار العام، توفر العقارات في السلطنة أكثر من مجرد منزل - إنها توفر فئة أصول مزدهرة.",
            "يتميز اقتصاد عُمان بالاستقرار والتركيز على التنويع، مما يؤدي إلى نمو مستمر في قيم العقارات في المواقع الرئيسية مثل مسقط وجبل سيفه. تركز محفظتنا على المشاريع التي تعد بمعدلات إشغال عالية وعائد استثمار جذاب للمستثمرين الأذكياء.",
            "من خلال اختيار الاستثمار في المجمعات السياحية في عُمان، فإنك تضع نفسك في سوق يظل مرناً ومستعداً لنمو استثنائي مع توسع البصمة السياحية العالمية للسلطنة."
          ],
          whatsappMessage: "أنا مهتم بالسياحة الاستثمارية وعوائد الإيجار المرتفعة في عُمان."
        }
      ],
      learnMore: "اكتشف المزيد",
      back: "العودة",
      consultExpert: "استشارة خبير"
    },
    media: {
      title: "معرض الأعمال المختارة",
      tabs: {
        videos: "الفيديوهات",
        photos: "الصور"
      },
      featured: {
        title: "مجموعة واجهة مسقط البحرية",
        subtitle: "جولة عقارية حصرية 2024"
      },
      gallery: [
        { title: "منتجع الجبل الأخضر", category: "تصاميم داخلية فاخرة" },
        { title: "عقارات شاطئ السيفة", category: "معيشة ساحلية" }
      ]
    },
    social: {
      badge: "المجتمع",
      title: "النبض الاجتماعي",
      description: "تواصلوا معنا عبر قنواتنا الرقمية للحصول على إلهام يومي للعقارات وتحديثات السوق في سلطنة عُمان.",
      whatsapp: {
        title: "تحدثوا معنا عبر واتساب",
        subtitle: "استشارة فورية مع خبراء العقارات لدينا.",
        online: "متصل الآن",
        general: "مرحباً بنان العقارية، أود الاستفسار عن عقاراتكم الفاخرة.",
        projectInquiry: "أنا مهتم بمشروع {project}. يرجى تزويدي بمزيد من التفاصيل.",
        featureInquiry: "أود معرفة المزيد عن برنامج {feature}."
      }
    },
    footer: {
      description: "الوكالة العقارية الرائدة في عُمان والمتخصصة في استثمارات العقارات ذات القيمة العالية وحلول الإقامة الدائمة.",
      quickLinks: "روابط سريعة",
      legal: "قانوني",
      links: {
        properties: "العقارات",
        residency: "دليل الإقامة",
        roi: "عوائد الاستثمار",
        privacy: "سياسة الخصوصية",
        terms: "شروط الخدمة",
        cookies: "إعدادات الكوكيز"
      },
      rights: "© 2024 بنان العقارية. جميع الحقوق محفوظة. مسجلة في سلطنة عُمان.",
      crafted: "تم التنفيذ بكل إتقان بواسطة",
      signature: "عاصم ممدوح",
      social: {
        instagram: "إنستجرام",
        facebook: "فيسبوك",
        tiktok: "تيك توك"
      }
    },
    projects: {
      badge: "المشاريع",
      title: "مجموعة المشاريع المختارة",
      description: "نقدم لكم مجموعة حصرية من أبرز الوجهات العقارية الرائدة التي تعيد تعريف مفهوم الفخامة والاستثمار في سلطنة عُمان.",
      modal: {
        area: "المساحة الإجمالية",
        bedrooms: "غرف النوم",
        type: "نوع العقار",
        inquiry: "الاستفسار عبر واتساب",
        close: "إغلاق"
      },
      viewDetails: "عرض التفاصيل",
      items: {
        sultanHaitham: {
          title: "مدينة السلطان هيثم",
          category: "مدينة ذكية مستدامة",
          description: "أيقونة المدن الذكية في عُمان، صممت لترسم مستقبلاً مستداماً يجمع بين الطبيعة والابتكار التقني.",
          fullDescription: "تمثل مدينة السلطان هيثم قفزة نوعية في المعيشة الحضرية في السلطنة. تمتد هذه المدينة الذكية على مساحة ملايين الأمتار المربعة، وتدمج البنية التحتية المستدامة مع المساحات الخضراء المورقة، مما يوفر مجتمعاً نابضاً بالحيوية للعائلات والمستثمرين. تضم المدينة مرافق تعليمية عالمية المستوى، ومراكز رعاية صحية، وشبكات نقل متقدمة."
        },
        trumpAida: {
          title: "منتجع ترامب عايدة",
          category: "وجهة جولف سياحية",
          description: "تجربة سكنية استثنائية فوق تلال مسقط، تضم ملعب جولف عالمي وفنادق ومنشآت ترفيهية فاخرة.",
          fullDescription: "يقع مشروع عايدة على ارتفاع 100 متر فوق مستوى سطح البحر، وهو تحفة فنية من الفخامة والجمال الطبيعي. يضم هذا المجتمع المسور نادي ترامب الدولي للجولف، وفنادق خمس نجوم، ومساكن شاطئية خلابة. يستمتع السكان بإطلالات بانورامية على خليج عُمان، ودخول حصري إلى النادي الشاطئي."
        },
        jebelSifah: {
          title: "جبل السيفه",
          category: "مجمع سياحي متكامل",
          description: "وجهة ساحلية خلابة تجمع بين البحر والجمال الجبلي، وتقدم أسلوب حياة هادئ ومرافق عالمية المستوى.",
          fullDescription: "يقع جبل السيفة على بعد 45 دقيقة فقط من مسقط، وهو مجمع سياحي متكامل (ITC) يقدم مزيجاً فريداً من المعيشة بين البحر والجبل. مع مرسى عالمي المستوى، وملعب جولف مكون من 9 حفر، ومجموعة من الفنادق والمطاعم الراقية، فإنه الملاذ المثالي لمن يبحثون عن أسلوب حياة هادئ ونشط."
        },
        greatEscape: {
          title: "The Great Escape",
          category: "ملاذات حصرية",
          description: "مجموعة من الفيلات الفاخرة التي توفر الخصوصية المطلقة والراحة في أرقى المواقع المختارة.",
          fullDescription: "تعد مجموعة The Great Escape حصرية من الجواهر المعمارية الواقعة في أهدأ بيئات عُمان. تم تصميم هذه الفيلات للأفراد الذين يطلبون الخصوصية التامة والفخامة البسيطة. تتميز كل ملكية بتصاميم داخلية مخصصة، وشرفات واسعة، وحمامات سباحة خاصة، كلها مصممة لتتناغم مع الجمال الطبيعي المحيط."
        }
      }
    },
    legal: {
      close: "إغلاق",
      privacy: {
        title: "سياسة الخصوصية",
        content: [
          "في بنان العقارية، نحن ملتزمون بحماية بياناتكم الشخصية وفقاً للقوانين المعمول بها في سلطنة عُمان. توضح هذه السياسة كيفية جمعنا لمعلوماتكم وإدارتها.",
          "نقوم بجمع البيانات بشكل أساسي من خلال الاستفسارات الطوعية التي يتم تقديمها عبر واتساب أو نماذج الاتصال الخاصة بنا. قد يشمل ذلك اسمكم ورقم هاتفكم واهتماماتكم العقارية المحددة. تُستخدم بياناتكم حصرياً لتسهيل رحلتكم العقارية وتقديم إرشادات استثمارية مخصصة.",
          "نحن لا نقوم ببيع أو مشاركة معلوماتكم الشخصية مع أطراف ثالثة لأغراض تسويقية. تقتصر أي عمليات نقل للبيانات بشكل صارم على مقدمي الخدمات الأساسيين (مثل التخزين السحابي الآمن أو خرائط التنقل) الذين يلتزمون بمعايير الخصوصية الخاصة بنا.",
          "لكم الحق في طلب الوصول إلى بياناتكم الشخصية أو تصحيحها أو حذفها في أي وقت. لأي استفسارات تتعلق بالخصوصية، يرجى الاتصال بفريقنا الإداري مباشرة.",
          "تخضع هذه السياسة وكافة ممارسات التعامل مع البيانات للقوانين والأنظمة المعمول بها في سلطنة عُمان."
        ]
      },
      terms: {
        title: "شروط الخدمة",
        content: [
          "مرحباً بكم في بوابة بنان العقارية. باستخدامكم لهذا الموقع، فإنكم توافقون على الالتزام بالشروط والأحكام الخاصة بنا.",
          "يتم توفير جميع أوصاف العقارات والأسعار وتوقعات الاستثمار لأغراض معلوماتية فقط. وبينما نسعى جاهدين لتحقيق الدقة، فإن التوافر والتفاصيل عرضة للتغيير دون إشعار مسبق.",
          "المعلومات المقدمة في هذه المنصة لا تشكل استشارة قانونية أو مالية مهنية. نوصي بشدة جميع المستثمرين باستشارة مستشارين قانونيين وماليين معتمدين قبل إتمام أي عملية استحواذ عقاري في عُمان.",
          "جميع الملكيات الفكرية، بما في ذلك تصميم الموقع والشعارات والصور المعمارية الأصلية، هي ملكية حصرية لشركة بنان العقارية ومحمية بموجب قوانين سلطنة عُمان وحقوق النشر الدولية.",
          "تخضع أي نزاعات تنشأ عن استخدام هذه البوابة للاختصاص القضائي الحصري لمحاكم سلطنة عُمان."
        ]
      }
    },
    cookies: {
      banner: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح الفاخرة الخاصة بكم.",
      accept: "قبول",
      settings: "إعدادات الكوكيز"
    }
  }
};
