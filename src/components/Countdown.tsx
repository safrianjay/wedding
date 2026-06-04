import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2027-06-21T00:00:00+07:00").getTime();

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function getParts(): Parts {
  const diff = Math.max(WEDDING_DATE - Date.now(), 0);
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  const [parts, setParts] = useState<Parts>(getParts);

  useEffect(() => {
    const id = window.setInterval(() => setParts(getParts()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="countdown-clock-section" aria-label="Countdown to Sophia and Ahmad wedding">
      <div className="clock-background" aria-hidden="true" />

      <div className="countdown-content">
        <div className="countdown-head">
          <p className="countdown-kicker">Counting Down To</p>
          <h2 className="countdown-title">The Wonderful Date</h2>
        </div>

        <div className="countdown-wrapper" aria-label="Countdown to Sophia and Ahmad wedding" aria-live="polite">
          <div className="countdown-item">
            <span className="countdown-number" id="clock-days">
              {String(parts.days).padStart(2, "0")}
            </span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number" id="clock-hours">
              {pad(parts.hours)}
            </span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number" id="clock-minutes">
              {pad(parts.minutes)}
            </span>
            <span className="countdown-label">Minutes</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number" id="clock-seconds">
              {pad(parts.seconds)}
            </span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>

        <p className="clock-date-detail">Monday, 21 June 2027</p>
      </div>
    </section>
  );
}
