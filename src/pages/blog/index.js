import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import generateRssFeed from "../../../lib/generateRss";
import generateCategoryRssFeed from "../../../lib/geneRateCategoryRss";
import { getSortedPostsData } from "../../../lib/posts";
import { sortByDate } from "../../utils";
import FirstSection from "../../../components/BlogPage/HomePage/FirstSection/FirstSection";
import CourseSection from "../../../components/BlogPage/CourseSection/CourseSection";
import CategorySection from "../../../components/BlogPage/HomePage/CategorySection/CategorySection";
import BottomBar from "../../../components/BottomBar/BottomBar";

export default function blog({ allPostsData, categoryPostTag }) {

  return (
    <div>
      <Head>
        <title>
          LearnBay Blogs - Latest Career Upskilling Trends and Learning
          Resources
        </title>

        <meta
          name="description"
          content="Stay Ahead with LearnBay Blogs on Upskilling Resources & IT Careers in AI, Data Science, Machine Learning & Full Stack Development For Learners & Professionals "
        />
        <link href="" />
        <meta
          name="google-site-verification"
          content="q2xA2OZrvhAj8r1YGNF_3x5m5GuWCqo9rNb7atG4mXU"
        />
        <link
          rel="icon"
          href="https://learnbay-ver.s3.us-east-2.amazonaws.com/learnbay-blog-v2/website-icon_blog.webp"
        />
        <link rel="canonical" href="https://blog.learnbay.co/" />
        <meta name="publisher" content="Learnbay" />
        <meta name="keywords" content="Learnbay Blogs" />
        <meta name="robots" content="index, follow" />
      </Head>
      <main>
        <Navbar popup={true} dataScienceCounselling={true} />
        <FirstSection allPostsData={allPostsData} />
        <CategorySection
          categoryPostTag={categoryPostTag}
          allPostsData={allPostsData}
        />
        {/* <CourseSection /> */}
        <Footer />
      </main>
    </div>
  );
} 

export async function getStaticProps(_context) {
  await generateRssFeed();
  await generateCategoryRssFeed();
  const allPostsData = getSortedPostsData();
  let singleCategoryPost = allPostsData.map((post) => {
    return post.parantcategory;
  });
  let categoryPostTag = Array.from(new Set(singleCategoryPost));

  return {
    props: {
      allPostsData: allPostsData.sort(sortByDate).slice(0, 10),
      categoryPostTag,
    },
  };
}
 