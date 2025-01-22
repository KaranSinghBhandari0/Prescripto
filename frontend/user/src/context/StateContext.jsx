import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [doctors, setDoctors] = useState([]);
    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [filterDoctors, setFilterDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedTime, setSelectedTime] = useState(null);
    
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
            default:
                return 'bg-gray-100 text-gray-700'; // Default case
        }
    };

    // Helper: Generate slots for a single day
    const generateSlotsForDay = (baseDate) => {
        const slots = [];
        const startTime = new Date(baseDate.setHours(10, 0, 0, 0)); // Start at 10:00 AM
        const endTime = new Date(baseDate.setHours(21, 0, 0, 0)); // End at 9:00 PM

        while (startTime < endTime) {
            slots.push({
                datetime: new Date(startTime),
                time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });
            startTime.setMinutes(startTime.getMinutes() + 30); // Increment by 30 minutes
        }

        return slots;
    };

    // Get available slots for the next 7 days
    const getAvailableSlots = () => {
        const newSlots = Array.from({ length: 7 }).map((_, i) => {
            const day = new Date();
            day.setDate(day.getDate() + i);
            return generateSlotsForDay(day);
        });
        setDocSlots(newSlots);
    };

    // Get day name of the week
    const getDayOfWeek = (index) => {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        return dayNames[(today.getDay() + index) % 7];
    };

    // Format date and time
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        return {
            date: date.toLocaleDateString('en-US', dateOptions),
            time: date.toLocaleTimeString('en-US', timeOptions),
        };
    };

    return (
        <StateContext.Provider value={{
            user, setUser, checkingAuth, setCheckingAuth,
            doctors, setDoctors,
            docInfo, setDocInfo,
            docSlots, setDocSlots,
            filterDoctors, setFilterDoctors,
            getStatusColor, getAvailableSlots, getDayOfWeek, formatDate,
            appointments, setAppointments, 
            selectedDay, setSelectedDay, selectedTime, setSelectedTime, 
        }}>
            {children}
        </StateContext.Provider>
    );
};
