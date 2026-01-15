import React, { useRef, useEffect } from "react";
import "./Experience.css";
import { FaRegBuilding } from "react-icons/fa";
import { TfiLocationPin } from "react-icons/tfi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FiBriefcase } from "react-icons/fi";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
    {
        id: 1,
        jobTitle: "Junior Full-Stack Web Developer",
        current: false,
        company: "Compass Global",
        location: "Yangon",
        duration: "Sep-2022 - Jan-2023",
        color: "#00f5ff",
        responsibilities: [
            "Developed and optimized production-ready web applications using React, Next.js, and TypeScript, ensuring robust code quality and minimizing runtime errors through strict type-checking and custom interfaces.",
            "Engineered responsive, mobile-first interfaces using Tailwind CSS, maintaining high-fidelity layouts and consistent branding across complex marketing landing pages and internal admin dashboards.",
            "Built and documented RESTful APIs using Express.js to facilitate real-time communication between internal data services and external third-party integrations.",
            "Participated in the full Software Development Life Cycle (SDLC) within an Agile environment, utilizing Git for version control and Postman for rigorous API testing and documentation.",
        ],
    },
    {
        id: 2,
        jobTitle: "Quality Assurance Analyst",
        current: false,
        company: "ShopDoora",
        location: "Yangon",
        duration: "Sep 2023 - Oct 2023",
        color: "#bf00ff",
        responsibilities: [
            "Developed and executed test plans and test cases to ensure quality and accuracy.",
            "Identified, documented, and tracked defects, working with teams to resolve issues",
            "Analyzed data to identify inconsistencies and anomalies, ensuring data integrity",
            "Contributed to process improvements to enhance data collection and QA procedures",
        ],
    },
    {
        id: 3,
        jobTitle: "Mid-level Data Collector",
        current: false,
        company: "Double-Wave/HOME",
        location: "Yangon",
        duration: "Nov-2023 - August 2025",
        color: "#ff00aa",
        responsibilities: [
            "Collected and validated data from various sources, ensuring accuracy and completeness.",
            "Organized and maintained data in databases and spreadsheets",
            "Performed data validation and cleaning to ensure data quality",
            "Collaborated with team members to gather requirements and deliver data-driven insights.",
        ],
    },
    {
        id: 4,
        jobTitle: "Freelance Wordpress Developer",
        current: false,
        company: "M.Wolf Marketing Agency",
        location: "Arizona, USA (Remote)",
        duration: "Sep 2025 - Present",
        color: "#00ff88",
        responsibilities: [
            "Built and customized WordPress sites using Elementor, including custom templates, global widgets, and theme builder integrations.",
            "Integrated and configured essential plugins (SEO, caching, contact forms, analytics and security) and performed compatibility checks.",
            "Optimized site performance through image compression, lazy loading, caching strategies and CSS/JS minimization.",
            "Troubleshot theme and plugin conflicts, implemented accessibility improvements, and applied security hardening best practices.",
        ],
    },
];

const ExperienceCard = ({ exp, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: false, margin: "-50px" });

    return (
        <motion.div
            ref={cardRef}
            className={`experience-card ${exp.current ? 'current' : ''}`}
            style={{ '--accent': exp.color }}
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
        >
            {/* Timeline dot */}
            <div className="timeline-dot" style={{ background: exp.color, boxShadow: `0 0 15px ${exp.color}` }}>
                <span className="dot-ring" style={{ borderColor: exp.color }} />
            </div>

            {/* Card content */}
            <div className="card-content">
                {/* Header */}
                <div className="card-header">
                    <div className="header-left">
                        <h3 className="job-title" style={{ color: exp.color }}>{exp.jobTitle}</h3>
                        {exp.current && (
                            <motion.span
                                className="current-badge"
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <span className="pulse-dot" />
                                Current
                            </motion.span>
                        )}
                    </div>
                </div>

                {/* Meta info */}
                <div className="card-meta">
                    <span className="meta-item">
                        <FaRegBuilding className="meta-icon" style={{ color: exp.color }} />
                        {exp.company}
                    </span>
                    <span className="meta-item">
                        <TfiLocationPin className="meta-icon" style={{ color: exp.color }} />
                        {exp.location}
                    </span>
                    <span className="meta-item">
                        <MdOutlineCalendarMonth className="meta-icon" style={{ color: exp.color }} />
                        {exp.duration}
                    </span>
                </div>

                {/* Responsibilities */}
                <ul className="responsibilities">
                    {exp.responsibilities.map((item, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                            transition={{ delay: i * 0.1 + 0.3 }}
                        >
                            <span className="bullet" style={{ background: exp.color }} />
                            {item}
                        </motion.li>
                    ))}
                </ul>

                {/* Tech pattern decoration */}
                <div className="card-pattern" />
            </div>

            {/* Glow effect */}
            <div className="card-glow" style={{ background: `radial-gradient(ellipse at top left, ${exp.color}15, transparent 60%)` }} />
        </motion.div>
    );
};

export default function Experience() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate timeline line
            gsap.fromTo('.timeline-line',
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.experience-timeline',
                        start: 'top 80%',
                        end: 'bottom 20%',
                        scrub: 1
                    }
                }
            );
            gsap.fromTo('.experience-title span',
                { x: 60, opacity: 0, rotateY: -20 },
                {
                    x: 0,
                    opacity: 1,
                    rotateY: 0,
                    duration: 1,
                    stagger: 0.04,
                    ease: 'power3.out(2)',
                    scrollTrigger: {
                        trigger: '.experience-header',
                        start: 'top 65%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
            gsap.fromTo('.experience-subtitle',
                { y: 60, opacity: 0, rotateX: -90 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 0.6,
                    stagger: 0.04,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.experience-header',
                        start: 'top 65%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="experience-section" ref={sectionRef}>
            {/* Background */}
            <div className="experience-bg">
                <div className="grid-pattern" />
            </div>

            <div className="experience-container">
                {/* Header */}
                <motion.div
                    className="experience-header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="header-icon">
                        <FiBriefcase />
                    </div>
                    <h1 className="experience-title">{'PROFESSIONAL EXPERIENCE'.split('').map((char, i) => (
                        <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
                    ))}</h1>
                    <p className="experience-subtitle">My journey in data collection, quality assurance, and software development</p>
                    <div className="header-line">
                        <span className="line" />
                        <span className="diamond" />
                        <span className="line" />
                    </div>
                </motion.div>

                {/* Timeline */}
                <div className="experience-timeline">
                    {/* Central timeline line */}
                    <div className="timeline-line" />

                    {/* Experience cards */}
                    {EXPERIENCE.map((exp, index) => (
                        <ExperienceCard key={exp.id} exp={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}