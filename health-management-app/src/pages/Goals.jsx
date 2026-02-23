import React from 'react';
import { Plus, X } from 'lucide-react';

const Goals = ({ goals, onDelete, openAddModal }) => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black uppercase font-mono">
          Health Goals
        </h2>
        <button 
          className="brutal-button"
          onClick={() => openAddModal('goals')}
        >
          <Plus size={20} className="inline mr-2" />
          New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map(goal => {
          const progress = Math.round((goal.current / goal.target) * 100);
          return (
            <div key={goal.id} className="metric-card relative">
              <button 
                onClick={() => onDelete('goals', goal.id)}
                className="absolute top-4 right-4 p-2 hover:bg-red-600 transition-colors border-2 border-stone-700"
              >
                <X size={16} />
              </button>
              <div className="mb-4">
                <div className="status-badge border-purple-600 text-purple-600 mb-3">
                  {goal.category}
                </div>
                <h3 className="text-2xl font-bold mb-2">{goal.title}</h3>
                <div className="text-stone-400 mb-4">Deadline: {goal.deadline}</div>
                
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <div className="text-3xl font-black font-mono">
                      {goal.current}
                      <span className="text-lg text-stone-400 ml-2">/ {goal.target} {goal.unit}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-red-600 font-mono">
                    {progress}%
                  </div>
                </div>
                
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {goals.length === 0 && (
        <div className="metric-card text-center py-12">
          <p className="text-stone-500 mb-4">No goals set yet</p>
          <button 
            className="brutal-button"
            onClick={() => openAddModal('goals')}
          >
            <Plus size={20} className="inline mr-2" />
            Set Your First Goal
          </button>
        </div>
      )}
    </div>
  );
};

export default Goals;
