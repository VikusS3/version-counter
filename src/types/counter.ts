export type Variant = "mini" | "full";

export interface CounterLabels {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  finished: string;
}

export interface CounterTime {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

export interface CounterProps {
  fecha_inicio?: string | Date;
  duracion_dias?: number;
  variant?: Variant;
  onFinalizado?: () => void;
  labels?: CounterLabels;
}

export const DEFAULT_LABELS: CounterLabels = {
  days: "Days",
  hours: "Hours",
  minutes: "Mins",
  seconds: "Secs",
  finished: "Version finished",
};

export type CounterAction =
  | { type: "TICK" }
  | { type: "FINISH" };