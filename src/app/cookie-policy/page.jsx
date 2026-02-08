import Styles from "@/styles/cookie-policy.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, } from "@fortawesome/free-solid-svg-icons";
import FAQServer from "@/components/Home/FAQServer";
import NewsLetterServer from "@/components/Home/NewsLetterServer";
import { connectDB } from "@/lib/mongodb";
import Seo from "@/models/Seo";
export async function generateMetadata() {
  await connectDB();

  const seo = await Seo.findOne({ page: "cookiepolicy" }).lean();

  if (!seo) return {};

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonical || undefined,
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
  };
}
export default function CookiePolicy() {
    return (
        <>
            <section className={Styles.CookieSection}>
                <div className={Styles.CookieContainer}>
                    <p>Home <span><FontAwesomeIcon icon={faCaretRight} /></span> COOKIE POLICY</p>
                    <h1>Cookie Policy</h1>
                </div>
                <div className="container my-lg-5 my-md-4 my-3">
                    <div className={Styles.cookieContent}>
                        <h3>1. Introduction</h3>
                        <p>This Cookie Policy explains how Whittington Consulting uses cookies and similar technologies when you visit our website. By using our website, you agree to the use of cookies as described in this policy.</p>
                        <h3>2. What Are Cookies?</h3>
                        <p>Cookies are small text files that are placed on your computer or device when you visit a website. They are commonly used to make websites work efficiently and to provide information to website owners.</p>
                        <h3>3. How We Use Cookies</h3>
                        <p>We use cookies for various purposes, including:</p>
                        <ul>
                            <li><b>Essential Cookies :</b><p> These cookies are necessary for the proper functioning of our website.</p></li>
                            <li><b>Performance Cookie :</b><p> These cookies help us analyze how users interact with our website to improve its performance.</p></li>
                            <li><b>Functionality Cookies :</b><p> These cookies enable us to remember your preferences, such as language or region.</p></li>
                            <li><b>Third-Party Cookies :</b><p> We may allow third-party services to use cookies for various purposes, including analytics and social media integration.</p></li>
                        </ul>
                        <h3>4. Managing Cookies</h3>
                        <p>You have the option to manage or delete cookies as you wish. However, please be aware that disabling or deleting cookies may impact your experience on our website. You can typically manage cookies through your browser’s settings.</p>
                        <h3>5. Changes to This Policy</h3>
                        <p>We may update this Cookie Policy from time to time to reflect changes in our use of cookies. Any changes will be posted on this page, and the last updated date will be indicated.</p>
                        <h3>6. Contact Us</h3>
                        <p>If you have any questions or concerns about our use of cookies, please contact us .</p>
                    </div>
                </div>
                <FAQServer/>
                <NewsLetterServer/>
            </section>
        </>
    )
}