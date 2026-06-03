import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register only the plugins this site actually uses. Add more here (and to the
// re-export below) if you reach for additional GSAP plugins later.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export { gsap, useGSAP, ScrollTrigger, SplitText };
