"use client";

import React from "react";

interface NewsWireModuleProps {
  showToast: (msg: string) => void;
}

export default function NewsWireModule({ showToast }: NewsWireModuleProps) {
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A]">Tech Wire Live Stream</h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Live enterprise technology updates, cloud infrastructure breakthroughs, and AI dispatch.
          </p>
        </div>
        <button
          onClick={() => showToast("✓ Refreshed latest wire dispatches from global feeds.")}
          className="px-4 py-2 bg-white border border-[#CBD5E1] text-[#334155] text-xs font-bold rounded shadow-sm hover:bg-[#F1F5F9] cursor-pointer"
        >
          🔄 Fetch Live Wire
        </button>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-lg divide-y divide-gray-100 shadow-sm">
        <div className="p-4 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block mb-1">BREAKING • 12 MIN AGO</span>
            <h3 className="text-sm font-bold text-[#0F172A]">
              NVIDIA Unveils Sovereign Enterprise AI Infrastructure Blueprint with Sub-Millisecond Interconnects
            </h3>
            <p className="text-xs text-[#64748B] mt-1">
              New enterprise reference architecture leverages Quantum-X800 InfiniBand switches for autonomous agent clusters.
            </p>
          </div>
          <button
            onClick={() => showToast("Wire story pinned to frontend ticker.")}
            className="px-3 py-1.5 bg-[#EFF6FF] text-[#0052FF] text-xs font-bold rounded border border-blue-200 hover:bg-blue-100 cursor-pointer"
          >
            Pin Story
          </button>
        </div>
        <div className="p-4 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">CLOUD ARCHITECTURE • 1 HOUR AGO</span>
            <h3 className="text-sm font-bold text-[#0F172A]">
              Kubernetes 1.33 Implements Native eBPF Telemetry Isolation Hooks for Frontier Multi-Tenant Workloads
            </h3>
            <p className="text-xs text-[#64748B] mt-1">
              Cloud Native Computing Foundation announces enterprise benchmark results with zero latency overhead.
            </p>
          </div>
          <button
            onClick={() => showToast("Wire story pinned to frontend ticker.")}
            className="px-3 py-1.5 bg-[#EFF6FF] text-[#0052FF] text-xs font-bold rounded border border-blue-200 hover:bg-blue-100 cursor-pointer"
          >
            Pin Story
          </button>
        </div>
      </div>
    </div>
  );
}
