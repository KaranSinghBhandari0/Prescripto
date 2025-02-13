import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

import { AuthContext } from '../context/AuthContext';

export default function AdminLogin() {
    const { adminLogin } = useContext(AuthContext);

    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        await adminLogin(formData);
        setSubmitting(false);
    };

    return (
        <form className="bg-white flex h-full flex-col gap-3 items-start p-8 w-[80%] max-w-[340px] border rounded-xl text-[#5E5E5E] text-sm shadow-lg mt-20 mx-auto"
            onSubmit={handleSubmit} >
            <p className="text-2xl w-full font-bold text-center">
                <span className="text-blue-700">Admin</span> Login
            </p>
            <p>Login with admin credentials</p>

            <div className="w-full">
                <p>Email</p>
                <input
                    className="border border-[#DADADA] rounded w-full p-2 mt-1"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="w-full">
                <p>Password</p>
                <input
                    className="border border-[#DADADA] rounded w-full p-2 mt-1"
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>

            <button type="submit" className="bg-blue-700 text-white w-full h-10 flex justify-center items-center my-2 rounded-md text-base" disabled={submitting}>
                {submitting ? <Spinner /> : 'Login'}
            </button>

            <Link to={'/doctorLogin'} >
                <p className="text-sm text-blue-600 cursor-pointer">
                    Doctor Login
                </p>
            </Link>

        </form>
    )
}
