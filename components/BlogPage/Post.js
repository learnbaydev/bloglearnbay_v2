import { sortByDate, slugify } from "../../src/utils";
import Link from "next/link";
// import { getSortedPostsData } from "../lib/posts";
import styles from "./CategoryPage/CategorySection.module.css";
import Image from "next/image";
// import { BsDot } from "react-icons/bs";
// import Head from "next/head";
// import { IoTimeOutline } from "react-icons/io5";

export default function Post({ post }) {
  const date = new Date(post.frontMatter?.date);

  console.log("@@@@@@@", post.frontMatter.image);

  return (
    <>
      <div className={styles.blogWrap}>
        <div>
          <div className={styles.blog}>
            <div className="bgWrap">
              <Image
                src={`${post.frontMatter.image}`}
                width="300"
                height="180"
                alt={post.frontMatter.id}
                className={styles.categoryPostImg}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className={styles.profileWrap}>
            <Link href={`/${post.slug}`} passHref>
              <h4>{post.frontMatter.title}...</h4>
            </Link>
            <p>{post.frontMatter.desc}...</p>
            <Link href={`/${post.slug}`} passHref>
              <span>Read More</span>
            </Link>
            <div className={styles.authordiv}>
              <hr className={styles.hrline} />
              <Link href={`/${post.slug}`}>
                <p>
                  {post.frontMatter.date} <b>By</b>
                  <span>{post.frontMatter.author}</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
