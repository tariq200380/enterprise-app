"use client";

import React, { useState, useEffect } from "react";
import { Inquiry, Candidate, ArticleItem, VideoItem, SubscriberItem, PortfolioItem } from "@/types/admin";

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
  const [inquiries, setInquiries] = useState<Inquiry[]>(propInquiries || []);
  const [candidates, setCandidates] = useState<Candidate[]>(propCandidates || []);
  const [articles, setArticles] = useState<ArticleItem[]>(propArticles || []);
  const [videos, setVideos] = useState<VideoItem[]>(propVideos || []);
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>(propSubscribers || []);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioItem[]>(propPortfolio || []);

  useEffect(() => {
    if (propInquiries) setInquiries(propInquiries);
    if (propCandidates) setCandidates(propCandidates);
    if (propArticles) setArticles(propArticles);
    if (propVideos) setVideos(propVideos);
    if (propSubscribers) setSubscribers(propSubscribers);
    if (propPortfolio) setPortfolioProjects(propPortfolio);

    if (!propInquiries && !propCandidates) {
      Promise.all([
        fetch("/api/admin/inquiries").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/candidates").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/articles").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/videos").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/subscribers").then((r) => r.json()).catch(() => ({})),
        fetch("/api/admin/portfolio").then((r) => r.json()).catch(() => ({})),
      ]).then(([inqD, canD, artD, vidD, subD, portD]) => {
        if (inqD?.inquiries) setInquiries(inqD.inquiries);
        if (canD?.candidates) setCandidates(canD.candidates);
        if (artD?.articles) setArticles(artD.articles);
        if (vidD?.videos) setVideos(vidD.videos);
        if (subD?.subscribers) setSubscribers(subD.subscribers);
        if (portD?.portfolio || portD?.projects) setPortfolioProjects(portD.portfolio || portD.projects);
      });
    }
  }, [propInquiries, propCandidates, propArticles, propVideos, propSubscribers, propPortfolio]);

  const handleDeleteInquiryAction = async (id: number) => {
    if (onDeleteInquiry) {
      onDeleteInquiry(id);
      return;
    }
    if (!confirm(`Delete inquiry #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: "DELETE" });
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
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A]">Enterprise System Overview</h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Real-time metrics, telemetry, and inbound communication streams via PostgreSQL 18.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (onOpenNewArticle) onOpenNewArticle();
              else setActiveTab("articles");
            }}
            className="px-4 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white text-xs font-bold rounded shadow cursor-pointer transition-colors"
          >
            + Create Blueprint Article
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 mb-8">
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 shadow-sm">
          <div className="text-[11px] font-semibold text-[#64748B] uppercase">Contact Inquiries</div>
          <div className="text-2xl font-black text-[#0F172A] mt-1">{inquiries.length}</div>
          <div className="text-[10px] text-green-600 font-semibold mt-1">Live Database</div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 shadow-sm">
          <div className="text-[11px] font-semibold text-[#64748B] uppercase">Articles Published</div>
          <div className="text-2xl font-black text-[#0052FF] mt-1">{articles.length}</div>
          <div className="text-[10px] text-blue-600 font-semibold mt-1">Knowledge CMS</div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 shadow-sm">
          <div className="text-[11px] font-semibold text-[#64748B] uppercase">Video Library</div>
          <div className="text-2xl font-black text-[#FF6B00] mt-1">{videos.length}</div>
          <div className="text-[10px] text-amber-600 font-semibold mt-1">CDN Active</div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 shadow-sm">
          <div className="text-[11px] font-semibold text-[#64748B] uppercase">Talent Pool</div>
          <div className="text-2xl font-black text-[#0F172A] mt-1">{candidates.length}</div>
          <div className="text-[10px] text-purple-600 font-semibold mt-1">Engineers Vetted</div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 shadow-sm">
          <div className="text-[11px] font-semibold text-[#64748B] uppercase">Newsletter Leads</div>
          <div className="text-2xl font-black text-[#0F172A] mt-1">{subscribers.length}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1">Verified Emails</div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 shadow-sm">
          <div className="text-[11px] font-semibold text-[#64748B] uppercase">Portfolio Proofs</div>
          <div className="text-2xl font-black text-[#0F172A] mt-1">{portfolioProjects.length}</div>
          <div className="text-[10px] text-blue-600 font-semibold mt-1">Case Studies</div>
        </div>
      </div>

      {/* Recent Inquiries and Candidates Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F1F5F9]">
            <h3 className="text-sm font-bold text-[#0F172A]">Recent Contact Inquiries</h3>
            <button
              onClick={() => setActiveTab("inquiries")}
              className="text-xs font-bold text-[#0052FF] hover:underline cursor-pointer"
            >
              View All →
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {inquiries.slice(0, 4).map((inq) => (
              <div
                key={inq.id}
                className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-[#0F172A]">{inq.client_name}</div>
                  <div className="text-[11px] text-[#64748B]">{inq.company} • {inq.service}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSelectInquiryAction(inq)}
                    className="px-2.5 py-1 bg-[#0052FF] text-white font-semibold rounded hover:bg-[#0042D0] cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDeleteInquiryAction(inq.id)}
                    className="px-2 py-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Candidates */}
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F1F5F9]">
            <h3 className="text-sm font-bold text-[#0F172A]">Talent Pool Applicants</h3>
            <button
              onClick={() => setActiveTab("applicants")}
              className="text-xs font-bold text-[#0052FF] hover:underline cursor-pointer"
            >
              View All →
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {candidates.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-[#0F172A]">{c.candidate_name}</div>
                  <div className="text-[11px] text-[#64748B]">{c.domain_specialty}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    c.status === "INTERVIEW" ? "bg-amber-100 text-amber-800" :
                    c.status === "OFFER" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {c.status}
                  </span>
                  <a
                    href={c.portfolio_github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 py-1 bg-white border border-gray-300 rounded font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Profile ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="mt-6 p-4 bg-white border border-[#E2E8F0] rounded-lg flex items-center justify-between flex-wrap gap-3">
        <span className="text-xs font-bold text-[#0F172A]">Quick Administrative Actions:</span>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              if (onOpenNewJob) onOpenNewJob();
              else setActiveTab("applicants");
            }}
            className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-xs font-bold rounded border border-[#CBD5E1] cursor-pointer"
          >
            + Post Job Opening
          </button>
          <button
            onClick={() => {
              if (onOpenNewVideo) onOpenNewVideo();
              else setActiveTab("videos");
            }}
            className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-xs font-bold rounded border border-[#CBD5E1] cursor-pointer"
          >
            + Add Video Embed
          </button>
          <button
            onClick={() => {
              if (onOpenNewTestimonial) onOpenNewTestimonial();
              else setActiveTab("reviews");
            }}
            className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-xs font-bold rounded border border-[#CBD5E1] cursor-pointer"
          >
            + Add Testimonial
          </button>
          <button
            onClick={() => {
              if (onOpenNewPortfolio) onOpenNewPortfolio();
              else setActiveTab("portfolio");
            }}
            className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-xs font-bold rounded border border-[#CBD5E1] cursor-pointer"
          >
            + Add Portfolio Project
          </button>
          <button
            onClick={() => setActiveTab("website_settings")}
            className="px-3 py-1.5 bg-[#0052FF] text-white hover:bg-[#0042D0] text-xs font-bold rounded cursor-pointer"
          >
            🌐 Website Settings
          </button>
        </div>
      </div>
    </div>
  );
}
