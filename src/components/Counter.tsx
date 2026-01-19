import React from "react";
import { MANTENIMIENTO_DURACION_HORAS } from "../constants/constantes";

type Estado = "activo" | "mantenimiento" | "finalizado";

interface CounterProps {
  fecha_inicio: string;
  duracion_dias: number;
  onFinalizado?: () => void;
}

export const Counter: React.FC<CounterProps> = ({
  fecha_inicio,
  duracion_dias,
  onFinalizado,
}) => {
  const inicioMs = new Date(`${fecha_inicio}T00:00:00Z`).getTime();
  const finVersionMs = inicioMs + duracion_dias * 24 * 60 * 60 * 1000;
  const finMantenimientoMs =
    finVersionMs + MANTENIMIENTO_DURACION_HORAS * 60 * 60 * 1000;

  const [estado, setEstado] = React.useState<Estado>("activo");
  const [tiempo, setTiempo] = React.useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  React.useEffect(() => {
    const calcular = () => {
      const now = Date.now();

      if (now < finVersionMs) {
        setEstado("activo");

        const diff = finVersionMs - now;

        const totalSeg = Math.floor(diff / 1000);

        setTiempo({
          dias: Math.floor(totalSeg / (60 * 60 * 24)),
          horas: Math.floor((totalSeg % (60 * 60 * 24)) / (60 * 60)),
          minutos: Math.floor((totalSeg % (60 * 60)) / 60),
          segundos: totalSeg % 60,
        });
      } else if (now < finMantenimientoMs) {
        setEstado("mantenimiento");
      } else {
        setEstado("finalizado");
        onFinalizado?.();
      }
    };

    calcular();
    const id = setInterval(calcular, 1000); // ⏱️ segundos reales
    return () => clearInterval(id);
  }, [finVersionMs, finMantenimientoMs, onFinalizado]);

  /* ---------- ESTADOS ---------- */

  if (estado === "mantenimiento") {
    return (
      <div className="text-sm">
        <strong>Mantenimiento en curso</strong>
        <div className="text-xs opacity-80">Duración estimada: 3–5h</div>
      </div>
    );
  }

  if (estado === "finalizado") {
    return (
      <span className="text-sm italic opacity-80">Versión finalizada</span>
    );
  }

  /* ---------- DISEÑO ORIGINAL ---------- */

  return (
    <div className="grid grid-cols-4 gap-4 max-w-sm">
      <CounterBlock value={tiempo.dias} label="Days" />
      <CounterBlock value={tiempo.horas} label="Hours" />
      <CounterBlock value={tiempo.minutos} label="Mins" />
      <CounterBlock value={tiempo.segundos} label="Secs" />
    </div>
  );
};

/* ---------- SUBCOMPONENTE ---------- */

interface BlockProps {
  value: number;
  label: string;
}

const CounterBlock: React.FC<BlockProps> = ({ value, label }) => (
  <div className="flex flex-col">
    <span className="text-3xl font-bold countdown-font">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-[10px] uppercase tracking-widest text-slate-500">
      {label}
    </span>
  </div>
);
