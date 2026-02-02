import Styles from "@/styles/privacy-policy.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, } from "@fortawesome/free-solid-svg-icons";
import FAQs from "@/components/Home/FAQClient";
import NewsLetter from "@/components/Home/NewsLetter";
export default function PrivacyPolicy() {
    return (
        <>
            <section className={Styles.PrivacySection}>
                <div className={Styles.PrivacyContainer}>
                    <p>Home <span><FontAwesomeIcon icon={faCaretRight} /></span> PRIVACY POLICY</p>
                    <h1>Privacy Policy</h1>
                </div>
                <div className="container my-lg-5 my-md-4 my-3">
                    <div className={Styles.PrivacyContent}>
                        <h3>1. Introduction</h3>
                        <p>At Whittington Consulting, we consider your privacy and the security of your personal information a top priority. This Privacy Policy outlines the types of information we collect, how it is used, and how it is protected. By accessing or using our website, you agree to the practices described in this policy.</p>
                        <h3>2. Information We Collect</h3>
                        <p>We may collect various types of information, including:</p>
                        <ul>
                            <li><b>Personal Information :</b><p> Name, email address, phone number, and other contact details when provided voluntarily.</p></li>
                            <li><b>Usage Information :</b><p> Data related to how you interact with our website, including IP address, browser type, and access times.</p></li>
                            <li><b>Cookie Data :</b><p> Information collected using cookies and similar tracking technologies.</p></li>
                        </ul>
                        <h3>3. How We Use Your Information</h3>
                        <p>We may use your information for various purposes, including:</p>
                        <ul>
                            <li>Providing and personalizing our services.</li>
                            <li>Sending you important information or updates.</li>
                            <li>Improving our website and services.</li>
                            <li>Conducting research and analysis for better user experiences.</li>
                        </ul>
                        <h3>4. Disclosure of Your Information</h3>
                        <p>We may disclose your information in specific situations, including when required by law or to protect our legal rights. We do not sell or rent your personal information to third parties.</p>
                        <h3>5. Security of Your Information</h3>
                        <p>We take reasonable measures to protect your personal information from unauthorized access and disclosure. However, no method of data transmission or storage is entirely secure, and we cannot guarantee the security of your information.</p>
                        <h3>6. Your Choices</h3>
                        <p>You can exercise certain choices regarding your personal information, including the ability to update, correct, or delete it. You can also opt out of receiving promotional communications from us.</p>
                        <h3>7. Links to Other Websites</h3>
                        <p>Our website may contain links to other websites not owned or controlled by us. We are not responsible for the content or the privacy practices of such third-party websites.</p>
                        <h3>8. Changes to This Privacy Policy</h3>
                        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the last updated date will be indicated.</p>
                        <h3>9. Contact Us</h3>
                        <p>If you have any questions or concerns about this Privacy Policy, please contact .</p>
                    </div>
                </div>
                <FAQs />
                <NewsLetter />
            </section>
        </>
    )
}