import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DoctorInfo from '../components/DoctorInfo';
import RelatedDoctors from '../components/RelatedDoctors';
import AppointmentSlots from '../components/AppointmentSlots';

import { DoctorContext } from '../context/DoctorContext';

export default function Doctor() {
    const { id } = useParams();

    const { fetchDoctorInfo } = useContext(DoctorContext);

    useEffect(() => {
        fetchDoctorInfo(id);
    }, [id]);

    return (
        <div className="p-4">
            {/* Doctor Info */}
            <DoctorInfo />
    
            {/* Appointment Booking */}
            <AppointmentSlots id={id} />
    
            {/* Related Doctors Section */}
            <RelatedDoctors />
        </div>
    );
}
