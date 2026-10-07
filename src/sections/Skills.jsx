import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLenis } from "lenis/react";
import { FiArrowUpRight, FiBriefcase, FiFolder, FiLayers } from "react-icons/fi";
import { DOMAINS, TECH, usageFor } from "../data/portfolio";
import { SectionHead, useSpotlight } from "../components/motion";
import "./Skills.css";

const EASE = [0.22, 1, 0.36, 1];

/* Unique projects/roles touched by any tech in a domain */
const domainUsage = (domain) => {
    const p = new Set();
    const r = new Set();
    domain.tech.forEach((t) => {
        const u = usageFor(t);
        u.projects.forEach((x) => p.add(x.id));
        u.roles.forEach((x) => r.add(x.id));
    });
    return { projects: p.size, roles: r.size };
};

function Ring({ value, color, inView }) {
    const R = 26;
    const C = 2 * Math.PI * R;
    return (
        <svg className="ring" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r={R} className="ring-bg" />
            <motion.circle
                cx="32"
                cy="32"
                r={R}
                stroke={color}
                strokeDasharray={C}
                initial={{ strokeDashoffset: C }}
                animate={inView ? { strokeDashoffset: C * (1 - value / 100) } : {}}
                transition={{ duration: 1.8, ease: EASE, delay: 0.3 }}
                className="ring-fg"
            />
        </svg>
    );
}

function DomainCard({ d, i, active, onSelect }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-10%" });
    const spotlight = useSpotlight();
    const usage = useMemo(() => domainUsage(d), [d]);
    const Icon = d.icon;

    return (
        <motion.button
            ref={ref}
            type="button"
            id={`domain-${d.id}`}
            className={`domain ${i === 0 ? "wide" : ""} ${active ? "is-active" : ""}`}
            style={{ "--c": d.color }}
            onMouseMove={spotlight}
            onClick={() => onSelect(d.id)}
            data-cursor="Explore"
            initial={{ opacity: 0, y: 60, rotateX: -12 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: EASE }}
        >
            <div className="domain-top">
                <span className="domain-icon">
                    <Icon />
                </span>
                <div className="domain-level">
                    <Ring value={d.level} color={d.color} inView={inView} />
                    <span className="mono">{d.level}</span>
                </div>
            </div>

            <h3 className="domain-title">{d.title}</h3>
            <p className="domain-summary">{d.summary}</p>

            <div className="domain-tech">
                {d.tech.map((id, k) => {
                    const t = TECH[id];
                    return (
                        <motion.span
                            key={id}
                            className="tech-dot"
                            title={t.name}
                            style={{ "--tc": t.color }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={inView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ delay: 0.4 + k * 0.05, type: "spring", stiffness: 300, damping: 18 }}
                        >
                            <t.icon />
                        </motion.span>
                    );
                })}
            </div>

            <div className="domain-foot mono">
                <span>
                    <FiFolder /> {usage.projects} projects
                </span>
                <span>
                    <FiBriefcase /> {usage.roles} roles
                </span>
                <FiArrowUpRight className="domain-arrow" />
            </div>
        </motion.button>
    );
}

