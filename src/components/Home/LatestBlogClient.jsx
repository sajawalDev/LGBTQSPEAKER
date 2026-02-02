"use client";

import Link from "next/link";
import Styles from "@/styles/LatestBlog.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function LatestBlogClient({ blogs }) {
  if (!blogs?.length) return null;

  return (
    <section className={Styles.latestBlogsection}>
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT SIDE */}
          <div className="col-lg-3 col-md-4">
            <div className={Styles.blogheading}>
              <h5>LATEST BLOG</h5>
              
            </div>
          </div>

          {/* BLOGS */}
          <div className="col-lg-9 col-md-8">
            {blogs.map(blog => (
              <div key={blog._id} className="row mb-4 align-items-center">
                {/* IMAGE */}
                <div className="col-lg-5 col-md-6">
                  <div className={Styles.blogImg}>
                    <Link href={`/blog/${blog.slug}`}>
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="col-lg-7 col-md-6">
                  <div className={Styles.blogContent}>
                    <h3>{blog.title}</h3>

                    <p>
                      {blog.author}
                      <span>
                        {" "}
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </p>

                    <Link href={`/blog/${blog.slug}`}>
                      <button>
                        <FontAwesomeIcon icon={faArrowRight} /> Read More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
