import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface ResumeData {
  id: string;
  name: string;
  description: string;
  personalInfo: {
    photo: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    city: string;
    country: string;
    phone: string;
    email: string;
  };
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  summary: string;
  createdAt: string;
  updatedAt: string;
}

const initialState: ResumeData = {
  id: '',
  name: '',
  description: '',
  personalInfo: {
    photo: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    city: '',
    country: '',
    phone: '',
    email: '',
  },
  workExperience: [],
  education: [],
  skills: [],
  summary: '',
  createdAt: '',
  updatedAt: '',
};

const activeResumeSlice = createSlice({
  name: 'activeResume',
  initialState,
  reducers: {
    initializeResume: (state) => {
      const now = new Date().toISOString();
      state.id = uuidv4();
      state.createdAt = now;
      state.updatedAt = now;
    },
    loadResume: (state, action: PayloadAction<ResumeData>) => {
      return { ...action.payload };
    },
    updateGeneralInfo: (state, action: PayloadAction<{ name: string; description: string }>) => {
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.updatedAt = new Date().toISOString();
    },
    updatePersonalInfo: (state, action: PayloadAction<Partial<ResumeData['personalInfo']>>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
      state.updatedAt = new Date().toISOString();
    },
    addWorkExperience: (state) => {
      const newExp: WorkExperience = {
        id: uuidv4(),
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false,
      };
      state.workExperience.push(newExp);
      state.updatedAt = new Date().toISOString();
    },
    updateWorkExperience: (state, action: PayloadAction<WorkExperience>) => {
      const index = state.workExperience.findIndex(exp => exp.id === action.payload.id);
      if (index !== -1) {
        state.workExperience[index] = action.payload;
        state.updatedAt = new Date().toISOString();
      }
    },
    removeWorkExperience: (state, action: PayloadAction<string>) => {
      state.workExperience = state.workExperience.filter(exp => exp.id !== action.payload);
      state.updatedAt = new Date().toISOString();
    },
    addEducation: (state) => {
      const newEdu: Education = {
        id: uuidv4(),
        degree: '',
        school: '',
        startDate: '',
        endDate: '',
        current: false,
      };
      state.education.push(newEdu);
      state.updatedAt = new Date().toISOString();
    },
    updateEducation: (state, action: PayloadAction<Education>) => {
      const index = state.education.findIndex(edu => edu.id === action.payload.id);
      if (index !== -1) {
        state.education[index] = action.payload;
        state.updatedAt = new Date().toISOString();
      }
    },
    removeEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter(edu => edu.id !== action.payload);
      state.updatedAt = new Date().toISOString();
    },
    updateSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
      state.updatedAt = new Date().toISOString();
    },
    updateSummary: (state, action: PayloadAction<string>) => {
      state.summary = action.payload;
      state.updatedAt = new Date().toISOString();
    },
    resetResume: () => initialState,
  },
});

export const {
  initializeResume,
  loadResume,
  updateGeneralInfo,
  updatePersonalInfo,
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience,
  addEducation,
  updateEducation,
  removeEducation,
  updateSkills,
  updateSummary,
  resetResume,
} = activeResumeSlice.actions;

export default activeResumeSlice.reducer;