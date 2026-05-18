import React, { useState, useCallback } from "react";
import { Toast } from "./Toast";

interface CopyButtonProps {
  label?: string;
  successMessage?: string;
  errorMessage?: string;
}

export function CopyButton ({ 
  label = "Remind Me", 
  successMessage = "Link copied! Share it to never miss an update",
  errorMessage = "Failed to copy link"
}: CopyButtonProps) {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
  }, []);

  const handleClick = useCallback(async () => {
    setIsPressed(true);
    const url = window.location.href;
    
    try {
      await navigator.clipboard.writeText(url);
      showToast(successMessage, "success");
    } catch {
      showToast(errorMessage, "error");
    }
    
    setTimeout(() => setIsPressed(false), 150);
  }, [successMessage, errorMessage, showToast]);

  return (
    <>
      <button
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setTimeout(() => setIsPressed(false), 150)}
        onMouseLeave={() => setIsPressed(false)}
        onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
        type="button"
        aria-label={`${label} - Copies current page URL to clipboard`}
        className="
          relative overflow-hidden
          flex items-center gap-2.5
          px-6 py-3.5 min-h-[52px]
          rounded-xl font-bold text-sm tracking-wide uppercase
          transition-all duration-200 ease-out
          bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500
          text-gray-900
          shadow-lg shadow-amber-500/30
          hover:shadow-amber-500/50 hover:shadow-xl
          hover:scale-[1.02] active:scale-[0.98]
          focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900
          before:absolute before:inset-0
          before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
          before:translate-x-[-200%] before:skew-x-12
          hover:before:translate-x-[200%] before:transition-transform before:duration-700
        "
      >
        <span 
          className={`
            material-symbols-outlined text-lg leading-none transition-transform duration-200
            ${isPressed ? "scale-75" : "scale-100"}
          `}
        >
          notifications_active
        </span>
        <span className="relative">{label}</span>
      </button>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}