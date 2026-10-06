export const PHONE_DISPLAY = "+52 322 288 8447";
export const WHATSAPP_NUMBER = "523222888447";

const wa = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const LINKS = {
  instagram: "https://www.instagram.com/spa_by_nahomy/",
  bookMassage: wa(
    "Hi Luna Spa, I'd like to book a massage in Sayulita."
  ),
  checkAvailability: wa(
    "Hi Luna Spa, I'd like to check availability."
  ),
  bookDeepTissue: wa(
    "Hi Luna Spa, I'd like to book a 60-minute Deep Tissue Massage."
  ),
  planGroup: wa(
    "Hi Luna Spa, I'm planning a group massage. Our group size is ____."
  ),
  bookMoonlight: wa(
    "Hi Luna Spa, I'd like to book the Moonlight Couples Ritual (90 min)."
  ),
  bookReset: wa(
    "Hi Luna Spa, I'd like to book the Sayulita Reset (90 min: massage + hydrating facial)."
  ),
  bookAfterSurf: wa(
    "Hi Luna Spa, I'd like to book the After Surfing ritual (90 min: sports massage + soothing facial)."
  ),
  bookLuminous: wa(
    "Hi Luna Spa, I'd like to book the Luminous Skin ritual (90 min: full-body exfoliation + massage)."
  )
};

export const ACOMS = [
  "Airbnb",
  "Villa",
  "Hotel",
  "Vacation rental"
];

export const TREATMENTS = [
  {
    id: "relaxing",
    name: "Relaxing Massage",
    duration: "60 min",
    price: "$950 MXN",
    price90: "90 min · $1,300 MXN",
    description:
      "Gentle massage focused on stress relief, muscle relaxation and overall well-being.",
    badge: "Popular choice"
  },
  {
    id: "therapeutic",
    name: "Therapeutic Massage",
    duration: "60 min",
    price: "$1,000 MXN",
    price90: "90 min · $1,350 MXN",
    description:
      "Focused on specific areas of pain or muscle tightness, it helps release muscular tension and improve mobility."
  },
  {
    id: "prenatal",
    name: "Mom-to-Be Massage",
    duration: "60 min",
    price: "$950 MXN",
    description:
      "A pregnancy-focused massage for eligible clients who meet Luna Spa's pre-service requirements."
  },
  {
    id: "deep",
    name: "Deep Tissue Massage",
    duration: "60 min",
    price: "$1,050 MXN",
    price90: "90 min · $1,400 MXN",
    description:
      "Works the deeper muscle layers to relieve chronic contractures, stiffness and persistent discomfort.",
    badge: "Popular choice",
    href: "sayulita-reset"
  },
  {
    id: "hot-stone",
    name: "Hot Stone Massage",
    duration: "75 min",
    price: "$1,350 MXN",
    price90: "90 min · $1,500 MXN",
    description:
      "Combines heat and massage to relax the muscles, improve circulation and provide a deep sense of well-being."
  },
  {
    id: "luna",
    name: "Luna Massage",
    duration: "75 min",
    price: "$1,400 MXN",
    price90: "90 min · $1,550 MXN",
    description:
      "A combination of techniques — therapeutic, de-contracting and hot stone — using oils with analgesic and anti-inflammatory effects (arnica, rosemary, calendula, cinnamon, turmeric and black cumin).",
    badge: "Popular choice"
  },
  {
    id: "lymphatic",
    name: "Manual Lymphatic Drainage",
    duration: "75 min",
    price: "$1,400 MXN",
    description:
      "A gentle treatment focused on lymphatic circulation and a feeling of lightness."
  },
  {
    id: "sports",
    name: "Sports Massage",
    duration: "60 min",
    price: "$1,200 MXN",
    price90: "90 min · $1,650 MXN",
    description:
      "A firm, deep-pressure therapeutic treatment designed to release muscle tension built up from training or intense physical activity. Helps deactivate trigger points (knots), reduce muscle fatigue, improve flexibility and accelerate the body's natural recovery process. Ideal for preventing injuries and maintaining optimal physical performance.",
    recommended:
      "Recommended for: Athletes, people preparing for competitions, or anyone experiencing severe muscle fatigue from physical activity."
  }
];

