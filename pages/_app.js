import Head from 'next/head'
import '../styles/globals.css'
import { MathJaxContext } from 'better-react-mathjax'
import { useRouter} from 'next/router'
import { useState, useEffect } from 'react'
import { Progress } from '../components/progress'

function MyApp({ Component, pageProps }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()
  const config = {
    "fast-preview": {
      disabled: true
    },
    tex2jax: {
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"]
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"]
      ]
    },
    messageStyle: "none"
  }

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true)
    }
    const handleStop = () => {
      setIsAnimating(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:url" content={process.env.FRONTEND + router.asPath} key="ogurl" />
        <meta property="og:site_name" content="Aakhyaan Academy" key="ogsitename" />
      </Head>

      <Progress isAnimating={isAnimating} />

      <MathJaxContext
        version={2}
        config={config}
        onStartup={(mathJax) => (mathJax.Hub.processSectionDelay = 0)}
      >
        <Component {...pageProps} />
      </MathJaxContext>
    </>
  )
}

export default MyApp