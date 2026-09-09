"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export interface ContactFieldErrors {
  fullName?: string;
  workEmail?: string;
  projectDetails?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useContactLogic() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [selectedService, setSelectedService] = useState("Software Development");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleDismiss = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setStatus("idle");
    setErrorMessage("");
    setFieldErrors({});
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === "loading") {
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const service = (formData.get("service") as string) || selectedService || "Software Development";
    const fullName = (formData.get("fullName") as string)?.trim() || "";
    const workEmail = (formData.get("workEmail") as string)?.trim() || "";
    const company = (formData.get("company") as string)?.trim() || "";
    const phone = (formData.get("phone") as string)?.trim() || "";
    const projectDetails = (formData.get("projectDetails") as string)?.trim() || "";
    const needNda = formData.get("needNda") === "on";

    const errors: ContactFieldErrors = {};

    if (!fullName) {
      errors.fullName = "Full name is required.";
    }

    if (!workEmail) {
      errors.workEmail = "Work email is required.";
    } else if (!EMAIL_REGEX.test(workEmail)) {
      errors.workEmail = "Please enter a valid work email address.";
    }

    if (!projectDetails) {
      errors.projectDetails = "Project details are required.";
    } else if (projectDetails.length < 10) {
      errors.projectDetails = "Please provide at least 10 characters describing your project.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      const firstError = errors.fullName || errors.workEmail || errors.projectDetails;
      setErrorMessage(firstError || "Please fill in all required fields accurately.");
      return;
    }

    // Clear previous errors
    setFieldErrors({});
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

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit inquiry. Please try again.");
      }

      setStatus("success");
      form.reset();
      setSelectedService("Software Development");

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return {
    status,
    errorMessage,
    fieldErrors,
    selectedService,
    setSelectedService,
    handleSubmit,
    handleDismiss,
  };
}

export default useContactLogic;
