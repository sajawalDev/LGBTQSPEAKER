"use client";
import Link from "next/link"
import Styles from "@/styles/LatestBlog.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


const img = "/images/blogimg.jpg";
const blogTitle =
  "Dr Shannon Whittington: Advocate, Speaker and Catalyst for Change";

export default function LatestBlogSection() {
  const slug = blogTitle
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

  return (
    <section className={Styles.latestBlogsection}>
      <div className="container">
        <div className="row">

          <div className="col-md-3">
            <div className={Styles.blogheading}>
              <h5>LATEST BLOG</h5>
              <button>View All Blog</button>
            </div>
          </div>

          {/* IMAGE */}
          <div className="col-lg-4 col-md-5">
            <div
              className={Styles.blogImg}
          
            >
             <Link href={`/blog/${slug}`}><img src={img} alt="Shannon_blog" width={100} height={100} /></Link>
            </div>
          </div>

          {/* CONTENT */}
          <div
            className="col-lg-5 col-md-4"
            
          >
            <div className={Styles.blogContent}>
              <h3 className="text-center">{blogTitle}</h3>
              <p>
                SHANNON WHITTINGTON <span>October 9, 2023</span>
              </p>
              <button><FontAwesomeIcon icon={faArrowRight} /> Read More</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
