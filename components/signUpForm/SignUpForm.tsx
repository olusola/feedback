import { ArrowForwardIcon } from '@chakra-ui/icons'
import { FormControl, FormLabel, Input, FormHelperText, Stack, Button, Heading, InputRightElement, InputGroup, Box, Divider, Flex, Spacer, Center } from '@chakra-ui/react'
import React from 'react'

const SignUpForm = ({handleChange, handleFormChange, showSignIn}) => {
    const [show, setShow] = React.useState(false)
    const handleShowPassword = () => setShow(!show)

    return (
        <>
            <Center>
                <Heading as="h5" size="md" my={5}> Create an account</Heading>
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
                <Button rightIcon={<ArrowForwardIcon />} onClick={handleChange} colorScheme="teal" size="md" type="submit">
                    Create account
                </Button>
            </Stack>
            <Box>
                <Divider my={4} />
                <Flex>
                    <Spacer />
                    <Button size="xs" colorScheme="teal" variant="ghost" onClick={showSignIn}>
                        Already have an account?
                    </Button>
                </Flex>
            </Box>
        </>
    )
}

export default SignUpForm
