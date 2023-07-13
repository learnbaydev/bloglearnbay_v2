import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./FirstSection.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Search } from "../../search";

import { Pagination, FreeMode } from "swiper";
import { CiSearch } from "react-icons/ci";

function FirstSection({ allPostsData }) {
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

  return (
    <>
      <div className={styles.upperDiv}>
        <div className={styles.innerP}>
          <Link href="#featured">
            <p>FEATURED BLOG POSTS</p>
          </Link>
          <Link href="#data-science">
            <p>DATA SCIENCE & BUSINESS ANALYTICS</p>
          </Link>
          <Link href="#software">
            <p>SOFTWARE DEVELOPMENT</p>
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
                pathname: "/blog/Search",
                query: { q: search?.toLowerCase() },
              }}
              id="myBtn"
            ></Link>
          </div>
        </div>
      </div>
      <div className={styles.upperBanner}>
        <Swiper
          slidesPerView={1}
          spaceBetween={40}
          // freeMode={true}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          loop={true}
          grabCursor={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {allPostsData
            .slice(0, 9)
            .map(
              ({
                id,
                date,
                title,
                author,
                category,
                headerImg,
                desc,
                authorimg,
              }) => {
                const url = `/blog/${id}`;
                let makeUrl = author.toLowerCase().replace(/\s+/g, "-");
                let aurl = `/blog/author/${makeUrl}`;
                return (
                  <SwiperSlide key={id}>
                    <div className={styles.banner}>
                      <div className={styles.divFirst}>
                        <div className="bgWrap">
                          <Image src={headerImg} alt={title} fill={true} />
                        </div>
                      </div>
                      <div className={styles.divSecond}>
                        <p className={styles.headP}>{category}</p>
                        <Link href={url}>
                          <h2 className={styles.headH2}>{title}</h2>
                        </Link>
                        <p className={styles.bottomP}>{desc}</p>
                        {/* <p className={styles.bottomP}>{postData.bottomP}</p> */}
                        <div className={styles.imgText}>
                          <div className={styles.imgC}>
                            <div className={styles.profileImg}>
                              <div className="imgWrapper">
                                <Image
                                  // src={postData.imgC}
                                  src={authorimg}
                                  width="71"
                                  height="71"
                                  alt={author}
                                />
                              </div>
                            </div>
                            <div className={styles.insDate}>
                              <Link href={aurl}>
                                <p className={styles.PH}>{author}</p>
                              </Link>
                              <p className={styles.pD}>{date}</p>
                            </div>
                          </div>
                          <Link href={url}>
                            <p className={styles.readMore}>Read More...</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              }
            )}
        </Swiper>
      </div>
    </>
  );
}

export default FirstSection;
