import React, { useState, useEffect, useRef, useCallback } from "react";
import type { CounterTime, CounterProps } from "../../types/counter";
import { DEFAULT_LABELS } from "../../types/counter";

function calculateTime(finMs: number): {
  time: CounterTime;
  finished: boolean;
} {
  const now = Date.now();
  const diff = finMs - now;

  if (diff <= 0) {
    return {
      time: { dias: 0, horas: 0, minutos: 0, segundos: 0 },
      finished: true,
    };
  }

  const totalSeg = Math.floor(diff / 1000);

  return {
    time: {
      dias: Math.floor(totalSeg / (60 * 60 * 24)),
      horas: Math.floor((totalSeg % (60 * 60 * 24)) / (60 * 60)),
      minutos: Math.floor((totalSeg % (60 * 60)) / 60),
      segundos: totalSeg % 60,
    },
    finished: false,
  };
}

export const Counter: React.FC<CounterProps> = ({
  fecha_inicio,
  duracion_dias,
  variant = "mini",
  onFinalizado,
  labels = DEFAULT_LABELS,
}) => {
  const inicioMs = useRef(
    fecha_inicio ? new Date(fecha_inicio).getTime() : Date.now(),
  ).current;
  const finMs = useRef(
    inicioMs + (duracion_dias ?? 0) * 24 * 60 * 60 * 1000,
  ).current;

  // Lazy initialization: calculate real time immediately, no zero flash on first render
  const [finalizado, setFinalizado] = useState(() => calculateTime(finMs).finished);
  const [tiempo, setTiempo] = useState<CounterTime>(
    () => calculateTime(finMs).time,
  );
  const onFinalizadoRef = useRef(onFinalizado);

  useEffect(() => {
    onFinalizadoRef.current = onFinalizado;
  }, [onFinalizado]);

  const tick = useCallback(() => {
    const result = calculateTime(finMs);
    if (result.finished) {
      setFinalizado(true);
      onFinalizadoRef.current?.();
    } else {
      setTiempo(result.time);
    }
  }, [finMs]);

  useEffect(() => {
    // Run immediately to sync with exact current second
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [tick]);

  if (finalizado) {
    return (
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(52,211,153,0.2)]"
        role="status"
        aria-live="polite"
      >
        <span className="size-2 rounded-full bg-emerald-400 animate-ping" aria-hidden="true"></span>
        {labels.finished}
      </div>
    );
  }

  const timeLabel = `${labels.days}: ${tiempo.dias}, ${labels.hours}: ${tiempo.horas}, ${labels.minutes}: ${tiempo.minutos}, ${labels.seconds}: ${tiempo.segundos}`;

  if (variant === "mini") {
    return (
      <div
        className="grid grid-cols-4 gap-2 sm:gap-2.5 max-w-xs"
        role="timer"
        aria-label={timeLabel}
        aria-live="polite"
      >
        <MiniBlock value={tiempo.dias} label={labels.days} />
        <MiniBlock value={tiempo.horas} label={labels.hours} />
        <MiniBlock value={tiempo.minutos} label={labels.minutes} />
        <MiniBlock value={tiempo.segundos} label={labels.seconds} highlight />
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto py-4 md:py-6"
      role="timer"
      aria-label={timeLabel}
      aria-live="polite"
    >
      <FullBlock value={tiempo.dias} label={labels.days} />
      <FullBlock value={tiempo.horas} label={labels.hours} />
      <FullBlock value={tiempo.minutos} label={labels.minutes} />
      <FullBlock value={tiempo.segundos} label={labels.seconds} highlight />
    </div>
  );
};

const MiniBlock = ({
  value,
  label,
  highlight = false,
}: {
  value: number;
  label: string;
  highlight?: boolean;
}) => (
  <div
    className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
      highlight
        ? "bg-black/60 border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.15)]"
        : "bg-black/40 border-white/[0.08]"
    }`}
    aria-label={`${label}: ${value}`}
  >
    <span
      className={`text-xl sm:text-2xl font-black countdown-font leading-none ${
        highlight ? "text-indigo-300" : "text-white"
      }`}
      aria-hidden="true"
    >
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-slate-400 mt-1">
      {label}
    </span>
  </div>
);

const FullBlock = ({
  value,
  label,
  highlight = false,
}: {
  value: number;
  label: string;
  highlight?: boolean;
}) => (
  <div
    className="flex flex-col items-center gap-2 group"
    aria-label={`${label}: ${value}`}
  >
    <div
      className={`relative w-full aspect-square md:aspect-auto md:h-28 lg:h-32 flex flex-col items-center justify-center rounded-2xl transition-all duration-300 overflow-hidden border backdrop-blur-xl ${
        highlight
          ? "bg-gradient-to-b from-indigo-950/40 to-black/60 border-indigo-500/40 shadow-[0_0_24px_rgba(99,102,241,0.25)]"
          : "bg-gradient-to-b from-white/[0.06] to-black/50 border-white/10 hover:border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
      }`}
    >
      <div className="absolute top-1.5 left-1.5 size-1.5 border-t border-l border-white/20" aria-hidden="true"></div>
      <div className="absolute top-1.5 right-1.5 size-1.5 border-t border-r border-white/20" aria-hidden="true"></div>

      <span
        className={`text-3xl sm:text-4xl md:text-5xl font-black countdown-font transition-all leading-none ${
          highlight
            ? "text-indigo-300 drop-shadow-[0_0_12px_rgba(129,140,248,0.5)]"
            : "text-white group-hover:text-indigo-200"
        }`}
        aria-hidden="true"
      >
        {String(value).padStart(2, "0")}
      </span>
      <div
        className={`h-0.5 w-8 md:w-12 rounded-full mt-2 transition-all ${
          highlight ? "bg-indigo-400 shadow-[0_0_8px_#818cf8]" : "bg-white/20 group-hover:bg-white/40"
        }`}
        aria-hidden="true"
      ></div>
    </div>
    <p className="font-mono font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
      {label}
    </p>
  </div>
);
