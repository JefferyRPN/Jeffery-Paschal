/**
 * PORTFOLIO_DATA — the only file you should need to edit.
 * Add a job, achievement, sample, video, or company here.
 * Leave a field as an empty string "" if you don't have it yet — the
 * renderer (app.js) knows how to skip or placeholder empty fields.
 */
const PORTFOLIO_DATA = {
  name: "Jeffery Orgu",
  akaNote:
    'Also publishes as "Jeffery Paschal" / "Learn and Chill with Jeffery Paschal"',
  tagline:
    "Frontend Developer · Social Media Manager · QA — three channels, one operator.",
  location: "Isolo, Lagos, Nigeria",

  roles: {
    frontend: {
      key: "frontend",
      label: "Frontend Developer",
      shortLabel: "Frontend",
      accent: "#4FD1FF",
      image: "img/HOME.jpeg",
      overview:
        "Frontend-focused developer with a full-stack technical background — comfortable shipping production interfaces and building with JavaScript across the stack.",
      experience: [
        {
          title: "Backend Developer",
          org: "Kupa (E-Commerce)",
          dateRange: "March 2024 – November 2024",
          bullets: [
            "Helped design and implement backend services including negotiation, order, cart, authentication, and authorization services using Node.js.",
            "Developed scalable and maintainable applications using the NestJS framework.",
            "Worked on microservices architecture using RESTful APIs, Kafka, and Redis to improve flexibility and fault tolerance.",
            "Collaborated with frontend developers to ensure alignment and seamless implementation.",
          ],
          link: "",
        },
      ],
      achievements: [
        {
          stat: "5",
          label:
            "backend services designed & built — negotiation, order, cart, authentication, authorization (Kupa)",
        },
        {
          stat: "3",
          label:
            "core technologies used in the microservices architecture — REST APIs, Kafka, Redis (Kupa)",
        },
        {
          stat: "4",
          label:
            "Improved page load time by 35%, reducing average load time from 3.2s to 2.1s through code splitting, image optimization, and lazy loading.",
        },
      ],
      samples: [
        {
          title: "Kupa — E-commerce backend services (Node.js / NestJS)",
          link: "",
          unavailable: true,
        },
        {
          title: "TestHoryzon",
          link: "https://test-horizon-frontend-service.vercel.app/",
        },
        {
          title: "Glorious Harvest App",
          link: "https://glorious-harvest-app.vercel.app/",
        },
      ],
    },

    social: {
      key: "social",
      label: "Social Media Manager",
      shortLabel: "Social",
      accent: "#FF6B35",
      image: "img/BLACK.jpeg",
      overview:
        "Creative and execution-focused Social Media Manager with experience in content creation, audience engagement, and digital brand growth across Facebook, Instagram, and TikTok. Skilled in creating engaging graphics, videos, and captions tailored to Nigerian audiences. Experienced in using CapCut, Canva, AI tools, and social media strategies to increase engagement, visibility, and audience growth. Achieved over 88K views through strategic short-form content and engagement-driven campaigns. Also brings a strong technical background in backend development, digital systems, and collaborative project execution.",
      skills: [
        "Social Media Management",
        "Content Strategy & Planning",
        "Short-Form Video Editing",
        "Graphic Design",
        "Audience Growth & Engagement",
        "Caption & Copy Writing",
        "Community Management",
        "Brand Positioning",
        "AI Prompting & AI Content Tools",
        "Facebook, Instagram & TikTok Management",
        "CapCut & Canva",
        "Trend Research & Viral Content Strategy",
        "Basic Photography & Videography",
        "Communication & Team Coordination",
      ],
      experience: [
        {
          title: "Social Media Manager",
          org: "P Golden Signature, Lagos, Nigeria",
          bullets: [
            "Created engaging graphics, videos, captions, and branded content tailored for Nigerian audiences.",
            "Managed Facebook, Instagram, and TikTok pages to improve audience engagement and online visibility.",
            "Generated over 88K views through strategic short-form video content and audience-focused campaigns.",
            "Increased engagement and supported sales growth through content planning and audience-centered storytelling.",
            "Edited short-form videos using CapCut and designed promotional graphics using Canva.",
            "Used AI tools to improve content execution speed, creativity, and campaign performance.",
            "Monitored social media trends and optimized content strategies based on platform performance.",
          ],
          link: "https://www.facebook.com/Pgoldensignatures",
        },
      ],
      achievements: [
        {
          stat: "88K+",
          label: "views generated through short-form video campaigns",
        },
        {
          stat: "3",
          label: "platforms actively managed (Facebook, Instagram, TikTok)",
        },
      ],
      samples: [
        {
          placeholder: true,
          title:
            "Using Meta Ads to increase the visibility(Views) of this creative for Juliet Dropstore Varieties ",
          link: "https://www.instagram.com/reel/DbDCLRUNkmu/?igsh=bXc3bWJ6ZGk0N2My",
        },
        {
          placeholder: true,
          title:
            "Using Target Audience Strategy to increase the visibility(Views) of this Tiktok creative for Juliet Dropstore Varieties ",
          link: "https://vm.tiktok.com/ZSVxhrXMp/ ",
        },
        {
          placeholder: true,
          title:
            "Using Meta Ads to increase the visibility(Views) of this creative for Insight4livin",
          link: "https://www.facebook.com/share/r/189RqCy2EM/",
        },
      ],
      // Video Showcase — paste a YouTube, TikTok, or Instagram URL into `url`.
      // YouTube links embed directly. Everything else renders as a "Watch" card.
      // Leave `url: ""` to keep a box empty and styled, ready for later.
      videos: [
        {
          url: "https://youtube.com/shorts/9DW9s2gNo2U?si=0a5yYTn3osLqEp_B",
          caption: "Can a cup survive a drive",
        },
        {
          url: "https://youtu.be/Zm5lnf_b73Y?si=1uszl8xPYT7EnnNZ",
          caption: "Learn Spanish like a child",
        },
        {
          url: "https://www.facebook.com/share/r/191scr6PfD/?mibextid=wwXIfr",
          caption: "Stand together against bullying",
        },
        {
          url: "https://www.instagram.com/reel/DblxF96o_yP/?igsh=N2swdHBuYzgxOTcx",
          caption: "Today at work",
        },
        {
          url: "https://www.facebook.com/share/r/1GqDULPnPY/",
          caption: "The dalton cup",
        },
        {
          url: "https://www.facebook.com/share/v/1DKpD9EtWP/",
          caption: "Mercedes benz ML350 08",
        },
      ],
      // Brands I've Managed — one card per company. Leave facebook/instagram/tiktok
      // empty until you have the real URLs. Add a `placeholder: true` card for
      // an empty "+ Add Company" slot.
      brands: [
        {
          name: "P Golden Signature",
          location: "Lagos, Nigeria",
          initials: "PG",
          facebook: "https://www.facebook.com/Pgoldensignatures",
        },
        {
          name: "Pamela",
          location: "Lekki",
          initials: "PA",
          facebook: "",
          instagram:
            "https://www.instagram.com/pamelanigeria?igsh=MWZrMTlrN202bG1qYQ==",
          tiktok: "",
        },
        {
          placeholder: true,
          name: "TestHoryzon Not Available now",
          location: "Ikotun",
          initials: "+",
          facebook: "",
          instagram: "",
          tiktok: "",
        },
        {
          name: "Language Exchange Hub | Polyglot",
          location: "Belgium",
          initials: "LE",
          facebook:
            "https://www.facebook.com/share/g/19CfH6E3wW/?mibextid=wwXIfr",
          instagram: "",
          tiktok: "",
        },
      ],
    },

    qa: {
      key: "qa",
      label: "QA",
      shortLabel: "QA",
      accent: "#3DDC84",
      image: "img/grad.jpeg",
      overview:
        "Detail-driven QA mindset shaped by backend engineering — reviewing and merging production code, and building systems (authentication, OTP verification, cart/checkout) where correctness and edge cases matter.",
      experience: [
        {
          title: "Backend Developer",
          org: "Chop Chow",
          dateRange: "December 2024 – February 2025",
          bullets: [
            "Coordinated teams regarding backend development best practices.",
            "Implemented email and phone OTP validation and verification systems.",
            "Worked on Google and Facebook login authentication features.",
            "Implemented Instagram, Facebook, Twitter, and WhatsApp sharing functionality.",
            "Reviewed and merged production-ready code into the codebase.",
            "Built cart, checkout, filtering, and sorting systems optimized for performance.",
          ],
          link: "",
        },
      ],
      achievements: [
        {
          stat: "2",
          label:
            "authentication systems shipped — OTP verification (email & phone) and Google/Facebook login (Chop Chow)",
        },
        {
          stat: "4",
          label:
            "social-sharing integrations implemented — Instagram, Facebook, Twitter, WhatsApp (Chop Chow)",
        },
        {
          placeholder: true,
          stat: "4",
          label:
            "Tested the website across different devices and browsers, found and reported 50+ bugs, and worked with the development team to fix issues and improve the overall user experience.",
        },
      ],
      samples: [
        {
          title: "Chop Chow — Auth & OTP verification systems",
          link: "",
          unavailable: true,
        },
        {
          title: "Chop Chow — Cart, checkout, filtering & sorting",
          link: "",
          unavailable: true,
        },
        {
          placeholder: true,
          title: "TestHoryzon",
          link: "https://test-horizon-frontend-service.vercel.app/",
        },
      ],
    },
  },

  footer: {
    education: [
      {
        school: "National Open University of Nigeria, VI",
        detail: "Bachelor's Degree, Political Science (In View)",
      },
      {
        school: "Emerald College High School",
        detail: "WASSCE, Graduated with Distinction (2011–2018)",
      },
    ],
    award: "Best Teacher Award",
    tools: [
      "CapCut",
      "Canva",
      "ChatGPT & AI Tools",
      "Google Workspace",
      "Microsoft Excel",
      "Meta Platforms",
      "Node.js",
      "NestJS",
      "Kafka",
      "Redis",
      "JavaScript",
    ],
    contact: {
      email: "jefferykendo@gmail.com",
      phone: "+234 802 291 3335",
      linkedin: "https://www.linkedin.com/in/jeffery-kendo-027b722b0",
      // Add extra social links any time — leave url empty to render a muted, unlinked slot.
      socialSlots: [
        {
          platform: "Facebook",
          url: "https://www.facebook.com/jeffery.paschal.3",
        },
        {
          platform: "Instagram",
          url: "https://www.instagram.com/jeffery_pascal?igsi=aGh1YjByaWt6MDZo",
        },
        { platform: "X", url: "https://x.com/PaschalJeffery" },
      ],
    },
  },
};
