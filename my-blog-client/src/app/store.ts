import { configureStore, type Middleware } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postsReducer from '../features/posts/postSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Persist config for auth slice
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'refreshToken', 'user'], // only persist these fields from auth slice
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  console.log('%c Dispatching:', 'color: blue;', action);
  const result = next(action);
  console.log('%c Next State:', 'color: green;', storeAPI.getState());
  return result;
};

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // persist auth slice
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions in serializable check middleware
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(loggerMiddleware),
});

export const persistor = persistStore(store); // create persistor instance for <PersistGate>

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
