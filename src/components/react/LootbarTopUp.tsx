import React from "react";

interface LootBarWidgetProps {
  game: string;
  theme?: string;
  affShort?: string;
}

export const LootBarWidget: React.FC<LootBarWidgetProps> = ({
  game,
  theme = "default",
  affShort,
}) => {
  const params = new URLSearchParams({
    game,
    theme,
    ...(affShort && { aff_short: affShort }),
  });
  const src = `https://lootbar.gg/embed.html?${params.toString()}`;
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1280px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
        opacity: 1,
      }}
    >
      <iframe
        src={src}
        width="100%"
        height={426}
        style={{ border: "none", overflow: "hidden", opacity: 1 }}
        title="LootBar Widget"
      />
    </div>
  );
};
