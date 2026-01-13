import React, { useRef, useState, useEffect } from "react";
import "./Skills.css";
import { FiCode, FiBarChart2, FiCheckSquare, FiTool, FiZap } from 'react-icons/fi';
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
    {
        id: 'frontend',
        title: 'Frontend Development',
        icon: FiCode,
        color: '#00f5ff',
        skills: [
            { name: 'HTML5', level: 90 },
            { name: 'CSS3', level: 85 },
            { name: 'JavaScript', level: 88 },
            { name: 'React', level: 82 },
            { name: 'Tailwind', level: 85 },
            { name: 'Bootstrap', level: 80 },
            { name: 'WordPress', level: 90 },
        ],
    },
    {
        id: 'data',
        title: 'Data & Analysis',
        icon: FiBarChart2,
        color: '#bf00ff',
        skills: [
            { name: 'Data Analysis', level: 85 },
            { name: 'Validation', level: 88 },
            { name: 'Cleaning', level: 80 },
            { name: 'Spreadsheets', level: 85 },
        ],
    },
    {
        id: 'qa',
        title: 'Quality Assurance',
        icon: FiCheckSquare,
        color: '#ff00aa',
        skills: [
            { name: 'Testing', level: 90 },
            { name: 'Debugging', level: 85 },
            { name: 'Troubleshoot', level: 88 },
            { name: 'Bug Tracking', level: 70 },
        ],
    },
    {
        id: 'tools',
        title: 'Tools & Other',
        icon: FiTool,
        color: '#00ff88',
        skills: [
            { name: 'Git', level: 80 },
            { name: 'Figma', level: 75 },
            { name: 'PHP', level: 70 },
            { name: 'English', level: 70 },
        ],
    },
];

// Skill Orb Component
const SkillOrb = ({ skill, index, color, isActive }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Calculate size based on skill level
    const size = 60 + (skill.level / 100) * 40;

    return (
        <motion.div
            className="skill-orb"
            style={{
                '--orb-color': color,
                '--orb-size': `${size}px`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isActive ? {
                scale: 1,
                opacity: 1,
            } : { scale: 0, opacity: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                type: "spring",
                stiffness: 200
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.15, zIndex: 10 }}
        >
            <div className="orb-inner">
                <div className="orb-glow" />
                <div className="orb-content">
                    <span className="orb-name">{skill.name}</span>
                    <motion.span
                        className="orb-level"
                        animate={{ opacity: isHovered ? 1 : 0.7 }}
                    >
                        {skill.level}%
                    </motion.span>
                </div>
                <svg className="orb-ring" viewBox="0 0 100 100">
                    <circle
                        className="ring-bg"
                        cx="50"
                        cy="50"
                        r="45"
                    />
                    <motion.circle
                        className="ring-progress"
                        cx="50"
                        cy="50"
                        r="45"
                        style={{ stroke: color }}
                        initial={{ pathLength: 0 }}
                        animate={isActive ? { pathLength: skill.level / 100 } : { pathLength: 0 }}
                        transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                    />
                </svg>
            </div>

            {/* Floating particles around orb */}
            <div className="orb-particles">
                {[...Array(3)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="particle"
                        style={{ '--delay': `${i * 0.5}s` }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.6,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

// Category Tab Component
const CategoryTab = ({ category, isActive, onClick, index }) => {
    const Icon = category.icon;

    return (
        <motion.button
            className={`category-tab ${isActive ? 'active' : ''}`}
            style={{ '--tab-color': category.color }}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="tab-icon">
                <Icon />
            </div>
            <span className="tab-title">{category.title}</span>
            {isActive && (
                <motion.div
                    className="tab-indicator"
                    layoutId="activeTab"
                    style={{ background: category.color }}
                />
            )}
        </motion.button>
    );
};

// Skill Stats Component
const SkillStats = ({ category, isActive }) => {
    const avgLevel = Math.round(
        category.skills.reduce((acc, s) => acc + s.level, 0) / category.skills.length
    );

    return (
        <motion.div
            className="skill-stats"
            initial={{ opacity: 0, x: 20 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
        >
            <div className="stat-item">
                <span className="stat-value" style={{ color: category.color }}>
                    {category.skills.length}
                </span>
                <span className="stat-label">Skills</span>
            </div>
            <div className="stat-divider" style={{ background: category.color }} />
            <div className="stat-item">
                <span className="stat-value" style={{ color: category.color }}>
                    {avgLevel}%
                </span>
                <span className="stat-label">Average</span>
            </div>
            <div className="stat-divider" style={{ background: category.color }} />
            <div className="stat-item">
                <span className="stat-value" style={{ color: category.color }}>
                    {Math.max(...category.skills.map(s => s.level))}%
                </span>
                <span className="stat-label">Top Skill</span>
            </div>
        </motion.div>
    );
};

export default function Skills() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
    const [activeCategory, setActiveCategory] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.skills-title span',
                { y: 60, opacity: 0, rotateX: -90 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 0.6,
                    stagger: 0.04,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: '.skills-header',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const currentCategory = CATEGORIES[activeCategory];

    return (
        <section
            className="skills-section"
            id="skills"
            ref={sectionRef}
        >
            {/* Background elements */}
            <div className="skills-bg">
                <div className="cyber-grid" />
                <div className="constellation-lines" />
            </div>

            <div className="skills-container">
                {/* Header */}
                <motion.div
                    className="skills-header"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                >
                    <div className="header-icon">
                        <FiZap />
                    </div>
                    <h2 className="skills-title">
                        {'TECHNICAL SKILLS'.split('').map((char, i) => (
                            <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
                        ))}
                    </h2>
                    <p className="skills-subtitle">
                        Explore my technical expertise through an interactive skill constellation
                    </p>
                    <div className="header-decoration">
                        <span className="line" />
                        <span className="diamond" />
                        <span className="line" />
                    </div>
                </motion.div>

                {/* Category Tabs */}
                <div className="category-tabs">
                    {CATEGORIES.map((category, index) => (
                        <CategoryTab
                            key={category.id}
                            category={category}
                            isActive={activeCategory === index}
                            onClick={() => setActiveCategory(index)}
                            index={index}
                        />
                    ))}
                </div>

                {/* Skills Display */}
                <div className="skills-display">
                    {/* Central decoration */}
                    <div className="central-core" style={{ '--core-color': currentCategory.color }}>
                        <motion.div
                            className="core-icon"
                            key={activeCategory}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <currentCategory.icon />
                        </motion.div>
                        <div className="core-ring" />
                        <div className="core-ring ring-2" />
                        <div className="core-pulse" />
                    </div>

                    {/* Skill Orbs */}
                    <div className="orbs-container">
                        <AnimatePresence mode="wait">
                            <motion.div
                                className="orbs-grid"
                                key={activeCategory}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {currentCategory.skills.map((skill, index) => (
                                    <SkillOrb
                                        key={skill.name}
                                        skill={skill}
                                        index={index}
                                        color={currentCategory.color}
                                        isActive={isInView}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Stats */}
                    <SkillStats category={currentCategory} isActive={isInView} />
                </div>

                {/* Category description */}
                <motion.div
                    className="category-description"
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div
                        className="description-badge"
                        style={{
                            borderColor: currentCategory.color,
                            color: currentCategory.color
                        }}
                    >
                        Currently viewing: {currentCategory.title}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
