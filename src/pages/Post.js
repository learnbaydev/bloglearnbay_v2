import styles from "../styles/blogM.module.css";
import Image from "next/image";
import { BsDot } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";

export default function Post({ post }) {
  const date = new Date(post.frontMatter?.date);
  return (
    <>
      <section>
        <div
          className={styles.blog}
          style={{
            background: `linear-gradient(0deg, rgba(0,0,0,0.8) 34%, rgba(255,255,255,0) 200%), url(${post.frontMatter.image}) no-repeat center center `,
            backgroundSize: "cover",
          }}
        >
          <a href={`/${post.slug}`}>
            <h4>{post.frontMatter.title}</h4>
          </a>
          <div className={styles.profileWrap}>
            <Image
              src="https://learnbay-wb.s3.ap-south-1.amazonaws.com/main-blog/avatar-02.webp"
              width="80"
              height="45"
              layout="intrinsic"
              alt="blog_writer"
              className={styles.blogIMg}
            />
            <span>
              <h5>{post.frontMatter.author}</h5>
              <p>
                {post.frontMatter.date} <BsDot className={styles.dot} />
                <IoTimeOutline className={styles.time} />
                {post.frontMatter.readTime}
              </p>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

// export async function getStaticProps(_context) {

//   const post = getSortedPostsData();

//   return {
//     props: {
//       post: post.sort(sortByDate),
//     },
//   };
// }
