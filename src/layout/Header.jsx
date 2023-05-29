import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/slice/auth'
import { Link } from 'react-router-dom'

const Header = () => {
    const dispatch = useDispatch()

    const handleLogout = () => dispatch(logoutUser())

    return (
        // < !--header-- >
        <header className="header unauthorized" data-id="#header">
            <button className="header__burger" />


            <div className="header__btns" onClick={handleLogout}>
                <Link className="button header__button" to="#">Sign out</Link>
            </div>
        </header>



    )
}

export default Header