import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbStep {
  id: string;
  title: string;
  completed: boolean;
}

interface BreadcrumbProps {
  steps: BreadcrumbStep[];
  currentStep: string;
  onStepClick: (stepId: string) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <nav className="mb-8">
      <ol className="flex flex-wrap items-center space-x-2 text-sm">
        {steps.map((step, index) => (
          <li key={step.id} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
            )}
            <button
              onClick={() => onStepClick(step.id)}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                step.id === currentStep
                  ? 'bg-blue-100 text-blue-700'
                  : step.completed
                  ? 'text-green-600 hover:text-green-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {step.title}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;