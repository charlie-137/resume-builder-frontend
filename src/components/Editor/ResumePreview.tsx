import React from 'react';
import { Mail, Phone, MapPin, Calendar, User } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';

const ResumePreview: React.FC = () => {
  const resume = useAppSelector(state => state.activeResume);

  const formatDate = (dateString: string, current: boolean) => {
    if (!dateString) return '';
    if (current) return 'Present';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Resume Preview</h3>
      </div>
      
      <div className="aspect-[8.5/11] bg-white overflow-auto">
        <div className="p-8 text-sm leading-relaxed">
          {/* Header */}
          <div className="flex items-start space-x-6 mb-8">
            <div className="flex-shrink-0">
              {resume.personalInfo.photo ? (
                <img
                  src={resume.personalInfo.photo}
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded-full border-2 border-gray-200"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {resume.personalInfo.firstName} {resume.personalInfo.lastName}
              </h1>
              
              {resume.personalInfo.jobTitle && (
                <p className="text-xl text-blue-600 mb-4">{resume.personalInfo.jobTitle}</p>
              )}
              
              <div className="space-y-1 text-gray-600">
                {resume.personalInfo.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{resume.personalInfo.email}</span>
                  </div>
                )}
                {resume.personalInfo.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{resume.personalInfo.phone}</span>
                  </div>
                )}
                {(resume.personalInfo.city || resume.personalInfo.country) && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {resume.personalInfo.city}
                      {resume.personalInfo.city && resume.personalInfo.country && ', '}
                      {resume.personalInfo.country}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          {resume.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {resume.workExperience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                Work Experience
              </h2>
              <div className="space-y-4">
                {resume.workExperience.map((exp) => (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.jobTitle}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(exp.startDate, false)} - {formatDate(exp.endDate, exp.current)}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resume.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                Education
              </h2>
              <div className="space-y-4">
                {resume.education.map((edu) => (
                  <div key={edu.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-blue-600 font-medium">{edu.school}</p>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(edu.startDate, false)} - {formatDate(edu.endDate, edu.current)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {resume.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;