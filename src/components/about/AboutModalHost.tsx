"use client";

import { useState, useEffect } from "react";
import AboutConversationModal from "./AboutConversationModal";

export default function AboutModalHost() {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState("Enterprise Architecture & Systems");

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ topic?: string }>;
      if (customEvent.detail?.topic) {
        setTopic(customEvent.detail.topic);
      }
      setIsOpen(true);
    };

    window.addEventListener("open-about-modal", handleOpen);
    return () => window.removeEventListener("open-about-modal", handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <AboutConversationModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      defaultTopic={topic}
    />
  );
}
