import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { updateSkills } from '../../../store/slices/activeResumeSlice';

const Skills: React.FC = () => {
  const dispatch = useAppDispatch();
  const skills = useAppSelector(state => state.activeResume.skills);
  const [inputValue, setInputValue] = useState('');

  const handleAddSkill = () => {
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      dispatch(updateSkills([...skills, inputValue.trim()]));
      setInputValue('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    dispatch(updateSkills(skills.filter(skill => skill !== skillToRemove)));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
        <p className="text-gray-600">Add your technical and soft skills</p>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., JavaScript, React, Node.js"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleAddSkill}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </button>
        </div>

        {skills.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Your Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {skills.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No skills added</h3>
            <p className="text-gray-500">Add your first skill to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;