"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAdminFetch } from "@/lib/useAdminFetch";
import { uploadImageFile } from "@/lib/uploadHelper";
import {
  EmailDepartmentProfile,
  DEFAULT_EMAIL_PROFILES,
  generateEmailHtml,
  ACCENT_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
  BG_COLOR_PRESETS,
} from "@/lib/email-types";
import { Inquiry } from "@/types/admin";
import InquiryDetailsModal from "../modals/InquiryDetailsModal";

interface EmailTemplatesModuleProps {
  showToast?: (msg: string, type?: "success" | "error") => void;
  onNavigateTab?: (tab: string) => void;
}

export default function EmailTemplatesModule({ showToast, onNavigateTab }: EmailTemplatesModuleProps) {
  const adminFetch = useAdminFetch();
  const [profiles, setProfiles] = useState<EmailDepartmentProfile[]>(DEFAULT_EMAIL_PROFILES);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("sales");
  const [editingProfile, setEditingProfile] = useState<EmailDepartmentProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [testEmailRecipient, setTestEmailRecipient] = useState("");
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Email Management Sub-Tabs & Inquiries State
  const [activeSubTab, setActiveSubTab] = useState<"desks" | "inquiries" | "smtp">("desks");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState<boolean>(false);
  const [inquirySearch, setInquirySearch] = useState<string>("");
  const [inquiryFilter, setInquiryFilter] = useState<"ALL" | "NEW" | "RESPONDED">("ALL");
  const [selectedInquiryForReply, setSelectedInquiryForReply] = useState<Inquiry | null>(null);

  // SMTP Settings State
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState(465);
  const [smtpSecure, setSmtpSecure] = useState(true);
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");
  const [smtpFromEmail, setSmtpFromEmail] = useState("");
  const [smtpFromName, setSmtpFromName] = useState("");
  const [isSmtpConfigured, setIsSmtpConfigured] = useState(false);
  const [isSavingSmtp, setIsSavingSmtp] = useState(false);
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);

  // File upload from computer handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProfile) return;
    try {
      setIsUploadingImage(true);
      const uploadedUrl = await uploadImageFile(file, adminFetch);
      if (uploadedUrl) {
        setEditingProfile({
          ...editingProfile,
          videoThumbnail: uploadedUrl,
        });
        if (showToast) showToast("✓ Image uploaded from computer successfully!");
      }
    } catch (err: any) {
      if (showToast) showToast("Upload failed: " + err.message, "error");
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Fetch profiles from database with de-duplication
  const loadProfiles = () => {
    adminFetch("/api/admin/email/profiles")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.profiles) && data.profiles.length > 0) {
          const uniqueList: EmailDepartmentProfile[] = [];
          const seenEmails = new Set<string>();
          const seenIds = new Set<string>();
          for (const p of data.profiles) {
            const emailKey = (p.email || "").trim().toLowerCase();
            if (p.id && emailKey && !seenEmails.has(emailKey) && !seenIds.has(p.id)) {
              seenEmails.add(emailKey);
              seenIds.add(p.id);
              uniqueList.push(p);
            }
          }
          const finalProfiles = uniqueList.length > 0 ? uniqueList : data.profiles;
          setProfiles(finalProfiles);
          if (!finalProfiles.some((p: EmailDepartmentProfile) => p.id === selectedProfileId)) {
            setSelectedProfileId(finalProfiles[0].id);
          }
        }
      })
      .catch(() => {});
  };

  // Fetch inquiries from database
  const fetchInquiries = useCallback(async () => {
    try {
      setIsLoadingInquiries(true);
      const res = await adminFetch("/api/admin/inquiries", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
      }
    } catch {
      // quiet catch
    } finally {
      setIsLoadingInquiries(false);
    }
  }, [adminFetch]);

  // Fetch SMTP Settings from database
  const fetchSmtpSettings = useCallback(async () => {
    try {
      const res = await adminFetch("/api/admin/email/settings");
      const data = await res.json();
      if (data.success && data.config) {
        setSmtpHost(data.config.host || "");
        setSmtpPort(data.config.port || 465);
        setSmtpSecure(data.config.secure !== false);
        setSmtpUser(data.config.user || "");
        setSmtpPass(data.config.pass || "");
        setSmtpFromEmail(data.config.from_email || "");
        setSmtpFromName(data.config.from_name || "Creed Tech Executive Desk");
        setIsSmtpConfigured(Boolean(data.config.isConfigured));
      }
    } catch {
      // quiet catch
    }
  }, [adminFetch]);

  useEffect(() => {
    loadProfiles();
    fetchInquiries();
    fetchSmtpSettings();
  }, [adminFetch, fetchInquiries, fetchSmtpSettings]);

  // Save SMTP Settings
  const handleSaveSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSavingSmtp(true);
      const res = await adminFetch("/api/admin/email/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: smtpHost,
          port: Number(smtpPort),
          secure: smtpSecure,
          user: smtpUser,
          pass: smtpPass,
          from_email: smtpFromEmail,
          from_name: smtpFromName,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsSmtpConfigured(data.isConfigured);
        if (showToast) showToast("✓ SMTP settings saved successfully!");
      } else {
        throw new Error(data.error || "Failed to save SMTP settings");
      }
    } catch (err: any) {
      if (showToast) showToast(`Error saving SMTP: ${err.message}`, "error");
    } finally {
      setIsSavingSmtp(false);
    }
  };

  // Test SMTP Connection
  const handleTestSmtp = async () => {
    try {
      setIsTestingSmtp(true);
      const res = await adminFetch("/api/admin/email/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: smtpHost,
          port: Number(smtpPort),
          secure: smtpSecure,
          user: smtpUser,
          pass: smtpPass,
          from_email: smtpFromEmail,
          from_name: smtpFromName,
          test_email: smtpUser || activeProfile.email,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (showToast) showToast("✓ SMTP Connection test successful! Server delivered test message.");
      } else {
        throw new Error(data.error || "SMTP test failed");
      }
    } catch (err: any) {
      if (showToast) showToast(`SMTP Test failed: ${err.message}`, "error");
    } finally {
      setIsTestingSmtp(false);
    }
  };

  const activeProfile =
    profiles.find((p) => p.id === selectedProfileId) || profiles[0] || DEFAULT_EMAIL_PROFILES[0];

  // Save / Update profile with strict duplicate prevention
  const handleSaveProfile = async (profileToSave: EmailDepartmentProfile) => {
    try {
      setIsSaving(true);

      const normalizedEmail = (profileToSave.email || "").trim().toLowerCase();
      if (!normalizedEmail || !normalizedEmail.includes("@")) {
        if (showToast) showToast("Please enter a valid email address.", "error");
        setIsSaving(false);
        return;
      }

      if (!profileToSave.name || !profileToSave.name.trim()) {
        if (showToast) showToast("Please provide a name for this business email profile.", "error");
        setIsSaving(false);
        return;
      }

      // Prevent duplicate email addresses across profiles
      const duplicateEmail = profiles.some(
        (p) => p.id !== profileToSave.id && (p.email || "").trim().toLowerCase() === normalizedEmail
      );
      if (duplicateEmail) {
        if (showToast) {
          showToast(
            `Business email "${profileToSave.email}" already exists. Duplicate email profiles are not allowed.`,
            "error"
          );
        }
        setIsSaving(false);
        return;
      }

      const exists = profiles.some((p) => p.id === profileToSave.id);
      const updatedList = exists
        ? profiles.map((p) => (p.id === profileToSave.id ? profileToSave : p))
        : [...profiles, profileToSave];

      const res = await adminFetch("/api/admin/email/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profiles: updatedList }),
      });

      const data = await res.json();
      if (data.success) {
        setProfiles(data.profiles || updatedList);
        setSelectedProfileId(profileToSave.id);
        setEditingProfile(null);
        if (showToast) showToast(`✓ Email profile "${profileToSave.name}" saved successfully!`);
      } else {
        throw new Error(data.error || "Failed to save profile");
      }
    } catch (err: any) {
      if (showToast) showToast(`Error: ${err.message}`, "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete profile
  const handleDeleteProfile = async (profileId: string) => {
    if (profiles.length <= 1) {
      if (showToast) showToast("At least one business email profile must remain.", "error");
      return;
    }

    const target = profiles.find((p) => p.id === profileId);
    if (!window.confirm(`Are you sure you want to delete profile "${target?.name || profileId}"?`)) {
      return;
    }

    try {
      const updatedList = profiles.filter((p) => p.id !== profileId);
      const res = await adminFetch("/api/admin/email/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profiles: updatedList }),
      });

      const data = await res.json();
      if (data.success) {
        setProfiles(data.profiles || updatedList);
        if (selectedProfileId === profileId) {
          setSelectedProfileId(updatedList[0]?.id || "sales");
        }
        if (showToast) showToast(`✓ Profile deleted.`);
      }
    } catch (err: any) {
      if (showToast) showToast(`Error: ${err.message}`, "error");
    }
  };

  // Send Test Email
  const handleSendTestEmail = async () => {
    if (!testEmailRecipient || !testEmailRecipient.includes("@")) {
      if (showToast) showToast("Please enter a valid recipient email for the test.", "error");
      return;
    }

    try {
      setIsSendingTest(true);
      const res = await adminFetch("/api/admin/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: testEmailRecipient,
          subject: `Test Broadcast from ${activeProfile.name}`,
          message: `This is a live test broadcast demonstrating the branded formatting for ${activeProfile.name} (${activeProfile.email}).\n\nAll layout cards, address details, direct signatures, and video presentation blocks are verified and active.`,
          profileId: activeProfile.id,
          fromEmail: activeProfile.email,
          fromName: activeProfile.name,
          clientName: "Enterprise Client",
          service: "Technical Architecture",
          updateStatus: false,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (showToast) {
          showToast(
            data.delivered
              ? `✓ Test email delivered to ${testEmailRecipient} via ${activeProfile.email}!`
              : `✓ Test triggered! ${data.message}`
          );
        }
      } else {
        throw new Error(data.error || data.message || "Failed to send test email");
      }
    } catch (err: any) {
      if (showToast) showToast(`Failed: ${err.message}`, "error");
    } finally {
      setIsSendingTest(false);
    }
  };

  // Copy Styled HTML to clipboard
  const handleCopyStyledHtml = async (profile: EmailDepartmentProfile) => {
    const htmlContent = generateEmailHtml(profile, {
      clientName: "Enterprise Client",
      message: (profile.defaultMessageTemplate || "Hello Client,\n\nThank you for reaching out.")
        .replace("{client_name}", "Enterprise Client")
        .replace("{service}", "Enterprise Solutions")
        .replace("{id}", "101"),
      subject: (profile.defaultSubjectTemplate || "Re: Creed Tech Discovery")
        .replace("{service}", "Enterprise Solutions")
        .replace("{id}", "101"),
      inquiryId: 101,
      service: "Enterprise Solutions",
    });

    try {
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard && navigator.clipboard.write) {
        const blobHtml = new Blob([htmlContent], { type: "text/html" });
        const blobText = new Blob([profile.defaultMessageTemplate || ""], { type: "text/plain" });
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": blobHtml,
            "text/plain": blobText,
          }),
        ]);
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(htmlContent);
      }
      if (showToast) {
        showToast("✓ Styled layout copied to clipboard! Paste (Ctrl+V) directly into Gmail or Outlook.");
      }
    } catch {
      if (showToast) showToast("Copied to clipboard.");
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryFilter === "NEW" && inq.status !== "NEW" && inq.status !== "PENDING") return false;
    if (inquiryFilter === "RESPONDED" && inq.status !== "RESPONDED" && inq.status !== "RESOLVED") return false;
    if (!inquirySearch.trim()) return true;
    const q = inquirySearch.toLowerCase();
    return (
      (inq.client_name && inq.client_name.toLowerCase().includes(q)) ||
      (inq.email && inq.email.toLowerCase().includes(q)) ||
      (inq.company && inq.company.toLowerCase().includes(q)) ||
      (inq.service && inq.service.toLowerCase().includes(q)) ||
      (inq.project_details && inq.project_details.toLowerCase().includes(q)) ||
      String(inq.id).includes(q)
    );
  });

  const isEditingEmailDuplicate = Boolean(
    editingProfile &&
    editingProfile.email &&
    profiles.some(
      (p) => p.id !== editingProfile.id && (p.email || "").trim().toLowerCase() === (editingProfile.email || "").trim().toLowerCase()
    )
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A] border border-[#1E293B] rounded-xl p-5 text-white">
        <div>
          <h2 className="text-xl font-bold tracking-tight m-0 flex items-center gap-2">
            <span>✉️</span>
            <span>Enterprise Email Management &amp; Operations</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">
            Centralized operations hub to manage multi-department business emails (support@, security@, solutions@, desk5@), custom branded HTML formats, SMTP connection, and replying to client inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Main Action Button for replying to inquiries */}
          <button
            type="button"
            onClick={() => {
              setActiveSubTab("inquiries");
              const pending = inquiries.find((i) => i.status === "NEW" || i.status === "PENDING");
              if (pending) {
                setSelectedInquiryForReply(pending);
              }
            }}
            className="px-4 py-2 bg-gradient-to-r from-[#0052FF] to-blue-600 hover:from-[#0042D0] hover:to-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-2 shadow-md shrink-0 ring-1 ring-blue-400/40"
            title="Open incoming client inquiries to send branded replies"
          >
            <span>💬</span>
            <span>Reply to Inquiries</span>
            {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950 shadow-xs animate-pulse">
                {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length} New
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              const existingEmails = new Set(profiles.map((p) => (p.email || "").trim().toLowerCase()));
              let count = profiles.length + 1;
              let nextEmail = `desk${count}@creed-tech.com`;
              while (existingEmails.has(nextEmail.toLowerCase())) {
                count++;
                nextEmail = `desk${count}@creed-tech.com`;
              }
              const nextName = `Creed Tech Desk ${count}`;

              setEditingProfile({
                id: "dept_" + Date.now().toString(36),
                name: nextName,
                email: nextEmail,
                department: "Client Services",
                accentColor: "#FF6B00",
                phone: "+1 (888) 492-7330",
                address: "Creed Tech Global Headquarters, 450 Innovation Parkway, San Francisco, CA",
                videoUrl: "https://creed-tech.com",
                videoThumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
                videoTitle: "Watch: Architecture Overview",
                footerDisclaimer: "Creed Tech Sovereign Enterprise Systems. All rights reserved.",
                defaultSubjectTemplate: "Re: Creed Tech Discovery - {service} [Inquiry #{id}]",
                defaultMessageTemplate: `Dear {client_name},\n\nThank you for reaching out to Creed Tech regarding "{service}".\n\nBest regards,\nCreed Tech Team`,
              });
            }}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>➕</span>
            <span>Add Business Email</span>
          </button>
        </div>
      </div>

      {/* Quick Status Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setActiveSubTab("desks")}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            activeSubTab === "desks"
              ? "bg-[#0052FF]/10 border-[#0052FF] shadow-xs"
              : "bg-[#0F172A] border-[#1E293B] hover:border-gray-600"
          }`}
        >
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <span>🏢</span>
            <span>Business Desks</span>
          </div>
          <div className="text-xl font-black text-white">{profiles.length}</div>
          <div className="text-[10px] text-gray-400 mt-0.5 font-medium">Configured Email Profiles</div>
        </div>

        <div
          onClick={() => setActiveSubTab("inquiries")}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            activeSubTab === "inquiries"
              ? "bg-[#0052FF]/10 border-[#0052FF] shadow-xs"
              : "bg-[#0F172A] border-[#1E293B] hover:border-gray-600"
          }`}
        >
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <span>💬</span>
            <span>Client Inquiries</span>
          </div>
          <div className="text-xl font-black text-white">{inquiries.length}</div>
          <div className="text-[10px] text-gray-400 mt-0.5 font-medium">Total Inbound Leads</div>
        </div>

        <div
          onClick={() => {
            setActiveSubTab("inquiries");
            setInquiryFilter("NEW");
          }}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length > 0
              ? "bg-amber-950/30 border-amber-500/40 hover:border-amber-400"
              : "bg-[#0F172A] border-[#1E293B] hover:border-gray-600"
          }`}
        >
          <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <span>⏳</span>
            <span>Pending Replies</span>
          </div>
          <div className="text-xl font-black text-amber-300">
            {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length}
          </div>
          <div className="text-[10px] text-amber-300/80 mt-0.5 font-medium">Ready for immediate response</div>
        </div>

        <div
          onClick={() => setActiveSubTab("smtp")}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            activeSubTab === "smtp"
              ? "bg-[#0052FF]/10 border-[#0052FF] shadow-xs"
              : "bg-[#0F172A] border-[#1E293B] hover:border-gray-600"
          }`}
        >
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <span>⚙️</span>
            <span>SMTP Server</span>
          </div>
          <div className="text-sm font-bold flex items-center gap-1.5 mt-1 text-white">
            <span
              className={`w-2.5 h-2.5 rounded-full inline-block ${
                isSmtpConfigured ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
            <span>{isSmtpConfigured ? "Connected" : "Local Mode"}</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-1 font-medium font-mono truncate">
            {smtpHost || "mail.server"}
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 bg-[#0F172A] border border-[#1E293B] p-2 rounded-xl text-xs font-semibold overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveSubTab("desks")}
          className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === "desks"
              ? "bg-[#0052FF] text-white font-bold shadow-xs"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <span>🏢</span>
          <span>Business Email Desks &amp; Formats ({profiles.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("inquiries")}
          className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === "inquiries"
              ? "bg-[#0052FF] text-white font-bold shadow-xs"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <span>💬</span>
          <span>Client Inquiries &amp; Quick Reply</span>
          {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length > 0 ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950">
              {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length} New
            </span>
          ) : (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-medium bg-gray-800 text-gray-400">
              {inquiries.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("smtp")}
          className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === "smtp"
              ? "bg-[#0052FF] text-white font-bold shadow-xs"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <span>⚙️</span>
          <span>SMTP Server Settings</span>
          <span
            className={`w-2 h-2 rounded-full inline-block ${
              isSmtpConfigured ? "bg-emerald-400" : "bg-amber-400"
            }`}
            title={isSmtpConfigured ? "SMTP Connected" : "Local Mode"}
          />
        </button>
      </div>

      {/* MODAL: VISUAL DESIGNER FOR ADD / EDIT */}
      {editingProfile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-[#111827] rounded-xl border border-gray-200 max-w-5xl w-full p-6 shadow-2xl relative text-left my-8 max-h-[92vh] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <h3 className="text-base font-bold text-gray-900 m-0">
                  {profiles.some((p) => p.id === editingProfile.id)
                    ? `Visual Designer: ${editingProfile.name}`
                    : "Design New Business Email Profile"}
                </h3>
                <span className="text-xs text-gray-500">
                  Customize colors, picture banners, video demo, address, and live preview.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEditingProfile(null)}
                className="text-sm font-bold text-gray-400 hover:text-gray-900 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Split Screen Designer */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-4 max-h-[calc(90vh-130px)] overflow-y-auto pr-2">
              {/* Controls (6 Cols) */}
              <div className="md:col-span-6 flex flex-col gap-3">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    1. Identity &amp; Colors
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Profile Name *</label>
                      <input
                        type="text"
                        value={editingProfile.name}
                        onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded font-medium outline-none focus:border-[#0052FF] bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Department Tag *</label>
                      <input
                        type="text"
                        value={editingProfile.department}
                        onChange={(e) => setEditingProfile({ ...editingProfile, department: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded font-medium outline-none focus:border-[#0052FF] bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Sender Email *</label>
                      <input
                        type="email"
                        value={editingProfile.email}
                        onChange={(e) => setEditingProfile({ ...editingProfile, email: e.target.value })}
                        className={`w-full px-2.5 py-1 text-xs border rounded font-mono outline-none bg-white ${
                          isEditingEmailDuplicate ? "border-red-500 focus:border-red-600 ring-1 ring-red-400" : "border-gray-300 focus:border-[#0052FF]"
                        }`}
                        placeholder="e.g. desk@creed-tech.com"
                      />
                      {isEditingEmailDuplicate && (
                        <span className="text-[10px] text-red-600 font-bold block mt-1 flex items-center gap-1">
                          <span>⚠️</span>
                          <span>This business email already exists in another profile. Duplicate email formats are not allowed.</span>
                        </span>
                      )}
                    </div>
                    {/* 1. BRAND ACCENT COLOR PALETTE */}
                    <div className="sm:col-span-2 pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                          <span>✨ Brand Accent Color</span>
                          <span className="text-[9px] font-normal text-gray-500">(Buttons, Links, Borders)</span>
                        </label>
                        <span className="text-[10px] font-mono text-gray-600 font-semibold">{editingProfile.accentColor || "#FF6B00"}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {ACCENT_COLOR_PRESETS.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, accentColor: c })}
                            className="w-5 h-5 rounded-full cursor-pointer transition-transform hover:scale-110 shadow-xs"
                            style={{
                              backgroundColor: c,
                              border: editingProfile.accentColor === c ? "2px solid #0052FF" : "1px solid #d1d5db",
                              boxShadow: editingProfile.accentColor === c ? "0 0 0 2px rgba(0,82,255,0.3)" : "none",
                            }}
                            title={c}
                          />
                        ))}
                        <input
                          type="color"
                          value={editingProfile.accentColor || "#FF6B00"}
                          onChange={(e) => setEditingProfile({ ...editingProfile, accentColor: e.target.value })}
                          className="w-6 h-6 rounded cursor-pointer border border-gray-300 p-0 ml-1"
                          title="Custom Color Wheel / Palette"
                        />
                        <input
                          type="text"
                          value={editingProfile.accentColor || ""}
                          onChange={(e) => setEditingProfile({ ...editingProfile, accentColor: e.target.value })}
                          className="w-20 px-2 py-0.5 text-[11px] border border-gray-300 rounded font-mono outline-none bg-white focus:border-[#0052FF]"
                          placeholder="#FF6B00"
                        />
                      </div>
                    </div>

                    {/* 2. TEXT COLOR PALETTE (TXT COLOR PLATE PORI HO) */}
                    <div className="sm:col-span-2 pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                          <span>🔤 Text Color Palette</span>
                          <span className="text-[9px] font-normal text-gray-500">(Headings, Message &amp; Name)</span>
                        </label>
                        <span className="text-[10px] font-mono text-gray-600 font-semibold">{editingProfile.textColor || "#1E293B"}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {TEXT_COLOR_PRESETS.map((item) => (
                          <button
                            key={item.color}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, textColor: item.color })}
                            className="w-5 h-5 rounded-full cursor-pointer transition-transform hover:scale-110 shadow-xs"
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
                          className="w-6 h-6 rounded cursor-pointer border border-gray-300 p-0 ml-1"
                          title="Custom Color Wheel / Palette"
                        />
                        <input
                          type="text"
                          value={editingProfile.textColor || "#1E293B"}
                          onChange={(e) => setEditingProfile({ ...editingProfile, textColor: e.target.value })}
                          className="w-20 px-2 py-0.5 text-[11px] border border-gray-300 rounded font-mono outline-none bg-white focus:border-[#0052FF]"
                          placeholder="#1E293B"
                        />
                      </div>
                    </div>

                    {/* 3. BACKGROUND COLOR PALETTE (BACKGROUND COLOR PLATE) */}
                    <div className="sm:col-span-2 pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                          <span>🎨 Background Color Palette</span>
                          <span className="text-[9px] font-normal text-gray-500">(Email Card &amp; Canvas)</span>
                        </label>
                        <span className="text-[10px] font-mono text-gray-600 font-semibold">{editingProfile.backgroundColor || "#FFFFFF"}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {BG_COLOR_PRESETS.map((item) => (
                          <button
                            key={item.color}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, backgroundColor: item.color })}
                            className="w-5 h-5 rounded-full cursor-pointer transition-transform hover:scale-110 shadow-xs"
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
                          className="w-6 h-6 rounded cursor-pointer border border-gray-300 p-0 ml-1"
                          title="Custom Color Wheel / Palette"
                        />
                        <input
                          type="text"
                          value={editingProfile.backgroundColor || "#FFFFFF"}
                          onChange={(e) => setEditingProfile({ ...editingProfile, backgroundColor: e.target.value })}
                          className="w-20 px-2 py-0.5 text-[11px] border border-gray-300 rounded font-mono outline-none bg-white focus:border-[#0052FF]"
                          placeholder="#FFFFFF"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                      2. Picture Banner &amp; Video Presentation
                    </span>
                    {/* Hidden file input for uploading from computer */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <button
                      type="button"
                      disabled={isUploadingImage}
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 bg-white hover:bg-gray-100 text-[#0052FF] border border-[#0052FF]/30 text-[11px] font-bold rounded shadow-xs cursor-pointer flex items-center gap-1 transition-colors"
                      title="Upload image or thumbnail directly from your computer"
                    >
                      <span>{isUploadingImage ? "⏳ Uploading..." : "📁 Upload from Computer"}</span>
                    </button>
                  </div>

                  <div className="mb-2">
                    <label className="block text-[10px] font-semibold text-gray-600 mb-1">
                      Choose Preset Image Banner (or upload from computer above):
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {[
                        { label: "🏢 Corporate HQ", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" },
                        { label: "💻 Cloud Systems", url: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop" },
                        { label: "🛡️ Cyber Vault", url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop" },
                        { label: "🤝 Support Team", url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop" },
                      ].map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => setEditingProfile({ ...editingProfile, videoThumbnail: item.url })}
                          className={`p-1 text-[10px] font-medium rounded border text-left cursor-pointer transition-colors ${
                            editingProfile.videoThumbnail === item.url
                              ? "bg-blue-100 text-blue-900 border-blue-400 font-bold"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Video / Demo Link URL</label>
                      <input
                        type="text"
                        value={editingProfile.videoUrl || ""}
                        onChange={(e) => setEditingProfile({ ...editingProfile, videoUrl: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded font-mono outline-none bg-white"
                        placeholder="https://creed-tech.com/portfolio or YouTube link"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Video / Presentation Title</label>
                      <input
                        type="text"
                        value={editingProfile.videoTitle || ""}
                        onChange={(e) => setEditingProfile({ ...editingProfile, videoTitle: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded outline-none bg-white"
                        placeholder="Watch: Architecture Overview"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Custom Image / Thumbnail URL</label>
                      <input
                        type="text"
                        value={editingProfile.videoThumbnail || ""}
                        onChange={(e) => setEditingProfile({ ...editingProfile, videoThumbnail: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded font-mono outline-none bg-white"
                        placeholder="Paste image URL or upload from computer..."
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: LAYOUT POSITION & ALIGNMENT */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    3. Layout Style, Position &amp; Alignment
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* Quick 1-Click Master Alignment */}
                    <div className="sm:col-span-2 bg-blue-50/80 border border-blue-200 rounded-md p-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                          <span>⚡ One-Click Align All (Logo, Headings &amp; Text)</span>
                        </label>
                        <span className="text-[9px] text-blue-700 font-medium">Aligns logo, title &amp; all text together</span>
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
                              className={`flex-1 py-1 px-2 text-[10px] font-bold rounded border cursor-pointer transition-all ${
                                isAllActive
                                  ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100/60"
                              }`}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Media / Video Position */}
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-1">
                        Banner / Video Position (Oper, Center, Nechy)
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
                            className={`flex-1 py-1 px-1.5 text-[10px] rounded font-semibold border cursor-pointer transition-colors ${
                              (editingProfile.mediaPosition || "center") === item.id
                                ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Media Alignment */}
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-1">
                        Banner Alignment (Left, Center, Right)
                      </label>
                      <div className="flex gap-1.5">
                        {[
                          { id: "left", label: "⬅️ Left Side" },
                          { id: "center", label: "⏺️ Center" },
                          { id: "right", label: "➡️ Right Side" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, mediaAlignment: item.id as any })}
                            className={`flex-1 py-1 px-1.5 text-[10px] rounded font-semibold border cursor-pointer transition-colors ${
                              (editingProfile.mediaAlignment || "center") === item.id
                                ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Logo & Header Alignment */}
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-1">
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
                            className={`flex-1 py-1 px-1 text-[10px] rounded font-semibold border cursor-pointer transition-colors ${
                              (editingProfile.headerAlignment || (editingProfile.headerStyle === "centered" ? "center" : "left")) === item.id
                                ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Headings & Text Alignment */}
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-1">
                        Headings &amp; Body Text Alignment (Left, Center, Right)
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
                            className={`flex-1 py-1 px-1 text-[10px] rounded font-semibold border cursor-pointer transition-colors ${
                              (editingProfile.contentAlignment || "left") === item.id
                                ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Header Theme */}
                    <div className="sm:col-span-2 pt-1 border-t border-gray-200">
                      <label className="block text-[10px] font-semibold text-gray-600 mb-1">
                        Header Background Theme
                      </label>
                      <div className="flex gap-1.5">
                        {[
                          { id: "dark", label: "⬛ Dark Enterprise" },
                          { id: "light", label: "⬜ Clean Light" },
                          { id: "centered", label: "👑 Centered Brand" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setEditingProfile({ ...editingProfile, headerStyle: item.id as any })}
                            className={`flex-1 py-1 px-1 text-[10px] rounded font-semibold border cursor-pointer transition-colors ${
                              (editingProfile.headerStyle || "dark") === item.id
                                ? "bg-[#0052FF] text-white border-[#0052FF] shadow-xs"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Live Preview & Templates (6 Cols) */}
              <div className="md:col-span-6 flex flex-col gap-3">
                <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span>👁️ Real-time Email Preview</span>
                    <span className="text-[10px] text-emerald-600 font-medium">● Live</span>
                  </span>
                  <span className="text-[10px] text-gray-400">Position: {editingProfile.mediaPosition || "center"}</span>
                </span>

                <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                  {/* Dynamic Header Style & Alignment */}
                  {(() => {
                    const isLight = editingProfile.headerStyle === "light";
                    const hAlign = editingProfile.headerAlignment || (editingProfile.headerStyle === "centered" ? "center" : "left");
                    const hBg = isLight ? "#ffffff" : "#090d16";
                    const hText = isLight ? "#090d16" : "#ffffff";
                    const hSubtext = isLight ? "#64748b" : "#94a3b8";
                    const badgeBg = isLight ? "#f1f5f9" : "rgba(255,255,255,0.08)";
                    const badgeText = isLight ? "#475569" : "#cbd5e1";
                    const badgeBorder = isLight ? "#e2e8f0" : "rgba(255,255,255,0.15)";

                    if (hAlign === "center") {
                      return (
                        <div
                          className="p-3.5 text-center"
                          style={{
                            backgroundColor: hBg,
                            borderBottom: `3px solid ${editingProfile.accentColor || "#FF6B00"}`,
                          }}
                        >
                          <div className="text-sm font-black tracking-wider" style={{ color: hText }}>
                            CREED <span style={{ color: editingProfile.accentColor || "#FF6B00" }}>TECH</span>
                          </div>
                          <div className="text-[9px] uppercase tracking-widest font-semibold mt-0.5" style={{ color: hSubtext }}>
                            {editingProfile.department}
                          </div>
                          <div className="mt-1.5">
                            <span
                              className="px-2 py-0.5 rounded-full text-[9px] font-bold inline-block"
                              style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
                            >
                              PREVIEW
                            </span>
                          </div>
                        </div>
                      );
                    }

                    if (hAlign === "right") {
                      return (
                        <div
                          className="p-3.5 flex items-center justify-between"
                          style={{
                            backgroundColor: hBg,
                            borderBottom: `3px solid ${editingProfile.accentColor || "#FF6B00"}`,
                          }}
                        >
                          <span
                            className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                            style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
                          >
                            PREVIEW
                          </span>
                          <div className="text-right">
                            <div className="text-sm font-black tracking-wider" style={{ color: hText }}>
                              CREED <span style={{ color: editingProfile.accentColor || "#FF6B00" }}>TECH</span>
                            </div>
                            <div className="text-[9px] uppercase tracking-widest font-semibold mt-0.5" style={{ color: hSubtext }}>
                              {editingProfile.department}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        className="p-3.5 flex items-center justify-between"
                        style={{
                          backgroundColor: hBg,
                          borderBottom: `3px solid ${editingProfile.accentColor || "#FF6B00"}`,
                        }}
                      >
                        <div className="text-left">
                          <div className="text-sm font-black tracking-wider" style={{ color: hText }}>
                            CREED <span style={{ color: editingProfile.accentColor || "#FF6B00" }}>TECH</span>
                          </div>
                          <div className="text-[9px] uppercase tracking-widest font-semibold mt-0.5" style={{ color: hSubtext }}>
                            {editingProfile.department}
                          </div>
                        </div>
                        <span
                          className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                          style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
                        >
                          PREVIEW
                        </span>
                      </div>
                    );
                  })()}

                  <div
                    className={`p-4 text-xs leading-relaxed transition-colors ${
                      editingProfile.contentAlignment === "center"
                        ? "text-center"
                        : editingProfile.contentAlignment === "right"
                        ? "text-right"
                        : "text-left"
                    }`}
                    style={{
                      backgroundColor: editingProfile.backgroundColor || "#FFFFFF",
                      color: editingProfile.textColor || "#1E293B",
                    }}
                  >
                    <p
                      className="font-semibold mb-1 text-[11px]"
                      style={{ color: editingProfile.textColor || "#1E293B" }}
                    >
                      {editingProfile.defaultSubjectTemplate
                        ? editingProfile.defaultSubjectTemplate.replace("{service}", "Enterprise Solutions").replace("{id}", "101")
                        : "Re: Inquiry"}
                    </p>

                    {/* TOP POSITION MEDIA */}
                    {editingProfile.mediaPosition === "top" && editingProfile.videoThumbnail && (
                      <div
                        className={`my-3 bg-gray-900 rounded-md overflow-hidden border border-gray-200 text-left ${
                          editingProfile.mediaAlignment === "left"
                            ? "max-w-[240px] mr-auto"
                            : editingProfile.mediaAlignment === "right"
                            ? "max-w-[240px] ml-auto"
                            : "w-full"
                        }`}
                      >
                        <div className="relative">
                          <img
                            src={editingProfile.videoThumbnail}
                            alt="Video Thumbnail"
                            className="w-full h-24 object-cover opacity-85"
                          />
                          <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md text-xs"
                            style={{ backgroundColor: editingProfile.accentColor || "#FF6B00" }}
                          >
                            ▶
                          </div>
                        </div>
                        <div className="p-2 bg-[#0b1120] text-white flex items-center justify-between text-[10px]">
                          <span className="font-semibold truncate max-w-[150px]">
                            {editingProfile.videoTitle || "Watch Presentation"}
                          </span>
                          <span className="font-bold shrink-0" style={{ color: editingProfile.accentColor }}>
                            Watch ↗
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Message Body */}
                    <div
                      className="whitespace-pre-wrap font-sans text-[11px] p-2.5 rounded border leading-relaxed"
                      style={{
                        color: editingProfile.textColor || "#1E293B",
                        backgroundColor: (editingProfile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#0") || (editingProfile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#1")
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.02)",
                        borderColor: (editingProfile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#0") || (editingProfile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#1")
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      {(editingProfile.defaultMessageTemplate || "Hello Client,\n\nThank you for reaching out.")
                        .replace("{client_name}", "Valued Client")
                        .replace("{service}", "Enterprise Solutions")}
                    </div>

                    {/* CENTER POSITION MEDIA (DEFAULT) */}
                    {(editingProfile.mediaPosition || "center") === "center" && editingProfile.videoThumbnail && (
                      <div
                        className={`my-3 bg-gray-900 rounded-md overflow-hidden border border-gray-200 text-left ${
                          editingProfile.mediaAlignment === "left"
                            ? "max-w-[240px] mr-auto"
                            : editingProfile.mediaAlignment === "right"
                            ? "max-w-[240px] ml-auto"
                            : "w-full"
                        }`}
                      >
                        <div className="relative">
                          <img
                            src={editingProfile.videoThumbnail}
                            alt="Video Thumbnail"
                            className="w-full h-24 object-cover opacity-85"
                          />
                          <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md text-xs"
                            style={{ backgroundColor: editingProfile.accentColor || "#FF6B00" }}
                          >
                            ▶
                          </div>
                        </div>
                        <div className="p-2 bg-[#0b1120] text-white flex items-center justify-between text-[10px]">
                          <span className="font-semibold truncate max-w-[150px]">
                            {editingProfile.videoTitle || "Watch Presentation"}
                          </span>
                          <span className="font-bold shrink-0" style={{ color: editingProfile.accentColor }}>
                            Watch ↗
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Signature */}
                    <div className="mt-3 pt-2.5 border-t border-gray-100 text-[11px]">
                      <div className="font-bold" style={{ color: editingProfile.textColor || "#1E293B" }}>{editingProfile.name}</div>
                      <div className="text-[10px] text-gray-500 font-medium mt-0.5">
                        <span style={{ color: editingProfile.accentColor }}>{editingProfile.email}</span>
                        {editingProfile.phone && ` • Tel: ${editingProfile.phone}`}
                      </div>
                    </div>

                    {/* BOTTOM POSITION MEDIA */}
                    {editingProfile.mediaPosition === "bottom" && editingProfile.videoThumbnail && (
                      <div
                        className={`my-3 bg-gray-900 rounded-md overflow-hidden border border-gray-200 text-left ${
                          editingProfile.mediaAlignment === "left"
                            ? "max-w-[240px] mr-auto"
                            : editingProfile.mediaAlignment === "right"
                            ? "max-w-[240px] ml-auto"
                            : "w-full"
                        }`}
                      >
                        <div className="relative">
                          <img
                            src={editingProfile.videoThumbnail}
                            alt="Video Thumbnail"
                            className="w-full h-24 object-cover opacity-85"
                          />
                          <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md text-xs"
                            style={{ backgroundColor: editingProfile.accentColor || "#FF6B00" }}
                          >
                            ▶
                          </div>
                        </div>
                        <div className="p-2 bg-[#0b1120] text-white flex items-center justify-between text-[10px]">
                          <span className="font-semibold truncate max-w-[150px]">
                            {editingProfile.videoTitle || "Watch Presentation"}
                          </span>
                          <span className="font-bold shrink-0" style={{ color: editingProfile.accentColor }}>
                            Watch ↗
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className={`bg-gray-50 p-3 border-t border-gray-200 text-[9px] text-gray-500 leading-relaxed ${
                      editingProfile.contentAlignment === "center"
                        ? "text-center"
                        : editingProfile.contentAlignment === "right"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {editingProfile.address && (
                      <div className="mb-0.5">
                        <strong>Headquarters:</strong> {editingProfile.address}
                      </div>
                    )}
                    <div>
                      <strong>Web:</strong> https://creed-tech.com • <strong>Desk:</strong> {editingProfile.email}
                    </div>
                    {editingProfile.footerDisclaimer && (
                      <div className="mt-1.5 pt-1.5 border-t border-gray-200 text-[8px] text-gray-400">
                        {editingProfile.footerDisclaimer}
                      </div>
                    )}
                  </div>
                </div>

                {/* SECTION 4: ADDRESS, PHONE & LEGAL (RIGHT SIDE UNDER IMAGE / PREVIEW) */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    4. Address, Phone &amp; Legal
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Direct Phone</label>
                      <input
                        type="text"
                        value={editingProfile.phone || ""}
                        onChange={(e) => setEditingProfile({ ...editingProfile, phone: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded outline-none bg-white"
                        placeholder="+1 (888) 492-7330"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Office Address</label>
                      <input
                        type="text"
                        value={editingProfile.address || ""}
                        onChange={(e) => setEditingProfile({ ...editingProfile, address: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded outline-none bg-white"
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Footer Disclaimer</label>
                      <input
                        type="text"
                        value={editingProfile.footerDisclaimer || ""}
                        onChange={(e) => setEditingProfile({ ...editingProfile, footerDisclaimer: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded outline-none bg-white"
                        placeholder="This communication is confidential..."
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 5: DEFAULT SUBJECT & MESSAGE TEMPLATE (RIGHT SIDE UNDER IMAGE / PREVIEW) */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    5. Default Subject &amp; Message Template
                  </span>
                  <div className="flex flex-col gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Subject Template (uses &#123;service&#125; &amp; &#123;id&#125;)</label>
                      <input
                        type="text"
                        value={editingProfile.defaultSubjectTemplate || ""}
                        onChange={(e) => setEditingProfile({ ...editingProfile, defaultSubjectTemplate: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-gray-300 rounded outline-none font-medium bg-white"
                        placeholder="Re: Creed Tech Discovery - {service} [Inquiry #{id}]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">Message Template Body</label>
                      <textarea
                        rows={3}
                        value={editingProfile.defaultMessageTemplate || ""}
                        onChange={(e) => setEditingProfile({ ...editingProfile, defaultMessageTemplate: e.target.value })}
                        className="w-full p-2 text-xs border border-gray-300 rounded font-mono outline-none bg-white"
                        placeholder="Dear {client_name}, ..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setEditingProfile(null)}
                className="px-4 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSaving || isEditingEmailDuplicate || !editingProfile.email || !editingProfile.name}
                onClick={() => handleSaveProfile(editingProfile)}
                className="px-5 py-1.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded-md shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isSaving ? "Saving..." : isEditingEmailDuplicate ? "Duplicate Email Detected" : "Save Profile & Design"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Profiles List on Left (5 Cols), Active Profile Preview & Test on Right (7 Cols) */}
      {activeSubTab === "desks" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Side: Profiles Cards (5 Cols) */}
          <div className="md:col-span-5 flex flex-col gap-3">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Active Email Profiles ({profiles.length})
          </div>

          <div className="flex flex-col gap-3">
            {profiles.map((p) => {
              const isSelected = p.id === selectedProfileId;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProfileId(p.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white text-gray-900 border-gray-400 shadow-md ring-2 ring-[#0052FF]"
                      : "bg-[#0F172A] text-gray-200 border-[#1E293B] hover:border-gray-600 hover:bg-[#131C31]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs shrink-0"
                        style={{ backgroundColor: p.accentColor }}
                      >
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-sm ${isSelected ? 'text-gray-900' : 'text-white'}`}>
                            {p.name}
                          </span>
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-semibold text-white"
                            style={{ backgroundColor: p.accentColor }}
                          >
                            {p.department}
                          </span>
                        </div>
                        <div className={`font-mono text-xs mt-0.5 ${isSelected ? 'text-gray-600' : 'text-gray-400'}`}>
                          {p.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => setEditingProfile(p)}
                        className="px-2.5 py-1 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 rounded font-semibold text-xs cursor-pointer shadow-xs"
                        title="Edit design format, images & address"
                      >
                        ✏️ Edit
                      </button>
                      {profiles.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteProfile(p.id)}
                          className="px-2.5 py-1 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded font-semibold text-xs cursor-pointer"
                          title="Delete profile"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>

                  <div className={`mt-2 pt-2 border-t text-[11px] flex items-center justify-between ${isSelected ? 'border-gray-200 text-gray-500' : 'border-[#1E293B] text-gray-400'}`}>
                    <span>{p.phone || "No direct phone"}</span>
                    <span>{p.videoThumbnail ? "🎬 Has Video Demo" : "No Media"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Profile Detailed View & Test (7 Cols) */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <span>Live Preview &amp; Actions for:</span>
              <strong className="text-white normal-case font-bold">{activeProfile.name}</strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingProfile(activeProfile)}
                className="px-3 py-1 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded cursor-pointer transition-colors flex items-center gap-1 shadow-xs"
              >
                <span>✏️ Edit Format &amp; Design</span>
              </button>
              <button
                type="button"
                onClick={() => handleCopyStyledHtml(activeProfile)}
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold rounded cursor-pointer transition-colors flex items-center gap-1 border border-gray-600"
              >
                <span>📋 Copy Styled Format</span>
              </button>
            </div>
          </div>

          {/* Real-time Email Render Box */}
          <div className="bg-white rounded-xl border border-gray-300 shadow-xl overflow-hidden text-left">
            {/* Branded Header */}
            {(() => {
              const isLight = activeProfile.headerStyle === "light";
              const hAlign = activeProfile.headerAlignment || (activeProfile.headerStyle === "centered" ? "center" : "left");
              const hBg = isLight ? "#ffffff" : "#090d16";
              const hText = isLight ? "#090d16" : "#ffffff";
              const hSubtext = isLight ? "#64748b" : "#94a3b8";
              const badgeBg = isLight ? "#f1f5f9" : "rgba(255,255,255,0.08)";
              const badgeText = isLight ? "#475569" : "#cbd5e1";
              const badgeBorder = isLight ? "#e2e8f0" : "rgba(255,255,255,0.15)";

              if (hAlign === "center") {
                return (
                  <div
                    className="p-5 text-center"
                    style={{
                      backgroundColor: hBg,
                      borderBottom: `3px solid ${activeProfile.accentColor || "#FF6B00"}`,
                    }}
                  >
                    <div className="text-xl font-black tracking-wider" style={{ color: hText }}>
                      CREED <span style={{ color: activeProfile.accentColor || "#FF6B00" }}>TECH</span>
                    </div>
                    <div className="text-xs uppercase tracking-widest font-semibold mt-1" style={{ color: hSubtext }}>
                      {activeProfile.department}
                    </div>
                    <div className="mt-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold inline-block"
                        style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
                      >
                        VERIFIED DESK
                      </span>
                    </div>
                  </div>
                );
              }

              if (hAlign === "right") {
                return (
                  <div
                    className="p-5 flex items-center justify-between"
                    style={{
                      backgroundColor: hBg,
                      borderBottom: `3px solid ${activeProfile.accentColor || "#FF6B00"}`,
                    }}
                  >
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
                    >
                      VERIFIED DESK
                    </span>
                    <div className="text-right">
                      <div className="text-lg font-black tracking-wider" style={{ color: hText }}>
                        CREED <span style={{ color: activeProfile.accentColor || "#FF6B00" }}>TECH</span>
                      </div>
                      <div className="text-xs uppercase tracking-widest font-semibold mt-1" style={{ color: hSubtext }}>
                        {activeProfile.department}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  className="p-5 flex items-center justify-between"
                  style={{
                    backgroundColor: hBg,
                    borderBottom: `3px solid ${activeProfile.accentColor || "#FF6B00"}`,
                  }}
                >
                  <div className="text-left">
                    <div className="text-lg font-black tracking-wider" style={{ color: hText }}>
                      CREED <span style={{ color: activeProfile.accentColor || "#FF6B00" }}>TECH</span>
                    </div>
                    <div className="text-xs uppercase tracking-widest font-semibold mt-1" style={{ color: hSubtext }}>
                      {activeProfile.department}
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: badgeBg, color: badgeText, border: `1px solid ${badgeBorder}` }}
                  >
                    VERIFIED DESK
                  </span>
                </div>
              );
            })()}

            {/* Email Body Content */}
            <div
              className={`p-6 text-sm leading-relaxed transition-colors ${
                activeProfile.contentAlignment === "center"
                  ? "text-center"
                  : activeProfile.contentAlignment === "right"
                  ? "text-right"
                  : "text-left"
              }`}
              style={{
                backgroundColor: activeProfile.backgroundColor || "#FFFFFF",
                color: activeProfile.textColor || "#1E293B",
              }}
            >
              <p
                className="font-bold mb-2"
                style={{ color: activeProfile.textColor || "#1E293B" }}
              >
                {activeProfile.defaultSubjectTemplate
                  ? activeProfile.defaultSubjectTemplate.replace("{service}", "Enterprise Solutions").replace("{id}", "101")
                  : "Re: Inquiry"}
              </p>

              {/* TOP POSITION MEDIA */}
              {activeProfile.mediaPosition === "top" && activeProfile.videoThumbnail && (
                <div
                  className={`my-4 bg-gray-900 rounded-lg overflow-hidden border border-gray-200 text-left ${
                    activeProfile.mediaAlignment === "left"
                      ? "max-w-[320px] mr-auto"
                      : activeProfile.mediaAlignment === "right"
                      ? "max-w-[320px] ml-auto"
                      : "w-full"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={activeProfile.videoThumbnail}
                      alt="Video Presentation"
                      className="w-full h-36 object-cover opacity-85"
                    />
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md"
                      style={{ backgroundColor: activeProfile.accentColor || "#FF6B00" }}
                    >
                      ▶
                    </div>
                  </div>
                  <div className="p-2.5 bg-[#0b1120] text-white flex items-center justify-between text-xs">
                    <span className="font-semibold truncate max-w-[200px]">
                      {activeProfile.videoTitle || "Watch Presentation"}
                    </span>
                    <span className="font-bold shrink-0" style={{ color: activeProfile.accentColor }}>
                      Watch Video ↗
                    </span>
                  </div>
                </div>
              )}

              <div
                className="whitespace-pre-wrap font-sans text-xs leading-relaxed p-3 rounded border"
                style={{
                  color: activeProfile.textColor || "#1E293B",
                  backgroundColor: (activeProfile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#0") || (activeProfile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#1")
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
                  borderColor: (activeProfile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#0") || (activeProfile.backgroundColor || "#FFFFFF").toLowerCase().startsWith("#1")
                    ? "rgba(255, 255, 255, 0.15)"
                    : "rgba(0, 0, 0, 0.08)",
                }}
              >
                {(activeProfile.defaultMessageTemplate || "Hello Client,\n\nThank you for reaching out.")
                  .replace("{client_name}", "Valued Enterprise Client")
                  .replace("{service}", "Cloud Architecture & High-Reliability Engineering")
                  .replace("{id}", "101")}
              </div>

              {/* CENTER POSITION MEDIA (DEFAULT) */}
              {(activeProfile.mediaPosition || "center") === "center" && activeProfile.videoThumbnail && (
                <div
                  className={`my-4 bg-gray-900 rounded-lg overflow-hidden border border-gray-200 text-left ${
                    activeProfile.mediaAlignment === "left"
                      ? "max-w-[320px] mr-auto"
                      : activeProfile.mediaAlignment === "right"
                      ? "max-w-[320px] ml-auto"
                      : "w-full"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={activeProfile.videoThumbnail}
                      alt="Video Presentation"
                      className="w-full h-36 object-cover opacity-85"
                    />
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md"
                      style={{ backgroundColor: activeProfile.accentColor || "#FF6B00" }}
                    >
                      ▶
                    </div>
                  </div>
                  <div className="p-2.5 bg-[#0b1120] text-white flex items-center justify-between text-xs">
                    <span className="font-semibold truncate max-w-[200px]">
                      {activeProfile.videoTitle || "Watch Presentation"}
                    </span>
                    <span className="font-bold shrink-0" style={{ color: activeProfile.accentColor }}>
                      Watch Video ↗
                    </span>
                  </div>
                </div>
              )}

              {/* Signature */}
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs">
                <div className="font-bold text-sm" style={{ color: activeProfile.textColor || "#1E293B" }}>{activeProfile.name}</div>
                <div className="text-gray-600 font-medium mt-0.5">
                  <span style={{ color: activeProfile.accentColor }}>{activeProfile.email}</span>
                  {activeProfile.phone && ` • Tel: ${activeProfile.phone}`}
                </div>
                <div className="text-gray-400 text-[11px] mt-0.5">
                  Enterprise Systems &amp; High-Reliability Architecture
                </div>
              </div>

              {/* BOTTOM POSITION MEDIA */}
              {activeProfile.mediaPosition === "bottom" && activeProfile.videoThumbnail && (
                <div
                  className={`my-4 bg-gray-900 rounded-lg overflow-hidden border border-gray-200 text-left ${
                    activeProfile.mediaAlignment === "left"
                      ? "max-w-[320px] mr-auto"
                      : activeProfile.mediaAlignment === "right"
                      ? "max-w-[320px] ml-auto"
                      : "w-full"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={activeProfile.videoThumbnail}
                      alt="Video Presentation"
                      className="w-full h-36 object-cover opacity-85"
                    />
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md"
                      style={{ backgroundColor: activeProfile.accentColor || "#FF6B00" }}
                    >
                      ▶
                    </div>
                  </div>
                  <div className="p-2.5 bg-[#0b1120] text-white flex items-center justify-between text-xs">
                    <span className="font-semibold truncate max-w-[200px]">
                      {activeProfile.videoTitle || "Watch Presentation"}
                    </span>
                    <span className="font-bold shrink-0" style={{ color: activeProfile.accentColor }}>
                      Watch Video ↗
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className={`bg-gray-50 p-4 border-t border-gray-200 text-xs text-gray-500 leading-relaxed ${
                activeProfile.contentAlignment === "center"
                  ? "text-center"
                  : activeProfile.contentAlignment === "right"
                  ? "text-right"
                  : "text-left"
              }`}
            >
              {activeProfile.address && (
                <div className="mb-1">
                  <strong>Headquarters:</strong> {activeProfile.address}
                </div>
              )}
              <div>
                <strong>Web:</strong> https://creed-tech.com • <strong>Desk:</strong> {activeProfile.email}
              </div>
              {activeProfile.footerDisclaimer && (
                <div className="mt-2 pt-2 border-t border-gray-200 text-[10px] text-gray-400">
                  {activeProfile.footerDisclaimer}
                </div>
              )}
            </div>
          </div>

          {/* Test Email Broadcast Box */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-4 text-white">
            <span className="text-xs font-bold text-gray-300 block mb-2">
              🧪 Test Live Email Delivery for {activeProfile.name}
            </span>
            <div className="flex gap-2">
              <input
                type="email"
                value={testEmailRecipient}
                onChange={(e) => setTestEmailRecipient(e.target.value)}
                placeholder="Enter recipient email (e.g. your-email@gmail.com)"
                className="flex-1 px-3 py-1.5 text-xs bg-black/40 border border-gray-700 rounded-md text-white outline-none focus:border-[#0052FF]"
              />
              <button
                type="button"
                disabled={isSendingTest}
                onClick={handleSendTestEmail}
                className="px-4 py-1.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded-md cursor-pointer transition-colors disabled:opacity-50 shrink-0"
              >
                {isSendingTest ? "Sending..." : "Send Test Email"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

      {/* INQUIRIES SUB-TAB */}
      {activeSubTab === "inquiries" && (
        <div className="space-y-4">
          {/* Controls Bar: Search & Status Filters */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 text-xs">
                🔍
              </span>
              <input
                type="text"
                value={inquirySearch}
                onChange={(e) => setInquirySearch(e.target.value)}
                placeholder="Search by client name, email, company, service, message, or ID..."
                className="w-full pl-8 pr-4 py-2 bg-black/40 border border-gray-700 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0052FF]"
              />
              {inquirySearch && (
                <button
                  type="button"
                  onClick={() => setInquirySearch("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex bg-black/40 p-0.5 rounded-lg border border-gray-800 text-xs">
                <button
                  type="button"
                  onClick={() => setInquiryFilter("ALL")}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                    inquiryFilter === "ALL"
                      ? "bg-[#0052FF] text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  All ({inquiries.length})
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryFilter("NEW")}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    inquiryFilter === "NEW"
                      ? "bg-amber-500 text-black font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span>Pending / New</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30">
                    {inquiries.filter((i) => i.status === "NEW" || i.status === "PENDING").length}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryFilter("RESPONDED")}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                    inquiryFilter === "RESPONDED"
                      ? "bg-emerald-600 text-white font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Responded ({inquiries.filter((i) => i.status === "RESPONDED" || i.status === "RESOLVED").length})
                </button>
              </div>

              <button
                type="button"
                onClick={() => fetchInquiries()}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-gray-700 text-gray-300 hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5"
                title="Refresh inquiries"
              >
                <span>🔄</span>
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Inquiries Content Area */}
          {isLoadingInquiries ? (
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-12 text-center text-gray-400">
              <div className="inline-block w-8 h-8 border-2 border-[#0052FF] border-t-transparent rounded-full animate-spin mb-3" />
              <div className="text-xs font-semibold">Loading client inquiries...</div>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-12 text-center">
              <div className="text-4xl mb-3">📬</div>
              <h4 className="text-base font-bold text-white mb-1">No Inquiries Found</h4>
              <p className="text-xs text-gray-400 max-w-md mx-auto mb-4">
                {inquirySearch || inquiryFilter !== "ALL"
                  ? "No client inquiries match the current search keyword or status filter."
                  : "No client inquiries have been submitted yet. Once visitors submit the contact form, their inquiries will appear here ready for branded reply."}
              </p>
              {(inquirySearch || inquiryFilter !== "ALL") && (
                <button
                  type="button"
                  onClick={() => {
                    setInquirySearch("");
                    setInquiryFilter("ALL");
                  }}
                  className="px-4 py-1.5 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Reset Filter &amp; View All
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredInquiries.map((inq) => {
                const isPending = inq.status === "NEW" || inq.status === "PENDING";
                const isResponded = inq.status === "RESPONDED";
                const isResolved = inq.status === "RESOLVED";

                return (
                  <div
                    key={inq.id}
                    className={`bg-[#0F172A] border rounded-xl p-4 transition-all hover:border-gray-600 ${
                      isPending
                        ? "border-amber-500/40 ring-1 ring-amber-500/20 bg-gradient-to-r from-[#0F172A] to-amber-950/10"
                        : "border-[#1E293B]"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Status Badge */}
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 ${
                            isPending
                              ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                              : isResponded
                              ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/40"
                              : isResolved
                              ? "bg-indigo-400/20 text-indigo-300 border border-indigo-400/40"
                              : "bg-gray-800 text-gray-400 border border-gray-700"
                          }`}
                        >
                          {isPending && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
                          <span>{inq.status || "NEW"}</span>
                        </span>

                        {/* Reference Badge */}
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-gray-300">
                          REF #{inq.id}
                        </span>

                        {/* Service Tag */}
                        {inq.service && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#0052FF]/20 text-blue-300 border border-[#0052FF]/40">
                            {inq.service}
                          </span>
                        )}

                        <span className="text-[11px] text-gray-400">
                          {inq.created_at ? new Date(inq.created_at).toLocaleString() : "Recently"}
                        </span>
                      </div>

                      {/* Primary Reply Button requested by User */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedInquiryForReply(inq)}
                          className="px-4 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 shadow-md hover:shadow-blue-500/20"
                          title="Open Branded Email Reply Composer"
                        >
                          <span>💬</span>
                          <span>Reply to Client</span>
                        </button>
                      </div>
                    </div>

                    {/* Inquiry Body & Client Details */}
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                      <div className="md:col-span-4 space-y-1">
                        <div className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span>{inq.client_name || "Anonymous Client"}</span>
                          {inq.company && (
                            <span className="text-xs font-normal text-gray-400">
                              • {inq.company}
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-mono text-blue-400">
                          <a href={`mailto:${inq.email}`} className="hover:underline">
                            {inq.email}
                          </a>
                        </div>
                        {inq.phone && (
                          <div className="text-xs text-gray-400 font-mono">
                            ☎ {inq.phone}
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-8">
                        <div className="bg-black/30 border border-white/5 rounded-lg p-3 text-xs text-gray-200 leading-relaxed font-sans whitespace-pre-wrap max-h-36 overflow-y-auto">
                          {inq.project_details || (
                            <span className="text-gray-500 italic">No message provided.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SMTP SERVER SETTINGS SUB-TAB */}
      {activeSubTab === "smtp" && (
        <div className="space-y-6">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-5 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E293B]">
              <div>
                <h3 className="text-base font-bold text-white m-0 flex items-center gap-2">
                  <span>⚙️</span>
                  <span>Outgoing SMTP Mail Server Configuration</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Configure real mail delivery credentials for enterprise broadcast and automated branded client replies.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                    isSmtpConfigured
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSmtpConfigured ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
                    }`}
                  />
                  <span>{isSmtpConfigured ? "Active & Configured" : "Local Mode (No SMTP)"}</span>
                </span>
              </div>
            </div>

            <form onSubmit={handleSaveSmtp} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    SMTP Host (Mail Server)
                  </label>
                  <input
                    type="text"
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                    placeholder="e.g. smtp.gmail.com or mail.creed-tech.com"
                    className="w-full px-3 py-2 text-xs bg-black/40 border border-gray-700 rounded-lg text-white font-mono focus:outline-none focus:border-[#0052FF]"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Use <strong className="text-gray-300">smtp.gmail.com</strong> for Google Workspace or personal Gmail.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    SMTP Port &amp; Encryption
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(Number(e.target.value))}
                      placeholder="465 or 587"
                      className="w-28 px-3 py-2 text-xs bg-black/40 border border-gray-700 rounded-lg text-white font-mono focus:outline-none focus:border-[#0052FF]"
                    />
                    <label className="flex items-center gap-2 px-3 py-2 bg-black/30 border border-gray-700 rounded-lg text-xs text-gray-300 cursor-pointer select-none flex-1">
                      <input
                        type="checkbox"
                        checked={smtpSecure}
                        onChange={(e) => setSmtpSecure(e.target.checked)}
                        className="rounded text-[#0052FF] focus:ring-0"
                      />
                      <span>SSL / TLS (Port 465)</span>
                    </label>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Port 465 requires SSL enabled; Port 587 uses STARTTLS (uncheck SSL).
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    SMTP Username / Email
                  </label>
                  <input
                    type="text"
                    value={smtpUser}
                    onChange={(e) => setSmtpUser(e.target.value)}
                    placeholder="your-account@gmail.com"
                    className="w-full px-3 py-2 text-xs bg-black/40 border border-gray-700 rounded-lg text-white font-mono focus:outline-none focus:border-[#0052FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    SMTP Password / App Password
                  </label>
                  <input
                    type="password"
                    value={smtpPass}
                    onChange={(e) => setSmtpPass(e.target.value)}
                    placeholder="16-character Google App Password or SMTP key"
                    className="w-full px-3 py-2 text-xs bg-black/40 border border-gray-700 rounded-lg text-white font-mono focus:outline-none focus:border-[#0052FF]"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    For Gmail, generate an <strong>App Password</strong> in Google Account &gt; Security.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Default &quot;From&quot; Sender Name
                  </label>
                  <input
                    type="text"
                    value={smtpFromName}
                    onChange={(e) => setSmtpFromName(e.target.value)}
                    placeholder="e.g. Creed Tech Executive Desk"
                    className="w-full px-3 py-2 text-xs bg-black/40 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0052FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Default &quot;From&quot; Sender Email Address
                  </label>
                  <input
                    type="email"
                    value={smtpFromEmail}
                    onChange={(e) => setSmtpFromEmail(e.target.value)}
                    placeholder="contact@creed-tech.com or your-verified-sender@domain.com"
                    className="w-full px-3 py-2 text-xs bg-black/40 border border-gray-700 rounded-lg text-white font-mono focus:outline-none focus:border-[#0052FF]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#1E293B] flex items-center justify-between gap-3 flex-wrap">
                <div className="text-xs text-gray-400">
                  {isSmtpConfigured
                    ? "✓ SMTP credentials are valid and active."
                    : "ℹ Enter valid credentials to send emails without local simulation."}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isTestingSmtp}
                    onClick={handleTestSmtp}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>⚡</span>
                    <span>{isTestingSmtp ? "Testing..." : "Test Connection"}</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSavingSmtp}
                    className="px-5 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5 shadow-md disabled:opacity-50"
                  >
                    <span>💾</span>
                    <span>{isSavingSmtp ? "Saving..." : "Save SMTP Settings"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Quick Guide Card */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-5 text-white">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3 flex items-center gap-2">
              <span>💡</span>
              <span>Quick Guide: Configuring Gmail / Google Workspace</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300">
              <div className="bg-black/30 border border-white/5 p-3 rounded-lg">
                <strong className="text-white block mb-1">1. Enable 2-Step Verification</strong>
                Go to your Google Account &gt; Security, and turn on 2-Step Verification if it is not already enabled.
              </div>
              <div className="bg-black/30 border border-white/5 p-3 rounded-lg">
                <strong className="text-white block mb-1">2. Generate App Password</strong>
                Search for &quot;App Passwords&quot; in Google Account settings. Select App: Mail, Device: Other, and click Generate.
              </div>
              <div className="bg-black/30 border border-white/5 p-3 rounded-lg">
                <strong className="text-white block mb-1">3. Enter 16-Character Key</strong>
                Paste the generated 16-character code directly into the SMTP Password field above with Port 465 (SSL checked).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REPLY MODAL: FULL BRANDED EMAIL COMPOSER */}
      {selectedInquiryForReply && (
        <InquiryDetailsModal
          inquiry={selectedInquiryForReply}
          onClose={() => setSelectedInquiryForReply(null)}
          initialMode="reply"
          onInquiryUpdated={() => {
            fetchInquiries();
            if (showToast) showToast("✓ Inquiry reply updated successfully!");
          }}
          showToast={showToast}
        />
      )}
    </div>
  );
}
