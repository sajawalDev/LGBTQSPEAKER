"use client";

import "@/lib/fontawesome";
import Styles from "@/styles/WhyChooseUs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear,faHandshake, faShieldAlt, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export default function WhyChooseUs() {
  return (
    <>
      <section className={Styles.WhyChooseUsSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-5">
              <div className={Styles.WCu}>
                <h5>Why Choose Us</h5>
                <h1>Help Nourishing Your Company!</h1>
                <b>Unlock your life potential with us</b>
                <p>
                  We're not just another consulting firm. We're your partners on this journey.
                  Our commitment to excellence and inclusivity is unmatched.
                </p>
                <Link href="/hire-to-speak"><button>Hire to Speak</button></Link>
              </div>
            </div>

            <div className="col-lg-5 col-md-7">
              <div className={Styles.WcuCards}>

                {/* Card 1 */}
                <div className={Styles.Card}>
                  <div className={Styles.CardHeader}>
                    <span className={Styles.Icon}>
                      <FontAwesomeIcon icon={faHandshake} />
                    </span>
                    <h4>Commitment</h4>
                  </div>
                  <p>
                    Our commitment goes beyond words; it's a mission that's etched into
                    the very fabric of our organization.
                  </p>
                </div>

                {/* Card 2 */}
                <div className={Styles.Card}>
                  <div className={Styles.CardHeader}>
                    <span className={Styles.Icon}>
                      <FontAwesomeIcon icon={faShieldAlt} />
                    </span>
                    <h4>Dismantling Homophobia</h4>
                  </div>
                  <p>
                    Homophobia in the workplace is a barrier to progress, a hindrance to
                    creativity, and an injustice to your team members. Shannon Whittington's
                    expertise equips us to face this challenge head-on.
                  </p>
                </div>

                {/* Card 3 */}
                <div className={Styles.Card}>
                  <div className={Styles.CardHeader}>
                    <span className={Styles.Icon}>
                      <FontAwesomeIcon icon={faGraduationCap} />
                    </span>
                    <h4>Education and Advocacy</h4>
                  </div>
                  <p>
                    Squashing homophobia is not just about policies. It's about fostering a
                    workplace culture where everyone feels safe, respected, and valued.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
