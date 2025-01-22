import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { StateProvider } from './context/StateContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { DoctorProvider } from './context/DoctorContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StateProvider>
            <DoctorProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </DoctorProvider>
        </StateProvider>
        <ToastContainer autoClose={3500} position="top-right" theme="colored"/>
    </BrowserRouter>
)
