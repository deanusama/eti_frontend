import React from 'react'
import { NavLink } from 'react-router-dom'

const Navlinks = ({ ...link }) => {
    const { name, path, icon } = link
    return (
        <NavLink className={({ isActive }) => isActive ? 'sidebar__item active' : 'sidebar__item'} to={path}>
            <svg className={`icon ${icon}`} >
                <use xlinkHref={`#${icon}`}></use>
            </svg>
            {name}
        </NavLink>
    )
}

export default Navlinks