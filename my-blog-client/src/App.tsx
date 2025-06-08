import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PostPage from './pages/PostPage';
import Login from './pages/Login';
import PrivateLayout from './layouts/PrivateLayout';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route
          path="/"
          element={
            <PrivateLayout>
              <Dashboard />
            </PrivateLayout>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <PrivateLayout>
              <PostPage />
            </PrivateLayout>
          }
        />
        <Route
          path="/posts/create"
          element={
            <PrivateLayout>
              <CreatePost />
            </PrivateLayout>
          }
        />
        <Route path="/posts/edit/:id" element={
            <PrivateLayout>
              <CreatePost />
            </PrivateLayout>
          } />
          <Route path="/profile" element={
            <PrivateLayout>
              <Profile />
            </PrivateLayout>
          } />
      </Routes>
    </Router>
  );
};

export default App;
