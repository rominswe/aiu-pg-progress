import React from "react";
import { X } from "lucide-react";

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative w-full bg-white rounded-2xl shadow-2xl overflow-hidden ${sizeClasses[size] || sizeClasses.md}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

