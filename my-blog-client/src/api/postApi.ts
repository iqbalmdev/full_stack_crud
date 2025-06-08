import axios from "axios";

const postApi = axios.create({
  baseURL: "http://localhost:4002/api", // post-service
});

postApi.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

postApi.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post("http://localhost:4001/api/auth/refresh", { token: refreshToken });
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return postApi(originalRequest);
      } catch (err) {
        // Handle logout if refresh fails
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default postApi;
