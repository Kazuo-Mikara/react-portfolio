import React from 'react'
import "./Hero.css"
import Typewriter from 'typewriter-effect'
import Resume from "../assets//Htoo_Myat_Kyaw.pdf";
import image from "../assets/hmk.jpg"
import { FiGithub, FiLinkedin, FiFacebook, FiInstagram, FiHome, FiFolder, FiBriefcase, FiMail } from "react-icons/fi";
export default function Hero() {
    const handleDownload = (e) => {
        // programmatically create an anchor to trigger the download without an <a> tag in the JSX
        e.preventDefault();
        try {
            const link = document.createElement('a');
            link.href = Resume;
            // set a sensible filename for the downloaded file
            link.download = 'Htoo_Myat_Kyaw_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            // fallback: open in new tab
            window.open(Resume, '_blank', 'noopener');
        }
    }
    return (
        <div className='hero-main' id="home" >
            <div className='hero-body'>

                <div className='hero-image'>
                    <img src={image} alt='profile-pic' />
                </div>

                <div className='heading'>
                    <span >HTOO MYAT KYAW </span>
                    <span >Mid-level Data Collector & Developer</span>
                    <span >Quality Assurance | Frontend Development | Data Analysis</span>

                </div>

                <div className="description">
                    {/* 
                    <span><Typewriter className="typewriter"
                            options={{
                                strings: ["SQL, Python, R and excel ,tablaeu ,Power BI,React, HTML5, CSS3, JavaScript, Git, GitHub, Figma,WordPress,Elementor"],
                                autoStart: true,
                                delay:75,
                                loop: true,
                            }}
                            />

                        </span> */}
                    <div className='description-text'>
                        <p>Results-driven professional with experience in data collection, quality assurance, and frontend development. Proficient in HTML5, React, and modern web technologies.</p>
                        {/* <p>Download my resume<a href={Resume} className='resume_link'>&nbsp; here</a>.</p> */}
                    </div>
                    <div className='button-group'>
                        <button type="button" onClick={handleDownload} className="description-button ">
                            <span className='btn2'>Download Resume</span>
                        </button>
                        <p>View <a href="#" id="style-2" className='description-link' data-replace="My Work"><span>My Work</span></a></p>
                    </div>

                    <div className='nav-icons'>
                        <a href='https://github.com/Kazuo-Mikara' target='_blank'><FiGithub /> </a>
                        <a href='www.linkedin.com/in/kazuooh/' target='_blank'><FiLinkedin /> </a>
                        <a href='https://www.instagram.com/k_4_kazuo/?hl=en' target='_parent'><FiInstagram /> </a>
                        <a href='https://www.facebook.com/hizuo976' target='_blank'><FiFacebook /> </a>
                    </div>


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