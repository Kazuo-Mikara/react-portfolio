import React, { useRef, useState } from 'react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import { FiMail, FiPhone, FiMapPin, FiSend, FiArrowRight } from 'react-icons/fi';
import { motion, useInView } from 'framer-motion';
import './Contact.css'

const Contact = () => {
    const [emailBody, setEmailBody] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipient = "htoomyatkyaw32@gmail.com";
        const subject = "Inquiring about the Services";
        const body = encodeURIComponent(emailBody);
        const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    }

    const contactInfo = [
        {
            icon: FiMail,
            label: "Email",
            value: "htoomyatkyaw32@gmail.com",
            color: "#00f5ff",
            link: "mailto:htoomyatkyaw32@gmail.com"
        },
        {
            icon: FiPhone,
            label: "Phone",
            value: "+959263906925",
            color: "#bf00ff",
            link: "tel:+959263906925"
        },
        {
            icon: FiMapPin,
            label: "Location",
            value: "Yangon, Myanmar 11101",
            color: "#ff00aa",
            link: "#"
        }
    ];

    return (
        <section className='contact-section' ref={sectionRef}>
            {/* Background effects */}
            <div className="contact-bg">
                <div className="grid-overlay" />
                <div className="glow-orb orb-cyan" />
                <div className="glow-orb orb-purple" />
            </div>

            <div className='contact-container'>
                {/* Header */}
                <motion.div
                    className="contact-header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="header-icon">
                        <FiMail />
                    </div>
                    <h1 className='contact-title'>Get In Touch</h1>
                    <p className='contact-subtitle'>Let's connect and discuss opportunities for collaboration</p>
                    <div className="header-decoration">
                        <span className="line" />
                        <span className="diamond" />
                        <span className="line" />
                    </div>
                </motion.div>

                <div className='contact-body'>
                    {/* Contact Info */}
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="info-header">
                            <h2 className='info-title'>Contact Information</h2>
                            <p className='info-subtitle'>
                                I am always interested in new opportunities and collaborations.
                                Whether you have a project in mind or just want to say hello, feel free to reach out!
                            </p>
                        </div>

                        <div className="contact-cards">
                            {contactInfo.map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.link}
                                    className="contact-card"
                                    style={{ '--accent': item.color }}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                    whileHover={{
                                        y: -5,
                                        boxShadow: `0 15px 30px rgba(0, 0, 0, 0.4), 0 0 20px ${item.color}20`
                                    }}
                                >
                                    <div
                                        className="card-icon"
                                        style={{
                                            color: item.color,
                                            borderColor: `${item.color}40`,
                                            boxShadow: `0 0 20px ${item.color}20`
                                        }}
                                    >
                                        <item.icon />
                                    </div>
                                    <div className="card-content">
                                        <span className="card-label">{item.label}</span>
                                        <span className="card-value">{item.value}</span>
                                    </div>
                                    <div className="card-arrow" style={{ color: item.color }}>
                                        <FiArrowRight />
                                    </div>
                                    <div className="card-glow" style={{ background: `radial-gradient(circle at left, ${item.color}15, transparent 60%)` }} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className='contact-form-container'
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="form-card">
                            <div className="form-header">
                                <h2>Ready to Work Together?</h2>
                                <p>I'm currently available for new projects and opportunities. Let's create something amazing together!</p>
                            </div>

                            <form className='contact-form' onSubmit={handleSubmit}>
                                <div className={`input-wrapper ${isFocused ? 'focused' : ''}`}>
                                    <label htmlFor='message-input' className='input-label'>
                                        Your Message
                                    </label>
                                    <textarea
                                        id='message-input'
                                        name='body_text'
                                        value={emailBody}
                                        onChange={(e) => setEmailBody(e.target.value)}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        placeholder='Tell me about your project or just say hello...'
                                        className='message-input'
                                        rows={4}
                                    />
                                    <div className="input-border" />
                                </div>

                                <motion.button
                                    type='submit'
                                    className='submit-btn'
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: '0 0 30px rgba(0, 245, 255, 0.4)'
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>Send Message</span>
                                    <FiSend className='btn-icon' />
                                    <div className="btn-shine" />
                                </motion.button>
                            </form>

                            {/* Decorative elements */}
                            <div className="form-decoration top-left" />
                            <div className="form-decoration bottom-right" />
                        </div>
                    </motion.div>
                </div>

                {/* Terminal-style footer */}
                <motion.div
                    className="contact-terminal"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="terminal-header">
                        <span className="dot red" />
                        <span className="dot yellow" />
                        <span className="dot green" />
                    </div>
                    <div className="terminal-body">
                        <span className="terminal-prompt">&gt;</span>
                        <span className="terminal-text">connection.status: </span>
                        <span className="terminal-status">ONLINE</span>
                        <span className="cursor">_</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Contact