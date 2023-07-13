import Post from "../../components/BlogPage/Post";
import search from "../../search.json";
import { useRouter } from "next/router";
import styles from "../styles/blogM.module.css";
import Sidebar from "../../components/BlogPage/Sidebar";

export default function Search() {
  const { query } = useRouter();
  const TempPosts = [];

  search.map((post) => {
    if (post.frontMatter.draft === false) {
      if (
        post.frontMatter.title.toLowerCase().includes(query.q) ||
        post.frontMatter.slug.toLowerCase().includes(query.q) ||
        post.frontMatter.description.toLowerCase().includes(query.q) ||
        post.frontMatter.author.toLowerCase().includes(query.q)
      ) {
        TempPosts.push(post);
      } else {
        TempPosts.push(null);
      }
    }
  });

  //   remove null in posts
  const posts = TempPosts.filter((path) => {
    return path && path;
  });

  // console.log("AAAA", posts)

  return (
    <>
      <br />
      <br />
      <br />

      <section className={styles.blogHead}>
        <p>Results for: &apos;{`${query.q}`}.&apos; </p>
        <Sidebar />
      </section>
      <section className={styles.blogWrap}>
        {posts.length > 0 ? (
          posts.map((post, index) => <Post key={index} post={post} />)
        ) : (
          <div>
            <h2>{query.q ? `No result found.` : "loadding.. "}</h2>
          </div>
        )}
      </section>
    </>
  );
}
