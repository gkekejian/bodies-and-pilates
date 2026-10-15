"use client";

import { useEffect } from "react";

const WIDGET_SCRIPT = "https://brandedweb.mindbodyonline.com/embed/widget.js";

/**
 * Mindbody branded-web Schedules widget. Renders the owner's embed code:
 *
 *   <div class="mindbody-widget" data-widget-type="Schedules" data-widget-id="..."></div>
 *   <script async src="https://brandedweb.mindbodyonline.com/embed/widget.js"></script>
 *
 * The script scans the page for .mindbody-widget containers when it runs, so
 * it is (re)inserted on every mount. A plain <Script> would run only once per
 * visit and leave the container empty after client-side navigation back to
 * /schedule.
 */
export function MindbodyScheduleWidget({ widgetId }: { widgetId: string }) {
  useEffect(() => {
    document.querySelectorAll(`script[src="${WIDGET_SCRIPT}"]`).forEach((el) => el.remove());
    const script = document.createElement("script");
    script.src = WIDGET_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    // min-height reserves space while the widget loads, to limit layout shift,
    // and is released once the widget has rendered so its card ends where the
    // timetable ends instead of leaving dead space below it.
    <div className="min-h-[480px] has-[.mindbody-widget>*]:min-h-0">
      <div className="mindbody-widget" data-widget-type="Schedules" data-widget-id={widgetId} />
    </div>
  );
}
