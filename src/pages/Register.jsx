import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../sections/RegisterForm';



const Register = () => {

 
    return (
        <div className="page page_simple">
            <div className="entry">
                <div className="entry__wrapper">
                    <div className="h2 entry__title">Sign up</div>

                    <RegisterForm />

                    <div className="entry__info">
                        Don’t have an account?
                        <Link to="/login">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register