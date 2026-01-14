"use client";

import "@/lib/fontawesome";
import Image from "next/image";
import Styles from "@/styles/WhoAmI.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faDownload } from "@fortawesome/free-solid-svg-icons";


const img = "/images/Whoiam.png";

export default function WhoIAmSection() {
    return (
        <section className={Styles.Whoami}>
            <div className="container">
                <div className={Styles.WhoamiHeading}>
                    <h5>LGBTQ+ SPEAKER</h5>
                    <h1>
                        Shannon Whittington <br /> Inspiring Minds, Igniting Hearts
                    </h1>
                </div>

                <div className="row">
                    {/* IMAGE COLUMN */}
                    <div className="col-lg-4 col-md-6">
                        <div className={Styles.shanonImg}>
                            <Image
                                src={img}
                                alt="Shannon Whittington"
                                fill
                                priority
                            />
                        </div>
                    </div>

                    {/* CONTENT COLUMN */}
                    <div className="col-lg-8 col-md-6 mt-md-5 mt-3">
                        <div className={Styles.WhoiamContent}>
                            <h5>Who am I?</h5>
                            <p>
                               I help healthcare organizations and corporations operationalize LGBTQ+ psychological safety and patient-centered, people-centered practices, improving engagement, retention, experience metrics, and measurable organizational performance.
                            </p>
                            <div className={Styles.WhoamiBtnz}>
                                <button className={Styles.Play}>
                                    <FontAwesomeIcon icon={faPlay} /> Watch my topics here
                                </button>

                                <a
                                    href="/media/Shannon-Media-Kit.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={Styles.Download}
                                >
                                    Check My Media Kit <FontAwesomeIcon icon={faDownload} />
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
