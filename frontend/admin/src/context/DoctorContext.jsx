import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axiosInstance';
import { toast } from 'react-toastify';

import { AdminContext } from './AdminContext';
import { AuthContext } from './AuthContext';

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
    const navigate = useNavigate();

    const { doctor } = useContext(AuthContext);
    const { getAllDoctors } = useContext(AdminContext);

    const [appointments, setAppointments] = useState([]);
    const [docInfo, setDocInfo] = useState(null);

    // Function to fetch doctor information by ID
    const fetchDoctorInfo = async(id) => {
        try {
            const res = await axiosInstance.get(`/doctor/getDoctorInfo/${id}`);
            await getDoctorAppointments(id);
            setDocInfo(res.data.doctor);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "failed to fetch");
        }
    };

    // Handle available checkbox toggle
    const handleAvailabilityChange = async (id) => {
        try {
            const res = await axiosInstance.get(`/doctor/changeAvail/${id}`);
            getAllDoctors();
        } catch (error) {
            console.log('Failed to change availability', error);
        }
    };

    // get a doctors appointments
    const getDoctorAppointments = async (id) => {
        try {
            const res = await axiosInstance.get(`/doctor/appointments/${id}`);
            setAppointments(res.data.appointments);
        } catch (error) {
            console.log(error);
        }
    }

    // cancel appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const res = await axiosInstance.get(`/appointment/cancelDocAppointment/${appointmentId}`);
            await getDoctorAppointments(doctor.id);
            toast.warning(res.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Failed to cancel appointment");
        }
    };

    // confirm appointment
    const confirmAppointment = async (appointmentId) => {
        try {
            const res = await axiosInstance.get(`/appointment/confirmAppointment/${appointmentId}`);
            await getDoctorAppointments(doctor.id);
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Failed to cancel appointment");
        }
    };

    return (
        <DoctorContext.Provider value={{ 
            docInfo, fetchDoctorInfo, handleAvailabilityChange, 
            appointments, cancelAppointment, confirmAppointment,
            getDoctorAppointments,
         }}>
            {children}
        </DoctorContext.Provider>
    );
};
