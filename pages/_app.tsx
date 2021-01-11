import '../styles/globals.css'
import { Amplify, Auth } from 'aws-amplify'
import config from '../src/aws-exports'
import { ChakraProvider } from '@chakra-ui/react'

Amplify.configure({...config, ssr: true})
Auth.configure({...config, ssr: true})

function MyApp({ Component, pageProps }) {
  return <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
