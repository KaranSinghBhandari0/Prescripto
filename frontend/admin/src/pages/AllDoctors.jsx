import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext';

export default function AllDoctors() {
  let { doctors, getAllDoctors } = useContext(AdminContext);

  useEffect(()=> {
    getAllDoctors();
  }, [])

  return (
    <div className="w-full flex flex-col p-4 overflow-y-scroll max-h-[100vh] scrollbar-hide">
          <p className='text-[1.2rem] font-medium'>All Doctors</p>
          <br />
          <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {doctors.map((item,index)=>(
            <Link to={`/doctor/${item._id}`} key={item._id} >
              <div className='border border-blue-200 bg-white rounded-xl overflow-hidden cursor-pointer'>
                <img src={item.image} alt="" className='bg-white border-b hover:bg-blue-400' />
                <div className='p-4'>
                    <p className='font-medium'>{item.name}</p>
                    <p className='text-sm'>{item.speciality}</p>
                    <div className="mt-2 flex items-center gap-1 text-sm">
                      <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></p>
                      <p>{item.available ? 'Available' : 'Unavailable'}</p>
                    </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
    </div>
  )
}
