import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight, FiCode, FiLayers } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_DATA = [
    {
        id: 1,
        title: "Phamarcy E-commerce",
        techstack: ["PHP", "MySQL", "Bootstrap", "TailwindCSS"],
        About:
            "A dynamic e-commerce platform that allows users to browse and purchase products. It features a user-friendly interface, secure payment processing, and a robust backend architecture for a seamless shopping experience.",
        Link: "https://github.com/Kazuo-Mikara/phamarcy_Ecommerce",
        github: "https://github.com/Kazuo-Mikara/phamarcy_Ecommerce",
        color: "#00f5ff",
        images: [
            "/assets/Pharmacy/Pharmacy1.png",
            "/assets/Pharmacy/Pharmacy2.png",
            "/assets/Pharmacy/Pharmacy3.png",
            "/assets/Pharmacy/Pharmacy4.png",
            "/assets/Pharmacy/Pharmacy5.png",
            "/assets/Pharmacy/Pharmacy6.png",
            "/assets/Pharmacy/Pharmacy7.png",
            "/assets/Pharmacy/Pharmacy8.png",
            "/assets/Pharmacy/Pharmacy9.png",
        ],
    },
    {
        id: 2,
        title: "Kazuo Travels",
        techstack: ["React", "OpenStreet API", "Leaflet.js", "TailwindCSS"],
        About:
            "A dynamic travel exploration platform that integrates interactive mapping. It allows users to discover hidden gems and plan journeys with real-time geographic data visualization using Leaflet and OpenStreetMap.",
        Link: "https://kazuo-travels.vercel.app/",
        github: "https://github.com/Kazuo-Mikara/kazuo-travels",
        color: "#bf00ff",
        images: [
            "/assets/Kazuo_Travels/Kazuo_Travels1.png",
            "/assets/Kazuo_Travels/Kazuo_Travels2.png",
            "/assets/Kazuo_Travels/Kazuo_Travels3.png",
            "/assets/Kazuo_Travels/Kazuo_Travels4.png",
            "/assets/Kazuo_Travels/Kazuo_Travels5.png",

        ],
    },
    {
        id: 3,
        title: "Zenix",
        techstack: ["Next.js", "MongoDB", "TailwindCSS", "Auth.js"],
        About:
            "A comprehensive Learning Management System (LMS) designed to bridge the gap between instructors and students. Features secure authentication, course progress tracking, and a robust backend architecture for a seamless educational experience.",
        Link: "https://zenix-edu.netlify.app/home",
        github: "https://github.com/Kazuo-Mikara/zenix",
        color: "#ff00aa",
        images: [
            "/assets/Zenix/Zenix1.png",
            "/assets/Zenix/Zenix2.png",
            "/assets/Zenix/Zenix3.png",
            "/assets/Zenix/Zenix4.png",
            "/assets/Zenix/Zenix5.png",
            "/assets/Zenix/Zenix6.png",
            "/assets/Zenix/Zenix7.png",
            "/assets/Zenix/Zenix8.png",
        ],
    },
    {
        id: 4,
        title: "Crestview Pro",
        techstack: ["Next.js", "MongoDB", "TailwindCSS", "Auth.js", "Leaflet.js"],
        About:
            "A high-performance real estate or location-based management tool. It combines secure data handling with geospatial visualization, allowing users to manage properties and view data points accurately on a custom-styled map interface.",
        Link: "#",
        github: "#",
        color: "#0080ff",
        images: [
            "/assets/Crestview/Crestview1.png",
            "/assets/Crestview/Crestview2.png",
            "/assets/Crestview/Crestview3.png",
            "/assets/Crestview/Crestview4.png",
            "/assets/Crestview/Crestview5.png",
            "/assets/Crestview/Crestview6.png",
            "/assets/Crestview/Crestview7.png",
        ],
    },
    {
        id: 5,
        title: "Mya Khwar Nyo",
        techstack: ["React Native", "NativeWind", "Appwrite", "YOLO V8", "Pytorch"],
        About:
            "Mya Khwar Nyo is an AI-assisted plant identification app that allows users to identify plants by taking photos of them. The app uses YOLO V8 and Pytorch for object detection and plant identification, and Cloudinary for image storage.",
        Link: "#",
        github: "#",
        color: "#00ff88",
        images: [
            "/assets/MyaKhwarNyo/UnderConstruction.png",
        ],
    },
];

