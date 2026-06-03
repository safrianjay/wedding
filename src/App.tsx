import { useRef, useState } from "react";
import { gsap, useGSAP } from "./lib/gsap";
import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { Hero } from "./components/Hero";
import { Countdown } from "./components/Countdown";
import { RsvpModal } from "./components/RsvpModal";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Dharmawangsa+Jakarta";

function App() {
  const [introGone, setIntroGone] = useState(false);
  const [ready, setReady] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const shellRef = useRef<HTMLElement>(null);

  // Scroll-reveal each content band once it enters the viewport.
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const bands = gsap.utils.toArray<HTMLElement>(".reveal");
      bands.forEach((band) => {
        gsap.from(band, {
          opacity: 0,
          y: 48,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: band, start: "top 85%", once: true },
        });
      });
    },
    { scope: shellRef },
  );

  return (
    <>
      {!introGone && (
        <EnvelopeIntro onReveal={() => setReady(true)} onDone={() => setIntroGone(true)} />
      )}

      <main className={`site-shell${ready ? " is-ready" : ""}`} ref={shellRef}>
        <Hero ready={ready} />

        <div className="main-content">
          <section className="content-band reveal" aria-label="Formal invitation">
            <div className="content-inner">
              <p className="invitation-copy">
                Together with their families, Sophia and Ahmad invite you to an intimate
                celebration of love, family, and new beginnings.
              </p>
            </div>
          </section>

          <section className="content-band reveal" aria-labelledby="countdownTitle">
            <div className="content-inner">
              <p className="section-kicker">Counting the moments</p>
              <h2 className="section-title" id="countdownTitle">
                Until we gather
              </h2>
              <Countdown />
            </div>
          </section>

          <section className="content-band reveal" aria-labelledby="detailsTitle">
            <div className="content-inner">
              <p className="section-kicker">The day</p>
              <h2 className="section-title" id="detailsTitle">
                Event Details
              </h2>
              <div className="detail-grid">
                <article className="detail-panel">
                  <h3>Ceremony</h3>
                  <div className="detail-list">
                    <span>Saturday, 24 August 2026</span>
                    <span>Four o'clock in the afternoon</span>
                    <span>The Dharmawangsa Jakarta</span>
                  </div>
                  <a className="ghost-button" href={MAPS_URL} target="_blank" rel="noreferrer">
                    Open Map
                  </a>
                </article>
                <article className="detail-panel">
                  <h3>Reception</h3>
                  <div className="detail-list">
                    <span>Saturday, 24 August 2026</span>
                    <span>Six-thirty in the evening</span>
                    <span>The Dharmawangsa Jakarta</span>
                  </div>
                  <a className="ghost-button" href={MAPS_URL} target="_blank" rel="noreferrer">
                    Open Map
                  </a>
                </article>
              </div>
            </div>
          </section>

          <section className="content-band dress-band reveal" aria-labelledby="dressTitle">
            <div className="content-inner">
              <p className="section-kicker">Dress code</p>
              <h2 className="section-title" id="dressTitle">
                Evening Formal
              </h2>
              <p className="dress-copy">
                We invite you to dress in an evening formal palette of ivory, champagne, warm
                gold, deep red, and soft black.
              </p>
              <div className="palette" aria-label="Dress code palette">
                <span className="swatch" style={{ background: "#fbf7ef" }} title="Ivory" />
                <span className="swatch" style={{ background: "#dcc8a3" }} title="Champagne" />
                <span className="swatch" style={{ background: "#b89452" }} title="Warm gold" />
                <span className="swatch" style={{ background: "#8e0f18" }} title="Deep red" />
                <span className="swatch" style={{ background: "#1c1716" }} title="Soft black" />
              </div>
            </div>
          </section>

          <section className="content-band reveal" aria-labelledby="rsvpTitle">
            <div className="content-inner rsvp-location-grid">
              <article className="rsvp-panel">
                <p className="section-kicker">Kindly respond</p>
                <h3 id="rsvpTitle">RSVP</h3>
                <p className="fine-copy">
                  Your presence would be our joy. Please confirm your attendance so we may
                  prepare the evening with care.
                </p>
                <button className="luxury-button" type="button" onClick={() => setRsvpOpen(true)}>
                  Confirm RSVP
                </button>
              </article>

              <article className="location-panel">
                <p className="section-kicker">Location</p>
                <h3>The Dharmawangsa Jakarta</h3>
                <p className="fine-copy">
                  Jl. Brawijaya Raya No. 26, Kebayoran Baru, Jakarta Selatan, Indonesia.
                </p>
                <div className="button-row">
                  <a className="luxury-button" href={MAPS_URL} target="_blank" rel="noreferrer">
                    Open Google Maps
                  </a>
                </div>
              </article>
            </div>
          </section>
        </div>

        <footer className="footer">
          <strong>Sophia &amp; Ahmad</strong>
          <span>With love, together with our families</span>
        </footer>
      </main>

      <RsvpModal isOpen={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </>
  );
}

export default App;
