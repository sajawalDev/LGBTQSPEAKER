"use client";

import "@/lib/fontawesome";
import Styles from "@/styles/Services.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { servicesData } from "@/data/servicesData";
import Link from "next/link";
export default function Services() {
    return (
        <section className={Styles.ServicesSection}>
            <div className="container">
                <div className={Styles.ServicesHeading}>
                    <h5>Services</h5>
                    <h2>Make Your Event Memorable with Shannon.</h2>
                    <p>
                        My passion is to empower change through my work as an LGBTQ+ speaker
                        and consultant. My commitment to diversity, inclusion, and belonging
                        drives everything I do.
                    </p>
                </div>

                <div className="row d-flex flex-wrap">
                    {servicesData.map((service) => (
                        <div key={service.id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className={Styles.ServiceCard}>

                                <div className={Styles.CardHeader}>
                                    <span className={Styles.Icon}>
                                        <FontAwesomeIcon icon={service.icon} />
                                    </span>
                                    <h4>{service.title}</h4>
                                </div>

                                <p className={Styles.Desc}>{service.desc}</p>
                               <Link href="/hire-to-speak">
                                <button className={Styles.CardButton}>
                                    <FontAwesomeIcon icon={service.buttonIcon} className="me-2" /> Hire to speak
                                </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={Styles.servcesTagline}>
                    <p>Experience our journey of impactful <b>gigs and successfull</b> collaborations</p>
                </div>
            </div>
        </section>
    );
}