// Custom Image Slideshow Component
const ImageSlideshow = ({ images, color, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const intervalRef = useRef(null);

    // Auto-play functionality
    useEffect(() => {
        if (isAutoPlaying && images.length > 1) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % images.length);
            }, 4000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isAutoPlaying, images.length]);

    const goToNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex(prev => (prev + 1) % images.length);
    };

    const goToPrev = () => {
        setIsAutoPlaying(false);
        setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    };

    const goToSlide = (index) => {
        setIsAutoPlaying(false);
        setCurrentIndex(index);
    };

    return (
        <div
            className="slideshow-container"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <div className="slideshow-viewport">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        className="slide"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "slingshot" }}
                    >
                        <img
                            src={images[currentIndex]}
                            alt={`${title} screenshot ${currentIndex + 1}`}
                            loading="lazy"
                        />
                        <div
                            className="slide-overlay"
                            style={{ background: `linear-gradient(to top, ${color}20 0%, transparent 50%)` }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Progress bar */}
                {images.length > 1 && (
                    <div className="slideshow-progress">
                        <motion.div
                            className="progress-bar"
                            style={{ background: color }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: isAutoPlaying ? 1 : 0 }}
                            transition={{ duration: 4, ease: "linear" }}
                            key={`${currentIndex}-${isAutoPlaying}`}
                        />
                    </div>
                )}
            </div>

            {/* Navigation arrows */}
            {images.length > 1 && (
                <>
                    <button
                        className="slide-nav prev"
                        onClick={goToPrev}
                        aria-label="Previous image"
                        style={{ '--btn-color': color }}
                    >
                        <FiChevronLeft />
                    </button>
                    <button
                        className="slide-nav next"
                        onClick={goToNext}
                        aria-label="Next image"
                        style={{ '--btn-color': color }}
                    >
                        <FiChevronRight />
                    </button>
                </>
            )}

            {/* Dots indicator */}
            {images.length > 1 && (
                <div className="slide-dots">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            style={{
                                '--dot-color': color,
                                '--dot-glow': `0 0 10px ${color}`
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: false, margin: "-80px" });
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.article
            ref={cardRef}
            className="project-card"
            style={{ '--accent-color': project.color }}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Project number */}
            <div className="project-number" style={{ color: project.color }}>
                0{index + 1}
            </div>

            {/* Image Slideshow */}
            <div className="project-media">
                <ImageSlideshow
                    images={project.images}
                    color={project.color}
                    title={project.title}
                />
            </div>

            {/* Content Section */}
            <div className="project-content">
                <div className="content-header">
                    <motion.h3
                        className="project-title"
                        animate={{ color: isHovered ? project.color : '#ffffff' }}
                        transition={{ duration: 0.3 }}
                    >
                        {project.title}
                    </motion.h3>
                    <div
                        className="title-underline"
                        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                    />
                </div>

                {/* Tech Stack */}
                <div className="tech-stack">
                    <FiCode className="tech-icon" style={{ color: project.color }} />
                    <div className="tech-tags">
                        {project.techstack.map((tech, i) => (
                            <motion.span
                                key={i}
                                className="tech-tag"
                                style={{
                                    borderColor: `${project.color}50`,
                                    color: project.color
                                }}
                                whileHover={{
                                    background: `${project.color}20`,
                                    scale: 1.05
                                }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <p className="project-description">{project.About}</p>

                {/* Action Buttons */}
                <div className="project-actions">
                    <motion.a
                        href={project.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn primary"
                        style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}aa)` }}
                        whileHover={{ scale: 1.03, boxShadow: `0 5px 25px ${project.color}40` }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <FiExternalLink />
                        <span>Live Demo</span>
                    </motion.a>
                    <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn secondary"
                        style={{ borderColor: project.color, color: project.color }}
                        whileHover={{ background: `${project.color}15`, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <FiGithub />
                        <span>Source</span>
                    </motion.a>
                </div>
            </div>

            {/* Hover glow effect */}
            <motion.div
                className="card-glow"
                style={{ background: `radial-gradient(ellipse at center, ${project.color}12, transparent 70%)` }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Corner decorations */}
            <div className="corner-dec tl" style={{ borderColor: project.color }} />
            <div className="corner-dec br" style={{ borderColor: project.color }} />
        </motion.article>
    );
};

export default function ProjectShowcase() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.projects-title span',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.02,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.projects-header',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="projects-section" ref={sectionRef}>
            {/* Background effects */}
            <div className="projects-bg">
                <div className="grid-overlay" />
                <div className="glow-orb orb-1" />
                <div className="glow-orb orb-2" />
            </div>

            <div className="projects-container">
                {/* Section Header */}
                <header className="projects-header">
                    <motion.div
                        className="header-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="header-icon">
                            <FiLayers />
                        </div>
                        <h2 className="projects-title">
                            {'FEATURED PROJECTS'.split('').map((char, i) => (
                                <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
                            ))}
                        </h2>
                        <p className="projects-subtitle">
                            A showcase of my latest work and creative endeavors in web development
                        </p>
                        <div className="header-decoration">
                            <span className="line" />
                            <span className="diamond" />
                            <span className="line" />
                        </div>
                    </motion.div>
                </header>

                {/* Project Cards */}
                <div className="projects-grid">
                    {PROJECTS_DATA.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>

                {/* View More Button */}
                <motion.div
                    className="view-more-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.a
                        href="https://github.com/Kazuo-Mikara"
                        target="_blank"
                        className="view-more-btn"
                        whileHover={{ scale: 1.03, boxShadow: '0 0 35px rgba(0, 245, 255, 0.4)' }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span>View All Projects</span>
                        <FiExternalLink />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
