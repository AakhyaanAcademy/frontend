import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { verifyEmail } from '../../api/User'
import CircleLoader from "react-spinners/CircleLoader";
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function VerifyEmail() {
    let { id } = useRouter().query
    const [darkMode, setDarkMode] = useState(true);

    const { data, error } = useSWR(process.env.BACKEND + '/user/verify-email/', async url => await verifyEmail(url, { token: id }), { revalidateOnFocus: false, revalidateOnReconnect: true })

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
    }, [darkMode])

    return (
        <div className='h-screen'>
            <Head>
                <title>Email Verification | Aakhyaan Academy</title>
                <meta
                    name="description"
                    content="Verify your email for establishing yourself as a real user."
                />
                <meta name="keywords" content="verify" />
                <meta property="og:title" content="Email Verification | Aakhyaan Academy" key="ogtitle" />
                <meta property="og:description" content="Verify your email for establishing yourself as a real user." key="ogdesc" />
            </Head>
            <div className={`font-sans bg-back dark:bg-background dark:text-mainText w-full h-full flex pt-[6vh] md:pt-[7vh]`}>
                <div className='m-auto flex flex-col items-center gap-5'>
                    {!data && !error ?
                        < CircleLoader color="blue" size={50} />
                        :
                        <span className='text-warningText'>
                            {data?.message}
                        </span>
                    }
                    <span className="text-center font-sans text-xl hover:underline transition-all dark:text-blue-500 text-blue-600">
                        <Link href="/">
                            Go Home
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
