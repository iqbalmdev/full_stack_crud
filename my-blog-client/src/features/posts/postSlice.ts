import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchPosts,
  fetchPostById,
  createPost as apiCreatePost,
  updatePost as apiUpdatePost,
  deletePost as apiDeletePost,
} from './postsAPI';

interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}

interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

// Fetch all posts thunk
export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const response = await fetchPosts();
  return response.data;
});

// Fetch single post thunk
export const getPost = createAsyncThunk('posts/getPost', async (id: string) => {
  const response = await fetchPostById(id);
  return response.data;
});

// Create Post thunk
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: { title: string; content: string }, thunkAPI) => {
    try {
      const response = await apiCreatePost(postData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create post');
    }
  }
);

// Update Post thunk
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (
    { id, postData }: { id: string; postData: { title?: string; content?: string } },
    thunkAPI
  ) => {
    try {
      const response = await apiUpdatePost(id, postData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update post');
    }
  }
);

// Delete Post thunk
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: string, thunkAPI) => {
    try {
      await apiDeletePost(id);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete post');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearCurrentPost(state) {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getPosts cases
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })

      // getPost cases
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch post';
      })

      // Create Post cases
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload); // Add new post at the front
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Post cases
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex((post) => post._id === action.payload._id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        if (state.currentPost?._id === action.payload._id) {
          state.currentPost = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Post cases
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
        if (state.currentPost?._id === action.payload) {
          state.currentPost = null;
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;
