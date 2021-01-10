import Head from 'next/head'
import React from 'react'
import styles from '../styles/Home.module.css'
import { Box, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const goToAuthPage = () => {
    router.push('/auth')
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
            <h1 className={styles.title}>
              Welcome to getFeedback
            </h1>
            <h4>Simple way to collect customer feedbacks from web and mobile platforms</h4>
            <Box py={5}>
            <Button onClick={goToAuthPage} colorScheme="teal" size="lg">
              Access Dashboard
            </Button>
            </Box>
      </main>
    </div>
  )
}
