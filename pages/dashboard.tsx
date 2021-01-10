import React, { useEffect, useState } from 'react'
import { withSSRContext } from 'aws-amplify'
import { useRouter } from 'next/router'
import DashboardContainer from '../containers/dashboardContainer'

const Profile = ({username}) => {
    const router = useRouter()

    useEffect(() => {
        console.log(username)
    }, [])
    
    return (
        <>
            <DashboardContainer userId={username}/>
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    const { Auth } = withSSRContext({ req })

    try {
        const fb_data = []
        const user = await Auth.currentAuthenticatedUser()
        
        return {
            props: {
            authenticated: true,
            username: user.username,
            }
        }
    } catch (err) {
        res.writeHead(302, { Location: '/auth' })
        res.end()
        return {props: {}}
        }
    }
    // return {props: {}}
    

export default Profile
