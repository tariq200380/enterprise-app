"use client";

import React from "react";

interface EnlargedMediaModalProps {
  enlargedMediaPopup: {
    imageUrl: string;
    title?: string;
    text?: string;
  } | null;
  onClose: () => void;
}

export const EnlargedMediaModal: React.FC<EnlargedMediaModalProps> = ({
  enlargedMediaPopup,
  onClose,
}) => {
  if (!enlargedMediaPopup) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <span className="text-base">🖼️</span>
            <span className="text-sm font-bold text-white truncate">
              {enlargedMediaPopup.title || enlargedMediaPopup.text || "Enlarged Image & Details"}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Enlarged Image Display */}
        <div className="bg-black flex items-center justify-center max-h-[60vh] p-2 overflow-hidden">
          <img
            src={enlargedMediaPopup.imageUrl}
            alt={enlargedMediaPopup.title || "Enlarged view"}
            className="max-h-[58vh] max-w-full object-contain rounded-lg"
          />
        </div>

        {/* Enlarged Text Display */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          {enlargedMediaPopup.title && (
            <h3 className="text-base font-bold text-white mb-1">
              {enlargedMediaPopup.title}
            </h3>
          )}
          {enlargedMediaPopup.text && (
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {enlargedMediaPopup.text}
            </p>
          )}
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
            >
              Close View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
