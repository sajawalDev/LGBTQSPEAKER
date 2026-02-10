import Blog from "@/models/Blog";
import { connectDB } from "@/lib/mongodb";
import Styles from "@/styles/blog.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { getSeoByPage } from "@/lib/seo";
import {
  faInstagram,
  faTwitter,
  faLinkedin,
  faYoutube,
  faTiktok
} from "@fortawesome/free-brands-svg-icons";
// import { connectDB } from "@/lib/mongodb";
export async function generateMetadata() {

  const seo = await getSeoByPage("blog");

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
export default async function BlogDetail() {
  await connectDB();
  const blog = await Blog.findOne({ slug: "main-blog" }).lean();

  if (!blog) return null;

  return (
    <>

      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div className={Styles.BlogContent}>
            {/* AUTHOR + DATE */}
            <div className={Styles.blogH}>
              <p>
                <span className={Styles.user}>
                  <FontAwesomeIcon icon={faUser} />
                </span>{" "}
                {blog.author}
              </p>

              <p>
                <span className={Styles.calender}>
                  <FontAwesomeIcon icon={faCalendarDays} />
                </span>{" "}
                {new Date(blog.publishedAt).toDateString()}
              </p>
            </div>

            {/* TITLE */}
            <h1>{blog.title}</h1>

            {/* IMAGE */}
            <div className={Styles.blogIMage}>
              <img
                src={blog.coverImage}
                alt={blog.title}
                className={Styles.Image}
              />
            </div>

            {/* INTRO */}
            <p className={Styles.intro}>{blog.intro}</p>

            {/* BLOCKS */}
            {blog.blocks.map((block, i) => {
              if (block.type === "heading") {
                return (
                  <h4 key={i} className={Styles.Headingz}>
                    {block.value}
                  </h4>
                );
              }

              return (
                <p
                  key={i}
                  style={{ fontWeight: block.bold ? "700" : "400" }}
                >
                  {block.value}
                </p>
              );
            })}

            {/* TAGS + SHARE */}
            <div className={Styles.tagline}>
              <div className={Styles.tag}>
                <h6>Tags:</h6>
                <p>Shannon Whittington</p>
              </div>
              <div className={Styles.socail}>
                <h6>Share</h6>
                <p>
                  <span>
                    <a href="https://www.linkedin.com/in/shannonwhittington/">
                      <FontAwesomeIcon icon={faLinkedin} /></a>
                  </span>
                  <span>
                    <a href="https://www.youtube.com/@shannonwhittingtonconsulting/videos">
                      <FontAwesomeIcon icon={faYoutube} />
                    </a></span>
                  <span>
                    <a href="https://www.instagram.com/shannonwhittingtonconsulting?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </span>
                 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


// title = Dr. Shannon Whittington: Advocate, Speaker, and Catalyst Inspiring Change Through Inclusion, Empowerment, and Action
