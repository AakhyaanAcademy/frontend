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

function Mcqs(props) {
    const router = useRouter()
    const id1 = router.query.courseId
    const id2 = router.query.subjectId
    const id3 = router.query.chapterId
    const { data, error } = useSWR(process.env.BACKEND + `/chapterMcq/${id3}/list`, async url => await getChapters(url), { revalidateOnFocus: false, revalidateOnReconnect: true, fallbackData: props.props?.data })
    const mcqs = data?.data

    function imageLoader({ src }) {
        return src
    }

    return (
        <div className={`w-full h-screen bg-back pt-20 dark:bg-background`}>
            <Head>
            <title>{`${router.query.chapter ? router.query.chapter + " - " : ""}${router.query.subject ? router.query.subject + " - " : ""}${router.query.program ? router.query.program + " | " : ""}Chapterwise Test | Aakhyaan Academy`}</title>
                <meta name="keywords" content={`${data?.data?.course?.title}`} />
                <meta property="og:title" content={`${router.query.chapter ? router.query.chapter + " - " : ""}${router.query.subject ? router.query.subject + " - " : ""}${router.query.program ? router.query.program + " | " : ""}Chapterwise Test | Aakhyaan Academy`} key="ogtitle" />
                <meta
                    name="description"
                    content={`Here are some chapters related to ${data?.data?.course?.title}. Please feel free to enlighten yourself.`}
                />
            </Head>
            <Header page="programmes" />

            <Breadcrumb props={[{ header: "Test ", link: "mcqs" }, { header: `${router.query.program}`, link: `mcqs/${router.query.courseId}?program=${router.query.program}&programId=${router.query.programId}` }, { header: `Chapterwise Test`, link: `mcqs/${router.query.courseId}/chapterwise-test?program=${router.query.program}&programId=${router.query.programId}` }, { header: `${router.query.subject}`, link: `mcqs/${id1}/chapterwise-test/${id2}?program=${router.query.program}&programId=${router.query.programId}&subject=${router.query.subject}` }, { header: `${router.query.chapter}`, link: `mcqs/${id1}/chapterwise-test/${id2}/${id3}?program=${router.query.program}&programId=${router.query.programId}&subject=${router.query.subject}&chapter=${router.query.chapter}` }]} />

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
                        mcqs && mcqs.length !== 0 ?
                            mcqs.map((mcq, i) =>
                                <Link
                                    key={i}
                                    href={`/mcqs/${id1}/chapterwise-test/${id2}/${id3}/${mcq._id}/?mcq=${mcq.title}&program=${router.query.program}&programId=${router.query.programId}&subject=${router.query.subject}&chapter=${router.query.chapter}`}
                                    legacyBehavior>
                                    <a className={`relative max-w-sm lg:max-w-full flex cursor-pointer hover:translate-y-1 justify-center`}>
                                        {mcq?.thumbnail ?
                                            <img
                                                className="ring-1 ring-opacity-5 ring-blue-900 h-[160px] w-[160px] md:h-[200px] md:w-[200px] object-contain"
                                                alt={mcq?.title}
                                                src={mcq?.thumbnail}
                                            />
                                            :
                                            <></>
                                        }
                                        {/* {mcq.endTime < mcq.currentTime ?
                                                <div className="absolute -right-3 rounded-md -top-3 dark:text-white z-50 border-[1px] dark:border-black p-1 dark:bg-red-900 border-gray-300 bg-red-100 tracking-wide">Live</div>
                                                :
                                                <></>
                                            } */}
                                        <div className="relative shadow-xl min-h-[190px] w-[200px] md:min-h-[220px] md:w-[220px] border-transparent border-gray-400 dark:bg-gray-800 bg-back dark:text-mainText/80 rounded-md p-8 flex flex-col justify-between">
                                            <div className="my-auto flex flex-col items-center justify-center">
                                                <div className="absolute bottom-0 right-0 flex gap-2 text-sm items-center p-2 pt-4 rounded-full rounded-b-none bg-gray-200 dark:bg-black">{parseInt(mcq?.duration)} mins</div>
                                                <div className="absolute top-0 right-0 flex gap-2 items-center p-2 bg-gray-900/20 rounded-b-lg rounded-l-lg dark:bg-black/30 text-xs">{mcq?.questionCount} MCQs</div>
                                                <div className="font-bold text-2xl">{mcq?.title}</div>
                                                <div className="italic font-thin mt-3 text-gray-700 dark:text-blue-400  break-all">{mcq?.explanation}</div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            )
                            :
                            <div className="text-warningText text-xl">
                                There are no Mcqs available at the moment.
                            </div>
                    }
                    {error ?
                        <div className="text-warningText text-xl w-full h-full flex items-center justify-center">{error?.response?.data?.message}
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}


Mcqs.getInitialProps = async (context) => {
    const data = await axios.get(process.env.BACKEND + `/chapterMcq/${context.query.chapterId}/list`,
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

export default Mcqs;