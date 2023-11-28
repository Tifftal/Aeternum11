import axios from 'axios';

const api = axios.create();

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;
        console.log(response);
        if (response && response.status === 401) {
            // window.localStorage.removeItem("jwtToken");
            // window.location.href = "/"
        }
    }
);

export default api;