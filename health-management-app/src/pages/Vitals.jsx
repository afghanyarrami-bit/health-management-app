import React from 'react';
import { Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Vitals = ({ vitals, openAddModal }) => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black uppercase font-mono">
          Health Vitals
        </h2>
        <button 
          className="brutal-button"
          onClick={() => openAddModal('vitals')}
        >
          <Plus size={20} className="inline mr-2" />
          Add Reading
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="metric-card">
          <h3 className="text-lg font-bold uppercase mb-6 pb-3 border-b-2 border-stone-800 font-mono">
            Heart Rate (7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vitals}>
              <CartesianGrid strokeDasharray="3 3" stroke="#44403c" />
              <XAxis dataKey="date" stroke="#78716c" tick={{ fontSize: 11 }} />
              <YAxis stroke="#78716c" tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ background: '#1c1917', border: '2px solid #f5f5f4', fontFamily: 'Space Mono, monospace' }}
              />
              <Bar dataKey="heartRate" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="metric-card">
          <h3 className="text-lg font-bold uppercase mb-6 pb-3 border-b-2 border-stone-800 font-mono">
            Sleep Duration (7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vitals}>
              <CartesianGrid strokeDasharray="3 3" stroke="#44403c" />
              <XAxis dataKey="date" stroke="#78716c" tick={{ fontSize: 11 }} />
              <YAxis stroke="#78716c" tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ background: '#1c1917', border: '2px solid #f5f5f4', fontFamily: 'Space Mono, monospace' }}
              />
              <Bar dataKey="sleep" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="metric-card">
        <h3 className="text-lg font-bold uppercase mb-6 pb-3 border-b-2 border-stone-800 font-mono">
          All Readings
        </h3>
        <div className="overflow-x-auto scrollbar-custom">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-stone-800">
                <th className="text-left py-4 px-4 uppercase text-xs tracking-wider font-mono">Date</th>
                <th className="text-left py-4 px-4 uppercase text-xs tracking-wider font-mono">Heart Rate</th>
                <th className="text-left py-4 px-4 uppercase text-xs tracking-wider font-mono">Blood Pressure</th>
                <th className="text-left py-4 px-4 uppercase text-xs tracking-wider font-mono">Weight</th>
                <th className="text-left py-4 px-4 uppercase text-xs tracking-wider font-mono">Sleep</th>
              </tr>
            </thead>
            <tbody>
              {vitals.map((vital, index) => (
                <tr key={index} className="border-b border-stone-800 hover:bg-stone-900">
                  <td className="py-4 px-4">{vital.date}</td>
                  <td className="py-4 px-4 font-bold">{vital.heartRate} BPM</td>
                  <td className="py-4 px-4 font-bold">{vital.bloodPressure}</td>
                  <td className="py-4 px-4 font-bold">{vital.weight} kg</td>
                  <td className="py-4 px-4 font-bold">{vital.sleep} hrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vitals;
