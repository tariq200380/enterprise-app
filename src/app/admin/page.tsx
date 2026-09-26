"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

// 13 Modular Admin Components
import DashboardModule from "@/components/admin/modules/DashboardModule";
import InquiriesModule from "@/components/admin/modules/InquiriesModule";
import VisionRequestsModule from "@/components/admin/modules/VisionRequestsModule";
import ArticlesModule from "@/components/admin/modules/ArticlesModule";
import VideosModule from "@/components/admin/modules/VideosModule";
import NewsWireModule from "@/components/admin/modules/NewsWireModule";
import TestimonialsModule from "@/components/admin/modules/TestimonialsModule";
import ArticleReviewsModule from "@/components/admin/modules/ArticleReviewsModule";
import CareersModule from "@/components/admin/modules/CareersModule";
import FounderProposalsModule from "@/components/admin/modules/FounderProposalsModule";
import SecurityReportsModule from "@/components/admin/modules/SecurityReportsModule";
import SubscribersModule from "@/components/admin/modules/SubscribersModule";
import PortfolioModule from "@/components/admin/modules/PortfolioModule";
import WebsiteSettingsModule from "@/components/admin/modules/WebsiteSettingsModule";
import SystemSecurityModule from "@/components/admin/modules/SystemSecurityModule";
import { useUser, useClerk, SignIn } from "@clerk/nextjs";
import { useAdminFetch } from "@/lib/useAdminFetch";

import { TelemetryData } from "@/types/admin";

