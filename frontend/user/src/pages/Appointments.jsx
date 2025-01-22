import React, { useContext, useState, useEffect } from 'react';

import { StateContext } from '../context/StateContext';
import { AuthContext } from '../context/AuthContext';

export default function Appointments() {
    const { getStatusColor, appointments } = useContext(StateContext);
    const { cancelAppointment, getAppointments } = useContext(AuthContext);

    const [fetching, setFetching] = useState(true);

    const fetchAppointments = async () => {
        await getAppointments();
        setFetching(false);
    }

    useEffect(()=> {
        fetchAppointments();
    }, [])

    return (
        <div className='p-6'>
            <p className='font-medium text-2xl mb-4'>My Appointments</p>
            <hr className='mb-4' />
            {
                fetching ?
                <p>fetching Appointments...</p>
                :
                <div className="flex flex-col gap-6">
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => {
                            const statusColorClass = getStatusColor(appointment.status);

                            return (
                                <div key={appointment._id} className='flex flex-col md:flex-row justify-between bg-white p-4 rounded-lg shadow-md'>
                                    <img 
                                        src={appointment.docImg} 
                                        alt={appointment.docName} 
                                        className='h-32 w-32 rounded-lg object-cover bg-blue-100 mb-4 md:mb-0' 
                                    />
                                    <div className="flex-1 flex flex-col justify-between md:ml-4">
                                        <div>
                                            <p className='font-medium text-lg'>{appointment.docName}</p>
                                            <p className='text-sm text-slate-700'>{appointment.speciality}</p>
                                            <p className='text-sm font-medium mt-2'>
                                                Address: <span className='text-sm font-[400] text-slate-700'>{appointment.docAddress}</span>
                                            </p>
                                            <p className='text-sm text-slate-700 mt-2'>
                                                <b>Date & Time:</b> {appointment.day} {new Date(appointment.date).toLocaleDateString()} | {appointment.time}
                                            </p>
                                            <p className={`text-sm font-medium mt-2 py-1 px-3 rounded-md inline-block ${statusColorClass}`}>
                                                Status: {appointment.status}
                                            </p>
                                        </div>
                                        <button
                                            className={`mt-4 py-2 border border-black rounded transition-all duration-300 max-w-96 ${
                                                appointment.status === 'cancelled' || appointment.status === 'confirmed' 
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : 'hover:bg-red-600 hover:text-white hover:border-blue-50'
                                            }`}
                                            onClick={()=> cancelAppointment(appointment._id)}
                                            disabled={appointment.status === 'cancelled' || appointment.status === 'confirmed'}
                                        >
                                            Cancel Appointment
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No appointments available.</p>
                    )}
                </div>
            }
        </div>
    );
}
