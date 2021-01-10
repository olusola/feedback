import { FormControl, Input, Button, Box, Divider, Flex, Spacer, Stack, Center, Heading } from '@chakra-ui/react'
import React from 'react'

const AuthCodeForm = ({handleConfirmSignUp, handleFormChange, showSignUp}) => {
    return (
        <>
            <Center>
                <Heading as="h5" size="md" my={5}>Confirmation Code</Heading>
            </Center>
            <Stack>
                <FormControl id="authCode">
                    <Input
                        name="authCode"
                        variant="filled" 
                        type="number" 
                        onChange={handleFormChange} 
                        placeholder="Enter Code"
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <Button onClick={handleConfirmSignUp} colorScheme="teal" size="md" type="submit">
                    Submit Code
                </Button>
            </Stack>
            <Box>
                <Divider my={4} />
                <Flex>
                    <Button size="xs" colorScheme="teal" variant="ghost">
                        Resend Code
                    </Button>
                    <Spacer />
                    <Button size="xs" colorScheme="teal" variant="ghost" onClick={showSignUp}>
                        Don't have an account?
                    </Button>
                </Flex>
            </Box>
        </>
    )
}

export default AuthCodeForm
