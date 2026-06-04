import { useRef, useState } from "react";
import { gsap, useGSAP } from "./lib/gsap";
import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { SaveTheDate } from "./components/SaveTheDate";
import { Countdown } from "./components/Countdown";
import { OurStory } from "./components/OurStory";
import { RsvpModal } from "./components/RsvpModal";
import { GiftAccount } from "./components/GiftAccount";
import { Ornament } from "./components/Ornament";

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
        <SaveTheDate ready={ready} />
        <Countdown />

        <div className="main-content">
          {/* Story timeline */}
          <OurStory />

          {/* Ceremony & Reception — both held at one venue */}
          <section className="content-band band-center reveal" aria-labelledby="acaraTitle">
            <div className="content-inner">
              <p className="section-kicker">Time &amp; Place</p>
              <h2 className="section-title" id="acaraTitle">
                Ceremony &amp; Reception
              </h2>
              <Ornament />

              <div className="event-venue">
                <p className="event-venue__date">Monday, 21 June 2027</p>
                <h3 className="event-venue__name">The Dharmawangsa Jakarta</h3>
                <p className="event-venue__addr">
                  Jl. Brawijaya Raya No. 26, Kebayoran Baru, South Jakarta
                </p>
              </div>

              <div className="event-grid">
                <article className="event-card">
                  <p className="event-card__label">The Ceremony</p>
                  <p className="event-card__time">09:00 &ndash; 10:00 WIB</p>
                  <p className="event-card__room">Mangkunegaran Ballroom</p>
                </article>
                <span className="event-divider" aria-hidden="true" />
                <article className="event-card">
                  <p className="event-card__label">The Reception</p>
                  <p className="event-card__time">19:00 &ndash; 21:00 WIB</p>
                  <p className="event-card__room">Majapahit Ballroom</p>
                </article>
              </div>

              <div className="button-row button-row--center">
                <a className="luxury-button" href={MAPS_URL} target="_blank" rel="noreferrer">
                  Open Map
                </a>
              </div>
            </div>
          </section>

          {/* Dress code */}
          <section className="content-band dress-band band-center reveal" aria-labelledby="dressTitle">
            <div className="content-inner">
              <p className="section-kicker">Attire</p>
              <h2 className="section-title" id="dressTitle">
                Dress Code
              </h2>
              <Ornament />
              <p className="dress-copy">
                With the warmest regards, we kindly invite you to wear formal attire in the
                following soft palette &mdash; sage, warm taupe, ivory, mauve, and dusty blue.
              </p>
              <div className="palette" aria-label="Palet dress code">
                <span className="swatch" style={{ background: "#9aa687" }} title="Sage Green" />
                <span className="swatch" style={{ background: "#c3a886" }} title="Warm Taupe" />
                <span className="swatch" style={{ background: "#ece3d1" }} title="Ivory" />
                <span className="swatch" style={{ background: "#a1939a" }} title="Mauve" />
                <span className="swatch" style={{ background: "#adbfcd" }} title="Dusty Blue" />
              </div>
            </div>
          </section>

          {/* Venue & RSVP */}
          <section className="content-band reveal" aria-labelledby="rsvpTitle">
            <div className="content-inner rsvp-location-grid">
              <article className="rsvp-panel">
                <p className="section-kicker">The Venue</p>
                <h3 id="rsvpTitle">The Dharmawangsa Jakarta</h3>
                <Ornament className="ornament--left" />
                <p className="fine-copy">
                  Jl. Brawijaya Raya No. 26, Kebayoran Baru, South Jakarta, Indonesia.
                </p>
                <div className="button-row">
                  <a className="luxury-button" href={MAPS_URL} target="_blank" rel="noreferrer">
                    Open Google Maps
                  </a>
                </div>
              </article>

              <article className="location-panel">
                <p className="section-kicker">Confirm Your Attendance</p>
                <h3>RSVP</h3>
                <Ornament className="ornament--left" />
                <p className="fine-copy">
                  Your presence would be the greatest gift to us. Kindly confirm your attendance
                  so we can prepare this special day as best we can.
                </p>
                <div className="button-row">
                  <button className="luxury-button" type="button" onClick={() => setRsvpOpen(true)}>
                    RSVP Now
                  </button>
                </div>
              </article>
            </div>
          </section>

          {/* Wedding gift / digital envelope */}
          <section className="content-band band-center reveal" aria-labelledby="giftTitle">
            <div className="content-inner">
              <p className="section-kicker">With Love</p>
              <h2 className="section-title" id="giftTitle">
                Wedding Gift
              </h2>
              <Ornament />
              <p className="band-intro">
                Your prayers and blessings already mean the world to us. But should you wish to
                express your love with a gift, you may send it through:
              </p>
              <div className="gift-grid">
                <GiftAccount bank="Bank BCA" number="1234 5678 90" name="Sophia Aurelia" />
                <GiftAccount bank="Bank Mandiri" number="098 7654 321" name="Ahmad Rizky Pratama" />
              </div>
            </div>
          </section>

          {/* Closing */}
          <section className="content-band closing-band band-center reveal" aria-labelledby="closingTitle">
            <div className="content-inner">
              <p className="section-kicker">Closing</p>
              <h2 className="section-title" id="closingTitle">
                Prayers &amp; Blessings
              </h2>
              <Ornament />
              <p className="closing-copy">
                It would be an honor and a joy for us if you would join us to share your prayers
                and blessings for the bride and groom.
              </p>
              <p className="closing-salam">Wassalamu&rsquo;alaikum Warahmatullahi Wabarakatuh.</p>
              <p className="closing-from">With love and joy,</p>
              <p className="closing-families">
                The Family of Mr. H. Bambang Wijaya
                <br />
                &amp; The Family of Mr. H. Surya Darmawan
              </p>
            </div>
          </section>
        </div>

        <footer className="footer">
          <strong>Sophia &amp; Ahmad</strong>
          <span>With all our love, together with our families</span>
        </footer>
      </main>

      <RsvpModal isOpen={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </>
  );
}

export default App;
