import React from "react";
import Link from 'next/link'
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { SiTiktok } from "react-icons/si";
import Image from "next/legacy/image";

export default function Footer() {
  return (
    <div className="relative z-20 bg-back dark:text-mainText/90 max-h-fit dark:bg-formBox">
      <div className="w-full max-h-[80px] md:max-h-[110px] text-footer">
        <svg
          className="fill-footer dark:fill-formBox bg-back dark:bg-background"
          viewBox="0 -20 700 110"
          width="100%"
          height="110"
          preserveAspectRatio="none"
        >
          <path d="M0,10 c80,-18 230,-12 350,7 c80,13 260,17 350,-5 v100 h-700z" />
        </svg>
      </div>
      <div className="bg-footer dark:bg-formBox pt-5">
        <div className="flex flex-col lg:flex-row lg:px-20 px-5">
          <div className="flex flex-col gap-3 md:gap-8 text-slate-400 items-center justify-center px-3">
            <Image width={180} height={70} layout="intrinsic"
              alt="Aakhyaan Logo"
              src="/logo2.png"
            />
            <span className="text-xl md:text-2xl antialiased font-bold text-center">
              The City's Growing Tutor Chain
            </span>
          </div>
          <div className="flex gap-10 mt-10 px-[5%] md:px-[100px] md:gap-36 lg:gap-24 xl-gap-[40%] 2xl:gap-[80%] md:whitespace-nowrap">
            <div className="text-mainText/80 text-lg flex flex-col">
              <div className="text-xl font-bold mb-2 text-white/30">
                Company
              </div>
              <div className="py-1 md:py-[1px]">
                <span className="hover:text-blue-600">
                  <Link href="/about-us">
                    About Us
                  </Link>
                </span>
              </div>
              <div className="py-1 md:py-[1px]">
                <span className="hover:text-blue-600">
                  <Link href="/privacy-policy">
                    Privacy Policy
                  </Link>
                </span>
              </div>
              <div className="py-1 md:py-[1px]">
                <span className="hover:text-blue-600">
                  <Link href="/terms-and-conditions"
                  >
                    Terms and Conditions
                  </Link>
                </span>
              </div>
              <div className="py-1 md:py-[1px]">
                <span className="hover:text-blue-600">
                  <Link
                    href="/contact-us"
                  >
                    Contact Us
                  </Link>
                </span>
              </div>
            </div>
            <div className="flex gap-5 flex-col lg:flex-row lg:gap-16 xl:gap-20 2xl:gap-24">
              <div className="text-mainText/80 text-lg flex flex-col">
                <div className="text-xl font-bold mb-2 text-white/30">
                  Features
                </div>
                <div className="py-1 md:py-[1px]">
                  <span className="hover:text-blue-600">
                    <Link href="/programmes">
                      Programmes
                    </Link>
                  </span>
                </div>
              </div>
              <div className="text-mainText/80 text-lg flex flex-col">
                <div className="text-xl font-bold mb-2 text-white/30">
                  Students
                </div>
                <div className="py-1 md:py-[1px]">
                  <span className="hover:text-blue-600">
                    <Link href="/faqs">
                      FAQs
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 flex gap-8 justify-center items-center mt-5 lg:pt-10">
          <a href="https://www.facebook.com/aakhyaanacademy/" target="_blank" rel="noreferrer">
            <div className="text-white/80 hover:cursor-pointer hover:translate-x-0.5 hover:-translate-y-0.5 transition-all">
              <BsFacebook size={25} />
            </div>
          </a>
          <a href="https://www.youtube.com/channel/UCcYIl3IhmPw2khk22Gh_PVA" target="_blank" rel="noreferrer">
            <div className="text-white/80 hover:cursor-pointer hover:translate-x-0.5 hover:-translate-y-0.5 transition-all">
              <BsYoutube size={25} />
            </div>
          </a>
          <a href="https://www.tiktok.com/@aakhyaan2022" target="_blank" rel="noreferrer">
            <div className="text-white/80 hover:cursor-pointer hover:translate-x-0.5 hover:-translate-y-0.5 transition-all">
              <SiTiktok size={25} />
            </div>
          </a>
        </div>
        <div className="dark:bg-formBox text-mainText/80 p-6 pt-2 text-base text-center">
          Aakhyaan © 2022 aakhyaan.org. All Rights Reserved
        </div>
      </div>
    </div>
  );
}