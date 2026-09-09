import React from "react";
import { type SubTabId, type ServiceFeature } from "../servicesData";

interface Props {
  activeSvcId: string;
  activeSubTab: SubTabId;
  num: string;
  totalServices: number;
  paneTitle: string;
  paneSubtitle: string;
  paneDesc: string;
  overview: ServiceFeature[];
  servicesList: ServiceFeature[];
  benefitCards: ServiceFeature[];
  process: ServiceFeature[];
  resultCards: ServiceFeature[];
}

export default function ServiceContentPane({
  activeSvcId,
  activeSubTab,
  num,
  totalServices,
  paneTitle,
  paneSubtitle,
  paneDesc,
  overview,
  servicesList,
  benefitCards,
  process,
  resultCards,
}: Props) {
  return (
    <main className="w-full">
      <div className="bg-white border border-[#D8E2ED] rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] min-h-[400px] transition-all duration-300">
        {/* Header Badge + Title + Subtitle + Description + Divider */}
        <div
          key={`header-${activeSvcId}-${activeSubTab}`}
          className="pb-6 mb-6 border-b border-[#E2E8F0] animate-header-enter"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF3EB] border border-[#FFD8BE] rounded-md text-[#FF6B00] text-[12px] font-bold tracking-[0.04em] leading-none mb-3">
            <span>
              SERVICE {num} / {String(totalServices).padStart(2, "0")}
            </span>
          </div>
          <h3 className="text-3xl sm:text-[34px] lg:text-[38px] font-bold text-[#0F172A] tracking-[-0.025em] mb-2 leading-tight">
            {paneTitle}
          </h3>
          {paneSubtitle && (
            <p className="text-[18px] font-semibold text-[#0052FF] mb-3 leading-snug">
              {paneSubtitle}
            </p>
          )}
          <p className="text-[17px] text-[#475569] leading-relaxed max-w-[850px] m-0">
            {paneDesc}
          </p>
        </div>

        {/* TAB 1: OVERVIEW (4 Cards: 2-Column Grid) */}
        {activeSubTab === "overview" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {overview.map((item, idx) => (
              <div
                key={`${activeSvcId}-ov-${idx}`}
                style={{ animationDelay: `${idx * 45}ms` }}
                className="bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-[14px] p-7 h-full flex flex-col shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.1)] transition-all duration-300 ease-out animate-card-enter cursor-default"
              >
                <div className="flex items-center justify-between mb-4">
                  {item.badge ? (
                    <span className="text-[11px] font-extrabold text-[#0052FF] bg-[#EFF6FF] border border-[#DBEAFE] px-2.5 py-1 rounded uppercase tracking-[0.04em]">
                      {item.badge}
                    </span>
                  ) : <span />}
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00] inline-block" />
                </div>
                <h4 className="text-[18px] font-semibold text-[#0F172A] mb-3 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[15px] text-[#475569] leading-relaxed m-0 font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: SERVICES (6 Cards: 3-Column Grid) */}
        {activeSubTab === "services" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {servicesList.map((item, idx) => (
              <div
                key={`${activeSvcId}-svc-${idx}`}
                style={{ animationDelay: `${idx * 40}ms` }}
                className="bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-[14px] p-7 h-full flex flex-col shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.1)] transition-all duration-300 ease-out animate-card-enter cursor-default"
              >
                <div className="flex items-start gap-4 mb-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#0052FF] shrink-0">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <h4 className="text-[18px] font-semibold text-[#0F172A] leading-snug m-0">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[15px] text-[#475569] leading-relaxed pl-10 m-0 font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: BENEFITS (6 Cards: 3-Column Grid) */}
        {activeSubTab === "benefits" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {benefitCards.map((item, idx) => (
              <div
                key={`${activeSvcId}-ben-${idx}`}
                style={{ animationDelay: `${idx * 40}ms` }}
                className="bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-[14px] p-7 h-full flex flex-col shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.1)] transition-all duration-300 ease-out animate-card-enter cursor-default"
              >
                <div className="flex items-start gap-4 mb-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#0052FF] shrink-0">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <h4 className="text-[18px] font-semibold text-[#0F172A] leading-snug m-0">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[15px] text-[#475569] leading-relaxed pl-10 m-0 font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: PROCESS (6 Step Cards: 3-Column Grid) */}
        {activeSubTab === "process" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {process.map((st, idx) => (
              <div
                key={`${activeSvcId}-proc-${idx}`}
                style={{ animationDelay: `${idx * 40}ms` }}
                className="bg-[#F8FAFC] border border-[#E2E8F0] border-t-[3.5px] border-t-[#0052FF] hover:border-t-[#FF6B00] hover:border-[#CBD5E1] rounded-[14px] p-7 h-full flex flex-col shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.1)] transition-all duration-300 ease-out animate-card-enter cursor-default"
              >
                <div className="flex items-center gap-3 mb-3">
                  {st.step && (
                    <span className="text-[11px] font-extrabold text-[#0052FF] bg-[#EFF6FF] border border-[#DBEAFE] px-2 py-0.5 rounded">
                      STEP {st.step}
                    </span>
                  )}
                  <h4 className="text-[17px] font-bold text-[#0F172A] leading-snug m-0">
                    {st.title}
                  </h4>
                </div>
                <p className="text-[15px] text-[#475569] leading-relaxed mt-2 m-0 font-normal">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: RESULTS (6 Cards: 3-Column Grid, Premium Light-Blue Style) */}
        {activeSubTab === "proven" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {resultCards.map((item, idx) => (
              <div
                key={`${activeSvcId}-res-${idx}`}
                style={{ animationDelay: `${idx * 40}ms` }}
                className="bg-[#F0F7FF] border border-[#CFE2FE] border-t-[3.5px] border-t-[#FF6B00] hover:border-[#0052FF] rounded-[14px] p-7 h-full flex flex-col shadow-[0_4px_14px_rgba(0,82,255,0.05)] hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-2px_rgba(0,82,255,0.15)] transition-all duration-300 ease-out animate-card-enter cursor-default"
              >
                <div className="flex items-start gap-3.5 mb-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#DBEAFE] border border-[#BFDBFE] text-[#0052FF] shrink-0">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                  </span>
                  <h4 className="text-[18px] font-semibold text-[#0F172A] leading-snug m-0">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[15px] text-[#334155] leading-relaxed pl-11 m-0 font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
