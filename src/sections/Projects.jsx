import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { createTimeline } from "animejs";
import { useLenis } from "lenis/react";
import {
    FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight, FiX, FiMaximize2,
    FiMonitor, FiSmartphone, FiArrowDown,
} from "react-icons/fi";
import { PROJECTS, TECH } from "../data/portfolio";
import { SectionHead } from "../components/motion";
import { useViewMode } from "../context/ViewModeContext";
import "./Projects.css";

/* =========================================================================
   Anime.js Scroll-Scrubbed 3D Device Scrollytelling
   Scroll position drives an Anime.js timeline directly:
   - Scrubbing forward advances 3D device tilt, inner screenshot scroll, and project swaps
   - Scrubbing backward plays the timeline in exact reverse
   ========================================================================= */

const pad = (n) => String(n).padStart(2, "0");
const clamp01 = (v) => Math.min(1, Math.max(0, v));

export default function Projects() {
    const { isCompact } = useViewMode();

    const projectsList = useMemo(() => {
        if (!isCompact) return PROJECTS;
        return PROJECTS.filter((p) =>
            ["pharmacy-next", "luxe", "zenix", "myakhwarnyo"].includes(p.id)
        );
    }, [isCompact]);

    const secondaryProjects = useMemo(() => {
        return PROJECTS.filter((p) => !projectsList.some((fp) => fp.id === p.id));
    }, [projectsList]);

    const N = projectsList.length;
    const TOTAL_DURATION = N * 1000;

    const [activeIdx, setActiveIdx] = useState(0);
    const [innerProgress, setInnerProgress] = useState(0);
    const [modalData, setModalData] = useState(null);
    const lenis = useLenis();

    useEffect(() => {
        if (activeIdx >= N) {
            setActiveIdx(0);
        }
    }, [N, activeIdx]);

    const trackRef = useRef(null);
    const pinRef = useRef(null);
    const stage3DRef = useRef(null);
    const timelineRef = useRef(null);
    const activeRef = useRef(0);
    activeRef.current = activeIdx;

    const project = projectsList[activeIdx] || projectsList[0];

    // Scroll directly to a specific project
    const scrollToProject = useCallback(
        (idx) => {
            const targetIdx = Math.max(0, Math.min(N - 1, idx));
            const track = trackRef.current;
            if (!track) return;
            const trackTop = track.getBoundingClientRect().top + window.scrollY;
            const scrollableDist = track.offsetHeight - window.innerHeight;

            // Target time: middle of project's inner scroll window (400ms into its 1000ms slot)
            const targetMs = targetIdx * 1000 + 400;
            const targetP = targetMs / TOTAL_DURATION;
            const targetY = trackTop + scrollableDist * targetP;

            if (lenis) {
                lenis.scrollTo(targetY, { duration: 1.2 });
            } else {
                window.scrollTo({ top: targetY, behavior: "smooth" });
            }
        },
        [lenis]
    );

    /* ---------------- Build Anime.js 3D Scrollytelling Timeline ---------------- */
    useEffect(() => {
        const stage = stage3DRef.current;

        // Animated 3D proxy object
        const proxy = {
            rotX: 18,
            rotY: -14,
            rotZ: 2,
            scale: 0.86,
            y: 60,
            opacity: 0,
            innerScrollPct: 0,
            projectFloat: 0,
        };

        const tl = createTimeline({
            autoplay: false,
            defaults: { ease: "linear" },
            onUpdate: () => {
                // Apply 3D perspective transforms to the device mockup stage
                if (stage) {
                    stage.style.transform = `perspective(1200px) rotateX(${proxy.rotX}deg) rotateY(${proxy.rotY}deg) rotateZ(${proxy.rotZ}deg) scale(${proxy.scale}) translateY(${proxy.y}px)`;
                    stage.style.opacity = proxy.opacity;
                }

                setInnerProgress(proxy.innerScrollPct);

                const currentP = Math.min(Math.max(0, Math.round(proxy.projectFloat)), N - 1);
                if (currentP !== activeRef.current) {
                    setActiveIdx(currentP);
                }
            },
        });

        // Phase 1: Section 3D Entrance (0 to 350ms)
        tl.add(
            proxy,
            {
                rotX: 0,
                rotY: 0,
                rotZ: 0,
                scale: 1,
                y: 0,
                opacity: 1,
                duration: 350,
            },
            0
        );

        // Phase 2: Scrollytelling for each project
        for (let i = 0; i < N; i++) {
            const t0 = i * 1000;

            // Settle / top dwell (t0 to t0 + 150)
            tl.add(
                proxy,
                {
                    innerScrollPct: 0,
                    projectFloat: i,
                    duration: 150,
                },
                t0
            );

            // Screenshot Inner Scroll Scrub (t0 + 150 to t0 + 750)
            tl.add(
                proxy,
                {
                    innerScrollPct: 65,
                    duration: 600,
                },
                t0 + 150
            );

            // Subtle physical 3D tilt while scrubbing down the screen
            tl.add(
                proxy,
                {
                    rotX: 4,
                    rotY: -2,
                    duration: 300,
                },
                t0 + 150
            );
            tl.add(
                proxy,
                {
                    rotX: 0,
                    rotY: 0,
                    duration: 300,
                },
                t0 + 450
            );

            // 3D Device Swap Transition to Next Project (t0 + 750 to t0 + 1000)
            if (i < N - 1) {
                // Device turns away
                tl.add(
                    proxy,
                    {
                        rotY: 16,
                        rotX: -3,
                        scale: 0.94,
                        duration: 125,
                    },
                    t0 + 750
                );

                // Project index advances, inner scroll resets
                tl.add(
                    proxy,
                    {
                        projectFloat: i + 1,
                        innerScrollPct: 0,
                        duration: 125,
                    },
                    t0 + 875
                );

                // Device turns back into straight-on view with new project
                tl.add(
                    proxy,
                    {
                        rotY: 0,
                        rotX: 0,
                        scale: 1,
                        duration: 125,
                    },
                    t0 + 875
                );
            }
        }

        // Phase 3: Section 3D Exit (TOTAL_DURATION - 350 to TOTAL_DURATION)
        tl.add(
            proxy,
            {
                rotX: -16,
                rotY: 12,
                scale: 0.86,
                y: -60,
                opacity: 0,
                duration: 350,
            },
            TOTAL_DURATION - 350
        );

        timelineRef.current = tl;

        // Drive Anime.js timeline directly with scroll position
        let frame = 0;
        const updateOnScroll = () => {
            frame = 0;
            const track = trackRef.current;
            if (!track || !timelineRef.current) return;

            const rect = track.getBoundingClientRect();
            const totalDist = track.offsetHeight - window.innerHeight;
            const p = totalDist > 0 ? clamp01(-rect.top / totalDist) : 0;

            // Direct scrub: scrolling forward advances, scrolling back reverses!
            timelineRef.current.seek(p * TOTAL_DURATION);
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(updateOnScroll);
        };

        updateOnScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [N, TOTAL_DURATION]);

    /* ---------------- Lightbox Modal ---------------- */
    const openModal = (p, imgIdx = 0) => {
        setModalData({ project: p, imgIdx });
        document.body.style.overflow = "hidden";
        lenis?.stop();
    };
    const closeModal = useCallback(() => {
        setModalData(null);
        document.body.style.overflow = "";
        lenis?.start();
    }, [lenis]);
    const nextModalImg = useCallback(() =>
        setModalData((prev) => (prev ? { ...prev, imgIdx: (prev.imgIdx + 1) % prev.project.images.length } : null)), []);
    const prevModalImg = useCallback(() =>
        setModalData((prev) => (prev ? {
            ...prev,
            imgIdx: (prev.imgIdx - 1 + prev.project.images.length) % prev.project.images.length,
        } : null)), []);

    // Lightbox modal keyboard controls (Esc to close, arrows to cycle images)
    useEffect(() => {
        if (!modalData) return;
        const onModalKey = (e) => {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowLeft") prevModalImg();
            if (e.key === "ArrowRight") nextModalImg();
        };
        window.addEventListener("keydown", onModalKey);
        return () => window.removeEventListener("keydown", onModalKey);
    }, [modalData, closeModal, prevModalImg, nextModalImg]);

    // Keyboard navigation
    const onKeyDown = (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            if (activeIdx < N - 1) {
                e.preventDefault();
                scrollToProject(activeIdx + 1);
            }
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            if (activeIdx > 0) {
                e.preventDefault();
                scrollToProject(activeIdx - 1);
            }
        }
    };

    return (
        <section id="projects" className="section projects" style={{ "--c": project.color }}>
            <div className="container">
                <SectionHead
                    eyebrow="04 — Featured Works"
                    title="Crafted with"
                    accent="precision."
                    sub="Selected web, cross-platform mobile, and AI engineering projects from concept to production-ready architecture."
                />
            </div>

            {/* Pinned Scroll Track */}
            <div
                className="device-scroll-track"
                ref={trackRef}
                style={{ "--track-h": `${N * 65 + 30}vh` }}
            >
                <div className="device-pin-wrapper" ref={pinRef}>
                    <div className="container device-stage-container">
                        {/* Ambient dynamic backdrop glow */}
                        <div className="device-stage-glow" aria-hidden="true" />

                        <div className="device-showcase-grid">
                            {/* ---------- Left Column: Project Info & Meta ---------- */}
                            <div className="device-info-col" tabIndex={0} onKeyDown={onKeyDown}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={project.id}
                                        className="device-info-content"
                                        initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <div className="project-badge-row">
                                            <span className="project-idx-pill mono">
                                                {pad(activeIdx + 1)} <i>/ {pad(N)}</i>
                                            </span>
                                            <span className="device-type-badge mono">
                                                {project.mobile ? (
                                                    <>
                                                        <FiSmartphone /> MOBILE APP
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiMonitor /> WEB PLATFORM
                                                    </>
                                                )}
                                            </span>
                                            <span className="project-kind-label">{project.kind}</span>
                                        </div>

                                        <h3 className="project-headline">{project.title}</h3>

                                        <p className="project-description">{project.description}</p>

                                        {/* Inner scroll guidance */}
                                        <div className="inner-scroll-hint mono">
                                            <span className="hint-icon">
                                                <FiArrowDown />
                                            </span>
                                            <span>SCROLL PAGE TO EXPLORE SCREENSHOTS</span>
                                        </div>

                                        {/* Technology Chips */}
                                        <div className="project-tech-chips">
                                            {project.stack.map((id) => {
                                                const t = TECH[id];
                                                if (!t) return null;
                                                return (
                                                    <span
                                                        key={id}
                                                        className="chip device-tech-chip"
                                                        style={{ "--chip-color": t.color }}
                                                    >
                                                        <t.icon /> {t.name}
                                                    </span>
                                                );
                                            })}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="project-action-links">
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary project-btn"
                                                >
                                                    Live Demo <FiExternalLink />
                                                </a>
                                            )}
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-ghost project-btn"
                                                >
                                                    GitHub <FiGithub />
                                                </a>
                                            )}
                                            <button
                                                type="button"
                                                className="btn btn-ghost project-btn"
                                                onClick={() => openModal(project, 0)}
                                            >
                                                Gallery ({project.images.length}) <FiMaximize2 />
                                            </button>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Project Navigation Pills & Quick Controls */}
                                <div className="project-nav-row">
                                    <div className="project-nav-bar">
                                        <button
                                            type="button"
                                            className="nav-arrow-btn"
                                            disabled={activeIdx === 0}
                                            onClick={() => scrollToProject(activeIdx - 1)}
                                            aria-label="Previous project"
                                            title="Previous project"
                                        >
                                            <FiChevronLeft />
                                        </button>
                                        <div className="nav-pills-list">
                                            {projectsList.map((p, i) => (
                                                <button
                                                    key={p.id}
                                                    type="button"
                                                    className={`nav-pill-btn mono ${i === activeIdx ? "active" : ""}`}
                                                    style={{ "--pill-c": p.color }}
                                                    onClick={() => scrollToProject(i)}
                                                    title={`Scroll to ${p.title}`}
                                                >
                                                    <span className="pill-num">{pad(i + 1)}</span>
                                                    <span className="pill-name">{p.title.split(" ")[0]}</span>
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            className="nav-arrow-btn"
                                            disabled={activeIdx === N - 1}
                                            onClick={() => scrollToProject(activeIdx + 1)}
                                            aria-label="Next project"
                                            title="Next project"
                                        >
                                            <FiChevronRight />
                                        </button>
                                    </div>
                                    <a
                                        href="#education"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const el = document.getElementById("education");
                                            lenis ? lenis.scrollTo(el, { offset: -40, duration: 1.2 }) : el?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                        className="skip-projects-link mono"
                                        title="Skip past works section"
                                    >
                                        <span>Skip to Education</span>
                                        <FiArrowDown />
                                    </a>
                                </div>
                            </div>

                            {/* ---------- Right Column: Anime.js 3D Device Mockup Stage ---------- */}
                            <div className="device-mockup-col">
                                <div className="device-3d-stage" ref={stage3DRef}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={project.id}
                                            className="device-motion-wrapper"
                                            initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
                                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                            exit={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
                                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            {project.mobile ? (
                                                /* Phone Mockup Frame */
                                                <div
                                                    className="phone-mockup"
                                                    onClick={() => openModal(project, 0)}
                                                    data-cursor="Expand"
                                                >
                                                    {/* Side buttons */}
                                                    <div className="phone-btn phone-btn-vol-up" />
                                                    <div className="phone-btn phone-btn-vol-down" />
                                                    <div className="phone-btn phone-btn-power" />

                                                    {/* Phone Outer Chassis */}
                                                    <div className="phone-chassis">
                                                        {/* Screen display */}
                                                        <div className="phone-screen">
                                                            {/* Dynamic Island */}
                                                            <div className="phone-island">
                                                                <span className="island-camera" />
                                                            </div>

                                                            {/* Scrubbed Inner Screenshot Stream */}
                                                            <div
                                                                className="device-inner-scroll"
                                                                style={{
                                                                    transform: `translateY(-${innerProgress}%)`,
                                                                }}
                                                            >
                                                                {project.images.slice(0, 3).map((img, idx) => (
                                                                    <img
                                                                        key={idx}
                                                                        src={img}
                                                                        alt={`${project.title} screenshot ${idx + 1}`}
                                                                        className="device-stream-img"
                                                                        draggable={false}
                                                                    />
                                                                ))}
                                                            </div>

                                                            {/* Glass reflection */}
                                                            <div className="phone-glass-glare" />

                                                            {/* Home bar */}
                                                            <div className="phone-home-indicator" />

                                                            {/* Inner scrollbar */}
                                                            <div className="inner-scrollbar-track">
                                                                <div
                                                                    className="inner-scrollbar-thumb"
                                                                    style={{
                                                                        top: `${(innerProgress / 65) * 80}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                /* Laptop Mockup Frame (MacBook Pro) */
                                                <div
                                                    className="laptop-mockup"
                                                    onClick={() => openModal(project, 0)}
                                                    data-cursor="Expand"
                                                >
                                                    {/* Laptop Screen Lid */}
                                                    <div className="laptop-lid">
                                                        {/* Top Notch / Camera */}
                                                        <div className="laptop-notch">
                                                            <span className="laptop-cam" />
                                                            <span className="laptop-cam-led" />
                                                        </div>

                                                        {/* Screen Display */}
                                                        <div className="laptop-screen">
                                                            {/* Browser Tab Bar */}
                                                            <div className="laptop-browser-bar">
                                                                <div className="browser-dots">
                                                                    <span className="dot dot-red" />
                                                                    <span className="dot dot-yellow" />
                                                                    <span className="dot dot-green" />
                                                                </div>
                                                                <div className="browser-url-pill mono">
                                                                    {project.title.toLowerCase().replace(/\s+/g, "-")}.app
                                                                </div>
                                                            </div>

                                                            {/* Scrubbed Inner Screenshot Stream */}
                                                            <div
                                                                className="device-inner-scroll"
                                                                style={{
                                                                    transform: `translateY(-${innerProgress}%)`,
                                                                }}
                                                            >
                                                                {project.images.slice(0, 3).map((img, idx) => (
                                                                    <img
                                                                        key={idx}
                                                                        src={img}
                                                                        alt={`${project.title} screenshot ${idx + 1}`}
                                                                        className="device-stream-img"
                                                                        draggable={false}
                                                                    />
                                                                ))}
                                                            </div>

                                                            {/* Glass reflection */}
                                                            <div className="laptop-glass-glare" />

                                                            {/* Inner scrollbar */}
                                                            <div className="inner-scrollbar-track">
                                                                <div
                                                                    className="inner-scrollbar-thumb"
                                                                    style={{
                                                                        top: `${(innerProgress / 65) * 80}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Laptop Keyboard Deck & Base Hinge */}
                                                    <div className="laptop-base">
                                                        <div className="laptop-base-notch" />
                                                        <div className="laptop-base-lip" />
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* In compact mode, show remaining projects in a clean grid */}
            {isCompact && secondaryProjects.length > 0 && (
                <div className="container secondary-projects-wrap">
                    <div className="secondary-head">
                        <span className="eyebrow">More Builds</span>
                        <h4 className="secondary-title">Additional Works ({secondaryProjects.length})</h4>
                        <p className="secondary-sub">Specialized production builds and applications.</p>
                    </div>
                    <div className="secondary-grid">
                        {secondaryProjects.map((p) => (
                            <div key={p.id} className="secondary-card glass" style={{ "--c": p.color }}>
                                <div className="sec-img-wrap" onClick={() => openModal(p, 0)}>
                                    <img src={p.images[0]} alt={p.title} loading="lazy" />
                                    <span className="sec-view-tag mono">Gallery ({p.images.length})</span>
                                </div>
                                <div className="sec-card-body">
                                    <span className="sec-kind mono">{p.kind}</span>
                                    <h4 className="sec-name">{p.title}</h4>
                                    <p className="sec-desc">{p.description}</p>
                                    <div className="sec-stack">
                                        {p.stack.slice(0, 4).map((tid) => {
                                            const t = TECH[tid];
                                            if (!t) return null;
                                            return (
                                                <span key={tid} className="chip" style={{ "--chip-color": t.color }}>
                                                    <t.icon /> {t.name}
                                                </span>
                                            );
                                        })}
                                    </div>
                                    <div className="sec-links">
                                        {p.live && (
                                            <a href={p.live} target="_blank" rel="noopener noreferrer" className="sec-link">
                                                Live Demo <FiExternalLink />
                                            </a>
                                        )}
                                        {p.github && (
                                            <a href={p.github} target="_blank" rel="noopener noreferrer" className="sec-link">
                                                GitHub <FiGithub />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="container more-work">
                <a
                    href="https://github.com/Kazuo-Mikara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                >
                    View More on GitHub <FiGithub />
                </a>
            </div>

            {/* Lightbox Modal */}
            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {modalData && (
                            <motion.div
                                className="modal-backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeModal}
                                data-lenis-prevent
                            >
                                <button className="modal-close" onClick={closeModal} aria-label="Close modal">
                                    <FiX />
                                </button>

                                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                    <div className="modal-image-wrap">
                                        <img
                                            src={modalData.project.images[modalData.imgIdx]}
                                            alt={`${modalData.project.title} screenshot`}
                                        />
                                    </div>

                                    {modalData.project.images.length > 1 && (
                                        <div className="modal-nav">
                                            <button onClick={prevModalImg} aria-label="Previous image">
                                                <FiChevronLeft />
                                            </button>
                                            <span className="mono modal-counter">
                                                {modalData.imgIdx + 1} / {modalData.project.images.length}
                                            </span>
                                            <button onClick={nextModalImg} aria-label="Next image">
                                                <FiChevronRight />
                                            </button>
                                        </div>
                                    )}

                                    <div className="modal-meta">
                                        <h3>{modalData.project.title}</h3>
                                        <p className="mono">{modalData.project.kind}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </section>
    );
}
