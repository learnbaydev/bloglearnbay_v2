import React, { useState, useEffect } from "react";
import fs from "fs";
import path from "path";
import { NextSeo } from "next-seo"; // Add this import statement
import matter from "gray-matter";
import { getSortedPostsData } from "../../../../lib/posts";
import styles from "../../../../components/BlogPage/MainCategoryPage/MainCategorySection.module.css";
import Head from "next/head";
import Image from "next/image";
import { sortByDate } from "../../../utils";
import authorstyle from "../../../styles/author.module.css";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
import Navbar from "../../../../components/Navbar/Navbar";
import Footer from "../../../../components/Footer/Footer";
import dynamic from "next/dynamic";

const Button = dynamic(() => import("../../../../components/Button/Button"));

export default function CategoryBlog({ categoryPosts }) {
  const [visible, setVisible] = useState(9);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 9);
  };

  const authortitle = categoryPosts[0]?.authortitle || "";

  const adesc = categoryPosts[0]?.adesc || "";
  return (
    <>
      <NextSeo
        title={`${authortitle}`}
        description={`${adesc}`}
        // Add other SEO properties as needed
      />

      <Head>
        {categoryPosts.slice(0, 1).map(({ author, categoryPosts }) => {
          let makeUrl = author.toLowerCase().replace(/\s+/g, "-");
          const canonical = "https://blog.learnbay.co/author/" + makeUrl;
          return <link rel="canonical" href={canonical} />;
        })}
        <link
          rel="icon"
          href="https://dye9dtwtg1p5q.cloudfront.net/main/Learnbay-Favicon-L.png"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Navbar />

      <div className={authorstyle.mdiv}>
        <div className={authorstyle.mcircle}>
          <Image
            src={categoryPosts[0].authorimg}
            alt={categoryPosts[0].authorimg}
            priority={true}
            width={170}
            height={170}
            className={authorstyle.circle}
          />
        </div>

        <div className={authorstyle.m1div}>
          <div className={authorstyle.m2div}>
            <h1>{categoryPosts[0].author}</h1>
          </div>
          <div className={authorstyle.social}>
            <Link href={categoryPosts[0].authorlinkedin}>
              <FaLinkedinIn className={authorstyle.bIcons} />
            </Link>
          </div>
          <div className={authorstyle.adesc}>
            <p> &quot;{categoryPosts[0].authordesc}&quot;</p>
          </div>
        </div>
      </div>

      <section className={styles.blogWrapPost}>
        {categoryPosts
          .slice(0, visible)
          .map(
            ({
              id,
              date,
              title,
              author,
              readTime,
              headerImg,
              categoryPosts,
              desc,
            }) => {
              const url = `/blog/${id}`;
              return (
                <div>
                  <div className={styles.blog}>
                    <div className={styles.bImg}>
                      <Image
                        src={`${headerImg}`}
                        width="500"
                        height="180"
                        alt={id}
                        className={styles.categoryPostImgPost}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className={styles.profileWrapPost}>
                    <Link href={`${url}`} passHref>
                      <h4>{title.substring(0, 60)}</h4>
                    </Link>
                    <p>{desc.substring(0, 60)}...</p>
                    <Link href={`${url}`} passHref>
                      <span>Read More</span>
                    </Link>
                    <div className={styles.authordiv}>
                      <hr className={styles.hrline} />
                      <Link href={`${url}`}>
                        <p className={styles.authP}>
                          {date} <b>By</b>
                          <span>{author}</span>
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }
          )}
      </section>
      <div
        onClick={showMoreItems}
        style={{
          marginBottom: "70px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button text="Load More..." />
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const categories = files.map((fileName) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", fileName),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);
    const categoryLower = frontMatter.author.toLowerCase();
    let categoryUrl = categoryLower.replace(/\s+/g, "-");

    return categoryUrl;
  });

  const paths = categories.map((author) => ({
    params: { id: author },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const allPostsData = getSortedPostsData();

  //Filter post by categories
  const categoryPosts = allPostsData.filter(
    (post) => post.author.toLowerCase().replace(/\s+/g, "-") === id
  );

  return {
    props: {
      categoryPosts: categoryPosts.sort(sortByDate),
    },
  };
}
