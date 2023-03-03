import React from 'react'
import Slidebar from '../Slidebar'
import { useLocation } from 'react-router-dom'

const Dashboard = () => {

    const location = useLocation()
    console.log(location, "location")
    const { state } = location

    return (
        <>
            <Slidebar data={state} />
            <div>Dashboard</div>
        </>
    )
}

export default Dashboard