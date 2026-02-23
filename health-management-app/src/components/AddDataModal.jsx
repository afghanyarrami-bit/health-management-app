import React, { useState } from 'react';
import { X } from 'lucide-react';
import {
  VITALS_FIELDS,
  MEDICATIONS_FIELDS,
  MEDICATIONS_FREQUENCY_OPTIONS,
  APPOINTMENTS_FIELDS,
  APPOINTMENTS_TYPE_OPTIONS,
  ACTIVITIES_FIELDS,
  ACTIVITIES_TYPE_OPTIONS,
  GOALS_FIELDS,
  GOALS_CATEGORY_OPTIONS,
} from '../data/HeaderData';

const AddDataModal = ({ type, onClose, onAdd }) => {

  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(type, formData);
  };

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value,
    }));
  };

  const renderForm = () => {
    switch (type) {
      case 'vitals':
        return VITALS_FIELDS.map((f) => (
          <FormField key={f.name} {...f} onChange={handleChange} required={!f.optional} />
        ));

      case 'medications':
        return (
          <>
            {MEDICATIONS_FIELDS.map((f) => (
              <FormField key={f.name} {...f} onChange={handleChange} required />
            ))}
            <FormSelect
              label="Frequency"
              name="frequency"
              onChange={handleChange}
              options={MEDICATIONS_FREQUENCY_OPTIONS}
              required
            />
            <div className="mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="active"
                  onChange={handleChange}
                  className="w-4 h-4"
                  defaultChecked
                />
                <span className="text-sm font-bold uppercase tracking-wider">Active</span>
              </label>
            </div>
          </>
        );

      case 'appointments':
        return (
          <>
            {APPOINTMENTS_FIELDS.map((f) => (
              <FormField key={f.name} {...f} onChange={handleChange} required />
            ))}
            <FormSelect
              label="Type"
              name="type"
              onChange={handleChange}
              options={APPOINTMENTS_TYPE_OPTIONS}
              required
            />
          </>
        );

      case 'activities':
        return (
          <>
            {ACTIVITIES_FIELDS.map((f) => (
              <FormField key={f.name} {...f} onChange={handleChange} required={f.type !== 'textarea'} />
            ))}
            <FormSelect
              label="Activity Type"
              name="type"
              onChange={handleChange}
              options={ACTIVITIES_TYPE_OPTIONS}
              required
            />
          </>
        );

      case 'goals':
        return (
          <>
            {GOALS_FIELDS.map((f) => (
              <FormField key={f.name} {...f} onChange={handleChange} required />
            ))}
            <FormSelect
              label="Category"
              name="category"
              onChange={handleChange}
              options={GOALS_CATEGORY_OPTIONS}
              required
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b-2 border-stone-800 flex items-center justify-between">
          <h2 className="text-2xl font-black uppercase font-mono">Add {type}</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-900 rounded">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          {renderForm()}
          <div className="flex gap-4 mt-6">
            <button type="submit" className="brutal-button flex-1">Save</button>
            <button type="button" onClick={onClose} className="brutal-button flex-1 bg-stone-800">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FormField = ({ label, name, type, placeholder, onChange, required, step }) => {
  if (type === 'textarea') {
    return (
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 uppercase tracking-wider">{label}</label>
        <textarea
          name={name}
          className="form-input"
          rows="3"
          onChange={onChange}
          required={required}
        />
      </div>
    );
  }
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        name={name}
        className="form-input"
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        step={step}
      />
    </div>
  );
};

const FormSelect = ({ label, name, options, onChange, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-bold mb-2 uppercase tracking-wider">{label}</label>
    <select name={name} className="form-input" onChange={onChange} required={required}>
      {options.map((option, index) => (
        <option key={index} value={option}>{option || 'Select...'}</option>
      ))}
    </select>
  </div>
);
  

export default AddDataModal;
