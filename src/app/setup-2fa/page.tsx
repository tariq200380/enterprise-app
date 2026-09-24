"use client";

import React, { useState, useEffect } from "react";
import { UserProfile, useUser, SignIn, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Setup2FAPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const is2FAActive = Boolean(user?.twoFactorEnabled || user?.totpEnabled);

  // Auto-redirect if 2FA is enabled
  useEffect(() => {
    if (isLoaded && is2FAActive) {
      router.push("/admin");
    }
  }, [isLoaded, is2FAActive, router]);

  const handleVerify = async () => {
    setIsVerifying(true);
    setStatusMessage(null);
    try {
      if (user) {
        await user.reload();
      }
      const res = await fetch("/api/admin/auth/check");
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.authenticated && !data.requires2FA) {
        setStatusMessage("Success! Two-factor authentication verified. Redirecting...");
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      } else if (data.requires2FA) {
        setStatusMessage(
          "Two-factor authentication is not yet detected. Please ensure you have completed adding your authenticator app under 'Security' -> 'Two-step verification'."
        );
      } else {
        setStatusMessage(data.error || "Verification pending. Please complete setup below.");
      }
    } catch {
      setStatusMessage("Unable to verify session. Please refresh the page.");
    } finally {
      setIsVerifying(false);
    }
  };

  // 1. Loading state while Clerk initializes session
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#070C18] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#0052FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 2. Unauthenticated state: show sign in so UserProfile is never rendered without an active user
  if (!user) {
    return (
      <div className="min-h-screen bg-[#070C18] text-white font-sans flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0F172A] border border-[#1E293B] rounded-2xl shadow-2xl p-6 sm:p-8 text-center backdrop-blur-md">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-2xl font-black tracking-wider text-white">
              CREED<span className="text-[#FF6B00]">TECH</span>
            </span>
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Sign In Required</h1>
          <p className="text-xs text-[#94A3B8] mb-6">
            Please sign in to your administrator account to configure mandatory Two-Factor Authentication.
          </p>
          <div className="flex justify-center">
            <SignIn routing="hash" fallbackRedirectUrl="/setup-2fa" />
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/sign-in?redirect_url=/setup-2fa"
              className="text-xs text-[#0052FF] hover:underline"
            >
              Or go to full sign-in page &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070C18] text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Branding */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-2xl font-black tracking-wider text-white">
              CREED<span className="text-[#FF6B00]">TECH</span>
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Mandatory Two-Factor Authentication
          </h1>
          <p className="mt-3 text-sm text-[#94A3B8] max-w-2xl mx-auto">
            Administrative policy requires all admin accounts to configure Two-Factor Authentication (TOTP authenticator app) before accessing the console.
          </p>
        </div>

        {/* Status Callout Banner */}
        <div className={`p-6 rounded-2xl border shadow-xl backdrop-blur-md transition-all ${
          is2FAActive
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
            : "bg-amber-500/10 border-amber-500/30 text-amber-300"
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{is2FAActive ? "🛡️" : "⚠️"}</span>
              <div>
                <h2 className="text-base font-bold text-white">
                  {is2FAActive
                    ? "Two-Factor Authentication is Enabled"
                    : "Action Required: Enable Authenticator App"}
                </h2>
                <p className="text-xs text-[#CBD5E1] mt-0.5">
                  {is2FAActive
                    ? "Your account meets the security standard. You have unrestricted administrator access."
                    : "Scroll down to 'Security' -> 'Two-step verification' in your profile to add an authenticator app (Google Authenticator, 1Password, Authy, etc.)."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleVerify}
                disabled={isVerifying}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#0052FF] hover:bg-[#0042D0] active:scale-[0.99] text-white text-xs font-semibold px-5 py-3 rounded-lg shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isVerifying ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Continue to Admin</span>
                    <span>&rarr;</span>
                  </>
                )}
              </button>

              <Link
                href="/admin"
                className="text-xs font-medium text-[#94A3B8] hover:text-white underline transition-colors px-2"
              >
                Admin Panel
              </Link>
            </div>
          </div>

          {statusMessage && (
            <div className="mt-4 pt-4 border-t border-white/10 text-xs font-medium flex items-center gap-2 text-white">
              <span>ℹ️</span>
              <span>{statusMessage}</span>
            </div>
          )}
        </div>

        {/* Embedded Clerk UserProfile Component */}
        <div className="flex justify-center">
          <div className="w-full bg-[#0F172A] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden p-2 sm:p-4">
            <SignedIn>
              <UserProfile routing="hash" />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}
