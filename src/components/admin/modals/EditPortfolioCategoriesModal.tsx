"use client";

import React, { useState, useEffect } from "react";
import { CategoryGroup, DEFAULT_CATEGORY_GROUPS } from "@/lib/portfolio-types";
import { useAdminFetch } from "@/lib/useAdminFetch";

interface EditPortfolioCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
  showToast?: (msg: string, type?: "success" | "error") => void;
}

export default function EditPortfolioCategoriesModal({
  isOpen,
  onClose,
  onSaved,
  showToast,
}: EditPortfolioCategoriesModalProps) {
  const adminFetch = useAdminFetch();
  const [categories, setCategories] = useState<CategoryGroup[]>(DEFAULT_CATEGORY_GROUPS);
  const [activeCatIndex, setActiveCatIndex] = useState<number>(1); // Default to AI & Orchestration
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const loadCategories = async () => {
      try {
        setLoading(true);
        const res = await adminFetch("/api/admin/portfolio/categories");
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.categories) && data.categories.length > 0) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.error("Failed to load category headings:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCategories();
    return () => {
      isMounted = false;
    };
  }, [isOpen, adminFetch]);

  if (!isOpen) return null;

  const currentCat = categories[activeCatIndex] || categories[0];

  const handleFieldChange = (field: keyof CategoryGroup, val: string) => {
    setCategories((prev) => {
      const next = [...prev];
      next[activeCatIndex] = {
        ...next[activeCatIndex],
        [field]: val,
      };
      return next;
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await adminFetch("/api/admin/portfolio/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories }),
      });
      const data = await res.json();
      if (data.success) {
        showToast?.("✓ Portfolio section headings updated successfully!");
        onSaved?.();
        onClose();
      } else {
        showToast?.(data.error || "Failed to update category headings", "error");
      }
    } catch (err: any) {
      showToast?.(err?.message || "Failed to update category headings", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleAddNewCategory = () => {
    const newId = `discipline-${Date.now().toString().slice(-4)}`;
    const newCategory: CategoryGroup = {
      id: newId,
      name: "New Discipline",
      badge: "NEW DISCIPLINE",
      h2Title: "Enterprise Engineering & Specialized Architecture",
      description: "Mission-critical systems and specialized engineering solutions.",
    };
    setCategories((prev) => [...prev, newCategory]);
    setActiveCatIndex(categories.length);
    showToast?.("New category added! Edit the details below and click 'Save Category Headings'.");
  };

  const handleDeleteCategory = (idxToDelete: number) => {
    if (categories.length <= 1) {
      showToast?.("At least one category is required.", "error");
      return;
    }
    const catName = categories[idxToDelete]?.name || "this category";
    if (confirm(`Are you sure you want to delete category "${catName}"?`)) {
      setCategories((prev) => prev.filter((_, i) => i !== idxToDelete));
      setActiveCatIndex((prev) => Math.max(0, prev >= idxToDelete ? prev - 1 : prev));
      showToast?.(`Deleted "${catName}". Click 'Save Category Headings' to persist.`);
    }
  };

  const handleResetToDefault = () => {
    if (confirm("Reset all category headings to enterprise defaults?")) {
      setCategories(DEFAULT_CATEGORY_GROUPS);
      setActiveCatIndex(0);
      showToast?.("Reset to defaults. Click 'Save Category Headings' to persist.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-[#111827] rounded-2xl border border-gray-200 max-w-2xl w-full p-6 shadow-2xl relative text-left my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
        >
          ✕
        </button>

        <span className="text-[10px] font-bold text-[#0052FF] uppercase tracking-wider block mb-1">
          PORTFOLIO SECTION HEADINGS CMS
        </span>
        <h3 className="text-lg font-bold text-[#0F172A] mb-1">
          Edit Category Section Headings &amp; Banners
        </h3>
        <p className="text-xs text-[#64748B] mb-5">
          Customize the upper category banner titles, badges, and descriptions shown above each case study group on the Portfolio page.
        </p>

        {loading ? (
          <div className="py-12 text-center text-xs text-slate-500 font-semibold">
            Loading section categories...
          </div>
        ) : (
          <form onSubmit={handleSave} className="flex flex-col gap-4 text-xs">
            {/* Category Selector Tabs with Add Button */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Select Category to Edit ({categories.length}):
                </span>
                <button
                  type="button"
                  onClick={handleAddNewCategory}
                  className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-[#0052FF] font-bold rounded-md border border-blue-200 text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>+</span> Add New Category
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
                {categories.map((cat, idx) => (
                  <button
                    key={cat.id || idx}
                    type="button"
                    onClick={() => setActiveCatIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all cursor-pointer flex-1 text-center min-w-[120px] ${
                      activeCatIndex === idx
                        ? "bg-white text-[#0052FF] shadow-xs border border-blue-200"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Category Heading Fields */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <span className="font-bold text-[#0F172A] text-xs">
                    Editing Category #{activeCatIndex + 1}: <span className="text-[#0052FF]">{currentCat.name}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                    #{currentCat.id}
                  </span>
                  {categories.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(activeCatIndex)}
                      className="px-2 py-0.5 text-[11px] text-red-600 hover:bg-red-50 rounded border border-red-200 font-semibold cursor-pointer transition-colors"
                      title="Delete this category"
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Category Section Name (Tab &amp; Pill Label) *
                </label>
                <input
                  type="text"
                  required
                  value={currentCat.name || ""}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#0052FF] font-medium"
                  placeholder="e.g. Enterprise AI & Orchestration"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Upper Badge Label (Orange Tag) *
                </label>
                <input
                  type="text"
                  required
                  value={currentCat.badge || ""}
                  onChange={(e) => handleFieldChange("badge", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#0052FF] font-semibold text-[#EA580C]"
                  placeholder="e.g. AI & NEURAL ARCHITECTURE"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Main Section Heading (H2 Title) *
                </label>
                <input
                  type="text"
                  required
                  value={currentCat.h2Title || ""}
                  onChange={(e) => handleFieldChange("h2Title", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#0052FF] font-bold text-slate-900"
                  placeholder="e.g. Enterprise AI Solutions, LLMs & Autonomous Agent Pipelines"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Section Subtitle / Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={currentCat.description || ""}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#0052FF] leading-relaxed"
                  placeholder="Describe the discipline focus and enterprise capabilities..."
                />
              </div>
            </div>

            {/* Live Preview Box */}
            <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Portfolio Page Live Preview
              </span>
              <div className="bg-white p-3.5 rounded-lg border border-blue-200/60">
                <span className="text-[10.5px] font-bold text-[#EA580C] uppercase tracking-wider block mb-0.5">
                  {currentCat.badge || "CATEGORY BADGE"}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-[#0F172A] leading-tight mb-1">
                  {currentCat.h2Title || "Section Heading"}
                </h4>
                <p className="text-xs text-slate-500 leading-normal">
                  {currentCat.description || "Section description preview..."}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200 mt-2">
              <button
                type="button"
                onClick={handleResetToDefault}
                className="px-3 py-2 text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
              >
                Reset Defaults
              </button>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#0052FF] hover:bg-[#0042D0] text-white font-bold rounded-lg shadow-sm cursor-pointer disabled:opacity-60 transition-colors"
                >
                  {saving ? "Saving Headings..." : "Save Category Headings"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
