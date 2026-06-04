import { useEffect, useRef, useState } from "react";

type Props = { isOpen: boolean; onClose: () => void };

export function RsvpModal({ isOpen, onClose }: Props) {
  const dialogRef = useRef<HTMLElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Body scroll lock + focus management tied to open state.
  useEffect(() => {
    if (isOpen) {
      lastFocused.current = document.activeElement as HTMLElement | null;
      document.body.classList.add("modal-open");
      dialogRef.current?.focus();
    } else {
      document.body.classList.remove("modal-open");
      lastFocused.current?.focus();
    }
    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
  };

  return (
    <div
      className={`modal-backdrop${isOpen ? " is-visible" : ""}`}
      aria-hidden={!isOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        tabIndex={-1}
        ref={dialogRef}
      >
        <button className="icon-button" type="button" aria-label="Close RSVP form" onClick={onClose}>
          &times;
        </button>
        <p className="section-kicker">Sophia &amp; Ahmad</p>
        <h2 id="modalTitle">Confirm Your Attendance</h2>
        <form className="rsvp-form" onSubmit={handleSubmit}>
          {submitted && (
            <p className="success-message" tabIndex={-1}>
              Thank you. We&rsquo;ve received your confirmation.
            </p>
          )}

          <div className="form-field">
            <label htmlFor="guestName">Full Name</label>
            <input id="guestName" name="guestName" type="text" autoComplete="name" required />
          </div>

          <fieldset className="attendance">
            <legend>Attendance</legend>
            <div className="segmented">
              <label>
                <input type="radio" name="attendance" value="yes" defaultChecked />
                Attending
              </label>
              <label>
                <input type="radio" name="attendance" value="no" />
                Unable to Attend
              </label>
            </div>
          </fieldset>

          <div className="form-field">
            <label htmlFor="guestCount">Number of Guests</label>
            <select id="guestCount" name="guestCount" defaultValue="1 guest">
              <option>1 guest</option>
              <option>2 guests</option>
              <option>3 guests</option>
              <option>4 guests</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="message">Wishes &amp; Blessings</label>
            <textarea
              id="message"
              name="message"
              placeholder="Share your warmest wishes and blessings for the couple"
            />
          </div>

          <button className="luxury-button" type="submit">
            Send RSVP
          </button>
        </form>
      </section>
    </div>
  );
}
