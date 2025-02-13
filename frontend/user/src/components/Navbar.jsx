import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

import { StateContext } from '../context/StateContext';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
    const { handleLogout } = useContext(AuthContext);
    const { user } = useContext(StateContext);
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="max-w-7xl mx-auto border-b border-slate-400 flex justify-between py-4 px-2 items-center">
            <img className="h-10 w-28 cursor-pointer" src={assets.logo} alt="logo" onClick={() => navigate('/')} />
            <div className="md:flex gap-6 align-middle hidden">
                <button className="hover:border-b-2 hover:border-blue-700" onClick={() => navigate('/')}>Home</button>
                <button className="hover:border-b-2 hover:border-blue-700" onClick={() => navigate('/doctors/all')}>All Doctors</button>
                <button className="hover:border-b-2 hover:border-blue-700" onClick={() => navigate('/contact')}>Contact</button>
                <button className="hover:border-b-2 hover:border-blue-700" onClick={() => window.open('https://prescripto-admin-by-karan.vercel.app', '_blank', 'noopener,noreferrer')}>Admin</button>
            </div>

            <div className="flex gap-6">
                {/* Show login button if not authenticated, otherwise show profile picture */}
                {!user ? (
                    <button
                        className="text-white bg-blue-700 px-8 py-2 font-semibold rounded-3xl"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                ) : (
                    <div className="flex items-center gap-2 cursor-pointer group relative">
                        <img src={assets.profile_pic} className="h-10 w-10 rounded-full" alt="Profile" />
                        <div className="absolute top-2 right-0 pt-14 text-base group-hover:block z-20 hidden">
                            <div className="bg-stone-100 min-w-40 rounded-xl flex flex-col px-2 py-3">
                                <p onClick={() => navigate('/profile')} className='px-2 py-1 rounded hover:bg-white'>
                                    Profile
                                </p>
                                <p onClick={() => navigate('/appointments')} className='px-2 py-1 rounded hover:bg-white'>
                                    Appointments
                                </p>
                                <p onClick={() => handleLogout()} className='px-2 py-1 rounded hover:bg-white'>
                                    Logout
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <img src={assets.menu_icon} alt="" className='md:hidden h-6 mt-2' onClick={() => { setShowMenu(true) }} />
                {showMenu &&
                    <div className="md:hidden fixed w-full right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all">
                        <div className="flex items-center justify-between px-5 py-6">
                            <img src={assets.logo} className="w-36" alt="" />
                            <img src={assets.cross_icon} className="w-7" alt="" onClick={() => { setShowMenu(false) }} />
                        </div>
                        <ul className="flex flex-col items-center gap-5 mt-5 px-5 text-lg font-medium">
                            <p className='' onClick={() => { navigate('/'); setShowMenu(false) }}>Home</p>
                            <p className='' onClick={() => { navigate('/doctors/all'); setShowMenu(false) }}>All Doctors</p>
                            <p className='' onClick={() => { navigate('/contact'); setShowMenu(false) }}>Contact</p>
                            <a href="https://hospital-management-admin.vercel.app" target="_blank" rel="noopener noreferrer">Admin</a>
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
}
