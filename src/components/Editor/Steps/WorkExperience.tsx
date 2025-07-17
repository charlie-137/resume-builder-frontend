import React from 'react';
import { Plus } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { addWorkExperience } from '../../../store/slices/activeResumeSlice';
import WorkExperienceCard from '../Components/WorkExperienceCard';

const WorkExperience: React.FC = () => {
  const dispatch = useAppDispatch();
  const workExperience = useAppSelector(state => state.activeResume.workExperience);

  const handleAddExperience = () => {
    dispatch(addWorkExperience());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
          <p className="text-gray-600">Add your professional experience</p>
        </div>
        <button
          onClick={handleAddExperience}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </button>
      </div>

      {workExperience.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No work experience added</h3>
          <p className="text-gray-500 mb-4">Add your first job experience to get started</p>
          <button
            onClick={handleAddExperience}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {workExperience.map((experience) => (
            <WorkExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkExperience;