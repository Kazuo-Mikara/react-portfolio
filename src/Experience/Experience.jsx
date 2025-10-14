import React from "react";
import "./Experience.css";
import { FaRegBuilding } from "react-icons/fa";
import { TfiLocationPin } from "react-icons/tfi";
import { MdOutlineCalendarMonth } from "react-icons/md";
const EXPERIENCE = [
    {
        id: 1,
        jobTitle: "Mid-level Data Collector",
        current:false,
        company: "Double-Wave/HOME",
        location: "Yangon",
        duration: "Nov-2023 - August 2025",
        responsibilities: [
            "Collected and validated data from various sources, ensuring accuracy and completeness.",   
            " Organized and maintained data in databases and spreadsheets",
            "Performed data validation and cleaning to ensure data quality",
            "Collaborated with team members to gather requirements and deliver data-driven insights.",
        ],
    },
{
        id: 2,
        jobTitle: "Quality Assurance Ananlyst",
        current:false,
        company: "ShopDoora",
        location: "Yangon",
        duration: "Sep 2022 - Oct 2022",
        responsibilities: [
            "Developed and executed test plans and test cases to ensure quality and accuracy.",   
            "Identified, documented, and tracked defects, working with teams to resolve issues",
            "Analyzed data to identify inconsistencies and anomalies, ensuring data integrity",
            "Contributed to process improvements to enhance data collection and QA procedures",
        ],
    },
    {
        id: 2,
        jobTitle: "Freelance Wordpress Developer",
        current:true,
        company: "M.Wolf Marketing Agency",
        location: "Arizona, USA (Remote)",
        duration: "Sep 2025 - Present",
        responsibilities: [
            "Built and customized WordPress sites using Elementor, including custom templates, global widgets, and theme builder integrations.",
            "Integrated and configured essential plugins (SEO, caching, contact forms, analytics and security) and performed compatibility checks.",
            "Optimized site performance through image compression, lazy loading, caching strategies and CSS/JS minimization.",          
            "Troubleshot theme and plugin conflicts, implemented accessibility improvements, and applied security hardening best practices.",
        ],
    },

];
export default function Experience() {

    return (
        <>
            <div className="experience-container">
                <div className="experience-header">
                    <h1>Professional Experience</h1>
                    <p>My journey in data collection, quality assurance, and software development</p>
                </div>

                    {EXPERIENCE.map((exp) => (
                <div className={exp.current ? `experience-timeline current-working` : `experience-timeline`} key={exp.id}>
                        
                    <div className="timeline-header">
                        <span>{exp.jobTitle}</span>
                        {exp.current ? <span className="current-occupation">Current</span> : ''}
                    </div>
                    <div className="timeline-items">
                        <span className="timeline-item"><FaRegBuilding className="timeline-icon"/>{exp.company}</span>
                        <span className="timeline-item"><TfiLocationPin className="timeline-icon"/>{exp.location}</span>
                        <span className="timeline-item"><MdOutlineCalendarMonth className="timeline-icon"/>{exp.duration}</span>
                    </div>

                    <div className="timeline-content">
                        {exp.responsibilities.map((item, index) => (
                            
                        <ul>
                            <li>{item}</li>
                            
                        </ul>
                        ))}
                    </div>
                </div>
                     ))} 
            </div>
        </>
    )
}