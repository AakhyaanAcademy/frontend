import React, { useRef } from "react";
import Link from 'next/link'
import Image from "next/legacy/image";

function Intro() {
    const executeScroll = () => {
        const section = document.querySelector("#scrollTo");
        section.scrollIntoView({ behavior: "smooth", block: "end" });
    };
    return (
        <div className="dark:text-mainText text-base flex items-center w-full lg:flex-row flex-col">
            <div className="hidden lg:flex absolute -top-2 right-3">
                <svg className="fill-[#B2EBF2]"
                    width="508"
                    height="156"
                    viewBox="0 0 508 156"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.13902 -90.9627C-3.07622 -112.648 11.0862 -133.645 32.7717 -137.86L420.514 -213.23C442.2 -217.445 463.197 -203.282 467.412 -181.597L508.954 32.1162C513.169 53.8016 499.006 74.7984 477.321 79.0136L89.5781 154.383C67.8926 158.598 46.8959 144.436 42.6806 122.75L1.13902 -90.9627Z"
                    />
                </svg>
            </div>
            <div className="hidden md:flex absolute w-full">
                <svg
                    className="h-screen w-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        opacity="0.271043"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M-52.1072 -52.1907C-59.7794 -95.7023 -30.7259 -137.195 12.7856 -144.867L1338.83 -378.684C1382.34 -386.357 1423.83 -357.303 1431.51 -313.792L1580.84 533.143C1588.52 576.655 1559.46 618.147 1515.95 625.819L189.907 859.637C146.395 867.309 104.903 838.255 97.2303 794.744L-52.1072 -52.1907Z"
                        fill="#B2EBF2"
                    />
                </svg>
            </div>
            <div className="relative pt-[100px] md:pt-[120px] lg:pt-0 flex flex-col gap-3">
                <div className=" lg:mt-0 mt-[80px] w-full lg:w-full px-[50px] md:px-[100px] lg:pl-[160px] tracking-wide text-center lg:text-left relative">
                    <div className="w-full opacity-50 md:hidden lg:flex">
                        <span className="absolute inset-0 md:left-[200px] lg:left-[150px] -top-[60px] left-[50px] sm:left-[200px] ">
                            <Image alt="pattern" width={300} height={300} src="/pattern.svg" />
                        </span>
                        <span className="absolute inset-0 left-[50px] sm:left-[200px] md:left-[300px] md:-top-9">
                            <Image alt="pattern" width={200} height={300} src="/pattern.svg" />
                        </span>
                    </div>

                    <span className=" relative font-black text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-pink-600 dark:from-purple-200 dark:to-purple-400 to-purple-700 uppercase">
                        The digital platform to excel your higher studies.
                    </span>
                    <div className="relative text-xl text-black/50 dark:text-mainText/80 mt-2 mb-10 w-full ">
                        The new way of learning
                    </div>
                    <div className=" flex flex-col md:flex-row gap-3 items-center md:justify-start justify-center w-full z-20">
                        <div className="flex gap-3 items-center justify-center lg:justify-start w-full my-[50px]">
                            <span
                                onClick={executeScroll}
                                className="cursor-pointer text-xl font-normal text-blue-500 uppercase whitespace-nowrap z-10"
                            >
                                More Info
                            </span>
                            <Link href="/programmes" legacyBehavior>
                                <span className="cursor-pointer bg-footer hover:bg-blue-700 hover:translate-x-0.5 transition-all text-white py-3 px-4 rounded-md shadow-lg  shadow-blue-800/30 text-lg font-medium md:text-xl whitespace-nowrap z-10">
                                    GET STARTED
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="hidden lg:flex relative dark:opacity-90 w-full h-screen pt-[150px]"
            >
                <div className="absolute right-0 flex">
                    <span className="hidden 2xl:flex">
                        <Image src="/Layer4.svg" width={450} height={750} alt="landing picture 2"></Image>
                    </span>
                    <span className="">
                        <Image src="/Layer2.svg" width={400} height={550} alt="landing picture 1"></Image>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Intro;
