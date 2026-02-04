import Styles from "@/styles/terms-&-condition.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, } from "@fortawesome/free-solid-svg-icons";
import FAQServer from "@/components/Home/FAQServer";
import NewsLetterServer from "@/components/Home/NewsLetterServer";
export default function TermsConditions() {
    return (
        <>
            <section className={Styles.TACSection}>
                <div className={Styles.TACContainer}>
                    <p>Home <span><FontAwesomeIcon icon={faCaretRight} /></span> TERMS & CONDITIONS</p>
                    <h1>Terms & Conditions</h1>
                </div>
                <div className="container my-lg-5 my-md-4 my-3">
                    <div className={Styles.tacContent}>
                        <h3>Website Terms and Conditions</h3>
                        <h3>1. Introduction</h3>
                        <p>Welcome to Whittington Consulting. These terms and conditions outline the rules and regulations for the use of our website. By accessing this website, you accept these terms and conditions. Do not continue to use Whittington Consulting’s website if you do not agree with all of the terms and conditions stated on this page.</p>
                        <h3>2. Intellectual Property Rights</h3>
                        <p>Other than the content you own, under these terms, Whittington Consulting and/or its licensors own all the intellectual property rights and materials contained in this website. You are granted limited license only for purposes of viewing the material contained on this website.</p>
                        <h3>3. Restrictions</h3>
                        <p></p>
                        <ul>
                            <li><p>publishing any website material in any other media;</p></li>
                            <li><p>selling, sublicensing, and/or otherwise commercializing any website material;</p></li>
                            <li><p>publicly performing and/or showing any website material;</p></li>
                            <li><p>using this website in any way that is or may be damaging to this website;</p></li>
                            <li><p>using this website in any way that impacts user access to this website;</p></li>
                            <li><p>using this website contrary to applicable laws and regulations, or in any way that may cause harm to the website, or to any person or business entity;</p></li>
                            <li><p>engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation to this website</p></li>
                        </ul>
                        <p>Certain areas of this website are restricted from being accessed by you, and Whittington Consulting may further restrict access by you to any areas of this website, at any time, in absolute discretion. Any user ID and password you may have for this website are confidential, and you must maintain confidentiality as well.</p>
                        <h3>4. Your Content</h3>
                        <p>In these website standard terms and conditions, “Your Content” shall mean any audio, video text, images, or other material you choose to display on this website. By displaying Your Content, you grant Whittington Consulting a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate, and distribute it in any and all media.</p>
                        <h3>5. No Use for Unlawful Purpose</h3>
                        <p>You shall not use this website for any unlawful or prohibited purpose.</p>
                        <h3>6. No Warranties</h3>
                        <p>This website is provided “as is,” with all faults, and Whittington Consulting expresses no representations or warranties, of any kind related to this website or the materials contained on this website. Also, nothing contained on this website shall be interpreted as advising you.</p>
                        <h3>7. Limitation of Liability</h3>
                        <p>In no event shall Whittington Consulting, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website, whether such liability is under contract. Whittington Consulting, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.</p>
                        <h3>8. Indemnification</h3>
                        <p>You hereby indemnify to the fullest extent Whittington Consulting from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these terms.</p>
                        <h3>9. Severability</h3>
                        <p>If any provision of these terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>
                        <h3>10. Variation of Terms</h3>
                        <p>Whittington Consulting is permitted to revise these terms at any time as it sees fit, and by using this website, you are expected to review these terms regularly.</p>
                        <h3>11. Assignment</h3>
                        <p>The Whittington Consulting is allowed to assign, transfer, and subcontract its rights and/or obligations under these terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these terms.</p>
                        <h3>12. Entire Agreement</h3>
                        <p>These terms constitute the entire agreement between Whittington Consulting and you in relation to your use of this website and supersede all prior agreements and understandings.</p>
                        <h3>13. Governing Law & Jurisdictios</h3>
                        <p>These terms will be governed by and interpreted in accordance with the laws of the state of Your State, and you submit to the non-exclusive jurisdiction of the state and federal courts located in [Your State] for the resolution of any disputes.</p>
                        <p>By accessing this website, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use this website.</p>
                    </div>
                </div>
                <FAQServer/>
                <NewsLetterServer/>
            </section>
        </>
    )
}