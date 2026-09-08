"use client";

import { useState, useEffect } from "react";

export interface ReviewItem {
  id: number;
  client_name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  quote: string;
  verified?: boolean;
}

export const BASELINE_REVIEWS: ReviewItem[] = [
  {
    id: -1,
    client_name: "Marina R.",
    role: "Enterprise Cloud",
    company: "Italy",
    rating: 5,
    quote: "I'm using Creed Tech for our enterprise cloud architecture. It allowed us to deploy multi-region failover seamlessly with zero downtime.",
    avatar: "",
  },
  {
    id: -2,
    client_name: "Elena Rostova",
    role: "AI Automation",
    company: "Germany",
    rating: 5,
    quote: "Exceptional full-stack capabilities and attention to detail. They built our AI-driven document intelligence pipeline directly with our ERP.",
    avatar: "",
  },
  {
    id: -3,
    client_name: "David L.",
    role: "Database Arch",
    company: "United States",
    rating: 5,
    quote: "We had a complex legacy database problem and the engineering support was world-class. Solved our bottleneck within days.",
    avatar: "",
  },
  {
    id: -4,
    client_name: "Sarah Jenkins",
    role: "Enterprise Squads",
    company: "United Kingdom",
    rating: 5,
    quote: "It's been 4 years now that we rely on Creed Tech for dedicated staff augmentation and infrastructure. Top quality code.",
    avatar: "",
  },
];

export const SERVICES_LIST = [
  "Software Development",
  "UI/UX Design",
  "Mobile Applications",
  "Cloud Infrastructure",
  "Database Management",
  "Cybersecurity & QA",
  "Artificial Intelligence (AI)",
  "Digital Marketing & Branding",
] as const;

export const RATING_OPTIONS = [
  { value: "5", label: "★★★★★ (5.0 Excellent - Highly Recommended)" },
  { value: "4", label: "★★★★☆ (4.0 Very Good - Great Experience)" },
  { value: "3", label: "★★★☆☆ (3.0 Good - Met Expectations)" },
  { value: "2", label: "★★☆☆☆ (2.0 Fair - Needs Improvement)" },
  { value: "1", label: "★☆☆☆☆ (1.0 Poor - Unsatisfactory)" },
] as const;

export const getInitials = (name: string) => {
  const parts = (name || "Client").trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (parts[0]?.substring(0, 2) || "CT").toUpperCase();
};

export function useTestimonialLogic() {
  // Modal visibility states
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  // Dynamic verified live reviews from database
  const [liveReviews, setLiveReviews] = useState<ReviewItem[]>([]);

  useEffect(() => {
    fetch("/api/admin/testimonials?verified=true")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.testimonials)) {
          setLiveReviews(d.testimonials);
        }
      })
      .catch(() => {});
  }, []);

  // Review form state
  const [revName, setRevName] = useState("");
  const [revRole, setRevRole] = useState("");
  const [revLocation, setRevLocation] = useState("");
  const [revRating, setRevRating] = useState("5");
  const [revQuote, setRevQuote] = useState("");
  const [revAvatar, setRevAvatar] = useState("");
  const [revSubmitting, setRevSubmitting] = useState(false);
  const [revSubmitted, setRevSubmitted] = useState(false);
  const [revError, setRevError] = useState("");

  // Consultation form state
  const [conName, setConName] = useState("");
  const [conEmail, setConEmail] = useState("");
  const [conCompany, setConCompany] = useState("");
  const [conPhone, setConPhone] = useState("");
  const [conService, setConService] = useState("Software Development");
  const [conDetails, setConDetails] = useState("");
  const [conNda, setConNda] = useState(true);
  const [conSubmitting, setConSubmitting] = useState(false);
  const [conSubmitted, setConSubmitted] = useState(false);
  const [conError, setConError] = useState("");

  const resetReviewForm = () => {
    setRevName("");
    setRevRole("");
    setRevLocation("");
    setRevRating("5");
    setRevQuote("");
    setRevAvatar("");
    setRevSubmitted(false);
    setRevError("");
  };

  const resetConsultForm = () => {
    setConName("");
    setConEmail("");
    setConCompany("");
    setConPhone("");
    setConService("Software Development");
    setConDetails("");
    setConNda(true);
    setConSubmitted(false);
    setConError("");
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setRevError("Image size should be less than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (evt) => {
        setRevAvatar(evt.target?.result as string);
        setRevError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revQuote.trim()) {
      setRevError("Please provide your full name and review quote.");
      return;
    }
    setRevSubmitting(true);
    setRevError("");
    try {
      const parts = revRole.split(",");
      const role = parts[0]?.trim() || "Enterprise Client";
      const company = (parts.slice(1).join(",") || revLocation || "Enterprise Organization").trim();

      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: revName.trim(),
          role: role,
          company: company,
          avatar: revAvatar || "",
          rating: parseInt(revRating, 10) || 5,
          quote: revQuote.trim(),
          verified: false,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to submit review");
      }
      setRevSubmitted(true);
    } catch (err: any) {
      setRevError(err.message || "Submission failed. Please try again.");
    } finally {
      setRevSubmitting(false);
    }
  };

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!conName.trim() || !conEmail.trim()) {
      setConError("Please provide your name and business email.");
      return;
    }
    setConSubmitting(true);
    setConError("");
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: conName.trim(),
          email: conEmail.trim(),
          company: conCompany.trim() || "Enterprise Organization",
          phone: conPhone.trim(),
          service: conService,
          project_details: conDetails.trim() || "Discovery session requested via website.",
          need_nda: conNda,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to schedule consultation");
      }
      setConSubmitted(true);
    } catch (err: any) {
      setConError(err.message || "Submission failed. Please try again.");
    } finally {
      setConSubmitting(false);
    }
  };

  // Merge live verified reviews with curated baseline reviews
  const allReviews = [...liveReviews, ...BASELINE_REVIEWS];
  const col1 = allReviews.filter((_, idx) => idx % 2 === 0);
  const col2 = allReviews.filter((_, idx) => idx % 2 !== 0);

  // Duplicate items to ensure smooth, gapless infinite vertical scrolling
  const col1Items = [...col1, ...col1];
  const col2Items = [...col2, ...col2];

  return {
    isReviewOpen,
    setIsReviewOpen,
    isConsultOpen,
    setIsConsultOpen,
    col1Items,
    col2Items,
    revName,
    setRevName,
    revRole,
    setRevRole,
    revLocation,
    setRevLocation,
    revRating,
    setRevRating,
    revQuote,
    setRevQuote,
    revAvatar,
    setRevAvatar,
    revSubmitting,
    revSubmitted,
    revError,
    resetReviewForm,
    handleAvatarFileChange,
    handleReviewSubmit,
    conName,
    setConName,
    conEmail,
    setConEmail,
    conCompany,
    setConCompany,
    conPhone,
    setConPhone,
    conService,
    setConService,
    conDetails,
    setConDetails,
    conNda,
    setConNda,
    conSubmitting,
    conSubmitted,
    conError,
    resetConsultForm,
    handleConsultSubmit,
  };
}
