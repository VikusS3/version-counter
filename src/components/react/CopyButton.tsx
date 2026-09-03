import { useState, useCallback } from "react";
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
        className={`flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white px-6 sm:px-8 py-3 min-h-[48px] rounded-xl font-display text-xs sm:text-sm font-bold tracking-wider uppercase transition-all transform border border-white/20 shadow-[0_0_24px_rgba(168,85,247,0.35)] cursor-pointer ${
          isPressed ? "scale-95 brightness-125" : "hover:scale-105"
        }`}
      >
        <span className="material-symbols-outlined text-lg" aria-hidden="true">notifications_active</span>
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
