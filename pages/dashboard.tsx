import React from 'react'
import { withSSRContext } from 'aws-amplify'
import DashboardContainer from '../containers/dashboardContainer'

const Profile = ({username}) => {    
    return (
        <>
            <DashboardContainer userId={username}/>
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    const { Auth } = withSSRContext({ req })

    try {
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
