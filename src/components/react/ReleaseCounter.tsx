import React, { useState, useEffect, useCallback, useRef } from "react";

interface ReleaseCounterLabels {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  finished: string;
}

interface ReleaseCounterProps {
  fecha_salida: string;
  variant?: "mini" | "full";
  labels?: ReleaseCounterLabels;
}

interface ReleaseTime {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

function calculateTime(fechaSalidaMs: number): {
  time: ReleaseTime;
  finished: boolean;
} {
  const now = Date.now();
  const diff = fechaSalidaMs - now;

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

const DEFAULT_LABELS: ReleaseCounterLabels = {
  days: "Days",
  hours: "Hours",
  minutes: "Mins",
  seconds: "Secs",
  finished: "Released",
};

export const ReleaseCounter: React.FC<ReleaseCounterProps> = ({
  fecha_salida,
  variant = "mini",
  labels = DEFAULT_LABELS,
}) => {
  const fechaSalidaMs = useRef(
    fecha_salida ? new Date(fecha_salida).getTime() : Date.now(),
  ).current;

  const [finalizado, setFinalizado] = useState(false);
  const [tiempo, setTiempo] = useState<ReleaseTime>({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const tick = useCallback(() => {
    const result = calculateTime(fechaSalidaMs);
    if (result.finished) {
      setFinalizado(true);
    } else {
      setTiempo(result.time);
    }
  }, [fechaSalidaMs]);

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
        className="grid grid-cols-4 gap-4 max-w-sm"
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
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-200 mx-auto py-8"
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
    <span className="text-3xl font-bold countdown-font" aria-hidden="true">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[10px] uppercase tracking-widest text-slate-500">
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
      className={`glass-panel w-full aspect-square md:aspect-auto md:h-32 flex flex-col items-center justify-center rounded-2xl primary-glow group hover:border-primary transition-all ${
        highlight ? "border-primary/50" : ""
      }`}
    >
      <span
        className={`text-4xl md:text-5xl font-bold transition-colors ${
          highlight
            ? "text-primary animate-pulse"
            : "text-white group-hover:text-primary"
        }`}
        aria-hidden="true"
      >
        {String(value).padStart(2, "0")}
      </span>
      <div
        className={`h-1 w-12 rounded-full mt-2 ${
          highlight ? "bg-primary/60" : "bg-[#d4ad6a]/30"
        }`}
        aria-hidden="true"
      ></div>
    </div>
    <p className="text-gold font-bold uppercase tracking-widest text-xs mt-2">
      {label}
    </p>
  </div>
);
