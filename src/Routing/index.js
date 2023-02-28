import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Screens/Login'
import UploadVideo from '../Screens/UploadVideo'
const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='UploadVideo' element={<UploadVideo />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing