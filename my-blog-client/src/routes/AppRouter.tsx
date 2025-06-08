import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
// import PostDetail from "../pages/PostDetail";

const AppRouter = () => {
  const isAuthenticated = !!localStorage.getItem("accessToken");
    console.log(isAuthenticated,"isAuthenticated")
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      {/* <Route path="/posts/:id" element={isAuthenticated ? <PostDetail /> : <Navigate to="/login" />} /> */}
    </Routes>
  );
};

export default AppRouter;
