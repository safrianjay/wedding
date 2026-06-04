import { useRef, useState } from "react";
import { gsap, useGSAP } from "./lib/gsap";
import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { SaveTheDate } from "./components/SaveTheDate";
import { Countdown } from "./components/Countdown";
import { OurStory } from "./components/OurStory";
import { RsvpModal } from "./components/RsvpModal";
import { GiftAccount } from "./components/GiftAccount";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Dharmawangsa+Jakarta";

function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span />
      <span className="ornament__diamond" />
      <span />
    </div>
  );
}

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

          {/* Akad & Resepsi — both held at one venue */}
          <section className="content-band band-center reveal" aria-labelledby="acaraTitle">
            <div className="content-inner">
              <p className="section-kicker">Waktu &amp; Tempat</p>
              <h2 className="section-title" id="acaraTitle">
                Akad &amp; Resepsi
              </h2>
              <Ornament />

              <div className="event-venue">
                <p className="event-venue__date">Senin, 21 Juni 2027</p>
                <h3 className="event-venue__name">The Dharmawangsa Jakarta</h3>
                <p className="event-venue__addr">
                  Jl. Brawijaya Raya No. 26, Kebayoran Baru, Jakarta Selatan
                </p>
              </div>

              <div className="event-grid">
                <article className="event-card">
                  <p className="event-card__label">Akad Nikah</p>
                  <p className="event-card__time">09.00 &ndash; 10.00 WIB</p>
                  <p className="event-card__room">Mangkunegaran Ballroom</p>
                </article>
                <span className="event-divider" aria-hidden="true" />
                <article className="event-card">
                  <p className="event-card__label">Resepsi</p>
                  <p className="event-card__time">19.00 &ndash; 21.00 WIB</p>
                  <p className="event-card__room">Majapahit Ballroom</p>
                </article>
              </div>

              <div className="button-row button-row--center">
                <a className="luxury-button" href={MAPS_URL} target="_blank" rel="noreferrer">
                  Buka Peta
                </a>
              </div>
            </div>
          </section>

          {/* Dress code */}
          <section className="content-band dress-band band-center reveal" aria-labelledby="dressTitle">
            <div className="content-inner">
              <p className="section-kicker">Tata Busana</p>
              <h2 className="section-title" id="dressTitle">
                Dress Code
              </h2>
              <p className="dress-copy">
                Dengan penuh hormat, kami mengundang Anda mengenakan busana formal dalam palet
                lembut berikut &mdash; sage, taupe hangat, ivory, mauve, dan dusty blue.
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

          {/* Lokasi & Tanda kasih */}
          <section className="content-band reveal" aria-labelledby="rsvpTitle">
            <div className="content-inner rsvp-location-grid">
              <article className="rsvp-panel">
                <p className="section-kicker">Lokasi Acara</p>
                <h3 id="rsvpTitle">The Dharmawangsa Jakarta</h3>
                <p className="fine-copy">
                  Jl. Brawijaya Raya No. 26, Kebayoran Baru, Jakarta Selatan, Indonesia.
                </p>
                <div className="button-row">
                  <a className="luxury-button" href={MAPS_URL} target="_blank" rel="noreferrer">
                    Buka Google Maps
                  </a>
                </div>
              </article>

              <article className="location-panel">
                <p className="section-kicker">Konfirmasi Kehadiran</p>
                <h3>RSVP</h3>
                <p className="fine-copy">
                  Kehadiran Anda adalah kebahagiaan bagi kami. Mohon konfirmasikan kehadiran Anda
                  agar kami dapat mempersiapkan hari istimewa ini dengan sebaik-baiknya.
                </p>
                <div className="button-row">
                  <button className="luxury-button" type="button" onClick={() => setRsvpOpen(true)}>
                    Konfirmasi Sekarang
                  </button>
                </div>
              </article>
            </div>
          </section>

          {/* Tanda kasih / amplop digital */}
          <section className="content-band band-center reveal" aria-labelledby="giftTitle">
            <div className="content-inner">
              <p className="section-kicker">Tanda Kasih</p>
              <h2 className="section-title" id="giftTitle">
                Wedding Gift
              </h2>
              <p className="band-intro">
                Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun apabila
                memberi adalah ungkapan tanda kasih, Anda dapat mengirimkannya melalui:
              </p>
              <div className="gift-grid">
                <GiftAccount bank="Bank BCA" number="1234 5678 90" name="Sophia Aurelia" />
                <GiftAccount bank="Bank Mandiri" number="098 7654 321" name="Ahmad Rizky Pratama" />
              </div>
            </div>
          </section>

          {/* Penutup */}
          <section className="content-band closing-band band-center reveal" aria-labelledby="closingTitle">
            <div className="content-inner">
              <p className="section-kicker">Penutup</p>
              <h2 className="section-title" id="closingTitle">
                Doa &amp; Restu
              </h2>
              <Ornament />
              <p className="closing-copy">
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
                berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
              </p>
              <p className="closing-salam">Wassalamu&rsquo;alaikum Warahmatullahi Wabarakatuh.</p>
              <p className="closing-from">Kami yang berbahagia,</p>
              <p className="closing-families">
                Keluarga Besar Bapak H. Bambang Wijaya
                <br />
                &amp; Keluarga Besar Bapak H. Surya Darmawan
              </p>
            </div>
          </section>
        </div>

        <footer className="footer">
          <strong>Sophia &amp; Ahmad</strong>
          <span>Dengan penuh cinta, bersama keluarga kami</span>
        </footer>
      </main>

      <RsvpModal isOpen={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </>
  );
}

export default App;
