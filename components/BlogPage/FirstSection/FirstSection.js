import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./FirstSection.module.css";

function FirstSection({
  title,
  img,
  author,
  category,
  time,
  date,
  publish,
  postData,
  descs,
  authorimg,
}) {
  let makeUrl = postData.author.toLowerCase().replace(/\s+/g, "-");
  let aurl = `/author/${makeUrl}`;
  // console.log(allPostsData);
  return (
    <>
      <div className={styles.upperBanner}>
        <div>
          <div className={styles.banner}>
            <div className={styles.divFirst}>
              <div className="bgWrap">
                <Image src={img} alt="Blog banner image" fill={true} />
              </div>
            </div>
            <div className={styles.divSecond}>
              <p className={styles.headP}>{category}</p>
              <Link href={aurl}>
                <h2 className={styles.headH2}>{title}</h2>
              </Link>
              <p className={styles.bottomP}>{descs}</p>

              <div className={styles.imgText}>
                <div className={styles.imgC}>
                  <div className={styles.profileImg}>
                    <div className="imgWrapper">
                      <Image
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstSection;
