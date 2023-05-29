import React from 'react'
import LoginForm from '../sections/LoginForm'
import Alert from '../components/Alert'

const Login = () => {
    return (
        <>
            <Alert />
            <div className="page page_simple">
                <div className="entry">
                    <div className="entry__wrapper">
                        <div className="h2 entry__title">Sign in</div>


                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login