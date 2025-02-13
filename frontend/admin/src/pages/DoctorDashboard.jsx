import React, { useContext, useState, useEffect } from 'react';
import doc1 from '../assets/doc1.png';
import { DoctorContext } from '../context/DoctorContext';
import DoctorAppointments from '../components/DoctorAppointments';
import { AuthContext } from '../context/AuthContext';

export default function DoctorDashboard() {
    const { doctor } = useContext(AuthContext);

    const { fetchDoctorInfo, docInfo } = useContext(DoctorContext);

    useEffect(() => {
        fetchDoctorInfo(doctor._id || localStorage.getItem('docId'));
    }, [])

    return (
        <div className="p-2 w-full">
            {/* Doctor info */}
            {docInfo && docInfo.name && (
                <div className="flex gap-6 items-center text-lg text-slate-700">
                    <img src={docInfo.image || doc1} alt="" className="bg-blue-400 rounded-full w-20 h-20" />
                    <p>{docInfo.name}</p>
                </div>
            )}

            <br />
            <p>My Appointments</p>
            <br />

            {/* Appointments List */}
            <DoctorAppointments />
        </div>
    );
}
