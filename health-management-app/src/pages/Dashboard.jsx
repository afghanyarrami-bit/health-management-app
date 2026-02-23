import React from 'react';
import { Heart, Activity, Scale, Moon, Calendar, Target, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MetricCard from '../components/MetricCard';
import ProgressBar from '../components/ProgressBar';

const Dashboard = ({ healthData, openAddModal }) => {
  const latestVital = healthData.vitals[healthData.vitals.length - 1] || {};
  const upcomingAppointment = healthData.appointments[0] || null;
  const activeGoals = healthData.goals.slice(0, 3);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" >
        <MetricCard 
          icon={Heart} 
          value={latestVital.heartRate} 
          label="Heart Rate (BPM)" 
          iconColor="bg-red-600"
          showPulse={true}
        />
        <MetricCard 
          icon={Activity} 
          value={latestVital.bloodPressure} 
          label="Blood Pressure" 
          iconColor="bg-blue-600"
        />
        <MetricCard 
          icon={Scale} 
          value={latestVital.weight} 
          label="Weight (kg)" 
          iconColor="bg-purple-600"
        />
        <MetricCard 
          icon={Moon} 
          value={latestVital.sleep} 
          label="Sleep (hours)" 
          iconColor="bg-indigo-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="metric-card">
          <h3 className="text-lg font-bold uppercase mb-6 pb-3 border-b-2 border-stone-800 font-mono">
            Heart Rate Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={healthData.vitals}>
              <CartesianGrid strokeDasharray="3 3" stroke="#44403c" />
              <XAxis dataKey="date" stroke="#78716c" tick={{ fontSize: 11 }} />
              <YAxis stroke="#78716c" tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ background: '#1c1917', border: '2px solid #f5f5f4', fontFamily: 'Space Mono, monospace' }}
              />
              <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="metric-card">
          <h3 className="text-lg font-bold uppercase mb-6 pb-3 border-b-2 border-stone-800 font-mono">
            Weight Progress
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={healthData.vitals}>
              <CartesianGrid strokeDasharray="3 3" stroke="#44403c" />
              <XAxis dataKey="date" stroke="#78716c" tick={{ fontSize: 11 }} />
              <YAxis stroke="#78716c" tick={{ fontSize: 11 }} domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip 
                contentStyle={{ background: '#1c1917', border: '2px solid #f5f5f4', fontFamily: 'Space Mono, monospace' }}
              />
              <Line type="monotone" dataKey="weight" stroke="#a855f7" strokeWidth={3} dot={{ fill: '#a855f7', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Next Appointment & Active Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold uppercase font-mono">
              Next Appointment
            </h3>
            <Calendar className="text-red-600" size={20} />
          </div>
          {upcomingAppointment ? (
            <div>
              <div className="text-2xl font-bold mb-2">{upcomingAppointment.title}</div>
              <div className="text-stone-400 mb-1">{upcomingAppointment.doctor}</div>
              <div className="flex items-center gap-4 mt-4">
                <div className="status-badge border-red-600 text-red-600">
                  {upcomingAppointment.date}
                </div>
                <div className="text-sm text-stone-400">{upcomingAppointment.time}</div>
              </div>
            </div>
          ) : (
            <div className="text-stone-500 text-center py-8">No upcoming appointments</div>
          )}
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold uppercase font-mono">
              Active Goals
            </h3>
            <Target className="text-red-600" size={20} />
          </div>
          <div className="space-y-4">
            {activeGoals.map(goal => (
              <ProgressBar 
                key={goal.id}
                title={goal.title}
                current={goal.current}
                target={goal.target}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="metric-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold uppercase font-mono">
            Recent Activities
          </h3>
          <button 
            className="brutal-button text-sm py-2 px-4"
            onClick={() => openAddModal('activities')}
          >
            <Plus size={16} className="inline mr-2" />
            Add
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {healthData.activities.slice(0, 3).map(activity => (
            <div key={activity.id} className="border-2 border-stone-700 p-4 hover:border-red-600 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="status-badge border-red-600 text-red-600">{activity.type}</span>
                <span className="text-xs text-stone-500">{activity.date}</span>
              </div>
              <div className="text-2xl font-bold mb-1 font-mono">
                {activity.duration} min
              </div>
              <div className="text-sm text-stone-400">{activity.calories} calories burned</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
