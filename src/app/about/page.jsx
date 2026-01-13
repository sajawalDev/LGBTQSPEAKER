"use client";
import Styles from "@/styles/about.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faGear, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import FAQs from "@/components/Home/FAQs";
import NewsLetter from "@/components/Home/NewsLetter";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Link from "next/link";
import Head from "next/head";
const img = "/images/Whoiam.png"

export default function About() {
    return (
        <>
        <Head>
            <title>About _ Whittington Consulting</title>
        </Head>
            <section className={Styles.About}>
                <div className={Styles.AboutHeading}>
                    <p>Home <FontAwesomeIcon icon={faCaretRight} /> About</p>
                    <h1>About</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className={Styles.ShannonImg}>
                                <img src={img} alt="Shannon_Img" className={Styles.Image} />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className={Styles.AboutContent}>
                                <h6>About</h6>
                                <p>Welcome to Whittington Consulting, your partner in fostering inclusive, equitable, and diverse workplaces. At the heart of our mission is Shannon Whittington, the passionate force behind our brand.</p>
                                <span><b>Meet Shannon Whittington: Your Guide to Inclusive Excellence</b></span>
                                <p>Shannon Whittington, the driving force behind Whittington Consulting, is on a relentless mission to empower organizations in the journey towards an inclusive, accepting, and harmonious workplace. Shannon’s credentials are not just impressive; they are essential for the profound impact she has in the field.</p>
                                <p>With a background as an award-winning doctorate-prepared nurse, Shannon’s expertise in healthcare is matched by her unparalleled commitment to the LGBTQ+ community. As a certified LGBTQ+ expert, she brings a wealth of knowledge and experience to the table, backed by a profound understanding of the unique challenges faced by LGBTQ+ individuals.</p>
                                <p>Shannon’s journey is personal, as well as professional. As a gay woman, she brings a unique and invaluable perspective to her work. Her personal experiences inform her mission, and her dedication to improving the world for LGBTQ+ individuals is unwavering.</p>
                                <div className={Styles.Ourmision}>
                                    <div className={Styles.comitment}>
                                        <p><span><FontAwesomeIcon icon={faGear} /></span>Our Commitment</p>
                                        <content>Whittington Consulting, we are committed to helping organizations eliminate homophobia and discrimination in the workplace, all without overwhelming you.</content>
                                    </div>
                                    <div className={Styles.mission}>
                                        <p><span><FontAwesomeIcon icon={faGear} /></span>Our Mission</p>
                                        <content>Shannon’s expertise and our consulting services aim to raise your IQ on all things LGBTQ+ and Diversity & Inclusion. We provide practical skills, guidance, and insights to help your organization flourish in a diverse world.</content>
                                    </div>
                                </div>
                                <div className={Styles.ContentButton}>
                                   <Link href="/hire-to-speak"><button>Hire To Speak</button></Link>
                                    <span><FontAwesomeIcon icon={faEnvelope} /></span> for Consultation
                                    <p><b>hello@whittingtonconsulting.com</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <WhyChooseUs />
            <section className={Styles.GetinTouch}>
                <h5>GET IN TOUCH</h5>
                <h1>Join Us in Building a Better Workplace</h1>
                <p>
                    Together, let’s squash homophobia in the workplace. It’s not just a<br /> commitment; it’s a promise. Choose Whittington Consulting, and take the<br /> first step toward creating a workplace where everyone can flourish.

                </p>
            <button><span><FontAwesomeIcon icon={faPhone} /></span>Give us a call today</button>
            </section>
            <FAQs/>
            <NewsLetter/>
        </>
    )
}