import React from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { FcPhone } from 'react-icons/fc'
import { MdLocationPin } from 'react-icons/md'
import Head from 'next/head'

export default function Contact() {
    return (
        <div className='bg-back dark:bg-background w-full h-screen dark:text-mainText/70'>
            <Head>
                <title>Contact Us | Aakhyaan Academy</title>
                <meta
                    name="description"
                    content="Contact Us: Rajan Babu Panta-+977-9840544740, Sunil Adhikari-+977-9845711721 - Chakupat, Lalitpur"
                />
                <meta name="keywords" content="Contact Us" />
                <meta property="og:title" content="Contact Us | Aakhyaan Academy" key="ogtitle" />
                <meta property="og:description" content="Contact Us: Rajan Babu Panta-+977-9840544740, Sunil Adhikari-+977-9845711721 - Chakupat, Lalitpur" key="ogdesc" />
            </Head>
            <Header page="about" />
            <div className={`dark:bg-background w-full h-full`}>
                <div className='w-full text-5xl m-auto gap-1 flex justify-center items-center lg:text-left bg-footer/20 dark:bg-white/20 h-[200px] md:h-[280px] flex-col'>
                    <span>Contact Us</span>
                    <a href='mailto:contact@aakhyaan.org' className='text-lg text-blue-500'>contact@aakhyaan.org</a>
                </div>
                <div className='px-[10%] grid grid-cols-1 gap-10 md:grid-cols-2 py-32'>
                    <div className='flex flex-col'>
                        <div className='flex gap-2 items-center mb-2'>
                            <span><FcPhone color="blue" size={35} /></span>
                            <span className='text-2xl font-medium'>Phone</span>
                        </div>
                        <div className='flex flex-col ml-4 gap-2 text-xl'>
                            <div className='flex flex-col'>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rajan Babu Panta</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+977-9840544740
                            </div>
                            <div className='flex flex-col'>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sunil Adhikari</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+977-9845711721
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex gap-2 items-center mb-2'>
                            <span><MdLocationPin color="blue" size={35} /></span>
                            <span className='text-2xl font-medium'>Location</span>
                        </div>
                        <div className='flex flex-col ml-4 text-xl'>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chakupat, Lalitpur
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}