import React from "react";
import Link from 'next/link'
import Image from "next/legacy/image";

export default function Post({ blog, handleDragStart }) {
  function imageLoader({ src }) {
    return src
  }

  return (
    <div className="group flex flex-col w-[280px] md:w-[290px] shadow-box shadow-black/5 hover:shadow-black/10 rounded-3xl p-[9px] overflow-hidden dark:bg-formBox bg-back ring-2 ring-opacity-5 ring-black" role="presentation" onDragStart={handleDragStart}>
      <span className="flex justify-center items-center h-[160px] w-full md:h-[180px]  dark:border-background dark:bg-formBox ">
        <Link href={`/blog-post/${blog.id}`} legacyBehavior>
          <div className="relative w-full h-full">
            <Image layout="fill" objectFit="contain"
              loader={imageLoader}
              src={blog?.attachment_url_images?.medium}
              alt={blog?.title?.rendered}
            ></Image>
          </div>
        </Link>
      </span>
      <div className="pt-2 pb-5 px-4 flex flex-col gap-1">
        <div className="font-light italic text-slate-400 text-[14px] text-left">
          POSTED:<span className="ml-1">{Date(blog?.modified)?.split(' ').map((d, i) => { if (i < 4) return ` ${d}` })}</span>
        </div>
        <span className="text-[22px] w-fit dark:text-white text-left">
          <Link href={`/blog-post/${blog.id}`} legacyBehavior>
            <span
              className="capitalize line-clamp-1"
              dangerouslySetInnerHTML={{ __html: blog?.title?.rendered }}
            ></span>
          </Link>
        </span>
        <div
          className="h-[38px] mb-3 line-clamp-2 text-left text-black dark:text-mainText/80"
          dangerouslySetInnerHTML={{ __html: blog?.excerpt?.rendered }}
        ></div>
        <Link href={`/blog-post/${blog.id}`} legacyBehavior>
          <span className="cursor-pointer z-10 border-2 border-black/50 dark:bg-white bg-black  dark:border-white/60 w-[154px] h-[50px] place-self-end relative">
            <span className="bg-white dark:bg-gray-600 inset-0 absolute border-2 group-hover:border-black dark:group-hover:border-white/60 border-transparent p-1 w-[150px]  group-hover:translate-x-[5px] group-hover:-translate-y-[7px] transition-all duration-150 dark:text-white text-black flex items-center justify-center">
              Read More.
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
