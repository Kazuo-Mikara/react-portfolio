import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiArrowUpRight, FiCheck } from "react-icons/fi";
import { FaGithub, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { PROFILE } from "../data/portfolio";
import { SectionHead, Magnetic, useSpotlight } from "../components/motion";
import "./Contact.css";

const EASE = [0.22, 1, 0.36, 1];

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);

    const formRef = useRef(null);
    const inView = useInView(formRef, { once: true, margin: "-10%" });
    const spotlight = useSpotlight();

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipient = PROFILE.email;
        const subject = encodeURIComponent(`Portfolio Inquiry from ${name || "Visitor"}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
        setSent(true);
        setTimeout(() => setSent(false), 5000);
    };

    const contacts = [
        {
            icon: FiMail,
            label: "Email",
            val: PROFILE.email,
            href: `mailto:${PROFILE.email}`,
            color: "#22d3ee",
        },
        {
            icon: FiPhone,
            label: "Phone",
            val: PROFILE.phone,
            href: `tel:${PROFILE.phone}`,
            color: "#a78bfa",
        },
        {
            icon: FiMapPin,
            label: "Location",
            val: PROFILE.location,
            href: "#",
            color: "#f472b6",
        },
    ];

    return (
        <section id="contact" className="section contact">
            <div className="contact-glow-orb" />
            <div className="container">
                <SectionHead
                    eyebrow="06 — Get In Touch"
                    title="Let's build something"
                    accent="extraordinary."
                    sub="Have an engineering role, technical consultation, or exciting product challenge? Send a message and let's connect."
                />

                <div className="contact-layout" ref={formRef}>
                    {/* Left: Contact Info */}
                    <motion.div
                        className="contact-cards"
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: EASE }}
                    >
                        <div className="cards-list">
                            {contacts.map((c, i) => (
                                <a
                                    key={i}
                                    href={c.href}
                                    className="contact-info-card"
                                    style={{ "--c": c.color }}
                                    onMouseMove={spotlight}
                                >
                                    <span className="c-icon">
                                        <c.icon />
                                    </span>
                                    <div className="c-text">
                                        <span className="c-label mono">{c.label}</span>
                                        <span className="c-val">{c.val}</span>
                                    </div>
                                    <FiArrowUpRight className="c-arrow" />
                                </a>
                            ))}
                        </div>

                        <div className="contact-socials-box">
                            <span className="mono socials-label">Connect across platforms</span>
                            <div className="socials-row">
                                {[
                                    [PROFILE.socials.github, FaGithub, "GitHub"],
                                    [PROFILE.socials.linkedin, FaLinkedinIn, "LinkedIn"],
                                    [PROFILE.socials.facebook, FaFacebookF, "Facebook"],
                                ].map(([href, Icon, label]) => (
                                    <Magnetic key={label} strength={0.4}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="social-btn-lg"
                                        >
                                            <Icon />
                                            <span>{label}</span>
                                        </a>
                                    </Magnetic>
                                ))}
                            </div>
                        </div>

                        <div className="terminal-card glass mono">
                            <div className="term-head">
                                <span className="term-dot r" />
                                <span className="term-dot y" />
                                <span className="term-dot g" />
                                <span className="term-title">connection.sh</span>
                            </div>
                            <div className="term-content">
                                <p>&gt; ping -c 1 portfolio.gateway</p>
                                <p className="term-ok">64 bytes from MM: icmp_seq=1 ttl=58 time=12.4 ms</p>
                                <p>&gt; echo $STATUS</p>
                                <p className="term-green">READY_FOR_NEW_PROJECTS</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.form
                        className="contact-form glass"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                    >
                        <h3 className="form-heading">Send a direct transmission</h3>
                        <p className="form-sub">Directly reaches my primary inbox</p>

                        <div className="form-group">
                            <label htmlFor="c-name" className="mono">01 / Your Name</label>
                            <input
                                id="c-name"
                                type="text"
                                required
                                placeholder="Alex Mercer"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="c-email" className="mono">02 / Your Email</label>
                            <input
                                id="c-email"
                                type="email"
                                required
                                placeholder="alex@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="c-message" className="mono">03 / Message</label>
                            <textarea
                                id="c-message"
                                rows={5}
                                required
                                placeholder="Tell me about your project, team, or opportunity..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary form-submit">
                            {sent ? (
                                <>
                                    Transmitted! <FiCheck />
                                </>
                            ) : (
                                <>
                                    Dispatch Message <FiSend />
                                </>
                            )}
                        </button>
                    </motion.form>
                </div>

                {/* Footer copyright */}
                <footer className="footer-wrap">
                    <div className="footer-left mono">
                        © {new Date().getFullYear()} {PROFILE.name}. Crafted with React & GSAP.
                    </div>
                    <div className="footer-right mono">
                        <span>Yangon, Myanmar</span>
                        <span>•</span>
                        <span>All Systems Operational</span>
                    </div>
                </footer>
            </div>
        </section>
    );
}
