"use client";

export default function DirectCallCard() {
  const handleScrollToForm = () => {
    const formElement = document.getElementById("contact-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
      const firstInput = formElement.querySelector<HTMLInputElement>("input[name='fullName']");
      firstInput?.focus();
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#030712] to-[#111827] text-white p-7 rounded-2xl border border-[#1F2937] shadow-lg">
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 text-[#FB923C] text-[10.5px] font-bold uppercase tracking-wider rounded-sm mb-3">
        <span>⚡ INSTANT DISCOVERY</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">
        Need a Direct Architectural Call?
      </h3>
      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal mb-5">
        Skip the queue and schedule a 30-minute discovery call directly with one of our Principal Systems Architects.
      </p>
      <button
        type="button"
        onClick={handleScrollToForm}
        className="w-full h-11 inline-flex items-center justify-center bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer shadow-sm"
      >
        Schedule Discovery Call ⚡
      </button>
    </div>
  );
}
