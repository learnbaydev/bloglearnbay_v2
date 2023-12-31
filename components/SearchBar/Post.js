import styles from "../BlogPage/MainCategoryPage/MainCategorySection.module.css"
import Image from "next/image";
import Link from "next/link";



export default function Post({ post }) {
  const date = new Date(post.frontmatter?.date);
 
  return (
    <>
      <div className={styles.blogWrap1}>
        <div>
          <div className={styles.blog}>
            <div className={styles.bImg}>
              <Image
                src={`${post.frontmatter.image}`}
                width="500"
                height="180"
                alt={post.frontmatter.id}
                className={styles.categoryPostImgPost}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className={styles.profileWrapPost}>
            <Link href={`/blog/${post.slug}`} passHref>
              <h4>{post.frontmatter.title.substring(0, 60)}</h4>
            </Link>
            <p>{post.frontmatter.description.substring(0, 60)}...</p>
            <Link href={`/blog/${post.slug}`} passHref>
              <span>Read More</span>
            </Link>
            <div className={styles.authordiv}>
              <hr className={styles.hrline} />
              <Link href={`/blog/${post.slug}`}>
                <p className={styles.authP}>
                  
                  {post.frontmatter.date} <b>By</b>
                  <span>{post.frontmatter.author}</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
