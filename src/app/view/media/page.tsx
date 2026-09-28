import React from "react";
import type { Metadata } from "next";
import MediaViewerClient from "./MediaViewerClient";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const rawTitle = Array.isArray(sp.title) ? sp.title[0] : sp.title;
  const title = rawTitle || "Equipment & Media Details";

  return {
    title: `${title} | Creed Tech Enterprise`,
    description: "Verified equipment specifications, catalog details, and engineering walk-through.",
  };
}

export default async function MediaViewerPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const getParam = (key: string): string => {
    const val = sp[key];
    return Array.isArray(val) ? val[0] || "" : val || "";
  };

  const rawGallery = getParam("gallery");
  const gallery = rawGallery
    ? rawGallery
        .split(",")
        .map((u) => u.trim())
        .filter(Boolean)
    : [];

  return (
    <MediaViewerClient
      type={getParam("type") || "image"}
      src={getParam("src") || getParam("url")}
      thumb={getParam("thumb")}
      gallery={gallery}
      title={getParam("title") || "Featured Specification & Overview"}
      year={getParam("year")}
      condition={getParam("condition") || "★★★★☆"}
      specs={getParam("specs")}
      desc={getParam("desc") || getParam("details")}
      desk={getParam("desk") || "Enterprise Solutions Desk"}
      email={getParam("email") || "sales@creed-tech.com"}
      phone={getParam("phone") || "+1 (888) 492-7333"}
    />
  );
}
