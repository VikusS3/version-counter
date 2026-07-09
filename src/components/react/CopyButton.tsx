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
  errorMessage = "Failed to copy link",
}: CopyButtonProps) {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ message, type });
    },
    [],
  );

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
        type="button"
        aria-label={`${label} - Copies current page URL to clipboard`}
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-6 sm:px-8 py-3 min-h-[48px] rounded-xl font-bold transition-all transform hover:scale-105"
      >
        <span className="material-symbols-outlined" aria-hidden="true">notifications_active</span>
        <span>{label}</span>
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
