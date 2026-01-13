import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Resume from "../../assets/Htoo_Myat_Kyaw.pdf";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const heroRef = useRef(null);
    const videoRef = useRef(null);

    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 400], [1, 1.15]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Left side text animation
            tl.fromTo('.hero-left .line-1',
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.3 }
            )
                .fromTo('.hero-left .line-2',
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    "-=0.7"
                )
                .fromTo('.hero-description',
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    "-=0.5"
                )
                // Right side text animation
                .fromTo('.hero-right .line-1',
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    "-=1"
                )
                .fromTo('.hero-right .line-2',
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    "-=0.7"
                )
                // Bottom bar animation
                .fromTo('.hero-bottom',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6 },
                    "-=0.3"
                );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero-section" id="about" ref={heroRef}>
            {/* Video Background */}
            <motion.div
                className="video-background"
                style={{ scale }}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hero-video"
                >
                    <source src="/assets/upscaled-video1.mp4" type="video/mp4" />
                </video>

                {/* Subtle overlay for text readability */}
                <div className="video-overlay" />
                <div className="video-gradient-left" />
                <div className="video-gradient-right" />
                <div className="video-gradient-bottom" />
            </motion.div>

            {/* Main Content */}
            <motion.div
                className="hero-content"
                style={{ opacity }}
            >
                {/* Left Side Text */}
                <div className="hero-left">
                    <div className="text-block">
                        <h1 className="hero-title">
                            <span className="line-1">Hello,</span>
                            <span className="line-2 italic">I'm Htoo</span>
                        </h1>
                    </div>
                    <p className="hero-description">
                        I specialize in transforming raw data into
                        actionable insights and building modern web
                        experiences. Available for opportunities.
                    </p>
                </div>
                <motion.div>
                    <span className="hero-availability">For opportunities and challenges. </span>
                    <div className="hero-availability-dot"></div>
                    <span className="hero-availability-text">Available</span>
                </motion.div>
                {/* Right Side Text */}
                <div className="hero-right">
                    <div className="text-block">
                        <span className="line-1">Developer</span>
                        <span className="line-2 italic">&amp; Data Collector</span>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="hero-bottom">
                    {/* Left - Branding */}
                    <div className="bottom-left">
                        <span className="brand-name">Htoo Myat Kyaw</span>
                        <span className="brand-role">DEVELOPER</span>
                    </div>

                    {/* Center - Social Links */}
                    <div className="bottom-center">
                        <motion.a
                            href="https://github.com/Kazuo-Mikara"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -3 }}
                        >
                            <FaGithub />
                        </motion.a>
                        <motion.a
                            href="https://www.linkedin.com/in/htoo-myat-kyaw-47316828a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -3 }}
                        >
                            <FaLinkedin />
                        </motion.a>
                        <motion.a
                            href="https://www.facebook.com/profile.php?id=100077291498498"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -3 }}
                        >
                            <FaFacebook />
                        </motion.a>
                    </div>

                    {/* Right - CTA Button */}
                    <div className="bottom-right">
                        <motion.button
                            className="cta-button"
                            onClick={scrollToProjects}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            View Work
                            <FiArrowRight className="arrow" />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}