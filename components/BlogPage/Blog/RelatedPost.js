import React from "react";
import styles from "../../../src/styles/blog.module.css";
import { IoTimeOutline } from "react-icons/io5";
const RelatedPost = ({ posts }) => {
  return (
    <div>
      <h1 className={styles.rpH1}>Related Posts</h1>
      <div className={styles.relatePost}>
        {posts.map((post, i) => {
          return (
            <div className={styles.rPost} key={i}>
              <a href={post.id}>
                {" "}
                <h5>{post.title}</h5>
              </a>
              <span>
                {post.author}
                <p className={styles.rPostD}>
                  <IoTimeOutline className={styles.timeIcon} />
                  {post.date}
                </p>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPost;
