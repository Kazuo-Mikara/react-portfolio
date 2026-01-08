import React from 'react'
import { useState } from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import './Contact.css'

const Contact = () => {
    const [emailBody, setEmailBody] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const recipient = "htoomyatkyaw32@gmail.com";
        const subject = "Inquiring about the Services";
        const body = encodeURIComponent(emailBody); // Encode body to handle special characters
        const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink; // Opens the default email client
    }
    return (
        <div className='contact-container'>
            <div className="contact-heading-container">
                <h1 className='contact-heading'>Get In Touch</h1>
                <span className='contact-sub-heading'>Let&apos;s connect and discuss opportunities for collaboration</span>
            </div>
            <div className='contact-body'>
                <div className="contact-info">
                    <div className="contact-info-heading-container">
                        <h1 className='contact-info-heading'>Contact Information</h1>
                        <h1 className='contact-info-sub-heading'>I am always interested in new opportunities and collaborations.Whether you have a project in mind or just want to say hello, feel free to reach out!</h1>
                    </div>
                    <div className='contact-detail-container'>
                        <div className='contact-detail-icon'><EmailIcon /></div>
                        <div className='contact-detail-body'>
                            <h1>Email</h1>
                            <span>htoomyatkyaw32@gmail.com</span>
                        </div>
                    </div>
                    <div className='contact-detail-container'>
                        <div className='contact-detail-icon'><LocalPhoneIcon /></div>
                        <div className='contact-detail-body'>
                            <h1>Phone</h1>
                            <span>+959263906925</span>
                        </div>
                    </div>
                    <div className='contact-detail-container'>
                        <div className='contact-detail-icon'><HomeFilledIcon /></div>
                        <div className='contact-detail-body'>
                            <h1>Location</h1>
                            <span>Yangon, Myanmar 11101</span>
                        </div>
                    </div>

                </div>
                <div className='sendmail-section'>
                    <div className='sendmail-card'>
                        <h1 className='sendmail-heading'>Ready to Work Together?</h1>
                        <p className='sendmail-sub'>I&apos;m currently available for new projects and opportunities. Let&apos;s create something amazing together!</p>

                        <form className='sendmail-form' onSubmit={handleSubmit}>
                            <button type='submit' className='sendmail-button'>
                                <span className='sendmail-button-icon'><EmailIcon /></span>
                                <span>Send Email</span>
                            </button>

                            <label htmlFor='contact-email' className='sr-only'>Your email</label>
                            <input id='contact-email' name='body_text' type='text' onChange={(e) => setEmailBody(e.target.value)} placeholder='Your Message to Me' className='sendmail-input' />
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Contact