import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getPost, deletePost } from '../features/posts/postSlice';
import Navbar from '../components/Navbar';
import ConfirmModal from '../components/ConfirmModal';

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentPost, loading, error } = useAppSelector((state) => state.posts);

  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
  }, [dispatch, id]);

  const handleDeleteConfirm = () => {
    if (currentPost) {
      dispatch(deletePost(currentPost._id));
      setShowConfirm(false);
      navigate('/');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-error">{error}</p>;
  if (!currentPost) return <p className="text-center mt-10">Post not found</p>;

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded shadow">
        <h1 className="text-4xl font-extrabold mb-4">{currentPost.title}</h1>
        <p className="text-gray-700 mb-6 whitespace-pre-line">{currentPost.content}</p>

        <p className="text-sm text-gray-500">
          Created by <span className="font-medium">{currentPost.authorId?.name || 'Unknown'}</span>
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Created at: {new Date(currentPost.createdAt).toLocaleString()}
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/posts/edit/${currentPost._id}`)}
            className="btn btn-primary"
          >
            Edit Post
          </button>

          <button onClick={() => setShowConfirm(true)} className="btn btn-error">
            Delete Post
          </button>

          <button onClick={() => navigate('/')} className="btn btn-outline">
            Back to Dashboard
          </button>
        </div>
      </main>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};

export default Post;
