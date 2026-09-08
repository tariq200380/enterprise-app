"use client";

import { useState } from "react";
import ContactDesign from "./ContactDesign";

export default function ContactLogic() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const service = (formData.get("service") as string) || "Software Development";
    const fullName = (formData.get("fullName") as string)?.trim();
    const workEmail = (formData.get("workEmail") as string)?.trim();
    const company = (formData.get("company") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const projectDetails = (formData.get("projectDetails") as string)?.trim();
    const needNda = formData.get("needNda") === "on";

    if (!fullName || !workEmail || !projectDetails) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (*).");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: fullName,
          email: workEmail,
          company: company || "Direct Inbound Client",
          phone: phone || "",
          service,
          project_details: projectDetails,
          need_nda: needNda,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to submit inquiry. Please try again.");
      }

      setStatus("success");
      form.reset();

      // Automatically dismiss success message after 4 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  const handleDismiss = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <ContactDesign
      status={status}
      errorMessage={errorMessage}
      onSubmit={handleSubmit}
      onDismiss={handleDismiss}
    />
  );
}
