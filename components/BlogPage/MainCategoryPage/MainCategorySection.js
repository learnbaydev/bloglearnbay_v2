import React, { useState, useEffect } from "react";
import styles from "./MainCategorySection.module.css";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import dynamic from "next/dynamic";
const Button = dynamic(() => import("../../Button/Button"));

function MainCategorySection({ categoryPosts, categoryPostTag }) {
  const [search, setSearch] = useState();
  function findSerach(value) {
    setSearch(value.target.value);
  }

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
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const [visible, setVisible] = useState(3);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 9);
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
            <p>&nbsp;&nbsp;{categoryPosts[0].category}</p>
          </Link>
        </div>
        <div className={styles.btnsFlex}>
          <div>
            <select
              id="Categories"
              value={selectedOption}
              onChange={handleOptionChange}
              className={styles.btdfdd}
            >
              <option value="">Categories</option>
              <option value="Data-Science">Data Science</option>
              <option value="Software-Development">Software Development</option>
            </select>
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
                pathname: "/Search",
                query: { q: search?.toLowerCase() },
              }}
              id="myBtn"
            ></Link>
          </div>
        </div>
      </div>
      <section className={styles.categoryWrapper}>
        <div className={styles.blogWrap}>
          {categoryPosts
            .slice(0, 4)
            .map(
              (
                { id, date, title, author, desc, headerImg, categoryPosts },
                index
              ) => {
                const url = `/${id}`;
                let amakeUrl = author.toLowerCase().replace(/\s+/g, "-");
                let aurl = `/author/${amakeUrl}`;

                return (
                  <div key={index} className={styles.blogUpper}>
                    <div className={styles.profileWrap}>
                      <Link href={url} passHref>
                        <h4>{title}</h4>
                        <p>{desc}</p>

                        <span>Read More</span>
                      </Link>

                      <Link href={aurl} passHref>
                        <div className={styles.authordiv}>
                          <hr className={styles.hrline} />
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
                    <Link href={url} passHref>
                      <div className="bgWrap">
                          <Image
                            src={headerImg}
                            fill={true}
                            // alt={categoryPosts.id}
                            className={styles.categoryPostImg}
                            style={{ objectFit: "cover" }}
                          />
                      </div>
                      </Link>
                    </div>
                  </div>
                );
              }
            )}
          <div className={styles.loadMore} onClick={showMoreItems}>
            <Button className={styles.outLineBtn} text="Load More..." />
          </div>
        </div>
        <div className={styles.rightSide}>
          {categoryPostTag.map((data, index) => {
            let makeUrl = data.toLowerCase().replace(/\s+/g, "-");
            let url = `/category/${makeUrl}`;
            return (
              <Link href={url}>
                <p key={index}>{data}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default MainCategorySection;
