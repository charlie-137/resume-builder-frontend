import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { updateSummary } from '../../../store/slices/activeResumeSlice';

const Summary: React.FC = () => {
  const dispatch = useAppDispatch();
  const summary = useAppSelector(state => state.activeResume.summary);

  const handleChange = (value: string) => {
    dispatch(updateSummary(value));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Summary</h2>
        <p className="text-gray-600">Write a brief summary of your professional background and career goals</p>
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
          Summary
        </label>
        <textarea
          id="summary"
          value={summary}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Write a compelling summary of your experience, skills, and career objectives..."
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="mt-2 text-sm text-gray-500">
          Tip: Keep it concise (2-3 sentences) and highlight your key strengths and achievements.
        </p>
      </div>
    </div>
  );
};

export default Summary;