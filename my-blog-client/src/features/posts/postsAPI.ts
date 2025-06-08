import axiosInstance from '../../api/postApi';

export const fetchPosts = () => axiosInstance.get('/posts');
export const fetchPostById = (id: string) => axiosInstance.get(`/posts/${id}`);

// New APIs:
export const createPost = (postData: { title: string; content: string }) =>
  axiosInstance.post('/posts', postData);

export const updatePost = (id: string, postData: { title?: string; content?: string }) =>
  axiosInstance.put(`/posts/${id}`, postData);

export const deletePost = (id: string) =>
  axiosInstance.delete(`/posts/${id}`);
