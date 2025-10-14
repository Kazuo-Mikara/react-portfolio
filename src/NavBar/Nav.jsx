import { React, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiFacebook, FiInstagram, FiHome, FiFolder, FiBriefcase, FiMail } from "react-icons/fi";
import './Nav.css'
export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(false); // nav-links hidden until user scrolls; nav-text remains visible

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // show the nav-links when user scrolls down, hide when at top
    const onScroll = () => {
      setShowNav(window.scrollY > 10);
    };

    // set initial state and attach listener
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
  <div className={`nav-container ${showNav ? 'scrolled' : ''}`}>
      
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
      <div className={`nav-links ${isMenuOpen ? 'active' : ''} ${showNav ? 'show' : 'hidden'}`}> 
        <ul>

          <li><NavLink to='/' className={({isActive})=> (isActive ? 'active':'')}>about</NavLink></li>
          <li><NavLink to='/skills' className={({isActive})=> (isActive ? 'active':'')}>skills</NavLink></li>
          <li><NavLink to='/projects' className={({isActive})=> (isActive ? 'active':'')}>projects</NavLink></li>
          <li><a href='#'>work</a></li>
          <li><a href='#'>contact</a></li>

        </ul>
      </div>
     
    </div>
  )
}

export default Nav
