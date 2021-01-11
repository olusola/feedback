import '../styles/globals.css'
import config from '../src/aws-exports'
import { Amplify } from 'aws-amplify'
import { ChakraProvider } from '@chakra-ui/react'

Amplify.configure({
  ...config,
})

function MyApp({ Component, pageProps }) {
  return <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
