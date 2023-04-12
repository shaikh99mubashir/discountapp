import React, { useState } from 'react'
import { BrowserRouter, useNavigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../Screens/Dashboard'
import Login from '../Screens/Login'
import Marquee from '../Screens/Marquee'
import PushNotification from '../Screens/PushNotification'
import ScheduledVideoList from '../Screens/ScheduledVideoList'
import Setting from '../Screens/Setting'
import Slidebar from '../Screens/Slidebar'
import Support from '../Screens/Support'
import UpdatePassword from '../Screens/UpdatePassword'
import UploadDailySale from '../Screens/UploadDailySale'
import UploadVideo from '../Screens/UploadVideo'
import Signup from '../Screens/Signup'
import Profile from '../Screens/Profile'
const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='Dashboard' element={<Dashboard />} />
                <Route path='Profile' element={<Profile />} />
                <Route path='UploadVideo' element={<UploadVideo />} />
                <Route path='ScheduledVideoList' element={<ScheduledVideoList />} />
                <Route path='PushNotification' element={<PushNotification />} />
                <Route path='Setting' element={<Setting />} />
                <Route path='Support' element={<Support />} />
                <Route path='Marquee' element={<Marquee />} />
                <Route path='UpdatePassword' element={<UpdatePassword />} />
                <Route path='UploadDailySale' element={<UploadDailySale />} />
                <Route path='Signup' element={<Signup />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing