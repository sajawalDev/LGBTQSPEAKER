"use client";
import Styles from "@/styles/media.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import FAQs from "@/components/Home/FAQClient";
import NewsLetter from "@/components/Home/NewsLetter";
import Head from "next/head";
const img1 = "/media/img1.png"
const img2 = "/media/img2.jpg"
const img3 = "/media/img3.jpg"
const img4 = "/media/img4.png"
const img5 = "/media/img5.jpg"
export default function Media() {
    return (
        <>
        <Head>
            <title>Media - Whittington Consulting</title>
        </Head>
            <section className={Styles.MediaSection}>
                <div className={Styles.MediaContainer}>
                    <p>Home<span><FontAwesomeIcon icon={faCaretRight} /></span>Media</p>
                    <h1>Media & Press</h1>
                </div>
                <div className="container">
                    <div className="row my-3 align-items-center">
                        <div className="col-md-6">
                            <div className={Styles.MediaImg}>
                                <img src={img1} alt="mediaImg" className={Styles.Image} />
                            </div>
                        </div>
                        <div className="col-md-6 my-lg-0 my-md-0 my-2">
                            <div className={Styles.MediaContent}>
                                <h5>John Maxwell Certified Speaker</h5>
                                <p>The John Maxwell Team is a group made up of individuals who have risen to the challenge of becoming leaders. Through the expert teachings of John Maxwell, individuals who are certified through the program grow personally and professionally as a leader, speaker, and coach.</p>
                               <Link href="/hire-to-speak"><button>Hire to Speak</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="row my-3 align-items-center">
                        <div className="col-md-6 my-lg-0 my-md-0 my-2">
                            <div className={Styles.MediaImg}>
                                <img src={img2} alt="mediaImg" className={Styles.Image} />
                            </div>
                        </div>
                        <div className="col-md-6 my-lg-0 my-md-0 my-2">
                            <div className={Styles.MediaContent}>
                                <h5>2017 ESPRIT Award</h5>
                                <p>E=Excellence S=Service P=People R-fiscal Responsibility I=Initiative T=Teamwork</p>
                               <Link href="/hire-to-speak"><button>Hire to Speak</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="row my-3 align-items-center">
                        <div className="col-md-6 my-lg-0 my-md-0 my-2">
                            <div className={Styles.MediaImg}>
                                <img src={img3} alt="mediaImg" className={Styles.Image} />
                            </div>
                        </div>
                        <div className="col-md-6 my-lg-0 my-md-0 my-2">
                            <div className={Styles.MediaContent}>
                                <h5>University of TN outstanding nurse alumni</h5>
                                <button>Learn More</button>
                            </div>
                        </div>
                    </div>
                    <div className="row my-3 align-items-center">
                        <div className="col-md-6 my-lg-0 my-md-0 my-2">
                            <div className={Styles.MediaImg}>
                                <img src={img4} alt="mediaImg" className={Styles.Image} />
                            </div>
                        </div>
                        <div className="col-md-6 my-lg-0 my-md-0 my-2">
                            <div className={Styles.MediaContent}>
                                <h5>2018 Home Care Association Quality and Innovation Award</h5>
                                <p>This award acknowledges people who have exhibited empathy, expertise, and service that distinguishes them. The Home Care Association is the industry’s leading trade association and represents over 500,000 caregivers across the nation.</p>
                                <button>Learn More</button>
                            </div>
                        </div>
                    </div>
                    <div className="row my-3 align-items-center">
                        <div className="col-md-6 my-lg-0 my-md-0 my-2">
                            <div className={Styles.MediaImg}>
                                <img src={img5} alt="mediaImg" className={Styles.Image} />
                            </div>
                        </div>
                        <div className="col-md-6 my-lg-0 my-md-0 my-2">
                            <div className={Styles.MediaContent}>
                                <h5>New York City & State Lobbyist</h5>
                                <p>I have secured nearly 4 million dollars for research nationally and locally and for patient care delivery to transgender and non-binary patients</p>
                                <button>Learn More</button>
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