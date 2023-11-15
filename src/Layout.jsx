import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { ToastContainer } from 'react-toastify'
import injectContext, { Context } from './store/AppContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './pages/ProtectedRoute'

const Layout = () => {
    const { store: { currentUser } } = useContext(Context);
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/dashboard' element={
                        <ProtectedRoute user={currentUser}>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Home />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </>
    )
}

export default injectContext(Layout)