import React, { useRef } from "react";
import "./Education.css";
import YU from "../../assets/YU.png"
import UoPeople from "../../assets/UoPeople.jpg"
import { LuGraduationCap } from "react-icons/lu";
import { VscLocation } from "react-icons/vsc";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const EDUCATION = [
    {
        id: 1,
        degree: "Bachelor of Science",
        field: "Computer Studies",
        university: "University of Yangon",
        location: "Yangon, Myanmar",
        duration: "Third Year (2019 - Will be Graduated in 2026)",
        logo: YU,
        status: "In Progress",
        color: "#00f5ff",
        achievements: ['COE Student'],
    },
    {
        id: 2,
        degree: "Bachelor of Science",
        field: "Computer Science",
        university: "University of the People",
        location: "Pasadena, California, USA (Online)",
        duration: "First Year (2023 - Will be Graduated in 2027)",
        logo: UoPeople,
        status: "In Progress",
        color: "#bf00ff",
        achievements: [
            "Dean's List - Fall 2023",
            "GPA: 3.85/4.0",
            "Scholarship Recipient",
        ],
    }
];

const EducationCard = ({ edu, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: false, margin: "-50px" });

    return (
        <motion.div
            ref={cardRef}
            className="education-card"
            style={{ '--accent': edu.color }}
            initial={{ opacity: 0, y: 80, rotateX: -15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 80, rotateX: -15 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            whileHover={{
                y: -10,
                boxShadow: `0 25px 50px rgba(0, 0, 0, 0.4), 0 0 40px ${edu.color}25`
            }}
        >
            {/* Top gradient border */}
            <div className="card-top-border" style={{ background: `linear-gradient(90deg, ${edu.color}, transparent)` }} />

            {/* Glow effect */}
            <div className="card-glow" style={{ background: `radial-gradient(ellipse at top, ${edu.color}20, transparent 60%)` }} />

            {/* Header with logo */}
            <div className="card-header">
                <motion.div
                    className="logo-container"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <img src={edu.logo} alt={`${edu.university} logo`} />
                    <div className="logo-ring" style={{ borderColor: edu.color }} />
                </motion.div>
                <div className="degree-info">
                    <h3 className="degree" style={{ color: edu.color }}>{edu.degree}</h3>
                    <span className="field">{edu.field}</span>
                    <span
                        className="status-badge"
                        style={{
                            color: edu.color,
                            borderColor: `${edu.color}60`,
                            background: `${edu.color}15`
                        }}
                    >
                        {edu.status}
                    </span>
                </div>
            </div>

            {/* Details */}
            <div className="card-details">
                <div className="detail-item">
                    <FaUniversity className="detail-icon" style={{ color: edu.color }} />
                    <span>{edu.university}</span>
                </div>
                <div className="detail-item">
                    <VscLocation className="detail-icon" style={{ color: edu.color }} />
                    <span>{edu.location}</span>
                </div>
                <div className="detail-item">
                    <MdOutlineCalendarToday className="detail-icon" style={{ color: edu.color }} />
                    <span>{edu.duration}</span>
                </div>
            </div>

            {/* Achievements */}
            <div className="achievements">
                <span className="achievements-label">Achievements</span>
                <div className="achievement-chips">
                    {edu.achievements.map((achievement, i) => (
                        <motion.span
                            key={i}
                            className="achievement-chip"
                            style={{
                                borderColor: `${edu.color}50`,
                                background: `${edu.color}10`
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ delay: i * 0.1 + 0.5 }}
                            whileHover={{
                                scale: 1.05,
                                background: `${edu.color}25`,
                                boxShadow: `0 0 15px ${edu.color}30`
                            }}
                        >
                            {achievement}
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* Corner decorations */}
            <div className="corner tl" style={{ borderColor: edu.color }} />
            <div className="corner tr" style={{ borderColor: edu.color }} />
            <div className="corner bl" style={{ borderColor: edu.color }} />
            <div className="corner br" style={{ borderColor: edu.color }} />

            {/* Scanline effect */}
            <div className="scanline-overlay" />
        </motion.div>
    );
};

export default function Education() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

    return (
        <section className="education-section" ref={sectionRef}>
            {/* Background */}
            <div className="education-bg">
                <div className="hex-pattern" />
            </div>

            <div className="education-container">
                {/* Header */}
                <motion.div
                    className="education-header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="header-icon">
                        <LuGraduationCap />
                    </div>
                    <h1>Education</h1>
                    <p>My academic background and qualifications</p>
                    <div className="header-decoration">
                        <span className="line" />
                        <span className="diamond" />
                        <span className="line" />
                    </div>
                </motion.div>

                {/* Education Cards */}
                <div className="education-grid">
                    {EDUCATION.map((edu, index) => (
                        <EducationCard key={edu.id} edu={edu} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}