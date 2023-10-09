import React from "react";
import { getBlog } from "../../api/Blogs";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "react-loading-skeleton/dist/skeleton.css";
import Head from 'next/head'

export default function Blog(props) {
    const blog = props.data
    return (
        <div
            className={`w-full h-screen bg-back pt-20 dark:bg-background dark:text-mainText/90`}
        >
            <Head>
                <title>{`${blog.title.rendered} | Aakhyaan Academy`}</title>
                <meta
                    name="description"
                    content={blog?.excerpt?.rendered}
                />
                <meta name="keywords" content={`${blog.title.rendered}`} />
                <meta property="og:title" content={`${blog.title.rendered} | Aakhyaan Academy`} key="ogtitle" />
                <meta property="og:description" content={blog?.excerpt?.rendered} key="ogdesc" />
            </Head>
            <Header page="blog" />
            <div className="w-full min-h-full py-10 px-[10%] bg-back dark:bg-background">
                <div
                    dangerouslySetInnerHTML={{ __html: blog?.title?.rendered }}
                    className="text-center text-4xl"
                ></div>
                <div
                    className="mt-10 blog"
                    dangerouslySetInnerHTML={{ __html: blog?.content?.rendered }}
                ></div>
            </div>
            <Footer />
        </div>
    );
}


export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    let data = await getBlog(`https://news-api.aakhyaan.org/wp-json/wp/v2/posts/${context.query.id}`)

    return {
        props: { data }
    }
}