import React from 'react';

const ProgressBar = ({ current, target, title }) => {
  const percentage = Math.round((current / target) * 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-xs text-stone-400">{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
