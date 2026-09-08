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

// Modals
import ArticleStudioModal from "@/components/admin/modals/ArticleStudioModal";
import AddVideoModal from "@/components/admin/modals/AddVideoModal";
import VideoPreviewModal from "@/components/admin/modals/VideoPreviewModal";
import AddJobModal from "@/components/admin/modals/AddJobModal";
import AddTestimonialModal from "@/components/admin/modals/AddTestimonialModal";
import AddPortfolioModal from "@/components/admin/modals/AddPortfolioModal";
import AddSubscriberModal from "@/components/admin/modals/AddSubscriberModal";
import InquiryDetailsModal from "@/components/admin/modals/InquiryDetailsModal";

// Types
import {
  Inquiry,
  Candidate,
  ArticleItem,
  VideoItem,
  Testimonial,
  JobOpening,
  ArticleReview,
  SubscriberItem,
  PortfolioItem,
  TelemetryData,
} from "@/types/admin";

export default function AdminPage() {
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // PostgreSQL 18 Live Collections
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [articleReviews, setArticleReviews] = useState<ArticleReview[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioItem[]>([]);
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);

  // Modal Control States
  const [showArticleStudio, setShowArticleStudio] = useState<boolean>(false);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
  const [showAddVideo, setShowAddVideo] = useState<boolean>(false);
  const [previewVideo, setPreviewVideo] = useState<VideoItem | null>(null);
  const [showAddJob, setShowAddJob] = useState<boolean>(false);
  const [showAddTestimonial, setShowAddTestimonial] = useState<boolean>(false);
  const [showAddPortfolio, setShowAddPortfolio] = useState<boolean>(false);
  const [showAddSubscriber, setShowAddSubscriber] = useState<boolean>(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Toast Helper
  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // Fetch all collections from PostgreSQL 18 via /api/admin/*
  const fetchAllData = useCallback(async () => {
    try {
      const [
        inquiriesRes,
        candidatesRes,
        jobsRes,
        articlesRes,
        videosRes,
        testimonialsRes,
        reviewsRes,
        subscribersRes,
        portfolioRes,
        systemRes,
      ] = await Promise.all([
        fetch("/api/admin/inquiries", { cache: "no-store" }).then((r) => r.json()).catch(() => ({ inquiries: [] })),
        fetch("/api/admin/candidates").then((r) => r.json()).catch(() => ({ candidates: [] })),
        fetch("/api/admin/jobs").then((r) => r.json()).catch(() => ({ jobs: [] })),
        fetch("/api/admin/articles").then((r) => r.json()).catch(() => ({ articles: [] })),
        fetch("/api/admin/videos").then((r) => r.json()).catch(() => ({ videos: [] })),
        fetch("/api/admin/testimonials").then((r) => r.json()).catch(() => ({ testimonials: [] })),
        fetch("/api/admin/reviews").then((r) => r.json()).catch(() => ({ reviews: [] })),
        fetch("/api/admin/subscribers").then((r) => r.json()).catch(() => ({ subscribers: [] })),
        fetch("/api/admin/portfolio").then((r) => r.json()).catch(() => ({ projects: [] })),
        fetch("/api/admin/system").then((r) => r.json()).catch(() => ({ telemetry: null })),
      ]);

      if (inquiriesRes?.inquiries) setInquiries(inquiriesRes.inquiries);
      if (candidatesRes?.candidates) setCandidates(candidatesRes.candidates);
      if (jobsRes?.jobs) setJobs(jobsRes.jobs);
      if (articlesRes?.articles) setArticles(articlesRes.articles);
      if (videosRes?.videos) setVideos(videosRes.videos);
      if (testimonialsRes?.testimonials) setTestimonials(testimonialsRes.testimonials);
      if (reviewsRes?.reviews) setArticleReviews(reviewsRes.reviews);
      if (subscribersRes?.subscribers) setSubscribers(subscribersRes.subscribers);
      if (portfolioRes?.projects) setPortfolioProjects(portfolioRes.projects);
      if (systemRes?.telemetry) setTelemetry(systemRes.telemetry);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 30000); // 30s live sync
    return () => clearInterval(interval);
  }, [fetchAllData]);

  // Actions: Inquiries
  const handleUpdateInquiryStatus = async (id: number, status: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        showToast(`Inquiry #${id} updated to ${status}`);
        fetchAllData();
      }
    } catch {
      showToast("Failed to update inquiry", "error");
      fetchAllData();
    }
  };

  const handleDeleteInquiry = async (id: number) => {
    if (!confirm(`Delete contact inquiry #${id}?`)) return;
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Inquiry deleted");
        fetchAllData();
      }
    } catch {
      showToast("Failed to delete inquiry", "error");
      fetchAllData();
    }
  };

  // Actions: Articles
  const handleDeleteArticle = async (id: number) => {
    if (!confirm(`Permanently delete article #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Article deleted successfully");
        fetchAllData();
      }
    } catch {
      showToast("Failed to delete article", "error");
    }
  };

  // Actions: Videos
  const handleDeleteVideo = async (id: number) => {
    if (!confirm(`Delete video #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/videos?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Video deleted");
        fetchAllData();
      }
    } catch {
      showToast("Failed to delete video", "error");
    }
  };

  // Actions: Testimonials
  const handleToggleTestimonialVerified = async (id: number, currentVal: boolean) => {
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, verified: !currentVal }),
      });
      if (res.ok) {
        showToast("Verification toggled");
        fetchAllData();
      }
    } catch {
      showToast("Failed to update testimonial", "error");
    }
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm(`Delete testimonial #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Testimonial deleted");
        fetchAllData();
      }
    } catch {
      showToast("Failed to delete testimonial", "error");
    }
  };

  // Actions: Reviews
  const handleUpdateReviewStatus = async (id: number, status: string) => {
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        showToast(`Review #${id} status: ${status}`);
        fetchAllData();
      }
    } catch {
      showToast("Failed to update review", "error");
    }
  };

  const handleDeleteReview = async (id: number) => {
    if (!confirm(`Delete review #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Review deleted");
        fetchAllData();
      }
    } catch {
      showToast("Failed to delete review", "error");
    }
  };

  // Actions: Careers (Candidates & Jobs)
  const handleUpdateCandidateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch("/api/admin/candidates", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        showToast(`Candidate marked as ${status}`);
        fetchAllData();
      }
    } catch {
      showToast("Failed to update candidate", "error");
    }
  };

  const handleDeleteCandidate = async (id: number) => {
    if (!confirm(`Delete candidate record #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/candidates?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Candidate deleted");
        fetchAllData();
      }
    } catch {
      showToast("Failed to delete candidate", "error");
    }
  };

  const handleUpdateJobStatus = async (id: number, status: string) => {
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        showToast(`Job status: ${status}`);
        fetchAllData();
      }
    } catch {
      showToast("Failed to update job", "error");
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (!confirm(`Delete job opening #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/jobs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Job opening deleted");
        fetchAllData();
      }
    } catch {
      showToast("Failed to delete job", "error");
    }
  };

  // Actions: Subscribers
  const handleDeleteSubscriber = async (id: number) => {
    if (!confirm(`Delete subscriber #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/subscribers?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Subscriber removed");
        fetchAllData();
      }
    } catch {
      showToast("Failed to remove subscriber", "error");
    }
  };

  const handleExportSubscribersCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Email,Subscribed At,Status"]
        .concat(
          subscribers.map((s) => `${s.id},${s.email},${s.created_at || ""},${s.status || "ACTIVE"}`)
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Subscribers CSV exported");
  };

  // Actions: Portfolio
  const handleDeletePortfolio = async (id: number) => {
    if (!confirm(`Delete project #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/portfolio?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Project deleted");
        fetchAllData();
      }
    } catch {
      showToast("Failed to delete project", "error");
    }
  };

  // Actions: System Governance
  const handleFlushCache = async () => {
    try {
      const res = await fetch("/api/admin/system", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "flush" }),
      });
      if (res.ok) {
        showToast("Server cache flushed successfully");
        fetchAllData();
      }
    } catch {
      showToast("Cache flush error", "error");
    }
  };

  const handleExportBackup = async () => {
    try {
      const res = await fetch("/api/admin/system", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "backup" }),
      });
      const data = await res.json();
      if (data.success && data.backup) {
        const blob = new Blob([JSON.stringify(data.backup, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `creed_backup_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast("Full database backup downloaded");
      }
    } catch {
      showToast("Failed to download database backup", "error");
    }
  };

  const pendingReviewsCount = articleReviews.filter((r) => r.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased flex flex-col">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-xs font-semibold flex items-center gap-2 border transition-all ${
            toast.type === "success"
              ? "bg-[#059669] text-white border-[#047857]"
              : "bg-[#DC2626] text-white border-[#B91C1C]"
          }`}
        >
          <span>{toast.type === "success" ? "✓" : "⚠"}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Global Admin Header */}
      <AdminHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        telemetry={telemetry}
      />

      {/* Main Admin Workspace */}
      <div className="flex-1 flex max-w-[1700px] w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Navigation Sidebar */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          inquiriesCount={inquiries.length}
          articlesCount={articles.length}
          videosCount={videos.length}
          testimonialsCount={testimonials.length}
          reviewsPendingCount={pendingReviewsCount}
          candidatesCount={candidates.length}
          subscribersCount={subscribers.length}
          portfolioCount={portfolioProjects.length}
          telemetry={telemetry}
        />

        {/* Dynamic Module Content Area */}
        <main className="flex-1 min-w-0 bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-8 shadow-xs">
          {activeTab === "dashboard" && (
            <DashboardModule
              inquiries={inquiries}
              candidates={candidates}
              articles={articles}
              videos={videos}
              subscribers={subscribers}
              portfolioProjects={portfolioProjects}
              setActiveTab={setActiveTab}
              onSelectInquiry={setSelectedInquiry}
              onDeleteInquiry={handleDeleteInquiry}
              onOpenNewArticle={() => {
                setEditingArticle(null);
                setShowArticleStudio(true);
              }}
              onOpenNewJob={() => setShowAddJob(true)}
              onOpenNewVideo={() => setShowAddVideo(true)}
              onOpenNewTestimonial={() => setShowAddTestimonial(true)}
              onOpenNewPortfolio={() => setShowAddPortfolio(true)}
            />
          )}

          {activeTab === "inquiries" && (
            <InquiriesModule
              inquiries={inquiries}
              searchQuery={searchQuery}
              onSelectInquiry={setSelectedInquiry}
              onUpdateStatus={handleUpdateInquiryStatus}
              onDeleteInquiry={handleDeleteInquiry}
            />
          )}

          {(activeTab === "vision_requests" || activeTab === "vision") && (
            <VisionRequestsModule
              inquiries={inquiries}
              onSelectInquiry={setSelectedInquiry}
              onDeleteInquiry={handleDeleteInquiry}
            />
          )}

          {activeTab === "articles" && (
            <ArticlesModule
              articles={articles}
              searchQuery={searchQuery}
              onOpenNewModal={() => {
                setEditingArticle(null);
                setShowArticleStudio(true);
              }}
              onEditArticle={(art) => {
                setEditingArticle(art);
                setShowArticleStudio(true);
              }}
              onDeleteArticle={handleDeleteArticle}
            />
          )}

          {activeTab === "videos" && (
            <VideosModule
              videos={videos}
              searchQuery={searchQuery}
              onOpenAddModal={() => setShowAddVideo(true)}
              onPreviewVideo={setPreviewVideo}
              onDeleteVideo={handleDeleteVideo}
            />
          )}

          {(activeTab === "news_wire" || activeTab === "newswire") && (
            <NewsWireModule showToast={showToast} />
          )}

          {(activeTab === "reviews" || activeTab === "testimonials") && (
            <TestimonialsModule
              testimonials={testimonials}
              onOpenAddModal={() => setShowAddTestimonial(true)}
              onToggleVerified={handleToggleTestimonialVerified}
              onDeleteTestimonial={handleDeleteTestimonial}
            />
          )}

          {(activeTab === "article_reviews" || activeTab === "moderation") && (
            <ArticleReviewsModule
              articleReviews={articleReviews}
              searchQuery={searchQuery}
              onUpdateStatus={handleUpdateReviewStatus}
              onDeleteReview={handleDeleteReview}
            />
          )}

          {(activeTab === "applicants" || activeTab === "careers") && (
            <CareersModule
              candidates={candidates}
              jobs={jobs}
              searchQuery={searchQuery}
              onOpenNewJobModal={() => setShowAddJob(true)}
              onUpdateCandidateStatus={handleUpdateCandidateStatus}
              onDeleteCandidate={handleDeleteCandidate}
              onUpdateJobStatus={handleUpdateJobStatus}
              onDeleteJob={handleDeleteJob}
            />
          )}

          {activeTab === "subscribers" && (
            <SubscribersModule
              subscribers={subscribers}
              searchQuery={searchQuery}
              onOpenAddModal={() => setShowAddSubscriber(true)}
              onDeleteSubscriber={handleDeleteSubscriber}
              onExportCsv={handleExportSubscribersCsv}
            />
          )}

          {activeTab === "portfolio" && (
            <PortfolioModule
              portfolioProjects={portfolioProjects}
              searchQuery={searchQuery}
              onOpenAddModal={() => setShowAddPortfolio(true)}
              onDeletePortfolio={handleDeletePortfolio}
            />
          )}

          {(activeTab === "website_settings" || activeTab === "site_settings") && (
            <WebsiteSettingsModule showToast={showToast} />
          )}

          {(activeTab === "settings" || activeTab === "system") && (
            <SystemSecurityModule
              telemetry={telemetry}
              onFlushCache={handleFlushCache}
              onExportBackup={handleExportBackup}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <ArticleStudioModal
        isOpen={showArticleStudio}
        onClose={() => {
          setShowArticleStudio(false);
          setEditingArticle(null);
        }}
        editingArticle={editingArticle}
        onArticleSaved={fetchAllData}
        showToast={showToast}
      />

      <AddVideoModal
        isOpen={showAddVideo}
        onClose={() => setShowAddVideo(false)}
        onVideoCreated={fetchAllData}
        showToast={showToast}
      />

      <VideoPreviewModal
        video={previewVideo}
        onClose={() => setPreviewVideo(null)}
      />

      <AddJobModal
        isOpen={showAddJob}
        onClose={() => setShowAddJob(false)}
        onJobCreated={fetchAllData}
        showToast={showToast}
      />

      <AddTestimonialModal
        isOpen={showAddTestimonial}
        onClose={() => setShowAddTestimonial(false)}
        onTestimonialCreated={fetchAllData}
        showToast={showToast}
      />

      <AddPortfolioModal
        isOpen={showAddPortfolio}
        onClose={() => setShowAddPortfolio(false)}
        onPortfolioCreated={fetchAllData}
        showToast={showToast}
      />

      <AddSubscriberModal
        isOpen={showAddSubscriber}
        onClose={() => setShowAddSubscriber(false)}
        onSubscriberCreated={fetchAllData}
        showToast={showToast}
      />

      <InquiryDetailsModal
        inquiry={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
      />
    </div>
  );
}
