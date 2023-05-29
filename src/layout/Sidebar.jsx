import React from 'react'

import logoDark from '../assets/logo-dark.png'
import logoLight from '../assets/logo-light.png'
import { Link } from 'react-router-dom'
import links from '../utils'
import Navlinks from '../components/Navlinks'
import HomeIcon from '../assets/icons/HomeIcon'
import ProfileCircleIcon from '../assets/icons/ProfileCircleIcon'
import ShortCoursesIcon from '../assets/icons/ShortCoursesIcon'

const Sidebar = () => {
    return (
        <>

            {/* <!-- sidebar--> */}
            <div>
                <div className="sidebar">
                    <button className="sidebar__close">
                        <svg className="icon icon-close">
                            <use xlinkHref="#icon-close" />
                        </svg>
                    </button>
                    <Link className="sidebar__logo" href="/">

                        <img className="some-icon" src={logoDark} alt="Core" />
                        <img className="some-icon-dark" src={logoLight} alt="Core" />
                    </Link>


                    <div className="sidebar__menu">
                        {links.map((link) => {
                            const { id } = link
                            return (
                                <Navlinks key={id} {...link} />
                            )
                        })}
                    </div>

                    <div className="sidebar__foot">

                        <p className='entry__note'>© ETI, Inc. 2023</p>
                    </div>
                </div>
                <div className="overlay" />
            </div>

            <HomeIcon />
            <ProfileCircleIcon />
            <ShortCoursesIcon />

        </>
    )
}

export default Sidebar