import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../context/StateContext';

export default function RelatedDoctors() {

  const {filterDoctors} = useContext(StateContext)

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626]">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors.</p>

      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {filterDoctors.length > 0 ? (
          filterDoctors.map((item) => (
            <Link to={`/doctor/${item._id}`} key={item._id}>
              <div className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500" >
                <img src={item.image} alt={item.name} className="bg-blue-50 w-full" />
                <div className="p-4">
                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></p>
                    <p>{item.available ? 'Available' : 'Unavailable'}</p>
                  </div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm">{item.speciality}</p>
                </div>
              </div>
            </Link>
            
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">No related doctors available.</p>
        )}
      </div>
    </div>
  );
}
