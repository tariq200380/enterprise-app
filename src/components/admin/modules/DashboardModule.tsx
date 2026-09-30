"use client";

import React, { useState, useEffect } from "react";
import { Inquiry, Candidate, ArticleItem, VideoItem, SubscriberItem, PortfolioItem } from "@/types/admin";
import { useAdminFetch } from "@/lib/useAdminFetch";

interface DashboardModuleProps {
  inquiries?: Inquiry[];
  candidates?: Candidate[];
  articles?: ArticleItem[];
  videos?: VideoItem[];
  subscribers?: SubscriberItem[];
  portfolioProjects?: PortfolioItem[];
  setActiveTab: (tab: string) => void;
  onSelectInquiry?: (inq: Inquiry) => void;
  onDeleteInquiry?: (id: number) => void;
  onOpenNewArticle?: () => void;
  onOpenNewJob?: () => void;
  onOpenNewVideo?: () => void;
  onOpenNewTestimonial?: () => void;
  onOpenNewPortfolio?: () => void;
}

export default function DashboardModule({
  inquiries: propInquiries,
  candidates: propCandidates,
  articles: propArticles,
  videos: propVideos,
  subscribers: propSubscribers,
  portfolioProjects: propPortfolio,
  setActiveTab,
  onSelectInquiry,
  onDeleteInquiry,
  onOpenNewArticle,
  onOpenNewJob,
  onOpenNewVideo,
  onOpenNewTestimonial,
  onOpenNewPortfolio,
}: DashboardModuleProps) {
  const adminFetch = useAdminFetch();
  const [inquiries, setInquiries] = useState<Inquiry[]>(propInquiries || []);
  const [candidates, setCandidates] = useState<Candidate[]>(propCandidates || []);
  const [articles, setArticles] = useState<ArticleItem[]>(propArticles || []);
  const [videos, setVideos] = useState<VideoItem[]>(propVideos || []);
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>(propSubscribers || []);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioItem[]>(propPortfolio || []);

  const loadDashboardData = () => {
    Promise.all([
      adminFetch("/api/admin/inquiries").then((r) => r.json()).catch(() => ({})),
      adminFetch("/api/admin/candidates").then((r) => r.json()).catch(() => ({})),
      adminFetch("/api/admin/articles").then((r) => r.json()).catch(() => ({})),
      adminFetch("/api/admin/videos").then((r) => r.json()).catch(() => ({})),
      adminFetch("/api/admin/subscribers").then((r) => r.json()).catch(() => ({})),
      adminFetch("/api/admin/portfolio").then((r) => r.json()).catch(() => ({})),
    ]).then(([inqD, canD, artD, vidD, subD, portD]) => {
      if (inqD?.inquiries) setInquiries(inqD.inquiries);
      if (canD?.candidates) setCandidates(canD.candidates);
      if (artD?.articles) setArticles(artD.articles);
      if (vidD?.videos) setVideos(vidD.videos);
      if (subD?.subscribers) setSubscribers(subD.subscribers);
      if (portD?.portfolio || portD?.projects) setPortfolioProjects(portD.portfolio || portD.projects);
    });
  };

  useEffect(() => {
    if (propInquiries) setInquiries(propInquiries);
    if (propCandidates) setCandidates(propCandidates);
    if (propArticles) setArticles(propArticles);
    if (propVideos) setVideos(propVideos);
    if (propSubscribers) setSubscribers(propSubscribers);
    if (propPortfolio) setPortfolioProjects(propPortfolio);

    if (!propInquiries && !propCandidates) {
      loadDashboardData();
    }
  }, [propInquiries, propCandidates, propArticles, propVideos, propSubscribers, propPortfolio]);

  const handleDeleteInquiryAction = async (id: number) => {
    if (onDeleteInquiry) {
      onDeleteInquiry(id);
      return;
    }
    if (!confirm(`Delete inquiry #${id}?`)) return;
    try {
      const res = await adminFetch(`/api/admin/inquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };

  const handleSelectInquiryAction = (inq: Inquiry) => {
    if (onSelectInquiry) {
      onSelectInquiry(inq);
    } else {
      setActiveTab("inquiries");
    }
  };

  return (
    <div className="space-y-6">
      {/* Executive Hero Banner with Light Offwhite & Soft Orange Glow */}
      <div className="relative w-full rounded-2xl bg-white p-6 sm:p-7 border border-[#E2E8F0] overflow-hidden text-[#0F172A] shadow-xs select-none">
        {/* Ambient Orange Radial Glow matching main site */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 85% 25%, rgba(255, 107, 0, 0.12) 0%, rgba(255, 107, 0, 0.02) 50%, transparent 75%)",
          }}
        />
        {/* Subtle Blueprint Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0F172A 1px, transparent 1px), linear-gradient(to bottom, #0F172A 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-[#FF6B00] text-[11px] font-semibold tracking-wider uppercase mb-3 font-outfit shadow-[0_0_10px_rgba(255,107,0,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
              <span>Enterprise Master CMS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-[#0F172A] tracking-tight leading-snug">
              System Command &amp; Operations
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl font-normal leading-relaxed">
              Synchronized real-time telemetry, inbound inquiries, talent pipelines, and content publishing running on dedicated PostgreSQL 18.
            </p>
          </div>

          <div className="flex items-center gap-3 self-stretch md:self-auto flex-wrap">
            <button
              type="button"
              onClick={loadDashboardData}
              className="px-3.5 py-2 bg-[#F1F3F5] hover:bg-[#EBECEF] border border-[#E2E8F0] text-slate-700 text-xs font-semibold rounded-xl transition-all duration-200 inline-flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
            >
              <span>🔄</span>
              <span>Sync Metrics</span>
            </button>
            <button
              onClick={() => {
                if (onOpenNewArticle) onOpenNewArticle();
                else setActiveTab("articles");
              }}
              className="px-4 py-2 bg-[#FF6B00] hover:bg-[#e05d00] text-white text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer shadow-[0_2px_14px_rgba(255,107,0,0.25)] hover:shadow-[0_4px_20px_rgba(255,107,0,0.35)] active:scale-95 inline-flex items-center gap-1.5"
            >
              <span>+</span>
              <span>New Blueprint Article</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 mb-8">
        <div className="bg-white border border-[#E2E8F0] hover:border-orange-300 rounded-2xl p-4 shadow-xs hover:shadow-[0_4px_20px_rgba(255,107,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 group relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF6B00] to-[#FFA04D] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(255,107,0,0.6)]" />
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-outfit">Contact Inquiries</div>
          <div className="text-2xl font-black text-[#0F172A] mt-1 font-outfit">{inquiries.length}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span>Live Database</span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] hover:border-orange-300 rounded-2xl p-4 shadow-xs hover:shadow-[0_4px_20px_rgba(255,107,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 group relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF6B00] to-[#FFA04D] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(255,107,0,0.6)]" />
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-outfit">Articles Published</div>
          <div className="text-2xl font-black text-[#0F172A] mt-1 font-outfit">{articles.length}</div>
          <div className="text-[10px] text-blue-600 font-semibold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Knowledge CMS</span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] hover:border-orange-300 rounded-2xl p-4 shadow-xs hover:shadow-[0_4px_20px_rgba(255,107,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 group relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF6B00] to-[#FFA04D] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(255,107,0,0.6)]" />
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-outfit">Video Library</div>
          <div className="text-2xl font-black text-[#FF6B00] mt-1 font-outfit">{videos.length}</div>
          <div className="text-[10px] text-orange-600 font-semibold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_6px_rgba(255,107,0,0.6)]" />
            <span>CDN Active</span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] hover:border-orange-300 rounded-2xl p-4 shadow-xs hover:shadow-[0_4px_20px_rgba(255,107,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 group relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF6B00] to-[#FFA04D] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(255,107,0,0.6)]" />
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-outfit">Talent Pool</div>
          <div className="text-2xl font-black text-[#0F172A] mt-1 font-outfit">{candidates.length}</div>
          <div className="text-[10px] text-purple-600 font-semibold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span>Engineers Vetted</span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] hover:border-orange-300 rounded-2xl p-4 shadow-xs hover:shadow-[0_4px_20px_rgba(255,107,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 group relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF6B00] to-[#FFA04D] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(255,107,0,0.6)]" />
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-outfit">Newsletter Leads</div>
          <div className="text-2xl font-black text-[#0F172A] mt-1 font-outfit">{subscribers.length}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Verified Leads</span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] hover:border-orange-300 rounded-2xl p-4 shadow-xs hover:shadow-[0_4px_20px_rgba(255,107,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 group relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF6B00] to-[#FFA04D] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(255,107,0,0.6)]" />
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-outfit">Portfolio Proofs</div>
          <div className="text-2xl font-black text-[#0F172A] mt-1 font-outfit">{portfolioProjects.length}</div>
          <div className="text-[10px] text-blue-600 font-semibold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Case Studies</span>
          </div>
        </div>
      </div>

      {/* Recent Inquiries and Candidates Side-by-Side (md:grid-cols-2 for 980px preservation) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E2E8F0]">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] font-outfit">Recent Contact Inquiries</h3>
              <p className="text-[11px] text-slate-500">Inbound client messages via website contact forms</p>
            </div>
            <button
              onClick={() => setActiveTab("inquiries")}
              className="text-xs font-bold text-[#FF6B00] hover:text-[#e05d00] transition-colors cursor-pointer group flex items-center gap-1"
            >
              <span>View All</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {inquiries.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">No contact inquiries found.</div>
            ) : (
              inquiries.slice(0, 4).map((inq) => (
                <div
                  key={inq.id}
                  className="p-3.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl flex items-center justify-between gap-3 text-xs transition-colors duration-200"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-[#0F172A] truncate">{inq.client_name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{inq.company} • {inq.service}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleSelectInquiryAction(inq)}
                      className="px-3.5 py-1.5 bg-[#FF6B00] hover:bg-[#e05d00] text-white font-bold text-xs rounded-xl shadow-[0_2px_10px_rgba(255,107,0,0.25)] transition-all cursor-pointer active:scale-95"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => handleDeleteInquiryAction(inq.id)}
                      className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete inquiry"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Candidates */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E2E8F0]">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] font-outfit">Talent Pool Applicants</h3>
              <p className="text-[11px] text-slate-500">Engineers and specialists seeking engineering roles</p>
            </div>
            <button
              onClick={() => setActiveTab("applicants")}
              className="text-xs font-bold text-[#FF6B00] hover:text-[#e05d00] transition-colors cursor-pointer group flex items-center gap-1"
            >
              <span>View All</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {candidates.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">No applicants found.</div>
            ) : (
              candidates.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl flex items-center justify-between gap-3 text-xs transition-colors duration-200"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-[#0F172A] truncate">{c.candidate_name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{c.domain_specialty}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      c.status === "INTERVIEW" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                      c.status === "OFFER" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}>
                      {c.status}
                    </span>
                    <a
                      href={c.portfolio_github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 bg-white border border-[#E2E8F0] hover:border-orange-300 hover:text-[#FF6B00] rounded-xl font-semibold text-slate-700 transition-colors shadow-xs"
                    >
                      Profile ↗
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="p-4 sm:p-5 bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-between flex-wrap gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse shadow-[0_0_8px_rgba(255,107,0,0.6)]" />
          <span className="text-xs font-bold text-[#0F172A] font-outfit uppercase tracking-wider">Quick Actions:</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              if (onOpenNewJob) onOpenNewJob();
              else setActiveTab("applicants");
            }}
            className="px-3.5 py-1.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-xs font-bold rounded-xl border border-[#E2E8F0] hover:border-orange-300 text-slate-700 hover:text-[#FF6B00] cursor-pointer transition-all shadow-xs"
          >
            + Post Job Opening
          </button>
          <button
            onClick={() => {
              if (onOpenNewVideo) onOpenNewVideo();
              else setActiveTab("videos");
            }}
            className="px-3.5 py-1.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-xs font-bold rounded-xl border border-[#E2E8F0] hover:border-orange-300 text-slate-700 hover:text-[#FF6B00] cursor-pointer transition-all shadow-xs"
          >
            + Add Video Embed
          </button>
          <button
            onClick={() => {
              if (onOpenNewTestimonial) onOpenNewTestimonial();
              else setActiveTab("reviews");
            }}
            className="px-3.5 py-1.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-xs font-bold rounded-xl border border-[#E2E8F0] hover:border-orange-300 text-slate-700 hover:text-[#FF6B00] cursor-pointer transition-all shadow-xs"
          >
            + Add Testimonial
          </button>
          <button
            onClick={() => {
              if (onOpenNewPortfolio) onOpenNewPortfolio();
              else setActiveTab("portfolio");
            }}
            className="px-3.5 py-1.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-xs font-bold rounded-xl border border-[#E2E8F0] hover:border-orange-300 text-slate-700 hover:text-[#FF6B00] cursor-pointer transition-all shadow-xs"
          >
            + Add Portfolio Project
          </button>
          <button
            onClick={() => setActiveTab("website_settings")}
            className="px-3.5 py-1.5 bg-[#FF6B00] text-white hover:bg-[#e05d00] text-xs font-bold rounded-xl shadow-[0_2px_12px_rgba(255,107,0,0.25)] cursor-pointer transition-all inline-flex items-center gap-1.5 active:scale-95"
          >
            <span>🌐</span>
            <span>Website Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
