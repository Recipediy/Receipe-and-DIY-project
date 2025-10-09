import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  X, 
  RotateCcw, 
  Clock, 
  DollarSign,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import StepCard from './StepCard';

const StepByStepMode = ({ post, onClose }) => {
  const [checkedSteps, setCheckedSteps] = useState({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const steps = post.steps || [];
  const storageKey = `step-progress-${post._id}`;

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(storageKey);
    if (savedProgress) {
      try {
        setCheckedSteps(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, [storageKey]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checkedSteps));
  }, [checkedSteps, storageKey]);

  const toggleStep = (index) => {
    setCheckedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
      setCheckedSteps({});
      setCurrentStepIndex(0);
      localStorage.removeItem(storageKey);
    }
  };

  const completedCount = Object.values(checkedSteps).filter(Boolean).length;
  const totalSteps = steps.length;
  const progressPercentage = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;

  const goToNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const markAllAsComplete = () => {
    const allChecked = {};
    steps.forEach((_, idx) => {
      allChecked[idx] = true;
    });
    setCheckedSteps(allChecked);
  };

  const totalTime = steps.reduce((sum, step) => sum + (step.time || 0), 0);
  const totalCost = steps.reduce((sum, step) => {
    const stepCost = step.materials?.reduce((s, m) => s + (m.estimatedCost || 0), 0) || 0;
    return sum + stepCost;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 readable contrast-on-glass flex items-center gap-2">
                <span className="text-3xl">{post.type === 'recipe' ? '👨‍🍳' : '🔨'}</span>
                Step-by-Step Mode
              </h2>
              <p className="text-white/80 text-sm readable">{post.title}</p>
            </div>
            <button
              onClick={onClose}
              className="glass-btn p-3 hover:scale-110 transition-transform"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white readable">
                Progress: {completedCount} / {totalSteps} steps
              </span>
              <span className="text-sm font-bold text-teal-400 readable">
                {progressPercentage.toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-violet-400 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-card p-3 text-center" style={{ background: 'rgba(0, 0, 0, 0.15)' }}>
              <div className="text-2xl font-bold text-teal-400 readable">{totalSteps}</div>
              <div className="text-xs text-white/80 readable">Total Steps</div>
            </div>
            {totalTime > 0 && (
              <div className="glass-card p-3 text-center" style={{ background: 'rgba(0, 0, 0, 0.15)' }}>
                <Clock className="w-5 h-5 mx-auto mb-1 text-violet-400" />
                <div className="text-sm font-bold text-white readable">{totalTime} min</div>
                <div className="text-xs text-white/80 readable">Total Time</div>
              </div>
            )}
            {totalCost > 0 && (
              <div className="glass-card p-3 text-center" style={{ background: 'rgba(0, 0, 0, 0.15)' }}>
                <DollarSign className="w-5 h-5 mx-auto mb-1 text-green-400" />
                <div className="text-sm font-bold text-white readable">৳{totalCost.toFixed(2)}</div>
                <div className="text-xs text-white/80 readable">Total Cost</div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={resetProgress}
              className="glass-btn flex-1 py-2.5 text-sm hover:scale-105 transition-transform"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset Progress</span>
            </button>
            {completedCount < totalSteps && (
              <button
                onClick={markAllAsComplete}
                className="glass-btn flex-1 py-2.5 text-sm hover:scale-105 transition-transform bg-teal-500/20"
                title="Mark all steps as complete"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="hidden sm:inline">Complete All</span>
              </button>
            )}
          </div>
        </div>

        {/* Steps Focus View */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Focus View - Single Step */}
          {currentStepIndex >= 0 && currentStepIndex < steps.length && (

            <div className="max-w-3xl mx-auto">
              <div className="glass-card p-6 mb-4" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                <div className="flex items-start gap-4 mb-4">
                  <button
                    onClick={() => toggleStep(currentStepIndex)}
                    className="flex-shrink-0 group"
                  >
                    {checkedSteps[currentStepIndex] ? (
                      <CheckCircle2 className="w-12 h-12 text-teal-400 group-hover:scale-110 transition-transform" />
                    ) : (
                      <Circle className="w-12 h-12 text-white/40 group-hover:text-teal-400 group-hover:scale-110 transition-all" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-3xl font-bold text-white readable contrast-on-glass">
                        Step {currentStepIndex + 1}
                      </h3>
                      {steps[currentStepIndex].time > 0 && (
                        <span className="glass-badge">
                          <Clock className="w-4 h-4" />
                          {steps[currentStepIndex].time} min
                        </span>
                      )}
                    </div>
                    
                    <p className="text-lg text-white/90 readable leading-relaxed">
                      {steps[currentStepIndex].instruction || steps[currentStepIndex].description}
                    </p>
                  </div>
                </div>

                {/* Step Image */}
                {steps[currentStepIndex].image && (
                  <img
                    src={steps[currentStepIndex].image}
                    alt={`Step ${currentStepIndex + 1}`}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}

                {/* Materials */}
                {steps[currentStepIndex].materials && steps[currentStepIndex].materials.length > 0 && (
                  <div className="mt-4 p-4 glass-card" style={{ background: 'rgba(0, 0, 0, 0.15)' }}>
                    <div className="text-sm font-bold text-white mb-3 readable">Materials needed for this step:</div>
                    <div className="grid grid-cols-2 gap-3">
                      {steps[currentStepIndex].materials.map((material, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2 glass-card" style={{ background: 'rgba(0, 0, 0, 0.1)' }}>
                          <span className="text-sm text-white readable">
                            {material.name} {material.quantity && `(${material.quantity}${material.unit || ''})`}
                          </span>
                          {material.estimatedCost > 0 && (
                            <span className="text-sm font-bold text-green-400 readable">
                              ৳{material.estimatedCost.toFixed(2)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tips/Notes */}
                {steps[currentStepIndex].tips && (
                  <div className="mt-4 p-4 glass-card bg-yellow-500/10 border border-yellow-400/30">
                    <div className="flex items-start gap-2">
                      <span className="text-xl">💡</span>
                      <div>
                        <div className="text-sm font-bold text-yellow-300 mb-1 readable">Pro Tip:</div>
                        <div className="text-sm text-white/90 readable">{steps[currentStepIndex].tips}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex gap-3">
                <button
                  onClick={goToPrevious}
                  disabled={currentStepIndex === 0}
                  className="glass-btn flex-1 py-3 hover:scale-105 transition-transform disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>
                <button
                  onClick={goToNext}
                  disabled={currentStepIndex === steps.length - 1}
                  className="glass-btn flex-1 py-3 hover:scale-105 transition-transform disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {progressPercentage === 100 && (
          <div className="p-6 border-t border-white/20 bg-gradient-to-r from-teal-500/20 to-violet-500/20">
            <div className="text-center">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="text-xl font-bold text-white mb-2 readable">Congratulations!</h3>
              <p className="text-white/80 text-sm readable">
                You've completed all steps! Great work!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepByStepMode;
