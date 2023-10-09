import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"
import { GoHome } from 'react-icons/go'
import { CgProfile } from 'react-icons/cg'
import { FcPrivacy } from 'react-icons/fc'
import { BsArrowReturnRight } from 'react-icons/bs'
import Head from "next/head";

function Privacy() {
    const questionsAccount = [
        {
            question: "First time, what do I do next?",
            answer: "Go to  <a href='/signup'>signup</a> page if you haven't got an account. You can  <a href='/login'>login</a> and access premium contents. Or you can justs access free contents in programmes if there are any."
        },
        {
            question: "I didnt get a verification email, what should I do next",
            answer: "Try to wait sometime. If you still dont't get it, try verifying from  <a href='/profile'>profile</a> page."
        }
    ]

    const questionsProfile = [
        {
            question: "First time, what do I do next?",
            answer: "Go to  <a href='/profile'>profile</a> page to see your profile."
        },
        {
            question: "Changing your profile picture and other information",
            answer: "You can click on the profile picture and add new picture. You can also change your details by clicking on edit button and submitting new details."
        }
    ]

    const questionsPrivacy = [
        {
            question: "First time, what do I do next?",
            answer: "Go to <a href='/privacy-policy'>privacy policy</a> page to see how we ensecure your privacy."
        }
    ]

    return (
        <div className={`w-full h-screen bg-back pt-20 dark:bg-background font-sans`}>
            <Head>
                <title>Faqs | Aakhyaan Academy</title>
                <meta
                    name="description"
                    content="Get to know how to use our site. Look at some of the frequently asked questions."
                />
                <meta name="keywords" content="frequently asked questions" />
                <meta property="og:title" content="Faqs | Aakhyaan Academy" key="ogtitle" />
                <meta property="og:description" content="Get to know how to use our site. Look at some of the frequently asked questions." key="ogdesc" />
            </Head>
            <Header page="programmes" />
            <div className="dark:bg-background dark:text-mainText/90 px-[6%] lg:py-10 text-lg lg:min-h-full font-light bg-back">
                <div className="container md:mt-20">
                    <div className="md:px-8">
                        <div className="px-4 xl:px-0">
                            <div className="flex flex-col lg:flex-row flex-wrap">
                                <div>
                                    <h1 className="text-3xl ml-2 lg:ml-0 lg:text-4xl font-bold tracking-normal lg:text-leftt text-center">Frequently asked questions</h1>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 xl:px-0">
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pb-6 gap-8">
                                <div className="p-5 rounded-md relative h-full w-full">
                                    <div className="p-2 mb-5">
                                        <GoHome size={30} />
                                    </div>
                                    <h1 className="pb-4 text-2xl font-semibold">Account Overview</h1>
                                    <div className="my-5">
                                        {questionsAccount.map((question, i) =>
                                            <div key={i} className="flex flex-col pb-4 dark:border-gray-700 w-full space-x-3">
                                                <div className="flex gap-1 pb-1">
                                                    <BsArrowReturnRight />
                                                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{question.question}</div>
                                                </div>
                                                <div className="font-normal" dangerouslySetInnerHTML={{ __html: question.answer }}></div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="relative p-5 rounded-md h-full w-full">
                                    <div className="p-2 mb-5">
                                        <CgProfile size={30} />
                                    </div>
                                    <h1 className="pb-4 text-2xl font-semibold">Profile Preferences</h1>
                                    <div className="my-5">
                                        {questionsProfile.map((question, i) =>
                                            <div key={i} className="flex flex-col pb-4 dark:border-gray-700 w-full space-x-3">
                                                <div className="flex gap-1 pb-1">
                                                    <BsArrowReturnRight />
                                                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{question.question}</div>
                                                </div>
                                                <div className="font-normal" dangerouslySetInnerHTML={{ __html: question.answer }}></div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="relative p-5 rounded-md h-full  w-full">
                                    <div className="p-2 mb-5">
                                        <FcPrivacy size={30} />
                                    </div>
                                    <h1 className="pb-4 text-2xl font-semibold">Privacy and Cookies</h1>
                                    <div className="my-5">
                                        {questionsPrivacy.map((question, i) =>
                                            <div key={i} className="flex flex-col pb-4 dark:border-gray-700 w-full space-x-3">
                                                <div className="flex gap-1 pb-1">
                                                    <BsArrowReturnRight />
                                                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{question.question}</div>
                                                </div>
                                                <div className="font-normal" dangerouslySetInnerHTML={{ __html: question.answer }}></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Privacy;