export const PRICE_ROWS = [
  ["Relaxing Massage", "60 min", "$950 MXN"],
  ["Therapeutic Massage", "60 min", "$1,000 MXN"],
  ["Mom-to-Be Massage", "60 min", "$950 MXN"],
  ["Deep Tissue Massage", "60 min", "$1,050 MXN"],
  ["Hot Stone Massage", "75 min", "$1,350 MXN"],
  ["Luna Massage", "75 min", "$1,400 MXN"],
  ["Manual Lymphatic Drainage", "75 min", "$1,400 MXN"],
  ["Sports Massage", "60 min", "$1,200 MXN"]
];

export const PRICE_ROWS_90 = [
  ["Relaxing Massage", "60 min", "$950 MXN", "90 min", "$1,300 MXN"],
  ["Therapeutic Massage", "60 min", "$1,000 MXN", "90 min", "$1,350 MXN"],
  ["Mom-to-Be Massage", "60 min", "$950 MXN", "90 min", "$1,300 MXN"],
  ["Deep Tissue Massage", "60 min", "$1,050 MXN", "90 min", "$1,400 MXN"],
  ["Hot Stone Massage", "75 min", "$1,350 MXN", "90 min", "$1,500 MXN"],
  ["Luna Massage", "75 min", "$1,400 MXN", "90 min", "$1,550 MXN"],
  ["Manual Lymphatic Drainage", "75 min", "$1,400 MXN", "90 min", "$1,600 MXN"],
  ["Sports Massage", "60 min", "$1,200 MXN", "90 min", "$1,650 MXN"]
];

export const STEPS = [
  {
    n: 1,
    title: "Choose your treatment",
    text: "Pick the massage that matches what you want from your session."
  },
  {
    n: 2,
    title: "Tell us your location",
    text: "Send your Airbnb, villa or hotel in Sayulita."
  },
  {
    n: 3,
    title: "Confirm availability",
    text: "We'll coordinate the date, time and appointment details."
  },
  {
    n: 4,
    title: "We come to you",
    text: "Your treatment takes place at your accommodation."
  }
];

export const PRICES_FAQ_HOME = [
  {
    q: "Can you come to my Airbnb in Sayulita?",
    a: "Yes. Luna Spa's in-home service is designed to bring the massage directly to your accommodation."
  },
  {
    q: "Which massage should I choose?",
    a: "Relaxing is a gentler option for stress relief. Therapeutic and Deep Tissue are more focused. Hot Stone and Luna Massage offer a different, more immersive experience."
  },
  {
    q: "How far in advance should I book?",
    a: "Availability depends on the date, time, location and number of people. For couples and groups, earlier booking is recommended."
  },
  {
    q: "Do you offer couples and group massage?",
    a: "Yes. Contact Luna Spa with your group size, location and preferred treatments so availability can be coordinated."
  },
  {
    q: "What should I know before my massage?",
    a: "Eat lightly before your appointment, avoid alcohol before the service, remove jewelry and tell Luna Spa about relevant health conditions. Sunburn may prevent you from receiving or enjoying your treatment."
  }
];

export const FAQS_INHOME = [
  {
    q: "Can you come to my Airbnb in Sayulita?",
    a: "Yes. Tell us where you're staying when you contact Luna Spa so we can coordinate your appointment."
  },
  {
    q: "What is included in the Moonlight Couples Ritual?",
    a: "The Moonlight Couples Ritual is a 90-minute experience for two priced at $3,200 MXN. It includes an integrative body massage, hot stone therapy to dissolve muscle tension and a nourishing facial mask that restores freshness and luminosity to the skin."
  },
  {
    q: "Can I book at a villa?",
    a: "Yes. Send your villa location and preferred treatment so we can confirm availability."
  },
  {
    q: "Can I book a massage at a hotel?",
    a: "Yes. Provide the hotel or accommodation details when requesting your appointment."
  },
  {
    q: "How do I book?",
    a: "Choose your treatment, tell us where you're staying, confirm availability, and we'll coordinate the appointment details."
  }
];

export const FAQS_DEEP = [
  {
    q: "What is the Sayulita Reset?",
    a: "The Sayulita Reset is a 90-minute treatment for $1,600 MXN: 50 minutes of massage of your choice (relaxing, therapeutic or deep tissue) plus a 40-minute hydrating facial, designed to reset your body and refresh your skin after a day at the beach."
  },
  {
    q: "Is Deep Tissue Massage painful?",
    a: "Deep tissue is more focused than a relaxing massage, but pressure should remain appropriate for the client. Communicate with your therapist throughout the session."
  },
  {
    q: "Can I get Deep Tissue Massage at my Airbnb?",
    a: "Yes. Luna Spa offers home-service massage, allowing you to enjoy your treatment at your accommodation."
  },
  {
    q: "How long is the Deep Tissue Massage?",
    a: "The current menu lists the Deep Tissue Massage as a 60-minute treatment for $1,050 MXN."
  }
];

