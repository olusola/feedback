import React, { useEffect, useState } from 'react'
import { Box, 
    Button, 
    Text, 
    Flex, 
    Heading, 
    Spacer, 
    Container, 
    HStack, 
    Stack, 
} from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td, } from "@chakra-ui/react"
import {Stat, StatLabel, StatNumber, StatGroup} from "@chakra-ui/react"

import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import db from '../src/firebase'

const DashboardContainer = ({userId}) => {
    const router = useRouter()
    const [info, setInfo] = useState(null)
    
    const root_data = () => {
        db.collection("users").doc(userId).collection("widgets").doc("data")
        .onSnapshot((querySnapshot) => setInfo(querySnapshot.data()))
    }
    
    useEffect(() => {
        root_data()        
    }, [])

    const getTotalUp = () => {
        const res = info?.all.filter((ele) => ele.up === '1')
        return (res?.length === 0) ? 0 : res?.length
    }

    const getTotalDown = () => {
        const res = info?.all.filter((ele) => ele.down === '1')
        return (res?.length === 0) ? 0 : res?.length
    }

    const getTotalMessage = () => {
        const res = info?.all.filter((ele) => ele.message !== '')
        return (res?.length === 0) ? 0 : res?.length
    }

    const signOut = async () => {
        try {
            await Auth.signOut({ global: true })
            router.push('/')
        } catch (error) {
            console.log('error signing out: ', error)
        }
    }

    return (
        <Container bg="#EAEDF5" pt={5} h="100vh" maxW="100%">
            {/* 
                navigation
            */}
            <Flex bg="white" p={3} borderRadius={8}>
                <Box p="2">
                <Heading size="sm" >Feedback</Heading>
                </Box>
                <Spacer/>
                <HStack>
                    <a href="/">
                        <Button size="sm" colorScheme="teal" variant="link">
                            How It Works
                        </Button>
                    </a>
                    <Spacer/>
                    <Button onClick={signOut} size="sm" colorScheme="teal" type="button">
                        Log Out
                    </Button>
                </HStack>
            </Flex>

            {/* 
                Dashboard body
            */}

            <Flex mt={5}>
                {/* right pnel */}
                <Box w="100%" borderRadius={8}  mx={5}>
                    <Box bg="white" p="5" borderRadius={8}>
                        <Stack direction="row">
                            <Text size="md" fontWeight="500">Private Key:</Text>
                            <Text size="md">{userId}</Text>
                        </Stack>
                    </Box>
                        
                    <Box p="6">
                        <StatGroup>
                            <Stat>
                                <StatLabel><Heading as="h2" size="xl">👍🏿 Up</Heading></StatLabel>
                                <StatNumber>{getTotalUp()}</StatNumber>
                            </Stat>

                            <Stat>
                                <StatLabel><Heading as="h2" size="xl">👎🏿 Down</Heading></StatLabel>
                                <StatNumber>{getTotalDown()}</StatNumber>
                            </Stat>

                            <Stat>
                                <StatLabel><Heading as="h2" size="xl">📨 Comments</Heading></StatLabel>
                                <StatNumber>{getTotalMessage()}</StatNumber>
                            </Stat>
                        </StatGroup>
                    </Box>
                    
                    <Box bg="white" p="5" borderRadius={8}>
                        <Table variant="simple" size="sm">
                            <Thead>
                                <Tr>
                                <Th>#</Th>
                                <Th>Up</Th>
                                <Th>Down</Th>
                                <Th>Comments</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    info?.all.map((val, index) => {
                                        const {up, down, message} = val
                                            return (
                                                <Tr key={index + 1}>
                                                    <Td>{index}</Td>
                                                    <Td>{up}</Td>
                                                    <Td>{down}</Td>
                                                    <Td>{message}</Td>
                                                </Tr>
                                            )
                                        }
                                    )
                                }
                            </Tbody>
                        </Table>
                    </Box>
                </Box>
            </Flex>
        </Container>
    )
}

export default DashboardContainer
