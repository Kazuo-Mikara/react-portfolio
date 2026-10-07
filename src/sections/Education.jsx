import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiAward, FiBookOpen, FiCalendar, FiMapPin } from "react-icons/fi";
import { EDUCATION } from "../data/portfolio";
import { SectionHead, useSpotlight } from "../components/motion";
import YULogo from "../assets/YU.png";
import UoPeopleLogo from "../assets/UoPeople.jpg";
import "./Education.css";

const LOGOS = {
    yu: YULogo,
    uopeople: UoPeopleLogo,
};

const EASE = [0.22, 1, 0.36, 1];

function EducationCard({ edu, index }) {
    const cardRef = useRef(null);
    const inView = useInView(cardRef, { once: true, margin: "-10%" });
    const spotlight = useSpotlight();
    const logoSrc = LOGOS[edu.logo];

    return (
        <motion.div
            ref={cardRef}
            className="edu-card"
            style={{ "--c": edu.color }}
            onMouseMove={spotlight}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2, ease: EASE }}
        >
            <div className="edu-top">
                <div className="edu-logo-wrap">
                    <img src={logoSrc} alt={`${edu.school} logo`} className="edu-logo" />
                </div>
                <div className="edu-period mono">
                    <FiCalendar /> {edu.start} — {edu.end}
                </div>
            </div>

            <div className="edu-content">
                <h3 className="edu-degree">{edu.degree}</h3>
                <h4 className="edu-school">{edu.school}</h4>

                <div className="edu-meta mono">
                    <span>
                        <FiMapPin /> {edu.location}
                    </span>
                    <span className="edu-status-tag">{edu.note}</span>
                </div>

                <div className="edu-highlights">
                    <span className="highlights-title mono">
                        <FiAward /> Key Highlights
                    </span>
                    <ul>
                        {edu.highlights.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="edu-card-glow" />
        </motion.div>
    );
}

export default function Education() {
    return (
        <section id="education" className="section education">
            <div className="container">
                <SectionHead
                    eyebrow="05 — Qualifications"
                    title="Academic"
                    accent="foundations."
                    sub="Computer Science and Computer Studies background blending theoretical algorithmic rigor with real-world software architecture."
                />

                <div className="education-grid">
                    {EDUCATION.map((edu, index) => (
                        <EducationCard key={edu.id} edu={edu} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
