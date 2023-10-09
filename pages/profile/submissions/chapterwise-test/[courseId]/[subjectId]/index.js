import React from "react";
import Header from "../../../../../../components/Header";
import Footer from "../../../../../../components/Footer"
import Breadcrumb from "../../../../../../components/Breadcrumb";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Head from 'next/head'
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import useSWR from "swr";
import { getChapters } from '../../../../../../api/Courses'
import Image from "next/legacy/image";

function Chapters(props) {
    const router = useRouter()
    const id1 = router.query.courseId
    const id2 = router.query.subjectId
    const { data, error } = useSWR(process.env.BACKEND + `/chapters/${id1}/${id2}/list`, async url => await getChapters(url), { revalidateOnFocus: false, revalidateOnReconnect: true, fallbackData: props.props?.data })
    const chapters = data?.data?.chapters

    function imageLoader({ src }) {
        return src
    }

    return (
        <div className={`w-full h-screen bg-back pt-20 dark:bg-background`}>
            <Head>
                <title>{`${data?.data?.subject?.title ? data?.data?.subject?.title + " - " : ""}${data?.data?.course?.title ? data?.data?.course?.title + " - " : ""}Submissions - Chapterwise Test | Aakhyaan Academy`}</title>
                <meta name="keywords" content={`${data?.data?.course?.title}`} />
                <meta property="og:title" content={`${data?.data?.course?.title ? data?.data?.course?.title + " - " : ""}Submissions - Chapterwise Test | Aakhyaan Academy`} key="ogtitle" />
                <meta
                    name="description"
                    content="Check your submission history of the chapterwise tests you have given."
                />
                <meta property="og:description" content="Check your submission history of the chapterwise tests you have given." key="ogdesc" />
            </Head>
            <Header page="programmes" />

            <Breadcrumb props={[{ header: "Submissions", link: "profile/submissions/chapterwise-test" }, { header: `${router.query.program}`, link: `profile/submissions/chapterwise-test/${router.query.courseId}?program=${router.query.program}&programId=${router.query.programId}` }, { header: `${router.query.subject}`, link: `profile/submissions/chapterwise-test/${id1}/${id2}?program=${router.query.program}&programId=${router.query.programId}&subject=${router.query.subject}` }]} />

            <div className="dark:bg-background bg-back flex w-full min-h-full pb-20 px-10 justify-center items-center">
                <div className="flex flex-wrap justify-center gap-10 py-20">
                    {!data && !error ?
                        <>
                            {[...Array(2)].map((val, i) =>
                                <div key={i} >
                                    <div ><Skeleton width={240} height={180} baseColor='gray' /></div>
                                </div>
                            )}
                        </>
                        :
                        <>
                            {chapters ?
                                chapters?.map((chapter, i) =>
                                    <Link
                                        key={i}
                                        href={`/profile/submissions/chapterwise-test/${id1}/${id2}/${chapter._id}/?program=${router.query.program}&programId=${router.query.programId}&subject=${router.query.subject}&chapter=${chapter.title}`}
                                        legacyBehavior>
                                        <a className={`max-w-sm lg:max-w-full flex cursor-pointer hover:translate-y-1 justify-center`}>
                                            {chapter?.thumbnail ?
                                                <div className="ring-1 ring-opacity-5 ring-blue-900 h-full w-[160px] relative">
                                                    <Image
                                                        objectFit="contain"
                                                        layout="fill"
                                                        alt={chapter?.title}
                                                        loader={imageLoader}
                                                        src={chapter?.thumbnail}
                                                    />
                                                </div>
                                                :
                                                <></>
                                            }
                                            <div className="relative shadow-xl h-[180px] w-[160px] md:h-[200px] md:w-[200px] border-transparent border-gray-400 dark:bg-gray-800 bg-back dark:text-mainText/80 rounded-md p-8 flex flex-col justify-between">
                                                <div className="my-auto flex flex-col items-center justify-center">
                                                    {/* <p className="absolute bottom-2 right-2 flex gap-2 text-sm items-center">
                                                <VscUnlock />
                                                <span>Free</span>
                                            </p> */}
                                                    <div className="font-bold text-2xl text-center">{chapter?.title}</div>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                )
                                :
                                <div className="text-warningText text-xl">
                                    {data?.message}
                                </div>
                            }
                        </>
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}


Chapters.getInitialProps = async (context) => {
    const data = await axios.get(process.env.BACKEND + `/chapters/${context.query.courseId}/${context.query.subjectId}/list`,
        {
            withCredentials: true,
            headers: {
                Cookie: context.req?.headers.cookie
            }
        }).then(res => res.data).catch(err => { if (context.res) context.res.statusCode = err?.response?.status; return { success: false, message: err?.response?.data?.message } })
    return {
        props: { data }
    }
}

export default Chapters;