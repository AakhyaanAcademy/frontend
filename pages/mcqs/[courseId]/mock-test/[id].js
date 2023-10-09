import React, { useState, useEffect, useRef } from 'react'
import { GrStatusGoodSmall } from 'react-icons/gr'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { startMcq, saveMcq, submitMcq, preCheckMcq } from '../../../../api/Mcq'
import { refreshUser } from '../../../../api/User'
import TimeFormat from 'hh-mm-ss'
import useSWR from 'swr'
import Paginate from '../../../../components/Pagination'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MathJax } from 'better-react-mathjax'
import moment from 'moment'

export default function Mcq() {
    const router = useRouter()
    const [darkMode, setDarkMode] = useState(true)
    const [message, setMessage] = useState("")
    const [currentPage, setCurrentPage] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const [isShowing, setIsShowing] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [answers, setAnswers] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [remTime, setRemTime] = useState(0)
    const [start, setStart] = useState(false)
    const title = router.query.mcq
    const id = router.query.id
    let answered
    const [questions, setQuestions] = useState([])
    const questionsRef = useRef([])
    const [preCheckTimeRemaining, setPreCheckTimeRemaining] = useState(null)

    const { data: preCheckData, error: preCheckError } = useSWR(!start && id ? [process.env.BACKEND + `/mcq/precheck`, id] : null, async url => {
        return await preCheckMcq(url, { mcqId: id });
    }, { revalidateOnFocus: false, revalidateOnReconnect: false })

    const { data, error } = useSWR(start && !submitted && id ? process.env.BACKEND + `/mcq/start` : null, async url => {
        return await startMcq(url, { mcqId: id });

    }, { revalidateOnFocus: false, revalidateOnReconnect: false })

    useEffect(() => {
        setDarkMode(JSON.parse(localStorage.getItem('md')) !== null ? JSON.parse(localStorage.getItem('md')) : true)
        const root = window.document.documentElement
        if (darkMode) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
        if (typeof data !== typeof undefined) {
            if (data?.data?.mcq?.questions) {
                setQuestions(data?.data?.mcq?.questions)
                if (data?.data?.status?.answers !== null && data?.data?.status?.answers?.length !== 0) {
                    let ans = answers
                    for (let i = 0; i < data?.data?.status?.answers.length; i++) {
                        ans[i] = data?.data?.status?.answers[i]
                    }
                    setAnswers([...ans])
                } else {
                    let ans = []
                    for (let i = 0; i < data.data.mcq.questions?.length; i++) {
                        ans[i] = null
                    }
                    setAnswers([...ans])
                }
                setRemTime((data?.data?.status?.endTime - 12000) - data?.data?.status?.currentTime)
            }
        }

        if (typeof preCheckData !== typeof undefined) {
            if (preCheckData.success) {
                setMessage(preCheckData?.message)
                if (preCheckData?.data?.status) {
                    setPreCheckTimeRemaining(TimeFormat.fromMs(preCheckData?.data?.status?.endTime - preCheckData?.data?.status?.currentTime, 'hh:mm:ss'))
                }
            } else {
                setMessage(preCheckData?.message)
            }
        }
        if (preCheckError) {
            setMessage(preCheckError?.response?.data?.message)
        }

        const refresh = async () => {
            await refreshUser(process.env.BACKEND + `/user/login/refresh`)
        }
        if (start) {
            refresh()
        }
    }, [darkMode, data, start, preCheckData, preCheckError])

    useEffect(() => {
        if (!submitted && start) {
            const Interval = setInterval(() => {
                saveState()
            }, 1000 * 60);
            return () => clearInterval(Interval)
        }
    })

    useEffect(() => {
        if (!start && preCheckData?.data?.status) {
            const clockInterval = setInterval(() => {
                let tme = TimeFormat.toS(preCheckTimeRemaining)
                tme = tme - 1
                if (tme <= 0) {
                    router.back()
                }
                setPreCheckTimeRemaining(TimeFormat.fromS(tme, 'hh:mm:ss'))
            }, 1000);
            return () => clearInterval(clockInterval)
        }
    })

    const saveState = async (e) => {
        e?.preventDefault()
        try {
            answered = await saveMcq(process.env.BACKEND + "/mcq/save", { answers: answers, mcqId: id })
            setErrorMessage(answered?.message)
            setIsShowing(true)
            setTimeout(() => {
                setIsShowing(false)
                setErrorMessage("")
            }, 4000);
            setRemTime((data?.data?.status?.endTime - 12000) - answered?.data?.currentTime)
        } catch (e) {
            setStart(false)
        }
    }

    const questionsPerPage = 20
    const pagesVisited = currentPage * questionsPerPage
    const pageCount = Math.ceil(questions.length / questionsPerPage)


    function intToChar(int) {
        // for Uppercase letters, replace `a` with `A`
        const code = 'a'.charCodeAt(0);
        return String.fromCharCode(code + int);
    }

    const handleChangePage = ({ selected }) => {
        setCurrentPage(selected - 1)
    }

    const handleSubmit = async (e) => {
        e?.preventDefault()
        setSubmitted(true)
        answered = await submitMcq(process.env.BACKEND + "/mcq/submit", { answers: answers, mcqId: id })
    }

    const displayQuestions = questions.slice(pagesVisited, pagesVisited + questionsPerPage).map((question, i) => {
        return (
            <div ref={el => questionsRef.current[pagesVisited + i] = el} key={i} className='flex flex-col gap-1 dark:bg-background'>
                <div className='flex flex-wrap gap-4 break-words'>
                    <div>
                        {pagesVisited + i + 1}.&nbsp;&nbsp;<MathJax hideUntilTypeset={"first"} inline
                            dynamic
                        >{question.question}</MathJax>
                    </div>
                    <span className="dark:bg-white/20 bg-blue-200 dark:text-black text-gray-900 px-2">{question.weight}</span>
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
                                        checked={answers[pagesVisited + i] === j ? true : false} onChange={(e) => {
                                            if (e.target.checked) {
                                                const newAnswers = Object.assign([...answers], {
                                                    [pagesVisited + i]: j
                                                });
                                                setAnswers(newAnswers)
                                            }
                                        }}
                                    />&nbsp;&nbsp;
                                    <MathJax
                                        hideUntilTypeset={"first"}
                                        inline
                                        dynamic
                                    >{option.text}</MathJax>
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
            </div>
        )
    })

    return (
        <div className='h-screen'>
            <Head>
                <title>{`${title ? title + " - " : ""}Mock Test | Aakhyaan Academy`}</title>
                <meta
                    name="description"
                    content="Start your Mcq session with just a click."
                />
                <meta property="og:title" content={`${title ? title + " - " : ""}Mock Test | Aakhyaan Academy`} key="ogtitle" />
                <meta property="og:description" content="Start your Mcq session with just a click." key="ogdesc" />
            </Head>
            {start ?
                <div className='dark:bg-background bg-back h-screen'>
                    {(data?.success && !error || answered?.success) && !submitted ?
                        <>
                            <Header saveState={saveState} handleSubmit={handleSubmit} time={remTime} />

                            <div className={`pt-[60px] md:pt-[80px] relative dark:bg-background dark:text-mainText w-full min-h-full flex flex-col overflow-hidden`}>
                                <div className="text-center mt-2 text-3xl">{data?.data?.mcq?.title}</div>
                                <div className="flex justify-end mr-5 italic mt-4 font-medium">Exam:&nbsp;&nbsp;{data?.data?.status?.currentTime <= data?.data?.mcq?.endTime ? "Live" : "Practice"}</div>

                                {/* mcq questions here! */}
                                <div className='flex flex-col gap-10 xl:flex-row xl:gap-5'>
                                    <div className={`m-auto xl:hidden mt-10 w-fit`}>
                                        <NavigationBox questions={questions} answers={answers} questionsRef={questionsRef} currentPage={currentPage} setCurrentPage={setCurrentPage} setActivePage={setActivePage} />
                                    </div>
                                    <div className='gap-10 dark:bg-background bg-back h-full flex flex-col p-10 w-full'>
                                        {displayQuestions}
                                    </div>
                                    <div className={`hidden xl:block px-10`}>
                                        <NavigationBox questions={questions} answers={answers} questionsRef={questionsRef} currentPage={currentPage} setCurrentPage={setCurrentPage} setActivePage={setActivePage} />
                                    </div>
                                </div>

                                {/* pagination here */}
                                <div className='flex justify-center mb-14'>
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
                        </>
                        :
                        <div className="px-[6%] bg-gray-500 dark:bg-background/80 flex items-center justify-center text-lg font-normal pb-10 min-h-full">
                            <div className="dark:text-mainText/90 border-transparent px-6 py-8 md:px-7 md:py-12 dark:bg-formBox bg-purple-900 shadow-md rounded-md flex flex-col gap-5">
                                {submitted ?
                                    <>
                                        <div className='text-xl'>Thank you for successfully completing this mcq session.</div>
                                        <div className='mt-2'>Please go to the <span className='underline'><Link href={`/profile/submissions/mock-test/${router.query.courseId}?program=${router.query.program}&programId=${router.query.programId}`} >Submissions</Link></span> page to see your result.</div>
                                    </>
                                    :
                                    <>
                                        {error ?
                                            <>
                                                <div className='text-xl'>{error?.response?.data?.message}</div>
                                                <div>Please come back later.</div>
                                            </>
                                            :
                                            <>
                                                <div className='text-xl'>{data?.message}</div>
                                            </>
                                        }
                                    </>
                                }
                                <div className="">
                                    <span className="float-right flex gap-5">
                                        <div onClick={() => router.push(`/mcqs/${router.query.courseId}/mock-test?program=${router.query.program}&programId=${router.query.programId}`)} className="cursor-pointer font-sans text-lg transition-all bg-green-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:translate-y-[1px]">
                                            Go Back
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    }
                    <div className={`${isShowing ? "animate-fade px-2 bg-slate-300 border-2 rounded-md" : ""} fixed bottom-10 right-10 text-warningText`}>
                        {errorMessage}
                    </div>
                </div>
                :
                <div className="bg-gray-500 dark:bg-background/80 p-[6%] pt-[5%] flex items-center justify-center text-lg font-normal pb-10 min-h-full">
                    <div className="dark:text-mainText/90 border-transparent p-8 dark:bg-formBox bg-gray-600 shadow-md rounded-md flex flex-col gap-8">
                        <div className='text-3xl text-center'>{title}</div>
                        {message ?
                            <div className='italic font-light text-xl'>
                                {message}
                            </div>
                            :
                            <div className="py-1 px-4 w-64 block m-auto">
                                <Skeleton baseColor="gray" />
                                <Skeleton baseColor="gray" />
                            </div>
                        }
                        {preCheckError ?
                            preCheckError?.response?.data?.data?.mcqId ?
                                <div className='flex flex-col gap-1 text-blue-300'>
                                    <Link href={`/mcqs/${router.query.courseId}/mock-test/${preCheckError?.response?.data?.data?.mcqId}?program=${router.query.program}&programId=${router.query.programId}&mcq=${preCheckError?.response?.data?.data?.mcqTitle}`}>Click here to go there.</Link>
                                </div>
                                :
                                <></>
                            :
                            preCheckData?.data?.status ?
                                <div className='flex flex-col gap-1'>
                                    <div>Started:&nbsp;&nbsp;{moment(preCheckData?.data?.status?.startTime).format("hh:mm:ss a")}</div>
                                    <div>Deadline:&nbsp;&nbsp;{moment(preCheckData?.data?.status?.endTime).format("hh:mm:ss a")}</div>
                                    <div className='text-red-600'>Progress:&nbsp;&nbsp;{preCheckTimeRemaining}</div>
                                </div>
                                :
                                <></>
                        }
                        <div>
                            <span className="float-right flex gap-5">
                                <button onClick={() => router.push(`/mcqs/${router.query.courseId}/mock-test?program=${router.query.program}&programId=${router.query.programId}`)} className="font-sans text-lg transition-all bg-red-900 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:translate-y-[1px]">
                                    Back
                                </button>
                                {preCheckError?.response?.status === 401 ?
                                    <div onClick={() => router.replace(`/login?redirect_uri=${router.asPath}`)} className="cursor-pointer font-sans text-lg transition-all bg-purple-700 dark:bg-purple-900 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:translate-y-[1px]">
                                        Login
                                    </div>
                                    :
                                    <></>
                                }
                                {!preCheckError && preCheckData ?
                                    preCheckData?.data?.status ?
                                        <div onClick={() => setStart(true)} className="cursor-pointer font-sans text-lg transition-all bg-green-900 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:translate-y-[1px]">
                                            Resume
                                        </div>
                                        :
                                        <div onClick={() => setStart(true)} className="cursor-pointer font-sans text-lg transition-all bg-green-900 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:translate-y-[1px]">
                                            Confirm
                                        </div>
                                    :
                                    <></>
                                }
                            </span>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export const Header = ({ saveState, handleSubmit, time, submitMcq }) => {
    const [timeRemaining, setTimeRemaining] = useState(null)
    useEffect(() => {
        setTimeRemaining(TimeFormat.fromMs(time, 'hh:mm:ss'))
    }, [time])

    useEffect(() => {
        const clockInterval = setInterval(() => {
            let tme = TimeFormat.toS(timeRemaining)
            tme = tme - 1
            if (tme <= 0) {
                handleSubmit()
            }
            setTimeRemaining(TimeFormat.fromS(tme, 'hh:mm:ss'))
        }, 1000);
        return () => clearInterval(clockInterval)
    })

    return (
        <div className={`dark:bg-formBox/50 backdrop-blur-sm dark:text-mainText bg-back fixed z-20 top-0 w-full h-[60px] md:h-[80px] transition ease-out duration-1000 flex justify-between items-center shadow select-none`}>
            <span className='ml-5 flex gap-5'>
                <button onClick={saveState} className='font-sans text-lg transition-all bg-red-900 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline'>
                    Save
                </button>
                <button onClick={handleSubmit} className="font-sans text-lg transition-all bg-green-900 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Submit
                </button>
            </span>
            <span className='float-right mx-10 flex gap-2 items-center'>
                <GrStatusGoodSmall color='red' />
                <span className='text-lg'>{timeRemaining}</span>
            </span>
        </div>
    )
}

export const NavigationBox = ({ questions, answers, questionsRef, currentPage, setCurrentPage, setActivePage }) => {
    return (
        <div className='h-fit mt-10 flex flex-col gap-5'>
            <div className='dark:bg-formBox bg-slate-100 border-2 flex flex-col divide-y-2 text-xs md:text-sm'>
                {[...Array(parseInt(questions?.length / 10)+1)].map((item, i) =>
                    <div key={i} className='flex divide-x-2 cursor-pointer'>
                        {[...Array(10)]?.map((arr, j) =>
                            i * 10 + j < questions?.length ?
                                <div onClick={() => {
                                    if (currentPage !== parseInt(i / 2)) {
                                        setCurrentPage(parseInt(i / 2))
                                        setActivePage(parseInt(i / 2) + 1)
                                    }
                                    setTimeout(() => {
                                        questionsRef.current[i * 10 + j]?.scrollIntoView({ behavior: "smooth", block: "center" });
                                    }, [100])
                                }} key={i * 10 + j} className={`w-8 text-center py-[3px] md:p-1 ${answers[i * 10 + j] !== null ? "bg-testColor/70" : ""}`}>{i * 10 + j + 1}</div>
                                :
                                <></>
                        )}
                    </div>
                )}
            </div>
            <div className='flex flex-col gap-2 text-sm'>
                <div className='flex gap-2 items-center'>
                    <div className='h-4 w-4 dark:bg-formBox bg-slate-100 rounded-full'></div>
                    Unattempted
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='h-4 w-4 bg-testColor/70 rounded-full'></div>
                    Attempted
                </div>
            </div>
        </div>
    )
}