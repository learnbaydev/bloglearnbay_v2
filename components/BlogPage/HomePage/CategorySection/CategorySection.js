import React, { useEffect, useState } from "react";
import styles from "./CategorySection.module.css";
import Link from "next/link";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { Search } from "../../../SearchBar/search";
import { sortByDate } from "@/utils";

export default function CategorySection({ categoryPostTag }) {
  const [allPostsData, setAllBlogPostsData] = useState([]);
  useEffect(() => {
    const fetchCertificateId = async () => {
      const data = await fetch("/api/sendBlog", {
        method: "GET",
      });

      if (data.status === 200) {
        const { blogData } = await data.json();
        setAllBlogPostsData(blogData.sort(sortByDate));
      }
    };
    fetchCertificateId();
  }, []);

  const [search, setSearch] = useState();
  function findSerach(value) {
    setSearch(value.target.value);
  }
  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(true);
  useEffect(() => {
    //
    var input = document.getElementById("myInput");
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("myBtn").click();
      }
    });
  });

  return (
    <>
      <div className={styles.upperDiv}>
        <div className={styles.innerP}>
          <Link href="#Data Science & BA">
            <p
              className={active2 ? styles.active : styles.inactive}
              onClick={() => {
                setActive(false);
                setActive1(false);
                setActive2(true);
              }}
            >
              DATA SCIENCE & BUSINESS ANALYTICS
            </p>
          </Link>
          <Link href="#Software Development">
            <p
              className={active ? styles.active : styles.inactive}
              onClick={() => {
                setActive(true);
                setActive1(false);
                setActive2(false);
              }}
            >
              SOFTWARE DEVELOPMENT
            </p>
          </Link>
          <Link href="#Hot Topics">
            <p
              className={active1 ? styles.active : styles.inactive}
              onClick={() => {
                setActive1(true);
                setActive(false);
                setActive2(false);
              }}
            >
              HOT TOPICS
            </p>
          </Link>
        </div>
        <div className="col-lg-4">
          <div className={styles.formControl}>
            <CiSearch />
            <input
              id="myInput"
              onChange={findSerach}
              type="text"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-search"
            />

            <Link
              href={{
                pathname: "/Search",
                query: { q: search?.toLowerCase() },
              }}
              id="myBtn"
            ></Link>
          </div>
        </div>
      </div>
      {[...categoryPostTag].map((post, i) => {
        let tag = post;

        const categoryPosts = allPostsData.filter(
          (post) => post.parantcategory === tag
        );
        let makeUrl = post.toLowerCase().replace(/\s+/g, "-");
        let url = `/category/${makeUrl}`;

        const firstBlogPosts = categoryPosts.slice(0, 6);

        return (
          <section className={styles.categoryPosts} key={i}>
            <div className={styles.viewMoreSection} id={post}>
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
                              alt={title}
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
                                {date}
                                <span>
                                  <b>By</b>
                                  {author}
                                </span>
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
                        .map(({ id, date, title, parantcategory }) => {
                          let url = `/${id}`;
                          let tUrl = `/category/${parantcategory
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
                                  <p className={styles.tagSpan}>{parantcategory}</p>
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
