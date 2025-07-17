import React from 'react';
import { Trash2 } from 'lucide-react';
import { useAppDispatch } from '../../../hooks/redux';
import { updateWorkExperience, removeWorkExperience, WorkExperience } from '../../../store/slices/activeResumeSlice';

interface WorkExperienceCardProps {
  experience: WorkExperience;
}

const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({ experience }) => {
  const dispatch = useAppDispatch();

  const handleChange = (field: keyof WorkExperience, value: string | boolean) => {
    dispatch(updateWorkExperience({ ...experience, [field]: value }));
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this experience?')) {
      dispatch(removeWorkExperience(experience.id));
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
        <button
          onClick={handleRemove}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title *
            </label>
            <input
              type="text"
              value={experience.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              placeholder="e.g., Frontend Developer"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company *
            </label>
            <input
              type="text"
              value={experience.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="e.g., Google Inc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date *
            </label>
            <input
              type="month"
              value={experience.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="month"
              value={experience.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              disabled={experience.current}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id={`current-${experience.id}`}
            checked={experience.current}
            onChange={(e) => {
              handleChange('current', e.target.checked);
              if (e.target.checked) {
                handleChange('endDate', '');
              }
            }}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor={`current-${experience.id}`} className="ml-2 block text-sm text-gray-700">
            I currently work here
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description
          </label>
          <textarea
            value={experience.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Describe your responsibilities and achievements..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceCard;