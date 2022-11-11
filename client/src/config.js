import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:
        "https://mern-stack-full-ecommerce-site-production-c004.up.railway.app",
});
