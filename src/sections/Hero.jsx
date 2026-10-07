import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useLenis } from "lenis/react";
import { FaGithub, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FiArrowUpRight, FiDownload, FiPause, FiPlay } from "react-icons/fi";
import Resume from "../assets/Htoo_Myat_Kyaw.pdf";
import { PROFILE } from "../data/portfolio";
import { Magnetic } from "../components/motion";
import "./Hero.css";

const EASE = [0.22, 1, 0.36, 1];

/* Syntax-highlighted code that "types" itself in the hero card */
const CODE = [
    [["kw", "const "], ["var", "developer"], ["p", " = {"]],
    [["p", "  "], ["key", "name"], ["p", ": "], ["str", `"${PROFILE.name}"`], ["p", ","]],
    [["p", "  "], ["key", "role"], ["p", ": ["], ["str", '"Frontend Dev"'], ["p", ", "], ["str", '"Dev Lead"'], ["p", "],"]],
    [["p", "  "], ["key", "stack"], ["p", ": ["], ["str", '"React"'], ["p", ", "], ["str", '"Next.js"'], ["p", ", "], ["str", '"RN"'], ["p", "],"]],
    [["p", "  "], ["key", "ships"], ["p", ": ["], ["str", '"Docker"'], ["p", ", "], ["str", '"CI/CD"'], ["p", ", "], ["str", '"APIs"'], ["p", "],"]],
    [["p", "  "], ["key", "based"], ["p", ": "], ["str", '"Yangon, MM"'], ["p", ","]],
    [["p", "  "], ["key", "available"], ["p", ": "], ["bool", "true"], ["p", ","]],
    [["p", "};"]],
    [["p", ""]],
    [["var", "developer"], ["p", "."], ["fn", "build"], ["p", "("], ["str", '"your next idea"'], ["p", ");"]],
    [["com", "// → shipped to production ✓"]],
];

function TypedCode({ start }) {
    const total = useMemo(() => CODE.flat().reduce((n, [, t]) => n + t.length, 0) + CODE.length, []);
    const [n, setN] = useState(0);

    useEffect(() => {
        if (!start) return;
        const id = setInterval(() => setN((v) => (v >= total ? (clearInterval(id), v) : v + 2)), 22);
        return () => clearInterval(id);
    }, [start, total]);

    let budget = n;
    return (
        <pre className="code-body mono">
            {CODE.map((line, li) => {
                if (budget <= 0) return null;
                budget -= 1; // newline
                return (
                    <div className="code-line" key={li}>
                        <span className="ln">{String(li + 1).padStart(2, "0")}</span>
                        <span>
                            {line.map(([cls, txt], ti) => {
                                if (budget <= 0) return null;
                                const shown = txt.slice(0, budget);
                                budget -= txt.length;
                                return (
                                    <span key={ti} className={`tk-${cls}`}>
                                        {shown}
                                    </span>
                                );
                            })}
                            {budget <= 0 && <span className="caret" />}
                        </span>
                    </div>
                );
            })}
            {n >= total && (
                <div className="code-line">
                    <span className="ln">{String(CODE.length + 1).padStart(2, "0")}</span>
                    <span className="caret" />
                </div>
            )}
        </pre>
    );
}

function RoleRotator({ start }) {
    const [i, setI] = useState(0);
    useEffect(() => {
        if (!start) return;
        const id = setInterval(() => setI((v) => (v + 1) % PROFILE.roles.length), 2600);
        return () => clearInterval(id);
    }, [start]);
    return (
        <span className="role-rotator">
            <AnimatePresence mode="wait">
                <motion.span
                    key={i}
                    className="grad-text"
                    initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.55, ease: EASE }}
                >
                    {PROFILE.roles[i]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

function LocalTime() {
    const fmt = useMemo(
        () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: PROFILE.timezone }),
        []
    );
    const [t, setT] = useState(() => fmt.format(new Date()));
    useEffect(() => {
        const id = setInterval(() => setT(fmt.format(new Date())), 1000);
        return () => clearInterval(id);
    }, [fmt]);
    return <span className="mono">{t}</span>;
}

const SplitLine = ({ text, delay, ready, className = "" }) => (
    <span className={`hero-line ${className}`}>
        {text.split("").map((c, i) => (
            <motion.span
                key={i}
                initial={{ y: "115%", rotate: 8 }}
                animate={ready ? { y: 0, rotate: 0 } : {}}
                transition={{ duration: 1, delay: delay + i * 0.035, ease: EASE }}
            >
                {c === " " ? "\u00A0" : c}
            </motion.span>
        ))}
    </span>
);

