import Head from 'next/head'
import React from 'react'
import styles from '../styles/Home.module.css'
import { Box, Button, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const goToAuthPage = () => {
    router.push('/auth')
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
            <h1 className={styles.title}>
              Welcome to Feedback
            </h1>
            <Box mt={3}>
              <h4>A simple way to collect customer feedback from web and mobile platforms.</h4>
            </Box>
            <Box>
              <a href="/"><Heading as="h5" size="md" my={5}>How it Works</Heading></a>
            </Box>
            <Box py={5}>
              <Button onClick={goToAuthPage} colorScheme="teal" size="lg">
                Access Dashboard
              </Button>
            </Box>
      </main>
    </div>
  )
}
