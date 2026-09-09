"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import SubscribersModule from "@/components/admin/modules/SubscribersModule";
import PortfolioModule from "@/components/admin/modules/PortfolioModule";
import WebsiteSettingsModule from "@/components/admin/modules/WebsiteSettingsModule";
import SystemSecurityModule from "@/components/admin/modules/SystemSecurityModule";

import { TelemetryData } from "@/types/admin";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const fetchTelemetry = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/system");
      const data = await res.json();
      if (data.telemetry) setTelemetry(data.telemetry);
    } catch (err) {
      console.error("Failed to fetch telemetry:", err);
    }
  }, []);

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 30000);
    return () => clearInterval(interval);
  }, [fetchTelemetry]);

  const counts = telemetry?.counts || {};

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
            <WebsiteSettingsModule showToast={showToast} />
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
