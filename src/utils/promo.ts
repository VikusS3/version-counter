import type { en } from "../i18n/ui/en";
import type { PromoCampaign } from "../components/react/PromotionalPopup";
import { enebaUrl } from "../constants/eneba";

/** Último día del mes actual, 23:59:59 → objetivo del countdown del popup. */
function monthEndDate(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 1, 0);
  d.setHours(23, 59, 59, 0);
  return d.toISOString();
}

/**
 * Campaña del popup promocional de Eneba (home EN/ES).
 * El countdown apunta al fin de mes, cuando Eneba renueva sus ofertas destacadas.
 */
export function buildEnebaPopupCampaign(t: typeof en): PromoCampaign {
  return {
    storageKey: "promo-eneba-deals",
    posterSrc: "/image-banner.webp",
    title: t.eneba.popupTitle,
    description: t.eneba.popupDescription,
    targetDate: monthEndDate(),
    ctaLabel: t.eneba.popupCta,
    ctaHref: enebaUrl("popup-home"),
    accentColor: "#f59e0b",
    badgeLabel: t.eneba.popupBadge,
    countdownLabel: t.eneba.popupCountdown,
    dontShowAgainLabel: t.eneba.popupDismiss,
    closeLabel: t.eneba.popupClose,
    countdownUnits: t.eneba.popupUnits,
  };
}
