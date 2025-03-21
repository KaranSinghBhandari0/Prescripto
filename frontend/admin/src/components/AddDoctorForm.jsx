import React from 'react'
import { assets } from '../assets/assets';

export default function AddDoctorForm({ handleChange, handleSubmit, handleInputChange, adding, doctorData }) {
    return (
        <form onSubmit={handleSubmit} className="m-5 w-full overflow-y-scroll max-h-[90vh] scrollbar-hide">
            <p className="mb-3 text-lg font-medium">Add Doctor</p>
            <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl">
                <div className="flex items-center gap-4 mb-8 text-gray-500">
                    <label htmlFor="doc-img">
                        <img className="w-16 bg-gray-100 rounded-full cursor-pointer" src={assets.upload_icon} alt="Upload" />
                    </label>
                    <input type="file" id="doc-img" name='image' hidden onChange={handleChange} required />
                    <p>Upload doctor <br /> picture</p>
                </div>
                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Your name</p>
                            <input className="border rounded px-3 py-2" type="text" name="name" placeholder="Name" value={doctorData.name} onChange={handleInputChange} required />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor Email</p>
                            <input className="border rounded px-3 py-2" type="email" name="email" placeholder="Email" value={doctorData.email} onChange={handleInputChange} required />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Set Password</p>
                            <input className="border rounded px-3 py-2" type="password" name="password" placeholder="Password" value={doctorData.password} onChange={handleInputChange} required />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Experience</p>
                            <select className="border rounded px-2 py-2" name="experience" value={doctorData.experience} onChange={handleInputChange}>
                                <option value="1 Year">1 Year</option>
                                <option value="2 Years">2 Years</option>
                                <option value="3 Years">3 Years</option>
                                <option value="4 Years">4 Years</option>
                                <option value="5 Years">5 Years</option>
                                <option value="6 Years">6 Years</option>
                                <option value="8 Years">8 Years</option>
                                <option value="9 Years">9 Years</option>
                                <option value="10 Years">10 Years</option>
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Fees</p>
                            <input className="border rounded px-3 py-2" type="number" name="fees" placeholder="Doctor fees" value={doctorData.fees} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Speciality</p>
                            <select className="border rounded px-2 py-2" name="speciality" value={doctorData.speciality} onChange={handleInputChange}>
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Degree</p>
                            <input className="border rounded px-3 py-2" type="text" name="degree" placeholder="Degree" value={doctorData.degree} onChange={handleInputChange} required />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Address</p>
                            <input className="border rounded px-3 py-2" type="text" name="address" placeholder="Address" value={doctorData.address} onChange={handleInputChange} required />
                        </div>
                    </div>
                </div>
                <div>
                    <p className="mt-4 mb-2">About Doctor</p>
                    <textarea className="w-full px-4 pt-2 border rounded" name="about" rows="5" placeholder="Write about doctor" value={doctorData.about} onChange={handleInputChange}></textarea>
                </div>
                <button type="submit" className="bg-blue-700 px-10 py-3 mt-4 text-white rounded-full" disabled={adding}>
                    {adding ? 'Adding...' : "Add Doctor"}
                </button>
            </div>
        </form>
    )
}
