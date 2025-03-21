import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext.jsx'
import { AdminProvider } from './context/AdminContext.jsx'
import { DoctorProvider } from './context/DoctorContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <AdminProvider>
                <DoctorProvider>
                    <App />
                </DoctorProvider>
            </AdminProvider>
        </AuthProvider>
    </BrowserRouter>
)
