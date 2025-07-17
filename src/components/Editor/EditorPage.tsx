import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { loadResume, initializeResume, resetResume } from '../../store/slices/activeResumeSlice';
import { addResume } from '../../store/slices/resumesSlice';
import Breadcrumb, { BreadcrumbStep } from './Breadcrumb';
import GeneralInfo from './Steps/GeneralInfo';
import PersonalInfo from './Steps/PersonalInfo';
import WorkExperience from './Steps/WorkExperience';
import Education from './Steps/Education';
import Skills from './Steps/Skills';
import Summary from './Steps/Summary';
import ResumePreview from './ResumePreview';

const EditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const activeResume = useAppSelector(state => state.activeResume);
  const resumes = useAppSelector(state => state.resumes.resumes);

  const [currentStep, setCurrentStep] = useState('general');

  const steps: BreadcrumbStep[] = [
    { id: 'general', title: 'General Info', completed: !!activeResume.name },
    { id: 'personal', title: 'Personal Info', completed: !!activeResume.personalInfo.firstName && !!activeResume.personalInfo.lastName },
    { id: 'work', title: 'Work Experience', completed: activeResume.workExperience.length > 0 },
    { id: 'education', title: 'Education', completed: activeResume.education.length > 0 },
    { id: 'skills', title: 'Skills', completed: activeResume.skills.length > 0 },
    { id: 'summary', title: 'Summary', completed: !!activeResume.summary },
  ];

  useEffect(() => {
    if (id) {
      const existingResume = resumes.find(resume => resume.id === id);
      if (existingResume) {
        dispatch(loadResume(existingResume));
      } else {
        navigate('/');
      }
    } else {
      dispatch(resetResume());
      dispatch(initializeResume());
    }
  }, [id, dispatch, resumes, navigate]);

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const canGoNext = currentStepIndex < steps.length - 1;
  const canGoPrevious = currentStepIndex > 0;

  const handleNext = () => {
    if (canGoNext) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (canGoPrevious) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const handleSave = () => {
    dispatch(addResume(activeResume));
    navigate('/');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'general':
        return <GeneralInfo />;
      case 'personal':
        return <PersonalInfo />;
      case 'work':
        return <WorkExperience />;
      case 'education':
        return <Education />;
      case 'skills':
        return <Skills />;
      case 'summary':
        return <Summary />;
      default:
        return <GeneralInfo />;
    }
  };

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Editor */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <Breadcrumb
              steps={steps}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
            
            <div className="mb-8">
              {renderStepContent()}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={!canGoPrevious}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors ${
                  canGoPrevious
                    ? 'text-gray-700 bg-white hover:bg-gray-50'
                    : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                }`}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Resume
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canGoNext}
                  className={`inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium transition-colors ${
                    canGoNext
                      ? 'text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                      : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                  }`}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="lg:sticky lg:top-8 lg:h-fit">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;