import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import { useLenis } from "lenis/react";
import { FiArrowUpRight } from "react-icons/fi";
import { PROFILE } from "../data/portfolio";
import { Magnetic } from "./motion";

const LINKS = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Work" },
    { id: "education", label: "Education" },
];

export default function Navbar() {
    const [active, setActive] = useState("home");
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const lenis = useLenis();
    const { scrollY, scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

    // Hide on scroll down, reveal on scroll up
    useMotionValueEvent(scrollY, "change", (y) => {
        const prev = scrollY.getPrevious() ?? 0;
        setHidden(y > prev && y > 400 && !open);
        setScrolled(y > 40);
    });

    // Track which section is on screen
    useEffect(() => {
        const ids = ["home", ...LINKS.map((l) => l.id), "contact"];
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: "-45% 0px -50% 0px" }
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) io.observe(el);
        });
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        open ? lenis?.stop() : lenis?.start();
    }, [open, lenis]);

    const go = (id) => (e) => {
        e.preventDefault();
        setOpen(false);
        const target = document.getElementById(id);
        if (!target) return;
        if (lenis) lenis.scrollTo(target, { offset: id === "home" ? 0 : -40, duration: 1.4 });
        else target.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.div className="scroll-progress" style={{ scaleX: progress }} />

            <motion.header
                className={`nav ${scrolled ? "is-scrolled" : ""}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: hidden ? -110 : 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <a href="#home" className="nav-logo" onClick={go("home")} aria-label="Back to top">
                    <span className="logo-mark">H</span>
                    <span className="logo-text">
                        {PROFILE.firstName}
                        <em>.dev</em>
                    </span>
                </a>

                <nav className="nav-pill glass" aria-label="Primary">
                    {LINKS.map((l) => (
                        <a
                            key={l.id}
                            href={`#${l.id}`}
                            onClick={go(l.id)}
                            className={active === l.id ? "active" : ""}
                        >
                            {active === l.id && (
                                <motion.span
                                    layoutId="nav-active"
                                    className="nav-active"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            <span className="nav-label">{l.label}</span>
                        </a>
                    ))}
                </nav>

                <div className="nav-right">
                    <Magnetic strength={0.25}>
                        <a href="#contact" onClick={go("contact")} className="btn btn-primary nav-cta" id="nav-cta">
                            Let's talk <FiArrowUpRight />
                        </a>
                    </Magnetic>
                    <button
                        className={`burger ${open ? "open" : ""}`}
                        onClick={() => setOpen((o) => !o)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        id="nav-burger"
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </motion.header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
                        animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
                        exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <ul>
                            {[...LINKS, { id: "contact", label: "Contact" }].map((l, i) => (
                                <motion.li
                                    key={l.id}
                                    initial={{ y: 60, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <a href={`#${l.id}`} onClick={go(l.id)}>
                                        <span className="mono">0{i + 1}</span>
                                        {l.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                        <motion.div
                            className="mobile-foot mono"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            {PROFILE.email}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
