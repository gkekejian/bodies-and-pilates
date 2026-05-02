declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export function trackBeginCheckout(itemName: string, price: number): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "begin_checkout", {
    currency: "USD",
    value: price,
    items: [{ item_name: itemName, price }],
  });
}
