import React, { useEffect, useState, useRef } from "react";
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

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchResultRef = useRef(null);

  function findSearch(value) {
    const inputValue = value.target.value;
    setSearch(inputValue);

    // Filter suggestions based on input value
    const filteredSuggestions = allPostsData.filter((post) =>
      post.title.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  }

  useEffect(() => {
    // Function to handle clicks outside of search result container
    function handleClickOutside(event) {
      if (searchResultRef.current && !searchResultRef.current.contains(event.target)) {
        setSuggestions([]); // Hide the search result dropdown
      }
    }

    // Add event listener to handle clicks outside of the search result container
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={styles.upperDiv}>
        <div className={styles.innerP}>{/* Your links here */}</div>
        <div className="col-lg-4">
          <div className={styles.formControl}>
            <CiSearch />
            <div className={styles.searchContainer}>
              <input
                id="myInput"
                onChange={findSearch}
                value={search}
                type="text"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-search"
                className={styles.searchInput}
              />
            </div>
            <Link
              href={{
                pathname: "/blog/Search",
                query: { q: search?.toLowerCase() },
              }}
              id="myBtn"
            ></Link>
          </div>
          {search && suggestions.length > 0 && (
            <div ref={searchResultRef} className={styles.searchResultContainer}>
              {suggestions.map((post, index) => (
                <div className={styles.searchResultItem} key={index}>
                  <Link href={`/blog/${post.id}`}>
                    <ul>
                      <li>{post.title}</li>
                    </ul>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {[...categoryPostTag].map((post, i) => {
        let tag = post;

        const categoryPosts = allPostsData.filter(
          (post) => post.parantcategory === tag
        );
        let makeUrl = post.toLowerCase().replace(/\s+/g, "-");
        let url = `/blog/category/${makeUrl}`;

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
                    let url = `/blog/${id}`;
                    let amakeUrl = author.toLowerCase().replace(/\s+/g, "-");
                    let aurl = `/blog/author/${amakeUrl}`;
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
                          let url = `/blog/${id}`;
                          let tUrl = `/blog/category/${parantcategory
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`;

                          return (
                            <div key={id}>
                              <Link href={url}>
                                <div>{title}</div>
                              </Link>
                              <div className={styles.rightCategoryPostSecond}>
                                <p>{date}</p>
                                <Link href={tUrl} className={styles.link}>
                                  <div className={styles.tagSpan}>
                                    {parantcategory}
                                  </div>
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
