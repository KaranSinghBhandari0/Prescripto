import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { StateContext } from '../context/StateContext'

export default function DoctorInfo() {

    const { docInfo } = useContext(StateContext);

return (
    <div>
        {docInfo ? (
            <div className="flex flex-col gap-4 md:flex-row">
                <img src={docInfo.image} alt="" className="bg-blue-700 w-full md:max-w-[300px] rounded-lg" loading='lazy' />
                <div className='flex-1 border border-[#ADADAD] rounded-lg pl-4 pt-4 pr-6 bg-white'>
                    <p className='text-2xl md:text-3xl font-medium flex gap-2 items-center'>
                        {docInfo.name}
                        <img src={assets.verified_icon} alt="" className="w-4 h-4" />
                    </p>
                    <p className='text-sm md:text-base'>{docInfo.degree} - {docInfo.speciality}
                        <span className='text-xs ml-2 border border-[#ADADAD] px-2 rounded-xl'>{docInfo.experience}</span>
                    </p>
                    <p className='text-xs font-medium mt-4 mb-1 flex gap-2'>About
                        <img src={assets.info_icon} alt="" className="w-4 h-4" />
                    </p>
                    <p className='text-sm'>{docInfo.about}</p>
                    <br />
                    <p className='font-medium text-slate-700'>Appointment fee:
                        <span className='text-black'> ${docInfo.fees} </span>
                    </p>
                </div>
            </div>
            ) : (
            <p className="text-center">Loading doctor information...</p>
        )}
    </div>
  )
}
