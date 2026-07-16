import { useState, useEffect, useRef, useCallback, useMemo } from "react";

export interface PromoCampaign {
  storageKey: string;
  videoSrc: string;
  posterSrc?: string;
  title: string;
  description: string;
  targetDate?: string;
  ctaLabel: string;
  ctaHref: string;
  accentColor?: string;
}

interface PromotionalPopupProps {
  campaign: PromoCampaign;
  showDelay?: number;
  autoCloseDelay?: number;
}

function getTargetMs(targetDate?: string): number {
  if (targetDate) {
    return new Date(targetDate).getTime();
  }
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth(), 24, 23, 59, 59);
  if (target.getTime() <= now.getTime()) {
    target.setMonth(target.getMonth() + 1);
  }
  return target.getTime();
}

export function PromotionalPopup({
  campaign,
  showDelay = 5000,
  autoCloseDelay = 35000,
}: PromotionalPopupProps) {
  const SESSION_SHOWN = "shown";
  const LOCAL_DISMISSED = "dismissed";

  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const appearTimerRef = useRef<number | undefined>(undefined);
  const autoCloseTimerRef = useRef<number | undefined>(undefined);
  const intervalRef = useRef<number | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const dismissedRef = useRef(false);
  const closeHandlerRef = useRef<(() => void) | undefined>(undefined);

  const targetMs = useMemo(
    () => getTargetMs(campaign.targetDate),
    [campaign.targetDate],
  );

  const close = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      dismissedRef.current = true;
    }, 200);
  }, [closing]);

  closeHandlerRef.current = close;

  useEffect(() => {
    try {
      if (localStorage.getItem(campaign.storageKey) === LOCAL_DISMISSED) {
        dismissedRef.current = true;
        return;
      }
    } catch {}

    try {
      if (sessionStorage.getItem(campaign.storageKey) === SESSION_SHOWN) {
        dismissedRef.current = true;
        return;
      }
    } catch {}

    appearTimerRef.current = window.setTimeout(() => {
      if (dismissedRef.current) return;

      setVisible(true);

      try {
        sessionStorage.setItem(campaign.storageKey, SESSION_SHOWN);
      } catch {}
    }, showDelay);

    return () => {
      if (appearTimerRef.current) {
        clearTimeout(appearTimerRef.current);
      }
    };
  }, [campaign.storageKey, showDelay]);

  useEffect(() => {
    if (!visible) return;

    autoCloseTimerRef.current = window.setTimeout(() => {
      closeHandlerRef.current?.();
    }, autoCloseDelay);

    const tick = () => {
      const now = Date.now();
      const diff = targetMs - now;
      if (diff <= 0) {
        setTimeLeft({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
        return;
      }
      const totalSeg = Math.floor(diff / 1000);
      setTimeLeft({
        dias: Math.floor(totalSeg / (60 * 60 * 24)),
        horas: Math.floor((totalSeg % (60 * 60 * 24)) / (60 * 60)),
        minutos: Math.floor((totalSeg % (60 * 60)) / 60),
        segundos: totalSeg % 60,
      });
    };

    tick();
    intervalRef.current = window.setInterval(tick, 1000);

    return () => {
      if (autoCloseTimerRef.current)
        window.clearTimeout(autoCloseTimerRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [visible, targetMs, autoCloseDelay]);

  useEffect(() => {
    if (!visible || videoError) return;

    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    video.load();

    const play = async () => {
      try {
        await video.play();
      } catch {
        setVideoError(true);
      }
    };

    const id = window.setTimeout(play, 100);

    return () => {
      window.clearTimeout(id);
    };
  }, [visible, videoError]);

  const handleDismiss = useCallback(() => {
    dismissedRef.current = true;

    if (dontShowAgain) {
      try {
        localStorage.setItem(campaign.storageKey, LOCAL_DISMISSED);
      } catch {}
    }

    close();
  }, [dontShowAgain, campaign.storageKey, close]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    },
    [handleDismiss],
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) handleDismiss();
    },
    [handleDismiss],
  );

  useEffect(() => {
    if (!visible) return;
    const modal = modalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    requestAnimationFrame(() => first?.focus());
    modal.addEventListener("keydown", trap);
    return () => modal.removeEventListener("keydown", trap);
  }, [visible]);

  const accent = campaign.accentColor || "#a855f7";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{
        backgroundColor: visible ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0)",
      }}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label={campaign.title}
    >
      <div
        ref={modalRef}
        className={`relative w-full max-w-sm sm:max-w-md rounded-xl overflow-hidden shadow-2xl transition-all duration-300 will-change-transform max-h-[90vh] ${
          visible && !closing
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4"
        } ${closing ? "scale-[0.97] opacity-0" : ""}`}
        style={{
          background: "linear-gradient(180deg, #120e1e 0%, #0b0a14 100%)",
          border: `1px solid ${accent}33`,
          boxShadow: `0 0 30px ${accent}15, 0 20px 40px -8px rgba(0,0,0,0.5)`,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)`,
          }}
        />

        <div className="relative w-full h-40 sm:h-48 overflow-hidden bg-black">
          {videoError ? (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${campaign.posterSrc})` }}
              aria-hidden="true"
            />
          ) : (
            <video
              ref={videoRef}
              src={campaign.videoSrc}
              poster={campaign.posterSrc}
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              aria-hidden="true"
              onError={() => setVideoError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#120e1e] via-[#120e1e]/10 to-transparent" />
        </div>

        <div className="relative p-4 sm:p-5">
          <div
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase mb-2.5"
            style={{
              backgroundColor: `${accent}1A`,
              border: `1px solid ${accent}40`,
              color: accent,
            }}
          >
            <span
              className="w-1 h-1 rounded-full animate-pulse"
              style={{ backgroundColor: accent }}
            />
            Special Event
          </div>

          <h2 className="text-sm sm:text-base font-bold text-white mb-1 leading-snug">
            {campaign.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 mb-3 leading-relaxed line-clamp-2">
            {campaign.description}
          </p>

          <div className="mb-3">
            <p className="text-[8px] uppercase tracking-[0.2em] font-semibold mb-1.5 text-amber-400/80">
              Event start in
            </p>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {[
                { value: timeLeft.dias, label: "Days" },
                { value: timeLeft.horas, label: "Hours" },
                { value: timeLeft.minutos, label: "Mins" },
                { value: timeLeft.segundos, label: "Secs" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center">
                  <div
                    className="w-full rounded-lg py-1.5 px-1 text-center"
                    style={{
                      backgroundColor: `${accent}0D`,
                      border: `1px solid ${accent}1A`,
                    }}
                  >
                    <span className="text-sm sm:text-base font-bold countdown-font text-white leading-none tabular-nums">
                      {String(value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.15em] text-slate-500 mt-1 font-semibold">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <a
            href={campaign.ctaHref}
            onClick={handleDismiss}
            className="block w-full text-center text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              background: `linear-gradient(135deg, ${accent} 0%, ${accent}CC 100%)`,
              boxShadow: `0 3px 12px ${accent}25`,
            }}
          >
            {campaign.ctaLabel}
          </a>

          <label className="flex items-center gap-1.5 mt-3 cursor-pointer group w-fit">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-slate-600 bg-slate-800 text-[#a855f7] focus:ring-[#a855f7] focus:ring-offset-0 cursor-pointer"
              style={{ accentColor: accent }}
            />
            <span className="text-[11px] text-slate-500 group-hover:text-slate-400 transition-colors select-none">
              Don't show this again
            </span>
          </label>
        </div>

        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white/60 hover:text-white transition-all z-20 focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: accent }}
          aria-label="Close promotion"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3.5 h-3.5"
            aria-hidden="true"
          >
            <path d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
