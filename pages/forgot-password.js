import React, { useEffect, useState } from "react";
import Header from "../components/Header"
import { useRouter } from "next/router";
import { logoutUser } from '../api/User'
import { forgotPassword } from '../api/User'
import { Avatar } from '@mui/material'
import useSWR from 'swr'
import { getProfile } from '../api/Profile'
import Footer from '../components/Footer'
import Link from 'next/link'
import Head from 'next/head'
import Image from "next/legacy/image";

export default function Forgot() {
    const router = useRouter()
    const [reset, setReset] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [logged, setLogged] = useState(false)
    const [loggedUser, setLoggedUser] = useState({
        username: "",
        avatar: ""
    })
    const [user, setUser] = useState({ email: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await forgotPassword(process.env.BACKEND + "/user/password-reset/", user)
        if (typeof data !== typeof undefined) {
            if (data.success) {
                setReset(true)
            } else {
                setErrorMessage(data.message)
            }
        }
    }

    const logout = async (e) => {
        e.preventDefault()
        await logoutUser(process.env.BACKEND + "/user/logout/")
        router.push('/login')
    }

    const { data } = useSWR(process.env.BACKEND + "/user/profile", async url => await getProfile(url))

    useEffect(() => {
        async function getData() {
            if (typeof data !== typeof undefined) {
                if (data.success) {
                    setLogged(true)
                    setLoggedUser({ username: data?.data?.firstName + " " + data?.data?.lastName, avatar: data?.data?.profilePicture })
                } else {
                    setLogged(false)
                }
            }
        }
        getData()
    }, [data])

    return (
        <div className="h-screen">
            <Head>
                <title>Forgot Password | Aakhyaan Academy</title>
                <meta
                    name="description"
                    content="Get back your account in case you forgot your credentials."
                />
                <meta name="keywords" content="forgot" />
                <meta property="og:title" content="Forgot Password | Aakhyaan Academy" key="ogtitle" />
                <meta property="og:description" content="Get back your account in case you forgot your credentials." key="ogdesc" />
            </Head>
            <Header page="forgot" />
            {logged ?
                <div className={`bg-back dark:bg-background w-full min-h-full flex items-center justify-center gap-20 pl-10 pr-10`}>
                    <div className="flex flex-col gap-3 items-center">
                        <div className="dark:text-red-400 font-sans text-red-800">
                            Hey, you are already logged in as
                        </div>
                        <div className="dark:bg-formBox dark:text-mainText/75 bg-blue-50 flex flex-col gap-3 dark:md:border-0 md:border-2 shadow-lg p-10">
                            <div className="hover:cursor-pointer flex flex-col md:flex-row items-center gap-4 md:gap-10">
                                <div onClick={() => {
                                    navigate('/')
                                }} className="flex items-center gap-3">
                                    <div><Avatar alt="" src={loggedUser?.avatar} /></div>
                                    <div className="font-sans dark:text-mainText/75 text-blue-900 text-xl hover:underline">
                                        {loggedUser?.username}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <span onClick={logout} className={` font-sans hover:underline`}>
                                        <Link href="/">Log Out</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="font-sans dark:text-mainText dark:bg-background w-full min-h-full flex items-center justify-center gap-20">
                    <div className="w-full max-w-xs md:max-w-md flex flex-col items-center">
                        <form className="dark:md:bg-formBox md:bg-blue-50 md:shadow-md rounded px-12 pt-8 pb-12 mb-4 h-full" onSubmit={handleSubmit}>
                            <div className="dark:hidden float-right select-none w-full h-[90px] mb-12 mt-5 relative">
                                <Image objectFit="contain" layout="fill" alt="Aakhyaan Academy" src="/aakhyaanText.png" priority="eager"></Image>
                            </div>
                            <div className="hidden dark:flex float-right select-none w-full h-[90px] mb-12 mt-5 relative">
                                <Image objectFit="contain" layout="fill" alt="Aakhyaan Academy" src="/aakhyaanTextWhite.png" priority="eager"></Image>
                            </div>
                            {!reset ?
                                <>
                                    <div className="flex flex-col gap-5 clear-both">
                                        <div className='text-left mb-2 text-lg'>Please enter your email so that we can do a quick search for your account. Thank you!</div>
                                        <div className="mb-4">
                                            <input className="font-sans shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-600 focus:shadow-none" type="text" placeholder="Email"
                                                value={user.email}
                                                onChange={e =>
                                                    setUser({ ...user, email: e.target.value })
                                                } required />
                                        </div>
                                    </div>
                                    <div className="mb-4 font-sans tracking-wide text-center text-red-500">
                                        {errorMessage}
                                    </div>
                                    <div className="flex justify-center md:justify-end">
                                        <button className="font-sans mt-1 text-lg hover:-translate-y-0.5 transition-all bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                            Submit
                                        </button>
                                    </div>
                                </>
                                :
                                <div className="dark:text-blue-200 font-sans clear-both flex flex-col">
                                    <div className="text-center mb-5 mt-5 dark:text-gray-500 text-blue-500">A password reset link has been sent to the email {user.email}</div>
                                    <div className="text-center mb-5">Please reset your password.</div>
                                    <div className="flex relative mb-5">
                                        <span className="dark:text-blue-500 text-green-800 dark:text-lg absolute right-0 hover:underline">
                                            <Link href="/login">Ok</Link>
                                        </span>
                                    </div>

                                </div>}
                        </form>
                        <p className="dark:text-white text-center text-gray-500 text-xs">
                            Aakhyaan © 2022 aakhyaan.org. All Rights Reserved
                        </p>
                    </div>
                </div>
            }
            <Footer />
        </div>
    )
}
