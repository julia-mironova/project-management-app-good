import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import boardsReducer from './slice/boardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