function Explorer({ domainId, setDomainId }) {
    const lenis = useLenis();
    const domain = DOMAINS.find((d) => d.id === domainId);
    const techIds = domain ? domain.tech : [...new Set(DOMAINS.flatMap((d) => d.tech))];
    const [picked, setPicked] = useState("react");
    const current = techIds.includes(picked) ? picked : techIds[0];
    const tech = TECH[current];
    const usage = usageFor(current);

    const goProject = (id) => {
        const el = document.getElementById(`project-${id}`);
        if (el) lenis ? lenis.scrollTo(el, { offset: -100, duration: 1.6 }) : el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <motion.div
            className="explorer glass"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: EASE }}
            id="stack-explorer"
        >
            <div className="explorer-head">
                <div>
                    <span className="eyebrow">Stack explorer</span>
                    <h3>Pick a technology — see where I've applied it.</h3>
                </div>
                <div className="explorer-tabs" role="tablist">
                    {[{ id: null, title: "All" }, ...DOMAINS].map((d) => (
                        <button
                            key={d.id ?? "all"}
                            role="tab"
                            aria-selected={domainId === d.id}
                            className={domainId === d.id ? "active" : ""}
                            onClick={() => setDomainId(d.id)}
                            style={{ "--c": d.color ?? "#a78bfa" }}
                        >
                            {domainId === d.id && <motion.span layoutId="exp-tab" className="tab-bg" />}
                            <span>{d.title.split(" ")[0]}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="explorer-body">
                <motion.div layout className="tech-grid">
                    <AnimatePresence mode="popLayout">
                        {techIds.map((id) => {
                            const t = TECH[id];
                            const u = usageFor(id);
                            const count = u.projects.length + u.roles.length;
                            return (
                                <motion.button
                                    layout
                                    key={id}
                                    className={`tech-tile ${current === id ? "active" : ""}`}
                                    style={{ "--tc": t.color, "--heat": Math.min(count / 6, 1) }}
                                    onClick={() => setPicked(id)}
                                    onMouseEnter={() => setPicked(id)}
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    transition={{ duration: 0.35, ease: EASE }}
                                    id={`tech-${id}`}
                                >
                                    <t.icon />
                                    <span className="tile-name">{t.name}</span>
                                    <span className="tile-count mono">{count}</span>
                                </motion.button>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                <div className="usage-panel">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 30, filter: "blur(6px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -30, filter: "blur(6px)" }}
                            transition={{ duration: 0.4, ease: EASE }}
                            style={{ "--tc": tech.color }}
                        >
                            <div className="usage-head">
                                <span className="usage-icon">
                                    <tech.icon />
                                </span>
                                <div>
                                    <h4>{tech.name}</h4>
                                    <p className="mono">
                                        {usage.projects.length} project{usage.projects.length !== 1 && "s"} · {usage.roles.length} role
                                        {usage.roles.length !== 1 && "s"}
                                    </p>
                                </div>
                            </div>

                            {usage.projects.length > 0 && (
                                <div className="usage-group">
                                    <span className="usage-label mono">
                                        <FiLayers /> Built with it
                                    </span>
                                    {usage.projects.map((p, k) => (
                                        <motion.button
                                            key={p.id}
                                            className="usage-item"
                                            onClick={() => goProject(p.id)}
                                            style={{ "--pc": p.color }}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.08 * k }}
                                        >
                                            <span className="dot" />
                                            <span className="usage-title">{p.title}</span>
                                            <span className="usage-sub">{p.kind}</span>
                                            <FiArrowUpRight />
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {usage.roles.length > 0 && (
                                <div className="usage-group">
                                    <span className="usage-label mono">
                                        <FiBriefcase /> Used professionally
                                    </span>
                                    {usage.roles.map((r, k) => (
                                        <motion.div
                                            key={r.id}
                                            className="usage-item static"
                                            style={{ "--pc": r.color }}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.08 * (k + usage.projects.length) }}
                                        >
                                            <span className="dot" />
                                            <span className="usage-title">{r.role}</span>
                                            <span className="usage-sub">{r.company}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}

export default function Skills() {
    const [domainId, setDomainId] = useState(null);
    const lenis = useLenis();

    const select = (id) => {
        setDomainId(id);
        const el = document.getElementById("stack-explorer");
        if (el) lenis ? lenis.scrollTo(el, { offset: -100, duration: 1.2 }) : el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="skills" className="section skills">
            <div className="skills-orb" aria-hidden="true" />
            <div className="container">
                <SectionHead
                    eyebrow="02 — Applied knowledge"
                    title="Skills proven"
                    accent="in production."
                    sub="Not just a list of buzzwords — every domain below links to the real projects and roles where I applied it. Click a card to explore."
                />

                <div className="domains">
                    {DOMAINS.map((d, i) => (
                        <DomainCard key={d.id} d={d} i={i} active={domainId === d.id} onSelect={select} />
                    ))}
                </div>

                <Explorer domainId={domainId} setDomainId={setDomainId} />
            </div>
        </section>
    );
}
