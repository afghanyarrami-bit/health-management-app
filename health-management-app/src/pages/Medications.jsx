import React from 'react';
import { Plus, X, Droplet } from 'lucide-react';

const Medications = ({ medications, onDelete, openAddModal }) => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black uppercase font-mono">
          Medications
        </h2>
        <button 
          className="brutal-button"
          onClick={() => openAddModal('medications')}
        >
          <Plus size={20} className="inline mr-2" />
          Add Medication
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medications.map(med => (
          <div key={med.id} className="metric-card relative">
            <button 
              onClick={() => onDelete('medications', med.id)}
              className="absolute top-4 right-4 p-2 hover:bg-red-600 transition-colors border-2 border-stone-700"
            >
              <X size={16} />
            </button>
            <div className="mb-4">
              <div className={`status-badge mb-3 ${med.active ? 'border-green-600 text-green-600' : 'border-stone-600 text-stone-600'}`}>
                {med.active ? 'Active' : 'Inactive'}
              </div>
              <h3 className="text-xl font-bold mb-2">{med.name}</h3>
              <div className="text-stone-400 mb-1">Dosage: {med.dosage}</div>
              <div className="text-stone-400 mb-1">Frequency: {med.frequency}</div>
              <div className="text-sm text-stone-500 mt-3 flex items-center gap-2">
                <Droplet size={14} />
                Take at: {med.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {medications.length === 0 && (
        <div className="metric-card text-center py-12">
          <p className="text-stone-500 mb-4">No medications added yet</p>
          <button 
            className="brutal-button"
            onClick={() => openAddModal('medications')}
          >
            <Plus size={20} className="inline mr-2" />
            Add Your First Medication
          </button>
        </div>
      )}
    </div>
  );
};

export default Medications;
