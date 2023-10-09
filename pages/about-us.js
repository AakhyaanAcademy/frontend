import Head from 'next/head'
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function AboutUs() {
  return (
    <div className='bg-back dark:bg-background w-full h-screen dark:text-mainText/70'>
      <Head>
        <title>About Us | Aakhyaan Academy</title>
        <meta
          name="description"
          content="Our vision is to be known for creating the platform in such a way that it provokes authentic, comprehensive, continuous and challenging learning experiences."
        />
        <meta name="keywords" content="Our vision, authentic, comprehensive, continuous, challenging" />
        <meta property="og:title" content="About Us | Aakhyaan Academy" key="ogtitle" />
        <meta property="og:description" content="Our vision is to be known for creating the platform in such a way that it provokes authentic, comprehensive, continuous and challenging learning experiences." key="ogdesc" />

      </Head>
      <Header page="about" />
      <div className={`md:text-xl dark:bg-background w-full h-full md:h-full flex items-center justify-center gap-20 pl-10 pr-10 pt-[100px] pb-10`}>
        <div className='px-[6%]'>
          <p className='text-center text-4xl md:text-5xl font-semibold dark:text-blue-400'>Aakhyaan</p>
          <div className='mt-14 font-normal text-lg'>We stand among the others so you can get a clear view of what we exactly are in front of them.
            We know your objectives, we sharpen your mind and skills for the very purpose and make you do the things you are capable of. Our vision is to be known for creating the platform in such a way that it provokes authentic, comprehensive, continuous and challenging learning experiences. We stand for your FUTURE, now.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}