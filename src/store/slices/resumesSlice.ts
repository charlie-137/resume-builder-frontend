import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResumeData } from './activeResumeSlice';

interface ResumesState {
  resumes: ResumeData[];
}

const initialState: ResumesState = {
  resumes: [],
};

const resumesSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {
    addResume: (state, action: PayloadAction<ResumeData>) => {
      const existingIndex = state.resumes.findIndex(resume => resume.id === action.payload.id);
      if (existingIndex !== -1) {
        state.resumes[existingIndex] = action.payload;
      } else {
        state.resumes.unshift(action.payload);
      }
    },
    deleteResume: (state, action: PayloadAction<string>) => {
      state.resumes = state.resumes.filter(resume => resume.id !== action.payload);
    },
    loadResumes: (state, action: PayloadAction<ResumeData[]>) => {
      state.resumes = action.payload;
    },
  },
});

export const { addResume, deleteResume, loadResumes } = resumesSlice.actions;
export default resumesSlice.reducer;