export default function Hero({ ready }) {
    const ref = useRef(null);
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(true);
    const lenis = useLenis();

    // Scroll-linked parallax
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.3]);
    const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const veil = useTransform(scrollYProgress, [0, 1], [0, 0.75]);

    // Mouse parallax / tilt
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const smx = useSpring(mx, { stiffness: 80, damping: 20 });
    const smy = useSpring(my, { stiffness: 80, damping: 20 });
    const tiltX = useTransform(smy, [-0.5, 0.5], [10, -10]);
    const tiltY = useTransform(smx, [-0.5, 0.5], [-14, 14]);
    const mediaX = useTransform(smx, [-0.5, 0.5], [18, -18]);
    const mediaY = useTransform(smy, [-0.5, 0.5], [12, -12]);
    const glowX = useTransform(smx, [-0.5, 0.5], ["30%", "70%"]);
    const glowY = useTransform(smy, [-0.5, 0.5], ["30%", "70%"]);

    const onMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
    };

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            videoRef.current?.pause();
            setPlaying(false);
        }
    }, []);

    const toggleVideo = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) {
            v.play();
            setPlaying(true);
        } else {
            v.pause();
            setPlaying(false);
        }
    };

    const scrollTo = (id) => (e) => {
        e.preventDefault();
        const el = document.getElementById(id);
        lenis ? lenis.scrollTo(el, { offset: -40, duration: 1.4 }) : el?.scrollIntoView({ behavior: "smooth" });
    };

    const fade = (delay) => ({
        initial: { opacity: 0, y: 30 },
        animate: ready ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.9, delay, ease: EASE },
    });

    return (
        <section id="home" className="hero" ref={ref} onMouseMove={onMove}>
            {/* ---------- Video layer ---------- */}
            <motion.div className="hero-media" style={{ scale: videoScale, y: videoY }}>
                <motion.div className="hero-media-inner" style={{ x: mediaX, y: mediaY }}>
                    <motion.video
                        ref={videoRef}
                        className="hero-video"
                        src="/assets/upscaled-video.mp4"
                        poster="/assets/hero-poster.jpg"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        initial={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
                        animate={ready ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                        transition={{ duration: 1.8, ease: EASE }}
                    />
                </motion.div>
            </motion.div>

            <div className="hero-overlay" />
            <motion.div className="hero-glow" style={{ left: glowX, top: glowY }} />
            <div className="hero-grid" />
            <div className="hero-scanline" />
            <motion.div className="hero-veil" style={{ opacity: veil }} />

            {/* ---------- Content ---------- */}
            <motion.div className="container hero-inner" style={{ y: contentY, opacity: contentOpacity }}>
                <div className="hero-copy">
                    <motion.div className="status-pill glass" {...fade(0.2)}>
                        <span className="status-dot" />
                        Available for opportunities & challenges
                    </motion.div>

                    <h1 className="hero-title">
                        <span className="sr-only">{PROFILE.name} — </span>
                        <SplitLine text={PROFILE.firstName} delay={0.3} ready={ready} />
                        <SplitLine text={PROFILE.lastName} delay={0.5} ready={ready} className="outline" />
                    </h1>

                    <motion.p className="hero-role" {...fade(0.9)}>
                        <span className="mono role-prefix">&gt;_</span>
                        <RoleRotator start={ready} />
                    </motion.p>

                    <motion.p className="hero-intro" {...fade(1.05)}>
                        {PROFILE.intro}
                    </motion.p>

                    <motion.div className="hero-ctas" {...fade(1.2)}>
                        <Magnetic>
                            <a href="#projects" onClick={scrollTo("projects")} className="btn btn-primary" id="hero-cta-work">
                                Explore my work <FiArrowUpRight />
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href={Resume} download="Htoo_Myat_Kyaw_CV.pdf" className="btn btn-ghost" id="hero-cta-cv">
                                Download CV <FiDownload />
                            </a>
                        </Magnetic>
                    </motion.div>
                </div>

                <motion.aside
                    className="hero-code-wrap"
                    initial={{ opacity: 0, y: 60, rotateX: 25 }}
                    animate={ready ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ duration: 1.2, delay: 0.7, ease: EASE }}
                    aria-hidden="true"
                >
                    <motion.div className="hero-code glass" style={{ rotateX: tiltX, rotateY: tiltY }}>
                        <div className="code-head">
                            <span className="dot r" />
                            <span className="dot y" />
                            <span className="dot g" />
                            <span className="code-file mono">developer.ts</span>
                            <span className="code-badge mono">LIVE</span>
                        </div>
                        <TypedCode start={ready} />
                        <div className="code-floating chip-a glass mono">⚡ 99 Lighthouse</div>
                        <div className="code-floating chip-b glass mono">✓ CI passing</div>
                    </motion.div>
                </motion.aside>
            </motion.div>

            {/* ---------- Footer bar ---------- */}
            <motion.div
                className="container hero-foot"
                initial={{ opacity: 0 }}
                animate={ready ? { opacity: 1 } : {}}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <div className="hero-socials">
                    {[
                        [PROFILE.socials.github, FaGithub, "GitHub"],
                        [PROFILE.socials.linkedin, FaLinkedinIn, "LinkedIn"],
                        [PROFILE.socials.facebook, FaFacebookF, "Facebook"],
                    ].map(([href, Icon, label]) => (
                        <Magnetic key={label} strength={0.5}>
                            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-btn">
                                <Icon />
                            </a>
                        </Magnetic>
                    ))}
                </div>

                <a href="#about" onClick={scrollTo("about")} className="scroll-cue" aria-label="Scroll down">
                    <span className="mouse">
                        <span />
                    </span>
                    <span className="mono">Scroll to explore</span>
                </a>

                <div className="hero-meta">
                    <span className="mono">{PROFILE.location}</span>
                    <LocalTime />
                    <button className="video-toggle" onClick={toggleVideo} aria-label={playing ? "Pause background video" : "Play background video"} id="hero-video-toggle">
                        {playing ? <FiPause /> : <FiPlay />}
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
