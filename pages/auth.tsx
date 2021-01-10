import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { Container, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import AuthCodeForm from '../components/authCodeForm/AuthCodeForm'
import SignInForm from '../components/signInForm/SignInForm'
import SignUpForm from '../components/signUpForm/SignUpForm'
import db from '../src/firebase'

const ProcessAuth = () => {
    const initialFormState = { 
        password: '', email: '', authCode: '', formType: 'signIn'
    }

    const router = useRouter()
    const [formState, updateFormState] = useState(initialFormState)
    const { formType } = formState

    const handleFormChange = (e) => {
        e.persist()
        updateFormState({...formState, [e.target.name]: e.target.value})
    }

    const signUp = async () => {
        const { email, password } = formState
        const username = email
        try {
            await Auth.signUp({username, password, attributes : { email }})
            .then((user) => {
                const { userSub } = user

                const mainRef = db.collection("users").doc(userSub)
                
                mainRef.collection("widgets").doc("data")
                .set({all: 
                    [
                        {
                            name: 'primary',
                            up: '-',
                            down: '-',
                            message: ''
                        }
                    ]
                })
                .catch((error) => console.log('error writing document', error))
        
                mainRef.collection("private").doc("data")
                .set({email:`${user.user.getUsername()}`, userId: userSub})
                .catch((error) => console.log('error writing document', error))
            })

            updateFormState({...formState, formType: 'confirmSignUp'})
        } catch (error) {
            console.log('error sign up', error);
        }
    }

    const confirmSignUp = async () => {
        const { email, authCode } = formState
        const username = email
        try {
            await Auth.confirmSignUp(username, authCode)
            
            updateFormState({...formState, formType: 'signIn'})
        } catch (error) {
        console.log('error confirming signup', error);
        }
    }

    const SignIn = async () => {
        const { email, password } = formState
        const username = email
        try {
            await Auth.signIn(username, password)
            router.push('/dashboard')
        } catch (error) {
            router.push('/auth')
            console.log('error signing in', error);
        }
    }

    const showSignIn = () => updateFormState({...formState, formType: 'signIn'})

    const showSignUp = () => updateFormState({...formState, formType: 'signUp'})
    
    return (
        <Container centerContent  h="100vh" justifyContent="center">
            <Box padding="5" maxW="5xl">
            {
                formType === 'signUp' && (
                    <SignUpForm 
                        handleChange={signUp}
                        handleFormChange={handleFormChange}
                        showSignIn={showSignIn}
                    />
                )
            }

            {
                formType === 'confirmSignUp' && (
                    <AuthCodeForm 
                        handleConfirmSignUp={confirmSignUp}
                        handleFormChange={handleFormChange}
                        showSignUp={showSignUp}
                    />
                )
            }

            {
                formType === 'signIn' && (
                    <SignInForm 
                        handleSignIn={SignIn}
                        handleFormChange={handleFormChange}
                        showSignUp={showSignUp}
                    />
                )
            }
            </Box>
        </Container>
    )
}

export default ProcessAuth
