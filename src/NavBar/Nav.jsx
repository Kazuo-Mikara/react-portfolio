import { React, useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiCode, FiBriefcase, FiMail, FiLayers, FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from '../components/ThemeToggle';
import gsap from 'gsap';
import './Nav.css'

const navItems = [
  { id: 'about', label: 'About', icon: FiUser },
  { id: 'skills', label: 'Skills', icon: FiCode },
  { id: 'experience', label: 'Experience', icon: FiBriefcase },
  { id: 'projects', label: 'Projects', icon: FiLayers },
  { id: 'contact', label: 'Contact', icon: FiMail },
];

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navRef = useRef(null);

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
    // Track scroll for navbar styling and active section
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Find active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // GSAP entrance animation
    if (!isMobile) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.nav-item',
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.5 }
        );
      }, navRef);

      return () => ctx.revert();
    }
  }, [isMobile]);

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`cyber-nav ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Logo / Brand */}
        <motion.div
          className='nav-brand'
          whileHover={{ scale: 1.05 }}
        >
          <span className="brand-text">
            <span className="brand-accent">&lt;</span>
            HMK
            <span className="brand-accent">/&gt;</span>
          </span>
          <div className="brand-subtitle">
            love the life you live<br />
            live the life you love
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className={`nav-links ${isMobile ? 'mobile' : 'desktop'}`}>
          <ul className='nav-menu'>
            {navItems.map((item, index) => (
              <motion.li
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                whileHover={{ y: -3 }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  <span className="nav-indicator"></span>
                  <span className="nav-text">{item.label}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className='menu-toggle'
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className={`hamburger-cyber ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </motion.button>

        {/* Decorative Elements */}
        <div className="nav-decoration left"></div>
        <div className="nav-decoration right"></div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile menu header */}
              <div className="mobile-menu-header">
                <span className="menu-title">Navigation</span>
                <motion.button
                  className="close-btn"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiX />
                </motion.button>
              </div>

              {/* Mobile menu items */}
              <ul className="mobile-nav-list">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }}
                    >
                      <item.icon className="nav-icon" />
                      <span>{item.label}</span>
                      <div className="item-glow"></div>
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Decorative grid */}
              <div className="menu-grid-pattern"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Nav
