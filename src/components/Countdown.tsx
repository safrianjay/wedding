import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-08-24T00:00:00+07:00").getTime();

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
    <div className="countdown" aria-live="polite">
      <div className="time-box">
        <strong>{parts.days}</strong>
        <span>Hari</span>
      </div>
      <div className="time-box">
        <strong>{pad(parts.hours)}</strong>
        <span>Jam</span>
      </div>
      <div className="time-box">
        <strong>{pad(parts.minutes)}</strong>
        <span>Menit</span>
      </div>
      <div className="time-box">
        <strong>{pad(parts.seconds)}</strong>
        <span>Detik</span>
      </div>
    </div>
  );
}
