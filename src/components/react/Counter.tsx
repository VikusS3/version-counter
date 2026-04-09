import React from "react";

type Variant = "mini" | "full";

interface CounterLabels {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  finished: string;
}

interface CounterProps {
  fecha_inicio?: string | Date;
  duracion_dias?: number;
  variant?: Variant;
  onFinalizado?: () => void;
  labels?: CounterLabels;
}

const defaultLabels: CounterLabels = {
  days: "Days",
  hours: "Hours",
  minutes: "Mins",
  seconds: "Secs",
  finished: "Version finished",
};

export const Counter: React.FC<CounterProps> = ({
  fecha_inicio,
  duracion_dias,
  variant = "mini",
  onFinalizado,
  labels = defaultLabels,
}) => {
  const inicioMs = new Date(fecha_inicio ?? Date.now()).getTime();
  const finMs = inicioMs + (duracion_dias ?? 0) * 24 * 60 * 60 * 1000;

  const [finalizado, setFinalizado] = React.useState(false);
  const [tiempo, setTiempo] = React.useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  React.useEffect(() => {
    const calcular = () => {
      const now = Date.now();
      const diff = finMs - now;

      if (diff <= 0) {
        setFinalizado(true);
        onFinalizado?.();
        return;
      }

      const totalSeg = Math.floor(diff / 1000);

      setTiempo({
        dias: Math.floor(totalSeg / (60 * 60 * 24)),
        horas: Math.floor((totalSeg % (60 * 60 * 24)) / (60 * 60)),
        minutos: Math.floor((totalSeg % (60 * 60)) / 60),
        segundos: totalSeg % 60,
      });
    };

    calcular();
    const id = setInterval(calcular, 1000);
    return () => clearInterval(id);
  }, [finMs, onFinalizado]);

  /* ---------- ESTADOS ---------- */

  if (finalizado) {
    return (
      <span className="text-sm italic opacity-80">{labels.finished}</span>
    );
  }

  /* ---------- VARIANTE MINI (HOME) ---------- */

  if (variant === "mini") {
    return (
      <div className="grid grid-cols-4 gap-4 max-w-sm">
        <MiniBlock value={tiempo.dias} label={labels.days} />
        <MiniBlock value={tiempo.horas} label={labels.hours} />
        <MiniBlock value={tiempo.minutos} label={labels.minutes} />
        <MiniBlock value={tiempo.segundos} label={labels.seconds} />
      </div>
    );
  }

  /* ---------- VARIANTE FULL (/genshin) ---------- */

  return (
    <>
      <FullBlock value={tiempo.dias} label={labels.days} />
      <FullBlock value={tiempo.horas} label={labels.hours} />
      <FullBlock value={tiempo.minutos} label={labels.minutes} highlight />
      <FullBlock value={tiempo.segundos} label={labels.seconds} highlight />
    </>
  );
};

/* ---------- MINI BLOCK (HOME) ---------- */

const MiniBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col">
    <span className="text-3xl font-bold countdown-font">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[10px] uppercase tracking-widest text-slate-500">
      {label}
    </span>
  </div>
);

/* ---------- FULL BLOCK (/GENSHIN) ---------- */

const FullBlock = ({
  value,
  label,
  highlight = false,
}: {
  value: number;
  label: string;
  highlight?: boolean;
}) => (
  <div className="flex flex-col items-center gap-2">
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
      >
        {String(value).padStart(2, "0")}
      </span>
      <div
        className={`h-1 w-12 rounded-full mt-2 ${
          highlight ? "bg-primary/60" : "bg-[#d4ad6a]/30"
        }`}
      ></div>
    </div>
    <p className="text-gold font-bold uppercase tracking-widest text-xs mt-2">
      {label}
    </p>
  </div>
);
