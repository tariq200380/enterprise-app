export interface ServiceFeature {
  title: string;
  desc: string;
  badge?: string;
  step?: string;
}

export interface ServiceDetail {
  num: string;
  announcement: string;
  name: string;
  tagline: string;
  intro: string;
  subHeadings: {
    services: string;
    servicesDesc: string;
    benefits: string;
    benefitsDesc: string;
    process: string;
    processDesc: string;
    results: string;
    resultsDesc: string;
  };
  cta: {
    heading: string;
    desc: string;
    btn: string;
  };
  overview: ServiceFeature[];
  servicesList: ServiceFeature[];
  benefitCards: ServiceFeature[];
  process: ServiceFeature[];
  resultCards: ServiceFeature[];
  techStack: string[];
}

export const ORDERED_SVCS = [
  "software-development",
  "ui-ux-design",
  "mobile-application",
  "cloud-infrastructure",
  "database-management",
  "web-development",
  "ai-automation",
  "digital-growth"
] as const;

export type ServiceId = typeof ORDERED_SVCS[number];

export const ORDERED_SUBTABS = [
  { id: "overview", label: "Overview" },
  { id: "services", label: "Services" },
  { id: "benefits", label: "Benefits" },
  { id: "process", label: "Process" },
  { id: "proven", label: "Results" }
] as const;

export type SubTabId = typeof ORDERED_SUBTABS[number]["id"];

