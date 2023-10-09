import React, { useState, useEffect, useRef } from "react";
import Header from "../../../../../components/Header";
import Breadcrumb from "../../../../../components/Breadcrumb";
import { FaChevronRight } from 'react-icons/fa'
import { MdAssistantNavigation } from 'react-icons/md'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Head from 'next/head'
import Topic from '../../../../../components/Topic'
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { getChapters, getTopic } from "../../../../../api/Courses"
import useSWR from "swr";
import { GiConsoleController } from "react-icons/gi";

function Chapters(props) {
    const [chaptersPanelMode, setChaptersPanelMode] = useState(false)
    const router = useRouter()
    const id1 = router.query.id1
    const id2 = router.query.id2
    const id3 = router.query.id3
    const id4 = router.query.id4

    const { data, error } = useSWR(process.env.BACKEND + `/chapters/${id1}/${id2}/listwithtopic`, async url => await getChapters(url), { revalidateOnFocus: false, revalidateOnReconnect: true, fallbackData: props.props?.allData })

    const { data: topicData, error: topicError } = useSWR(process.env.BACKEND + `/topic/${id1}/${id2}/${id3}/${id4}`, async url => await getTopic(url), { revalidateOnFocus: false, revalidateOnReconnect: true, fallbackData: props.props?.topicData })


    let chapters = data?.data?.chapters
    chapters = chapters?.sort(function (a, b) { return a.sn - b.sn })
    chapters?.map(chapter => { return { ...chapter, topics: chapter.topics?.sort(function (a, b) { return a.sn - b.sn }) } })

    const changeMode = (e) => {
        e.preventDefault()
        if (chaptersPanelMode) {
            setChaptersPanelMode(false)
        }
        else {
            setChaptersPanelMode(true)
        }
    }

    function JsonLd() {
        return {
            __html: `{
            "@context": "https://schema.org",
            "@type": "Topic",
            "headline": "${topicData?.data?.title} | Aakhyaan Academy",
            "datePublished": "${topicData?.data?.createdAt}",
            "dateModified": "${topicData?.data?.updatedAt}"
        }
      `,
        }
    }
    console.log(topicError)

    return (
        <div className={`w-full h-screen bg-back pt-20 dark:bg-background`}>
            <Head>
                <title>{`${topicData?.data?.title ? topicData?.data?.title + " - " : ""} ${data?.data?.subject?.title ? data?.data?.subject?.title + "-" : ""} ${data?.data?.course?.title ? data?.data?.course?.title + " | " : ""}Aakhyaan Academy`}</title>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={JsonLd()}
                    key="topic-jsonld"
                />
                <meta name="keywords" content={`${topicData?.data?.title}`} />
                <meta property="og:title" content={`${topicData?.data?.title ? topicData?.data?.title + " - " : ""} ${data?.data?.subject?.title} - ${data?.data?.course?.title} | Aakhyaan Academy`} key="ogtitle" />
            </Head>

            <Header page="programmes" />
            
            <Breadcrumb props={[{ header: "Programmes", link: "programmes" }, { header: router.query.program, link: `programmes/details/${router.query.programId}?program=${router.query.program}&programId=${router.query.programId}` }, { header: "Content", link: `programmes/${data?.data?.course?._id}?program=${router.query.program}&programId=${router.query.programId}` }, { header: data?.data?.subject?.title, link: `programmes/${data?.data?.course?._id}/${data?.data?.subject?._id}` }]} />

            {!data && !error && !topicError ?
                <div className="mt-16 h-full">
                    <div className="dark:bg-background bg-back mt-10 font-sans text-lg w-full grid md:grid-cols-5 min-h-full">
                        <div className="mt-5 md:mt-0 hidden md:flex flex-col relative h-full w-full">
                            <div className="invisible md:visible min-w-[180px] dark:bg-formBox h-full md:flex flex-col bg-footer rounded-t-lg w-full">
                                <span className="mx-auto mb-1 place-self-center w-full px-2"><Skeleton height={25} baseColor='gray' /></span>
                                {[...Array(3)].map((val, i) =>
                                    <div className="flex flex-col items-center justify-center px-3 md:px-5 divide-y-2" key={i}>
                                        <div className="w-full"><Skeleton height={20} baseColor='pink' /></div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={`z-10 col-span-4 flex flex-col w-full h-fit p-5 px-10 dark:bg-background`}>
                            <Topic props={topicData} />
                        </div >
                    </div>
                </div>
                :
                !error && !topicError && data && data?.data?.chapters !== 0 ?
                    <div className="dark:bg-background bg-back mt-10 font-sans text-lg w-full lg:grid lg:grid-cols-5 min-h-full">
                        <div className="flex lg:hidden gap-2 mx-8 items-center border-b-[1px] pb-2 mb-5 cursor-pointer" onClick={changeMode}>
                            <span>
                                <MdAssistantNavigation className={`${!chaptersPanelMode ? "rotate-180" : "rotate-90"} text-gray-800 dark:text-gray-200`} size={22} />
                            </span>
                            <div className="dark:text-mainText/90">Navigation</div>
                        </div>
                        <Sidenav chaptersPanelMode={chaptersPanelMode} setChaptersPanelMode={setChaptersPanelMode} id1={id1} id2={id2} id3={id3} id4={id4} chapters={chapters} programName={router.query.program} programId={router.query.programId} />
                        {!chaptersPanelMode ?
                            <Topic props={topicData} />
                            :
                            <></>
                        }
                    </div>
                    :
                    data && data?.data?.chapters === 0 ?
                        <div className="text-warningText text-xl w-full h-full flex items-center justify-center">data?.data?.message</div>
                        :
                        error ?
                            <div className="text-warningText text-xl w-full h-full flex items-center justify-center">{error?.response?.data?.message}</div>
                            :
                            topicError ?
                                <div className="text-warningText text-xl w-full h-full flex items-center justify-center">{topicError?.response?.data?.message}</div>
                                :
                                <></>
            }

            {/* <Footer /> */}
        </div>
    );
}

export default Chapters;

export const Sidenav = ({ chaptersPanelMode, setChaptersPanelMode, chapters, id1: courseId, id2: subjectId, id3: chapterId, id4: topicId, programName, programId }) => {
    const [isExpanded, setIsExpanded] = useState([true])
    const chaptersRef = useRef([])

    const expand = (i) => {
        let expanded
        if (isExpanded[i]) {
            expanded = isExpanded
            expanded[i] = false
            setIsExpanded([...expanded])
        }
        else if (!isExpanded[i] || typeof isExpanded[i] === typeof undefined) {
            expanded = isExpanded
            expanded[i] = true
            setIsExpanded([...expanded])
        }
    }

    return (
        <div className={`${chaptersPanelMode ? "flex" : "hidden lg:flex"} ml-8 pr-5 break-words flex-col gap-3 border-r-2 dark:border-mainText/60 border-slate-500 lg:pt-10 pb-10`}>
            {chapters?.map((chapter, i) =>
                <div key={i} className="flex flex-col gap-2">
                    <div onClick={() => expand(i)} ref={element => chaptersRef.current.push(element)} className={`dark:text-mainText/90`}>
                        <span className="text-lg flex gap-2 items-center">
                            <span className={`${isExpanded[i] ? "rotate-90" : ""}`}>
                                <FaChevronRight className="text-gray-600" size={16} />
                            </span>
                            <span className="cursor-pointer">
                                {chapter?.title}
                            </span>
                        </span>
                    </div>
                    {isExpanded[i] ?
                        <div className="ml-5 animate-dropdownOpen flex flex-col gap-1 font-light">
                            {chapter?.topics?.map((topic, j) =>
                                <Link
                                    key={j}
                                    href={`/programmes/${courseId}/${subjectId}/${chapterId}/${topic?._id}?program=${programName}&programId=${programId}`}
                                    legacyBehavior>
                                    <a className={`${topicId === topic?._id ? "dark:bg-slate-800 bg-blue-200 text-gray-900 dark:text-blue-500 rounded-sm" : "dark:text-mainText/90"} px-2 py-1`} onClick={(e) => {
                                        setChaptersPanelMode(false)
                                    }}>
                                        {topic?.title}
                                    </a>

                                </Link>
                            )}
                        </div>
                        :
                        <>
                            {
                                chapter?.topics?.map((topic, j) => {
                                    if (topicId === topic?._id) {
                                        expand(i)
                                    }
                                })}
                        </>
                    }
                </div>

            )}
        </div>
    );
}


Chapters.getInitialProps = async (context) => {
    if (typeof window !== 'undefined')
        return { props: undefined }

    let data1, data2;
    let promise1, promise2
    promise1 = axios.get(process.env.BACKEND + `/chapters/${context.query.id1}/${context.query.id2}/listwithtopic`,
        {
            withCredentials: true,
            headers: {
                Cookie: context.req?.headers.cookie,
            }
        });
    promise2 = axios.get(process.env.BACKEND + `/topic/${context.query.id1}/${context.query.id2}/${context.query.id3}/${context.query.id4}`,
        {
            withCredentials: true,
            headers: {
                Cookie: context.req?.headers.cookie,
            }
        });
    const [response1, response2] = await Promise.allSettled([promise1, promise2])
    if (response1.status === "fulfilled") {
        data1 = response1?.value?.data;
    } else {
        data1 = { success: false, message: response1?.reason?.response?.data?.message }
    }

    if (response2.status === "fulfilled") {
        data2 = response2?.value?.data;
    } else {
        data2 = { success: false, message: response2?.reason?.response?.data?.message }
    }

    return {
        props: { allData: data1, topicData: data2 }
    }
}