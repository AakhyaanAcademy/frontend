import React from "react";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer"
import Breadcrumb from "../../../../components/Breadcrumb";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Head from 'next/head'
import axios from "axios";
import Link from "next/link";
import { getProgrammes } from '../../../../api/Courses'
import useSWR from "swr";
import Image from "next/legacy/image";

function Programmes(props) {
  const { data, error } = useSWR(process.env.BACKEND + `/program/list`, async url => await getProgrammes(url), { revalidateOnFocus: false, revalidateOnReconnect: true, fallbackData: props.props?.data })
  const programmes = data?.data

  function imageLoader({ src }) {
    return src
  }

  return (
    <div className={`w-full h-screen bg-back pt-20 dark:bg-background`}>
      <Head>
        <title>Submissions - Mock Test | Aakhyaan Academy</title>
        <meta
          name="description"
          content="Check your submission history of the mock tests you have given."
        />
        <meta
          property="og:description"
          content="Check your submission history of the mock tests you have given."
        />
        <meta property="og:title" content="Programmes | Aakhyaan Academy" key="ogtitle" />
      </Head>
      <Header page="programmes" />
      <Breadcrumb props={[{ header: "Submissions", link: "profile/submissions/mock-test" }]} />
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
              {programmes ?
                programmes.map((program, i) =>
                  <Link
                    key={i}
                    href={`mock-test/${program.courseId}?program=${program.title}&programId=${program._id}`}
                    legacyBehavior>
                    <a className={`max-w-sm lg:max-w-full flex cursor-pointer hover:translate-y-1 justify-center`} >
                      {program?.thumbnail ?
                        <div className="ring-1 ring-opacity-5 ring-blue-900 h-full w-[160px] md:w-[240px] relative">
                          <Image
                            objectFit="contain"
                            layout="fill"
                            alt={program?.title}
                            loader={imageLoader}
                            src={program?.thumbnail}
                          />
                        </div>
                        :
                        <></>
                      }
                      <div className="relative shadow-xl min-h-[200px] md:min-h-[220px] w-[160px] md:w-[240px] border-transparent border-gray-400 dark:bg-gray-800 bg-back dark:text-mainText/80 rounded-md p-8 flex flex-col justify-between">
                        <div className="my-auto flex flex-col items-center justify-center">
                          <div className="font-bold text-2xl text-center">{program?.title}</div>
                        </div>
                      </div>
                    </a>

                  </Link>
                )
                :
                <div className="text-mainText text-xl">
                  {data?.message}
                </div>
              }
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