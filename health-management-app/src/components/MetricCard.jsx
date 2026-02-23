import React from 'react';

const MetricCard = ({ icon: Icon, value, label, iconColor = 'bg-red-600', showPulse = false }) => {
  return (
    <div className="metric-card">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 border-2 border-brutal-border ${iconColor}`}>
          <Icon size={24} />
        </div>
        {showPulse && (
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse-dot"></div>
        )}
      </div>
      <div className="text-4xl font-black mb-2 font-mono">
        {value || '--'}
      </div>
      <div className="text-stone-400 text-sm uppercase tracking-wider">{label}</div>
    </div>
  );
};

export default MetricCard;
