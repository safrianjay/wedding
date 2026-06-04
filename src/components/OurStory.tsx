import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { Ornament } from "./Ornament";

type Memory = {
  caption: string;
  image: string;
  side: "left" | "right";
  year: string;
};

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
        </section>
      </div>
    </section>
  );
}
