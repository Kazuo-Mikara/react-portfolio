import React from 'react'
import { FiGithub, FiLinkedin, FiFacebook, FiInstagram } from "react-icons/fi";
import './Nav.css'
const Nav = () => {
  return (
    <div className='nav-container'>
      
      <div className='nav-text'>
        Love the life you live <br />
        Live the life you love
      </div>
      <div className='nav-links'>
        <ul>

          <li><a href='#' className='active'>about</a></li>
          <li><a href='#'>blog</a></li>
          <li><a href='#'>work</a></li>
          <li><a href='#'>contact</a></li>

        </ul>
      </div>
      <div className='nav-icons'>
        <ul>
          <li><a href='https://github.com/Kazuo-Mikara'><FiGithub /> </a></li>
          <li><a href='www.linkedin.com/in/kazuooh/'><FiLinkedin /> </a></li>
          <li><a href='#'><FiInstagram /> </a></li>
          <li><a href='https://www.facebook.com/hizuo976'><FiFacebook /> </a></li>


        </ul>
      </div>
    </div>
  )
}

export default Nav
