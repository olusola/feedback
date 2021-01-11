import '../styles/globals.css'
import { Amplify } from 'aws-amplify'
import { ChakraProvider } from '@chakra-ui/react'


const awsmobile = {
  "aws_project_region": process.env.aws_project_region,
  "aws_cognito_identity_pool_id": process.env.aws_cognito_identity_pool_id,
  "aws_cognito_region": process.env.aws_cognito_region,
  "aws_user_pools_id": process.env.aws_user_pools_id,
  "aws_user_pools_web_client_id": process.env.aws_user_pools_web_client_id,
  "oauth": {}
};

Amplify.configure({...awsmobile, ssr: true})

function MyApp({ Component, pageProps }) {
  return <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
