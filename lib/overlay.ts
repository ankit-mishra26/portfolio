export const OVERLAY_EVENT = "portfolio:overlay";

export type OverlayName = "palette" | "terminal";

/** Opens the command palette or terminal from anywhere in the client app. */
export function openOverlay(name: OverlayName): void {
  window.dispatchEvent(new CustomEvent<OverlayName>(OVERLAY_EVENT, { detail: name }));
}
