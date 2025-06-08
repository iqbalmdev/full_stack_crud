import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getPosts, deletePost } from '../features/posts/postSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(id));
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto p-6 mt-6 " style={{width:"100vw"}}>
        <h1 className="text-4xl font-extrabold mb-8 text-center text-primary">
          Recent Posts
        </h1>

        {loading && <p className="text-center text-lg">Loading posts...</p>}
        {error && (
          <p className="text-center text-error font-semibold">{error}</p>
        )}

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {posts.map((post) => (
            <li
              key={post._id}
              className="border rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow bg-white flex flex-col justify-between"
            >
              <div>
                <h2
                  className="text-2xl font-semibold text-secondary hover:text-primary cursor-pointer"
                  onClick={() => navigate(`/posts/${post._id}`)}
                >
                  {post.title}
                </h2>
                <p className="text-gray-600 mt-3">
                  {post.content.substring(0, 150)}...
                </p>

                <p className="mt-4 text-sm text-gray-500">
                  Created by:{' '}
                  <span className="font-medium">
                    {post.authorId?.name || 'Unknown'}
                  </span>
                </p>
                <p className="text-sm text-gray-400">
                  Created at: {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="mt-6 flex justify-between gap-4">
                {/* View Button */}
                <button
                  onClick={() => navigate(`/posts/${post._id}`)}
                  className="flex-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300 py-2"
                >
                  View
                </button>

                {/* Edit Button */}
                <button
  onClick={() => navigate(`/posts/edit/${post._id}`)}
  className="flex-1 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-black hover:text-white hover:border-black transition-colors duration-300 py-2"

>
  Edit
</button>


                {/* Delete Button */}
                {/* <button
                  onClick={() => handleDelete(post._id)}
                  className="flex-1 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 active:scale-95 transition duration-200 py-2"
                >
                  Delete
                </button> */}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Dashboard;
