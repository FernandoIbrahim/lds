import axios from "axios";
import { useUserContext } from "../hooks/UserContext";

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const { token } = useUserContext();
    const authParams = {
        Authorization: `Bearer ${token}`
    }
    if (token) {
        config.headers = { ...config.headers, ...authParams }
    }
    return config
})

api.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        return Promise.reject(error)
    },
)

export default api;

