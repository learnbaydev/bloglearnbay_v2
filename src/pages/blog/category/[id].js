import React from "react";
import fs from "fs";
import { NextSeo } from "next-seo"; // Add this import statement
import path from "path";
import matter from "gray-matter";
import { getSortedPostsData } from "../../../../lib/posts";
import Head from "next/head";
import { sortByDate } from "../../../utils";
import Navbar from "../../../../components/Navbar/Navbar";
import Footer from "../../../../components/Footer/Footer";
import CategorySection from "../../../../components/BlogPage/MainCategoryPage/MainCategorySection";
import CourseSection from "../../../../components/BlogPage/CourseSection/CourseSection";
import BottomBar from "../../../../components/BottomBar/BottomBar";

export default function CategoryBlog({ categoryPosts, categoryPostTag, id }) {
  const cattitle = categoryPosts[0]?.cattitle || "";
  const catdesc = categoryPosts[0]?.catdesc || "";

  return (
    <>
      <NextSeo
        title={`${cattitle}`}
        description={`${catdesc}`}
        // Add other SEO properties as needed
      />

      <Head>
        {/* {categoryPosts.slice(0, 1).map(({ category, categoryPosts }, index) => {
          let makeUrl = category.toLowerCase().replace(/\s+/g, "-");
          const canonicalUrl = "https://blog.learnbay.co/category/" + makeUrl;
          return <Link key={index} rel="canonical" href={canonicalUrl} />;
        })} */}
        {/* <html lang="en" /> */}
        <meta name="robots" content="index, follow" />
        <link
          rel="icon"
          href="https://dye9dtwtg1p5q.cloudfront.net/main/Learnbay-Favicon-L.png"
        />
      </Head>

      <Navbar />
      <CategorySection
        categoryPosts={categoryPosts}
        id={id}
        categoryPostTag={categoryPostTag}
      />
      <CourseSection />

      <Footer />
      <BottomBar radio={true} />
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
    const categoryLower = frontMatter.parantcategory.toLowerCase();
    let categoryUrl = categoryLower.replace(/\s+/g, "-");
    return categoryUrl;
  });

  const paths = categories.map((category) => ({
    params: { id: category },
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
    (post) => post.parantcategory.toLowerCase().replace(/\s+/g, "-") === id
  );
  let singleCategoryPost = categoryPosts.map((post) => {
    return post.category;
  });
  let categoryPostTag = Array.from(new Set(singleCategoryPost));
  return {
    props: {
      categoryPosts: categoryPosts.sort(sortByDate).slice(0, 5),
      categoryPostTag,
      id,
    },
  };
}
