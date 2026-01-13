"use client";
import Styles from "@/styles/contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTwitter, faLinkedin,faYoutube } from "@fortawesome/free-brands-svg-icons";
import NewsLetter from "@/components/Home/NewsLetter";
import FAQs from "@/components/Home/FAQs";
import Head from "next/head";
export default function Contact() {
    return (
        <>
        <Head>
            <title>Contact - Whittington Consulting</title>
        </Head>
            <section className={Styles.ContactSection}>
                <div className={Styles.ContactContainer}>
                    <p>Home <span><FontAwesomeIcon icon={faCaretRight} /></span> Contact</p>
                    <h1>Contact</h1>
                </div>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-7">
                            <div className={Styles.ContactContent}>
                                <h5>Get In Touch</h5>
                                <h2>Reach Out To Us Anytime</h2>
                                <p>We’re excited to hear from you and help you take the first step towards a more inclusive, accepting, and diverse workplace. Whether you have questions, are ready to get started, or simply want to connect, there are several ways to reach out to Whittington Consulting.</p>
                                <div className={Styles.ContactCard}>
                                    <div className={Styles.ContactC}>
                                        <p><FontAwesomeIcon icon={faPhone} /></p>
                                        <span>Phone<br /><b>(+1) 347-931-0155</b></span>
                                    </div>
                                    <div className={Styles.ContactC}>
                                        <p><FontAwesomeIcon icon={faEnvelope} /></p>
                                        <span>Email<br /><b>hello@whittingtonconsulting.com</b></span>
                                    </div>
                                </div>
                            </div>
                            <div className={Styles.SocialMedia}>
                                <h5>Social Media :</h5>
                                <p>
                                    <span><FontAwesomeIcon icon={faTwitter}/></span>
                                    <span><FontAwesomeIcon icon={faInstagram}/></span>
                                    <span><FontAwesomeIcon icon={faLinkedin}/></span>
                                    <span><FontAwesomeIcon icon={faYoutube}/></span>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-5 my-lg-0 my-md-0 my-3">
                            <div className={Styles.ContactForm}>
                                <h3>Let us know how we can help</h3>

                                <form>
                                    <div className={Styles.FormGroup}>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            required
                                        />
                                    </div>

                                    <div className={Styles.FormGroup}>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            required
                                        />
                                    </div>

                                    <div className={Styles.FormGroup}>
                                        <textarea
                                            placeholder="Your Message"
                                            rows="5"
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className={Styles.SendBtn}>
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <FAQs/>
                <NewsLetter/>
            </section>
            

        </>
    )
}