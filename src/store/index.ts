import { configureStore } from '@reduxjs/toolkit';
import activeResumeReducer from './slices/activeResumeSlice';
import resumesReducer from './slices/resumesSlice';

export const store = configureStore({
  reducer: {
    activeResume: activeResumeReducer,
    resumes: resumesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;