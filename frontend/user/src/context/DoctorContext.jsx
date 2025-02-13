import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {axiosInstance} from '../lib/axiosInstance';
import { StateContext } from './StateContext';

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
    const navigate = useNavigate();

    const { user, setDoctors, setDocInfo, setFilterDoctors, getAvailableSlots } = useContext(StateContext);
    
    // Book Appointment
    const BookAppointment = async (docID, day, time, date) => {
        if (!user) {
            toast.error('Login to continue');
            return navigate('/login');
        }

        try {
            const data = { docID, day, time, date };
            const res = await axiosInstance.post(`/appointment/bookAppointment`, data);
            toast.success('Appointment booked');
            navigate('/appointments');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Appointment booking failed");
        }
    };

    // get all Doctors
    const getDoctors = async()=> {
        try {
            const res = await axiosInstance.get(`/doctor/getDoctors`);
            setDoctors(res.data.doctors);
        } catch (error) {
            console.log(error);
        }
    }

    // Function to fetch doctor information by ID
    const fetchDoctorInfo = async(id) => {
        try {
            const res = await axiosInstance.get(`/doctor/getDoctorInfo/${id}`);
            setDocInfo(res.data.doctor);
            getAvailableSlots();
            filterDoctorsBySpeciality(res.data.doctor.speciality, id);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "failed to fetch");
        }
    };

    // filter related doctors
    const filterDoctorsBySpeciality = async (speciality, currDocId) => {
        try {
            const res = await axiosInstance.get(`/doctor/relatedDoctors/${speciality}`);
            // Filter out the current doctor using the current doctor's ID
            const filteredDoctors = res.data.doctors.filter(doctor => doctor._id !== currDocId);
            setFilterDoctors(filteredDoctors);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDoctors();
    })

    return (
        <DoctorContext.Provider value={{
            BookAppointment, getDoctors, fetchDoctorInfo, filterDoctorsBySpeciality,
        }}>
            {children}
        </DoctorContext.Provider>
    );
};
