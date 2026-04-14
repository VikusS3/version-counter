import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Counter } from "./Counter";

describe("Counter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with default labels", () => {
    render(<Counter />);
    expect(screen.getByText("Days")).toBeDefined();
    expect(screen.getByText("Hours")).toBeDefined();
    expect(screen.getByText("Mins")).toBeDefined();
    expect(screen.getByText("Secs")).toBeDefined();
  });

  it("displays custom labels", () => {
    render(
      <Counter
        labels={{
          days: "Días",
          hours: "Horas",
          minutes: "Minutos",
          seconds: "Segundos",
          finished: "Versión terminada",
        }}
      />,
    );
    expect(screen.getByText("Días")).toBeDefined();
    expect(screen.getByText("Horas")).toBeDefined();
  });

  it("shows finished state when time is up", () => {
    render(
      <Counter
        fecha_inicio={new Date("2020-01-01")}
        duracion_dias={0}
        labels={{ days: "Days", hours: "Hours", minutes: "Mins", seconds: "Secs", finished: "Version finished" }}
      />,
    );

    expect(screen.getByText("Version finished")).toBeDefined();
  });

  it("renders mini variant by default", () => {
    render(<Counter />);
    const container = screen.getByRole("timer");
    expect(container.className).toContain("grid-cols-4");
  });

  it("renders full variant", () => {
    render(<Counter variant="full" />);
    const container = screen.getByRole("timer");
    expect(container.className).toContain("grid-cols-2");
  });

  it("has proper ARIA attributes", () => {
    render(<Counter />);
    const timer = screen.getByRole("timer");
    expect(timer.getAttribute("aria-live")).toBe("polite");
  });
});