"use client";

import { useParams } from "next/navigation"; 
import Head from "next/head";
import Styles from "@/styles/blog.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const img = "/images/blogimg.jpg";
export default function BlogDetail() {
  const params = useParams();
  const { title } = params;

  // Prevent hydration error on first render
  if (!title) return null;

  const blogTitle = decodeURIComponent(title);

  return (
    <>
      <Head>
        <title>{blogTitle}</title>
      </Head>

      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={Styles.BlogContent}>
                <div className={Styles.blogH}>
                  <p><span className={Styles.user}><FontAwesomeIcon icon={faUser} /></span> Shannon Whittington</p>
                  <p><span className={Styles.calender}><FontAwesomeIcon icon={faCalendarDays} /></span> October 9,2023</p>
                </div>
              </div>
              <h1>{title}</h1>
              <div className={Styles.blogIMage}>
                <img src={img} alt="blogIMage" className={Styles.Image} />
              </div>
              <div className={Styles.BLogContent}>
                <p>In a world filled with voices, Dr. Shannon Whittington stands out as a powerful advocate, speaker, and catalyst for change. Her journey, dedication, and passion for making a positive impact on society have made her an inspiring figure in the realms of LGBTQ+ advocacy, diversity and inclusion, and personal empowerment.<p />
                  <br /><h4 className={Styles.Headingz}>The Early Years</h4> <br />
                  Dr. Shannon’s journey towards becoming a force for change began in her formative years. Growing up, she had a deep sense of empathy and a burning desire to create a world where everyone could thrive, regardless of their background or identity. This early awareness of social issues would later shape her life’s mission.<p />
                  <br /><h4 className={Styles.Headingz}>Education and Expertise</h4> <br />
                  Dr. Shannon’s path to advocacy and public speaking was paved with education and expertise. She pursued a rigorous academic journey, earning advanced degrees in relevant fields. Her knowledge and research not only fueled her passion but also equipped her with the credibility needed to address complex societal issues.<p />
                  <br /><h4 className={Styles.Headingz}>A Catalyst for Inclusion</h4> <br />
                  One of Dr. Shannon’s remarkable qualities is her ability to catalyze change. She is a fearless advocate for LGBTQ+ rights and an ardent supporter of diversity and inclusion in all aspects of life. Her speeches and presentations resonate with audiences, challenging stereotypes and inspiring action. Through her work, she has empowered countless individuals and organizations to embrace inclusivity.<p />
                  <br /><h4 className={Styles.Headingz}>A Trailblazer in Advocacy</h4> <br />
                  Dr. Shannon’s advocacy work has left an indelible mark. She fearlessly addresses topics that others may shy away from, using her platform to raise awareness, educate, and promote understanding. Her tireless efforts have brought about positive changes in legislation, policies, and societal attitudes.<p />
                  <br /><h4 className={Styles.Headingz}>Personal Empowerment</h4> <br />
                  Beyond her advocacy, Dr. Shannon is a staunch believer in personal empowerment. She encourages individuals to embrace their authentic selves, rise above challenges, and reach their full potential. Her motivational talks inspire self-discovery and action, instilling a sense of confidence and purpose in her audience.<p />
                  <br /><h4 className={Styles.Headingz}>A Vision for a Better World</h4> <br />
                  Dr. Shannon Whittington’s vision extends far beyond herself. She envisions a world where every voice is heard, every individual is valued, and every heart is open. Her commitment to making this vision a reality is unwavering.<p />
                  <br /><h4 className={Styles.Headingz}>Conclusion</h4> <br />
                  Dr. Shannon Whittington is more than just a speaker; she is a driving force behind positive change. Her dedication to advocacy, her expertise, and her ability to inspire make her a beacon of hope for those striving to create a more inclusive and accepting world. As we look ahead, we can only anticipate the greater impact she will continue to have on society, one inspiring speech at a time.<p />
                </p>
                <div className={Styles.tagline}>
                    <div className={Styles.tag}>
                      <h6>Tags:</h6>
                      <p>Shannon Whittington</p>
                    </div>
                    <div className={Styles.socail}>
                        <h6>Share</h6>
                        <p>
                          <span><FontAwesomeIcon icon={faInstagram}/></span>
                          <span><FontAwesomeIcon icon={faLinkedin}/></span>
                          <span><FontAwesomeIcon icon={faTwitter}/></span>
                          </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
