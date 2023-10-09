import React, { useEffect, useState } from "react";
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from "next/router";
import Image from "next/legacy/image";

export default function ErrorPage() {
    const [darkMode, setDarkMode] = useState(true)
    const [path, setPath] = useState("")
    const router = useRouter()
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
        setPath(router.asPath)
    }, [router, darkMode])
    return (
        <div className="bg-back dark:text-white/90 dark:bg-background w-full h-screen flex col-span-4">
            <Head>
                <title>Page Not Found | Aakhyaan Academy</title>
                <meta
                    name="description"
                    content="This page cannot be found in our server."
                />
                <meta property="og:title" content="Page Not Found | Aakhyaan Academy" key="ogtitle" />
            </Head>
            <div className="m-auto flex flex-col p-10">
                <div className="dark:hidden float-right select-none w-full h-[90px] mb-12 mt-5 relative">
                    <Image objectFit="contain" layout="fill" alt="Aakhyaan Academy" src="/aakhyaanText.png"></Image>
                </div>
                <div className="hidden dark:flex float-right select-none w-full h-[90px] mb-12 mt-5 relative">
                    <Image objectFit="contain" layout="fill" alt="Aakhyaan Academy" src="/aakhyaanTextWhite.png"></Image>
                </div>
                <span className="font-sans">
                    <span className="font-bold">404</span>. That's an error
                </span>
                <span className="mt-5 font-sans">
                    The requested URL{" "}
                    <strong>
                        {path.replace(process.env.FRONTEND, "")}&nbsp;
                    </strong>
                    was not found on this server.
                    <span className="font-thin">&nbsp;That’s all we know.</span>
                </span>
                <span className="mt-5 font-sans text-xl hover:underline transition-all text-blue-600">
                    <Link
                        href="/"
                    >
                        Goto Home
                    </Link>
                </span>
            </div>
        </div>
    );
}