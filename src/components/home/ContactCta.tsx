import Link from "next/link";

export default function ContactCta() {
  return (
    <section className="w-full bg-[#0B1120] py-14 sm:py-16 lg:py-20 text-white overflow-hidden relative border-y border-[#1E293B]/60">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 75% 50%, rgba(255, 107, 0, 0.17) 0%, rgba(255, 107, 0, 0.05) 45%, rgba(11, 17, 32, 0) 70%)"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 z-10">
        
        {/* LEFT: 3D Communication Visual */}
        <div className="w-full lg:w-1/2 relative bg-[#131C31]/90 border border-[#1E293B] rounded-2xl h-72 sm:h-84 flex flex-col items-center justify-center overflow-hidden shadow-2xl group select-none">
          
          {/* Subtle Technical Grid Lines */}
          <div 
            className="absolute inset-0 opacity-[0.09] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />

          {/* Ambient Glows */}
          <div className="absolute w-56 h-56 bg-[#FF6B00]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute w-36 h-36 bg-[#0052FF]/15 rounded-full blur-2xl pointer-events-none translate-x-12 -translate-y-10" />

          {/* Premium 3D Communication & Contact Visual SVG */}
          <svg className="relative z-10 w-full h-full max-w-[380px] max-h-[260px] transition-transform duration-500 group-hover:scale-[1.02]" viewBox="0 0 380 260" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Soft 3D Drop Shadows */}
              <filter id="c3dBubbleShadow" x="-30%" y="-30%" width="160%" height="160%" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#FF6B00" floodOpacity="0.35"/>
                <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.5"/>
              </filter>
              <filter id="c3dNodeShadow" x="-30%" y="-30%" width="160%" height="160%" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.4"/>
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0052FF" floodOpacity="0.2"/>
              </filter>

              {/* Gradients */}
              <linearGradient id="bubbleFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8A00"/>
                <stop offset="60%" stopColor="#FF6B00"/>
                <stop offset="100%" stopColor="#EA580C"/>
              </linearGradient>
              
              <linearGradient id="bubbleDepthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C2410C"/>
                <stop offset="100%" stopColor="#9A3412"/>
              </linearGradient>

              <linearGradient id="bubbleHighlightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFA84A" stopOpacity="0.9"/>
                <stop offset="50%" stopColor="#FF8A00" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.1"/>
              </linearGradient>

              <linearGradient id="nodeDarkCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E293B"/>
                <stop offset="100%" stopColor="#0F172A"/>
              </linearGradient>

              <linearGradient id="blueNodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0052FF"/>
                <stop offset="100%" stopColor="#003EBD"/>
              </linearGradient>
            </defs>

            {/* BACKGROUND: Connecting Rays & Technical Node Lines */}
            {/* Line to Email (Top-Left) */}
            <path d="M190 120 C 130 110, 100 75, 78 68" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.45"/>
            <circle cx="78" cy="68" r="2.5" fill="#FF8A00"/>

            {/* Line to Send / Dispatch (Top-Right) */}
            <path d="M190 110 C 240 100, 275 75, 305 68" stroke="#0052FF" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.45"/>
            <circle cx="305" cy="68" r="2.5" fill="#0052FF"/>

            {/* Line to Phone / Voice (Bottom-Left) */}
            <path d="M180 145 C 135 155, 105 185, 75 195" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.45"/>
            <circle cx="75" cy="195" r="2.5" fill="#38BDF8"/>

            {/* Line to Message (Bottom-Right) */}
            <path d="M210 145 C 255 160, 280 185, 305 195" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.45"/>
            <circle cx="305" cy="195" r="2.5" fill="#FF8A00"/>

            {/* 3D Pedestal / Base Shadow for Main Bubble */}
            <ellipse cx="190" cy="172" rx="46" ry="10" fill="#000000" opacity="0.4" filter="url(#c3dBubbleShadow)"/>
            <ellipse cx="190" cy="170" rx="36" ry="6" fill="#FF6B00" opacity="0.18"/>

            {/* 1. CENTER PRIMARY 3D MESSAGE BUBBLE */}
            <g filter="url(#c3dBubbleShadow)">
              {/* 3D Extrusion Layer (Bottom/Sides Depth) */}
              <path d="M 148 76 C 148 68, 232 68, 232 76 V 134 C 232 144, 218 152, 206 152 L 180 152 L 160 166 L 164 152 C 154 152, 148 144, 148 134 Z" fill="url(#bubbleDepthGrad)" transform="translate(0, 8)"/>
              <polygon points="160,152 160,172 174,158" fill="url(#bubbleDepthGrad)"/>

              {/* Main 3D Bubble Front Surface */}
              <path d="M 152 74 C 152 64, 160 56, 172 56 H 208 C 220 56, 228 64, 228 74 V 126 C 228 136, 220 144, 208 144 H 182 L 162 158 L 166 144 H 172 C 160 144, 152 136, 152 126 Z" fill="url(#bubbleFaceGrad)" stroke="#FFA84A" strokeWidth="1.2"/>

              {/* 3D Top Specular Highlight Pill */}
              <path d="M 166 63 C 166 60, 170 58, 176 58 H 204 C 210 58, 214 60, 214 63 C 214 66, 210 68, 204 68 H 176 C 170 68, 166 66, 166 63 Z" fill="url(#bubbleHighlightGrad)"/>

              {/* 3D Inner Typing Dots */}
              <circle cx="176" cy="100" r="5" fill="#FFFFFF"/>
              <circle cx="174.5" cy="98.5" r="1.5" fill="#FFF7ED"/>

              <circle cx="190" cy="100" r="5" fill="#FFFFFF"/>
              <circle cx="188.5" cy="98.5" r="1.5" fill="#FFF7ED"/>

              <circle cx="204" cy="100" r="5" fill="#FFFFFF"/>
              <circle cx="202.5" cy="98.5" r="1.5" fill="#FFF7ED"/>
            </g>

            {/* 2. TOP-LEFT: 3D EMAIL / ENVELOPE NODE */}
            <g filter="url(#c3dNodeShadow)">
              <rect x="42" y="44" width="72" height="48" rx="12" fill="url(#nodeDarkCardGrad)" stroke="#334155" strokeWidth="1.2"/>
              <rect x="42" y="44" width="72" height="48" rx="12" fill="none" stroke="#FF6B00" strokeWidth="1" strokeOpacity="0.3"/>
              
              {/* Envelope Shape */}
              <rect x="58" y="56" width="40" height="24" rx="4" fill="#0B1120" stroke="#475569" strokeWidth="1"/>
              <path d="M 58 58 L 78 72 L 98 58" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="78" cy="72" r="2" fill="#FF8A00"/>
              <circle cx="98" cy="56" r="3.5" fill="#FF6B00"/>
              <circle cx="98" cy="56" r="1.5" fill="#FFFFFF"/>
            </g>

            {/* 3. TOP-RIGHT: 3D SEND / DISPATCH ELEMENT */}
            <g filter="url(#c3dNodeShadow)">
              <rect x="266" y="44" width="72" height="48" rx="12" fill="url(#nodeDarkCardGrad)" stroke="#334155" strokeWidth="1.2"/>
              <rect x="266" y="44" width="72" height="48" rx="12" fill="none" stroke="#0052FF" strokeWidth="1" strokeOpacity="0.4"/>
              
              {/* Paper Plane Vector */}
              <g transform="translate(284, 54)">
                <path d="M 0 16 L 34 2 L 18 28 L 14 18 Z" fill="url(#blueNodeGrad)" stroke="#38BDF8" strokeWidth="1"/>
                <path d="M 14 18 L 34 2 L 16 18 Z" fill="#60A5FA"/>
                <circle cx="-2" cy="20" r="1.5" fill="#38BDF8" opacity="0.7"/>
                <circle cx="-6" cy="24" r="1" fill="#38BDF8" opacity="0.4"/>
              </g>
            </g>

            {/* 4. BOTTOM-LEFT: 3D PHONE / DIRECT CALL NODE */}
            <g filter="url(#c3dNodeShadow)">
              <rect x="42" y="168" width="68" height="46" rx="12" fill="url(#nodeDarkCardGrad)" stroke="#334155" strokeWidth="1.2"/>
              <rect x="42" y="168" width="68" height="46" rx="12" fill="none" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.3"/>
              
              {/* Phone Handset Icon */}
              <g transform="translate(56, 178)">
                <rect x="0" y="0" width="24" height="24" rx="6" fill="#0052FF" fillOpacity="0.2"/>
                <path d="M15.5 13.5 C14.5 14.5 13 15 11 13 C9 11 9.5 9.5 10.5 8.5 L9 7 C8 8 7.5 9.5 9 12 C10.5 14.5 12 15 13 14 L15.5 13.5 Z" fill="#38BDF8"/>
                <path d="M 16 6 C 18 8, 18 11, 16 13" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              </g>
              <circle cx="96" cy="180" r="3" fill="#10B981"/>
            </g>

            {/* 5. BOTTOM-RIGHT: 3D MESSAGE NODE */}
            <g filter="url(#c3dNodeShadow)">
              <rect x="270" y="168" width="68" height="46" rx="12" fill="url(#nodeDarkCardGrad)" stroke="#334155" strokeWidth="1.2"/>
              <rect x="270" y="168" width="68" height="46" rx="12" fill="none" stroke="#FF6B00" strokeWidth="1" strokeOpacity="0.3"/>
              
              {/* Mini Message Lines */}
              <g transform="translate(282, 178)">
                <rect x="0" y="0" width="26" height="20" rx="4" fill="#0B1120" stroke="#FF6B00" strokeWidth="1" strokeOpacity="0.6"/>
                <line x1="5" y1="6" x2="21" y2="6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="5" y1="10" x2="16" y2="10" stroke="#FF8A00" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="5" y1="14" x2="12" y2="14" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
              </g>
              <circle cx="324" cy="180" r="3" fill="#FF8A00"/>
            </g>
          </svg>
        </div>

        {/* RIGHT: Contact Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest mb-4">
            CONTACT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-6 leading-tight">
            Let&apos;s Discuss <span className="text-[#FF6B00]">Your Project</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mb-9 leading-relaxed font-normal">
            We pride ourselves on our ability to perform and deliver results. Use the form below to discuss your project needs with our team &mdash; we&apos;ll get back to you as soon as possible.
          </p>
          <div>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center bg-[#FF6B00] hover:bg-[#E05D00] text-white text-sm font-semibold h-10 px-[22px] rounded-[4px] transition-colors duration-150"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
