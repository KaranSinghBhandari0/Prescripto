import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import Footer from './components/Footer';
import Doctor from './pages/Doctor';
import Profile from './pages/Profile';
import Appointments from './pages/Appointments';

import ScrollToTop from './lib/scrollToTop';
import Loader from './components/Loader';

import 'react-toastify/dist/ReactToastify.css';

import {StateContext} from './context/StateContext'
import {AuthContext} from './context/AuthContext'

export default function App() {

  const { user, checkingAuth } = useContext(StateContext);
  const { checkAuth } = useContext(AuthContext);

  useEffect(()=> {
    checkAuth();
  }, [])

  if(checkingAuth && !user)
    return (
    <div className="flex items-center justify-center h-screen">
      <Loader/>
    </div>
  );

  return (
    <>
      <Navbar />
      <ScrollToTop/>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={user ? <Home/> : <Login />} />
            <Route path="/doctors/:id" element={<Doctors/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/doctor/:id" element={<Doctor/>} />
            <Route path="/profile" element={!user ? <Home/> : <Profile/>} />
            <Route path="/appointments" element={!user ? <Home/> : <Appointments/>} />
          </Routes>
        </main>
      <Footer/>
    </>
  );
}
