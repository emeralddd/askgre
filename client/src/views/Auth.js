import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import {AuthContext} from '../contexts/authContext'
import {useContext} from 'react'
import {Redirect} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

function Auth({authRoute}) {

    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
    let body

    if(authLoading) {
        body = (
            <div className="d-flex">
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    } else {
        body = (
            <>
                {authRoute === 'login' && <LoginForm />}
            </>
        )
    }

    return (
        <>
            {body}
        </>
    )
}

export default Auth