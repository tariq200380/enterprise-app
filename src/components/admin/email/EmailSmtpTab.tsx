"use client";

import React from "react";

interface EmailSmtpTabProps {
  smtpHost: string;
  setSmtpHost: (v: string) => void;
  smtpPort: number;
  setSmtpPort: (v: number) => void;
  smtpSecure: boolean;
  setSmtpSecure: (v: boolean) => void;
  smtpUser: string;
  setSmtpUser: (v: string) => void;
  smtpPass: string;
  setSmtpPass: (v: string) => void;
  smtpFromEmail: string;
  setSmtpFromEmail: (v: string) => void;
  smtpFromName: string;
  setSmtpFromName: (v: string) => void;
  isSmtpConfigured: boolean;
  isSavingSmtp: boolean;
  isTestingSmtp: boolean;
  onSaveSmtp: (e: React.FormEvent) => void;
  onTestSmtp: () => void;
}

export default function EmailSmtpTab({
  smtpHost,
  setSmtpHost,
  smtpPort,
  setSmtpPort,
  smtpSecure,
  setSmtpSecure,
  smtpUser,
  setSmtpUser,
  smtpPass,
  setSmtpPass,
  smtpFromEmail,
  setSmtpFromEmail,
  smtpFromName,
  setSmtpFromName,
  isSmtpConfigured,
  isSavingSmtp,
  isTestingSmtp,
  onSaveSmtp,
  onTestSmtp,
}: EmailSmtpTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 text-[#0F172A] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F1F5F9]">
          <div>
            <h3 className="text-base font-bold text-[#0F172A] m-0 flex items-center gap-2">
              <span>⚙️</span>
              <span>Outgoing SMTP Mail Server Configuration</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure real mail delivery credentials for enterprise broadcast and automated branded client replies.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                isSmtpConfigured
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isSmtpConfigured ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                }`}
              />
              <span>{isSmtpConfigured ? "Active & Configured" : "Local Mode (No SMTP)"}</span>
            </span>
          </div>
        </div>

        <form onSubmit={onSaveSmtp} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SMTP Host (Mail Server)
              </label>
              <input
                type="text"
                value={smtpHost}
                onChange={(e) => setSmtpHost(e.target.value)}
                placeholder="e.g. smtp.gmail.com or mail.creed-tech.com"
                className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Use <strong className="text-slate-700">smtp.gmail.com</strong> for Google Workspace or personal Gmail.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SMTP Port &amp; Encryption
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={smtpPort}
                  onChange={(e) => setSmtpPort(Number(e.target.value))}
                  placeholder="465 or 587"
                  className="w-28 px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
                />
                <label className="flex items-center gap-2 px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-slate-700 cursor-pointer select-none flex-1">
                  <input
                    type="checkbox"
                    checked={smtpSecure}
                    onChange={(e) => setSmtpSecure(e.target.checked)}
                    className="rounded text-[#FF6B00] focus:ring-[#FF6B00]"
                  />
                  <span>SSL / TLS (Port 465)</span>
                </label>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                Port 465 requires SSL enabled; Port 587 uses STARTTLS (uncheck SSL).
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SMTP Username / Email
              </label>
              <input
                type="text"
                value={smtpUser}
                onChange={(e) => setSmtpUser(e.target.value)}
                placeholder="your-account@gmail.com"
                className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SMTP Password / App Password
              </label>
              <input
                type="password"
                value={smtpPass}
                onChange={(e) => setSmtpPass(e.target.value)}
                placeholder="16-character Google App Password or SMTP key"
                className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                For Gmail, generate an <strong className="text-slate-700">App Password</strong> in Google Account &gt; Security.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Default &quot;From&quot; Sender Name
              </label>
              <input
                type="text"
                value={smtpFromName}
                onChange={(e) => setSmtpFromName(e.target.value)}
                placeholder="e.g. Creed Tech Executive Desk"
                className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Default &quot;From&quot; Sender Email Address
              </label>
              <input
                type="email"
                value={smtpFromEmail}
                onChange={(e) => setSmtpFromEmail(e.target.value)}
                placeholder="contact@creed-tech.com or your-verified-sender@domain.com"
                className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/30 transition-all"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-3 flex-wrap">
            <div className="text-xs text-slate-500">
              {isSmtpConfigured
                ? "✓ SMTP credentials are valid and active."
                : "ℹ Enter valid credentials to send emails without local simulation."}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isTestingSmtp}
                onClick={onTestSmtp}
                className="px-4 py-2 bg-[#F1F3F5] hover:bg-[#E2E8F0] border border-[#E2E8F0] text-slate-700 text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <span>⚡</span>
                <span>{isTestingSmtp ? "Testing..." : "Test Connection"}</span>
              </button>

              <button
                type="submit"
                disabled={isSavingSmtp}
                className="px-5 py-2 bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 shadow-[0_2px_8px_rgba(255,107,0,0.25)] hover:shadow-[0_4px_14px_rgba(255,107,0,0.35)] disabled:opacity-50"
              >
                <span>💾</span>
                <span>{isSavingSmtp ? "Saving..." : "Save SMTP Settings"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 text-[#0F172A] shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
          <span>💡</span>
          <span>Quick Guide: Configuring Gmail / Google Workspace</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg">
            <strong className="text-[#0F172A] block mb-1">1. Enable 2-Step Verification</strong>
            Go to your Google Account &gt; Security, and turn on 2-Step Verification if it is not already enabled.
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg">
            <strong className="text-[#0F172A] block mb-1">2. Generate App Password</strong>
            Search for &quot;App Passwords&quot; in Google Account settings. Select App: Mail, Device: Other, and click Generate.
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg">
            <strong className="text-[#0F172A] block mb-1">3. Enter 16-Character Key</strong>
            Paste the generated 16-character code directly into the SMTP Password field above with Port 465 (SSL checked).
          </div>
        </div>
      </div>
    </div>
  );
}
