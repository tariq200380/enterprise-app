import React from "react";
import {
  EmailDepartmentProfile,
  EmailFormatType,
} from "@/lib/email-types";
import {
  ACCENT_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
  BG_COLOR_PRESETS,
} from "../constants/presets";

interface ProfileEssentialsProps {
  editingProfile: EmailDepartmentProfile;
  setEditingProfile: React.Dispatch<React.SetStateAction<EmailDepartmentProfile | null>>;
}

interface ProfileIdentityControlsProps extends ProfileEssentialsProps {
  isEditingEmailDuplicate: boolean;
}

interface ProfileLayoutTemplatesControlsProps extends ProfileEssentialsProps {
  activeModalFormat: EmailFormatType;
}

export const ProfileIdentityControls: React.FC<ProfileIdentityControlsProps> = ({
  editingProfile,
  setEditingProfile,
  isEditingEmailDuplicate,
}) => {
  return (
    <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
      <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
        <span>👤</span>
        <span>1. Profile Identity &amp; Color Scheme</span>
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Profile Name *</label>
          <input
            type="text"
            value={editingProfile.name}
            onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
            className="w-full px-3 py-2 text-xs sm:text-[13px] border border-slate-300 rounded-xl font-medium outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 bg-white text-slate-900 transition-all"
            placeholder="e.g. Sales Desk"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Department Tag *</label>
          <input
            type="text"
            value={editingProfile.department}
            onChange={(e) => setEditingProfile({ ...editingProfile, department: e.target.value })}
            className="w-full px-3 py-2 text-xs sm:text-[13px] border border-slate-300 rounded-xl font-medium outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 bg-white text-slate-900 transition-all"
            placeholder="e.g. Industrial Solutions"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">Sender Email *</label>
          <input
            type="email"
            value={editingProfile.email}
            onChange={(e) => setEditingProfile({ ...editingProfile, email: e.target.value })}
            className={`w-full px-3 py-2 text-xs sm:text-[13px] border rounded-xl font-mono outline-none bg-white transition-all text-slate-900 ${
              isEditingEmailDuplicate
                ? "border-red-500 focus:border-red-600 ring-2 ring-red-400/20"
                : "border-slate-300 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
            }`}
            placeholder="e.g. desk@creed-tech.com"
          />
          {isEditingEmailDuplicate && (
            <span className="text-xs text-red-600 font-bold block mt-1.5 flex items-center gap-1.5">
              <span>⚠️</span>
              <span>This business email already exists in another profile. Duplicate email formats are not allowed.</span>
            </span>
          )}
        </div>

        {/* 1. BRAND ACCENT COLOR PALETTE */}
        <div className="sm:col-span-2 pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>✨ Brand Accent Color</span>
              <span className="text-[11px] font-normal text-slate-500">(Buttons, Links, Borders)</span>
            </label>
            <span className="text-xs font-mono text-slate-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
              {editingProfile.accentColor || "#FF6B00"}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {ACCENT_COLOR_PRESETS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setEditingProfile({ ...editingProfile, accentColor: c })}
                className="w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-115 shadow-2xs"
                style={{
                  backgroundColor: c,
                  border: editingProfile.accentColor === c ? "2px solid #0052FF" : "1px solid #cbd5e1",
                  boxShadow: editingProfile.accentColor === c ? "0 0 0 2px rgba(0,82,255,0.3)" : "none",
                }}
                title={c}
              />
            ))}
            <input
              type="color"
              value={editingProfile.accentColor || "#FF6B00"}
              onChange={(e) => setEditingProfile({ ...editingProfile, accentColor: e.target.value })}
              className="w-7 h-7 rounded-lg cursor-pointer border border-slate-300 p-0 ml-1 shadow-2xs"
              title="Custom Color Wheel / Palette"
            />
            <input
              type="text"
              value={editingProfile.accentColor || ""}
              onChange={(e) => setEditingProfile({ ...editingProfile, accentColor: e.target.value })}
              className="w-24 px-2.5 py-1 text-xs border border-slate-300 rounded-lg font-mono font-bold outline-none bg-white text-slate-800 focus:border-[#FF6B00]"
              placeholder="#FF6B00"
            />
          </div>
        </div>

        {/* 2. TEXT COLOR PALETTE */}
        <div className="sm:col-span-2 pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>🔤 Text Color Palette</span>
              <span className="text-[11px] font-normal text-slate-500">(Headings, Message &amp; Name)</span>
            </label>
            <span className="text-xs font-mono text-slate-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
              {editingProfile.textColor || "#1E293B"}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {TEXT_COLOR_PRESETS.map((item) => (
              <button
                key={item.color}
                type="button"
                onClick={() => setEditingProfile({ ...editingProfile, textColor: item.color })}
                className="w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-115 shadow-2xs"
                style={{
                  backgroundColor: item.color,
                  border: (editingProfile.textColor || "#1E293B").toLowerCase() === item.color.toLowerCase() ? "2px solid #0052FF" : "1px solid #94a3b8",
                  boxShadow: (editingProfile.textColor || "#1E293B").toLowerCase() === item.color.toLowerCase() ? "0 0 0 2px rgba(0,82,255,0.3)" : "none",
                }}
                title={`${item.label} (${item.color})`}
              />
            ))}
            <input
              type="color"
              value={editingProfile.textColor || "#1E293B"}
              onChange={(e) => setEditingProfile({ ...editingProfile, textColor: e.target.value })}
              className="w-7 h-7 rounded-lg cursor-pointer border border-slate-300 p-0 ml-1 shadow-2xs"
              title="Custom Color Wheel / Palette"
            />
            <input
              type="text"
              value={editingProfile.textColor || "#1E293B"}
              onChange={(e) => setEditingProfile({ ...editingProfile, textColor: e.target.value })}
              className="w-24 px-2.5 py-1 text-xs border border-slate-300 rounded-lg font-mono font-bold outline-none bg-white text-slate-800 focus:border-[#FF6B00]"
              placeholder="#1E293B"
            />
          </div>
        </div>

        {/* 3. BACKGROUND COLOR PALETTE */}
        <div className="sm:col-span-2 pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>🎨 Background Color Palette</span>
              <span className="text-[11px] font-normal text-slate-500">(Email Card &amp; Canvas)</span>
            </label>
            <span className="text-xs font-mono text-slate-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
              {editingProfile.backgroundColor || "#FFFFFF"}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {BG_COLOR_PRESETS.map((item) => (
              <button
                key={item.color}
                type="button"
                onClick={() => setEditingProfile({ ...editingProfile, backgroundColor: item.color })}
                className="w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-115 shadow-2xs"
                style={{
                  backgroundColor: item.color,
                  border: (editingProfile.backgroundColor || "#FFFFFF").toLowerCase() === item.color.toLowerCase() ? "2px solid #0052FF" : "1px solid #cbd5e1",
                  boxShadow: (editingProfile.backgroundColor || "#FFFFFF").toLowerCase() === item.color.toLowerCase() ? "0 0 0 2px rgba(0,82,255,0.3)" : "none",
                }}
                title={`${item.label} (${item.color})`}
              />
            ))}
            <input
              type="color"
              value={editingProfile.backgroundColor || "#FFFFFF"}
              onChange={(e) => setEditingProfile({ ...editingProfile, backgroundColor: e.target.value })}
              className="w-7 h-7 rounded-lg cursor-pointer border border-slate-300 p-0 ml-1 shadow-2xs"
              title="Custom Color Wheel / Palette"
            />
            <input
              type="text"
              value={editingProfile.backgroundColor || "#FFFFFF"}
              onChange={(e) => setEditingProfile({ ...editingProfile, backgroundColor: e.target.value })}
              className="w-24 px-2.5 py-1 text-xs border border-slate-300 rounded-lg font-mono font-bold outline-none bg-white text-slate-800 focus:border-[#FF6B00]"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileLayoutTemplatesControls: React.FC<ProfileLayoutTemplatesControlsProps> = ({
  editingProfile,
  setEditingProfile,
  activeModalFormat,
}) => {
  return (
    <>
      {/* SECTION 3: LAYOUT POSITION & ALIGNMENT */}
      <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
        <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <span>📐</span>
          <span>3. Layout Style, Position &amp; Alignment</span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
          {/* Quick 1-Click Master Alignment */}
          <div className="sm:col-span-2 bg-blue-50/90 border border-blue-200 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-extrabold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                <span>⚡ One-Click Align All (Logo, Headings &amp; Text)</span>
              </label>
              <span className="text-[11px] text-blue-700 font-semibold">Aligns logo, title &amp; all text together</span>
            </div>
            <div className="flex gap-2">
              {[
                { id: "left", label: "⬅️ All Left" },
                { id: "center", label: "⏺️ All Center" },
                { id: "right", label: "➡️ All Right" },
              ].map((item) => {
                const isAllActive =
                  (editingProfile.contentAlignment || "left") === item.id &&
                  (editingProfile.headerAlignment || (editingProfile.headerStyle === "centered" ? "center" : "left")) === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setEditingProfile({
                        ...editingProfile,
                        contentAlignment: item.id as any,
                        headerAlignment: item.id as any,
                      })
                    }
                    className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg border cursor-pointer transition-all ${
                      isAllActive
                        ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-blue-100/60"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Media / Video Position (Only for Format 1 Catalog) */}
          {activeModalFormat === "format-catalog" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Catalog Cards Position (Oper, Center, Nechy)
              </label>
              <div className="flex gap-1.5">
                {[
                  { id: "top", label: "⬆️ Oper (Top)" },
                  { id: "center", label: "↔️ Center" },
                  { id: "bottom", label: "⬇️ Nechy (Bottom)" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setEditingProfile({ ...editingProfile, mediaPosition: item.id as any })}
                    className={`flex-1 py-1.5 px-2 text-xs rounded-lg font-bold border cursor-pointer transition-colors ${
                      (editingProfile.mediaPosition || "center") === item.id
                        ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Logo & Header Alignment */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Logo &amp; Header Alignment (Left, Center, Right)
            </label>
            <div className="flex gap-1.5">
              {[
                { id: "left", label: "⬅️ Left Logo" },
                { id: "center", label: "⏺️ Center Logo" },
                { id: "right", label: "➡️ Right Logo" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setEditingProfile({
                      ...editingProfile,
                      headerAlignment: item.id as any,
                    })
                  }
                  className={`flex-1 py-1.5 px-2 text-xs rounded-lg font-bold border cursor-pointer transition-colors ${
                    (editingProfile.headerAlignment || (editingProfile.headerStyle === "centered" ? "center" : "left")) === item.id
                      ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Headings & Text Alignment */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Headings &amp; Body Text Alignment
            </label>
            <div className="flex gap-1.5">
              {[
                { id: "left", label: "⬅️ Left Text" },
                { id: "center", label: "⏺️ Center Text" },
                { id: "right", label: "➡️ Right Text" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setEditingProfile({ ...editingProfile, contentAlignment: item.id as any })}
                  className={`flex-1 py-1.5 px-2 text-xs rounded-lg font-bold border cursor-pointer transition-colors ${
                    (editingProfile.contentAlignment || "left") === item.id
                      ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Header Theme */}
          <div className="sm:col-span-2 pt-2 border-t border-slate-200">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Header Background Theme
            </label>
            <div className="flex gap-2">
              {[
                { id: "dark", label: "⬛ Dark Enterprise" },
                { id: "light", label: "⬜ Clean Light" },
                { id: "centered", label: "👑 Centered Brand" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setEditingProfile({ ...editingProfile, headerStyle: item.id as any })}
                  className={`flex-1 py-1.5 px-2 text-xs rounded-lg font-bold border cursor-pointer transition-colors ${
                    (editingProfile.headerStyle || "dark") === item.id
                      ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: DEFAULT SUBJECT & MESSAGE TEMPLATE */}
      <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-2xs">
        <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <span>💬</span>
          <span>4. Default Subject &amp; Message Template</span>
        </span>
        <div className="flex flex-col gap-3 text-xs">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Subject Template (uses &#123;service&#125; &amp; &#123;id&#125;)
            </label>
            <input
              type="text"
              value={editingProfile.defaultSubjectTemplate || ""}
              onChange={(e) => setEditingProfile({ ...editingProfile, defaultSubjectTemplate: e.target.value })}
              className="w-full px-3.5 py-2 text-xs sm:text-[13px] border border-slate-300 rounded-xl outline-none font-medium bg-white text-slate-900 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all"
              placeholder="Re: Creed Tech Discovery - {service} [Inquiry #{id}]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Message Template Body
            </label>
            <textarea
              rows={4}
              value={editingProfile.defaultMessageTemplate || ""}
              onChange={(e) => setEditingProfile({ ...editingProfile, defaultMessageTemplate: e.target.value })}
              className="w-full p-3.5 text-xs sm:text-[13px] border border-slate-300 rounded-xl font-mono outline-none bg-white text-slate-900 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all leading-relaxed"
              placeholder="Dear {client_name}, ..."
            />
          </div>
        </div>
      </div>
    </>
  );
};
