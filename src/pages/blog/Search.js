import Head from 'next/head'
import Post from '../../../components/SearchBar/Post'
import search from "../../../components/SearchBar/search.json";
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';
import { sortByDate, ImageUrl } from '../../utils'
import styles from "../../../src/styles/blogM.module.css";
import Sidebar from "../../../components/SearchBar/Sidebar"
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';

export default function Search() {
    const { query } = useRouter()
    const TempPosts = []

    search.map(
        (post) => {
            if (post.frontmatter.draft === false) {
                if (post.frontmatter.title.toLowerCase().includes(query.q) || post.frontmatter.slug.toLowerCase().includes(query.q) || post.frontmatter.description.toLowerCase().includes(query.q) || post.frontmatter.author.toLowerCase().includes(query.q)) {
                    TempPosts.push(post)
                } else {
                    TempPosts.push(null)
                }
            }
        }
    )

    //   remove null in posts 
    const posts = TempPosts.filter(
        path => {
            return path && path
        }
    )

    return (
        <>
        <Navbar />
            <br /><br /><br />

            <section className={styles.blogHead}>
                <p>Results for:  &apos;{`/blog/${query.q}`}.&apos; </p>
                <Sidebar />

            </section>
            <section className={styles.blogWrapPost} >
                {


                    posts.length > 0 ?
                        posts.map((post, index) => (
                            <Post key={index} post={post} />
                        )) : <div>
                            <h2>
                                {query.q ? `No result found.` : 'loadding.. '}
                            </h2>
                        </div>

                }

            </section>
            <Footer />
        </>
    )
}


