import React, { useContext } from 'react'
import { assets } from '../assets/assets';

import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const {adminLogout, doctorLogout, admin, doctor} = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    if(admin) {
      adminLogout();
    } else {
      doctorLogout();
    }
  }
  
  return (
    <div className="w-full bg-white border-b">
      <nav className='flex justify-between p-4 max-w-[1920px] mx-auto'>
        <img className="h-10 w-28 cursor-pointer" src={assets.logo} alt="logo" />
        {(admin || doctor) && 
          <button className="bg-blue-600 text-white text-sm px-10 py-2 rounded-full" onClick={handleLogout}>Logout</button>
        }
      </nav>
    </div>
  )
}
