import type { ReactNode } from 'react';

export interface StepItem {
  /** Step title */
  title: string;
  /** Step description */
  description?: string;
  /** Step icon */
  icon?: ReactNode;
}

export interface StepperProps {
  /** Steps */
  steps: StepItem[];
  /** Current step (0-indexed) */
  currentStep: number;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** On step click */
  onStepClick?: (step: number) => void;
  /** Allow clicking on completed steps only */
  clickableCompleted?: boolean;
  /** Additional class name */
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  orientation = 'horizontal',
  onStepClick,
  clickableCompleted = true,
  className = '',
}: StepperProps) {
  const isHorizontal = orientation === 'horizontal';

  const handleStepClick = (index: number) => {
    if (onStepClick && (!clickableCompleted || index < currentStep)) {
      onStepClick(index);
    }
  };

  return (
    <div
      className={`
        ${isHorizontal ? 'flex items-start' : 'flex flex-col'}
        ${className}
      `}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isClickable = onStepClick && (!clickableCompleted || isCompleted);

        return (
          <div
            key={index}
            className={`
              ${isHorizontal ? 'flex-1 flex items-start' : 'flex'}
              ${index !== steps.length - 1 ? (isHorizontal ? '' : 'pb-8') : ''}
            `}
          >
            {/* Step indicator and connector */}
            <div className={`flex ${isHorizontal ? 'flex-col items-center flex-1' : 'flex-col items-center mr-4'}`}>
              {/* Step circle */}
              <button
                type="button"
                onClick={() => handleStepClick(index)}
                disabled={!isClickable}
                className={`
                  relative z-10 flex items-center justify-center w-10 h-10 rounded-full
                  font-medium text-sm transition-colors
                  ${isClickable ? 'cursor-pointer' : 'cursor-default'}
                  ${
                    isCompleted
                      ? 'bg-primary-600 text-white'
                      : isCurrent
                        ? 'bg-primary-600 text-white ring-4 ring-primary-100 dark:ring-primary-900'
                        : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'
                  }
                `}
              >
                {step.icon ? (
                  step.icon
                ) : isCompleted ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )}
              </button>

              {/* Connector line */}
              {index !== steps.length - 1 && (
                <div
                  className={`
                    ${isHorizontal ? 'h-0.5 w-full mt-5' : 'w-0.5 flex-1 min-h-8'}
                    ${isCompleted ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'}
                  `}
                />
              )}
            </div>

            {/* Step content */}
            <div className={`${isHorizontal ? 'mt-3 text-center px-2' : 'pt-1'}`}>
              <p
                className={`
                  text-sm font-medium
                  ${isCurrent ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-900 dark:text-white'}
                `}
              >
                {step.title}
              </p>
              {step.description && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
