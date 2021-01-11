import React from 'react'
import { Heading, Stack, FormControl, Input, InputGroup, InputRightElement, Button, Box, Flex, Spacer, Divider, Text, Center } from '@chakra-ui/react'
import { LockIcon } from '@chakra-ui/icons'
const SignInForm = ({handleSignIn, handleFormChange, showSignUp}) => {
    const [show, setShow] = React.useState(false)
    const handleShowPassword = () => setShow(!show)

    return (
        <>
            <Center>
                <Heading as="h5" size="md" my={5}> Log In</Heading>
            </Center>
            <Stack spacing="4">
                <FormControl id="email">
                    <Input 
                        variant="filled" 
                        type="email" 
                        onChange={handleFormChange} 
                        placeholder="Email"
                        name="email"
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <FormControl id="password">
                    <InputGroup size="md">
                    <Input
                        variant="filled"
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        onChange={handleFormChange}
                        placeholder="Password"
                        name="password"
                    />
                        <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                            {show ? "Hide" : "Show"}
                        </Button>
                        </InputRightElement>
                    </InputGroup>
                    {/* <FormHelperText>valifation stuff</FormHelperText> */}
                </FormControl>
                <Button leftIcon={<LockIcon />} onClick={handleSignIn} colorScheme="teal" size="md" type="submit">
                    Log In
                </Button>
            </Stack>
            <Box>
                <Divider my={4} />
                <Flex>
                    {/* <Button size="xs" colorScheme="teal" variant="ghost">
                        Forgot Password?
                    </Button> */}
                    <Spacer />
                    <Button size="xs" colorScheme="teal" variant="ghost" onClick={showSignUp}>
                        Don't have an account?
                    </Button>
                </Flex>
            </Box>
        </>
    )
}

export default SignInForm
