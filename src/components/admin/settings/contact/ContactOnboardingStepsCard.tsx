"use client";

import React from "react";
import { ContactOnboardingStepItem, ContactSettingsData } from "../types";

interface Props {
  data: ContactSettingsData;
  onChangeField: (field: keyof ContactSettingsData, value: any) => void;
}

export default function ContactOnboardingStepsCard({ data, onChangeField }: Props) {
  const steps = data.onboardingSteps || [];

  const handleAddStep = () => {
    const nextNum = String(steps.length + 1).padStart(2, "0");
    const newStep: ContactOnboardingStepItem = {
      id: `step-${Date.now()}`,
      number: nextNum,
      headline: `New Onboarding Phase #${steps.length + 1}`,
      timelineSla: "Within 7 Days",
      explanation: "Detailed description of this engineering milestone and onboarding deliverable.",
    };
    onChangeField("onboardingSteps", [...steps, newStep]);
  };

  const handleUpdateStep = (
    index: number,
    field: keyof ContactOnboardingStepItem,
    value: string
  ) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    onChangeField("onboardingSteps", updated);
  };

  const handleDeleteStep = (index: number) => {
    if (confirm(`Delete Stage ${steps[index].number || index + 1}?`)) {
      const updated = steps.filter((_, i) => i !== index);
      onChangeField("onboardingSteps", updated);
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm overflow-hidden">
      {/* Header Bar */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-6 py-3.5 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">📌</span>
          <h3 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
            4-Stage Onboarding Process Steps
          </h3>
        </div>
        <button
          type="button"
          onClick={handleAddStep}
          className="px-3.5 py-1.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold rounded cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
        >
          <span>＋</span>
          <span>Add Onboarding Step</span>
        </button>
      </div>

      <div className="p-6 flex flex-col gap-5">
        {/* Top Badges & Titles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Steps Badge Tag
            </label>
            <input
              type="text"
              value={data.stepsBadge}
              onChange={(e) => onChangeField("stepsBadge", e.target.value)}
              placeholder="EXECUTION CERTAINTY"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Steps Section Title
            </label>
            <input
              type="text"
              value={data.stepsTitle}
              onChange={(e) => onChangeField("stepsTitle", e.target.value)}
              placeholder="What Happens After You Reach Out?"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-semibold text-[#0F172A]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">
            Steps Description
          </label>
          <textarea
            rows={2}
            value={data.stepsDescription}
            onChange={(e) => onChangeField("stepsDescription", e.target.value)}
            placeholder="Our deterministic 4-stage onboarding model eliminates ambiguity and ensures rapid engineering ramp-up."
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] leading-relaxed"
          />
        </div>

        {/* Step Items List */}
        <div className="flex flex-col gap-4 mt-2">
          {steps.map((step, idx) => (
            <div
              key={step.id || idx}
              className="border border-[#E2E8F0] rounded-lg overflow-hidden bg-white"
            >
              {/* Step Item Header */}
              <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#0F172A]">
                  Stage {step.number || String(idx + 1).padStart(2, "0")}: {step.headline || "Untitled Stage"}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteStep(idx)}
                  className="px-2.5 py-1 bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B] text-[11px] font-bold rounded cursor-pointer transition-colors"
                >
                  ✕ Delete
                </button>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-[#64748B] mb-1">
                      Number
                    </label>
                    <input
                      type="text"
                      value={step.number}
                      onChange={(e) => handleUpdateStep(idx, "number", e.target.value)}
                      placeholder="01"
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-mono text-center"
                    />
                  </div>
                  <div className="sm:col-span-7">
                    <label className="block text-[11px] font-semibold text-[#64748B] mb-1">
                      Step Headline *
                    </label>
                    <input
                      type="text"
                      value={step.headline}
                      onChange={(e) => handleUpdateStep(idx, "headline", e.target.value)}
                      placeholder="Architectural Review"
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] font-semibold text-[#0F172A]"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-semibold text-[#64748B] mb-1">
                      Timeline SLA
                    </label>
                    <input
                      type="text"
                      value={step.timelineSla}
                      onChange={(e) => handleUpdateStep(idx, "timelineSla", e.target.value)}
                      placeholder="Within 4 Hours"
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] text-[#0052FF] font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#64748B] mb-1">
                    Step Explanation
                  </label>
                  <textarea
                    rows={2}
                    value={step.explanation}
                    onChange={(e) => handleUpdateStep(idx, "explanation", e.target.value)}
                    placeholder="Our systems architects evaluate your scope, stack constraints, and timeline feasibility within 4 hours."
                    className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#0052FF] leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
