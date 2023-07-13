import React, { useEffect, useState } from "react";
import styles from "./CategorySection.module.css";
import Link from "next/link";

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
      <section className={styles.categoryPosts}>
        <div className={styles.categoryWrapper}>
          {
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
          }
        </div>
      </section>
    </>
  );
}
