import React, { useEffect, useRef } from "react";
import "./Skills.css";
import { FiCode, FiBarChart2, FiCheckSquare, FiTool } from 'react-icons/fi';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedCounter from "./AnimatedCounter";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CATEGORIES = [
    {
        id: 'frontend',
        title: 'Frontend Development',
        icon: <FiCode size={20} />,
        skills: [
            ['HTML5', 90],
            ['CSS3', 85],
            ['JavaScript (ES6+)', 88],
            ['React', 82],
            ['Tailwind CSS', 85],
            ['Bootstrap 5', 80],
            ['Wordpress | Elementor', 90],
        ],
    },
    {
        id: 'data',
        title: 'Data & Analysis',
        icon: <FiBarChart2 size={20} />,
        skills: [
            ['Data Analysis', 85],
            ['Data Validation', 88],
            ['Data Cleaning', 80],
            ['Spreadsheets', 85],
        ],
    },
    {
        id: 'qa',
        title: 'Quality Assurance',
        icon: <FiCheckSquare size={20} />,
        skills: [
            ['Testing', 90],
            ['Debugging', 85],
            ['Troubleshooting', 88],
            ['Bug Tracking', 70],
        ],
    },
    {
        id: 'tools',
        title: 'Tools & Other',
        icon: <FiTool size={20} />,
        skills: [
            ['Git', 80],
            ['Figma', 75],
            ['PHP', 70],
            ['English', 70],
        ],
    },
]
export default function Skills() {
    const skillsRef = useRef(null);

    useEffect(() => {
        const progressFills = skillsRef.current.querySelectorAll(".progress-fill");

        // Reset widths to 0 initially for animation
        progressFills.forEach(fill => (fill.style.width = '0%'));
        gsap.to(progressFills, {
            width: (i, target) => target.getAttribute('aria-valuenow') + '%',
            ease: "sine.inOut",
            scrollTrigger: {
                trigger: skillsRef.current,
                start: "top 80%",
                end: "bottom 90%",
                scrub: false,
            },
            stagger: 0.1,

        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);


    return (
        <section
            className="skills-container"
            id="skills"
            aria-labelledby="skills-heading"
            ref={skillsRef}
        >
            <div className="skills-header">
                <h1 id="skills-heading" className="reveal-type">Technical Skills</h1>
                <p className="skills-sub reveal-type">A comprehensive overview of my technical expertise and proficiency levels</p>
            </div>

            <div className="skills-grid ">
                {CATEGORIES.map((cat) => (
                    <article key={cat.id} className="skill-card reveal-type">
                        <header className="card-header">
                            <div className="card-icon">{cat.icon}</div>
                            <h3 className="card-title">{cat.title}</h3>
                        </header>

                        <div className="card-body">
                            {cat.skills.map(([name, level]) => (
                                <div className="skill-row" key={name}>
                                    <div className="skill-container">
                                        <span className="skill-name">{name}</span>
                                        <span className="percent-badge"> {level}</span>
                                    </div>

                                    <div className="progress-track" aria-hidden>
                                        <div
                                            className="progress-fill"
                                            style={{ width: '0%' }}
                                            role="progressbar"
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-valuenow={level}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
