import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { updateGeneralInfo } from '../../../store/slices/activeResumeSlice';

const GeneralInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { name, description } = useAppSelector(state => state.activeResume);

  const handleChange = (field: string, value: string) => {
    dispatch(updateGeneralInfo({ 
      name: field === 'name' ? value : name,
      description: field === 'description' ? value : description
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">General Information</h2>
        <p className="text-gray-600">Give your resume a name and description</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Resume Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g., Frontend Developer Resume"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Brief description of this resume..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;