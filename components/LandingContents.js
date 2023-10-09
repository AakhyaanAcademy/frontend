import React from "react";
import { TbBulb } from "react-icons/tb";
import { FaBook } from "react-icons/fa";
import Image from "next/legacy/image";

export default function LandingContents() {
  return (
    <div className="md:pt-56 lg:pt-0">
      <div className="w-full lg:mb-32 text-center bg-[#DFF7E7] dark:bg-gray-900 py-10 my-10 flex flex-col gap-7">
        <div className="text-xl text-gray-500">What's new?</div>
        <div className="m-auto">
          <Image width={300} height={150} layout="fixed" alt="Aakhyaan Mcqs/Mock Tests" src="/mcq.jpg"></Image>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-2xl font-bold text-yellow-700">
            AAKHYAAN MCQS/MOCK TESTS
          </div>
          <div className="text-lg italic text-green-700">
            THE LARGEST AND EXPANDING POOL OF MCQS FOR COMPETITIVE EXAMS.
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-16 px-[50px] md:px-[100px] lg:px-[160px] items-center text-center lg:text-left text-lg">
        <div className="dark:text-gray-300 flex flex-col py-9 lg:pr-9 gap-5 h-fit">
          <div className="p-3 px-4 rounded-md dark:bg-slate-600 bg-gray-200 w-fit m-auto lg:m-0">
            <TbBulb size={50} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-medium text-2xl">Learn the latest skills</div>
            <span>
              A man who carries a cat by the tail learns something he can learn
              in no other way..
            </span>
          </div>
        </div>

        <div className="dark:text-gray-300 rounded-xl dark:bg-formBox bg-white/70 flex flex-col p-9 gap-5 h-fit shadow-box shadow-black/10 w-full">
          <div className="p-3 px-6 rounded-md bg-gray-200 w-fit dark:bg-slate-600 m-auto lg:m-0">
            <svg
              className="fill-gray-700 dark:fill-white/70"
              width="30"
              height="50"
              viewBox="0 0 59 90"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M58.5 27C58.5 12.105 45.3862 0 29.25 0C13.1138 0 0 12.105 0 27C0 35.865 4.63125 43.695 11.7487 48.6L4.875 90L29.25 76.5L53.625 90L46.7513 48.6C53.8688 43.695 58.5 35.865 58.5 27ZM29.25 45C18.4762 45 9.75 36.945 9.75 27C9.75 17.055 18.4762 9 29.25 9C40.0238 9 48.75 17.055 48.75 27C48.75 36.945 40.0238 45 29.25 45Z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-medium text-2xl">Get ready for a career</div>
            <span>If opportunity doesn't knock, build a door.</span>
          </div>
        </div>

        <div className="dark:text-gray-300 flex flex-col py-9 lg:pl-9 gap-5 h-fit">
          <div className="p-3 px-4 rounded-md dark:bg-slate-600 bg-gray-200 w-fit m-auto lg:m-0">
            <FaBook size={50} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-medium text-2xl">Our learning library</div>
            <span>Whatever the cost of our libraries, the price is cheap compared to that of an ignorant nation.</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-[50px] md:px-[100px] lg:px-[160px] lg:flex-row items-center w-full gap-10 md:gap-16 lg:gap-20 text-white py-16 md:py-28 lg:py-32">
        <Image width={500} height={330}
          alt="Man focusing on study, online"
          src="/mac.png"
        ></Image>
        <span className="text-3xl md:text-4xl lg:w-[200px] xl:w-full text-center xl:text-left text-blue-900 dark:text-blue-400 font-semibold">
          Know you're making the best possible choice for yourself.
        </span>
      </div>
    </div>
  );
}
