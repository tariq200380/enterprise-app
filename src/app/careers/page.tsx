import type { Metadata } from "next";
import CareerHero from "@/components/careers/careerhero";
import CareerWhy from "@/components/careers/careerwhy";
import CareerProcess from "@/components/careers/careerprocess";
import CareerRoles from "@/components/careers/careerroles";
import CareerFaq from "@/components/careers/careerfaq";
import CareerHotline from "@/components/careers/careerhotline";
import CareerLogic from "@/components/careers/careerlogic";

import { getSeoForPage } from "@/lib/seoHelper";

// Step 3: Short cache for Careers page (5 minutes / 300 seconds ISR)
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage("careers");
  return {
    title: seo.title ? { absolute: seo.title } : undefined,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical_url || "/careers",
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical_url || "https://creed-tech.com/careers",
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: seo.og_image ? [seo.og_image] : undefined,
    },
    robots: {
      index: !seo.no_index,
      follow: !seo.no_follow,
    },
  };
}

const careersJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://creed-tech.com/careers/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://creed-tech.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Careers",
          item: "https://creed-tech.com/careers",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://creed-tech.com/careers/#webpage",
      url: "https://creed-tech.com/careers",
      name: "Careers & Engineering Pods | Creed Tech",
      description:
        "Build digital infrastructure that endures. We are an autonomous collective of principal systems architects, AI engineers, and design artisans.",
      isPartOf: {
        "@id": "https://creed-tech.com/#website",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://creed-tech.com/careers/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does Creed Tech handle remote work and time zones?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We are 100% remote-first and asynchronous. We have team members across Germany, Spain, USA, and global time zones. Rather than demanding rigid 9-to-5 schedules, we require a minimum 3-hour daily overlap with your pod and rely on high-fidelity written documentation.",
          },
        },
        {
          "@type": "Question",
          name: "Is the take-home technical challenge really paid?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, unconditionally. We respect the time and effort required to craft architectural solutions. Candidates who complete our practical take-home challenge receive an honorarium stipend regardless of whether we move forward with an offer.",
          },
        },
        {
          "@type": "Question",
          name: "What contract and employment types do you offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We accommodate both full-time permanent contracts through global Employer of Record (EOR) entities in 80+ countries and B2B contractor arrangements with flexible invoicing, depending on your tax and location preferences.",
          },
        },
        {
          "@type": "Question",
          name: "What hardware and software stack do you support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Engineers receive a $5,000 hardware stipend to configure their choice of Apple Silicon (M3/M4 Max) or custom Linux workstations with high-refresh 4K displays and ergonomic seating. You also receive full access to commercial AI tooling and sovereign cloud dev environments.",
          },
        },
        {
          "@type": "Question",
          name: "What happens after I submit a Vacancy Alert registration?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your profile is privately indexed in our Principal Talent Registry. When our partners spin up a dedicated engineering pod in your domain, our technical founders reach out to you directly before any role is published publicly.",
          },
        },
      ],
    },
    {
      "@type": "JobPosting",
      "@id": "https://creed-tech.com/careers/#job-rust-architect",
      title: "Senior Distributed Systems & Rust Architect",
      description:
        "Architect and build high-throughput, low-latency distributed systems and sovereign cloud infrastructure with Rust and modern systems engineering practices.",
      datePosted: "2026-01-15T00:00:00Z",
      employmentType: "FULL_TIME",
      hiringOrganization: {
        "@type": "Organization",
        name: "Creed Tech",
        sameAs: "https://creed-tech.com",
        logo: "https://creed-tech.com/images/logo.webp",
      },
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: {
        "@type": "Country",
        name: "Worldwide",
      },
    },
    {
      "@type": "JobPosting",
      "@id": "https://creed-tech.com/careers/#job-ai-engineer",
      title: "Lead AI Systems Engineer (LLM Inference & CUDA)",
      description:
        "Engineer scalable LLM inference pipelines, CUDA kernels, and autonomous agent frameworks for mission-critical enterprise systems.",
      datePosted: "2026-01-15T00:00:00Z",
      employmentType: "FULL_TIME",
      hiringOrganization: {
        "@type": "Organization",
        name: "Creed Tech",
        sameAs: "https://creed-tech.com",
        logo: "https://creed-tech.com/images/logo.webp",
      },
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: {
        "@type": "Country",
        name: "Worldwide",
      },
    },
  ],
};

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(careersJsonLd) }}
      />
      <div className="w-full bg-[#F7F6F5] font-sans text-[#0F172A] border-b border-[#E6E4DF]">
        <CareerHero />
        <CareerWhy />
        <CareerProcess />
        <CareerRoles />
        <CareerFaq />
        <CareerHotline />
        <CareerLogic />
      </div>
    </>
  );
}
