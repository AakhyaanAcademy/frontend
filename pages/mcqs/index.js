import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer"
import Breadcrumb from "../../components/Breadcrumb";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Head from 'next/head'
import axios from "axios";
import Link from "next/link";
import { getCourses } from '../../api/Courses'
import useSWR from "swr";
import Image from "next/legacy/image";
import { useRouter } from "next/router";

function Programmes(props) {
  const router = useRouter()
  const { data, error } = useSWR(process.env.BACKEND + `/program/list`, async url => await getCourses(url), { revalidateOnFocus: false, revalidateOnReconnect: true, fallbackData: props.props?.data })
  const courses = data?.data

  function imageLoader({ src }) {
    return src
  }

  return (
    <div className={`w-full h-screen bg-back pt-20 dark:bg-background`}>
      <Head>
        <title>Test | Aakhyaan Academy</title>
        <meta
          name="description"
          content="We provide mock tests and chapterwise tests every week to prepare you for your future. Know that if you are failing to prepare, you are preparing to fail."
        />
        <meta
          property="og:description"
          content="We provide mock tests and chapterwise tests every week to prepare you for your future. Know that if you are failing to prepare, you are preparing to fail."
          key="ogdescription"
        />
        <meta property="og:title" content="Test | Aakhyaan Academy" key="ogtitle" />
      </Head>
      <Header page="Mcqs" />
      <Breadcrumb props={[{ header: "Test ", link: "mcqs" }]} />
      <div className="dark:bg-background bg-back flex w-full min-h-full pb-20 px-10 justify-center items-center">
        <div className="flex flex-wrap justify-center gap-10 py-20">
          {!data && !error ?
            <>
              {[...Array(2)].map((val, i) =>
                <div key={i} >
                  <div ><Skeleton width={240} height={180} baseColor='gray' /></div>
                </div>
              )}
            </>
            :
            <>
              {courses && courses.map((course, i) =>
                <Link
                  key={i}
                  href={`/mcqs/${course.courseId}?program=${course.title}&programId=${course._id}`}
                  legacyBehavior>
                  <a className={`max-w-sm lg:max-w-full flex cursor-pointer hover:translate-y-1 justify-center`}>
                    {course?.thumbnail ?
                      <div className="ring-1 ring-opacity-5 ring-blue-900 h-full w-[160px] relative">
                        <Image
                          objectFit="contain"
                          layout="fill"
                          alt={course?.title}
                          loader={imageLoader}
                          src={course?.thumbnail}
                        />
                      </div>
                      :
                      <></>
                    }
                    <div className="relative shadow-xl h-[180px] w-[160px] md:h-[200px] md:w-[200px] border-transparent border-gray-400 dark:bg-gray-800 bg-back dark:text-mainText/80 rounded-md p-8 flex flex-col justify-between">
                      <div className="my-auto flex flex-col items-center justify-center">
                        {/* <p className="absolute bottom-2 right-2 flex gap-2 text-sm items-center">
                        <VscUnlock />
                        <span>Free</span>
                      </p> */}
                        <div className="font-bold text-2xl text-center">{course?.title}</div>
                      </div>
                    </div>
                  </a>
                </Link>
              )
              }
              :
              <div className="text-mainText text-xl">
                {data?.message}
              </div>
            </>
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

Programmes.getInitialProps = async (context) => {
  const data = await axios.get(process.env.BACKEND + `/program/list`,
    {
      withCredentials: true,
      headers: {
        Cookie: context.req?.headers.cookie
      }
    }).then(res => res.data)

  return {
    props: { data }
  }
}

export default Programmes;