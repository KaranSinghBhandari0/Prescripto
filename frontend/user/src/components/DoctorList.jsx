import React from 'react';
import { Link } from 'react-router-dom';
import DoctorCard from './DoctorCard';

export default function DoctorList({ doctors }) {
  return (
    <div className="w-full grid grid-cols-auto gap-4 gap-y-6 px-2">
      {doctors.length === 0 ? (
        <p className="w-full ml-6">No Doctors Available</p>
      ) : (
        doctors.map((doctor) => (
          <Link to={`/doctor/${doctor._id}`} key={doctor._id} >
            <DoctorCard doctor={doctor} />
          </Link>
        ))
      )}
    </div>
  );
}
