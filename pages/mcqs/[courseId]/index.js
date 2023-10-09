import React from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer"
import useSWR from "swr";
import 'react-loading-skeleton/dist/skeleton.css'
import Head from 'next/head'
import { getMcqs } from "../../../api/Mcq";
import { useRouter } from "next/router";
import Breadcrumb from "../../../components/Breadcrumb";
import Link from "next/link";

function Mcqs() {
    const router = useRouter()
    const courseId = router.query.courseId
    const { data, error } = useSWR(process.env.BACKEND + `/mcq/${courseId}/list`, async url => await getMcqs(url), { revalidateOnFocus: false, revalidateOnReconnect: true })

    const testTypes = [{ title: "Mock Test", link: "mock-test" }, { title: "Chapterwise Test", link: "chapterwise-test" }]

    return (
        <div className={`w-full h-screen bg-back pt-20 dark:bg-background`}>
            <Head>
                <title>Test | Aakhyaan Academy</title>
                <meta
                    name="description"
                    content="Take your own test online and prepare yourself."
                />
                <meta property="og:title" content="Test | Aakhyaan Academy" key="ogtitle" />
                <meta property="og:description" content="Take your own test online and prepare yourself." key="ogdesc" />
            </Head>
            <Header page="mcqs" />
            <Breadcrumb props={[{ header: "Test ", link: "mcqs" }, { header: `${router.query.program}`, link: `mcqs/${router.query.courseId}?program=${router.query.program}&programId=${router.query.programId}` }]} />
            <div className="dark:bg-background bg-back flex w-full min-h-full pb-20 px-10 justify-center items-center">
                <div className="flex flex-wrap justify-center gap-10 py-20">
                    {data && !error ?
                        testTypes.map((test, i) =>
                            <Link
                                key={i}
                                href={`/mcqs/${courseId}/${test.link}?program=${router.query.program}&programId=${router.query.programId}`}
                                legacyBehavior>
                                <a className={`w-lg flex cursor-pointer hover:translate-y-1 justify-center`}>
                                    <div className="relative shadow-xl h-[180px] w-[160px] md:h-[200px] md:w-[200px] border-transparent border-gray-400 dark:bg-gray-800 bg-back dark:text-mainText/80 rounded-md p-8 flex flex-col justify-between">
                                        <div className="my-auto flex flex-col items-center justify-center">
                                            <div className="font-bold text-2xl text-center">{test?.title}</div>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        )
                        :
                        <div className="text-mainText text-xl">
                            {data?.message}
                        </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Mcqs;