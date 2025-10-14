import React from "react";
import "./Education.css";
import YU from "../assets/YU.png"
import UoPeople from "../assets/UoPeople.jpg"
import { LuGraduationCap } from "react-icons/lu";
import { VscLocation } from "react-icons/vsc";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";


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
        achievements:
            [
                "Dean's List - Fall 2023",
                "GPA: 3.85/4.0",
                "Scholarship Recipient",
            ],
    }
]
export default function Education() {
    return (
        <div className="education-container">
            <div className="education-header">
                <h1>Education</h1>
                <p>My academic background and qualifications</p>
            </div>
            <div className="education-timeline-container">
                {EDUCATION.map((edu) => (


                    <div className="education-timeline">

                        <div className="education-timeline-header">
                            <div className="header-icon">
                                <img src={edu.logo} alt="university of yangon logo" />
                            </div>
                            <div className="header-text">
                                <span>{edu.degree}</span>
                                <span>{edu.field}</span>
                            </div>
                        </div>
                        <div className="education-timeline-items">
                            <span><FaUniversity className="education-timeline-icon" />{edu.university}</span>
                            <span><VscLocation className="education-timeline-icon" />{edu.location}</span>
                            <span><MdOutlineCalendarToday className="education-timeline-icon" />{edu.duration}</span>
                        </div>
                        <div className="timeline-chips">
                        {edu.achievements.map((item, index) => (

                                <span className="timeline-chip">{item}</span>
                            ))}
                            </div>
                    </div>
                ))}
            </div>
        </div>

    )
}