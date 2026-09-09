"use client";

import React, { useState, useEffect } from "react";
import { SubscriberItem } from "@/types/admin";
import AddSubscriberModal from "../modals/AddSubscriberModal";

interface SubscribersModuleProps {
  subscribers?: SubscriberItem[];
  searchQuery?: string;
  onOpenAddModal?: () => void;
  onDeleteSubscriber?: (id: number) => void;
  onExportCsv?: () => void;
  showToast?: (msg: string, type?: "success" | "error") => void;
  onRefresh?: () => void;
}

export default function SubscribersModule({
  subscribers: propSubscribers,
  searchQuery = "",
  onOpenAddModal,
  onDeleteSubscriber,
  onExportCsv,
  showToast,
  onRefresh,
}: SubscribersModuleProps) {
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>(propSubscribers || []);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/admin/subscribers");
      const data = await res.json();
      if (data.subscribers) setSubscribers(data.subscribers);
    } catch (err) {
      console.error("Failed to load subscribers:", err);
    }
  };

  useEffect(() => {
    if (propSubscribers) {
      setSubscribers(propSubscribers);
    } else {
      fetchSubscribers();
    }
  }, [propSubscribers]);

  const handleDelete = async (id: number) => {
    if (!confirm(`Delete subscriber #${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/subscribers?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubscribers((prev) => prev.filter((s) => s.id !== id));
        showToast?.("Subscriber removed");
        onDeleteSubscriber?.(id);
        fetchSubscribers();
        onRefresh?.();
      } else {
        showToast?.("Failed to remove subscriber", "error");
      }
    } catch {
      showToast?.("Failed to remove subscriber", "error");
    }
  };

  const handleExport = () => {
    if (onExportCsv) {
      onExportCsv();
      return;
    }
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Email,Origin Source,Subscribed At,Status"]
        .concat(
          subscribers.map(
            (s) =>
              `${s.id},${s.email},${s.source || "Web Form"},${s.created_at || ""},${s.status || "ACTIVE"}`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast?.("Subscribers CSV exported");
  };

  const handleCreated = (newSub: SubscriberItem) => {
    setSubscribers((prev) => [newSub, ...prev]);
    setShowAddModal(false);
    fetchSubscribers();
    onRefresh?.();
    showToast?.(`✓ Subscriber "${newSub.email}" enrolled!`);
  };

  const filtered = subscribers.filter(
    (s) =>
      s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.source?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-[#0F172A]">Newsletter Leads &amp; Subscribers</h1>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Direct list of enterprise professionals subscribed to Creed Tech technical dispatches.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (onOpenAddModal) onOpenAddModal();
              else setShowAddModal(true);
            }}
            className="px-4 py-2 bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-bold rounded hover:bg-[#F1F5F9] cursor-pointer"
          >
            + Add Subscriber
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold rounded shadow flex items-center gap-1.5 cursor-pointer"
          >
            <span>📥</span> <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold">
              <th className="p-3.5">ID</th>
              <th className="p-3.5">Subscriber Email</th>
              <th className="p-3.5">Origin Source</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-[#F8FAFC]">
                <td className="p-3.5 font-bold text-[#0F172A]">#{s.id}</td>
                <td className="p-3.5 font-semibold text-[#0F172A]">{s.email}</td>
                <td className="p-3.5 text-[#64748B]">{s.source}</td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded font-bold text-[10px]">
                    {s.status}
                  </span>
                </td>
                <td className="p-3.5 text-right">
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="px-2.5 py-1 text-red-600 hover:bg-red-50 rounded font-semibold cursor-pointer"
                  >
                    Unsubscribe / Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Embedded Add Subscriber Modal */}
      <AddSubscriberModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubscriberCreated={handleCreated}
        showToast={showToast || (() => {})}
      />
    </div>
  );
}
