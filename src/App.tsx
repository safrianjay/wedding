import { useRef, useState } from "react";
import { gsap, useGSAP } from "./lib/gsap";
import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { Hero } from "./components/Hero";
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
        <Hero ready={ready} />

        <div className="main-content">
          {/* Pembuka — salam & ayat suci */}
          <section className="content-band band-center reveal" aria-labelledby="ayahTitle">
            <div className="content-inner">
              <p className="section-kicker">Bismillahirrahmanirrahim</p>
              <h2 className="section-title" id="ayahTitle">
                Assalamu&rsquo;alaikum Wr. Wb.
              </h2>
              <Ornament />
              <p className="ayah-arabic" lang="ar" dir="rtl">
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا
                إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ
                لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
              </p>
              <p className="ayah-translation">
                &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
                pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa
                tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.
                Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang
                berpikir.&rdquo;
              </p>
              <p className="ayah-cite">Q.S. Ar-Rum : 21</p>
            </div>
          </section>

          {/* Mempelai */}
          <section className="content-band band-center reveal" aria-labelledby="coupleTitle">
            <div className="content-inner">
              <p className="section-kicker">Mempelai</p>
              <h2 className="section-title" id="coupleTitle">
                Putra &amp; Putri Kami
              </h2>
              <p className="band-intro">
                Dengan memohon rahmat dan ridha Allah Subhanahu wa Ta&rsquo;ala, kami bermaksud
                menyelenggarakan pernikahan putra-putri kami:
              </p>

              <div className="couple-grid">
                <article className="couple-card">
                  <h3 className="couple-name">Sophia Aurelia</h3>
                  <p className="couple-sub">Putri kedua dari</p>
                  <p className="couple-parents">
                    Bapak H. Bambang Wijaya
                    <br />
                    &amp; Ibu Hj. Sri Lestari
                  </p>
                </article>

                <div className="couple-amp" aria-hidden="true">
                  &amp;
                </div>

                <article className="couple-card">
                  <h3 className="couple-name">Ahmad Rizky Pratama</h3>
                  <p className="couple-sub">Putra pertama dari</p>
                  <p className="couple-parents">
                    Bapak H. Surya Darmawan
                    <br />
                    &amp; Ibu Hj. Ratna Dewi
                  </p>
                </article>
              </div>
            </div>
          </section>

          {/* Our Story — hanging polaroids */}
          <OurStory />

          {/* Hitung mundur */}
          <section className="content-band band-center reveal" aria-labelledby="countdownTitle">
            <div className="content-inner">
              <p className="section-kicker">Menghitung Hari</p>
              <h2 className="section-title" id="countdownTitle">
                Menuju Hari Bahagia
              </h2>
              <Countdown />
            </div>
          </section>

          {/* Akad & Resepsi */}
          <section className="content-band band-center reveal" aria-labelledby="acaraTitle">
            <div className="content-inner">
              <p className="section-kicker">Waktu &amp; Tempat</p>
              <h2 className="section-title" id="acaraTitle">
                Akad &amp; Resepsi
              </h2>
              <Ornament />
              <div className="detail-grid">
                <article className="detail-panel">
                  <h3>Akad Nikah</h3>
                  <div className="detail-list">
                    <span>Sabtu, 24 Agustus 2026</span>
                    <span>Pukul 09.00 &ndash; 10.00 WIB</span>
                    <span>Mangkunegaran Ballroom</span>
                    <span>The Dharmawangsa Jakarta</span>
                  </div>
                  <a className="ghost-button" href={MAPS_URL} target="_blank" rel="noreferrer">
                    Buka Peta
                  </a>
                </article>
                <article className="detail-panel">
                  <h3>Resepsi</h3>
                  <div className="detail-list">
                    <span>Sabtu, 24 Agustus 2026</span>
                    <span>Pukul 19.00 &ndash; 21.00 WIB</span>
                    <span>Majapahit Ballroom</span>
                    <span>The Dharmawangsa Jakarta</span>
                  </div>
                  <a className="ghost-button" href={MAPS_URL} target="_blank" rel="noreferrer">
                    Buka Peta
                  </a>
                </article>
              </div>
            </div>
          </section>

          {/* Tata busana */}
          <section className="content-band dress-band reveal" aria-labelledby="dressTitle">
            <div className="content-inner">
              <p className="section-kicker">Tata Busana</p>
              <h2 className="section-title" id="dressTitle">
                Formal Malam
              </h2>
              <p className="dress-copy">
                Dengan penuh hormat, kami mengundang Anda mengenakan busana formal malam &mdash;
                batik, kebaya, atau setelan formal &mdash; dalam palet ivory, sampanye, emas, merah
                marun, dan hitam.
              </p>
              <div className="palette" aria-label="Palet tata busana">
                <span className="swatch" style={{ background: "#fbf7ef" }} title="Ivory" />
                <span className="swatch" style={{ background: "#dcc8a3" }} title="Sampanye" />
                <span className="swatch" style={{ background: "#b89452" }} title="Emas" />
                <span className="swatch" style={{ background: "#8e0f18" }} title="Merah marun" />
                <span className="swatch" style={{ background: "#1c1716" }} title="Hitam" />
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
