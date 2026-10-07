import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ----------------------------- Magnetic wrapper ----------------------------- */
export function Magnetic({ children, strength = 0.35, className = "" }) {
    const ref = useRef(null);
    const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
    const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });

    const onMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={`magnetic ${className}`}
            style={{ x, y, display: "inline-flex" }}
            onMouseMove={onMove}
            onMouseLeave={reset}
        >
            {children}
        </motion.div>
    );
}

/* ------------------------- Word-by-word title reveal ------------------------ */
export function RevealTitle({ text, accent, as: Tag = "h2", className = "section-title" }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-15% 0px" });
    const words = text.split(" ");
    const accentWords = accent ? accent.split(" ") : [];
    const all = [...words.map((w) => [w, false]), ...accentWords.map((w) => [w, true])];

    return (
        <Tag ref={ref} className={className}>
            {all.map(([w, isAccent], i) => (
                <span className="word" key={i}>
                    <motion.span
                        className={isAccent ? "grad-text" : ""}
                        initial={{ y: "110%", rotate: 6 }}
                        animate={inView ? { y: 0, rotate: 0 } : {}}
                        transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {w}
                    </motion.span>
                    {i < all.length - 1 && "\u00A0"}
                </span>
            ))}
        </Tag>
    );
}

export function SectionHead({ eyebrow, title, accent, sub, center = false }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px" });
    return (
        <div ref={ref} className={`section-head ${center ? "center" : ""}`}>
            <motion.span
                className="eyebrow"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                {eyebrow}
            </motion.span>
            <RevealTitle text={title} accent={accent} />
            {sub && (
                <motion.p
                    className="section-sub"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.35 }}
                >
                    {sub}
                </motion.p>
            )}
        </div>
    );
}

/* ------------------------------ Count-up number ----------------------------- */
export function Counter({ to, suffix = "", duration = 2 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px" });
    const mv = useMotionValue(0);
    const rounded = useTransform(mv, (v) => Math.round(v));

    useEffect(() => {
        if (!inView) return;
        const controls = animate(mv, to, { duration, ease: [0.22, 1, 0.36, 1] });
        return () => controls.stop();
    }, [inView, to, duration, mv]);

    return (
        <span ref={ref}>
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
}

/* -------------------------------- Marquee row ------------------------------- */
export function Marquee({ children, reverse = false, speed = 40 }) {
    return (
        <div className={`marquee ${reverse ? "reverse" : ""}`} style={{ "--speed": `${speed}s` }}>
            <div className="marquee-track">
                {children}
                {children}
            </div>
        </div>
    );
}

/* -------------------- Spotlight card (mouse-follow glow) -------------------- */
export function useSpotlight() {
    return (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
}
