import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./MainCategorySection.module.css";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { MdArrowDropDown } from "react-icons/md";
import dynamic from "next/dynamic";
import { sortByDate } from "@/utils";
const Button = dynamic(() => import("../../Button/Button"));

function MainCategorySection({ categoryPosts, categoryPostTag, id }) {
  const router = useRouter();
  const [search, setSearch] = useState();
  const [ParantList, setParantList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [list, setList] = useState("");
  const [categoryBlog, setCategoryBlog] = useState(categoryPosts);
  const [blogTag, setblogTag] = useState("empty");
  const changePage = (url) => {
    router.push(url);
  };

  function findSerach(value) {
    setSearch(value.target.value);
  }

  useEffect(() => {
    const fetchCertificateId = async () => {
      const data = await fetch("/api/sendBlog", {
        method: "GET",
      });

      if (data.status === 200) {
        const { blogData } = await data.json();
        blogData.map((data, index) => {
          return ParantList.push(data.parantcategory);
        });
        const categoryPosts = blogData.filter(
          (post) =>
            post.parantcategory.toLowerCase().replace(/\s+/g, "-") === id
        );
        blogTag === "empty"
          ? setCategoryBlog(categoryPosts.sort(sortByDate))
          : setCategoryBlog(
              categoryPosts
                .filter((post) => post.category === blogTag)
                .sort(sortByDate)
            );
      }
    };
    fetchCertificateId();
  }, [blogTag]);

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

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const [visible, setVisible] = useState(3);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };
  return (
    <>
      <div className={styles.upperDiv}>
        <div className={styles.innerP}>
          <Link href="https://www.learnbay.co/">
            <p>Home&nbsp; {">"}</p>
          </Link>
          <Link href="/">
            <p>&nbsp;&nbsp;Blog&nbsp; {">"}</p>
          </Link>
          <Link href="#">
            <p>&nbsp;&nbsp;{categoryPosts[0].parantcategory}</p>
          </Link>
        </div>
        <div className={styles.btnsFlex}>
          <div>
            <div
              className={styles.select}
              onClick={() => {
                setList(!list);
              }}
            >
              <p className={styles.dropDownCatName}>
                {categoryPosts[0].parantcategory}
              </p>
              <MdArrowDropDown />
            </div>
            {list ? (
              <div className={styles.listWrap}>
                {Array.from(new Set(ParantList)).map((parantcategory, i) => {
                  const makeUrl = parantcategory
                    .toLowerCase()
                    .replaceAll(" ", "-");
                  const url = `/blog/category/${makeUrl}`;
                  return (
                    <p
                      key={i}
                      onClick={() => {
                        setList(false);
                        changePage(url);
                      }}
                    >
                      {parantcategory}
                    </p>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
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
                pathname: "/blog/Search",
                query: { q: search?.toLowerCase() },
              }}
              id="myBtn"
            ></Link>
          </div>
        </div>
      </div>
      <section className={styles.categoryWrapper}>
        <div className={styles.blogWrap}>
          {categoryBlog
            .slice(0, visible)
            .map(({ id, date, title, author, desc, headerImg }, index) => {
              const url = `/blog/${id}`;
              return (
                <div key={index} className={styles.blogUpper}>
                  <div className={styles.profileWrap}>
                    <Link href={url} passHref>
                      <h4>{title}</h4>
                      <p>{desc}</p>
                      <br />
                      <hr className={styles.hrline} />
                      <span>Read More</span>

                      <div className={styles.authordiv}>
                        <div className={styles.botCont}>
                          <p>{date}</p>{" "}
                          <p>
                            <b>By</b>
                            <span>{author}</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className={styles.blog}>
                    <div className="bgWrap">
                      <Image
                        src={headerImg}
                        fill={true}
                        priority={true}
                        alt={title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.categoryPostImg}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          <div className={styles.loadMore} onClick={showMoreItems}>
            <Button className={styles.outLineBtn} text="Load More..." />
          </div>
        </div>
        <div className={styles.rightSide}>
          {categoryPostTag.map((data, index) => {
            return (
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setblogTag(data);
                }}
                key={index}
              >
                {data}
              </p>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default MainCategorySection;
