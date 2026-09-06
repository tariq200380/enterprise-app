import Link from "next/link";

export default function CareersSection() {
  return (
    <section className="w-full bg-white py-14 sm:py-16 lg:py-20 border-b border-gray-100 relative overflow-hidden">
      
      {/* Subtle Ambient Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-50/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* LEFT CONTENT: Heading, Description, Bullet Points, and CTA */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Pre-title Pill / Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-[#EBF3FF] text-[#0052FF] text-xs font-medium tracking-wider uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
              <span>CAREERS AT CREED TECH</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-[22px] sm:text-4xl lg:text-[40px] font-medium text-[#0F172A] tracking-tight leading-tight mb-5">
              <span className="block">Build meaningful technology</span>
              <span className="block mt-2.5 sm:mt-3">Grow with the people behind it</span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed mb-7 max-w-xl font-normal">
              Join a team focused on thoughtful engineering, continuous growth, and building technology that creates real business value.
            </p>

            {/* 3 Short Points */}
            <div className="flex flex-col gap-3.5 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-200/80">
                  &#10003;
                </div>
                <span className="text-sm sm:text-[15px] font-normal text-gray-800">Work on meaningful projects</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-200/80">
                  &#10003;
                </div>
                <span className="text-sm sm:text-[15px] font-normal text-gray-800">Grow with experienced engineers</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-200/80">
                  &#10003;
                </div>
                <span className="text-sm sm:text-[15px] font-normal text-gray-800">Build with modern technologies</span>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <Link 
                href="/careers" 
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-[4px] bg-[#0052FF] hover:bg-[#0042D0] text-white text-sm font-semibold transition-colors duration-150 group"
              >
                <span>Explore Careers</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>

          </div>

          {/* RIGHT VISUAL: Premium Engineering & Careers 3D Visual Card */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-[4/3] sm:aspect-[1.25/1] rounded-[28px] bg-gradient-to-br from-[#F8FAFC] via-[#F0F6FF] to-[#EBF3FC] p-6 sm:p-8 border border-[#D9E6F7] shadow-[0_15px_40px_-10px_rgba(0,82,255,0.08)] flex items-center justify-center overflow-hidden group select-none hover:shadow-[0_20px_50px_-10px_rgba(0,82,255,0.14)] hover:border-blue-200 transition-all duration-500">
              
              {/* Light Blue Technical Grid Lines */}
              <div 
                className="absolute inset-0 opacity-[0.45] pointer-events-none" 
                style={{
                  backgroundImage: "linear-gradient(to right, #0052FF 1px, transparent 1px), linear-gradient(to bottom, #0052FF 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 30%, transparent 80%)",
                  WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 30%, transparent 80%)"
                }} 
              />

              {/* Ambient Soft Blue Glow Behind Center */}
              <div className="absolute w-48 h-48 bg-[#0052FF]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

              {/* Careers & Engineering Illustration SVG */}
              <svg className="relative z-10 w-full h-full max-h-[330px] max-w-[440px] transition-transform duration-500 group-hover:scale-[1.02]" viewBox="0 0 440 330" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Soft Shadows */}
                  <filter id="carSoftShadow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
                    <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#0052FF" floodOpacity="0.14"/>
                  </filter>
                  <filter id="carCardShadow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
                    <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.08"/>
                  </filter>

                  {/* Gradients */}
                  <linearGradient id="ideHeaderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0F172A"/>
                    <stop offset="100%" stopColor="#1E293B"/>
                  </linearGradient>
                  <linearGradient id="orangeAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF8A00"/>
                    <stop offset="100%" stopColor="#FF5500"/>
                  </linearGradient>
                </defs>

                {/* Subtle Network Rays */}
                <path d="M70 160 C 130 160, 160 140, 220 140" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6"/>
                <path d="M220 140 C 280 140, 310 170, 370 170" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6"/>
                <circle cx="70" cy="160" r="3" fill="#0052FF"/>
                <circle cx="220" cy="140" r="3.5" fill="#FF8A00"/>
                <circle cx="370" cy="170" r="3" fill="#0052FF"/>

                {/* CENTER: MODERN CODE / DEV INTERFACE (IDE Card) */}
                <g filter="url(#carSoftShadow)">
                  {/* Main IDE Window */}
                  <rect x="110" y="45" width="220" height="150" rx="14" fill="#0B1120" stroke="#1E293B" strokeWidth="1.5"/>
                  
                  {/* Top Window Bar */}
                  <rect x="110" y="45" width="220" height="28" rx="14" fill="url(#ideHeaderGrad)"/>
                  <rect x="110" y="60" width="220" height="13" fill="url(#ideHeaderGrad)"/>
                  
                  {/* macOS Window Controls */}
                  <circle cx="126" cy="59" r="3.5" fill="#EF4444"/>
                  <circle cx="137" cy="59" r="3.5" fill="#F59E0B"/>
                  <circle cx="148" cy="59" r="3.5" fill="#10B981"/>
                  
                  {/* Active File Tab */}
                  <rect x="164" y="50" width="76" height="18" rx="4" fill="#1E293B"/>
                  <text x="172" y="63" fill="#94A3B8" fontSize="8.5" fontFamily="monospace" fontWeight="600">engineer.ts</text>
                  
                  {/* Code Lines */}
                  <text x="124" y="93" fill="#38BDF8" fontSize="9.5" fontFamily="monospace" fontWeight="bold">const</text>
                  <text x="156" y="93" fill="#FFFFFF" fontSize="9.5" fontFamily="monospace"> pod = new</text>
                  <text x="216" y="93" fill="#F59E0B" fontSize="9.5" fontFamily="monospace"> Squad()</text>
                  
                  <text x="124" y="112" fill="#94A3B8" fontSize="9.5" fontFamily="monospace">pod.<tspan fill="#34D399">enableMentorship</tspan>()</text>
                  <text x="124" y="131" fill="#94A3B8" fontSize="9.5" fontFamily="monospace">pod.<tspan fill="#FF8A00">shipImpact</tspan>(<tspan fill="#60A5FA">&apos;Production&apos;</tspan>)</text>
                  <text x="124" y="150" fill="#64748B" fontSize="9" fontFamily="monospace">// Build with elite engineers</text>
                  
                  {/* Status Indicator Line */}
                  <rect x="124" y="168" width="192" height="14" rx="4" fill="#1E293B" opacity="0.8"/>
                  <circle cx="134" cy="175" r="2.5" fill="#10B981"/>
                  <text x="142" y="178" fill="#34D399" fontSize="7.5" fontFamily="monospace" fontWeight="bold">BUILD: PASSING (100% COVERAGE)</text>
                </g>

                {/* LEFT OVERLAY: Developer Profile / Team Element */}
                <g filter="url(#carCardShadow)">
                  <rect x="36" y="155" width="138" height="88" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5"/>
                  
                  {/* Profile Avatar Badge */}
                  <rect x="48" y="167" width="28" height="28" rx="8" fill="#0052FF"/>
                  <path d="M62 176 C65 176 67 178 67 181 V182 H57 V181 C57 178 59 176 62 176 Z" fill="#FFFFFF"/>
                  <circle cx="62" cy="173" r="3" fill="#FFFFFF"/>
                  
                  {/* Profile Info */}
                  <text x="82" y="177" fill="#0F172A" fontSize="10" fontWeight="bold">Senior Lead</text>
                  <text x="82" y="189" fill="#0052FF" fontSize="8" fontWeight="600">Staff Architect</text>
                  
                  <line x1="48" y1="203" x2="162" y2="203" stroke="#F1F5F9" strokeWidth="1.5"/>
                  
                  {/* Skills Tag Pills */}
                  <rect x="48" y="211" width="34" height="16" rx="4" fill="#EFF6FF"/>
                  <text x="53" y="222" fill="#0052FF" fontSize="7.5" fontWeight="700">React</text>

                  <rect x="86" y="211" width="38" height="16" rx="4" fill="#EFF6FF"/>
                  <text x="91" y="222" fill="#0052FF" fontSize="7.5" fontWeight="700">Node.js</text>

                  <rect x="128" y="211" width="28" height="16" rx="4" fill="#FFF7ED"/>
                  <text x="133" y="222" fill="#FF8A00" fontSize="7.5" fontWeight="700">Go</text>
                </g>

                {/* RIGHT OVERLAY: Career Growth / Progression Graphic */}
                <g filter="url(#carCardShadow)">
                  <rect x="265" y="165" width="142" height="96" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5"/>
                  
                  <text x="277" y="183" fill="#0F172A" fontSize="10" fontWeight="bold">Career Progression</text>
                  <text x="277" y="195" fill="#10B981" fontSize="8" fontWeight="700">&uarr; Continuous Growth</text>
                  
                  {/* 3D Ascending Skill Steps / Growth Bars */}
                  {/* Bar 1: Junior */}
                  <rect x="277" y="228" width="18" height="20" rx="3" fill="#E2E8F0"/>
                  <text x="281" y="222" fill="#64748B" fontSize="7" fontWeight="bold">L1</text>
                  
                  {/* Bar 2: Mid */}
                  <rect x="303" y="218" width="18" height="30" rx="3" fill="#93C5FD"/>
                  <text x="307" y="212" fill="#0052FF" fontSize="7" fontWeight="bold">L2</text>
                  
                  {/* Bar 3: Senior */}
                  <rect x="329" y="206" width="18" height="42" rx="3" fill="#0052FF"/>
                  <text x="333" y="200" fill="#0052FF" fontSize="7" fontWeight="bold">L3</text>
                  
                  {/* Bar 4: Principal (with Orange Accent) */}
                  <rect x="355" y="192" width="18" height="56" rx="3" fill="url(#orangeAccentGrad)" filter="url(#carCardShadow)"/>
                  <text x="357" y="186" fill="#FF8A00" fontSize="7.5" fontWeight="800">L4 &#9733;</text>
                  
                  {/* Growth Trend Curve Line */}
                  <path d="M286 220 Q 320 200, 364 178" stroke="#FF8A00" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <circle cx="364" cy="178" r="3" fill="#FF8A00"/>
                </g>
              </svg>

              {/* Floating Badge: Top-Left */}
              <div className="absolute top-5 left-5 z-20 bg-white/95 border border-[#D9E6F7] rounded-[4px] px-3.5 py-1.5 shadow-none flex items-center gap-2 text-xs font-medium text-gray-800 transition-transform duration-300 hover:scale-105">
                <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
                <span>Engineering</span>
              </div>

              {/* Floating Badge: Top-Right */}
              <div className="absolute top-5 right-5 z-20 bg-white/95 border border-[#D9E6F7] rounded-[4px] px-3.5 py-1.5 shadow-none flex items-center gap-2 text-xs font-medium text-gray-800 transition-transform duration-300 hover:scale-105">
                <span className="text-[#FF8A00] font-bold">📈</span>
                <span>Growth</span>
              </div>

              {/* Floating Badge: Bottom-Center */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 bg-white/95 border border-[#D9E6F7] rounded-[4px] px-4 py-1.5 shadow-none flex items-center gap-2 text-xs font-medium text-gray-800 transition-transform duration-300 hover:scale-105 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open Roles &bull; Active Hiring</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
