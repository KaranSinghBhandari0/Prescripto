import React, { useContext, useState } from 'react';
import LoginForm from '../components/LoginForm';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login, signup } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormToggle = () => {
    setIsLogin((prev) => !prev);
    setFormData({ username: '', email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isLogin) {
        await login(formData);
      } else {
        await signup(formData);
      }
    } catch (err) {
    } finally {
      setFormData({ username: '', email: '', password: '' });
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <LoginForm
        isLogin={isLogin}
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        handleFormToggle={handleFormToggle}
        submitting={submitting}
      />
    </div>
  );
}
