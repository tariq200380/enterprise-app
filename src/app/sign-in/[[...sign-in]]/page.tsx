import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign In | Creed Tech",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#070C18]">
      <SignIn
        fallbackRedirectUrl="/admin"
      />
    </div>
  );
}
