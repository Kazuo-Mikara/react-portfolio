import { React, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiFacebook, FiInstagram, FiHome, FiFolder, FiBriefcase, FiMail } from "react-icons/fi";
import ThemeToggle from '../components/ThemeToggle';
import './Nav.css'
export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(false); // nav-links hidden until user scrolls; nav-text remains visible
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Track window resize to detect mobile/desktop
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Close mobile menu when switching to desktop
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // show the nav-links when user scrolls down, hide when at top (DESKTOP ONLY)
    const onScroll = () => {
      if (!isMobile) {
        setShowNav(window.scrollY > 10);
      }
    };

    // set initial state and attach listener
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  // On mobile: always show based on isMenuOpen
  // On desktop: show based on scroll (showNav)
  const navLinksClass = isMobile
    ? `nav-links ${isMenuOpen ? 'active' : ''}`
    : `nav-links ${showNav ? 'show' : 'hidden'}`;

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
      <div className={navLinksClass}>
        <ul>
          <li><a href='#about' onClick={() => setIsMenuOpen(false)}>about</a></li>
          <li><a href='#skills' onClick={() => setIsMenuOpen(false)}>skills</a></li>
          <li><a href='#experience' onClick={() => setIsMenuOpen(false)}>experience</a></li>
          <li><a href='#contact' onClick={() => setIsMenuOpen(false)}>contact</a></li>
        </ul>
      </div>
    </div >
  )
}

export default Nav
