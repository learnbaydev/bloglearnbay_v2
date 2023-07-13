import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./FirstSection.module.css";

function FirstSection({ allPostsData }) {
  console.log(allPostsData);
  return (
    <>
      {/* <div className={styles.upperBanner}>
        {allPostsData.map(
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
            const url = `/${id}`;
            let makeUrl = author.toLowerCase().replace(/\s+/g, "-");
            let aurl = `/author/${makeUrl}`;
            return (
              <div key={id}>
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
            );
          }
        )}
      </div> */}
    </>
  );
}

export default FirstSection;
