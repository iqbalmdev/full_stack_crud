import React from 'react';
import Navbar from '../components/Navbar';

const Profile: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-xl mx-auto p-6 mt-20 bg-white rounded shadow text-center">
        <h1 className="text-4xl font-bold text-primary mb-6">User Profile</h1>
        <p className="text-xl text-gray-600">🚧 This page is under construction. Stay tuned! 🚧</p>
      </main>
    </>
  );
};

export default Profile;
