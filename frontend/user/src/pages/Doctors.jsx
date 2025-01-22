import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FilterComponent from '../components/FilterComponent';
import DoctorList from '../components/DoctorList';
import { StateContext } from '../context/StateContext';

export default function Doctors() {
  const { id } = useParams();
  const [filterDoctors, setFilterDoctors] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const { doctors } = useContext(StateContext);

  useEffect(() => {
    if(id === 'all') {
      setFilterDoctors(doctors);
    } else {
      const filtered = doctors.filter(
        (doctor) => doctor.speciality.toLowerCase() === id.toLowerCase()
      );
      setFilterDoctors(filtered);
    }
  }, [id, doctors]);

  return (
    <div className="w-full py-2">
       <p className='ml-4 text-slate-700'>Browse through the doctors specialist.</p>
      {/* Filters Section */}
      <FilterComponent
        showFilters={showFilters} setShowFilters={setShowFilters} id={id} />

      {/* Doctors List Section */}
      <div className="flex gap-5 mt-6">
        <div className="flex-col gap-4 text-sm text-gray-600 hidden sm:flex">
          <FilterComponent showFilters={true} id={id} />
        </div>

        {/* Doctor List */}
        <DoctorList doctors={filterDoctors}/>
      </div>
    </div>
  );
}
