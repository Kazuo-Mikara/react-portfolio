import { useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { EXPERIENCE, TECH } from "../data/portfolio";
import { SectionHead, useSpotlight } from "../components/motion";
import "./Experience.css";

const EASE = [0.22, 1, 0.36, 1];

function Role({ exp, i }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-15% 0px" });
    const spotlight = useSpotlight();

    return (
        <motion.article
            ref={ref}
            className={`role ${exp.current ? "current" : ""}`}
            style={{ "--c": exp.color }}
            onMouseMove={spotlight}
            initial={{ opacity: 0, x: 80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
        >
            <motion.span
                className="role-node"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
            />

            <div className="role-head">
                <span className="role-index mono">{String(EXPERIENCE.length - i).padStart(2, "0")}</span>
                <div className="role-meta mono">
                    <span>
                        <FiCalendar /> {exp.period}
                    </span>
                    <span>
                        <FiMapPin /> {exp.location}
                    </span>
                </div>
                {exp.current && (
                    <span className="now-badge mono">
                        <span className="status-dot" /> Now
                    </span>
                )}
            </div>

            <h3 className="role-title">{exp.role}</h3>
            <p className="role-company">@ {exp.company}</p>

            <ul className="role-points">
                {exp.points.map((p, k) => (
                    <motion.li
                        key={k}
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.25 + k * 0.08, ease: EASE }}
                    >
                        {p}
                    </motion.li>
                ))}
            </ul>

            <div className="role-stack">
                {exp.stack.map((id) => {
                    const t = TECH[id];
                    return (
                        <span key={id} className="chip" style={{ "--chip-color": t.color }}>
                            <t.icon /> {t.name}
                        </span>
                    );
                })}
            </div>
        </motion.article>
    );
}

export default function Experience() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
    const line = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <section id="experience" className="section experience">
            <div className="container exp-grid">
                <div className="exp-side">
                    <SectionHead
                        eyebrow="03 — Experience"
                        title="Where I've"
                        accent="shipped."
                        sub="From data & QA foundations to leading development teams — every role sharpened how I build, test and deliver."
                    />
                    <div className="exp-legend">
                        {EXPERIENCE.map((e) => (
                            <span key={e.id} style={{ "--c": e.color }}>
                                <i /> {e.company}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="timeline" ref={ref}>
                    <div className="timeline-track">
                        <motion.div className="timeline-fill" style={{ scaleY: line }} />
                    </div>
                    {EXPERIENCE.map((exp, i) => (
                        <Role key={exp.id} exp={exp} i={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
