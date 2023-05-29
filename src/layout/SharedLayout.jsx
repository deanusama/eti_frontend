import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const SharedLayout = () => {
    return (

        <>
            <Sidebar />
            <Header />

            <div className="page">
                <Outlet />
            </div>
        </>
    )
}

export default SharedLayout