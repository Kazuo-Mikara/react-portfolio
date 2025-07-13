import { React, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiFacebook, FiInstagram, FiHome, FiFolder, FiBriefcase, FiMail } from "react-icons/fi";
import './Nav.css'
export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='nav-container'>
      
      <div className='nav-text'>
        love the life you live <br />
        live the life you love
      </div>
      <div className='menu-button' onClick={toggleMenu}>
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className='nav-links'> 
        <ul>

          <li><NavLink to='/' className={({isActive})=> (isActive ? 'active':'')}>about</NavLink></li>
          <li><NavLink to='/projects' className={({isActive})=> (isActive ? 'active':'')}>projects</NavLink></li>
          <li><a href='#'>work</a></li>
          <li><a href='#'>contact</a></li>

        </ul>
      </div>
      <div className='nav-icons'>
        <ul>
          <li><a href='https://github.com/Kazuo-Mikara' target='_blank'><FiGithub /> </a></li>
          <li><a href='www.linkedin.com/in/kazuooh/' target='_blank'><FiLinkedin /> </a></li>
          <li><a href='https://www.instagram.com/k_4_kazuo/?hl=en' target='_blank'><FiInstagram /> </a></li>
          <li><a href='https://www.facebook.com/hizuo976' target='_blank'><FiFacebook /> </a></li>


        </ul>
      </div>
    </div>
  )
}

export default Nav
