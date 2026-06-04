import { useEffect, useRef, type CSSProperties } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { Ornament } from "./Ornament";

type Memory = {
  caption: string;
  image: string;
  side: "left" | "right";
  year: string;
};

/** Scattered "story-board" of hanging polaroids shown as the section finale. */
type BoardPhoto = {
  src: string;
  year: string;
  left: number; // % within the board
  top: number; // % within the board
  rot: number; // tilt (deg)
  z: number; // stacking
};

const BOARD: BoardPhoto[] = [
  { src: "/assets/story-2018.jpg", year: "2018", left: 2, top: 6, rot: -9, z: 2 },
  { src: "/assets/story-2019.jpg", year: "2019", left: 67, top: 2, rot: 8, z: 3 },
  { src: "/assets/story-2025.jpg", year: "2025", left: 35, top: 18, rot: -3, z: 6 },
  { src: "/assets/story-2020.jpg", year: "2020", left: 9, top: 34, rot: 7, z: 2 },
  { src: "/assets/story-2022.jpg", year: "2022", left: 59, top: 36, rot: -7, z: 4 },
];

const MEMORY_INTRO =
  "Dari pertemuan pertama hingga hari yang kami nantikan — setiap kenangan kecil menuntun kami menuju satu janji yang abadi.";

const MEMORIES: Memory[] = [
  {
    year: "2018",
    caption: "Where our story began",
    image: "/assets/story-2018.jpg",
    side: "left",
  },
  {
    year: "2019",
    caption: "From strangers to something special",
    image: "/assets/story-2019.jpg",
    side: "right",
  },
  {
    year: "2020",
    caption: "The first time we said “I love you”",
    image: "/assets/story-2020.jpg",
    side: "left",
  },
  {
    year: "2022",
    caption: "Growing stronger side by side",
    image: "/assets/story-2022.jpg",
    side: "right",
  },
  {
    year: "2025",
    caption: "From a question to a lifetime promise",
    image: "/assets/story-2025.jpg",
    side: "left",
  },
];

function MemoryPhoto({ memory }: { memory: Memory }) {
  return (
    <figure className="polaroid-card">
      <img src={memory.image} alt={`Sophia and Ahmad memory from ${memory.year}`} />
      <figcaption>{memory.year}</figcaption>
    </figure>
  );
}

function MemoryCopy({ caption }: { caption: string }) {
  return (
    <div className="memory-copy">
      <p>{caption}</p>
    </div>
  );
}

export function OurStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.from(root.current!.querySelectorAll(".story-head > *"), {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });

      // Polaroid board: each card drops in and settles (then sways via CSS),
      // and its photo parallaxes within the frame as you scroll past.
      const cards = gsap.utils.toArray<HTMLElement>(".polaroid", root.current!);
      cards.forEach((card, i) => {
        gsap.from(card.querySelector(".polaroid__drop"), {
          y: -170,
          autoAlpha: 0,
          duration: 0.9,
          ease: "back.out(1.5)",
          delay: i * 0.09,
          scrollTrigger: { trigger: ".story-board", start: "top 85%", once: true },
        });

        gsap.fromTo(
          card.querySelector(".polaroid__img"),
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".story-board",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  useEffect(() => {
    const section = root.current;
    if (!section) return;

    const items = Array.from(section.querySelectorAll<HTMLElement>(".memory-item"));
    if (!items.length) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    items.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="content-band band-center story-section" ref={root} aria-labelledby="storyTitle">
      <div className="content-inner">
        <div className="story-head">
          <p className="section-kicker">Perjalanan Cinta</p>
          <h2 className="section-title" id="storyTitle">
            Our Story
          </h2>
          <Ornament />
        </div>

        <section
          className="memory-lane-section"
          id="memory-lane"
          aria-label="Sophia and Ahmad memory timeline"
        >
          <div className="memory-ornament" aria-hidden="true" />
          <p className="memory-intro">{MEMORY_INTRO}</p>

          <div className="memory-timeline">
            {MEMORIES.map((memory) => (
              <article className={`memory-item memory-${memory.side}`} key={memory.year}>
                {memory.side === "left" ? (
                  <>
                    <MemoryCopy caption={memory.caption} />
                    <div className="memory-node" aria-hidden="true" />
                    <MemoryPhoto memory={memory} />
                  </>
                ) : (
                  <>
                    <MemoryPhoto memory={memory} />
                    <div className="memory-node" aria-hidden="true" />
                    <MemoryCopy caption={memory.caption} />
                  </>
                )}
              </article>
            ))}
          </div>

          <div className="memory-ornament board-divider" aria-hidden="true" />

          <div className="story-board">
            {BOARD.map((photo) => (
              <figure
                className="polaroid"
                key={photo.year}
                style={
                  {
                    left: `${photo.left}%`,
                    top: `${photo.top}%`,
                    zIndex: photo.z,
                    "--rot": `${photo.rot}deg`,
                  } as CSSProperties
                }
              >
                <span className="polaroid__tape" aria-hidden="true" />
                <div className="polaroid__drop">
                  <div
                    className="polaroid__inner"
                    style={{ "--dur": `${3.4 + photo.z * 0.3}s` } as CSSProperties}
                  >
                    <div className="polaroid__photo">
                      <img
                        className="polaroid__img"
                        src={photo.src}
                        alt={`Sophia and Ahmad memory from ${photo.year}`}
                      />
                    </div>
                    <figcaption className="polaroid__caption">{photo.year}</figcaption>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
