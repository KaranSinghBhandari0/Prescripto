import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const Backend_Url = 'http://localhost:3000';
    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [filterDoctors, setFilterDoctors] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication
    const checkAuth = async () => {
        try {
            const res = await axios.get(`${Backend_Url}/user/isAuth`, { withCredentials: true });
            if (res.status === 200) {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Authentication check failed', error);
        }
    };

    // Signup
    const signup = async (formData) => {
        try {
            const res = await axios.post(`${Backend_Url}/user/signup`, formData, { withCredentials: true });
            if (res.status === 200) {
                toast.success('Signup successful');
                setIsAuthenticated(true);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.msg || "Signup failed");
        }
    };

    // Login
    const login = async (formData) => {
        try {
            const res = await axios.post(`${Backend_Url}/user/login`, formData, { withCredentials: true });
            if (res.status === 200) {
                toast.success('Login successful');
                setIsAuthenticated(true);
                getAppointments();
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "Login failed");
        }
    };
    
    // Logout
    const handleLogout = async () => {
        try {
            const res = await axios.get(`${Backend_Url}/user/logout`, { withCredentials: true });
            if (res.status === 200) {
                toast.success('Logout successful');
                setIsAuthenticated(false);
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "Logout failed");
        }
    };

    // Book Appointment
    const BookAppointment = async (docID, day, time, date) => {
        if (!isAuthenticated) {
            toast.error('Login to continue');
            scrollTo(0,0)
            return navigate('/login');
        }

        try {
            const data = { docID, day, time, date };
            const res = await axios.post(`${Backend_Url}/appointment/bookAppointment`, data, { withCredentials: true });
            if (res.status === 200) {
                toast.success('Appointment booked');
                navigate('/appointments');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "Appointment booking failed");
        }
    };

    // get all Doctors
    const getDoctors = async()=> {
        try {
            const res = await axios.get(`${Backend_Url}/doctor/getDoctors`);
            if(res.status === 200) {
                setDoctors(res.data.doctors);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "failed to fetch");
        }
    }

    // Function to fetch doctor information by ID
    const fetchDoctorInfo = async(id) => {
        try {
            const res = await axios.get(`${Backend_Url}/doctor/getDoctorInfo/${id}`);
            if(res.status === 200) {
                setDocInfo(res.data.doctor);
                filterDoctorsBySpeciality(res.data.doctor.speciality, id);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "failed to fetch");
        }
    };

    // filter related doctors
    const filterDoctorsBySpeciality = async (speciality, currDocId) => {
        try {
            const res = await axios.get(`${Backend_Url}/doctor/relatedDoctors/${speciality}`);
            if (res.status === 200) {
                // Filter out the current doctor using the current doctor's ID
                const filteredDoctors = res.data.doctors.filter(doctor => doctor._id !== currDocId);
                setFilterDoctors(filteredDoctors);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Cancel appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const res = await axios.get(`${Backend_Url}/appointment/cancelAppointment/${appointmentId}` , { withCredentials: true });
            if (res.status === 200) {
                toast.success(res.data.msg);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "Failed to cancel appointment");
        }
    };

    // Function to determine status color
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'confirmed':
                return 'bg-green-100 text-green-700';
            case 'completed':
                return 'bg-blue-100 text-blue-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
        }
    };

    // Get available slots for booking appointments
    const getAvailableSlots = () => {
        const newSlots = [];
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            let endTime = new Date(currentDate);
            endTime.setHours(21, 0, 0, 0);

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            const daySlots = [];
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                daySlots.push({ datetime: new Date(currentDate), time: formattedTime });
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            newSlots.push(daySlots);
        }

        setDocSlots(newSlots);
    };

    // Get days of a week
    const getDayOfWeek = (index) => {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        const dayIndex = (today.getDay() + index) % 7;
        return dayNames[dayIndex];
    };

    // get appointments
    const getAppointments = async () => {
        if(!isAuthenticated) {
            return;
        }

        try {
            const res = await axios.get(`${Backend_Url}/appointment/getAppointments`, { withCredentials: true });
            if (res.status === 200) {
                return res.data.appointments;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg || "Failed to fetch appointments");
        }
    };

    // date format
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        return {
            date: date.toLocaleDateString(undefined, options),
            time: date.toLocaleTimeString(undefined, timeOptions)
        };
    };

    // get user details
    const getUserDetails = async () => {
        try {
          const res = await axios.get(`${Backend_Url}/user/getDetails`, { withCredentials: true });
          if (res.status === 200) {
            return res.data.user;
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.msg || "Failed to fetch user details");
        }
    };

    // update user Details
    const updateUserDetails = async (formData) => {
        try {
          const res = await axios.post(`${Backend_Url}/user/updateDetails`, formData, { withCredentials: true });
          if (res.status === 200) {
            toast.success(res.data.msg);
            return res.data.user;
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.msg || "Failed to update user details");
        }
    };

    // some useEffects
    useEffect(() => {
        getDoctors();
        checkAuth();
    }, []);

    useEffect(() => {
        if(docInfo) {
            getAvailableSlots();
        }
    }, [docInfo]);

    return (
        <AppContext.Provider value={{login, signup, handleLogout, isAuthenticated, doctors, docInfo, docSlots, fetchDoctorInfo, BookAppointment, cancelAppointment, getStatusColor, getDayOfWeek, filterDoctors, getAppointments, formatDate, getUserDetails, updateUserDetails }}>
            {children}
        </AppContext.Provider>
    );
};
