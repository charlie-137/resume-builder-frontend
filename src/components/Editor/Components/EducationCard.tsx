import React from 'react';
import { Trash2 } from 'lucide-react';
import { useAppDispatch } from '../../../hooks/redux';
import { updateEducation, removeEducation, Education } from '../../../store/slices/activeResumeSlice';

interface EducationCardProps {
  education: Education;
}

const EducationCard: React.FC<EducationCardProps> = ({ education }) => {
  const dispatch = useAppDispatch();

  const handleChange = (field: keyof Education, value: string | boolean) => {
    dispatch(updateEducation({ ...education, [field]: value }));
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this education?')) {
      dispatch(removeEducation(education.id));
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Education</h3>
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
              Degree *
            </label>
            <input
              type="text"
              value={education.degree}
              onChange={(e) => handleChange('degree', e.target.value)}
              placeholder="e.g., Bachelor of Science in Computer Science"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              School/University *
            </label>
            <input
              type="text"
              value={education.school}
              onChange={(e) => handleChange('school', e.target.value)}
              placeholder="e.g., Stanford University"
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
              value={education.startDate}
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
              value={education.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              disabled={education.current}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id={`current-${education.id}`}
            checked={education.current}
            onChange={(e) => {
              handleChange('current', e.target.checked);
              if (e.target.checked) {
                handleChange('endDate', '');
              }
            }}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor={`current-${education.id}`} className="ml-2 block text-sm text-gray-700">
            I currently study here
          </label>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;