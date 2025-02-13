import React, { useState, useEffect, useContext } from 'react';

import { AdminContext } from '../context/AdminContext';

export default function Appointments() {
    const { getAllAppointments, appointments } = useContext(AdminContext);

    useEffect(() => {
        getAllAppointments();
    }, []);

    return (
        <div className="w-full p-4">
            <p className="mb-5 text-xl font-semibold text-gray-800">All Appointments</p>

            <div className="flex flex-col gap-4 bg-white border border-gray-200 shadow-md text-sm rounded-lg max-h-[80vh] overflow-y-scroll scrollbar-hide">

                {/* Table Headers */}
                <div className="hidden md:flex justify-between border-b p-4 text-gray-700 font-semibold">
                    <div className="flex gap-6 w-1/6">
                        <p>#</p>
                        <p>Patient</p>
                    </div>
                    <p className="w-1/5 text-center">Date & Time</p>
                    <p className="w-1/5 text-center">Doctor</p>
                    <p className="w-1/6 text-center">Fees</p>
                    <p className="w-1/6 text-center">Status</p>
                </div>

                {/* Appointments List */}
                {appointments.map((appointment, index) => (
                    <div
                        className={`flex flex-col md:flex-row justify-between items-start md:items-center p-3 rounded-lg hover:bg-gray-100 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }`}
                        key={appointment._id || index}
                    >
                        <div className="flex gap-6 w-1/6">
                            <p>{index + 1}</p>
                            <p className="font-medium text-gray-900">{appointment.patientName}</p>
                        </div>
                        <p className="w-1/5 text-center text-gray-600">{new Date(appointment.date).toLocaleDateString()}</p>
                        <div className="flex items-center w-full md:w-1/5 justify-center gap-2">
                            <img src={appointment.docImg} className="rounded-full bg-blue-600 h-8 w-8" alt="Doctor" />
                            <p className="font-medium text-blue-600">{appointment.docName}</p>
                        </div>
                        <p className="w-1/6 text-center">$ {appointment.fee}</p>
                        <p
                            className={`w-1/6 text-center font-semibold ${appointment.status === 'pending' ? 'text-yellow-500' : 'text-green-500'
                                } ${appointment.status === 'cancelled' ? 'text-red-500' : ''}`}
                        >
                            {appointment.status}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
