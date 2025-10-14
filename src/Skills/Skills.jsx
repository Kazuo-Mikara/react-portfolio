import React from "react";
import "./Skills.css";
import { FiCode, FiBarChart2, FiCheckSquare, FiTool } from 'react-icons/fi'

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
    return (
        <section className="skills-container" id="skills" aria-labelledby="skills-heading">
            <div className="skills-header">
                <h1 id="skills-heading">Technical Skills</h1>
                <p className="skills-sub">A comprehensive overview of my technical expertise and proficiency levels</p>
            </div>

            <div className="skills-grid">
                {CATEGORIES.map((cat) => (
                    <article key={cat.id} className="skill-card">
                        <header className="card-header">
                            <div className="card-icon">{cat.icon}</div>
                            <h3 className="card-title">{cat.title}</h3>
                        </header>

                        <div className="card-body">
                            {cat.skills.map(([name, level]) => (
                                <div className="skill-row" key={name}>
                                    <div className="skill-container">
                                        <span className="skill-name">{name}</span>
                                        <span className="percent-badge">{level}%</span>
                                    </div>
                            
                                    <div className="progress-track" aria-hidden>
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${level}%` }}
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
    )
}
