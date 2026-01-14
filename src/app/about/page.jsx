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
                                <p>Whittington Consulting, your partner in building inclusive, ethical, and high-performing workplace cultures. At the core of our work is helping organizations operationalize belonging, psychological safety, and inclusive leadership to improve engagement, retention, and measurable outcomes.</p>
                                <span><b>Meet Shannon Whittington: Your Guide to Belonging-Driven Excellence</b></span>
                                <p>Shannon Whittington is dedicated to helping healthcare systems and corporate organizations create environments where people feel safe, valued, and empowered to perform at their best. Her work focuses on embedding LGBTQ+ inclusion, psychological safety, and equitable leadership practices into daily operations, turning intention into sustainable organizational performance.</p>
                                <p>An award-winning, doctorate-prepared nurse with extensive leadership experience, Shannon brings deep expertise in healthcare alongside a proven ability to translate inclusive practices into real-world results. As a certified LGBTQ+ expert, she understands how belonging, ethical leadership, and inclusive cultures directly impact retention, burnout reduction, team effectiveness, patient experience, and business outcomes.</p>
                                <p>Shannon’s work is both professional and personal. As a gay woman, she brings lived experience and authenticity to her leadership, offering organizations a grounded, practical perspective on what it takes to build cultures of trust, inclusion, and excellence. Her mission is clear: to help organizations move beyond awareness and create workplaces where people and performance can thrive.</p>
                                <div className={Styles.Ourmision}>
                                    <div className={Styles.comitment}>
                                        <p><span><FontAwesomeIcon icon={faGear} /></span>Our Commitment</p>
                                        <content>We are committed to helping healthcare systems and organizations build workplaces rooted in belonging, psychological safety, and ethical leadership. We support leaders in addressing bias, reducing discrimination, and creating inclusive environments through practical, actionable strategies that strengthen culture, engagement, and performance without overwhelming teams.</content>
                                    </div>
                                    <div className={Styles.mission}>
                                        <p><span><FontAwesomeIcon icon={faGear} /></span>Our Mission</p>
                                        <content>Shannon’s expertise and our consulting services help organizations deepen their understanding of LGBTQ+ inclusion, belonging, and psychological safety. We equip healthcare systems and corporate teams with practical strategies, leadership tools, and clear guidance to build inclusive cultures that strengthen engagement, performance, and long-term organizational success.</content>
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
                    Together, we can create workplaces free from discrimination and rooted in belonging. This is more than a commitment, it’s a promise to excellence. Partner with Whittington Consulting and begin building a culture where people and performance flourish.
                </p>
                <button><span><FontAwesomeIcon icon={faPhone} /></span>Give us a call today</button>
            </section>
            <FAQs />
            <NewsLetter />
        </>
    )
}