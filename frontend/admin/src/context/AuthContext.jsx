import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axiosInstance';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    // login
    const adminLogin = async (formData) => {
        try {
            const res = await axiosInstance.post(`/admin/login`, formData);
            toast.success('login successful');
            setAdmin(res.data.admin);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Login failed");
        }
    }

    const doctorLogin = async (formData) => {
        try {
            const res = await axiosInstance.post(`/doctor/login`, formData);
            toast.success('login successful');
            setDoctor(res.data.doctor);
            localStorage.setItem('docId', res.data.doctor._id);
            navigate('/doctorDashboard');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Login failed");
        }
    }

    // logout
    const adminLogout = async() => {
        try {
            const res = await axiosInstance.get(`/admin/logout`);
            toast.success('Logout Successfull');
            setAdmin(null);
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Login failed");
        }
    }

    const doctorLogout = async() => {
        try {
            const res = await axiosInstance.get(`/doctor/logout`);
            toast.success('Logout Successfull');
            localStorage.removeItem('docId');
            setDoctor(null);
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Login failed");
        }
    }

    // check authorization
    const checkAuth = async () => {
        try {
            const res = await axiosInstance.get(`/admin/isAuthorized`);
            setAdmin(res.data);
        } catch (error) {
            setAdmin(null);
            console.error('Authorization check failed', error);
        } finally {
            setCheckingAuth(false);
        }

        try {
            const res = await axiosInstance.get(`/doctor/isAuthorized`);
            setDoctor(res.data);
        } catch (error) {
            setDoctor(null);
            console.error('Authorization check failed', error);
        } finally {
            setCheckingAuth(false);
        }
    };

    // add a new Doctor
    const addNewDoctor = async (formData) => {
        try {
            const res = await axiosInstance.post(`/doctor/addNewDoctor`, formData);
            toast.success('new Doctor added');
            navigate('/allDoctors');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "failed to add");
        }
    }

    return (
        <AuthContext.Provider value={{ 
            admin, adminLogin, adminLogout,
            doctor, doctorLogin, doctorLogout,
            checkingAuth, checkAuth, 
            addNewDoctor,
         }}>
            {children}
        </AuthContext.Provider>
    );
};
