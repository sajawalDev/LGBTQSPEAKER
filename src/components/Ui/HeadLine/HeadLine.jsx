"use client";
import Styles from "@/styles/HeadlLine.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faLinkedin,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function HeadLine() {
    return (
        <section className={Styles.headline}>
            <div className={Styles.qualification}>
                <p className={Styles.htext}>
                    Speaker & LGBTQ+ Expert | DNP | MSN | RN | CCM | Transgender & LGBT Health Certified
                </p>
            </div>
            <div className={Styles.EMaIL}>
                <div className={Styles.heamil}><p><FontAwesomeIcon icon={faEnvelope} /> hello@whittingtonconsulting.com</p></div>
                <div className={Styles.csocaisl}>
                    <span>
                        <a href="https://www.linkedin.com/in/shannonwhittington/">
                            <FontAwesomeIcon icon={faLinkedin} /></a>
                    </span>
                    <span>
                        <a href="https://www.youtube.com/@shannonwhittingtonconsulting/videos">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a></span>
                    <span>
                        <a href="https://www.instagram.com/shannonwhittingtonconsulting?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </span>
                    <span><FontAwesomeIcon icon={faTwitter} /></span>
                    <span>
                        <a href="https://www.tiktok.com/@shannonwhittingtonsheher?is_from_webapp=1&sender_device=pc">
                            <FontAwesomeIcon icon={faTiktok} /></a></span>
                </div>
            </div>


        </section>
    )
}