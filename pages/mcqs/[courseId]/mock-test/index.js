import React, { useState, useEffect } from "react";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer"
import useSWR from "swr";
import { getMcqs } from "../../../../api/Mcq";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Head from 'next/head'
import { useRouter } from "next/router";
import Breadcrumb from "../../../../components/Breadcrumb";
import Link from "next/link";

function Mcqs() {
    const router = useRouter()
    const courseId = router.query.courseId
    const [mcqs, setMcqs] = useState([])
    const { data, error } = useSWR(process.env.BACKEND + `/mcq/${courseId}/list`, async url => await getMcqs(url), { revalidateOnFocus: false, revalidateOnReconnect: true })

    useEffect(() => {
        if (typeof data !== typeof undefined) {
            if (data?.success) {
                setMcqs(data?.data);
            }
        }
    }, [data]);

    return (
        <div className={`w-full h-screen bg-back pt-20 dark:bg-background`}>
            <Head>
                <title>{`${data?.data?.course?.title ? data?.data?.course?.title + " - " : ""}Mock Test | Aakhyaan Academy`}</title>
                <meta
                    name="description"
                    content="Take your own test online and prepare yourself. We provide weekly mock tests for everyone who are the members of our Academy."
                />
                <meta property="og:title" content={`${data?.data?.course?.title ? data?.data?.course?.title + " - " : ""}Mock Test | Aakhyaan Academy`} key="ogtitle" />
                <meta property="og:description" content="Take your own test online and prepare yourself. We provide weekly mock tests for everyone who are the members of our Academy." key="ogdesc" />
            </Head>
            <Header page="mcqs" />

            <Breadcrumb props={[{ header: "Test ", link: "mcqs" }, { header: `${router.query.program}`, link: `mcqs/${router.query.courseId}?program=${router.query.program}&programId=${router.query.programId}` }, { header: `Mock Test`, link: `mcqs/${router.query.courseId}/mock-test?program=${router.query.program}&programId=${router.query.programId}` }]} />

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
                                    href={`/mcqs/${courseId}/mock-test/${mcq._id}?mcq=${mcq.title}&program=${router.query.program}&programId=${router.query.programId}`}
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
                                                <div className="absolute top-0 right-0 flex gap-2 items-center p-2 bg-gray-900/20 rounded-b-lg rounded-l-lg dark:bg-black text-xs">{mcq?.questionCount} MCQs</div>
                                                <div className="font-bold text-2xl">{mcq?.title}</div>
                                                <div dangerouslySetInnerHTML={{ __html: mcq?.explanation }} className="italic font-thin mt-3 text-gray-700 dark:text-blue-400  break-all"></div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            )
                            :
                            <div className="text-mainText text-xl">
                                There are no Mcqs available at the moment.
                            </div>
                    }
                    {error ?
                        <div className="text-warningText text-xl w-full h-full flex items-center justify-center">{error?.response?.data?.message}</div>
                        :
                        <></>
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Mcqs;