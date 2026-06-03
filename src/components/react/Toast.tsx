import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type = "success", duration = 3500, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(onClose, 400);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(onClose, 400);
  };

  const typeStyles = {
    success: {
      bg: "bg-emerald-600",
      border: "border-emerald-400/30",
      icon: "check_circle",
      shadow: "shadow-emerald-500/20",
    },
    error: {
      bg: "bg-rose-600",
      border: "border-rose-400/30",
      icon: "error",
      shadow: "shadow-rose-500/20",
    },
    info: {
      bg: "bg-sky-600",
      border: "border-sky-400/30",
      icon: "info",
      shadow: "shadow-sky-500/20",
    },
  };

  const style = typeStyles[type];

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className={`
        fixed bottom-4 right-4 left-4 sm:bottom-6 sm:right-6 sm:left-auto z-50
        transition-all duration-300 ease-out
        ${isVisible && !isLeaving ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <div 
        className={`
          ${style.bg} ${style.border}
          backdrop-blur-sm
          border-b-4
          text-white px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl
          shadow-2xl ${style.shadow}
          flex items-center gap-3
          w-full sm:min-w-[280px] sm:max-w-[400px]
        `}
      >
        <span 
          className="material-symbols-outlined text-xl shrink-0"
          aria-hidden="true"
        >
          {style.icon}
        </span>
        <span className="font-medium text-sm leading-relaxed flex-1">
          {message}
        </span>
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close notification"
          className="
            shrink-0 p-1 rounded-lg
            hover:bg-white/20 transition-colors
            focus:outline-none focus:ring-2 focus:ring-white/50
          "
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            close
          </span>
        </button>
      </div>
    </div>
  );
}

export function ToastContainer({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}