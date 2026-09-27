import type { MetadataRoute } from "next";
import { getAllSeoSettings } from "@/lib/seoHelper";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://creed-tech.com";
  const seo = await getAllSeoSettings();
  const defaultDate = new Date("2026-09-28T00:00:00Z");

  const getDate = (key: string) =>
    seo[key]?.updated_at ? new Date(seo[key].updated_at!) : defaultDate;

  return [
    {
      url: `${baseUrl}/`,
      lastModified: getDate("home"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: getDate("services"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: getDate("portfolio"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/knowledge-center`,
      lastModified: getDate("knowledge_center"),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: getDate("careers"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: getDate("about"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: getDate("contact"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/security`,
      lastModified: defaultDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/security-gdpr`,
      lastModified: defaultDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/security-iso-27001`,
      lastModified: defaultDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/security-soc-2`,
      lastModified: defaultDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/security-pci-dss`,
      lastModified: defaultDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: defaultDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: defaultDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
