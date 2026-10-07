import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE } from "../data/portfolio";

/**
 * Full-screen intro: counts to 100, then wipes away revealing the site.
 * Calls `onDone` when the exit animation starts so the hero can begin its intro.
 */
export default function Preloader({ onDone }) {
    const [count, setCount] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const duration = reduce ? 200 : 1700;
        const start = performance.now();
        let raf;
        const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            // ease-out cubic so it slows near 100
            setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
            if (t < 1) raf = requestAnimationFrame(tick);
            else
                setTimeout(() => {
                    setVisible(false);
                    document.body.classList.remove("is-loading");
                    onDone?.();
                }, 250);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [onDone]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="preloader"
                    initial={{ clipPath: "inset(0 0 0% 0)" }}
                    exit={{ clipPath: "inset(0 0 100% 0)" }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                    aria-hidden="true"
                >
                    <div className="preloader-name">
                        {PROFILE.name.split("").map((c, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: "110%" }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.15 + i * 0.03, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {c === " " ? "\u00A0" : c}
                            </motion.span>
                        ))}
                    </div>
                    <div className="preloader-bar">
                        <span style={{ transform: `scaleX(${count / 100})` }} />
                    </div>
                    <div className="preloader-count mono">
                        {String(count).padStart(3, "0")}
                        <small>%</small>
                    </div>
                    <div className="preloader-tag mono">initializing portfolio.exe</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