export default function AdminPage() {
  const adminFetch = useAdminFetch();
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);

  // Clerk hooks
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  // Authentication & Authorization state (Strict Clerk Boundary)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [, setUserRole] = useState<string>("");
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [forbiddenError, setForbiddenError] = useState<string | null>(null);

  // Authoritative server-side session check against Clerk auth boundary
  const verifySession = useCallback(async () => {
    try {
      const res = await adminFetch("/api/admin/auth/check");
      const data: any = await res.json().catch(() => ({}));
      if (data?.authenticated && data?.user) {
        setIsAuthenticated(true);
        setIsAuthorized(true);
        setUserEmail(data.user.email || user?.primaryEmailAddress?.emailAddress || "admin");
        setUserRole(data.user.role || "admin");
        setForbiddenError(null);
      } else if (data?.error) {
        if (data.requires2FA || data.error?.includes("authorization required")) {
          setIsAuthenticated(true);
          setIsAuthorized(false);
          setForbiddenError(data.error);
        } else {
          setIsAuthenticated(false);
          setIsAuthorized(false);
          setForbiddenError(null);
        }
      } else {
        setIsAuthenticated(false);
        setIsAuthorized(false);
      }
    } catch {
      setIsAuthenticated(false);
      setIsAuthorized(false);
    } finally {
      setAuthChecked(true);
    }
  }, [adminFetch, user]);

  useEffect(() => {
    verifySession();
  }, [verifySession, isSignedIn]);

  const handleLogout = async () => {
    try {
      if (signOut) {
        await signOut();
      }
      await adminFetch("/api/admin/auth/logout", { method: "POST" });
    } catch {}
    localStorage.removeItem("creed_admin_authenticated");
    localStorage.removeItem("creed_admin_user_email");
    setIsAuthenticated(false);
    setIsAuthorized(false);
    setUserEmail("");
    showToast("Signed out of Admin Panel.", "success");
  };

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const fetchTelemetry = useCallback(async () => {
    try {
      const res = await adminFetch("/api/admin/system");
      const data: any = await res.json().catch(() => ({}));
      if (data?.telemetry) setTelemetry(data.telemetry);
    } catch (err) {
      console.error("Failed to fetch telemetry:", err);
    }
  }, [adminFetch]);

  useEffect(() => {
    if (!isAuthenticated || !isAuthorized) return;
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 30000);
    return () => clearInterval(interval);
  }, [fetchTelemetry, isAuthenticated, isAuthorized]);

  const counts = telemetry?.counts || {};

  if (!authChecked) {
    return (
      <div className="h-screen bg-[#070C18] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#0052FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 403 Forbidden: Signed in via Clerk, but requires 2FA or lacks admin role
  if (isAuthenticated && !isAuthorized) {
    const is2FAMissing = forbiddenError?.includes("Two-factor authentication") || forbiddenError?.includes("2FA");
    return (
      <div className="min-h-screen bg-[#070C18] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className={`w-full max-w-md bg-[#0F172A] border ${is2FAMissing ? "border-amber-500/30" : "border-red-500/30"} rounded-2xl p-8 text-center text-white shadow-2xl backdrop-blur-md`}>
          <div className={`w-14 h-14 rounded-full ${is2FAMissing ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"} flex items-center justify-center mx-auto mb-4 text-2xl font-bold`}>
            {is2FAMissing ? "🔐" : "🚫"}
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mb-2">
            {is2FAMissing ? "2FA Setup Required" : "Access Denied (403)"}
          </h1>
          <p className="text-xs text-[#94A3B8] mb-6">
            {forbiddenError || "Your account does not possess administrator privileges ('admin' or 'super_admin' role required)."}
          </p>
          <div className="flex flex-col gap-2.5">
            {is2FAMissing && (
              <a
                href="/setup-2fa"
                className="w-full bg-[#0052FF] hover:bg-[#0042D0] text-white font-semibold text-xs py-2.5 rounded-lg transition-all"
              >
                Set Up Two-Factor Authentication &rarr;
              </a>
            )}
            <button
              onClick={handleLogout}
              className="w-full bg-[#1E293B] hover:bg-[#334155] text-white font-semibold text-xs py-2.5 rounded-lg border border-[#334155] transition-all"
            >
              Sign Out & Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 401 Unauthorized: Not signed in via Clerk
  if (!isAuthenticated || !isAuthorized) {
    return (
      <div className="min-h-screen bg-[#070C18] flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0052FF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#0F172A]/90 border border-[#1E293B] rounded-2xl shadow-2xl p-8 relative z-10 backdrop-blur-md">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-2xl font-black tracking-wider text-white">
                CREED<span className="text-[#FF6B00]">TECH</span>
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-[#38BDF8] uppercase">
                Enterprise Admin Portal
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Admin Authentication</h1>
            <p className="text-xs text-[#94A3B8] mt-1">
              Protected by Clerk server-side authentication boundary.
            </p>
          </div>

          <div className="flex justify-center">
            <SignIn routing="hash" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased overflow-hidden">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-xl text-xs font-bold transition-all transform translate-y-0 ${
            toast.type === "error"
              ? "bg-red-600 text-white shadow-red-500/20"
              : "bg-[#0052FF] text-white shadow-blue-500/20"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Admin Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        inquiriesCount={counts.contact_inquiries || 0}
        articlesCount={counts.articles || 0}
        videosCount={counts.videos || 0}
        testimonialsCount={counts.testimonials || 0}
        reviewsPendingCount={counts.pending_reviews || 0}
        candidatesCount={counts.candidates || 0}
        founderProposalsCount={counts.founder_proposals || 0}
        securityReportsCount={counts.security_reports || 0}
        visionRequestsCount={counts.vision_requests || 0}
        subscribersCount={counts.subscribers || 0}
        portfolioCount={counts.portfolio_projects || 0}
        telemetry={telemetry}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <AdminHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          telemetry={telemetry}
          onLogout={handleLogout}
          userEmail={userEmail}
        />

        {/* Dynamic Module Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F8FAFC]">
          {activeTab === "dashboard" && (
            <DashboardModule
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "inquiries" && (
            <InquiriesModule
              searchQuery={searchQuery}
              showToast={showToast}
              onRefresh={fetchTelemetry}
            />
          )}

          {activeTab === "security_reports" && (
            <SecurityReportsModule
              searchQuery={searchQuery}
              showToast={showToast}
              onRefresh={fetchTelemetry}
            />
          )}

          {(activeTab === "vision_requests" || activeTab === "vision") && (
            <VisionRequestsModule
              searchQuery={searchQuery}
              showToast={showToast}
              onRefresh={fetchTelemetry}
            />
          )}

          {activeTab === "articles" && (
            <ArticlesModule
              searchQuery={searchQuery}
              showToast={showToast}
              onRefresh={fetchTelemetry}
            />
          )}

          {activeTab === "videos" && (
            <VideosModule
              searchQuery={searchQuery}
              showToast={showToast}
              onRefresh={fetchTelemetry}
            />
          )}

          {(activeTab === "news_wire" || activeTab === "newswire") && (
            <NewsWireModule
              showToast={showToast}
              onDraftCreated={() => {
                fetchTelemetry();
                setActiveTab("articles");
              }}
            />
          )}

          {(activeTab === "reviews" || activeTab === "testimonials") && (
            <TestimonialsModule
              showToast={showToast}
              onRefresh={fetchTelemetry}
            />
          )}

          {(activeTab === "article_reviews" || activeTab === "moderation") && (
            <ArticleReviewsModule
              searchQuery={searchQuery}
              showToast={showToast}
              onRefresh={fetchTelemetry}
            />
          )}

          {(activeTab === "applicants" || activeTab === "careers") && (
            <CareersModule
              searchQuery={searchQuery}
              showToast={showToast}
              onRefresh={fetchTelemetry}
            />
          )}

          {activeTab === "founder_proposals" && (
            <FounderProposalsModule
              searchQuery={searchQuery}
              showToast={showToast}
              onRefresh={fetchTelemetry}
            />
          )}

          {activeTab === "subscribers" && (
            <SubscribersModule
              searchQuery={searchQuery}
              showToast={showToast}
              onRefresh={fetchTelemetry}
            />
          )}

          {activeTab === "portfolio" && (
            <PortfolioModule
              searchQuery={searchQuery}
              showToast={showToast}
              onRefresh={fetchTelemetry}
            />
          )}

          {activeTab === "website_settings" && (
            <WebsiteSettingsModule showToast={showToast} onNavigateTab={setActiveTab} />
          )}

          {(activeTab === "settings" || activeTab === "system") && (
            <SystemSecurityModule
              telemetry={telemetry}
              showToast={showToast}
            />
          )}
        </main>
      </div>
    </div>
  );
}
