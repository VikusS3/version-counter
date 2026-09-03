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
      bg: "bg-[#090a16]/95",
      border: "border-emerald-500/40",
      accent: "text-emerald-400",
      iconBg: "bg-emerald-500/20",
      icon: "check_circle",
      shadow: "shadow-[0_0_30px_rgba(16,185,129,0.25)]",
    },
    error: {
      bg: "bg-[#090a16]/95",
      border: "border-rose-500/40",
      accent: "text-rose-400",
      iconBg: "bg-rose-500/20",
      icon: "error",
      shadow: "shadow-[0_0_30px_rgba(244,63,94,0.25)]",
    },
    info: {
      bg: "bg-[#090a16]/95",
      border: "border-indigo-500/40",
      accent: "text-indigo-400",
      iconBg: "bg-indigo-500/20",
      icon: "info",
      shadow: "shadow-[0_0_30px_rgba(99,102,241,0.25)]",
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
        ${isVisible && !isLeaving ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}
      `}
    >
      <div 
        className={`
          ${style.bg} ${style.border}
          backdrop-blur-2xl
          border
          text-white px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl
          ${style.shadow}
          flex items-center gap-3.5
          w-full sm:min-w-[300px] sm:max-w-[420px]
        `}
      >
        <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${style.iconBg} ${style.accent}`}>
          <span 
            className="material-symbols-outlined text-lg"
            aria-hidden="true"
          >
            {style.icon}
          </span>
        </div>
        <span className="font-mono text-xs sm:text-sm leading-relaxed flex-1 text-slate-200">
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