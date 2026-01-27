import React, { useState, useEffect, useMemo } from "react";

interface CounterProps {
  fecha_semilla: string;
  duracion_dias: number;
  mantenimiento_horas: number;
  versiones: string[];
}

export const CounterTest: React.FC<CounterProps> = ({
  fecha_semilla,
  duracion_dias,
  mantenimiento_horas,
  versiones,
}) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const data = useMemo(() => {
    const inicioMs = new Date(fecha_semilla).getTime();
    const duracionMs = duracion_dias * 24 * 60 * 60 * 1000;
    const mantMs = mantenimiento_horas * 60 * 60 * 1000;
    const cicloTotalMs = duracionMs + mantMs;

    const tiempoTranscurrido = now - inicioMs;
    // Determinamos en qué ciclo de actualización estamos (0, 1, 2...)
    const indiceCiclo = Math.floor(tiempoTranscurrido / cicloTotalMs);

    const inicioCicloActual = inicioMs + indiceCiclo * cicloTotalMs;
    const finVersionActual = inicioCicloActual + duracionMs;
    const finMantenimientoActual = finVersionActual + mantMs;

    // Obtenemos versiones del array de forma segura
    const vActual = versiones[indiceCiclo] || "N/A";
    const vSiguiente = versiones[indiceCiclo + 1] || "TBA";

    return {
      estado:
        now < finVersionActual
          ? "activo"
          : now < finMantenimientoActual
            ? "mantenimiento"
            : "finalizado",
      diff: finVersionActual - now,
      vActual,
      vSiguiente,
    };
  }, [now, fecha_semilla, duracion_dias, mantenimiento_horas, versiones]);

  // --- RENDERIZADO DE MANTENIMIENTO ---
  if (data.estado === "mantenimiento") {
    return (
      <div className="flex flex-col gap-1 border-l-2 border-amber-500 pl-4 py-2 bg-amber-500/10 rounded-r-lg">
        <span className="text-amber-500 font-bold text-xs uppercase tracking-tighter">
          Status
        </span>
        <h4 className="text-xl font-bold text-white">
          Actualizando a v{data.vSiguiente}
        </h4>
        <p className="text-amber-200/60 text-xs italic">
          Los servidores estarán listos en unas horas.
        </p>
      </div>
    );
  }

  // --- RENDERIZADO DE CONTADOR ---
  const totalSeg = Math.max(0, Math.floor(data.diff / 1000));
  const tiempo = {
    d: Math.floor(totalSeg / 86400),
    h: Math.floor((totalSeg % 86400) / 3600),
    m: Math.floor((totalSeg % 3600) / 60),
    s: totalSeg % 60,
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <span className="text-slate-400 text-xs uppercase tracking-widest">
          Siguiente Versión
        </span>
        <span className="text-white font-bold text-lg">v{data.vSiguiente}</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <CounterBlock value={tiempo.d} label="Días" />
        <CounterBlock value={tiempo.h} label="Hrs" />
        <CounterBlock value={tiempo.m} label="Min" />
        <CounterBlock value={tiempo.s} label="Seg" />
      </div>

      {/* Badge dinámico para la versión actual */}
      <div className="absolute top-6 right-6 glass-panel px-3 py-1 rounded-full border border-white/10">
        <span className="text-[10px] font-bold text-white opacity-80">
          v{data.vActual}
        </span>
      </div>
    </div>
  );
};

const CounterBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="bg-white/5 rounded-lg p-2 text-center border border-white/5">
    <div className="text-2xl font-mono font-bold leading-none">
      {String(value).padStart(2, "0")}
    </div>
    <div className="text-[9px] uppercase opacity-40 mt-1">{label}</div>
  </div>
);
