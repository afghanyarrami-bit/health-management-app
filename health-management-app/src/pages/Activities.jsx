import React from 'react';
import { Plus, X } from 'lucide-react';

const Activities = ({ activities, onDelete, openAddModal }) => {
  const totalCalories = activities.reduce((sum, act) => sum + act.calories, 0);
  const totalDuration = activities.reduce((sum, act) => sum + act.duration, 0);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black uppercase font-mono">
          Activities
        </h2>
        <button 
          className="brutal-button"
          onClick={() => openAddModal('activities')}
        >
          <Plus size={20} className="inline mr-2" />
          Log Activity
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="metric-card">
          <div className="text-sm text-stone-400 uppercase tracking-wider mb-2">Total Activities</div>
          <div className="text-4xl font-black font-mono">
            {activities.length}
          </div>
        </div>
        <div className="metric-card">
          <div className="text-sm text-stone-400 uppercase tracking-wider mb-2">Total Duration</div>
          <div className="text-4xl font-black font-mono">
            {totalDuration}<span className="text-xl ml-2">min</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="text-sm text-stone-400 uppercase tracking-wider mb-2">Calories Burned</div>
          <div className="text-4xl font-black text-red-600 font-mono">
            {totalCalories}
          </div>
        </div>
      </div>

      <div className="metric-card">
        <h3 className="text-lg font-bold uppercase mb-6 pb-3 border-b-2 border-stone-800 font-mono">
          Activity Log
        </h3>
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="border-2 border-stone-800 p-6 flex items-start justify-between hover:border-red-600 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className="status-badge border-red-600 text-red-600">
                    {activity.type}
                  </div>
                  <span className="text-sm text-stone-500">{activity.date}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-2xl font-bold font-mono">
                      {activity.duration} min
                    </div>
                    <div className="text-xs text-stone-400">Duration</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600 font-mono">
                      {activity.calories}
                    </div>
                    <div className="text-xs text-stone-400">Calories</div>
                  </div>
                </div>
                {activity.notes && (
                  <div className="text-sm text-stone-400 mt-2">{activity.notes}</div>
                )}
              </div>
              <button 
                onClick={() => onDelete('activities', activity.id)}
                className="p-2 hover:bg-red-600 transition-colors border-2 border-stone-700 ml-4"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-500 mb-4">No activities logged yet</p>
            <button 
              className="brutal-button"
              onClick={() => openAddModal('activities')}
            >
              <Plus size={20} className="inline mr-2" />
              Log Your First Activity
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
