import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight, FiMaximize2, FiX } from "react-icons/fi";
import { PROJECTS, TECH } from "../data/portfolio";
import { SectionHead } from "../components/motion";
import "./Projects.css";

const EASE = [0.22, 1, 0.36, 1];

function ProjectCard({ project, index, onOpenModal }) {
    const cardRef = useRef(null);
    const inView = useInView(cardRef, { once: true, margin: "-10%" });
    const [currentImg, setCurrentImg] = useState(0);

    const nextImg = (e) => {
        e.stopPropagation();
        setCurrentImg((prev) => (prev + 1) % project.images.length);
    };

    const prevImg = (e) => {
        e.stopPropagation();
        setCurrentImg((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    return (
        <motion.article
            ref={cardRef}
            id={`project-${project.id}`}
            className={`project-card ${project.mobile ? "mobile-layout" : ""}`}
            style={{ "--c": project.color }}
            initial={{ opacity: 0, y: 70 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: (index % 2) * 0.15, ease: EASE }}
        >
            <div className="project-preview" onClick={() => onOpenModal(project, currentImg)} data-cursor="Expand">
                <div className="preview-screen">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImg}
                            src={project.images[currentImg]}
                            alt={`${project.title} screenshot ${currentImg + 1}`}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.4 }}
                            loading="lazy"
                        />
                    </AnimatePresence>
                    <div className="preview-overlay">
                        <span className="expand-hint mono">
                            <FiMaximize2 /> Click to enlarge
                        </span>
                    </div>
                </div>

                {project.images.length > 1 && (
                    <div className="preview-nav">
                        <button type="button" onClick={prevImg} aria-label="Previous screenshot" className="prev-btn">
                            <FiChevronLeft />
                        </button>
                        <div className="preview-dots">
                            {project.images.map((_, i) => (
                                <button
                                    type="button"
                                    key={i}
                                    className={`p-dot ${i === currentImg ? "active" : ""}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImg(i);
                                    }}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>
                        <button type="button" onClick={nextImg} aria-label="Next screenshot" className="next-btn">
                            <FiChevronRight />
                        </button>
                    </div>
                )}
            </div>

            <div className="project-info">
                <div className="project-top">
                    <span className="project-idx mono">0{index + 1}</span>
                    <span className="project-kind">{project.kind}</span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-tech">
                    {project.stack.map((id) => {
                        const t = TECH[id];
                        if (!t) return null;
                        return (
                            <span key={id} className="chip" style={{ "--chip-color": t.color }}>
                                <t.icon /> {t.name}
                            </span>
                        );
                    })}
                </div>

                <div className="project-links">
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
                </div>
            </div>
        </motion.article>
    );
}

export default function Projects() {
    const [modalData, setModalData] = useState(null);

    const openModal = (project, imgIdx) => {
        setModalData({ project, imgIdx });
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setModalData(null);
        document.body.style.overflow = "";
    };

    const nextModalImg = () => {
        setModalData((prev) => ({
            ...prev,
            imgIdx: (prev.imgIdx + 1) % prev.project.images.length,
        }));
    };

    const prevModalImg = () => {
        setModalData((prev) => ({
            ...prev,
            imgIdx: (prev.imgIdx - 1 + prev.project.images.length) % prev.project.images.length,
        }));
    };

    return (
        <section id="projects" className="section projects">
            <div className="container">
                <SectionHead
                    eyebrow="04 — Featured Works"
                    title="Crafted with"
                    accent="precision."
                    sub="Selected web, cross-platform mobile, and AI engineering projects from concept to production-ready architecture."
                />

                <div className="projects-grid">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onOpenModal={openModal}
                        />
                    ))}
                </div>

                <div className="more-work">
                    <a
                        href="https://github.com/Kazuo-Mikara"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost"
                    >
                        View More on GitHub <FiGithub />
                    </a>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {modalData && (
                    <motion.div
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
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
            </AnimatePresence>
        </section>
    );
}