export const TECH_ICONS: Record<string, string> = {
  "JAVA": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M46 84 C46 84 40 88 52 90 C66 92 78 92 90 90 C102 88 96 84 96 84 C96 84 82 86 70 86 C58 86 46 84 46 84 Z\" fill=\"#E76F00\"/><path d=\"M42 98 C42 98 34 104 50 106 C66 108 82 108 94 106 C108 104 102 98 102 98 C102 98 86 101 70 101 C54 101 42 98 42 98 Z\" fill=\"#E76F00\"/><path d=\"M66 18 C66 18 52 30 60 44 C66 54 74 58 74 66 C74 76 60 82 60 82 C60 82 72 76 70 66 C68 58 60 54 56 44 C52 32 66 18 66 18 Z\" fill=\"#5382A1\"/><path d=\"M80 32 C80 32 70 42 74 52 C78 60 84 64 84 70 C84 78 72 84 72 84 C72 84 82 78 80 70 C78 64 72 60 70 52 C66 42 80 32 80 32 Z\" fill=\"#E76F00\"/><path d=\"M36 116 C36 116 26 122 52 124 C78 126 98 126 112 124 C124 122 116 116 116 116 C116 116 98 120 74 120 C50 120 36 116 36 116 Z\" fill=\"#5382A1\"/></svg>",
  "C#": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><polygon points=\"64,14 114,43 114,101 64,130 14,101 14,43\" fill=\"#68217A\"/><polygon points=\"64,22 106,47 106,97 64,122 22,97 22,47\" fill=\"#9B4993\"/><path d=\"M58 54 C54 50 48 48 42 52 C36 56 34 66 38 74 C42 80 50 82 56 78\" stroke=\"#FFF\" stroke-width=\"8\" stroke-linecap=\"round\" fill=\"none\"/><path d=\"M72 52 V80 M84 52 V80 M66 62 H90 M66 70 H90\" stroke=\"#FFF\" stroke-width=\"5\" stroke-linecap=\"round\"/></svg>",
  "PYTHON": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M62 20 C42 20 44 30 44 30 L44 40 L64 40 L64 43 L34 43 C34 43 20 41 20 62 C20 83 31 82 31 82 L38 82 L38 72 C38 72 38 60 50 60 L70 60 C70 60 80 60 80 50 L80 30 C80 30 82 20 62 20 Z\" fill=\"#3776AB\"/><circle cx=\"52\" cy=\"28\" r=\"4\" fill=\"#FFF\"/><path d=\"M66 108 C86 108 84 98 84 98 L84 88 L64 88 L64 85 L94 85 C94 85 108 87 108 66 C108 45 97 46 97 46 L90 46 L90 56 C90 56 90 68 78 68 L58 68 C58 68 48 68 48 78 L48 98 C48 98 46 108 66 108 Z\" fill=\"#FFD438\"/><circle cx=\"76\" cy=\"100\" r=\"4\" fill=\"#FFF\"/></svg>",
  "C++": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><polygon points=\"64,14 114,43 114,101 64,130 14,101 14,43\" fill=\"#00599C\"/><polygon points=\"64,22 106,47 106,97 64,122 22,97 22,47\" fill=\"#659AD2\"/><path d=\"M52 54 C48 50 42 48 36 52 C30 56 28 66 32 74 C36 80 44 82 50 78\" stroke=\"#FFF\" stroke-width=\"8\" stroke-linecap=\"round\" fill=\"none\"/><path d=\"M66 66 H78 M72 60 V72 M88 66 H100 M94 60 V72\" stroke=\"#FFF\" stroke-width=\"5\" stroke-linecap=\"round\"/></svg>",
  "TYPESCRIPT": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"20\" fill=\"#3178C6\"/><path d=\"M38 52 H64 M51 52 V94\" stroke=\"#FFF\" stroke-width=\"10\" stroke-linecap=\"round\"/><path d=\"M72 84 C76 90 84 94 92 90 C98 86 98 76 90 72 L80 68 C70 64 70 54 78 50 C86 46 94 48 98 54\" stroke=\"#FFF\" stroke-width=\"10\" stroke-linecap=\"round\" fill=\"none\"/></svg>",
  ".NET": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><polygon points=\"64,14 114,43 114,101 64,130 14,101 14,43\" fill=\"#512BD4\"/><path d=\"M34 88 V60 L50 88 V60 M62 88 V60 M62 60 H76 M62 74 H74 M62 88 H76 M84 60 H98 M91 60 V88\" stroke=\"#FFF\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"28\" cy=\"88\" r=\"4\" fill=\"#FFF\"/></svg>",
  "SPRING BOOT": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><polygon points=\"64,16 112,44 112,100 64,128 16,100 16,44\" fill=\"#6DB33F\"/><path d=\"M50 74 C50 60 64 42 78 38 C76 54 68 68 56 74 Z\" fill=\"#FFF\"/><path d=\"M52 76 C62 76 74 72 82 62 C80 74 68 86 52 86 C40 86 36 78 36 70 C36 62 42 56 48 54 C46 62 46 72 52 76 Z\" fill=\"#FFF\"/></svg>",
  "GIT": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect x=\"20\" y=\"20\" width=\"88\" height=\"88\" rx=\"18\" transform=\"rotate(45 64 64)\" fill=\"#F05032\"/><circle cx=\"50\" cy=\"50\" r=\"8\" fill=\"#FFF\"/><circle cx=\"78\" cy=\"78\" r=\"8\" fill=\"#FFF\"/><circle cx=\"78\" cy=\"42\" r=\"8\" fill=\"#FFF\"/><path d=\"M50 50 L78 78 M78 42 V78\" stroke=\"#FFF\" stroke-width=\"8\" stroke-linecap=\"round\"/></svg>",
  "FIGMA": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M42 22 H64 V44 H42 Z\" fill=\"#F24E1E\"/><path d=\"M64 22 H86 C98 22 98 44 86 44 H64 Z\" fill=\"#FF7262\"/><path d=\"M42 44 H64 V66 H42 Z\" fill=\"#A259FF\"/><circle cx=\"75\" cy=\"55\" r=\"11\" fill=\"#1ABCFE\"/><path d=\"M42 66 H64 V88 C64 100 42 100 42 88 Z\" fill=\"#0ACF83\"/></svg>",
  "FIGJAM": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"24\" fill=\"#9747FF\"/><path d=\"M38 42 H90 V54 H38 Z M38 62 H78 V74 H38 Z M38 82 H66 V94 H38 Z\" fill=\"#FFF\"/><circle cx=\"88\" cy=\"80\" r=\"10\" fill=\"#FFC700\"/></svg>",
  "ADOBE ILLUSTRATOR": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"24\" fill=\"#330000\"/><text x=\"64\" y=\"86\" fill=\"#FF9A00\" font-size=\"52\" font-weight=\"bold\" font-family=\"sans-serif\" text-anchor=\"middle\">Ai</text></svg>",
  "ADOBE PHOTOSHOP": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"24\" fill=\"#001E36\"/><text x=\"64\" y=\"86\" fill=\"#31A8FF\" font-size=\"52\" font-weight=\"bold\" font-family=\"sans-serif\" text-anchor=\"middle\">Ps</text></svg>",
  "FRAMER": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M32 20 H96 L64 52 H96 L32 116 V84 L64 52 H32 Z\" fill=\"#0055FF\"/></svg>",
  "MAZE": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"24\" fill=\"#18181B\"/><text x=\"64\" y=\"84\" fill=\"#FF3366\" font-size=\"42\" font-weight=\"bold\" font-family=\"sans-serif\" text-anchor=\"middle\">maze</text></svg>",
  "MIRO": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"20\" fill=\"#FFD02F\"/><path d=\"M38 36 L52 92 L62 92 L48 36 Z M56 36 L70 92 L80 92 L66 36 Z M74 36 L88 92 L98 92 L84 36 Z\" fill=\"#050038\"/></svg>",
  "ZEPLIN": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><circle cx=\"64\" cy=\"64\" r=\"54\" fill=\"#FBAE17\"/><path d=\"M42 42 H86 L48 86 H86\" stroke=\"#FFF\" stroke-width=\"12\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
  "SWIFT": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M112 78 C94 98 64 108 34 106 C52 92 64 72 64 50 C44 68 24 72 16 70 C40 38 68 22 96 22 C84 34 84 48 86 52 C98 42 108 30 112 18 C118 42 118 64 112 78 Z\" fill=\"#FA7343\"/></svg>",
  "SWIFTUI": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"24\" fill=\"#0071E3\"/><path d=\"M96 68 C82 82 58 90 36 88 C48 78 56 62 56 46 C40 60 26 62 20 60 C38 36 60 24 82 24 C72 34 72 44 74 48 C84 40 92 30 96 20 C100 38 100 56 96 68 Z\" fill=\"#FFF\"/></svg>",
  "KOTLIN": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M18 18 H110 L64 64 L110 110 H18 Z\" fill=\"#7F52FF\"/><path d=\"M18 18 H64 L18 64 Z\" fill=\"#C757BC\"/><path d=\"M64 64 L110 110 H18 L64 64 Z\" fill=\"#0095D5\"/></svg>",
  "JETPACK COMPOSE": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><polygon points=\"64,20 108,44 108,96 64,120 20,96 20,44\" fill=\"#4285F4\"/><polygon points=\"64,36 94,52 94,88 64,104 34,88 34,52\" fill=\"#0F9D58\"/><polygon points=\"64,50 82,60 82,80 64,90 46,80 46,60\" fill=\"#F4B400\"/></svg>",
  "DART": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M22 22 H74 L106 54 L62 106 L22 106 Z\" fill=\"#0175C2\"/><path d=\"M62 22 L106 66 L86 106 L22 42 Z\" fill=\"#00B4AB\"/><path d=\"M42 42 L82 82 L62 106 L22 66 Z\" fill=\"#13B9FD\"/><polygon points=\"62,22 86,22 106,42 106,66\" fill=\"#01579B\"/></svg>",
  "FLUTTER": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M74 20 L28 66 L44 82 L104 20 Z\" fill=\"#02569B\"/><path d=\"M58 82 L74 66 L104 96 L74 126 L44 96 Z\" fill=\"#0175C2\"/><path d=\"M74 96 L104 96 L74 126 Z\" fill=\"#13B9FD\"/></svg>",
  "REACT NATIVE": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><ellipse cx=\"64\" cy=\"64\" rx=\"48\" ry=\"18\" stroke=\"#61DAFB\" stroke-width=\"4\"/><ellipse cx=\"64\" cy=\"64\" rx=\"48\" ry=\"18\" stroke=\"#61DAFB\" stroke-width=\"4\" transform=\"rotate(60 64 64)\"/><ellipse cx=\"64\" cy=\"64\" rx=\"48\" ry=\"18\" stroke=\"#61DAFB\" stroke-width=\"4\" transform=\"rotate(120 64 64)\"/><circle cx=\"64\" cy=\"64\" r=\"8\" fill=\"#61DAFB\"/></svg>",
  "AMAZON WEB SERVICES": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M38 46 L46 76 L54 76 L62 46 L55 46 L50 68 L45 46 Z\" fill=\"#FF9900\"/><path d=\"M64 46 L72 76 L80 76 L88 46 L81 46 L76 68 L71 46 Z\" fill=\"#FF9900\"/><path d=\"M26 86 Q64 108 102 86\" stroke=\"#FF9900\" stroke-width=\"7\" stroke-linecap=\"round\" fill=\"none\"/><path d=\"M96 80 L102 86 L94 90 Z\" fill=\"#FF9900\"/></svg>",
  "MICROSOFT AZURE": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M36 94 L62 26 L80 26 L46 94 Z\" fill=\"#008AD7\"/><path d=\"M62 26 L88 78 L98 94 L46 94 L66 62 Z\" fill=\"#0078D4\"/></svg>",
  "GOOGLE CLOUD": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M52 42 C56 34 66 30 76 34 C86 38 92 48 90 58 C98 60 104 68 102 78 C100 86 92 92 84 92 H46 C34 92 26 82 26 72 C26 62 34 54 44 54 C46 48 48 44 52 42 Z\" fill=\"#4285F4\"/><path d=\"M84 92 H46 C34 92 26 82 26 72 C26 68 28 64 30 60 L50 78 L72 78 L84 92 Z\" fill=\"#34A853\"/><path d=\"M52 42 C56 34 66 30 76 34 C86 38 92 48 90 58 L72 78 L50 78 L52 42 Z\" fill=\"#EA4335\"/><circle cx=\"76\" cy=\"56\" r=\"10\" fill=\"#FBBC05\"/></svg>",
  "DOCKER": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M112 62 C108 58 98 58 94 62 C88 52 74 52 68 62 H16 C16 88 40 102 68 102 C102 102 116 78 116 68 C116 64 114 62 112 62 Z\" fill=\"#2496ED\"/><rect x=\"36\" y=\"44\" width=\"10\" height=\"10\" rx=\"1\" fill=\"#2496ED\"/><rect x=\"50\" y=\"44\" width=\"10\" height=\"10\" rx=\"1\" fill=\"#2496ED\"/><rect x=\"64\" y=\"44\" width=\"10\" height=\"10\" rx=\"1\" fill=\"#2496ED\"/></svg>",
  "KUBERNETES": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M64 18 L104 38 V86 L64 108 L24 86 V38 Z\" fill=\"#326CE5\"/><circle cx=\"64\" cy=\"64\" r=\"16\" fill=\"#FFF\"/><path d=\"M64 36 V48 M64 80 V92 M38 52 L48 58 M80 70 L90 76 M38 76 L48 70 M80 58 L90 52\" stroke=\"#326CE5\" stroke-width=\"4\"/></svg>",
  "TERRAFORM": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect x=\"28\" y=\"24\" width=\"30\" height=\"30\" rx=\"3\" fill=\"#844FBA\"/><rect x=\"64\" y=\"44\" width=\"30\" height=\"30\" rx=\"3\" fill=\"#5C4EE5\"/><rect x=\"28\" y=\"64\" width=\"30\" height=\"30\" rx=\"3\" fill=\"#844FBA\"/><rect x=\"64\" y=\"84\" width=\"30\" height=\"30\" rx=\"3\" fill=\"#844FBA\"/></svg>",
  "GITHUB ACTIONS": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"24\" fill=\"#2088FF\"/><path d=\"M40 38 L68 64 L40 90\" stroke=\"#FFF\" stroke-width=\"12\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><line x1=\"68\" y1=\"90\" x2=\"92\" y2=\"90\" stroke=\"#FFF\" stroke-width=\"12\" stroke-linecap=\"round\"/></svg>",
  "PROMETHEUS": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><circle cx=\"64\" cy=\"64\" r=\"54\" fill=\"#E6522C\"/><path d=\"M64 24 C50 44 42 60 42 76 C42 90 52 102 64 102 C76 102 86 90 86 76 C86 60 78 44 64 24 Z\" fill=\"#FFF\"/><path d=\"M64 48 C56 60 52 70 52 80 C52 88 58 94 64 94 C70 94 76 88 76 80 C76 70 72 60 64 48 Z\" fill=\"#E6522C\"/></svg>",
  "POSTGRESQL": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M66 22 C48 22 36 34 34 50 C32 66 38 78 44 86 C46 89 44 96 40 102 C38 105 42 108 46 106 C54 102 58 92 60 86 C64 88 70 88 76 86 C88 82 96 70 96 52 C96 34 84 22 66 22 Z\" fill=\"#336791\"/><path d=\"M44 50 C44 58 48 64 54 66 C52 58 52 48 44 50 Z\" fill=\"#2B5B84\"/><path d=\"M72 44 C72 44 78 42 82 48 C86 54 84 62 80 64 C76 66 72 60 72 56 Z\" fill=\"#FFFFFF\"/><circle cx=\"78\" cy=\"52\" r=\"3\" fill=\"#336791\"/><path d=\"M58 86 C58 98 52 106 46 108 C56 108 64 98 64 86 Z\" fill=\"#FFFFFF\"/><path d=\"M68 62 C74 62 80 66 82 72 C78 74 72 72 68 68 Z\" fill=\"#2B5B84\"/></svg>",
  "MYSQL": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M30 76 C32 60 44 44 58 36 C72 28 88 28 98 34 C94 38 86 42 78 46 C68 51 58 60 54 72 C52 78 46 86 36 94 C34 96 32 94 32 90 C34 84 32 80 30 76 Z\" fill=\"#00758F\"/><path d=\"M78 46 C84 42 92 38 98 34 C100 42 98 52 92 62 C86 72 76 80 66 84 C62 76 66 64 72 54 C74 51 76 48 78 46 Z\" fill=\"#F29111\"/><circle cx=\"86\" cy=\"42\" r=\"2.5\" fill=\"#FFFFFF\"/></svg>",
  "MICROSOFT SQL SERVER": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><ellipse cx=\"64\" cy=\"34\" rx=\"36\" ry=\"12\" fill=\"#E83B24\"/><path d=\"M28 34 V54 C28 60.6 44.1 66 64 66 C83.9 66 100 60.6 100 54 V34\" fill=\"none\" stroke=\"#C42916\" stroke-width=\"6\"/><ellipse cx=\"64\" cy=\"54\" rx=\"36\" ry=\"12\" fill=\"#D83B01\"/><path d=\"M28 54 V74 C28 80.6 44.1 86 64 86 C83.9 86 100 80.6 100 74 V54\" fill=\"none\" stroke=\"#B82614\" stroke-width=\"6\"/><ellipse cx=\"64\" cy=\"74\" rx=\"36\" ry=\"12\" fill=\"#C42916\"/><path d=\"M28 74 V94 C28 100.6 44.1 106 64 106 C83.9 106 100 100.6 100 94 V74\" fill=\"none\" stroke=\"#9E1D0E\" stroke-width=\"6\"/><ellipse cx=\"64\" cy=\"94\" rx=\"36\" ry=\"12\" fill=\"#A82010\"/></svg>",
  "ORACLE DATABASE": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"24\" fill=\"#F80000\"/><ellipse cx=\"64\" cy=\"42\" rx=\"36\" ry=\"12\" fill=\"#FFF\"/><path d=\"M28 42 V86 C28 92.6 44.1 98 64 98 C83.9 98 100 92.6 100 86 V42\" fill=\"none\" stroke=\"#FFF\" stroke-width=\"6\"/><ellipse cx=\"64\" cy=\"64\" rx=\"36\" ry=\"12\" fill=\"#FFF\" opacity=\"0.3\"/><ellipse cx=\"64\" cy=\"86\" rx=\"36\" ry=\"12\" fill=\"#FFF\"/></svg>",
  "MONGODB": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M64 16 C64 16 34 46 34 76 C34 98 48 110 64 116 C80 110 94 98 94 76 C94 46 64 16 64 16 Z\" fill=\"#47A248\"/><path d=\"M64 16 L64 116 C78 110 94 98 94 76 C94 46 64 16 64 16 Z\" fill=\"#499D4A\"/><path d=\"M64 24 C64 24 62 48 56 66 C52 78 48 88 64 112 C64 112 60 92 60 76 C60 52 64 24 64 24 Z\" fill=\"#FFFFFF\" opacity=\"0.3\"/></svg>",
  "REDIS": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M64 24 L102 44 L64 64 L26 44 Z\" fill=\"#E23E32\"/><path d=\"M64 64 L102 44 V68 L64 88 Z\" fill=\"#A81D14\"/><path d=\"M64 64 L26 44 V68 L64 88 Z\" fill=\"#C32C21\"/><path d=\"M64 88 L102 68 V86 L64 106 Z\" fill=\"#8E140C\"/><path d=\"M64 88 L26 68 V86 L64 106 Z\" fill=\"#A81D14\"/><circle cx=\"56\" cy=\"42\" r=\"3\" fill=\"#FFFFFF\" opacity=\"0.6\"/><circle cx=\"72\" cy=\"46\" r=\"2.5\" fill=\"#FFFFFF\" opacity=\"0.6\"/></svg>",
  "MARIADB": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"24\" fill=\"#003545\"/><path d=\"M36 78 C42 62 56 50 74 44 C84 40 92 46 88 56 C84 66 74 72 64 74 C50 76 42 84 36 92 Z\" fill=\"#C0A16B\"/><circle cx=\"78\" cy=\"48\" r=\"3\" fill=\"#FFF\"/></svg>",
  "SQLITE": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"20\" fill=\"#003B57\"/><path d=\"M38 46 C46 36 68 34 82 42 C92 48 94 60 88 74 C82 86 68 94 50 92 C38 90 32 80 34 68 Z\" stroke=\"#00A9E0\" stroke-width=\"8\" fill=\"none\"/><path d=\"M50 46 L78 84\" stroke=\"#00A9E0\" stroke-width=\"8\" stroke-linecap=\"round\"/></svg>",
  "HTML5": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M22 18 L30 108 L64 118 L98 108 L106 18 Z\" fill=\"#E34F26\"/><path d=\"M64 26 V109 L91 101 L97 26 Z\" fill=\"#EF652A\"/><path d=\"M40 42 H88 L86 64 H64 V80 L76 76 L77 68 H89 L86 92 L64 98 V86 L43 80 L41 54 H64 V42 H40 Z\" fill=\"#FFF\"/></svg>",
  "CSS3": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M22 18 L30 108 L64 118 L98 108 L106 18 Z\" fill=\"#1572B6\"/><path d=\"M64 26 V109 L91 101 L97 26 Z\" fill=\"#33A9DC\"/><path d=\"M40 42 H88 L86 64 H64 V80 L76 76 L77 68 H89 L86 92 L64 98 V86 L43 80 L41 54 H64 V42 H40 Z\" fill=\"#FFF\"/></svg>",
  "JAVASCRIPT": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"20\" fill=\"#F7DF1E\"/><path d=\"M42 86 C46 90 52 92 58 88 C64 84 64 74 58 70 L50 66 C42 62 42 54 48 50 C54 46 60 48 64 52\" stroke=\"#000\" stroke-width=\"8\" stroke-linecap=\"round\" fill=\"none\"/><path d=\"M80 50 V84 C80 92 74 94 68 92\" stroke=\"#000\" stroke-width=\"8\" stroke-linecap=\"round\" fill=\"none\"/></svg>",
  "REACT": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><ellipse cx=\"64\" cy=\"64\" rx=\"48\" ry=\"18\" stroke=\"#61DAFB\" stroke-width=\"4\"/><ellipse cx=\"64\" cy=\"64\" rx=\"48\" ry=\"18\" stroke=\"#61DAFB\" stroke-width=\"4\" transform=\"rotate(60 64 64)\"/><ellipse cx=\"64\" cy=\"64\" rx=\"48\" ry=\"18\" stroke=\"#61DAFB\" stroke-width=\"4\" transform=\"rotate(120 64 64)\"/><circle cx=\"64\" cy=\"64\" r=\"8\" fill=\"#61DAFB\"/></svg>",
  "NEXT.JS": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><circle cx=\"64\" cy=\"64\" r=\"54\" fill=\"#000\"/><path d=\"M46 42 V86 H54 V56 L82 86 H90 V42 H82 V72 L54 42 Z\" fill=\"#FFF\"/></svg>",
  "NODE.JS": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><polygon points=\"64,16 112,44 112,100 64,128 16,100 16,44\" fill=\"#339933\"/><path d=\"M64 42 L88 56 V84 L64 98 L40 84 V56 Z\" fill=\"#FFF\" opacity=\"0.2\"/><text x=\"64\" y=\"80\" fill=\"#FFF\" font-size=\"34\" font-weight=\"bold\" font-family=\"sans-serif\" text-anchor=\"middle\">JS</text></svg>",
  "WORDPRESS": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><circle cx=\"64\" cy=\"64\" r=\"54\" fill=\"#21759B\"/><circle cx=\"64\" cy=\"64\" r=\"48\" stroke=\"#FFF\" stroke-width=\"4\" fill=\"none\"/><text x=\"64\" y=\"86\" fill=\"#FFF\" font-size=\"56\" font-weight=\"bold\" font-family=\"serif\" text-anchor=\"middle\">W</text></svg>",
  "OPENAI": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><circle cx=\"64\" cy=\"64\" r=\"54\" fill=\"#10A37F\"/><path d=\"M64 36 C56 36 50 42 50 50 V60 L58 55 V50 C58 46 61 43 64 43 C67 43 70 46 70 50 V68 L64 72 L48 63 C44 61 42 56 42 52 C42 46 47 40 54 40\" stroke=\"#FFF\" stroke-width=\"4\" stroke-linecap=\"round\" fill=\"none\"/><circle cx=\"64\" cy=\"64\" r=\"22\" stroke=\"#FFF\" stroke-width=\"5\" fill=\"none\"/></svg>",
  "GOOGLE GEMINI": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"24\" fill=\"#1B1F24\"/><path d=\"M64 24 C64 46 46 64 24 64 C46 64 64 82 64 104 C64 82 82 64 104 64 C82 64 64 46 64 24 Z\" fill=\"url(#geminiGrad)\"/><defs><linearGradient id=\"geminiGrad\" x1=\"24\" y1=\"24\" x2=\"104\" y2=\"104\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#1BA1E3\"/><stop offset=\"0.5\" stop-color=\"#5B68DF\"/><stop offset=\"1\" stop-color=\"#D96570\"/></linearGradient></defs></svg>",
  "ANTHROPIC CLAUDE": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"24\" fill=\"#D97757\"/><path d=\"M64 30 V98 M30 64 H98 M40 40 L88 88 M40 88 L88 40\" stroke=\"#FFF\" stroke-width=\"10\" stroke-linecap=\"round\"/></svg>",
  "LANGCHAIN": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"20\" fill=\"#1C3C3C\"/><circle cx=\"48\" cy=\"64\" r=\"16\" stroke=\"#00A67E\" stroke-width=\"8\" fill=\"none\"/><circle cx=\"80\" cy=\"64\" r=\"16\" stroke=\"#00A67E\" stroke-width=\"8\" fill=\"none\"/><line x1=\"48\" y1=\"64\" x2=\"80\" y2=\"64\" stroke=\"#00A67E\" stroke-width=\"8\"/></svg>",
  "HUGGING FACE": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><circle cx=\"64\" cy=\"64\" r=\"54\" fill=\"#FFD21E\"/><circle cx=\"46\" cy=\"54\" r=\"6\" fill=\"#000\"/><circle cx=\"82\" cy=\"54\" r=\"6\" fill=\"#000\"/><path d=\"M46 76 Q64 96 82 76\" stroke=\"#000\" stroke-width=\"6\" stroke-linecap=\"round\" fill=\"none\"/><ellipse cx=\"36\" cy=\"66\" rx=\"6\" ry=\"4\" fill=\"#FF9EAA\"/><ellipse cx=\"92\" cy=\"66\" rx=\"6\" ry=\"4\" fill=\"#FF9EAA\"/></svg>",
  "N8N": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"24\" fill=\"#EA4B71\"/><circle cx=\"44\" cy=\"64\" r=\"12\" fill=\"#FFF\"/><circle cx=\"84\" cy=\"44\" r=\"12\" fill=\"#FFF\"/><circle cx=\"84\" cy=\"84\" r=\"12\" fill=\"#FFF\"/><line x1=\"44\" y1=\"64\" x2=\"84\" y2=\"44\" stroke=\"#FFF\" stroke-width=\"6\"/><line x1=\"44\" y1=\"64\" x2=\"84\" y2=\"84\" stroke=\"#FFF\" stroke-width=\"6\"/></svg>",
  "MICROSOFT POWER AUTOMATE": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect width=\"128\" height=\"128\" rx=\"24\" fill=\"#0066FF\"/><path d=\"M38 34 H76 L54 64 H90 L46 94 L58 64 H38 Z\" fill=\"#FFF\"/></svg>",
  "GOOGLE ANALYTICS 4": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><rect x=\"28\" y=\"52\" width=\"18\" height=\"48\" rx=\"9\" fill=\"#F9AB00\"/><rect x=\"55\" y=\"28\" width=\"18\" height=\"72\" rx=\"9\" fill=\"#E37400\"/><circle cx=\"91\" cy=\"91\" r=\"9\" fill=\"#E37400\"/></svg>",
  "GOOGLE SEARCH CONSOLE": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M42 96 C30 96 20 86 20 74 C20 63 28 54 39 52 C42 36 56 24 72 24 C89 24 103 36 106 52 C116 54 124 63 124 74 C124 86 114 96 102 96 Z\" fill=\"#4285F4\" opacity=\"0.12\"/><circle cx=\"56\" cy=\"56\" r=\"22\" stroke=\"#4285F4\" stroke-width=\"8\" fill=\"none\"/><path d=\"M72 72 L100 100\" stroke=\"#4285F4\" stroke-width=\"10\" stroke-linecap=\"round\"/><circle cx=\"56\" cy=\"56\" r=\"10\" fill=\"#34A853\"/><path d=\"M76 34 L88 22 M88 34 L76 22\" stroke=\"#EA4335\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"34\" cy=\"38\" r=\"4\" fill=\"#FBBC05\"/></svg>",
  "GOOGLE ADS": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M38 78 L68 26 C72 19 81 17 88 21 C95 25 97 34 93 41 L63 93 C59 100 50 102 43 98 C36 94 34 85 38 78 Z\" fill=\"#FBBC04\"/><path d=\"M38 78 C34 85 36 94 43 98 C50 102 59 100 63 93 L63 93 C59 86 61 77 68 73 L68 73 C61 69 52 71 48 78 Z\" fill=\"#4285F4\"/><circle cx=\"38\" cy=\"88\" r=\"14\" fill=\"#4285F4\"/><path d=\"M63 93 C67 86 76 84 83 88 C90 92 92 101 88 108 C84 115 75 117 68 113 C61 109 59 100 63 93 Z\" fill=\"#34A853\"/><circle cx=\"76\" cy=\"100\" r=\"14\" fill=\"#EA4335\"/></svg>",
  "META ADS": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M22 64 C22 46 34 34 48 34 C58 34 66 42 72 52 C78 42 86 34 96 34 C110 34 122 46 122 64 C122 82 110 94 96 94 C86 94 78 86 72 76 C66 86 58 94 48 94 C34 94 22 82 22 64 Z\" stroke=\"#0081FB\" stroke-width=\"12\" stroke-linejoin=\"round\" fill=\"none\"/></svg>",
  "SEMRUSH": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M64 14 C64 14 76 38 88 44 C100 50 124 50 124 50 C124 50 104 64 100 76 C96 88 104 114 104 114 C104 114 82 100 70 100 C58 100 36 114 36 114 C36 114 44 88 40 76 C36 64 16 50 16 50 C16 50 40 50 52 44 C64 38 64 14 64 14 Z\" fill=\"#FF642D\"/><path d=\"M64 36 C64 36 72 52 80 56 C88 60 104 60 104 60 C104 60 90 70 88 78 C86 86 92 102 92 102 C92 102 76 92 68 92 C60 92 44 102 44 102 C44 102 50 86 48 78 C46 70 32 60 32 60 C32 60 48 60 56 56 C64 52 64 36 64 36 Z\" fill=\"#FFFFFF\"/><circle cx=\"64\" cy=\"68\" r=\"10\" fill=\"#00142D\"/></svg>",
  "AHREFS": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M28 88 L58 24 C60 20 66 20 68 24 L98 88 C100 92 96 98 90 98 H80 C76 98 72 94 70 90 L64 74 H46 L44 80 C42 86 38 90 32 90 H28 C22 90 20 84 24 80 Z\" fill=\"#0055FF\"/><path d=\"M72 40 L96 88 C98 92 94 98 88 98 H78 L60 58 Z\" fill=\"#FF5500\"/><path d=\"M52 58 H68 L60 38 Z\" fill=\"#FFFFFF\"/></svg>",
  "HUBSPOT": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><circle cx=\"64\" cy=\"64\" r=\"22\" stroke=\"#FF7A59\" stroke-width=\"12\" fill=\"none\"/><circle cx=\"64\" cy=\"64\" r=\"10\" fill=\"#33475B\"/><line x1=\"64\" y1=\"42\" x2=\"64\" y2=\"18\" stroke=\"#FF7A59\" stroke-width=\"10\" stroke-linecap=\"round\"/><circle cx=\"64\" cy=\"18\" r=\"8\" fill=\"#FF7A59\"/><line x1=\"82\" y1=\"54\" x2=\"102\" y2=\"42\" stroke=\"#FF7A59\" stroke-width=\"10\" stroke-linecap=\"round\"/><circle cx=\"104\" cy=\"40\" r=\"8\" fill=\"#FF7A59\"/><line x1=\"82\" y1=\"74\" x2=\"102\" y2=\"86\" stroke=\"#FF7A59\" stroke-width=\"10\" stroke-linecap=\"round\"/><circle cx=\"104\" cy=\"88\" r=\"8\" fill=\"#FF7A59\"/></svg>",
  "HOTJAR": "<svg viewBox=\"0 0 128 128\" fill=\"none\" style=\"object-fit:contain;\"><path d=\"M44 32 C44 24 54 18 60 28 C64 34 68 44 68 54 C68 70 54 84 54 98 C54 104 50 110 44 106 C38 102 36 94 36 86 C36 68 44 52 44 32 Z\" fill=\"#FD3A5C\"/><path d=\"M84 48 C84 40 74 34 68 44 C64 50 60 60 60 70 C60 86 74 100 74 114 C74 120 78 126 84 122 C90 118 92 110 92 102 C92 84 84 68 84 48 Z\" fill=\"#FD3A5C\" opacity=\"0.9\"/><path d=\"M44 66 H84\" stroke=\"#FD3A5C\" stroke-width=\"10\" stroke-linecap=\"round\"/></svg>"
};

