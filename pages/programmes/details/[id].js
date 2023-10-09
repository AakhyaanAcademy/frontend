import React, { useRef, useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer"
import Breadcrumb from "../../../components/Breadcrumb";
import 'react-loading-skeleton/dist/skeleton.css'
import Head from 'next/head'
import axios from "axios";
import Link from "next/link";
import { getProgram } from '../../../api/Courses'
import { ImPriceTags } from "react-icons/im";
import { VscUnlock } from "react-icons/vsc";
import useSWR from "swr";
import { mutate } from "swr";
import Image from "next/legacy/image";
import { useRouter } from 'next/router'
import { BiBookContent } from "react-icons/bi";
import { MdQuestionAnswer } from "react-icons/md";
import { paymentDetails } from '../../../api/Payment'
import CircleLoader from "react-spinners/CircleLoader";
import { changePP } from "../../../api/Profile";
import { BiArrowBack } from "react-icons/bi"

function Programmes(props) {
    const router = useRouter()
    const { data, error } = useSWR(process.env.BACKEND + `/program/${router.query.id}/detail`, async url => await getProgram(url), { revalidateOnFocus: false, revalidateOnReconnect: true, fallbackData: props.props?.data })
    const program = data?.data

    const { data: paymentData, error: paymentError } = useSWR(process.env.BACKEND + `/payment/get/${router.query.id}`, async url => await paymentDetails(url), { revalidateOnFocus: false, revalidateOnReconnect: true })

    const [currentSelection, setCurrentSelection] = useState("description")
    const [payment, setPayment] = useState("")
    const [paymentPictureConfirm, setPaymentPictureConfirm] = useState(false)
    const paymentRef = useRef(null)
    const descriptionRef = useRef(null)
    const [isShowing, setIsShowing] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    function imageLoader({ src }) {
        return src
    }

    const handlePay = async () => {
        // setPaymentConfirm(true)
        if (payment === "picture") {
            setPaymentPictureConfirm(true)
        }

    }

    useEffect(() => {
        if (error) {
            if (error?.response?.status === 404) {
                router.replace(`/404`)
            }
        }
    }, [])

    function JsonLd() {
        return {
            __html: `{
            "@context": "https://schema.org",
            "@type": "Programme",
            "name": "${program?.title}",
            "description": "${program?.description}",
            "image": ["${program?.thumbnail}"],
            "offers": {
                "@type": "Offer",
                "priceCurrency": "NPR",
                "price": "${program?.price}"
              }
            }
        }
      `,
        }
    }

    return (
        <div className={`w-full h-screen bg-back pt-20 dark:bg-background`}>
            <Head>
                <title>{`${program?.title ? program?.title + " - " : ""}Programmes | Aakhyaan Academy`}</title>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={JsonLd()}
                    key="topic-jsonld"
                />
                <meta property="og:title" content={`${program?.title ? program?.title + " - " : ""}Programmes | Aakhyaan Academy`} key="ogtitle" />
            </Head>
            <Header page="programmes" />
            <Breadcrumb props={[{ header: "Programmes", link: "programmes" }, { header: `${router.query.program}`, link: `Programmes/details/${router.query.id}` }]} />
            <div className="py-10 dark:bg-background w-full bg-back min-h-full pb-20 px-10 dark:text-mainText/80">
                <div className="flex flex-col justify-center gap-5 border-b-[2px] pb-10 dark:border-blue-600 border-pink-300 items-center">
                    <div className="flex flex-col w-full gap-10">
                        <div className="flex flex-col gap-1 md:flex-row md:gap-10 items-center justify-center">
                            <div className="m-auto md:m-0 border-2 border-transparent shadow-xl rounded-full dark:bg-slate-900 overflow-hidden w-[80px] md:w-[100px] h-[80px] md:h-[100px] relative">
                                <Image
                                    // objectFit="contain"
                                    layout="fill"
                                    alt={program?.title}
                                    loader={imageLoader}
                                    src={program?.thumbnail}
                                />
                            </div>
                            <h1 className="text-center">{program?.title}</h1>
                        </div>
                        <div className="flex items-center justify-between md:gap-16 break-all gap-1">
                            <div className="flex flex-col">
                                {program?.price ?
                                    <div className="flex flex-col gap-2 text-lg">
                                        <div className="flex gap-2 items-center">
                                            <ImPriceTags size={20} className="stroke-1 stroke-yellow-700 dark:stroke-[#FFD700]" />
                                            <span className="text-yellow-700 dark:text-[#FFD700]">Rs. {program?.price}</span>
                                        </div>
                                        {!paymentError ?
                                            paymentData?.data?.enrollStatus ?
                                                <div className="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="dark:text-mainText/90 text-blue-600 overflow-hidden before:duration-300">Enrolled</span></div>
                                                :
                                                <div className="text-blue-500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className=" dark:text-warningText text-blue-600 overflow-hidden before:duration-300"
                                                >Not Enrolled</span></div>
                                            :
                                            <></>
                                        }
                                    </div>
                                    :
                                    <div className="flex gap-2 items-center">
                                        <VscUnlock size={18} className="stroke-1 stroke-yellow-700 dark:stroke-[#FFD700]" />
                                        <span className="text-yellow-700 dark:text-[#FFD700]">Free</span>
                                    </div>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="flex gap-2 items-center justify-end">
                                    <span>
                                        <BiBookContent className="dark:text-blue-500" size={20} />
                                    </span>
                                    <Link href={`/programmes/${program?.courseId}?program=${program?.title}&programId=${program?._id}`} legacyBehavior>
                                        <a>
                                            <h3 className="hover:underline cursor-pointer text-blue-700">
                                                Content
                                            </h3>
                                        </a>
                                    </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                                <span className="flex gap-2 items-center justify-end">
                                    <span>
                                        <MdQuestionAnswer className="dark:text-blue-500" size={20} />
                                    </span>
                                    <Link href={`/mcqs/${program?.courseId}?program=${program?.title}&programId=${program?._id}`} legacyBehavior>
                                        <a>
                                            <h3 className="hover:underline cursor-pointer text-blue-700">
                                                Mock Tests
                                            </h3>
                                        </a>
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row py-5 gap-2 text-lg md:divide-x-[1px]">
                    <div className="flex gap-2 p-2 dark:border-slate-800 md:flex-col md:h-fit">
                        <span className={`rounded-2xl md:px-10 p-2 text-center cursor-pointer ${currentSelection === "description" ? "dark:bg-slate-700 bg-blue-300" : "bg-pink-200 hover:bg-blue-200 dark:hover:bg-blue-900 dark:bg-slate-900"}`} onClick={() => {
                            setCurrentSelection("description")
                            descriptionRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
                        }}>Description</span>
                        {!program?.price || paymentData?.data?.enrollStatus ?
                            <></>
                            :
                            <span className={`text-center md:px-10 rounded-2xl p-2 cursor-pointer ${currentSelection === "payment" ? "dark:bg-slate-600 bg-blue-300" : "hover:bg-blue-200 bg-pink-200 dark:hover:bg-blue-900 dark:bg-slate-900"}`} onClick={() => {
                                setCurrentSelection("payment")
                                paymentRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
                            }}>Payment</span>
                        }
                    </div>
                    <div className="md:w-full md:border-t-[1px] md:border-l-[1px] dark:border-slate-900 flex flex-col md:col-span-2 gap-5 md:gap-0">
                        <div ref={descriptionRef} dangerouslySetInnerHTML={{ __html: program?.description }} className="bg-blue-50/50 dark:bg-formBox/30 md:bg-inherit md:border-r-[1px] p-6 py-8 md:border-b-[1px] dark:border-slate-900 shadow-sm">
                        </div>
                        {!program?.price || paymentData?.data?.enrollStatus ?
                            <></>
                            :
                            <div ref={paymentRef} className="bg-blue-50/50 dark:bg-formBox/30 md:bg-inherit md:border-r-[1px] flex flex-col gap-8 p-6 py-8 md:border-b-[1px] dark:border-slate-900 shadow-sm">
                                {paymentError?.response?.status === 401 ?
                                    <div className="flex gap-3 md:items-center flex-col md:flex-row">
                                        <div className='italic font-light text-xl text-warningText'>
                                            You need to login to pay for the program.
                                        </div>
                                        <div onClick={() => router.replace(`/login?redirect_uri=${router.asPath}`)} className="cursor-pointer font-sans text-lg transition-all bg-purple-700 dark:bg-purple-900 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline hover:translate-y-[1px] w-fit">
                                            Login
                                        </div>
                                    </div>
                                    :
                                    !paymentPictureConfirm ?
                                        <div className={`flex flex-col gap-8`}>
                                            {paymentData?.data?.paymentPic?.isVerified === 0 ?
                                                <div className='italic font-light text-lg text-warningText'>
                                                    Your payment picture has been rejected, please send another picture to try again.
                                                </div>
                                                :
                                                paymentData?.data?.paymentPic?.isVerified === 1 ?
                                                    <div className='italic font-light text-lg text-warningText'>
                                                        Your payment picture is being verified at the moment. You can upload another picture if you think you have sent the wrong one.
                                                    </div>
                                                    :
                                                    <></>
                                            }
                                            <div>Proceed with the payment option below to enroll.</div>
                                            <div className="flex flex-col gap-5">
                                                <div onClick={() => {
                                                    if (payment !== "picture") {
                                                        setPayment("picture")
                                                    }
                                                }} className="dark:bg-formBox cursor-pointer bg-gray-200 rounded-lg p-5 flex items-center gap-2">
                                                    <div className="flex justify-center items-center rounded-full w-[20px] h-[20px] dark:bg-white/80 bg-white border-[1px] border-gray-500 dark:border-black">
                                                        <div className={`${payment === "picture" ? "bg-blue-900" : ""} m-[1px] h-[14px] w-[14px] rounded-full`}>
                                                        </div>
                                                    </div>
                                                    Issue Payment Picture
                                                </div>
                                            </div>
                                            <div>
                                                <div className={`${isShowing ? "animate-fade" : ""} text-lg text-warningText text-center`}>{errorMessage}</div>
                                                <button disabled={payment ? false : true} onClick={handlePay}
                                                    className={`${payment ? "hover:bg-gray-300 dark:hover:bg-gray-700 bg-gray-200 dark:bg-formBox" : "bg-gray-100 dark:bg-formBox/70"} float-right text-xl font-medium transition-all dark:text-mainText/70 py-2 px-3 rounded`}
                                                >
                                                    Proceed
                                                </button>
                                            </div>
                                        </div>
                                        :
                                        <Payment paymentPicture={paymentData?.data?.paymentPic?.url} setPaymentPictureConfirm={setPaymentPictureConfirm}
                                            paymentData={paymentData} />
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}


const Payment = ({ paymentPicture, setPaymentPictureConfirm, paymentData }) => {
    const router = useRouter()
    const [isShowing, setIsShowing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const paymentPicFile = useRef(null)

    const changePaymentPic = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('picture', paymentPicFile.current.files[0])
        try {
            setIsLoading(true)
            const res = await changePP(process.env.BACKEND + `/payment/upload/${router.query.id}`, formData)
            setIsLoading(false)
            setErrorMessage(res?.message)
            setIsShowing(true)
            setTimeout(() => {
                setIsShowing(false)
                setErrorMessage("")
            }, 4000);
            mutate(process.env.BACKEND + `/payment/get/${router.query.id}`)
        } catch (e) {
            console.log(e)
            setIsLoading(false)
            setErrorMessage(e?.response?.data?.message)
            setIsShowing(true)
            setTimeout(() => {
                setIsShowing(false)
                setErrorMessage("")
            }, 4000);
        }
    }

    const inputPaymentPic = (e) => {
        e.preventDefault()
        paymentPicFile.current.click()
    }

    return (
        <div className='font-sans min-h-[500px]'>
            <div className="mb-10 flex">
                <span onClick={() => setPaymentPictureConfirm(false)} className="cursor-pointer w-fit"><BiArrowBack size={25} />
                </span>
            </div>
            <div className="mb-5">
                {paymentData?.data?.paymentPic?.isVerified === 0 ?
                    <div className='italic font-light text-lg text-warningText'>
                        Your payment picture has been rejected, please send another picture to try again.
                    </div>
                    :
                    paymentData?.data?.paymentPic?.isVerified === 1 ?
                        <div className='italic font-light text-lg text-warningText'>
                            Your payment picture is being verified at the moment. You can upload another picture if you think you have sent the wrong one.
                        </div>
                        :
                        <></>
                }
            </div>
            <div className='flex gap-8 flex-col xl:flex-row xl:gap-24'>
                <div className='mb-2 md:mb-0'>
                    {paymentPicture ?
                        <div className='mb-5'>
                            <img className='w-[400px]' src={paymentPicture} alt='payment picture'></img>
                        </div>
                        :
                        <></>
                    }
                    <input className="w-full" onChange={changePaymentPic} type='file' accept='.png, .jpg, .jpeg' name="" hidden={isLoading} ref={paymentPicFile} />
                    <div className='mt-5 flex gap-1 items-center'>
                        <div>Upload the payment screenshot here.</div>
                        <CircleLoader color="blue" loading={isLoading} size={30} />
                    </div>
                    <div className={`${isShowing ? "animate-fade" : ""} text-lg text-warningText mt-5`}>{errorMessage}</div>
                </div>
                <div className='flex flex-col gap-8'>
                    <div>
                        <div className='mb-2'><img className='w-8' src="/globalIme.png" alt="Global IME"></img></div>
                        <div className='flex gap-8 flex-col xl:flex-row'>
                            <div>
                                <span className='gap-2 flex'>
                                    <span>Name:</span>
                                    <span>Aakhyaan Academy Pvt. Ltd.</span>
                                </span>
                                <span className='gap-2 flex'>
                                    <span>Bank:</span>
                                    <span>Global IME Bank, Belchowk Branch</span>
                                </span>
                                <span className='gap-2 flex'>
                                    <span>A/c No.:</span>
                                    <span>11501010002745</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='mb-2'><img className='w-8' src="/esewa.png" alt="Esewa"></img></div>
                        <div className='flex gap-8 flex-col lg:flex-row'>
                            <div>
                                <span className='gap-2 flex'>
                                    <span>Name:</span>
                                    <span>RAJAN BABU PANTA</span>
                                </span>
                                <span className='gap-2 flex'>
                                    <span>EsewaId:</span>
                                    <span>9840544740</span>
                                </span>
                            </div>
                            <div>
                                <span className='gap-2 flex'>
                                    <span>Name:</span>
                                    <span>ANISH SAPKOTA</span>
                                </span>
                                <span className='gap-2 flex'>
                                    <span>EsewaId:</span>
                                    <span>9865359485</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='mb-2'><img className='w-8' src="/khalti.png" alt="khalti"></img></div>
                        <div className='flex gap-8 flex-col lg:flex-row'>
                            <div>
                                <span className='gap-2 flex'>
                                    <span>Name:</span>
                                    <span>RAJAN BABU PANTA</span>
                                </span>
                                <span className='gap-2 flex'>
                                    <span>KhaltiId:</span>
                                    <span>9840544740</span>
                                </span>
                            </div>
                            <div>
                                <span className='gap-2 flex'>
                                    <span>Name:</span>
                                    <span>ANISH SAPKOTA</span>
                                </span>
                                <span className='gap-2 flex'>
                                    <span>KhaltiId:</span>
                                    <span>9865359485</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='mb-2'><img className='w-8' src="/imepay.png" alt="ImePay"></img></div>
                        <div className='flex gap-8 flex-col lg:flex-row'>
                            <div>
                                <span className='gap-2 flex'>
                                    <span>Name:</span>
                                    <span>ANISH SAPKOTA</span>
                                </span>
                                <span className='gap-2 flex'>
                                    <span>IMEPayId:</span>
                                    <span>9865359485</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Programmes.getInitialProps = async (context) => {
    const data = await axios.get(process.env.BACKEND + `/program/${context.query.id}/detail`,
        {
            withCredentials: true,
            headers: {
                Cookie: context.req?.headers.cookie
            }
        }).then(res => res.data).catch(err => {
            if (context.res) {
                if (err.response.status === 404) {
                    context.res.writeHead(307, { Location: `/404` })
                }
            }
        })

    return {
        props: { data }
    }
}

export default Programmes;