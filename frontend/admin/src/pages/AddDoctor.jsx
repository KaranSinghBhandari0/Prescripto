import React, { useContext, useState } from 'react';
import AddDoctorForm from '../components/AddDoctorForm';

import { AuthContext } from '../context/AuthContext';

export default function AddDoctor() {
  const { doctors,  } = useContext(AuthContext);
  const [adding , setAdding] = useState(false);

  const [doctorData, setDoctorData] = useState({
    name: '',
    email: '',
    password: '',
    experience: '1 Year',
    fees: '',
    speciality: 'General physician',
    degree: '',
    address: '',
    about: '',
    image: null,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({
      ...doctorData,
      [name]: value,
    });
  };

  // Handle file input (doctor's image)
  const handleChange = (e) => {
    const { name, files } = e.target;
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setAdding(true);
    const formData = new FormData();
    // Append data to FormData
    formData.append('name', doctorData.name);
    formData.append('email', doctorData.email);
    formData.append('password', doctorData.password);
    formData.append('experience', doctorData.experience);
    formData.append('fees', doctorData.fees);
    formData.append('speciality', doctorData.speciality);
    formData.append('degree', doctorData.degree);
    formData.append('address', doctorData.address);
    formData.append('about', doctorData.about);
    formData.append('image', doctorData.image);

    try {
      addNewDoctor(formData);
    } catch (error) {
      setAdding(false)
    }
  };

  return (
    <AddDoctorForm handleChange={handleChange} handleSubmit={handleSubmit} handleInputChange={handleInputChange} adding={adding} doctorData={doctorData}  />
  );
}
