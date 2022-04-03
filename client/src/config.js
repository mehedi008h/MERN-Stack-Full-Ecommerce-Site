import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://shopx-mern-app.herokuapp.com",
});