export const FAQS_COUPLES = [
  {
    q: "What is the After Surfing ritual?",
    a: "The After Surfing ritual is a 90-minute treatment for $1,800 MXN: 50 minutes of sports massage plus a 40-minute soothing facial with concentrated aloe vera, designed to release muscle overload and repair skin exposed to sun and salt."
  },
  {
    q: "Do we have to choose the same massage?",
    a: "No. Tell us what each person prefers so we can coordinate the treatments accordingly."
  },
  {
    q: "Can you come to our Airbnb or villa?",
    a: "Yes. Luna Spa's home-service model is designed to bring the massage experience directly to your accommodation."
  },
  {
    q: "Can we book different treatment lengths?",
    a: "Tell us what you're looking for when you contact us and we'll confirm the available options."
  },
  {
    q: "Can we book at a hotel?",
    a: "Yes. Send the hotel or accommodation information when requesting your appointment."
  }
];

export const FAQS_GROUP = [
  {
    q: "What is the Luminous Skin ritual?",
    a: "The Luminous Skin ritual is a 90-minute treatment for $1,650 MXN: full-body exfoliation and hydration plus a massage, designed to restore softness and glow to the skin while relieving muscle tension."
  },
  {
    q: "How many people can book a group massage?",
    a: "Availability depends on the requested date, time, location, treatments and therapist availability. Tell us your group size when you contact us."
  },
  {
    q: "Can everyone choose a different massage?",
    a: "Yes. Let us know each guest's preferred treatment when making the request."
  },
  {
    q: "Can you come to our villa?",
    a: "Luna Spa's service is designed around home-service appointments. Send us your accommodation details so we can confirm availability."
  },
  {
    q: "Can you provide massages for a girls trip?",
    a: "Yes. Girls trips are an excellent use case for coordinating multiple treatments at your accommodation."
  },
  {
    q: "Do you offer group packages?",
    a: "The current menu does not publish a separate group package. Contact Luna Spa for current group availability and pricing."
  },
  {
    q: "Do you offer facials and body treatments?",
    a: "Yes. Body treatments include the Bridal Veil ritual (2 hrs, $2,000 MXN). Facials: Deep Cleanse ($1,200 MXN, 75–90 min), Revitalizing ($1,100 MXN, 60 min), Oxygenating ($1,100 MXN, 60 min), Hydrating ($900 MXN, 60 min), Calming for Sensitive Skin ($1,000 MXN, 60 min) and Luna Facial ($1,300 MXN, 90 min)."
  }
];

const siteUrl = "https://sayulitamassagebyluna.com";

