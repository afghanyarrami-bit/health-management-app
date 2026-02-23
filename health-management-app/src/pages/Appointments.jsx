import React from 'react';
import { Plus, X, Calendar } from 'lucide-react';

const Appointments = ({ appointments, onDelete, openAddModal }) => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black uppercase font-mono">
          Appointments
        </h2>
        <button 
          className="brutal-button"
          onClick={() => openAddModal('appointments')}
        >
          <Plus size={20} className="inline mr-2" />
          Schedule
        </button>
      </div>

      <div className="space-y-4">
        {appointments.map(apt => (
          <div key={apt.id} className="metric-card flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="status-badge border-blue-600 text-blue-600">
                  {apt.type}
                </div>
                <h3 className="text-xl font-bold">{apt.title}</h3>
              </div>
              <div className="text-stone-400 mb-2">{apt.doctor}</div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-red-600" />
                  <span>{apt.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{apt.time}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => onDelete('appointments', apt.id)}
              className="p-2 hover:bg-red-600 transition-colors border-2 border-stone-700"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {appointments.length === 0 && (
        <div className="metric-card text-center py-12">
          <p className="text-stone-500 mb-4">No appointments scheduled</p>
          <button 
            className="brutal-button"
            onClick={() => openAddModal('appointments')}
          >
            <Plus size={20} className="inline mr-2" />
            Schedule Your First Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default Appointments;
