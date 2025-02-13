import React, { useContext, useState } from 'react';
import Spinner from './Spinner';

import { StateContext } from '../context/StateContext';
import { DoctorContext } from '../context/DoctorContext';

export default function AppointmentSlots({ id }) {
    const { docSlots, getDayOfWeek, selectedDay, selectedTime, setSelectedDay, setSelectedTime } = useContext(StateContext);
    const { BookAppointment } = useContext(DoctorContext);
    const [loading, setLoading] = useState(false);

    const handleBooking = async () => {
        if (selectedTime === null || !docSlots[selectedDay]) {
            alert('Please select a valid day and time slot before booking.');
            return;
        }

        const today = new Date();
        const selectedDate = new Date(today);
        selectedDate.setDate(today.getDate() + selectedDay);

        const formattedDay = getDayOfWeek(selectedDay);
        const formattedTime = docSlots[selectedDay][selectedTime]?.time;

        if (!formattedTime) {
            alert('Selected time slot is invalid.');
            return;
        }

        const formattedDate = selectedDate.toLocaleDateString();
        setLoading(true);
        await BookAppointment(id, formattedDay, formattedTime, formattedDate);
        setLoading(false);
    };

    return (
        <div className="my-20">
            <p className="font-medium text-slate-700">Booking slots</p>

            {/* Day Selector */}
            <div className="flex gap-2 flex-wrap my-4">
                {Array.from({ length: 7 }).map((_, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 rounded-lg ${
                            selectedDay === index
                                ? 'bg-blue-700 text-white'
                                : 'bg-gray-200 text-black'
                        }`}
                        onClick={() => setSelectedDay(index)}
                    >
                        {getDayOfWeek(index)}
                    </button>
                ))}
            </div>

            {/* Time Slot Selector */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {docSlots[selectedDay] && docSlots[selectedDay].length > 0 ? (
                    docSlots[selectedDay].map((slot, slotIndex) => (
                        <button
                            key={slotIndex}
                            className={`border text-sm font-light px-4 rounded-xl my-2 ${
                                selectedTime === slotIndex
                                    ? 'bg-blue-700 text-white'
                                    : 'bg-gray-200 text-black'
                            }`}
                            onClick={() => setSelectedTime(slotIndex)}
                        >
                            {slot.time}
                        </button>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm mt-4">
                        No available slots for the selected day.
                    </p>
                )}
            </div>

            {/* Booking Button */}
            <button className="bg-blue-700 text-white text-sm font-medium px-6 py-3 rounded-full my-6 mx-auto block w-48 h-11 flex justify-center items-center"
                onClick={handleBooking} disabled={loading} >
                {loading ? <Spinner/> : 'Book an appointment'}
            </button>
        </div>
    );
}
