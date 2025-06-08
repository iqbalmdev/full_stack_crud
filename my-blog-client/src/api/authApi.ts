import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:4001/api/auth", // auth-service
});

export default authApi;
