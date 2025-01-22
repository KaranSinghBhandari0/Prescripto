import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axiosInstance';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const navigate = useNavigate();

    const [allDoctors , setAllDoctors] = useState(0);
    const [allAppointments , setAllAppointments] = useState(0);
    const [allUsers , setAllUsers] = useState(0);

    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);

    // get All Doctors
    const getAllDoctors = async () => {
        try {
            const res = await axiosInstance.get(`/doctor/getDoctors`);
            setDoctors(res.data.doctors);
            setAllDoctors(res.data.doctors.length);
        } catch (error) {
            console.log(error);
        }
    }

    // get All Appointments
    const getAllAppointments = async () => {
        try {
            const res = await axiosInstance.get(`/appointment/allAppointments`);
            setAppointments(res.data.allAppointments);
            setAllAppointments(res.data.allAppointments.length);
        } catch (error) {
            console.log(error);
        }
    }

    // get All Users
    const getAllUsers = async () => {
        try {
            const res = await axiosInstance.get(`/user/allUsers`);
            setAllUsers(res.data.allUsers.length);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AdminContext.Provider value={{ 
            allDoctors, allAppointments, allUsers,
            getAllDoctors, getAllAppointments, getAllUsers,
            doctors, appointments,
         }}>
            {children}
        </AdminContext.Provider>
    );
};
