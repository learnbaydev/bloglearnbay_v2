import React, { useState } from "react";
import styles from "./CategorySection.module.css";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import dynamic from "next/dynamic";
const Button = dynamic(() => import("../../Button/Button"));

function CategorySection({ categoryPosts, categoryPostTag }) {
  const [search, setSearch] = useState();
  function findSerach(value) {
    setSearch(value.target.value);
  }
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
          <Link href="#">
            <p>Home&nbsp; {">"}</p>
          </Link>
          <Link href="#">
            <p>&nbsp;&nbsp;Blog&nbsp; {">"}</p>
          </Link>
          <Link href="#">
            <p>&nbsp;&nbsp;Data Science</p>
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
                return (
                  <div key={index} className={styles.blogUpper}>
                    <div className={styles.profileWrap}>
                      <Link href={url} passHref>
                        <h4>{title}</h4>
                        <p>{desc}</p>

                        <span>Read More</span>

                        <div className={styles.authordiv}>
                          <hr className={styles.hrline} />
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
                          // alt={categoryPosts.id}
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

export default CategorySection;
