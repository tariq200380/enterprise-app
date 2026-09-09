"use client";

import React, { useState, useEffect } from "react";
import { Inquiry } from "@/types/admin";

interface InquiryDetailsModalProps {
  inquiry: Inquiry | null;
  onClose: () => void;
  onInquiryUpdated?: () => void;
  showToast?: (msg: string, type?: "success" | "error") => void;
}

export default function InquiryDetailsModal({
  inquiry,
  onClose,
  onInquiryUpdated,
  showToast,
}: InquiryDetailsModalProps) {
  const [viewMode, setViewMode] = useState<"details" | "reply" | "settings">("details");

  // Email Composer Form
  const [toEmail, setToEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [autoUpdateStatus, setAutoUpdateStatus] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [sendResultMsg, setSendResultMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  // SMTP Settings Form
  const [smtpHost, setSmtpHost] = useState("smtp.gmail.com");
  const [smtpPort, setSmtpPort] = useState(465);
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");
  const [smtpFromName, setSmtpFromName] = useState("Creed Tech Enterprise");
  const [smtpFromEmail, setSmtpFromEmail] = useState("contact@creed-tech.com");
  const [isConfigured, setIsConfigured] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);
  const [smtpStatusMsg, setSmtpStatusMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  // Initialize Reply templates whenever a new inquiry is opened
  useEffect(() => {
    if (inquiry) {
      setViewMode("details");
      setToEmail(inquiry.email || "");
      setEmailSubject(`Re: Creed Tech Discovery & Scoping - ${inquiry.service} [Inquiry #${inquiry.id}]`);
      
      // Pre-filled professional template
      setEmailBody(
`Dear ${inquiry.client_name || "Client"},

Thank you for reaching out to Creed Tech regarding your inquiry for "${inquiry.service}".

We have received and reviewed your project details:
"${inquiry.project_details || "Technical architecture and engineering scoping"}"

Our senior systems engineering team would be pleased to proceed with this session. Please let us know your preferred meeting schedule or if you require an NDA executed prior to our technical discovery call.

Best regards,

Creed Tech Enterprise Solutions Team
Website: https://creed-tech.com
Desk: contact@creed-tech.com`
      );
      setSendResultMsg(null);
    }
  }, [inquiry]);

  // Load existing SMTP settings
  useEffect(() => {
    fetch("/api/admin/email/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.config) {
          setSmtpHost(data.config.host || "smtp.gmail.com");
          setSmtpPort(data.config.port || 465);
          setSmtpUser(data.config.user || "");
          setSmtpFromName(data.config.from_name || "Creed Tech Enterprise");
          setSmtpFromEmail(data.config.from_email || "contact@creed-tech.com");
          setIsConfigured(Boolean(data.config.isConfigured));
        }
      })
      .catch(() => {});
  }, []);

  if (!inquiry) return null;

  // Preset Templates
  const applyTemplate = (type: "confirm" | "scoping" | "nda") => {
    if (type === "confirm") {
      setEmailSubject(`Confirmation: Technical Discovery Call - Creed Tech [Inquiry #${inquiry.id}]`);
      setEmailBody(
`Dear ${inquiry.client_name},

We are pleased to confirm your discovery call for "${inquiry.service}".

Scheduled Scope:
${inquiry.project_details || "30-min technical architecture scoping session"}

A Google Meet video invitation has been reserved for your team. Please let us know if any team members need to be added to the calendar invite.

Best regards,
Creed Tech Architecture Team`
      );
    } else if (type === "scoping") {
      setEmailSubject(`Action Required: Project Scoping Questionnaire - Creed Tech [Inquiry #${inquiry.id}]`);
      setEmailBody(
`Dear ${inquiry.client_name},

Thank you for your interest in Creed Tech's ${inquiry.service}.

To prepare an accurate engineering roadmap and infrastructure estimate, could you please provide a few additional details:
1. Target deployment cloud/infrastructure (AWS / GCP / Azure / On-Premise)
2. Expected monthly throughput or concurrent user load
3. Anticipated timeline for architecture deployment

Looking forward to your response.

Best regards,
Creed Tech Solutions Team`
      );
    } else if (type === "nda") {
      setEmailSubject(`Mutual NDA & Technical Scoping - Creed Tech [Inquiry #${inquiry.id}]`);
      setEmailBody(
`Dear ${inquiry.client_name},

We noted that an NDA is requested for your project "${inquiry.service}".

Creed Tech standardizes on mutual confidential protection for all proprietary enterprise architectures. Please review the attached agreement or send over your corporate NDA for execution.

Best regards,
Creed Tech Legal & Engineering Desk`
      );
    }
  };

  // Send Email via Server
  const handleSendServerEmail = async () => {
    if (!toEmail || !toEmail.includes("@")) {
      setSendResultMsg({ text: "Please enter a valid recipient email address.", isError: true });
      return;
    }
    if (!emailBody.trim()) {
      setSendResultMsg({ text: "Message body cannot be empty.", isError: true });
      return;
    }

    try {
      setIsSending(true);
      setSendResultMsg(null);

      const res = await fetch("/api/admin/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryId: inquiry.id,
          to: toEmail,
          subject: emailSubject,
          message: emailBody,
          updateStatus: autoUpdateStatus,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSendResultMsg({
          text: data.delivered
            ? `✓ Email delivered successfully to ${toEmail}!`
            : `✓ Reply logged! ${data.message}`,
          isError: false,
        });

        if (showToast) {
          showToast(
            data.delivered
              ? `✓ Reply email delivered to ${toEmail}!`
              : `✓ Inquiry #${inquiry.id} updated to RESPONDED!`
          );
        }

        if (onInquiryUpdated) onInquiryUpdated();
      } else {
        throw new Error(data.error || data.message || "Failed to send email");
      }
    } catch (err: any) {
      setSendResultMsg({ text: `Failed: ${err.message}`, isError: true });
    } finally {
      setIsSending(false);
    }
  };

  // 1-Click Open in Gmail Web
  const handleOpenGmailWeb = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      toEmail
    )}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(gmailUrl, "_blank");

    if (autoUpdateStatus) {
      fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: inquiry.id, status: "RESPONDED" }),
      }).then(() => {
        if (onInquiryUpdated) onInquiryUpdated();
        if (showToast) showToast(`✓ Gmail opened! Inquiry #${inquiry.id} marked as RESPONDED.`);
      });
    }
  };

  // Save SMTP Settings
  const handleSaveSmtp = async () => {
    try {
      setIsSavingSettings(true);
      setSmtpStatusMsg(null);

      const res = await fetch("/api/admin/email/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: smtpHost,
          port: smtpPort,
          user: smtpUser,
          pass: smtpPass,
          from_name: smtpFromName,
          from_email: smtpFromEmail,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsConfigured(data.isConfigured);
        setSmtpStatusMsg({ text: "✓ Email connection settings saved successfully!", isError: false });
        if (showToast) showToast("✓ SMTP settings saved!");
      } else {
        throw new Error(data.error || "Failed to save settings");
      }
    } catch (err: any) {
      setSmtpStatusMsg({ text: `Save error: ${err.message}`, isError: true });
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Test SMTP Connection
  const handleTestSmtp = async () => {
    if (!smtpUser) {
      setSmtpStatusMsg({ text: "Please enter your SMTP Username / Email.", isError: true });
      return;
    }

    try {
      setIsTestingSmtp(true);
      setSmtpStatusMsg(null);

      const res = await fetch("/api/admin/email/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: smtpHost,
          port: smtpPort,
          user: smtpUser,
          pass: smtpPass,
          from_name: smtpFromName,
          from_email: smtpFromEmail,
          test_email: smtpUser,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsConfigured(true);
        setSmtpStatusMsg({ text: `✓ SMTP Connection Verified! Test email sent to ${smtpUser}.`, isError: false });
      } else {
        setSmtpStatusMsg({ text: `Connection test failed: ${data.message || data.error}`, isError: true });
      }
    } catch (err: any) {
      setSmtpStatusMsg({ text: `Test failed: ${err.message}`, isError: true });
    } finally {
      setIsTestingSmtp(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-[#111827] rounded-xl border border-gray-200 max-w-xl w-full p-6 shadow-2xl relative text-left my-8 max-h-[92vh] flex flex-col justify-between">
        
        {/* ============================================================ */}
        {/* VIEW 1: INQUIRY DETAILS (Original View Matching User Screenshot) */}
        {/* ============================================================ */}
        {viewMode === "details" && (
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-[#030712] mb-0.5">Inquiry Details</h3>
                <span className="text-xs text-gray-500">ID #{inquiry.id} • {inquiry.created_at}</span>
              </div>
              <span
                className={`px-2.5 py-0.5 text-[10.5px] font-bold uppercase rounded-full border ${
                  inquiry.status === "RESPONDED"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : inquiry.status === "CONTACTED"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-amber-50 text-amber-800 border-amber-200"
                }`}
              >
                {inquiry.status || "NEW"}
              </span>
            </div>

            <div className="my-4 p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col gap-2.5 text-xs">
              <div><strong>Client Name:</strong> {inquiry.client_name}</div>
              <div>
                <strong>Email:</strong>{" "}
                <button
                  type="button"
                  onClick={() => setViewMode("reply")}
                  className="text-[#0052FF] font-semibold underline cursor-pointer hover:text-[#0042D0]"
                >
                  {inquiry.email || "N/A"}
                </button>
              </div>
              <div><strong>Phone:</strong> {inquiry.phone || "N/A"}</div>
              <div><strong>Company:</strong> {inquiry.company}</div>
              <div><strong>Service:</strong> <span className="text-[#0052FF] font-semibold">{inquiry.service}</span></div>
              <div><strong>NDA Required:</strong> <span className="text-green-700 font-bold">Yes (Non-Disclosure Agreement)</span></div>
              <div>
                <strong>Project Scope / Details:</strong>
                <p className="mt-1 p-2 bg-white rounded border border-gray-200 text-gray-700 leading-relaxed font-normal">
                  {inquiry.project_details || "Enterprise high-throughput architecture design and deployment."}
                </p>
              </div>
              <div><strong>Status:</strong> {inquiry.status}</div>
            </div>

            <div className="flex justify-between items-center gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setViewMode("reply")}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0052FF] hover:bg-[#0042D0] rounded-md transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Reply via Email</span>
                <span>✉️</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: EMAIL REPLY COMPOSER BOX                            */}
        {/* ============================================================ */}
        {viewMode === "reply" && (
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-blue-100 text-[#0052FF] flex items-center justify-center text-sm font-bold">
                  ✉
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A] m-0">
                    Reply to {inquiry.client_name}
                  </h3>
                  <span className="text-[11px] text-[#64748B]">
                    Inquiry #{inquiry.id} • {inquiry.service}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewMode("settings")}
                className="text-[11px] font-semibold text-[#0052FF] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>⚙️ Email Settings</span>
                {isConfigured && <span className="w-2 h-2 rounded-full bg-green-500 inline-block" title="SMTP Connected"></span>}
              </button>
            </div>

            {/* Notification Banner */}
            {sendResultMsg && (
              <div
                className={`p-3 text-xs rounded-md border font-medium ${
                  sendResultMsg.isError
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                }`}
              >
                {sendResultMsg.text}
              </div>
            )}

            {/* Quick Templates */}
            <div>
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <span>⚡ Quick Templates:</span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => applyTemplate("confirm")}
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-[#0F172A] text-[11px] font-medium rounded cursor-pointer transition-colors"
                >
                  📅 Confirm Discovery Call
                </button>
                <button
                  type="button"
                  onClick={() => applyTemplate("scoping")}
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-[#0F172A] text-[11px] font-medium rounded cursor-pointer transition-colors"
                >
                  📋 Request Scope Details
                </button>
                <button
                  type="button"
                  onClick={() => applyTemplate("nda")}
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-[#0F172A] text-[11px] font-medium rounded cursor-pointer transition-colors"
                >
                  📄 Mutual NDA
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">To Recipient Email *</label>
                <input
                  type="email"
                  value={toEmail}
                  onChange={(e) => setToEmail(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF] font-medium"
                  placeholder="client@example.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Subject Line *</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF] font-bold text-[#0F172A]"
                  placeholder="Re: Project Inquiry..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Email Message Body *</label>
                <textarea
                  rows={8}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full p-3 text-xs border border-gray-300 rounded outline-none focus:border-[#0052FF] font-mono leading-relaxed resize-vertical bg-gray-50/50"
                  placeholder="Type your reply message here..."
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoUpdateStatus}
                  onChange={(e) => setAutoUpdateStatus(e.target.checked)}
                  className="rounded text-[#0052FF] focus:ring-0"
                />
                <span>Automatically mark inquiry status as <strong>RESPONDED</strong> upon sending</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-gray-200 flex items-center justify-between flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setViewMode("details")}
                className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 rounded cursor-pointer"
              >
                ← Back
              </button>

              <div className="flex items-center gap-2">
                {/* 1-Click Gmail Button (Always Works for Gmail users) */}
                <button
                  type="button"
                  onClick={handleOpenGmailWeb}
                  className="px-3.5 py-1.5 bg-[#EA4335] hover:bg-[#D93025] text-white text-xs font-bold rounded shadow-xs cursor-pointer transition-colors flex items-center gap-1.5"
                  title="Opens Google Mail with recipient, subject & body pre-filled"
                >
                  <span>Open in Gmail</span>
                  <span>↗</span>
                </button>

                {/* Server SMTP Send */}
                <button
                  type="button"
                  disabled={isSending}
                  onClick={handleSendServerEmail}
                  className="px-4 py-1.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded shadow-xs cursor-pointer transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <span>{isSending ? "Sending..." : "Send via Mailer"}</span>
                  <span>📤</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 3: EMAIL & SMTP CONNECTION SETTINGS ("Connect kasy krna hy") */}
        {/* ============================================================ */}
        {viewMode === "settings" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] m-0">Connect Email &amp; SMTP Provider</h3>
                <p className="text-[11px] text-[#64748B] m-0">
                  Connect your Gmail, Outlook, or custom SMTP server to send live emails directly from the admin panel.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewMode("reply")}
                className="text-xs font-semibold text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {smtpStatusMsg && (
              <div
                className={`p-3 text-xs rounded-md border font-medium ${
                  smtpStatusMsg.isError
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                }`}
              >
                {smtpStatusMsg.text}
              </div>
            )}

            {/* Quick Provider Presets */}
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs">
              <span className="font-bold text-blue-900 block mb-1.5">⚡ Choose Your Provider:</span>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setSmtpHost("smtp.gmail.com");
                    setSmtpPort(465);
                  }}
                  className="px-2.5 py-1 bg-white border border-blue-300 hover:bg-blue-100 rounded text-blue-900 text-xs font-semibold cursor-pointer"
                >
                  Gmail (smtp.gmail.com : 465)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSmtpHost("smtp.office365.com");
                    setSmtpPort(587);
                  }}
                  className="px-2.5 py-1 bg-white border border-blue-300 hover:bg-blue-100 rounded text-blue-900 text-xs font-semibold cursor-pointer"
                >
                  Outlook / Office 365 (587)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSmtpHost("mail.creed-tech.com");
                    setSmtpPort(465);
                  }}
                  className="px-2.5 py-1 bg-white border border-blue-300 hover:bg-blue-100 rounded text-blue-900 text-xs font-semibold cursor-pointer"
                >
                  Custom Mail Server
                </button>
              </div>
            </div>

            {/* Instructions Callout */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900 leading-relaxed">
              <strong>💡 How to Connect Gmail:</strong><br />
              1. Go to your <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="underline font-bold text-amber-950">Google Account &gt; Security &gt; App Passwords</a>.<br />
              2. Generate an App Password for &ldquo;Creed Tech&rdquo; (16 letters).<br />
              3. Paste the 16-letter App Password below.
            </div>

            {/* Settings Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">SMTP Host *</label>
                <input
                  type="text"
                  value={smtpHost}
                  onChange={(e) => setSmtpHost(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded font-mono text-xs outline-none focus:border-[#0052FF]"
                  placeholder="smtp.gmail.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">SMTP Port *</label>
                <input
                  type="number"
                  value={smtpPort}
                  onChange={(e) => setSmtpPort(parseInt(e.target.value, 10) || 465)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded font-mono text-xs outline-none focus:border-[#0052FF]"
                  placeholder="465 or 587"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Username / Email Address *</label>
                <input
                  type="email"
                  value={smtpUser}
                  onChange={(e) => setSmtpUser(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-[#0052FF]"
                  placeholder="your-email@gmail.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Password / App Password *</label>
                <input
                  type="password"
                  value={smtpPass}
                  onChange={(e) => setSmtpPass(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded font-mono text-xs outline-none focus:border-[#0052FF]"
                  placeholder="16-letter App Password"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Sender Name</label>
                <input
                  type="text"
                  value={smtpFromName}
                  onChange={(e) => setSmtpFromName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-[#0052FF]"
                  placeholder="Creed Tech Enterprise"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">From Email Address</label>
                <input
                  type="email"
                  value={smtpFromEmail}
                  onChange={(e) => setSmtpFromEmail(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-[#0052FF]"
                  placeholder="contact@creed-tech.com"
                />
              </div>
            </div>

            {/* Settings Actions */}
            <div className="pt-3 border-t border-gray-200 flex items-center justify-between flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setViewMode("reply")}
                className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 rounded cursor-pointer"
              >
                ← Back to Reply
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isTestingSmtp}
                  onClick={handleTestSmtp}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded cursor-pointer transition-colors flex items-center gap-1 disabled:opacity-50"
                >
                  <span>🧪</span>
                  <span>{isTestingSmtp ? "Testing..." : "Test Connection"}</span>
                </button>

                <button
                  type="button"
                  disabled={isSavingSettings}
                  onClick={handleSaveSmtp}
                  className="px-4 py-1.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded shadow-xs cursor-pointer transition-colors disabled:opacity-50"
                >
                  {isSavingSettings ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
