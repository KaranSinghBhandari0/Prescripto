import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

export default function SpecialityMenu() {

  return (
    <div className="w-full flex flex-col my-24 justify-center items-center">
      <h1 className="text-3xl font-semibold">Find by Speciality</h1>
      <br />
      <p className="text-sm text-center">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll scrollbar-hide">
        {specialityData.map((item, index) => (
          <Link to={`doctors/${item.speciality}`} key={index} >
            <div className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500">
              <img src={item.image} alt={item.speciality} className="rounded-full w-24 h-24 cursor-pointer" />
              <p>{item.speciality}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