export const SVCS: Record<ServiceId, ServiceDetail> = {
  "software-development": {
    "num": "01",
    "announcement": "Building reliable software around real business requirements.",
    "name": "Software Development",
    "tagline": "Reliable Software Built Around Your Business",
    "intro": "We design and develop secure scalable software solutions tailored to real business requirements. Our approach combines thoughtful architecture clean development practices and long-term maintainability to create software that remains dependable as your operations evolve.",
    "subHeadings": {
      "services": "Software Development Services",
      "servicesDesc": "From initial planning to ongoing improvement we provide practical software development services for modern businesses.",
      "benefits": "Benefits of Custom Software Development",
      "benefitsDesc": "Well-planned custom software gives businesses greater control flexibility and long-term operational value.",
      "process": "Our Software Development Process",
      "processDesc": "A structured and collaborative process keeps development focused transparent and aligned with project requirements.",
      "results": "Results",
      "resultsDesc": "The final outcome depends on project requirements but a properly developed software solution should provide clear and sustainable operational value."
    },
    "cta": {
      "heading": "Have a Software Project in Mind?",
      "desc": "Share your requirements with our team and explore a practical development approach for your business.",
      "btn": "Start Your Project"
    },
    "overview": [
      {
        "title": "Business-Focused Solutions",
        "desc": "Software designed around your workflows operational needs and long-term objectives.",
        "badge": "CUSTOM"
      },
      {
        "title": "Secure by Design",
        "desc": "Authentication data protection access control and secure coding practices built into every development stage.",
        "badge": "SECURE"
      },
      {
        "title": "Growth-Ready Architecture",
        "desc": "Flexible systems structured to support new features users integrations and changing business demands.",
        "badge": "SCALABLE"
      },
      {
        "title": "Clean and Sustainable Code",
        "desc": "Well-structured documented code that remains easier to test improve and support over time.",
        "badge": "MAINTAINABLE"
      }
    ],
    "servicesList": [
      {
        "title": "Custom Software Development",
        "desc": "Purpose-built applications aligned with specific business processes and operational requirements."
      },
      {
        "title": "Enterprise Application Development",
        "desc": "Reliable applications designed to support complex workflows teams permissions and business operations."
      },
      {
        "title": "API Development and Integration",
        "desc": "Secure APIs and third-party integrations that connect applications platforms and business data."
      },
      {
        "title": "Software Modernization",
        "desc": "Improvement of existing systems through code upgrades architecture refinement and modern technologies."
      },
      {
        "title": "Backend Development",
        "desc": "Secure and maintainable server-side systems for business logic data processing and application services."
      },
      {
        "title": "Quality Assurance and Testing",
        "desc": "Functional integration performance and security testing to improve software reliability before release."
      }
    ],
    "benefitCards": [
      {
        "title": "Better Business Alignment",
        "desc": "Features and workflows are developed around actual business requirements instead of generic limitations."
      },
      {
        "title": "Greater Flexibility",
        "desc": "The software can be extended and adapted as priorities processes and customer needs change."
      },
      {
        "title": "Improved Efficiency",
        "desc": "Connected workflows and automation can reduce repetitive work and simplify daily operations."
      },
      {
        "title": "Stronger Data Control",
        "desc": "Businesses maintain clearer control over application access integrations and information management."
      },
      {
        "title": "Easier Integration",
        "desc": "Custom systems can connect with existing tools databases APIs and third-party platforms."
      },
      {
        "title": "Long-Term Maintainability",
        "desc": "Clean architecture and documentation make future updates troubleshooting and improvements more manageable."
      }
    ],
    "process": [
      {
        "step": "01",
        "title": "Discovery and Requirements",
        "desc": "We identify business goals users workflows technical requirements and project priorities."
      },
      {
        "step": "02",
        "title": "Planning and Architecture",
        "desc": "We define the solution structure technology approach development stages and delivery roadmap."
      },
      {
        "step": "03",
        "title": "UI and Development",
        "desc": "The approved experience and core functionality are developed using maintainable coding practices."
      },
      {
        "step": "04",
        "title": "Testing and Quality Review",
        "desc": "The software is reviewed for functionality usability integration security and overall reliability."
      },
      {
        "step": "05",
        "title": "Deployment",
        "desc": "The tested application is prepared and released to the required hosting or production environment."
      },
      {
        "step": "06",
        "title": "Support and Improvement",
        "desc": "After launch the software can be monitored maintained and enhanced according to evolving requirements."
      }
    ],
    "resultCards": [
      {
        "title": "Reliable Software",
        "desc": "A stable application designed to perform its intended business functions consistently."
      },
      {
        "title": "Streamlined Workflows",
        "desc": "Clearer connected processes that help teams manage work more efficiently."
      },
      {
        "title": "Scalable Foundation",
        "desc": "An architecture that supports future functionality integrations and business growth."
      },
      {
        "title": "Secure Access",
        "desc": "Structured authentication authorization and data-handling controls suited to the application."
      },
      {
        "title": "Easier Maintenance",
        "desc": "Organized code documentation and testing that simplify future updates and technical support."
      },
      {
        "title": "Better User Experience",
        "desc": "A clear responsive and practical interface for the people using the software."
      }
    ],
    "techStack": [
      "Java",
      "C#",
      "Python",
      "C++",
      "TypeScript",
      ".NET",
      "Spring Boot",
      "Git"
    ]
  },
  "ui-ux-design": {
    "num": "02",
    "announcement": "Designing clear and intuitive digital experiences for users.",
    "name": "UI/UX Design",
    "tagline": "Clear and User-Centered Digital Experiences",
    "intro": "We design practical and intuitive digital experiences that connect user needs with business objectives. Our process combines research information architecture interface design and usability thinking to create products that are clear consistent and easy to use.",
    "subHeadings": {
      "services": "UI/UX Design Services",
      "servicesDesc": "We provide complete design support from early product planning to detailed interfaces and reusable design systems.",
      "benefits": "Benefits of Professional UI/UX Design",
      "benefitsDesc": "Thoughtful UI/UX design makes digital products easier to understand use maintain and improve.",
      "process": "Our UI/UX Design Process",
      "processDesc": "A structured design process helps transform business requirements and user needs into a clear digital experience.",
      "results": "Results",
      "resultsDesc": "The final design outcome depends on product requirements but a well-planned UI/UX process should provide a clear consistent and development-ready experience."
    },
    "cta": {
      "heading": "Planning a Better Digital Experience?",
      "desc": "Share your product requirements with our team and explore a practical user-centered design approach.",
      "btn": "Start Your Project"
    },
    "overview": [
      {
        "title": "User-Centered Design",
        "desc": "Interfaces designed around real user needs behaviors goals and common interaction patterns.",
        "badge": "INTUITIVE"
      },
      {
        "title": "Unified Visual Experience",
        "desc": "Consistent typography colors components and interactions across the complete digital product.",
        "badge": "CONSISTENT"
      },
      {
        "title": "Multi-Device Design",
        "desc": "Flexible experiences designed to remain clear and usable across desktop tablet and mobile screens.",
        "badge": "RESPONSIVE"
      },
      {
        "title": "Inclusive Interaction",
        "desc": "Readable understandable interfaces designed with accessibility and diverse user needs in mind.",
        "badge": "ACCESSIBLE"
      }
    ],
    "servicesList": [
      {
        "title": "User Experience Research",
        "desc": "Understanding user needs behaviors challenges and expectations to guide informed design decisions."
      },
      {
        "title": "Information Architecture",
        "desc": "Organizing content navigation and product structure so users can find information and complete tasks easily."
      },
      {
        "title": "Wireframing",
        "desc": "Creating clear low-fidelity layouts to define screen structure content hierarchy and user interactions."
      },
      {
        "title": "User Interface Design",
        "desc": "Designing polished interfaces with consistent typography colors spacing components and visual hierarchy."
      },
      {
        "title": "Interactive Prototyping",
        "desc": "Building clickable prototypes to demonstrate important flows interactions and product behavior before development."
      },
      {
        "title": "Design Systems",
        "desc": "Creating reusable components patterns and guidelines that improve consistency and support future product growth."
      }
    ],
    "benefitCards": [
      {
        "title": "Clearer User Journeys",
        "desc": "Logical navigation and structured flows help users complete important tasks with less confusion."
      },
      {
        "title": "Better Usability",
        "desc": "Readable content familiar patterns and clear actions make the product easier to operate."
      },
      {
        "title": "Stronger Consistency",
        "desc": "Shared components and visual rules create a unified experience across pages screens and devices."
      },
      {
        "title": "Reduced Development Rework",
        "desc": "Wireframes and prototypes help identify design issues before significant development work begins."
      },
      {
        "title": "Improved Accessibility",
        "desc": "Inclusive design choices make digital experiences more usable for people with different needs."
      },
      {
        "title": "Scalable Product Design",
        "desc": "Reusable patterns and design systems make new features and screens easier to create consistently."
      }
    ],
    "process": [
      {
        "step": "01",
        "title": "Discovery",
        "desc": "We review business goals product requirements intended users existing content and technical constraints."
      },
      {
        "step": "02",
        "title": "User and Product Research",
        "desc": "We study user needs common tasks pain points expectations and relevant product patterns."
      },
      {
        "step": "03",
        "title": "Information Architecture",
        "desc": "We organize content navigation page relationships and key user journeys."
      },
      {
        "step": "04",
        "title": "Wireframing",
        "desc": "We create structured layouts that define hierarchy functionality and interaction flow."
      },
      {
        "step": "05",
        "title": "Visual Design and Prototyping",
        "desc": "We apply the visual direction build interface components and create interactive prototypes."
      },
      {
        "step": "06",
        "title": "Review and Design Handoff",
        "desc": "We refine the approved designs prepare specifications and provide organized assets for development."
      }
    ],
    "resultCards": [
      {
        "title": "Clear Product Structure",
        "desc": "Organized content navigation and screen relationships that are easier for users to understand."
      },
      {
        "title": "Intuitive Interactions",
        "desc": "Familiar patterns and visible actions that support smooth task completion."
      },
      {
        "title": "Consistent Interface",
        "desc": "A unified visual language across components screens and important user journeys."
      },
      {
        "title": "Responsive Experience",
        "desc": "Layouts prepared to work effectively across common screen sizes and devices."
      },
      {
        "title": "Development-Ready Designs",
        "desc": "Organized screens components assets and specifications that support accurate implementation."
      },
      {
        "title": "Maintainable Design System",
        "desc": "Reusable design foundations that make future product updates more consistent and manageable."
      }
    ],
    "techStack": [
      "Figma",
      "FigJam",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Framer",
      "Maze",
      "Miro",
      "Zeplin"
    ]
  },
  "mobile-application": {
    "num": "03",
    "announcement": "Creating reliable mobile experiences for iOS and Android.",
    "name": "Mobile Application",
    "tagline": "Reliable Mobile Experiences for Modern Users",
    "intro": "We design and develop secure responsive and maintainable mobile applications aligned with business requirements and user needs. Our approach covers product planning interface implementation application development integration testing and deployment preparation.",
    "subHeadings": {
      "services": "Mobile Application Services",
      "servicesDesc": "Comprehensive mobile engineering services from initial technical architecture to cross-platform deployment.",
      "benefits": "Benefits of Custom Mobile Applications",
      "benefitsDesc": "Purpose-built mobile applications provide direct engagement, offline reliability, and seamless user experiences.",
      "process": "Our Mobile Development Process",
      "processDesc": "A disciplined development process covering design, native implementation, device validation, and store release.",
      "results": "Results",
      "resultsDesc": "A stable, responsive mobile application ready for end users and long-term product iteration."
    },
    "cta": {
      "heading": "Planning a Mobile Application Project?",
      "desc": "Share your mobile app vision with our team and explore a practical development strategy for iOS and Android.",
      "btn": "Start Your Project"
    },
    "overview": [
      {
        "title": "Native & Cross-Platform",
        "desc": "Modern Swift, Kotlin, Flutter, and React Native solutions aligned with user expectations.",
        "badge": "FLEXIBLE"
      },
      {
        "title": "Offline Data Reliability",
        "desc": "Local storage patterns and synchronization strategies that keep applications functional in varying connectivity.",
        "badge": "RELIABLE"
      },
      {
        "title": "Device Security",
        "desc": "Secure authentication, encrypted local storage, and secure API communication practices.",
        "badge": "SECURE"
      },
      {
        "title": "Continuous Delivery",
        "desc": "Organized testing pipelines and release workflows for predictable staging and store updates.",
        "badge": "MAINTAINABLE"
      }
    ],
    "servicesList": [
      {
        "title": "iOS Application Development",
        "desc": "Native iOS engineering using modern Swift and Apple UI frameworks with strict platform guidelines."
      },
      {
        "title": "Android Application Development",
        "desc": "Native Android engineering using Kotlin and modern architecture components for diverse screen sizes."
      },
      {
        "title": "Cross-Platform Development",
        "desc": "Efficient Flutter and React Native implementations for unified codebases across iOS and Android."
      },
      {
        "title": "Offline Storage & Sync",
        "desc": "Structured local data handling and background synchronization mechanisms for dependable performance."
      },
      {
        "title": "API & Service Integration",
        "desc": "Clean API client implementations connecting mobile apps with backend services and cloud platforms."
      },
      {
        "title": "App Store Preparation & QA",
        "desc": "Thorough device testing, store guidelines review, and release configuration for Apple App Store and Google Play."
      }
    ],
    "benefitCards": [
      {
        "title": "Direct Customer Engagement",
        "desc": "Create a dedicated mobile touchpoint that strengthens connection with users and simplifies access to services."
      },
      {
        "title": "Platform Consistency",
        "desc": "Deliver familiar, intuitive interactions that follow platform design patterns for both iOS and Android."
      },
      {
        "title": "Dependable Operation",
        "desc": "Responsive interfaces and smart data caching that provide a consistent user experience."
      },
      {
        "title": "Seamless Backend Connection",
        "desc": "Integrate smoothly with existing APIs, identity providers, databases, and third-party tools."
      },
      {
        "title": "Structured Codebase",
        "desc": "Maintainable architectures that allow easy updates, new feature releases, and version upgrades."
      },
      {
        "title": "Clear Release Path",
        "desc": "Organized build and testing workflows that make store submissions and updates predictable."
      }
    ],
    "process": [
      {
        "step": "01",
        "title": "Requirements & Planning",
        "desc": "We define target platforms, key user flows, architecture approach, and project milestones."
      },
      {
        "step": "02",
        "title": "UI & Architecture Setup",
        "desc": "We establish interface layouts, design components, local data schemas, and API contracts."
      },
      {
        "step": "03",
        "title": "Application Development",
        "desc": "We develop core features, business logic, user interactions, and service integrations."
      },
      {
        "step": "04",
        "title": "Multi-Device Testing",
        "desc": "We test functionality, screen adaptability, offline behavior, and overall application stability."
      },
      {
        "step": "05",
        "title": "Store Preparation & Release",
        "desc": "We configure signing certificates, prepare store assets, and submit for review."
      },
      {
        "step": "06",
        "title": "Maintenance & Updates",
        "desc": "We provide post-launch monitoring, dependency updates, and feature enhancements as requirements evolve."
      }
    ],
    "resultCards": [
      {
        "title": "Stable Mobile App",
        "desc": "A dependable mobile application built to perform reliably across targeted iOS and Android devices."
      },
      {
        "title": "Responsive Interface",
        "desc": "A smooth, intuitive user experience designed for touch interactions and multiple screen sizes."
      },
      {
        "title": "Connected Architecture",
        "desc": "Seamless integration with your backend systems, authentication rails, and third-party services."
      },
      {
        "title": "Secure Data Handling",
        "desc": "Structured access controls, secure session management, and encrypted data storage."
      },
      {
        "title": "Store-Ready Build",
        "desc": "A fully tested build meeting platform guidelines and prepared for deployment."
      },
      {
        "title": "Maintainable Codebase",
        "desc": "Clean modular code and documentation that simplify long-term updates and maintenance."
      }
    ],
    "techStack": [
      "Swift",
      "SwiftUI",
      "Kotlin",
      "Jetpack Compose",
      "Java",
      "Dart",
      "Flutter",
      "React Native"
    ]
  },
  "cloud-infrastructure": {
    "num": "04",
    "announcement": "Building secure and scalable foundations for modern applications.",
    "name": "Cloud Infrastructure",
    "tagline": "Secure and Scalable Cloud Foundations",
    "intro": "We plan build and improve cloud environments that support reliable application delivery business operations and future growth. Our approach covers infrastructure design deployment automation security monitoring backup planning and ongoing optimization.",
    "subHeadings": {
      "services": "Cloud Infrastructure Services",
      "servicesDesc": "We provide practical cloud infrastructure services covering planning deployment automation security monitoring and continuous improvement.",
      "benefits": "Benefits of Cloud Infrastructure",
      "benefitsDesc": "A well-structured cloud environment can provide greater flexibility operational visibility and control over modern applications and services.",
      "process": "Our Cloud Infrastructure Process",
      "processDesc": "A structured infrastructure process helps align cloud architecture security operations and costs with actual business requirements.",
      "results": "Results",
      "resultsDesc": "The final outcome depends on infrastructure requirements but a properly planned cloud environment should provide a manageable secure and growth-ready operational foundation."
    },
    "cta": {
      "heading": "Planning Your Cloud Infrastructure?",
      "desc": "Share your infrastructure requirements with our team and explore a practical cloud architecture and deployment approach.",
      "btn": "Start Your Project"
    },
    "overview": [
      {
        "title": "Flexible Cloud Architecture",
        "desc": "Infrastructure structured to support changing workloads new services and evolving operational requirements.",
        "badge": "SCALABLE"
      },
      {
        "title": "Controlled Cloud Access",
        "desc": "Identity permissions network controls and secure configuration practices applied across the environment.",
        "badge": "SECURE"
      },
      {
        "title": "Repeatable Deployment",
        "desc": "Automated infrastructure and delivery workflows that improve consistency and reduce manual configuration.",
        "badge": "AUTOMATED"
      },
      {
        "title": "Operational Continuity",
        "desc": "Backup recovery monitoring and availability planning designed around business and application needs.",
        "badge": "RESILIENT"
      }
    ],
    "servicesList": [
      {
        "title": "Cloud Architecture",
        "desc": "Planning cloud resources network structure access controls and service relationships around application requirements."
      },
      {
        "title": "Cloud Migration",
        "desc": "Moving applications services and data to an appropriate cloud environment through a structured migration approach."
      },
      {
        "title": "Infrastructure as Code",
        "desc": "Managing infrastructure through version-controlled configuration for repeatable deployment and easier maintenance."
      },
      {
        "title": "Container Infrastructure",
        "desc": "Preparing container-based environments for consistent application packaging deployment and operational management."
      },
      {
        "title": "CI/CD Enablement",
        "desc": "Creating automated build testing and deployment workflows that support reliable software delivery."
      },
      {
        "title": "Monitoring and Backup",
        "desc": "Implementing system visibility alerting backup routines and recovery procedures according to operational needs."
      }
    ],
    "benefitCards": [
      {
        "title": "Flexible Resource Management",
        "desc": "Infrastructure resources can be adjusted according to application workloads operational needs and planned growth."
      },
      {
        "title": "Consistent Environments",
        "desc": "Automated configuration reduces differences between development testing and production environments."
      },
      {
        "title": "Improved Deployment Control",
        "desc": "Structured delivery workflows make application releases more repeatable visible and manageable."
      },
      {
        "title": "Stronger Access Management",
        "desc": "Defined identities permissions and policies provide clearer control over cloud resources."
      },
      {
        "title": "Better Operational Visibility",
        "desc": "Monitoring logging and alerts help teams understand infrastructure conditions and respond to issues."
      },
      {
        "title": "Recovery Preparedness",
        "desc": "Documented backup and recovery procedures support service restoration following eligible failures or data loss."
      }
    ],
    "process": [
      {
        "step": "01",
        "title": "Infrastructure Assessment",
        "desc": "We review existing applications hosting resources dependencies workflows risks and operational requirements."
      },
      {
        "step": "02",
        "title": "Architecture Planning",
        "desc": "We define the cloud structure networking access model services environments and deployment approach."
      },
      {
        "step": "03",
        "title": "Infrastructure Configuration",
        "desc": "We provision and configure the required cloud resources using documented and repeatable practices."
      },
      {
        "step": "04",
        "title": "Security and Automation",
        "desc": "We apply permissions network controls secret handling infrastructure automation and delivery workflows."
      },
      {
        "step": "05",
        "title": "Testing and Validation",
        "desc": "We validate deployments connectivity access backup procedures monitoring and important operational scenarios."
      },
      {
        "step": "06",
        "title": "Monitoring and Improvement",
        "desc": "We review infrastructure usage reliability security configuration and opportunities for ongoing optimization."
      }
    ],
    "resultCards": [
      {
        "title": "Structured Cloud Environment",
        "desc": "Clearly organized cloud resources networks services and environments aligned with application needs."
      },
      {
        "title": "Repeatable Deployments",
        "desc": "Documented and automated workflows that make infrastructure and application releases more consistent."
      },
      {
        "title": "Controlled Access",
        "desc": "Defined identities permissions and security boundaries for users systems and cloud resources."
      },
      {
        "title": "Operational Visibility",
        "desc": "Centralized monitoring logging and alerts that provide greater awareness of system conditions."
      },
      {
        "title": "Recovery Readiness",
        "desc": "Backup and recovery processes prepared around agreed application and data requirements."
      },
      {
        "title": "Scalable Foundation",
        "desc": "An infrastructure structure capable of supporting future services integrations and changing workloads."
      }
    ],
    "techStack": [
      "Amazon Web Services",
      "Microsoft Azure",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus"
    ]
  },
  "database-management": {
    "num": "05",
    "announcement": "Supporting reliable structured and maintainable business data systems.",
    "name": "Database Management",
    "tagline": "Reliable Data Systems for Business Applications",
    "intro": "We design configure maintain and improve database environments that support secure data storage dependable application access and evolving business requirements. Our approach covers database architecture migration performance monitoring backup planning access control and ongoing maintenance.",
    "subHeadings": {
      "services": "Database Management Services",
      "servicesDesc": "We provide practical database services covering architecture implementation migration administration monitoring security and ongoing improvement.",
      "benefits": "Benefits of Professional Database Management",
      "benefitsDesc": "Effective database management supports dependable applications clearer data control and more manageable business operations.",
      "process": "Our Database Management Process",
      "processDesc": "A structured process helps align database architecture security reliability and maintenance with application and business requirements.",
      "results": "Results",
      "resultsDesc": "The final outcome depends on database and application requirements but proper database management should provide a structured secure and maintainable data foundation."
    },
    "cta": {
      "heading": "Need a Reliable Database Foundation?",
      "desc": "Share your database requirements with our team and explore a practical approach to architecture migration performance and maintenance.",
      "btn": "Start Your Project"
    },
    "overview": [
      {
        "title": "Practical Data Architecture",
        "desc": "Database structures designed around application relationships workflows reporting needs and future development.",
        "badge": "STRUCTURED"
      },
      {
        "title": "Controlled Data Access",
        "desc": "Roles permissions encryption options and configuration practices that support responsible data access.",
        "badge": "SECURE"
      },
      {
        "title": "Data Availability Planning",
        "desc": "Backup recovery replication and maintenance processes prepared according to system requirements.",
        "badge": "RELIABLE"
      },
      {
        "title": "Efficient Data Operations",
        "desc": "Query indexing and configuration reviews that support consistent database operation and application access.",
        "badge": "OPTIMIZED"
      }
    ],
    "servicesList": [
      {
        "title": "Database Design",
        "desc": "Structuring tables relationships indexes constraints and data models around application and reporting requirements."
      },
      {
        "title": "Database Administration",
        "desc": "Managing database configuration users permissions routine maintenance updates and operational health."
      },
      {
        "title": "Database Migration",
        "desc": "Moving data between systems platforms or environments through a planned validation and transfer process."
      },
      {
        "title": "Performance Review",
        "desc": "Reviewing queries indexes schemas and database configuration to identify avoidable operational bottlenecks."
      },
      {
        "title": "Backup and Recovery Planning",
        "desc": "Preparing backup schedules retention rules restoration procedures and recovery documentation."
      },
      {
        "title": "Database Integration",
        "desc": "Connecting databases with applications APIs reporting tools and other authorized business systems."
      }
    ],
    "benefitCards": [
      {
        "title": "Organized Business Data",
        "desc": "Clear schemas relationships and validation rules provide a more consistent foundation for application data."
      },
      {
        "title": "Reliable Application Access",
        "desc": "Routine maintenance and monitoring help databases continue supporting required application operations."
      },
      {
        "title": "Stronger Access Control",
        "desc": "Defined users roles and permissions provide clearer control over who can access or change data."
      },
      {
        "title": "Better Query Efficiency",
        "desc": "Appropriate indexing query review and configuration can improve common data operations."
      },
      {
        "title": "Recovery Preparedness",
        "desc": "Planned backups documented restoration steps and validation procedures support data recovery efforts."
      },
      {
        "title": "Easier Future Growth",
        "desc": "Maintainable database structures make new features integrations and reporting requirements easier to support."
      }
    ],
    "process": [
      {
        "step": "01",
        "title": "Requirements Assessment",
        "desc": "We review applications data relationships access needs workloads integrations and operational concerns."
      },
      {
        "step": "02",
        "title": "Database Planning",
        "desc": "We define the data model platform structure permissions backup requirements and maintenance approach."
      },
      {
        "step": "03",
        "title": "Configuration or Migration",
        "desc": "We create configure improve or migrate the database environment according to the approved plan."
      },
      {
        "step": "04",
        "title": "Security and Data Controls",
        "desc": "We apply roles permissions validation secure connection settings and suitable data protection measures."
      },
      {
        "step": "05",
        "title": "Testing and Validation",
        "desc": "We test data integrity queries application connectivity backups restoration steps and important workflows."
      },
      {
        "step": "06",
        "title": "Monitoring and Maintenance",
        "desc": "We review database health storage queries backups logs and maintenance needs on an ongoing basis."
      }
    ],
    "resultCards": [
      {
        "title": "Structured Data Environment",
        "desc": "A clear database structure aligned with application workflows relationships and reporting requirements."
      },
      {
        "title": "Controlled Data Access",
        "desc": "Documented roles permissions and secure connection practices for authorized systems and users."
      },
      {
        "title": "Improved Data Integrity",
        "desc": "Constraints validation rules and reviewed migration procedures that support more consistent stored information."
      },
      {
        "title": "Better Operational Visibility",
        "desc": "Monitoring logs and health checks that provide clearer insight into database conditions."
      },
      {
        "title": "Recovery Readiness",
        "desc": "Verified backups restoration procedures and documentation prepared around agreed recovery requirements."
      },
      {
        "title": "Maintainable Foundation",
        "desc": "Organized schemas indexes configuration and documentation that support future changes and technical maintenance."
      }
    ],
    "techStack": [
      "PostgreSQL",
      "MySQL",
      "Microsoft SQL Server",
      "Oracle Database",
      "MongoDB",
      "Redis",
      "MariaDB",
      "SQLite"
    ]
  },
  "web-development": {
    "num": "06",
    "announcement": "Developing responsive and maintainable websites for modern businesses.",
    "name": "Web Development",
    "tagline": "Modern Websites Built for Real Business Needs",
    "intro": "We design and develop responsive secure and maintainable websites aligned with business goals content requirements and user expectations. Our approach combines clear structure modern development practices reliable integrations and long-term maintainability.",
    "subHeadings": {
      "services": "Web Development Services",
      "servicesDesc": "We provide complete web development support from planning and implementation to integration testing deployment and continued improvement.",
      "benefits": "Benefits of Professional Web Development",
      "benefitsDesc": "A well-developed website provides a reliable digital foundation for presenting information delivering services and supporting business operations.",
      "process": "Our Web Development Process",
      "processDesc": "A structured process keeps website design content functionality and technical implementation aligned with project requirements.",
      "results": "Results",
      "resultsDesc": "The final outcome depends on project requirements but a properly developed website should provide a clear dependable and maintainable digital experience."
    },
    "cta": {
      "heading": "Planning a New Website?",
      "desc": "Share your website requirements with our team and explore a practical approach to design development integrations and long-term maintenance.",
      "btn": "Start Your Project"
    },
    "overview": [
      {
        "title": "Multi-Device Experience",
        "desc": "Flexible layouts designed to remain clear and functional across desktop tablet and mobile screens.",
        "badge": "RESPONSIVE"
      },
      {
        "title": "Clean Development Structure",
        "desc": "Organized components and documented code that support future updates features and maintenance.",
        "badge": "MAINTAINABLE"
      },
      {
        "title": "Business Integrations",
        "desc": "Secure connections with content systems APIs databases payments and authorized third-party services.",
        "badge": "CONNECTED"
      },
      {
        "title": "Inclusive Web Experience",
        "desc": "Clear navigation readable content and practical interactions designed for a wider range of users.",
        "badge": "ACCESSIBLE"
      }
    ],
    "servicesList": [
      {
        "title": "Business Website Development",
        "desc": "Professional websites created around company services content goals and customer requirements."
      },
      {
        "title": "Web Application Development",
        "desc": "Interactive browser-based applications built for business workflows user accounts data and online services."
      },
      {
        "title": "E-Commerce Development",
        "desc": "Online shopping experiences with product management checkout payments orders and customer account functionality."
      },
      {
        "title": "Content Management Systems",
        "desc": "Flexible content platforms that allow authorized teams to manage pages articles media and website information."
      },
      {
        "title": "API and Third-Party Integration",
        "desc": "Connections with payment services CRMs analytics tools external platforms and custom business systems."
      },
      {
        "title": "Website Modernization",
        "desc": "Improvement of existing websites through interface updates code refinement responsive layouts and technical upgrades."
      }
    ],
    "benefitCards": [
      {
        "title": "Consistent User Experience",
        "desc": "Responsive layouts and structured navigation provide a clear experience across supported devices."
      },
      {
        "title": "Stronger Business Presence",
        "desc": "A professional website communicates services values and important business information more effectively."
      },
      {
        "title": "Flexible Content Management",
        "desc": "Suitable management tools allow authorized teams to update website content without unnecessary development work."
      },
      {
        "title": "Connected Digital Operations",
        "desc": "Integrations can connect the website with payments databases APIs analytics and internal business tools."
      },
      {
        "title": "Future Development Support",
        "desc": "Maintainable architecture makes additional pages features and integrations easier to introduce."
      },
      {
        "title": "Improved Accessibility",
        "desc": "Readable content keyboard support clear interactions and semantic structure make the website more inclusive."
      }
    ],
    "process": [
      {
        "step": "01",
        "title": "Discovery and Requirements",
        "desc": "We review business goals intended users content needs required features integrations and technical constraints."
      },
      {
        "step": "02",
        "title": "Structure and Planning",
        "desc": "We define the sitemap page hierarchy user journeys technical architecture and delivery priorities."
      },
      {
        "step": "03",
        "title": "Interface and Development",
        "desc": "We implement approved responsive interfaces components functionality and content structures."
      },
      {
        "step": "04",
        "title": "Integration",
        "desc": "We connect the required CMS APIs databases payment systems analytics and authorized third-party services."
      },
      {
        "step": "05",
        "title": "Testing and Quality Review",
        "desc": "We review functionality responsiveness accessibility forms integrations browsers and important user journeys."
      },
      {
        "step": "06",
        "title": "Deployment and Support",
        "desc": "We prepare the website for production release and provide maintenance updates and future improvements when required."
      }
    ],
    "resultCards": [
      {
        "title": "Responsive Website",
        "desc": "A website structured to remain usable and visually consistent across supported screen sizes."
      },
      {
        "title": "Clear Content Structure",
        "desc": "Organized pages navigation and information hierarchy that help visitors find relevant content."
      },
      {
        "title": "Reliable Functionality",
        "desc": "Forms integrations accounts and interactive features implemented according to approved requirements."
      },
      {
        "title": "Maintainable Codebase",
        "desc": "Organized components documentation and development practices that support future updates."
      },
      {
        "title": "Connected Services",
        "desc": "Secure integration with the required content platforms APIs databases and business tools."
      },
      {
        "title": "Deployment-Ready Product",
        "desc": "A reviewed website prepared for the selected production hosting environment."
      }
    ],
    "techStack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "WordPress"
    ]
  },
  "ai-automation": {
    "num": "07",
    "announcement": "Applying practical AI and automation to defined business workflows.",
    "name": "AI & Automation",
    "tagline": "Practical Intelligence for Everyday Business Workflows",
    "intro": "We develop AI-assisted tools and workflow automation solutions around defined business requirements. Our approach combines suitable models structured data system integrations validation controls and human oversight to support dependable and responsible use.",
    "subHeadings": {
      "services": "AI & Automation Services",
      "servicesDesc": "We provide practical AI and automation services for information access content processing customer support and connected business workflows.",
      "benefits": "Benefits of AI and Automation",
      "benefitsDesc": "Well-planned AI and automation can support teams by simplifying repetitive work improving information access and connecting business processes.",
      "process": "Our AI & Automation Process",
      "processDesc": "A structured process helps determine where AI is useful how it should be controlled and how the final solution will connect with existing operations.",
      "results": "Results",
      "resultsDesc": "AI outcomes depend on the selected use case data model and controls but a properly designed solution should provide practical and manageable workflow support."
    },
    "cta": {
      "heading": "Exploring AI for Your Business?",
      "desc": "Share your workflow or automation requirements with our team and explore a practical responsible approach to AI implementation.",
      "btn": "Start Your Project"
    },
    "overview": [
      {
        "title": "Business-Focused AI",
        "desc": "AI capabilities selected around real workflows user needs available data and measurable operational objectives.",
        "badge": "PRACTICAL"
      },
      {
        "title": "Integrated Automation",
        "desc": "Automated workflows connected with approved applications APIs databases and communication systems.",
        "badge": "CONNECTED"
      },
      {
        "title": "Human-Guided Decisions",
        "desc": "Review steps permissions and escalation paths included where human judgment remains necessary.",
        "badge": "CONTROLLED"
      },
      {
        "title": "Flexible AI Foundation",
        "desc": "Modular solutions structured to support changing models data sources processes and business requirements.",
        "badge": "ADAPTABLE"
      }
    ],
    "servicesList": [
      {
        "title": "AI Assistants",
        "desc": "Task-focused assistants that help users find information prepare responses and interact with approved business systems."
      },
      {
        "title": "Knowledge-Based Chatbots",
        "desc": "Conversational tools that retrieve answers from selected documents databases and authorized knowledge sources."
      },
      {
        "title": "Workflow Automation",
        "desc": "Automated multi-step processes that move information trigger actions and reduce repetitive manual handling."
      },
      {
        "title": "Document Processing",
        "desc": "AI-assisted extraction classification summarization and organization of information from supported business documents."
      },
      {
        "title": "AI System Integration",
        "desc": "Integration of suitable AI models and services with existing websites applications APIs and internal platforms."
      },
      {
        "title": "Custom AI Applications",
        "desc": "Purpose-built applications that combine AI capabilities structured workflows business rules and human review."
      }
    ],
    "benefitCards": [
      {
        "title": "Reduced Repetitive Work",
        "desc": "Defined routine activities can be automated so teams can focus on work requiring judgment and responsibility."
      },
      {
        "title": "Faster Information Access",
        "desc": "Knowledge tools can help authorized users locate relevant information from approved sources more efficiently."
      },
      {
        "title": "Consistent Workflows",
        "desc": "Structured rules and automation help routine processes follow clearer and more repeatable steps."
      },
      {
        "title": "Connected Business Tools",
        "desc": "AI workflows can exchange information with existing applications databases APIs and communication systems."
      },
      {
        "title": "Better Process Visibility",
        "desc": "Logs statuses and review stages provide clearer insight into automated actions and workflow progress."
      },
      {
        "title": "Flexible Improvement",
        "desc": "Modular automation can be adjusted as processes tools data sources and business requirements change."
      }
    ],
    "process": [
      {
        "step": "01",
        "title": "Use-Case Discovery",
        "desc": "We identify the workflow users objectives available data limitations risks and decisions requiring human oversight."
      },
      {
        "step": "02",
        "title": "Feasibility and Planning",
        "desc": "We evaluate suitable models integrations security requirements validation methods and expected operational value."
      },
      {
        "step": "03",
        "title": "Data and Workflow Preparation",
        "desc": "We organize approved data sources process rules permissions actions and required system connections."
      },
      {
        "step": "04",
        "title": "Development and Integration",
        "desc": "We build the AI-assisted functionality automation logic interfaces APIs and connected workflow steps."
      },
      {
        "step": "05",
        "title": "Testing and Validation",
        "desc": "We test outputs failure cases permissions data handling integrations and human review requirements."
      },
      {
        "step": "06",
        "title": "Deployment and Monitoring",
        "desc": "We release the approved solution and monitor usage errors outputs workflow conditions and improvement opportunities."
      }
    ],
    "resultCards": [
      {
        "title": "Workflow Assistance",
        "desc": "AI-supported functionality aligned with specific tasks information needs and approved business processes."
      },
      {
        "title": "Connected Automation",
        "desc": "Structured workflows that exchange information and trigger approved actions across integrated systems."
      },
      {
        "title": "Human Review Controls",
        "desc": "Clear approval escalation and exception-handling steps for tasks requiring human judgment."
      },
      {
        "title": "Traceable Operations",
        "desc": "Logs statuses and workflow records that support monitoring troubleshooting and responsible use."
      },
      {
        "title": "Adaptable Architecture",
        "desc": "A modular foundation that can support future model workflow integration and data-source changes."
      },
      {
        "title": "Documented Solution",
        "desc": "Defined system behavior integrations limitations operating procedures and maintenance requirements."
      }
    ],
    "techStack": [
      "OpenAI",
      "Google Gemini",
      "Anthropic Claude",
      "Python",
      "LangChain",
      "Hugging Face",
      "n8n",
      "Microsoft Power Automate"
    ]
  },
  "digital-growth": {
    "num": "08",
    "announcement": "Connecting digital channels with clear business growth objectives.",
    "name": "Digital Growth",
    "tagline": "Connected Strategies for Sustainable Online Growth",
    "intro": "We plan and support digital growth initiatives across search content analytics conversion and customer acquisition. Our approach combines business objectives audience needs reliable data and continuous improvement to strengthen digital visibility and user journeys.",
    "subHeadings": {
      "services": "Digital Growth Services",
      "servicesDesc": "We provide practical digital growth services covering online visibility content acquisition analytics and website conversion improvement.",
      "benefits": "Benefits of Digital Growth",
      "benefitsDesc": "A connected digital growth strategy helps businesses improve visibility understand audience behavior and make more informed marketing decisions.",
      "process": "Our Digital Growth Process",
      "processDesc": "A structured process keeps digital activity aligned with business goals audience needs platform requirements and available performance data.",
      "results": "Results",
      "resultsDesc": "Digital growth outcomes depend on the market audience competition budget and execution but a structured strategy should provide greater clarity and a stronger foundation for improvement."
    },
    "cta": {
      "heading": "Ready to Strengthen Your Digital Presence?",
      "desc": "Share your business goals with our team and explore a practical data-informed approach to digital growth.",
      "btn": "Start Your Project"
    },
    "overview": [
      {
        "title": "Goal-Aligned Planning",
        "desc": "Digital activities organized around business priorities target audiences available resources and suitable channels.",
        "badge": "STRATEGIC"
      },
      {
        "title": "Measurable Decisions",
        "desc": "Analytics search data and user behavior insights used to guide planning evaluation and improvement.",
        "badge": "DATA-INFORMED"
      },
      {
        "title": "Unified Digital Channels",
        "desc": "Search content advertising email and website experiences coordinated around a consistent direction.",
        "badge": "CONNECTED"
      },
      {
        "title": "Continuous Improvement",
        "desc": "Campaigns content and user journeys reviewed and refined as performance and business needs evolve.",
        "badge": "ADAPTABLE"
      }
    ],
    "servicesList": [
      {
        "title": "Search Engine Optimization",
        "desc": "Improving website structure content relevance technical foundations and search visibility through responsible SEO practices."
      },
      {
        "title": "Content Strategy",
        "desc": "Planning useful audience-focused content around business expertise customer questions and relevant search topics."
      },
      {
        "title": "Paid Advertising",
        "desc": "Planning and managing targeted advertising campaigns across suitable search and social media platforms."
      },
      {
        "title": "Conversion Optimization",
        "desc": "Reviewing important pages forms calls to action and user journeys to identify practical experience improvements."
      },
      {
        "title": "Analytics and Reporting",
        "desc": "Configuring measurement reviewing channel activity and presenting useful insights for business decisions."
      },
      {
        "title": "Email and Customer Journeys",
        "desc": "Planning permission-based email communication and connected customer journeys for relevant audiences."
      }
    ],
    "benefitCards": [
      {
        "title": "Stronger Digital Visibility",
        "desc": "Relevant content technical improvements and suitable promotion help businesses strengthen their online presence."
      },
      {
        "title": "Clearer Audience Understanding",
        "desc": "Search analytics and engagement data provide insight into audience interests behavior and common needs."
      },
      {
        "title": "Connected Customer Journeys",
        "desc": "Coordinated channels create a clearer path from initial discovery to enquiry purchase or continued engagement."
      },
      {
        "title": "Better Measurement",
        "desc": "Defined events and reporting provide greater visibility into campaign activity website behavior and important actions."
      },
      {
        "title": "More Focused Marketing",
        "desc": "Business goals audience needs and channel data help prioritize suitable digital activities and resources."
      },
      {
        "title": "Continuous Improvement",
        "desc": "Regular reviews allow content campaigns and website journeys to evolve according to observed performance."
      }
    ],
    "process": [
      {
        "step": "01",
        "title": "Business and Audience Discovery",
        "desc": "We review business goals services intended audiences existing channels competitors and current digital presence."
      },
      {
        "step": "02",
        "title": "Digital Assessment",
        "desc": "We examine website structure search visibility content analytics customer journeys and active campaigns."
      },
      {
        "step": "03",
        "title": "Strategy and Planning",
        "desc": "We define suitable channels content priorities measurement requirements activities and review periods."
      },
      {
        "step": "04",
        "title": "Setup and Implementation",
        "desc": "We prepare content technical improvements campaign assets tracking and required channel configurations."
      },
      {
        "step": "05",
        "title": "Monitoring and Analysis",
        "desc": "We review campaign activity search performance user behavior important events and customer journey signals."
      },
      {
        "step": "06",
        "title": "Optimization and Reporting",
        "desc": "We document findings refine suitable activities and provide clear reporting for future decisions."
      }
    ],
    "resultCards": [
      {
        "title": "Clear Digital Direction",
        "desc": "A documented strategy connecting business objectives audiences channels content and measurement priorities."
      },
      {
        "title": "Improved Online Foundation",
        "desc": "A more organized website content structure tracking setup and channel presence."
      },
      {
        "title": "Better Performance Visibility",
        "desc": "Useful reports and measurement that provide clearer insight into digital activity and user behavior."
      },
      {
        "title": "Coordinated Channels",
        "desc": "Search content advertising email and website activities aligned around common business objectives."
      },
      {
        "title": "Refined User Journeys",
        "desc": "Clearer paths between discovery content service information and important website actions."
      },
      {
        "title": "Actionable Insights",
        "desc": "Practical observations that support future content campaign website and channel decisions."
      }
    ],
    "techStack": [
      "Google Analytics 4",
      "Google Search Console",
      "Google Ads",
      "Meta Ads",
      "SEMrush",
      "Ahrefs",
      "HubSpot",
      "Hotjar"
    ]
  }
};
