import type { DummyYearbook } from "./Carousel";

/**
 * Event bus mini: kartu karya di mana pun di halaman /portofolio
 * (band "Sample Karya", grid arsip, dll) bisa membuka gerbang sandi +
 * flipbook reader yang sama yang dimiliki Carousel, tanpa duplikasi state.
 */
export const FLIPBOOK_OPEN_EVENT = "fourjective:open-flipbook";

export function openFlipbook(book: DummyYearbook): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(FLIPBOOK_OPEN_EVENT, { detail: book }));
}
