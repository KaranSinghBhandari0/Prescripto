import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://prescripto-g8p4.onrender.com',
    withCredentials: true,
});