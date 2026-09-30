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
    description:
      "Gentle massage focused on stress relief, muscle relaxation and overall well-being.",
    badge: "Popular choice"
  },
  {
    id: "therapeutic",
    name: "Therapeutic Massage",
    duration: "60 min",
    price: "$950 MXN",
    description:
      "Focused work for specific areas of muscle tension or discomfort."
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
    price: "$1,000 MXN",
    description: "Focused work on deeper muscle layers, tension and stiffness.",
    badge: "Popular choice",
    href: "deep-tissue"
  },
  {
    id: "hot-stone",
    name: "Hot Stone Massage",
    duration: "75 min",
    price: "$1,200 MXN",
    description: "Massage combined with warm stones for a deeply relaxing experience."
  },
  {
    id: "luna",
    name: "Luna Massage",
    duration: "75 min",
    price: "$1,300 MXN",
    description:
      "Signature combination of therapeutic, deep tissue and hot stone techniques.",
    badge: "Popular choice"
  },
  {
    id: "lymphatic",
    name: "Manual Lymphatic Drainage",
    duration: "75 min",
    price: "$1,400 MXN",
    description:
      "A gentle treatment focused on lymphatic circulation and a feeling of lightness."
  }
];

export const PRICE_ROWS = [
  ["Relaxing Massage", "60 min", "$950 MXN"],
  ["Therapeutic Massage", "60 min", "$950 MXN"],
  ["Mom-to-Be Massage", "60 min", "$950 MXN"],
  ["Deep Tissue Massage", "60 min", "$1,000 MXN"],
  ["Hot Stone Massage", "75 min", "$1,200 MXN"],
  ["Luna Massage", "75 min", "$1,300 MXN"],
  ["Manual Lymphatic Drainage", "75 min", "$1,400 MXN"]
];

export const PRICE_ROWS_90 = [
  ["Relaxing Massage", "60 min", "$950 MXN", "90 min", "$1,300 MXN"],
  ["Therapeutic Massage", "60 min", "$950 MXN", "90 min", "$1,300 MXN"],
  ["Mom-to-Be Massage", "60 min", "$950 MXN", "90 min", "$1,300 MXN"],
  ["Deep Tissue Massage", "60 min", "$1,000 MXN", "90 min", "$1,350 MXN"],
  ["Hot Stone Massage", "75 min", "$1,200 MXN", "90 min", "$1,400 MXN"],
  ["Luna Massage", "75 min", "$1,300 MXN", "90 min", "$1,500 MXN"],
  ["Manual Lymphatic Drainage", "75 min", "$1,400 MXN", "90 min", "$1,600 MXN"]
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
    q: "Is Deep Tissue Massage painful?",
    a: "Deep tissue is more focused than a relaxing massage, but pressure should remain appropriate for the client. Communicate with your therapist throughout the session."
  },
  {
    q: "Can I get Deep Tissue Massage at my Airbnb?",
    a: "Yes. Luna Spa offers home-service massage, allowing you to enjoy your treatment at your accommodation."
  },
  {
    q: "How long is the Deep Tissue Massage?",
    a: "The current menu lists the Deep Tissue Massage as a 60-minute treatment for $1,000 MXN."
  }
];

export const FAQS_COUPLES = [
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
  }
];

const siteUrl = "https://www.lunaspa.example"; // NOTE: replace with final domain before deploy

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
    title: "In-Home Massage in Sayulita | Luna Spa",
    description:
      "Enjoy professional in-home massage in Sayulita at your Airbnb, villa or hotel.",
    url: "/in-home-massage",
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
          name: "In-Home Massage in Sayulita | Luna Spa",
          description:
            "Enjoy professional in-home massage in Sayulita at your Airbnb, villa or hotel.",
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
    title: "Deep Tissue Massage in Sayulita | Luna Spa",
    description:
      "Book a deep tissue massage in Sayulita at your Airbnb, villa or hotel. Focused treatment for muscle tension and stiffness.",
    url: "/deep-tissue-massage",
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
          name: "Deep Tissue Massage in Sayulita | Luna Spa",
          description:
            "Book a deep tissue massage in Sayulita at your Airbnb, villa or hotel. Focused treatment for muscle tension and stiffness.",
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
    title: "Couples Massage in Sayulita | Luna Spa",
    description:
      "Enjoy a private couples massage in Sayulita at your villa, Airbnb or hotel.",
    url: "/couples-massage",
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
          name: "Couples Massage in Sayulita | Luna Spa",
          description:
            "Enjoy a private couples massage in Sayulita at your villa, Airbnb or hotel.",
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
    title: "Group Massage in Sayulita | Villa & Girls Trip | Luna Spa",
    description:
      "Plan a group massage in Sayulita for girls trips, retreats, birthdays or special occasions.",
    url: "/group-massage",
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
          name: "Group Massage in Sayulita | Villa & Girls Trip | Luna Spa",
          description:
            "Plan a group massage in Sayulita for girls trips, retreats, birthdays or special occasions.",
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
  { to: "/in-home-massage", label: "In-Home" },
  { to: "/deep-tissue-massage", label: "Deep Tissue" },
  { to: "/couples-massage", label: "Couples" },
  { to: "/group-massage", label: "Groups" }
];