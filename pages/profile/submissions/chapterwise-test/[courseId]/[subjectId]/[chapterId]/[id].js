import React, { useState, useEffect } from "react"
import Header from "../../../../../../../components/Header";
import Head from 'next/head'
import { useRouter } from "next/router";
import useSWR from "swr";
import { getSolvedMcq } from '../../../../../../../api/Mcq'
import Paginate from "../../../../../../../components/Pagination"
import { MathJax } from 'better-react-mathjax'
import floatingPointFix from 'js-floating-point';

function Submission() {
    const router = useRouter()
    const id = router.query.id
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [marks, setMarks] = useState(0)
    const [fullMarks, setFullMarks] = useState(0)

    const { data, error } = useSWR(id ? process.env.BACKEND + `/chapterMcq/submission/${id}` : null, async url => await getSolvedMcq(url), { revalidateOnFocus: false, revalidateOnReconnect: true })

    useEffect(() => {
        if (typeof data !== typeof undefined) {
            if (data.success) {
                setQuestions(data?.data?.mcq?.questions)
                setAnswers(data?.data?.submission?.answers)
                let ans = 0
                let fullMarks = 0
                for (let i = 0; i < data?.data?.mcq?.questions.length; i++) {
                    fullMarks = fullMarks + data?.data?.mcq?.questions[i].weight
                    if (data?.data?.submission?.answers[i] === data?.data?.mcq?.questions[i].answer) {
                        ans = floatingPointFix(ans + data?.data?.mcq?.questions[i].weight)
                    }
                    else if (data?.data?.submission?.answers[i] !== null && typeof data?.data?.submission?.answers[i] !== "undefined") {
                        ans = floatingPointFix(ans - data?.data?.mcq?.questions[i].weight * data?.data?.mcq?.negMark / 100)
                    }
                }
                setMarks(ans)
                setFullMarks(fullMarks)
            } else {
                router.replace(`/login?redirect_uri=${router.asPath}`)
            }
        }
    }, [data, router, id])

    const handleChangePage = ({ selected }) => {
        setCurrentPage(selected - 1)
    }

    const [currentPage, setCurrentPage] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const questionsPerPage = 20
    const pagesVisited = currentPage * questionsPerPage
    const pageCount = Math.ceil(questions.length / questionsPerPage)

    const displayQuestions = questions?.slice(pagesVisited, pagesVisited + questionsPerPage).map((question, i) => {
        return (
            <div key={i}>
                <div className='flex flex-col gap-1 dark:bg-background break-words'>
                    <div className='flex flex-wrap gap-4'>
                        <div>
                            {pagesVisited + i + 1}.&nbsp;&nbsp;<MathJax hideUntilTypeset={"first"} inline
                                dynamic
                            >{question.question}</MathJax>
                        </div>
                        <span className="dark:bg-white/20 bg-blue-200 dark:text-black text-gray-900 h-[25px] px-2">{question.weight}</span>
                    </div>
                    {question.questionImage ?
                        <div className="p-2 ml-10">
                            <a target="_blank" rel="noreferrer" href={question.questionImage}>
                                <img className="inline" alt="question" src={question.questionImage}></img>
                            </a>
                        </div>
                        :
                        <></>
                    }
                    <div className='dark:bg-background flex flex-col ml-14 gap-3'>
                        {question.options.map((option, j) => {
                            return (
                                <div key={pagesVisited + i + j}>
                                    <div>
                                        <input className='hover:cursor-pointer' type="checkbox" name={`question${pagesVisited + i + 1}`} value={option.text}
                                            checked={answers[pagesVisited + i] === j ? true : false} readOnly
                                        />&nbsp;&nbsp;
                                        <MathJax
                                            hideUntilTypeset={"first"}
                                            inline
                                            dynamic
                                        >{option.text}</MathJax>
                                        {j === question.answer ?
                                            <span className="text-xl">&nbsp;&nbsp;&#10003;</span>
                                            :
                                            <></>
                                        }
                                    </div>
                                    {option.image ?
                                        <div className="ml-10 p-2">
                                            <a target="_blank" rel="noreferrer" href={option.image}>
                                                <img className="inline" alt="option" src={option.image}></img>
                                            </a>
                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex ml-2 mt-2 flex-col gap-2 bg-green-200 dark:bg-gray-900">
                        {question.explanation ?
                            <div className="italic flex p-2">
                                <MathJax
                                    hideUntilTypeset={"first"}
                                    inline
                                    dynamic
                                >{question.explanation}</MathJax>
                            </div>
                            :
                            <></>
                        }
                        {question.explanationImage ?
                            <div className="ml-10 p-2">
                                <a target="_blank" rel="noreferrer" href={question.explanationImage}>
                                    <img className="inline" alt="explanation" src={question.explanationImage}></img>
                                </a>
                            </div>
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>
        )
    })


    return (
        <div className="h-screen">
            <Head>
                <title>{`${data?.data?.submission?.mcqTitle ? data?.data?.submission?.mcqTitle + " - " : ""}Submissions | Aakhyaan Academy`}</title>
                <meta property="og:title" content={`${data?.data?.submission?.mcqTitle ? data?.data?.submission?.mcqTitle + " " : ""}Submission | Aakhyaan Academy`} key="ogtitle" />
            </Head>
            <Header />
            {error ?
                <div className={`pt-[60px] md:pt-[80px] relative dark:bg-background dark:text-mainText w-full min-h-full flex flex-col justify-center items-center`}>
                    <div className='text-xl mb-2'>{error?.response?.data?.message}</div>
                    <div>Please come back later.</div>
                    <div onClick={() => router.push(`/profile/submissions/chapterwise-test/${router.query.courseId}/${router.query.subjectId}/${router.query.chapterId}?program=${router.query.program}&programId=${router.query.programId}&subject=${router.query.subject}&chapter=${router.query.chapterId}`)} className="cursor-pointer font-sans text-lg transition-all bg-green-800 text-white py-1 mt-4 px-3 rounded focus:outline-none focus:shadow-outline hover:translate-y-[1px]">
                        Go Back
                    </div>
                </div>
                :
                <div className='dark:bg-background bg-back h-screen'>
                    <div className={`pt-[60px] md:pt-[80px] relative dark:bg-background dark:text-mainText overflow-hidden w-full min-h-full flex flex-col`}>
                        <div className="text-center m-2 text-3xl">{data?.data?.submission?.mcqTitle}</div>
                        <div className="relative my-5">
                            <div className="absolute left-0 ml-5 font-medium">Total:&nbsp;&nbsp;{fullMarks}</div>
                            <div className="absolute right-0 mr-5 font-medium">Scored:&nbsp;&nbsp;{marks}</div>
                        </div>

                        <div className='gap-10 dark:bg-background bg-back h-full flex flex-col p-10 w-full'>
                            {displayQuestions}
                        </div>

                        <div className='flex justify-center mb-14'>
                            <Paginate
                                previousLabel={"Prev"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={handleChangePage}
                                containerClassName={"flex gap-3 items-center select-none"}
                                previousLinkClassName={"hover:text-blue-900 text-lg text-blue-900/40 dark:text-blue-100/40 hover:cursor-pointer"}
                                nextLinkClassName={"hover:text-blue-900 text-lg text-blue-900/40 dark:text-blue-100/40 hover:cursor-pointer"}
                                activeClassName={"bg-blue-600/60 text-white dark:bg-green-900/50 hover:bg-blue-400"}
                                pageClassName={"border-2 px-3 py-1 rounded-md hover:bg-blue-600 hover:cursor-pointer hover:text-white dark:hover:bg-black"}
                                activePage={activePage}
                                setActivePage={setActivePage}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Submission;