export const SEO = {
  home: {
    pageClass: "page-home",
    title: "Massage in Sayulita | In-Home Massage & Spa | Luna Spa",
    description:
      "Professional in-home massage in Sayulita. Relaxing, therapeutic, deep tissue, hot stone and more at your Airbnb, villa or hotel.",
    url: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "HealthAndBeautyBusiness",
          "@id": "#luna-spa",
          name: "Luna Spa in Sayulita",
          telephone: "+52 322 288 8447",
          areaServed: { "@type": "City", name: "Sayulita" },
          sameAs: ["https://www.sayulitalife.com/business/luna-spa"],
          priceRange: "$$",
          description:
            "Professional massage and spa experiences brought to your Airbnb, villa or hotel in Sayulita, Mexico."
        },
        {
          "@type": "WebPage",
          "@id": "#webpage",
          name: "Massage in Sayulita | In-Home Massage & Spa | Luna Spa",
          description:
            "Professional in-home massage in Sayulita. Relaxing, therapeutic, deep tissue, hot stone and more at your Airbnb, villa or hotel.",
          inLanguage: "en-US"
        },
        {
          "@type": "ItemList",
          name: "Luna Spa Massage Treatments",
          itemListElement: TREATMENTS.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: t.name,
            url: t.href ? `${siteUrl}/${t.href}` : `${siteUrl}/#${t.id}`
          }))
        },
        {
          "@type": "FAQPage",
          mainEntity: PRICES_FAQ_HOME.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a }
          }))
        }
      ]
    }
  },
  inhome: {
    pageClass: "page-inhome",
    title: "Moonlight Couples Ritual in Sayulita | Luna Spa",
    description:
      "Book the Moonlight Couples Ritual in Sayulita: a 90-minute experience for two with massage, hot stones and a facial mask at your Airbnb, villa or hotel.",
    url: "/moonlight-couples-ritual",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "HealthAndBeautyBusiness",
          "@id": "#luna-spa",
          name: "Luna Spa in Sayulita",
          telephone: "+52 322 288 8447",
          areaServed: { "@type": "City", name: "Sayulita" },
          sameAs: ["https://www.sayulitalife.com/business/luna-spa"],
          priceRange: "$$"
        },
        {
          "@type": "WebPage",
          name: "Moonlight Couples Ritual in Sayulita | Luna Spa",
          description:
            "Book the Moonlight Couples Ritual in Sayulita: a 90-minute experience for two with massage, hot stones and a facial mask at your Airbnb, villa or hotel.",
          inLanguage: "en-US"
        },
        {
          "@type": "Service",
          name: "In-Home Massage in Sayulita — We Come to You",
          serviceType: "In-Home Massage Sayulita",
          provider: { "@id": "#luna-spa" },
          areaServed: { "@type": "City", name: "Sayulita" },
          description: "Professional massage without leaving your Airbnb, villa or hotel."
        },
        {
          "@type": "Service",
          name: "Moonlight Couples Ritual in Sayulita — 90 Minutes for Two",
          serviceType: "Couples Massage Ritual Sayulita",
          provider: { "@id": "#luna-spa" },
          areaServed: { "@type": "City", name: "Sayulita" },
          description:
            "90-minute ritual for two: integrative body massage, hot stone therapy and a nourishing facial mask.",
          offers: {
            "@type": "Offer",
            price: "3200",
            priceCurrency: "MXN",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/moonlight-couples-ritual`
          }
        },
        {
          "@type": "FAQPage",
          mainEntity: FAQS_INHOME.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a }
          }))
        }
      ]
    }
  },
  deep: {
    pageClass: "page-deep",
    title: "Sayulita Reset — 90-Minute Massage + Facial | Luna Spa",
    description:
      "Book the Sayulita Reset in Sayulita: 90 minutes with a 50-min massage of your choice plus a 40-min hydrating facial at your Airbnb, villa or hotel.",
    url: "/sayulita-reset",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "HealthAndBeautyBusiness",
          "@id": "#luna-spa",
          name: "Luna Spa in Sayulita",
          telephone: "+52 322 288 8447",
          areaServed: { "@type": "City", name: "Sayulita" },
          sameAs: ["https://www.sayulitalife.com/business/luna-spa"],
          priceRange: "$$"
        },
        {
          "@type": "WebPage",
          name: "Sayulita Reset — 90-Minute Massage + Facial | Luna Spa",
          description:
            "Book the Sayulita Reset in Sayulita: 90 minutes with a 50-min massage of your choice plus a 40-min hydrating facial at your Airbnb, villa or hotel.",
          inLanguage: "en-US"
        },
        {
          "@type": "Service",
          name: "Deep Tissue Massage in Sayulita, Mexico",
          serviceType: "Deep Tissue Massage Sayulita",
          provider: { "@id": "#luna-spa" },
          areaServed: { "@type": "City", name: "Sayulita" },
          description:
            "Focused massage for deeper muscle tension — brought directly to your accommodation."
        },
        {
          "@type": "Service",
          name: "Sayulita Reset — 90-Minute Massage + Hydrating Facial",
          serviceType: "Body Massage and Facial Ritual Sayulita",
          provider: { "@id": "#luna-spa" },
          areaServed: { "@type": "City", name: "Sayulita" },
          description:
            "90-minute reset treatment: 50 minutes of massage of your choice plus a 40-minute hydrating facial.",
          offers: {
            "@type": "Offer",
            price: "1600",
            priceCurrency: "MXN",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/sayulita-reset`
          }
        },
        {
          "@type": "FAQPage",
          mainEntity: FAQS_DEEP.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a }
          }))
        }
      ]
    }
  },
  couples: {
    pageClass: "page-couples",
    title: "After Surfing — 90-Minute Massage + Facial | Luna Spa",
    description:
      "Recover after surfing, hiking or an adventure day in Sayulita: 90 minutes with a 50-min sports massage plus a 40-min soothing facial at your Airbnb or hotel.",
    url: "/after-surfing",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "HealthAndBeautyBusiness",
          "@id": "#luna-spa",
          name: "Luna Spa in Sayulita",
          telephone: "+52 322 288 8447",
          areaServed: { "@type": "City", name: "Sayulita" },
          sameAs: ["https://www.sayulitalife.com/business/luna-spa"],
          priceRange: "$$"
        },
        {
          "@type": "WebPage",
          name: "After Surfing — 90-Minute Massage + Facial | Luna Spa",
          description:
            "Recover after surfing, hiking or an adventure day in Sayulita: 90 minutes with a 50-min sports massage plus a 40-min soothing facial at your Airbnb or hotel.",
          inLanguage: "en-US"
        },
        {
          "@type": "Service",
          name: "Couples Massage in Sayulita — A Private Spa Experience for Two",
          serviceType: "Couples Massage Sayulita",
          provider: { "@id": "#luna-spa" },
          areaServed: { "@type": "City", name: "Sayulita" },
          description: "Relax together without leaving your Airbnb, villa or hotel."
        },
        {
          "@type": "Service",
          name: "After Surfing — 90-Minute Sports Massage + Soothing Facial",
          serviceType: "Post-Sports Recovery Ritual Sayulita",
          provider: { "@id": "#luna-spa" },
          areaServed: { "@type": "City", name: "Sayulita" },
          description:
            "90-minute recovery ritual: 50 minutes of sports massage plus a 40-minute soothing facial with concentrated aloe vera.",
          offers: {
            "@type": "Offer",
            price: "1800",
            priceCurrency: "MXN",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/after-surfing`
          }
        },
        {
          "@type": "FAQPage",
          mainEntity: FAQS_COUPLES.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a }
          }))
        }
      ]
    }
  },
  group: {
    pageClass: "page-group",
    title: "Luminous Skin — 90-Minute Exfoliation + Massage | Luna Spa",
    description:
      "Book the Luminous Skin ritual in Sayulita: 90 minutes of full-body exfoliation, hydration and massage at your villa, Airbnb or hotel. Body treatments and facials available.",
    url: "/luminous-skin",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "HealthAndBeautyBusiness",
          "@id": "#luna-spa",
          name: "Luna Spa in Sayulita",
          telephone: "+52 322 288 8447",
          areaServed: { "@type": "City", name: "Sayulita" },
          sameAs: ["https://www.sayulitalife.com/business/luna-spa"],
          priceRange: "$$"
        },
        {
          "@type": "WebPage",
          name: "Luminous Skin — 90-Minute Exfoliation + Massage | Luna Spa",
          description:
            "Book the Luminous Skin ritual in Sayulita: 90 minutes of full-body exfoliation, hydration and massage at your villa, Airbnb or hotel. Body treatments and facials available.",
          inLanguage: "en-US"
        },
        {
          "@type": "Service",
          name: "Group Massage in Sayulita for Girls Trips, Retreats & Vacations",
          serviceType: "Group Massage Sayulita",
          provider: { "@id": "#luna-spa" },
          areaServed: { "@type": "City", name: "Sayulita" },
          description: "Bring a private spa experience to your villa."
        },
        {
          "@type": "Service",
          name: "Luminous Skin — 90-Minute Full-Body Exfoliation + Massage",
          serviceType: "Body Exfoliation and Massage Ritual Sayulita",
          provider: { "@id": "#luna-spa" },
          areaServed: { "@type": "City", name: "Sayulita" },
          description:
            "90-minute renewal treatment: full-body exfoliation and hydration plus a massage to restore softness and glow while relieving muscle tension.",
          offers: {
            "@type": "Offer",
            price: "1650",
            priceCurrency: "MXN",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/luminous-skin`
          }
        },
        {
          "@type": "FAQPage",
          mainEntity: FAQS_GROUP.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a }
          }))
        }
      ]
    }
  }
};

export const PAGE_NAV = [
  { to: "/moonlight-couples-ritual", label: "Moonlight Couples Ritual" },
  { to: "/sayulita-reset", label: "Sayulita Reset" },
  { to: "/after-surfing", label: "After Surfing" },
  { to: "/luminous-skin", label: "Luminous Skin" }
];