"use client";
import Styles from "@/styles/HeadlLine.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function HeadLine(){
    return(
        <section className={Styles.headline}>
                <div className={Styles.qualification}>
                    <p className={Styles.htext}>
                        Speaker & LGBTQ+ Expert | DNP | MSN | RN | CCM | Transgender & LGBT Health Certified
                    </p>
                </div>
                <div className={Styles.EMaIL}>
                    <p className={Styles.heamil}><FontAwesomeIcon icon={faEnvelope}/> hello@whittingtonconsulting.com</p>
                </div>
            
        
        </section>
    )
}