import React, { useState } from 'react';
import Spinner from './Spinner';

export default function LoginForm({ formData, handleFormToggle, handleChange, isLogin, handleSubmit, submitting }) {
    const [showPass, setShowPass] = useState(false);

    const togglePassword = () => {
        setShowPass(!showPass);
    };

    return (
        <form
            className="flex flex-col gap-6 p-6 pb-4 w-[85%] max-w-[350px] rounded-xl border bg-white shadow-lg mx-auto mt-16"
            onSubmit={handleSubmit}
        >
            <p className="text-3xl font-bold text-center text-blue-600">
                {isLogin ? 'Login' : 'Signup'}
            </p>
            <p className="text-sm text-stone-500">
                {isLogin ? 'Log in to your account' : 'Create an account for free'}
            </p>

            {!isLogin && (
                <div className="relative">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`text-sm text-slate-700 border border-[2.3px] w-full rounded p-2 outline-blue-500 transition-all focus:border-blue-500 ${formData.username && 'has-value'
                            }`}
                        required
                        aria-label="Username"
                    />
                    <label htmlFor="username" className={`floating-label ${formData.username && 'active'}`}>
                        Username
                    </label>
                    <i className="fa-solid fa-user absolute right-4 top-3 text-neutral-700"></i>
                </div>
            )}

            <div className="relative">
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`text-sm text-slate-700 border border-[2.3px] w-full rounded p-2 outline-blue-500 transition-all focus:border-blue-500 ${formData.email && 'has-value'
                        }`}
                    required
                    aria-label="Email"
                />
                <label htmlFor="email" className={`floating-label ${formData.email && 'active'}`}>
                    Email
                </label>
                <i className="fa-solid fa-envelope absolute right-4 top-3 text-neutral-700"></i>
            </div>

            <div className="relative">
                <input
                    type={showPass ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`text-sm text-slate-700 border border-[2.3px] w-full rounded p-2 outline-blue-500 transition-all focus:border-blue-500 ${formData.password && 'has-value'
                        }`}
                    required
                    aria-label="Password"
                />
                <label htmlFor="password" className={`floating-label ${formData.password && 'active'}`}>
                    Password
                </label>
                <img
                    onClick={togglePassword}
                    src={!showPass ? '/hide.png' : '/show.png'}
                    className="h-5 w-5 absolute top-3 right-4 cursor-pointer"
                    alt="Toggle password visibility"
                />
            </div>

            <button
                type="submit"
                className={`w-full h-10 rounded-xl py-2 text-white text-lg font-semibold mx-auto flex justify-center gap-3 items-center ${submitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                    }`}
                disabled={submitting}
            >
                {!submitting ? (isLogin ? 'Login' : 'Signup') : <Spinner />}
            </button>

            <hr />
            <div className="text-sm text-center">
                {isLogin ? (
                    <p className="text-stone-500">
                        Don't have an account?{' '}
                        <span onClick={handleFormToggle} className="text-blue-600 cursor-pointer">
                            Signup
                        </span>
                    </p>
                ) : (
                    <p className="text-stone-500">
                        Already have an account?{' '}
                        <span onClick={handleFormToggle} className="text-blue-600 cursor-pointer">
                            Login
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
}
