import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {axiosInstance} from '../lib/axiosInstance';
import { StateContext } from './StateContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const { user, setUser, setCheckingAuth, setAppointments  } = useContext(StateContext);

    // Check authentication
    const checkAuth = async () => {
        try {
            const res = await axiosInstance.get('/user/isAuth');
            setUser(res.data);
        } catch (error) {
            console.error('Authentication check failed', error);
        } finally {
            setCheckingAuth(false);
        }
    };

    // Signup
    const signup = async (formData) => {
        try {
            const res = await axiosInstance.post('/user/signup', formData);
            toast.success('Signup successful');
            setUser(res.data.user);
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "Signup failed");
        }
    };

    // Login
    const login = async (formData) => {
        try {
            const res = await axiosInstance.post('/user/login', formData);
            toast.success('Login successful');
            setUser(res.data.user)
            getAppointments();
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Login failed");
        }
    };
    
    // Logout
    const handleLogout = async () => {
        try {
            const res = await axiosInstance.get('/user/logout');
            toast.success('Logout successful');
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Logout failed");
        }
    };

    // update user Details
    const updateUserDetails = async (formData) => {
        try {
          const res = await axiosInstance.post(`/user/updateDetails`, formData);
            toast.success(res.data.message);
            setUser(res.data.user);
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message || "Failed to update user details");
        }
    };

    // Cancel appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const res = await axiosInstance.get(`/appointment/cancelAppointment/${appointmentId}`);
            toast.success(res.data.message);
            await getAppointments();
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Failed to cancel appointment");
        }
    };

    // get appointments
    const getAppointments = async () => {
        if(!user) {
            return;
        }

        try {
            const res = await axiosInstance.get(`/appointment/getAppointments`);
            setAppointments(res.data.appointments);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Failed to fetch appointments");
        }
    };

    return (
        <AuthContext.Provider value={{
            checkAuth, signup, login, handleLogout,
            updateUserDetails,
            cancelAppointment, getAppointments,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
