"use client";

import "@/lib/fontawesome";
import Styles from "@/styles/Footer.module.css";
const logo = "/images/Whittington-Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faLinkedin,
  faYoutube,
  faTiktok
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <>
            <section className={Styles.FooterSection}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className={Styles.footerContentLogo}>
                                <div className={Styles.FooterLogo}>
                                    <img src={logo} alt="Whittongton-logo" className={Styles.Image} />
                                </div>
                                <p>Whittington Consultation: Empowering Change, Fostering Inclusion, and Inspiring Growth.</p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-6 my-lg-0 my-md-2 my-3">
                            <div className={Styles.footerContent}>
                                <ul>
                                    <li><h5>Usefull Links</h5></li>
                                    <li>About</li>
                                    <li>Media & press</li>
                                    <li>Gigs</li>
                                    <li>Testimonials</li>
                                    <li>Blog</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-6 my-lg-0 my-md-2 my-3">
                            <div className={Styles.footerContent}>
                                <ul>
                                    <li><h5>Legal</h5></li>
                                    <li>Cookie Policy</li>
                                    <li>Terms & Condition</li>
                                    <li>Prvacy policy</li>
                                    <li>Refund Policy</li>
                                    <li>Contact</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                        <div className={Styles.footerLastContent}>
                            <h5>Contact</h5>
                            <h6>For Consultation</h6>
                            <p><b>hello@whittingtonconsulting.com</b></p>
                            <h6>Phone</h6>
                            <p><b>+1-347-931-0155</b></p>
                        </div>
                        </div>
                    </div>
                    <div className={Styles.copyright}>
                        <div className={Styles.cContetent}>
                            <p>© 2023 · Whittington Consulting – Website Design & Marketing by <b>Sajawallabs</b></p>
                        </div>
                        <div className={Styles.csocaisl}>
                            <span>
                                <a href="https://www.linkedin.com/in/shannonwhittington/">
                                <FontAwesomeIcon icon={faLinkedin}/></a>
                                </span>
                            <span>
                                <a href="https://www.youtube.com/@shannonwhittingtonconsulting/videos">
                                <FontAwesomeIcon icon={faYoutube}/>
                                </a></span>
                            <span>
                                <a href="https://www.instagram.com/shannonwhittingtonconsulting?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                                <FontAwesomeIcon icon={faInstagram}/>
                                </a>
                                </span>
                            <span><FontAwesomeIcon icon={faTwitter}/></span>
                            <span>
                                <a href="https://www.tiktok.com/@shannonwhittingtonsheher?is_from_webapp=1&sender_device=pc">
                                <FontAwesomeIcon icon={faTiktok}/></a></span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}