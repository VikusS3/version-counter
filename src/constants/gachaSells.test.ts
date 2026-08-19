import { describe, it, expect } from "vitest";
import { GACHA_SELLS_URLS, getGachaSellsUrl } from "./gachaSells";

describe("gachaSells", () => {
  it("resolves a URL for every supported game slug", () => {
    const supported = [
      "genshin-impact",
      "honkai-star-rail",
      "wuthering-waves",
      "zenless-zone-zero",
    ];

    for (const slug of supported) {
      expect(getGachaSellsUrl(slug)).toBe(GACHA_SELLS_URLS[slug]);
      expect(getGachaSellsUrl(slug)).toMatch(
        /^https:\/\/gacha-sells\.netlify\.app\/.+\/$/
      );
    }
  });

  it("returns undefined for unsupported games", () => {
    expect(getGachaSellsUrl("arknights-endfield")).toBeUndefined();
    expect(getGachaSellsUrl("neverness-to-everness")).toBeUndefined();
    expect(getGachaSellsUrl("unknown-game")).toBeUndefined();
  });
});
