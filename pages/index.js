import Head from 'next/head'
import React from 'react'
import Footer from "../components/Footer";
import Header from "../components/Header";
import Posts from "../components/Posts/Posts";
import Intro from "../components/Intro";
import LandingContents from "../components/LandingContents";

function index() {
  return (
    <div className={`bg-back dark:bg-background overflow-hidden`}>
      <Head>
        <title>Aakhyaan Academy</title>
        <meta name="google-site-verification" content="shLfb4ERpVaJLhF0TVYv36m1OPrNHB6pxyo0gqwMasc" />
        <meta name="description"
          content="Why Aakhyaan Academy? Aakhyaan Academy is an online platform for Entrance Preparation and NEB Exam Preparation in Nepal." />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta property="og:image" content="/favicon.ico" />
        <meta name="keywords" content="Entrance Preparation, NEB Exam Preparation, Mcqs, Programmes, A new way of learning"
        />
        <meta name="og:title" content="Aakhyaan Academy" />
        <meta property="og:description" content="Why Aakhyaan Academy? Aakhyaan Academy is an online platform for Entrance Preparation and NEB Exam Preparation in Nepal." key="ogdesc" />
      </Head>
      <Header page="home" />
      <Intro />
      <LandingContents />
      <Posts />
      <Footer />
    </div>
  )
}

export default index