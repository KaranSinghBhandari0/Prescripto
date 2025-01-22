import React from 'react';

export default function DoctorCard({ doctor, onClick }) {
  return (
    <div
      className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
      onClick={onClick}
    >
      <img src={doctor.image} alt={doctor.name} className="bg-indigo-100 w-full" />
      <div className="p-4">
        <p className="font-medium">{doctor.name}</p>
        <p className="text-sm">{doctor.speciality}</p>
        <div className="mt-2 flex items-center gap-1 text-sm">
          <p className={`w-2 h-2 rounded-full ${doctor.available ? 'bg-green-500' : 'bg-red-500'}`}></p>
          <p>{doctor.available ? 'Available' : 'Unavailable'}</p>
        </div>
      </div>
    </div>
  );
}
