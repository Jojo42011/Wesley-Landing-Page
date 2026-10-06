import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "../config";
import Modal from "./Modal";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

export default function CalendarBooking({ onClose }: { onClose: () => void }) {
  const widget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = widget.current;
    if (!container) return;
    let active = true;
    const initialize = () => {
      if (active && window.Calendly) {
        container.replaceChildren();
        window.Calendly.initInlineWidget({
          url: site.calendarUrl,
          parentElement: container,
        });
      }
    };

    if (window.Calendly) {
      initialize();
    } else {
      let script = document.querySelector<HTMLScriptElement>(
        'script[data-calendly-widget="true"]',
      );
      if (!script) {
        script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        script.dataset.calendlyWidget = "true";
        document.body.appendChild(script);
      }
      script.addEventListener("load", initialize, { once: true });
    }

    return () => {
      active = false;
      container.replaceChildren();
    };
  }, []);

  return (
    <Modal label="Book a call with Wesley" onClose={onClose} wide>
      <div className="calendar-content">
        <span className="eyebrow">OPTIONAL NEXT STEP</span>
        <h2>Want to talk it through?</h2>
        <p>
          Pick a time that works best for you if you’d like a call with Wesley.
        </p>
        <p className="calendar-note">
          Booking is optional. Questionnaire delivery is still being connected;
          Wesley will receive the details you enter when booking through
          Calendly.
        </p>
        <div ref={widget} className="calendar-widget" />
        <a href={site.calendarUrl} target="_blank" rel="noopener noreferrer">
          Open the calendar in a new tab <ArrowUpRight size={16} />
        </a>
      </div>
    </Modal>
  );
}
