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
            .slice(0, visible)
            .map(
              (
                { id, date, title, author, desc, headerImg, categoryPosts },
                index
              ) => {
                const url = `/${id}`;
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
                            <p>26/05/2023</p>{" "}
                            <p>
                              <b>By</b>
                              <span>Manas Khochar</span>
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
              <Link href={url} key={index}>
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
