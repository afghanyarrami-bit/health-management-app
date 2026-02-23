import React, { useState } from 'react';
import { X, User, Mail, Calendar, Droplet, Phone, MapPin, Save, Edit2 } from 'lucide-react';
import { BLOOD_TYPES, DEFAULT_PROFILE } from '../data/HeaderData';



const Profile = ({ onClose, profileData, onSaveProfile }) => {
  const [isEditing, setIsEditing] = useState(!profileData.name);
  const [formData, setFormData]   = useState({ ...DEFAULT_PROFILE, ...profileData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSaveProfile(formData);
    setIsEditing(false);
  };

  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today     = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  // Field rendering helpers
  const ViewField = ({ value, fallback = 'Not set' }) => (
    <div className="bg-stone-900 border-2 border-stone-700 px-4 py-3 text-white min-h-[48px]">
      {value || fallback}
    </div>
  );

  const EditInput = ({ name, type = 'text', placeholder, rows }) => {
    const base = "w-full bg-stone-900 border-2 border-stone-700 text-white px-4 py-3 focus:outline-none focus:border-orange-500";
    if (rows) {
      return <textarea name={name} value={formData[name]} onChange={handleChange} rows={rows} className={base} placeholder={placeholder} />;
    }
    return <input type={type} name={name} value={formData[name]} onChange={handleChange} className={base} placeholder={placeholder} />;
  };

  // Personal info fields driven by data config
  const personalFields = [
    { label: 'Full Name',     name: 'name',        icon: User,     type: 'text',  placeholder: 'Enter your full name' },
    { label: 'Email',         name: 'email',       icon: Mail,     type: 'email', placeholder: 'your.email@example.com' },
    { label: 'Phone',         name: 'phone',       icon: Phone,    type: 'tel',   placeholder: '+1 (555) 123-4567' },
    { label: 'Date of Birth', name: 'dateOfBirth', icon: Calendar, type: 'date' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-stone-800 border-4 border-stone-700 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-stone-700">
          <div className="flex items-center gap-3">
            <User size={28} className="text-orange-500" />
            <h1 className="text-2xl font-bold text-white">MY PROFILE</h1>
          </div>
          <div className="flex items-center gap-3">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 font-bold hover:bg-orange-600 transition-colors"
              >
                <Edit2 size={20} /> EDIT
              </button>
            )}
            <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors">
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b-2 border-orange-500 pb-2">
                PERSONAL INFORMATION
              </h2>

              {/* Dynamic personal fields via map() */}
              {personalFields.map(({ label, name, icon: Icon, type, placeholder }) => (
                <div key={name}>
                  <label className="flex items-center gap-2 text-sm font-medium text-stone-300 mb-2">
                    <Icon size={16} />
                    {label}
                    {name === 'dateOfBirth' && formData.dateOfBirth && (
                      <span className="text-orange-500 ml-2">(Age: {calculateAge(formData.dateOfBirth)})</span>
                    )}
                  </label>
                  {isEditing
                    ? <EditInput name={name} type={type} placeholder={placeholder} />
                    : <ViewField value={name === 'dateOfBirth' && formData[name]
                        ? new Date(formData[name]).toLocaleDateString()
                        : formData[name]} />
                  }
                </div>
              ))}

              {/* Address */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-stone-300 mb-2">
                  <MapPin size={16} /> Address
                </label>
                {isEditing
                  ? <EditInput name="address" rows={3} placeholder="Street, City, State, ZIP" />
                  : <div className="bg-stone-900 border-2 border-stone-700 px-4 py-3 text-white min-h-[80px]">{formData.address || 'Not set'}</div>
                }
              </div>
            </div>

            {/* Medical Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b-2 border-orange-500 pb-2">
                MEDICAL INFORMATION
              </h2>

              {/* Blood type */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-stone-300 mb-2">
                  <Droplet size={16} /> Blood Type
                </label>
                {isEditing ? (
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    className="w-full bg-stone-900 border-2 border-stone-700 text-white px-4 py-3 focus:outline-none focus:border-orange-500"
                  >
                    <option value="">Select blood type</option>
                    {BLOOD_TYPES.map((bt) => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </select>
                ) : (
                  <ViewField value={formData.bloodType} />
                )}
              </div>

              {/* Height / Weight */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Height (cm)', name: 'height', unit: 'cm' },
                  { label: 'Weight (kg)', name: 'weight', unit: 'kg' },
                ].map(({ label, name, unit }) => (
                  <div key={name}>
                    <label className="text-sm font-medium text-stone-300 mb-2 block">{label}</label>
                    {isEditing
                      ? <EditInput name={name} type="number" placeholder={name === 'height' ? '170' : '70'} />
                      : <ViewField value={formData[name] ? `${formData[name]} ${unit}` : ''} />
                    }
                  </div>
                ))}
              </div>

              {/* Allergies & Conditions */}
              {[
                { label: 'Allergies',         name: 'allergies',  fallback: 'None reported', placeholder: 'List any allergies (e.g., Penicillin, Peanuts)' },
                { label: 'Medical Conditions', name: 'conditions', fallback: 'None reported', placeholder: 'List any chronic conditions or diagnoses' },
              ].map(({ label, name, fallback, placeholder }) => (
                <div key={name}>
                  <label className="text-sm font-medium text-stone-300 mb-2 block">{label}</label>
                  {isEditing
                    ? <EditInput name={name} rows={3} placeholder={placeholder} />
                    : <div className="bg-stone-900 border-2 border-stone-700 px-4 py-3 text-white min-h-[80px]">{formData[name] || fallback}</div>
                  }
                </div>
              ))}

              {/* Emergency Contact */}
              <h3 className="text-lg font-bold text-white border-b-2 border-orange-500 pb-2 mt-6">
                EMERGENCY CONTACT
              </h3>
              {[
                { label: 'Contact Name',  name: 'emergencyContact', type: 'text', placeholder: 'Emergency contact name' },
                { label: 'Contact Phone', name: 'emergencyPhone',   type: 'tel',  placeholder: '+1 (555) 987-6543' },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label className="text-sm font-medium text-stone-300 mb-2 block">{label}</label>
                  {isEditing
                    ? <EditInput name={name} type={type} placeholder={placeholder} />
                    : <ViewField value={formData[name]} />
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        {isEditing && (
          <div className="p-6 border-t-4 border-stone-700 bg-stone-900">
            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setFormData({ ...DEFAULT_PROFILE, ...profileData }); setIsEditing(false); }}
                className="px-6 py-3 bg-stone-700 text-white font-bold hover:bg-stone-600 transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors"
              >
                <Save size={20} /> SAVE PROFILE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
