import React, { useEffect, useState } from "react";
import { logoutUser, resetPassword } from '../../../api/User'
import { getProfile } from '../../../api/Profile'
import { Avatar } from '@mui/material'
import useSWR from 'swr'
import { useRouter } from "next/router";
import Head from 'next/head'
import Link from 'next/link'

export default function VerifyEmail() {
    const router = useRouter()
    let { token } = useRouter().query
    const [darkMode, setDarkMode] = useState(true);
    const [message, setMessage] = useState("")
    const [logged, setLogged] = useState(false)
    const [loggedUser, setLoggedUser] = useState({
        username: "",
        avatar: ""
    })
    const [resetSuccess, setResetSuccess] = useState(false)
    const [password, setPassword] = useState("")
    const [pass, setPass] = useState({ pass1: "", pass2: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pass.pass1 !== pass.pass2) {
            setMessage("Your passwords don't match")
        } else {
            const data = await resetPassword(process.env.BACKEND + "/user/new-password/", { token: token, newPassword: password })
            if (typeof data !== typeof undefined) {
                if (data.success) {
                    setResetSuccess(true)
                } else {
                    setMessage(data.message)
                }
            }
        }
    }


    const logout = async (e) => {
        e.preventDefault()
        await logoutUser(process.env.BACKEND + "/user/logout/")
        router.push('/login')
    }

    const { data } = useSWR(process.env.BACKEND + "/user/profile", async url => await getProfile(url), { revalidateOnFocus: false, revalidateOnReconnect: true })

    useEffect(() => {
        setDarkMode(JSON.parse(localStorage.getItem("md")) !== null
            ? JSON.parse(localStorage.getItem("md"))
            : true)

        const root = window.document.documentElement
        if (darkMode) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
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
    }, [data, darkMode])


    return (
        <div className={`font-sans bg-back dark:bg-background dark:text-mainText w-full h-screen flex pt-[6vh] md:pt-[7vh]`}>
            <Head>
                <title>Reset Password | Aakhyaan Academy</title>
                <meta
                    name="description"
                    content="Reset your password in case you want to change."
                />
                <meta name="keywords" content="Reset" />
                <meta property="og:title" content="Reset Password | Aakhyaan Academy" key="ogtitle" />
                <meta property="og:description" content="Reset your password in case you want to change." key="ogdesc" />
            </Head>
            {logged ?
                <div className={`dark:bg-background w-full h-full flex items-center justify-center gap-20 pl-10 pr-10`}>
                    <div className="flex flex-col gap-3 items-center">
                        <div className="dark:text-red-400 font-sans text-red-800">
                            Hey, you are already logged in as
                        </div>
                        <div className="dark:bg-formBox dark:text-mainText/75 bg-blue-50 flex flex-col gap-3 dark:md:border-0 md:border-2 shadow-lg p-10">
                            <div className="hover:cursor-pointer flex flex-col md:flex-row items-center gap-4 md:gap-10">
                                <div onClick={() => {
                                    router.push('/')
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
                <div className='m-auto flex flex-col gap-10 dark:md:bg-slate-700 p-10'>
                    {!resetSuccess ?
                        <>
                            <div className='dark:text-gray-400 text-center'>Enter new password</div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <input className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight" type="password" placeholder="Enter Password"
                                        value={pass.pass1}
                                        onChange={(e) => {
                                            setPass({ ...pass, pass1: `${e.target.value}` })
                                            setPassword(e.target.value)
                                        }} required />
                                </div>
                                <div>
                                    <input className="font-sans shadow appearance-none border focus:outline-blue-800 focus:shadow-none border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" type="password" placeholder="Confirm Password"
                                        value={pass.pass2}
                                        onChange={(e) => {
                                            setPass({ ...pass, pass2: `${e.target.value}` })
                                            setPassword(e.target.value)
                                        }} required />
                                </div>
                                <div className="font-sans tracking-wide text-center text-red-500">
                                    {message}
                                </div>
                                <div className="mt-5 flex justify-center md:justify-start">
                                    <button className="font-sans text-lg hover:-translate-y-0.5 transition-all bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </>
                        :
                        <div className="dark:text-blue-200 font-sans clear-both flex flex-col">
                            <div className="text-center mb-5 dark:text-gray-500 text-blue-500">You have successfully reset your password</div>
                            <div className="flex relative mb-5">
                                <span className="dark:text-blue-500 text-green-800 dark:text-lg absolute right-0 hover:underline">
                                    <Link href="/login" >Goto Login Page</Link>
                                </span>
                            </div>

                        </div>}
                </div>
            }
        </div>
    )
}