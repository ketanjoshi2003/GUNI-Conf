import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor to add the access token to every request
api.interceptors.request.use(
    (config) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors (token expired)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and we haven't already tried to refresh the token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!userInfo || !userInfo.refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Call the refresh token endpoint
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
                    refreshToken: userInfo.refreshToken
                });

                // Update the localStorage with the new tokens
                const updatedUserInfo = { ...userInfo, token: data.token, refreshToken: data.refreshToken };
                localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

                // Update the original request's authorization header and retry it
                originalRequest.headers.Authorization = `Bearer ${data.token}`;
                return axios(originalRequest);
            } catch (refreshError) {
                // If refresh fails, log the user out
                localStorage.removeItem('userInfo');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
