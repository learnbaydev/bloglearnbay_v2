import React, { useEffect, useState } from "react";
import styles from "./CategorySection.module.css";
import Link from "next/link";
import Image from "next/image";

export default function CategorySection({ categoryPostTag }) {
  const [allPostsData, setAllBlogPostsData] = useState([]);
  useEffect(() => {
    const fetchCertificateId = async () => {
      const data = await fetch("/api/sendBlog", {
        method: "GET",
      });

      if (data.status === 200) {
        const { blogData } = await data.json();
        setAllBlogPostsData(blogData);
      }
    };
    fetchCertificateId();
  }, []);

  return (
    <>
      {[...categoryPostTag].slice(0, 2).map((post, i) => {
        let tag = post;

        const categoryPosts = allPostsData.filter(
          (post) => post.category === tag
        );
        let makeUrl = post.toLowerCase().replace(/\s+/g, "-");
        let url = `/category/${makeUrl}`;

        // console.log("@@@@", categoryPostTag);

        const firstBlogPosts = categoryPosts.slice(0, 6);

        return (
          <section className={styles.categoryPosts} key={i}>
            <div className={styles.viewMoreSection}>
              <div className={styles.viewMoreSection1}>
                <h2>
                  {post} ({categoryPosts.length})
                </h2>
                <Link href={url} passHref>
                  <p>View All</p>
                </Link>
              </div>

              <div></div>
            </div>

            <div className={styles.categoryWrapper}>
              <div className={styles.blogWrap}>
                {firstBlogPosts.map(
                  ({ id, date, title, author, headerImg, desc }) => {
                    let url = `/${id}`;

                    let amakeUrl = author.toLowerCase().replace(/\s+/g, "-");
                    let aurl = `/author/${amakeUrl}`;
                    return (
                      <div key={id}>
                        <div className={styles.blog}>
                          <div className="bgWrap">
                            <Image
                              src={headerImg}
                              width="300"
                              height="180"
                              alt={categoryPosts.id}
                              className={styles.categoryPostImg}
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </div>
                        <div className={styles.profileWrap}>
                          <Link href={url} passHref>
                            <h4>{title}...</h4>
                          </Link>
                          <p>{desc.substring(0, 60)}...</p>
                          <Link href={url} passHref>
                            <span>Read More</span>
                          </Link>
                          <div className={styles.authordiv}>
                            <hr className={styles.hrline} />
                            <Link href={aurl}>
                              <p>
                                {date} <b>By</b>
                                <span>{author}</span>
                              </p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
              {/*side bar map function ------start------*/}
              {i === 0 && (
                <div className={styles.categoryPostRightSide}>
                  <div className={styles.categoryPost}>
                    <div className={styles.rightCategoryPostFirst}>
                      {allPostsData
                        .slice(10, 20)
                        .map(({ id, date, title, author, category, desc }) => {
                          let url = `/${id}`;
                          let tUrl = `/category/${category
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`;

                          return (
                            <div key={id}>
                              <a href={url} target="_blank" rel="noreferrer">
                                <p>{title}</p>
                              </a>
                              <div className={styles.rightCategoryPostSecond}>
                                <p>{date}</p>
                                <Link
                                  href={tUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className={styles.link}
                                >
                                  <p className={styles.tagSpan}>{category}</p>
                                </Link>
                              </div>
                              <hr className={styles.hrline} />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
