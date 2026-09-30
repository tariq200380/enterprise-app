"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAdminFetch } from "@/lib/useAdminFetch";
import {
  EmailDepartmentProfile,
  EmailMediaItem,
  DEFAULT_EMAIL_PROFILES,
  EmailFormatType,
} from "@/lib/email-types";
import { Inquiry } from "@/types/admin";
import InquiryDetailsModal from "../modals/InquiryDetailsModal";
import EquipmentOfferDetailModal from "../modals/EquipmentOfferDetailModal";
import { EmailDesksTab } from "../email/EmailDesksTab";
import { EmailInquiriesTab } from "../email/EmailInquiriesTab";
import EmailSmtpTab from "../email/EmailSmtpTab";
import { EmailVisualDesignerModal } from "../email/EmailVisualDesignerModal";
import { EmailHeaderAndStats } from "../email/EmailHeaderAndStats";
import { EnlargedMediaModal } from "../email/EnlargedMediaModal";
import {
  createDefaultDepartmentProfile,
  copyEmailStyledHtml,
} from "../email/templates/templates";

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
  const [previewDetailItem, setPreviewDetailItem] = useState<EmailMediaItem | null>(null);
  const [enlargedMediaPopup, setEnlargedMediaPopup] = useState<{ imageUrl: string; title?: string; text?: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  // SubTab Navigation: "desks" | "inquiries" | "smtp"
  const [activeSubTab, setActiveSubTab] = useState<"desks" | "inquiries" | "smtp">("desks");

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryFilter, setInquiryFilter] = useState<"ALL" | "NEW" | "RESPONDED">("ALL");
  const [selectedInquiryForReply, setSelectedInquiryForReply] = useState<Inquiry | null>(null);

  // SMTP Settings State
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState(465);
  const [smtpSecure, setSmtpSecure] = useState(true);
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");
  const [smtpFromEmail, setSmtpFromEmail] = useState("");
  const [smtpFromName, setSmtpFromName] = useState("Creed Tech Executive Desk");
  const [isSmtpConfigured, setIsSmtpConfigured] = useState(false);
  const [isSavingSmtp, setIsSavingSmtp] = useState(false);
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (enlargedMediaPopup) {
          setEnlargedMediaPopup(null);
        } else if (previewDetailItem) {
          setPreviewDetailItem(null);
        } else if (editingProfile) {
          setEditingProfile(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enlargedMediaPopup, previewDetailItem, editingProfile]);

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
          const defaultDesk2 = DEFAULT_EMAIL_PROFILES.find((p) => p.id === "executive-desk");
          if (defaultDesk2 && !seenIds.has(defaultDesk2.id) && !seenEmails.has((defaultDesk2.email || "").toLowerCase())) {
            uniqueList.push(defaultDesk2);
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

  const activeProfileFormat: EmailFormatType =
    activeProfile.formatType ||
    (activeProfile.sidebarLogo || activeProfile.galleryRows || activeProfile.sidebarSocialLinks
      ? "format-executive-signature"
      : "format-catalog");

  // Save / Update profile with strict duplicate prevention
  const handleSaveProfile = async (
    profileToSave: EmailDepartmentProfile,
    stayInEditor = false,
    suppressToast = false
  ) => {
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
        if (!stayInEditor) {
          setEditingProfile(null);
        }
        if (!suppressToast && showToast) {
          showToast(`✓ Email profile "${profileToSave.name}" saved successfully!`);
        }
      } else {
        throw new Error(data.error || "Failed to save profile");
      }
    } catch (err: any) {
      if (!suppressToast && showToast) showToast(`Error: ${err.message}`, "error");
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

  const isEditingEmailDuplicate = Boolean(
    editingProfile &&
    editingProfile.email &&
    profiles.some(
      (p) => p.id !== editingProfile.id && (p.email || "").trim().toLowerCase() === (editingProfile.email || "").trim().toLowerCase()
    )
  );

  const activeModalFormat: EmailFormatType = editingProfile
    ? (editingProfile.formatType ||
        (editingProfile.sidebarLogo || editingProfile.galleryRows || editingProfile.sidebarSocialLinks
          ? "format-executive-signature"
          : "format-catalog"))
    : "format-catalog";

  return (
    <div className="space-y-6">
      {/* Top Header, Metrics, and SubNav Tabs */}
      <EmailHeaderAndStats
        profilesCount={profiles.length}
        inquiries={inquiries}
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
        setInquiryFilter={setInquiryFilter}
        isSmtpConfigured={isSmtpConfigured}
        smtpHost={smtpHost}
        onReplyClick={() => {
          setActiveSubTab("inquiries");
          const pending = inquiries.find((i) => i.status === "NEW" || i.status === "PENDING");
          if (pending) {
            setSelectedInquiryForReply(pending);
          }
        }}
        onAddBusinessEmail={() => {
          const existingEmails = new Set(profiles.map((p) => (p.email || "").trim().toLowerCase()));
          const newProf = createDefaultDepartmentProfile(profiles.length + 1, existingEmails);
          setEditingProfile(newProf);
        }}
      />

      {/* SUB-TAB 1: BUSINESS EMAIL DESKS & FORMATS */}
      {activeSubTab === "desks" && (
        <EmailDesksTab
          profiles={profiles} setProfiles={setProfiles}
          activeProfile={activeProfile} activeProfileFormat={activeProfileFormat}
          selectedProfileId={selectedProfileId} setSelectedProfileId={setSelectedProfileId}
          onEditProfile={(prof) => setEditingProfile(prof)} onDeleteProfile={handleDeleteProfile}
          onCopyStyledHtml={(prof) => copyEmailStyledHtml(prof, showToast)} onSaveProfile={handleSaveProfile}
          testEmailRecipient={testEmailRecipient} setTestEmailRecipient={setTestEmailRecipient}
          isSendingTest={isSendingTest} onSendTestEmail={handleSendTestEmail} showToast={showToast}
          onPreviewItem={(item) => setPreviewDetailItem(item)} onEnlargeMedia={(popup) => setEnlargedMediaPopup(popup)}
        />
      )}

      {/* SUB-TAB 2: CLIENT INQUIRIES & QUICK REPLY */}
      {activeSubTab === "inquiries" && (
        <EmailInquiriesTab
          inquiries={inquiries} isLoadingInquiries={isLoadingInquiries}
          inquirySearch={inquirySearch} setInquirySearch={setInquirySearch}
          inquiryFilter={inquiryFilter} setInquiryFilter={setInquiryFilter}
          onSelectInquiryForReply={(inq) => setSelectedInquiryForReply(inq)}
          onRefreshInquiries={fetchInquiries}
        />
      )}

      {/* SUB-TAB 3: SMTP SERVER CONFIGURATION */}
      {activeSubTab === "smtp" && (
        <EmailSmtpTab
          smtpHost={smtpHost} setSmtpHost={setSmtpHost}
          smtpPort={smtpPort} setSmtpPort={setSmtpPort}
          smtpSecure={smtpSecure} setSmtpSecure={setSmtpSecure}
          smtpUser={smtpUser} setSmtpUser={setSmtpUser}
          smtpPass={smtpPass} setSmtpPass={setSmtpPass}
          smtpFromEmail={smtpFromEmail} setSmtpFromEmail={setSmtpFromEmail}
          smtpFromName={smtpFromName} setSmtpFromName={setSmtpFromName}
          isSmtpConfigured={isSmtpConfigured}
          isSavingSmtp={isSavingSmtp} isTestingSmtp={isTestingSmtp}
          onSaveSmtp={handleSaveSmtp} onTestSmtp={handleTestSmtp}
        />
      )}

      {/* MODAL: VISUAL DESIGNER FOR ADD / EDIT */}
      <EmailVisualDesignerModal
        mounted={mounted}
        editingProfile={editingProfile} setEditingProfile={setEditingProfile}
        profiles={profiles} isSaving={isSaving}
        isEditingEmailDuplicate={isEditingEmailDuplicate}
        activeModalFormat={activeModalFormat}
        handleSaveProfile={handleSaveProfile} showToast={showToast}
        onPreviewDetailItem={(item) => setPreviewDetailItem(item)}
        onEnlargeMedia={(popup) => setEnlargedMediaPopup(popup)}
      />

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

      {/* Equipment Offer Details Modal Popup */}
      <EquipmentOfferDetailModal
        isOpen={Boolean(previewDetailItem)}
        onClose={() => setPreviewDetailItem(null)}
        item={previewDetailItem}
        profile={editingProfile}
      />

      {/* FORMAT 2 ENLARGED MEDIA POPUP MODAL */}
      <EnlargedMediaModal
        enlargedMediaPopup={enlargedMediaPopup}
        onClose={() => setEnlargedMediaPopup(null)}
      />
    </div>
  );
}
