import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom two-part cursor (dot + lagging ring). Grows over interactive
 * elements and shows a label for elements with `data-cursor="Label"`.
 * Only enabled on devices with a fine pointer.
 */
export default function Cursor() {
    const [enabled, setEnabled] = useState(false);
    const [hover, setHover] = useState(false);
    const [label, setLabel] = useState("");
    const [down, setDown] = useState(false);

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
    const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

    useEffect(() => {
        const mq = window.matchMedia("(pointer: fine)");
        if (!mq.matches) return;
        setEnabled(true);
        document.documentElement.classList.add("has-cursor");

        const move = (e) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };
        const over = (e) => {
            const el = e.target.closest("a, button, [data-cursor], input, textarea, label");
            setHover(!!el);
            setLabel(el?.dataset?.cursor || "");
        };
        const md = () => setDown(true);
        const mu = () => setDown(false);

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", over);
        window.addEventListener("mousedown", md);
        window.addEventListener("mouseup", mu);
        return () => {
            document.documentElement.classList.remove("has-cursor");
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", over);
            window.removeEventListener("mousedown", md);
            window.removeEventListener("mouseup", mu);
        };
    }, [x, y]);

    if (!enabled) return null;

    const size = label ? 84 : hover ? 54 : 34;

    return (
        <>
            <motion.div className="cursor-dot" style={{ x, y }} animate={{ scale: hover ? 0 : 1 }} />
            <motion.div
                className={`cursor-ring ${label ? "has-label" : ""}`}
                style={{ x: rx, y: ry }}
                animate={{ width: size, height: size, scale: down ? 0.85 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
                {label && <span>{label}</span>}
            </motion.div>
        </>
    );
}
