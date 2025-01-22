import React, {useContext, useEffect} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Loader from './components/Loader';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';

import { AuthContext } from './context/AuthContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Appointments from './pages/Appointments';
import AddDoctor from './pages/AddDoctor';
import AllDoctors from './pages/AllDoctors';
import Doctor from './pages/Doctor';
import DoctorLogin from './pages/DoctorLogin';
import DoctorDashboard from './pages/DoctorDashboard';

export default function App() {
    const { admin, doctor, checkAuth, checkingAuth } = useContext(AuthContext);
    
    useEffect(()=> {
        checkAuth();
    }, [])

    if((!admin || !doctor) && checkingAuth) {
        return (
            <div className='h-screen w-full flex justify-center items-center'>
                <Loader />
            </div>
        )
    }

return (
    <>
        <Navbar/>
        <div className="flex">
            <Sidebar/>
            <Routes>
                <Route path='/' element={ admin ? <Dashboard /> : <AdminLogin/> } />
                <Route path='/adminLogin' element={ admin ? <Dashboard /> : <AdminLogin/> } />
                <Route path='/doctorLogin' element={ doctor ? <DoctorDashboard /> : <DoctorLogin/> } />
                <Route path='/dashboard' element={ admin ? <Dashboard /> : <AdminLogin/> } />
                <Route path='/appointments' element={ admin ? <Appointments /> : <AdminLogin/> } /> 
                <Route path='/addDoctor' element={ admin ? <AddDoctor /> : <AdminLogin/> } />
                <Route path='/allDoctors' element={ admin ? <AllDoctors /> : <AdminLogin/> } />
                <Route path='/doctor/:id' element={ admin ? <Doctor /> : <AdminLogin/> } />
                <Route path="/doctorDashboard" element={ doctor ? <DoctorDashboard/> : <DoctorLogin/> } />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <ToastContainer autoClose={3500} position="top-right" theme="colored" />
        </div>
    </>
  )
}