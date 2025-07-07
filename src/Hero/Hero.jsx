import React from 'react'
import "./Hero.css"
import Typewriter from 'typewriter-effect'
import Resume from "../assets//Htoo_MyatKyaw_Resumee.pdf";
import { FiFileText,FiFolder } from "react-icons/fi";
export const Hero = () => {
    return (
        <div className='hero-main' >
            <div className='hero-body'>
                <div className='heading'>
                    <h1>HTOO MYAT KYAW </h1>
                    <h2>Data Analyst  based in Myanmar </h2>

                </div>

                <div className="description">

                    <p>
                        Data Analyst with 1 year of experience in transforming raw data into actionable insights.</p>
                       <p> Proven ability in &nbsp; 
                        <span><Typewriter className="typewriter"
                            options={{
                                strings: ["SQL, Python, R and excel ,tablaeu ,Power BI "],
                                autoStart: true,
                                delay:75,
                                loop: true,
                            }}
                            />

                        </span>
                       &nbsp; to analyze trends.
                  </p>
                  
                            <p>Identify patterns, and support data-driven decision making.</p>
                     <p>   Passionate about using data to solve complex business problems</p>
                    <div className="button-group">
                        <button className="button-56" role="button">
                            <a href={Resume}>Download Resume </a>
                            <i> <FiFileText /> </i>
                        </button>
                        <button className="button-56" role="button">
                            <a href="#">View More Projects </a>
                            <i><FiFolder /></i>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}
