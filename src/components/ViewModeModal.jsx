import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiZap, FiLayers, FiX, FiCheck, FiArrowRight } from "react-icons/fi";
import { useViewMode } from "../context/ViewModeContext";
import "./ViewModeModal.css";

export default function ViewModeModal() {
    const { isModalOpen, viewMode, selectMode, closeModal } = useViewMode();

    // Close on escape key
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") closeModal();
        };
        if (isModalOpen) {
            window.addEventListener("keydown", onKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [isModalOpen, closeModal]);

    return (
        <AnimatePresence>
            {isModalOpen && (
                <div className="view-modal-overlay">
                    <motion.div
                        className="view-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    />

                    <motion.div
                        className="view-modal-card glass"
                        initial={{ opacity: 0, scale: 0.92, y: 25 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 25 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <button
                            type="button"
                            className="modal-close-btn"
                            onClick={closeModal}
                            aria-label="Close modal"
                        >
                            <FiX />
                        </button>

                        <div className="view-modal-header">
                            <span className="view-modal-eyebrow mono">PORTFOLIO EXPERIENCE</span>
                            <h2 id="modal-title" className="view-modal-title">
                                Choose your preferred <span className="grad-text">viewing mode</span>
                            </h2>
                            <p className="view-modal-subtitle">
                                Customize your visit based on how much time you have. You can switch modes at any time.
                            </p>
                        </div>

                        <div className="view-mode-grid">
                            {/* Option 1: Compact View */}
                            <button
                                type="button"
                                className={`mode-choice-card ${viewMode === "compact" ? "selected" : ""}`}
                                onClick={() => selectMode("compact")}
                            >
                                <div className="mode-card-badge compact-badge mono">
                                    <FiZap /> RECOMMENDED FOR RECRUITERS
                                </div>
                                <div className="mode-card-header">
                                    <div className="mode-icon-circle compact-icon">
                                        <FiZap />
                                    </div>
                                    <div>
                                        <h3 className="mode-name">Compact View</h3>
                                        <span className="mode-tagline">Fast, punchy & decluttered</span>
                                    </div>
                                </div>

                                <ul className="mode-features-list">
                                    <li>
                                        <FiCheck className="check-icon" />
                                        <span>Streamlined Hero focused on value & direct contact</span>
                                    </li>
                                    <li>
                                        <FiCheck className="check-icon" />
                                        <span>Clean Skills breakdown without arbitrary % ratings</span>
                                    </li>
                                    <li>
                                        <FiCheck className="check-icon" />
                                        <span>Curated flagship projects with minimal scroll fatigue</span>
                                    </li>
                                    <li>
                                        <FiCheck className="check-icon" />
                                        <span>Concise experience highlights for rapid scanning</span>
                                    </li>
                                </ul>

                                <div className="mode-card-action">
                                    <span className="action-text">Enter Compact View</span>
                                    <FiArrowRight className="action-arrow" />
                                </div>
                            </button>

                            {/* Option 2: Full View */}
                            <button
                                type="button"
                                className={`mode-choice-card ${viewMode === "full" ? "selected" : ""}`}
                                onClick={() => selectMode("full")}
                            >
                                <div className="mode-card-badge full-badge mono">
                                    <FiLayers /> FULL IMMERSION
                                </div>
                                <div className="mode-card-header">
                                    <div className="mode-icon-circle full-icon">
                                        <FiLayers />
                                    </div>
                                    <div>
                                        <h3 className="mode-name">Full Experience</h3>
                                        <span className="mode-tagline">Comprehensive & interactive</span>
                                    </div>
                                </div>

                                <ul className="mode-features-list">
                                    <li>
                                        <FiCheck className="check-icon" />
                                        <span>Interactive typed code card, clock & telemetry widgets</span>
                                    </li>
                                    <li>
                                        <FiCheck className="check-icon" />
                                        <span>Interactive Stack Explorer with tech usage heatmaps</span>
                                    </li>
                                    <li>
                                        <FiCheck className="check-icon" />
                                        <span>Complete 7-project scrollytelling deep dive</span>
                                    </li>
                                    <li>
                                        <FiCheck className="check-icon" />
                                        <span>Detailed domain skill levels & complete tech registries</span>
                                    </li>
                                </ul>

                                <div className="mode-card-action">
                                    <span className="action-text">Enter Full View</span>
                                    <FiArrowRight className="action-arrow" />
                                </div>
                            </button>
                        </div>

                        <div className="view-modal-footer mono">
                            <span>💡 You can switch modes anytime using the toggle in the navigation bar.</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
