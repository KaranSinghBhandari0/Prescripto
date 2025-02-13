import React, { useContext } from 'react'
import tick from '../assets/tick.png';
import cross from '../assets/cross.png';

import { DoctorContext } from '../context/DoctorContext';

export default function DoctorAppointments() {

    const { appointments, cancelAppointment, confirmAppointment } = useContext(DoctorContext);

    // Function to handle confirming and canceling appointments
    const handleAppointmentUpdate = async (appointmentId, action) => {
        if (action === 'confirm') {
            await confirmAppointment(appointmentId);
        } else if (action === 'cancel') {
            await cancelAppointment(appointmentId);
        }
    };

    return (
        <div>
            {/* Header for Appointments */}
            <div className="hidden md:flex justify-between p-4 text-gray-700 font-semibold bg-white border-b border-black">
                <div className="flex gap-6 w-1/6">
                    <p>#</p>
                    <p>Patient</p>
                </div>
                <p className="w-1/5 text-center">Date & Time</p>
                <p className="w-1/6 text-center">Change Status</p>
                <p className="w-1/6 text-center">Current Status</p>
            </div>

            {/* Appointments List */}
            {appointments.map((appointment, index) => (
                <div key={index} className="flex justify-between p-4 text-gray-700 text-sm bg-white">
                    <div className="flex gap-6 w-1/6">
                        <p>{index + 1}</p>
                        <p>{appointment.patientName}</p> {/* Accessing the patient's name */}
                    </div>
                    <p className="w-1/5 text-center">
                        {new Date(appointment.date).toLocaleDateString()} | {appointment.time}
                    </p>

                    <div className="w-1/6 text-center flex justify-center gap-4">
                        <img
                            src={tick}
                            className="h-4 w-4 cursor-pointer"
                            alt="Approve"
                            onClick={() => handleAppointmentUpdate(appointment._id, 'confirm')}
                        />
                        <img
                            src={cross}
                            className="h-4 w-4 cursor-pointer"
                            alt="Decline"
                            onClick={() => handleAppointmentUpdate(appointment._id, 'cancel')}
                        />
                    </div>

                    <div className="w-1/6 text-center">
                        {appointment.status === 'pending' && <p className="text-yellow-500 font-semibold">Pending</p>}
                        {appointment.status === 'confirmed' && <p className="text-green-500 font-semibold">Confirmed</p>}
                        {appointment.status === 'cancelled' && <p className="text-red-500 font-semibold">Cancelled</p>}
                    </div>
                </div>
            ))}

        </div>
    )
}
