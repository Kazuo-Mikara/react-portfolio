import React from 'react'
import "./Hero.css"
import Typewriter from 'typewriter-effect'
import Resume from "../assets//Htoo_MyatKyaw_Resumee.pdf";
import { FiFileText, FiFolder } from "react-icons/fi";
export default function Hero() {
    return (
        <div className='hero-main' >
            <div className='hero-body'>
                <div className='heading'>
                    <h1 style={{ textTransform: "lowercase" }}>HTOO MYAT KYAW </h1>
                    <h2>data analyst  and web developer based in myanmar </h2>

                </div>

                <div className="description">

                    <p>
                        data analyst with 3 years of experience in transforming raw data into actionable insights.</p>
                    <p> proven ability in <span>&nbsp;sql, python, R and excel ,tablaeu ,power bi to analyze trends. </span></p>
                    {/* <span><Typewriter className="typewriter"
                            options={{
                                strings: ["SQL, Python, R and excel ,tablaeu ,Power BI "],
                                autoStart: true,
                                delay:75,
                                loop: true,
                            }}
                            />

                        </span> */}
                    <p>
                        proficient in web development using <span>&nbsp;html5, css, javascript, tailwind css, bootstrap, react and node.js.</span>
                    </p>

                    <p>identify patterns, and support data-driven decision making.</p>
                    <p>   passionate about using data to solve complex business problems</p>
                    <p>download my resume<a href='#' className='resume_link'>&nbsp; here</a>.</p>

                    {/* <div className="button-group">
                    
                        <button>
                            <div className="svg-wrapper-1">
                                <div className="svg-wrapper">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path
                                            fill="currentColor"
                                            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                        ></path>
                                         
                                    </svg> 
                                     <i> <FiFileText /> </i>
                                </div>
                            </div>
                             <a href={Resume} download>resume</a>
                        </button>

                    </div> */}
                </div>
            </div>
        </div>
    )

}