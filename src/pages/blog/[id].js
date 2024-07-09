import {
  getAllPostIds,
  getPostData,
  getSortedPostsData,
} from "../../../lib/posts";
import Head from "next/head";
import styles from "../../styles/blog.module.css";
import { sortByDate } from "../../utils";
import Socialshare from "../../../components/BlogPage/Socialshare/Socialshare";
import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import dynamic from "next/dynamic";
const CategorySection = dynamic(() =>
  import("../../../components/BlogPage/Blog/Category/CategorySection")
);
const FirstSection = dynamic(() =>
  import("../../../components/BlogPage/FirstSection/FirstSection")
);
const BottomBar = dynamic(() => import("../../../components/BottomBar/BottomBar"));

const RightSideData = dynamic(() =>
  import("../../../components/BlogPage/Blog/RightSideData")
);

export default function Post({ postData }) {
  return (
    <>
      <section className={styles.MainS}>
        <Head>
          <link
            rel="icon"
            href="https://dye9dtwtg1p5q.cloudfront.net/main/Learnbay-Favicon-L.png"
          />
          <title>{postData.stitle}</title>

          <meta name="description" content={postData.desc} />

          <meta name="keywords" content={postData.tag} />
          <link
            rel="canonical"
            href={"https://blog.learnbay.co/" + postData.id}
          />
          <meta name="author" content={postData.author} />

          <meta name="publisher" content="Learnbay" />

          <meta
            property="article:published_time"
            content={postData.published_time}
          />

          <meta
            property="article:modified_time"
            content={postData.modified_time}
          />

          <meta name="robots" content="index, follow" />

          <link href="https://dye9dtwtg1p5q.cloudfront.net/web/s3_main/cloud-computing/website-icon.webp" />
        </Head>

        <Navbar />

        <FirstSection
          postData={postData}
          descs={postData.desc}
          title={postData.mainH1}
          img={postData.img}
          author={postData.author}
          authorimg={postData.authorimg}
          category={postData.category}
          time={postData.time}
          publish={postData.publish}
          date={postData.date}
        />
      </section>

      <main>
        <div className={styles.Open}>
          <div className={styles.bodyInfo}>
            <div>
              <div className={styles.sticky}>
                <RightSideData table={postData.table} />
              </div>
            </div>
            <div className={styles.blogdiv1}>
              <div className={styles.leftInfo}>
                <article dangerouslySetInnerHTML={{ __html: postData.body }} />
                <hr />

                <div>
                  <Socialshare postData={postData} />
                </div>

                <hr />
              </div>
            </div>
            <div>
              <div className={styles.sticky}>
                <CategorySection />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomBar radio={true} />
    </>
  );
}
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const posts = getSortedPostsData();
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
