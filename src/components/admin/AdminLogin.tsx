"use client";

import React, { useState } from "react";
import { useAdminFetch } from "@/lib/useAdminFetch";

interface AdminLoginProps {
  onLogin: (email: string) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const adminFetch = useAdminFetch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email/username and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await adminFetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onLogin(data.user?.email || email.trim());
      } else {
        setError(data.error || "Invalid administrator credentials.");
      }
    } catch {
      setError("Unable to connect to authentication service. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070C18] flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0052FF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#0F172A]/90 border border-[#1E293B] rounded-2xl shadow-2xl p-8 relative z-10 backdrop-blur-md">
        {/* Header / Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-2xl font-black tracking-wider text-white">
              CREED<span className="text-[#FF6B00]">TECH</span>
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-[#38BDF8] uppercase">
              Master CMS 2.0 Console
            </span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Admin Sign In</h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Enter your credentials to access the enterprise control panel.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
              Admin Email / Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@creed-tech.com"
                className="w-full bg-[#1E293B] border border-[#334155] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#64748B] outline-none focus:border-[#0052FF] transition-all"
                autoFocus
              />
              <span className="absolute right-3 top-2.5 text-[#64748B] text-xs">✉️</span>
            </div>
          </div>

          <div>
            <div className="mb-1.5">
              <label className="block text-xs font-semibold text-[#CBD5E1]">
                Security Password
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#1E293B] border border-[#334155] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#64748B] outline-none focus:border-[#0052FF] transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[#64748B] hover:text-white text-xs"
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#0052FF] hover:bg-[#0042D0] active:scale-[0.99] text-white font-bold text-xs py-3 rounded-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying Session...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin Panel</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#1E293B] text-center">
          <p className="text-[11px] text-[#64748B]">
            Enterprise Administrative Access &bull; Protected by Secure Session Verification
          </p>
        </div>
      </div>
    </div>
  );
}
