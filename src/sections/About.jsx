import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMapPin } from "react-icons/fi";
import portrait from "../assets/hmk.jpg";
import { PROFILE, STATS, TECH, MARQUEE_TECH } from "../data/portfolio";
import { Counter, Marquee, useSpotlight } from "../components/motion";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

export function TechMarquee() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const x1 = useTransform(scrollYProgress, [0, 1], ["4%", "-8%"]);
    const x2 = useTransform(scrollYProgress, [0, 1], ["-8%", "4%"]);
    const half = Math.ceil(MARQUEE_TECH.length / 2);

    const row = (ids) =>
        ids.map((id) => {
            const t = TECH[id];
            return (
                <span className="mq-item" key={id} style={{ "--c": t.color }}>
                    <t.icon />
                    {t.name}
                </span>
            );
        });

    return (
        <div className="tech-marquee" ref={ref} aria-label="Technologies I work with">
            <motion.div style={{ x: x1 }}>
                <Marquee speed={45}>{row(MARQUEE_TECH.slice(0, half))}</Marquee>
            </motion.div>
            <motion.div style={{ x: x2 }}>
                <Marquee speed={50} reverse>
                    {row(MARQUEE_TECH.slice(half))}
                </Marquee>
            </motion.div>
        </div>
    );
}

export default function About() {
    const ref = useRef(null);
    const textRef = useRef(null);
    const spotlight = useSpotlight();

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
    const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

    // Words light up as you scroll through the statement
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".statement .w",
                { opacity: 0.12 },
                {
                    opacity: 1,
                    stagger: 0.08,
                    ease: "none",
                    scrollTrigger: { trigger: textRef.current, start: "top 80%", end: "bottom 45%", scrub: true },
                }
            );
        }, ref);
        return () => ctx.revert();
    }, []);

    const highlight = new Set(["scalable", "web", "mobile", "APIs", "pipelines,", "leading", "production."]);

    return (
        <section id="about" className="section about" ref={ref}>
            <div className="container about-grid">
                <motion.div
                    className="portrait-wrap"
                    initial={{ opacity: 0, scale: 0.9, clipPath: "inset(20% 20% 20% 20% round 28px)" }}
                    whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 28px)" }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.div className="portrait-ring" style={{ rotate: ringRotate }} />
                    <div className="portrait">
                        <motion.img src={portrait} alt={`Portrait of ${PROFILE.name}`} style={{ y: imgY }} loading="lazy" />
                    </div>
                    <div className="portrait-tag glass">
                        <FiMapPin /> {PROFILE.location}
                    </div>
                    <div className="portrait-tag tag-2 glass mono">
                        <span className="status-dot" /> open to work
                    </div>
                </motion.div>

                <div className="about-copy">
                    <span className="eyebrow">About me</span>
                    <p className="statement" ref={textRef}>
                        {PROFILE.statement.split(" ").map((w, i) => (
                            <span key={i} className={`w ${highlight.has(w) ? "hl" : ""}`}>
                                {w}{" "}
                            </span>
                        ))}
                    </p>

                    <div className="stats">
                        {STATS.map((s, i) => (
                            <motion.div
                                key={s.label}
                                className="stat"
                                onMouseMove={spotlight}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="stat-value">
                                    <Counter to={s.value} suffix={s.suffix} />
                                </span>
                                <span className="stat-label">{s.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
