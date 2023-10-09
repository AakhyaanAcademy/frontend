import React, { useEffect, useState } from "react";
import Header from "../../../../../components/Header";
import Footer from "../../../../../components/Footer"
import Head from 'next/head'
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { getSolvedMcqs } from '../../../../../api/Mcq'
import moment from "moment";
import { HiOutlineExternalLink } from 'react-icons/hi'
import Paginate from "../../../../../components/Pagination";
import Breadcrumb from "../../../../../components/Breadcrumb";


function Submissions() {
    const router = useRouter()
    const { data } = useSWR(router.query.courseId? process.env.BACKEND + `/mcq/submission/course/${router.query.courseId}`: null, async url => await getSolvedMcqs(url), { revalidateOnFocus: false, revalidateOnReconnect: true })

    useEffect(() => {
        if (typeof data !== typeof undefined) {
            if (!data.success) {
                router.replace(`/login?redirect_uri=${router.asPath}`)
            }
        }
    }, [data, router])

    const submissions = data?.data ? [...data?.data]?.reverse() : []

    const [currentPage, setCurrentPage] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const submissionsPerPage = 10
    const pagesVisited = currentPage * submissionsPerPage
    const pageCount = Math.ceil(submissions.length / submissionsPerPage)

    const handleChangePage = ({ selected }) => {
        setCurrentPage(selected - 1)
    }

    const displaySubmissions = submissions.slice(pagesVisited, pagesVisited + submissionsPerPage).map((mcq, i) => {
        return (
            <tr key={i}>
                <td>{pagesVisited + i + 1}.</td>
                <td>
                    <Link href={`/profile/submissions/mock-test/${router.query.courseId}/${mcq.submissionId}`} legacyBehavior>
                        <a className='flex'>
                            <span className="underline font-medium">{mcq.mcqTitle}</span>&nbsp;&nbsp;
                            <span>
                                <HiOutlineExternalLink size={20} />
                            </span>
                        </a>
                    </Link>
                </td>

                <td>{moment(mcq.startTime).format("MMMM Do YYYY,hh:mm:ss a")}</td>
                <td>
                    {mcq.endTime < mcq.currentTime ?
                        <span>{moment(mcq.endTime).format("MMMM Do YYYY,hh:mm:ss a")}</span>
                        :
                        <>---</>
                    }
                </td>
                <td>
                    {mcq.endTime > mcq.currentTime ?
                        <span>Pending</span>
                        :
                        <span>Completed</span>
                    }
                </td>
            </tr>
        )
    })

    return (
        <div className={`w-full h-screen dark:text-mainText/90 bg-back pt-20 dark:bg-background`}>
            <Head>
                <title>{`${router.query.program ? router.query.program + " - " : ""}Submissions - Mock Test | Aakhyaan Academy`}</title>
                <meta
                    name="description"
                    content="Check your submission history of the mock tests you have given to see how accomplished you are."
                />
                <meta property="og:title" content={`${router.query.program ? router.query.program + " - " : ""}Submissions - Mock Test | Aakhyaan Academy`} key="ogtitle" />
                <meta property="og:description" content="Check your submission history of the mock tests you have given to see how accomplished you are." key="ogdesc" />
            </Head>
            <Header page="Submissions" />

            <Breadcrumb props={[{ header: "Submissions", link: "profile/submissions/mock-test" },{ header: router.query.program, link: `profile/submissions/mock-test/${router.query.courseId}` }]} />

            <div className="p-[6%] w-full text-lg font-normal min-h-full overflow-auto dark:bg-background">
                {submissions?.length ?
                    <table className="">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-900">
                                <th>SN.</th>
                                <th>MCQ</th>
                                <th>Started</th>
                                <th>Ended</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displaySubmissions}
                        </tbody>
                    </table>
                    :
                    <div className='text-red-900'>
                        You haven't yet participated in any mcq. Please go to <span className='underline'><Link href={`/mcqs/${router.query.courseId}/mock-test?program=${router.query.program}&programId=${router.query.programId}`}>Mcq</Link></span> page to take part in one.
                    </div>
                }
                {/* pagination here */}
                <div className='flex justify-center mb-14 mt-14'>
                    <Paginate
                        previousLabel={"Prev"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={handleChangePage}
                        containerClassName={"flex gap-3 items-center select-none"}
                        previousLinkClassName={"hover:text-blue-900 dark:hover:text-blue-600/70 text-lg text-blue-900/40 dark:text-blue-100/40 hover:cursor-pointer"}
                        nextLinkClassName={"hover:text-blue-900 dark:hover:text-blue-600/70 text-lg text-blue-900/40 dark:text-blue-100/40 hover:cursor-pointer"}
                        activeClassName={"bg-blue-600/60 text-white dark:bg-green-900/50 hover:bg-blue-400"}
                        pageClassName={"border-2 px-3 py-1 rounded-md hover:bg-blue-600 dark:hover:bg-green-900 hover:cursor-pointer hover:text-white dark:hover:bg-black"}
                        activePage={activePage}
                        setActivePage={setActivePage}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Submissions;