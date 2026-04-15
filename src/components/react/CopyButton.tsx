import React, { useState, useCallback } from "react";
import { Toast } from "./Toast";

interface CopyButtonProps {
  label?: string;
  successMessage?: string;
  errorMessage?: string;
}

export function CopyButton({ 
  label = "Remind Me", 
  successMessage = "Link copied! Share it to never miss an update",
  errorMessage = "Failed to copy link"
}: CopyButtonProps) {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
  }, []);

  const handleClick = useCallback(async () => {
    const url = window.location.href;
    
    try {
      await navigator.clipboard.writeText(url);
      showToast(successMessage, "success");
    } catch {
      showToast(errorMessage, "error");
    }
  }, [successMessage, errorMessage, showToast]);

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-3 rounded-xl font-bold transition-all"
      >
        <span className="material-symbols-outlined">share</span>
        {label}
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
