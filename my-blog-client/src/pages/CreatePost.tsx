import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { createPost, getPost, updatePost, clearCurrentPost } from '../features/posts/postSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CreatePost: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { currentPost, loading, error } = useAppSelector((state) => state.posts);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      // Edit mode: fetch post data
      dispatch(getPost(id));
    } else {
      // Create mode: clear any currentPost in store
      dispatch(clearCurrentPost());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentPost && id) {
      setTitle(currentPost.title);
      setContent(currentPost.content);
    }
  }, [currentPost, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id) {
        // Edit mode: update post
        await dispatch(updatePost({ id, postData: { title, content } })).unwrap();
      } else {
        // Create mode: create new post
        await dispatch(createPost({ title, content })).unwrap();
      }
      navigate('/');
    } catch (err) {
      console.error('Failed to save post:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">
          {id ? 'Edit Post' : 'Create a New Post'}
        </h2>
        {loading && <p>Loading post data...</p>}
        {error && <p className="text-error">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea textarea-bordered w-full"
            rows={6}
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            {id ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
