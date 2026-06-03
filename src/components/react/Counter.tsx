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

  const [finalizado, setFinalizado] = useState(false);
  const [tiempo, setTiempo] = useState<CounterTime>({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });
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
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  if (finalizado) {
    return (
      <span
        className="text-sm italic opacity-80"
        role="status"
        aria-live="polite"
      >
        {labels.finished}
      </span>
    );
  }

  const timeLabel = `${labels.days}: ${tiempo.dias}, ${labels.hours}: ${tiempo.horas}, ${labels.minutes}: ${tiempo.minutos}, ${labels.seconds}: ${tiempo.segundos}`;

  if (variant === "mini") {
    return (
      <div
        className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xs"
        role="timer"
        aria-label={timeLabel}
        aria-live="polite"
      >
        <MiniBlock value={tiempo.dias} label={labels.days} />
        <MiniBlock value={tiempo.horas} label={labels.hours} />
        <MiniBlock value={tiempo.minutos} label={labels.minutes} />
        <MiniBlock value={tiempo.segundos} label={labels.seconds} />
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-8 max-w-200 mx-auto py-6 md:py-8"
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

const MiniBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col" aria-label={`${label}: ${value}`}>
    <span className="text-2xl sm:text-3xl font-bold countdown-font leading-none" aria-hidden="true">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">
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
    className="flex flex-col items-center gap-2"
    aria-label={`${label}: ${value}`}
  >
    <div
      className={`glass-panel w-full aspect-square md:aspect-auto md:h-28 lg:h-32 flex flex-col items-center justify-center rounded-2xl primary-glow group hover:border-primary transition-all ${
        highlight ? "border-primary/50" : ""
      }`}
    >
      <span
        className={`text-3xl sm:text-4xl md:text-5xl font-bold transition-colors leading-none ${
          highlight
            ? "text-primary"
            : "text-white group-hover:text-primary"
        }`}
        aria-hidden="true"
      >
        {String(value).padStart(2, "0")}
      </span>
      <div
        className={`h-0.5 w-8 md:w-12 rounded-full mt-1.5 md:mt-2 ${
          highlight ? "bg-primary/60" : "bg-[#d4ad6a]/30"
        }`}
        aria-hidden="true"
      ></div>
    </div>
    <p className="text-gold font-bold uppercase tracking-widest text-[10px] md:text-xs mt-1 md:mt-2">
      {label}
    </p>
  </div>
);
