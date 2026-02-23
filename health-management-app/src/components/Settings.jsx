import React, { useState } from 'react';
import { X, User, Bell, Shield, Palette, Download, Trash2, Moon, Sun } from 'lucide-react';
import {
  SETTINGS_SECTIONS,
  THEME_COLORS,
  BLOOD_TYPES,
  DEFAULT_NOTIFICATION_PREFS,
} from '../data/HeaderData';


// Map icon name strings from Data.js to actual Lucide components
const ICON_MAP = { User, Bell, Shield, Palette };

const Settings = ({
  onClose,
  healthData,
  onClearData,
  onExportData,
  profileData,
  onSaveProfile,
  currentTheme,
  onThemeChange,
}) => {
  const [activeSection,        setActiveSection]        = useState('profile');
  const [darkMode,             setDarkMode]             = useState(currentTheme?.mode === 'dark');
  const [selectedColor,        setSelectedColor]        = useState(currentTheme?.color || 'orange');
  const [notifPrefs,           setNotifPrefs]           = useState(DEFAULT_NOTIFICATION_PREFS);

  // ── theme helpers ──────────────────────────────────────────
  const handleDarkModeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    onThemeChange({ mode: newMode ? 'dark' : 'light', color: selectedColor });
  };

  const handleColorChange = (colorId) => {
    setSelectedColor(colorId);
    onThemeChange({ mode: darkMode ? 'dark' : 'light', color: colorId });
  };

  // ── toggle helper for notification prefs ──────────────────
  const togglePref = (key) =>
    setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  // ── export / clear ─────────────────────────────────────────
  const handleExport = () => {
    const dataStr  = JSON.stringify(healthData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url      = URL.createObjectURL(dataBlob);
    const link     = document.createElement('a');
    link.href      = url;
    link.download  = `healthtrack-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      onClearData();
      alert('All data has been cleared.');
    }
  };

  // ── Toggle switch UI ───────────────────────────────────────
  const Toggle = ({ value, onToggle }) => (
    <button
      onClick={onToggle}
      className={`w-14 h-8 rounded-full transition-colors relative ${value ? 'bg-orange-500' : 'bg-stone-700'}`}
    >
      <div className={`w-6 h-6 bg-white rounded-full transition-transform absolute top-1 ${value ? 'translate-x-7' : 'translate-x-1'}`} />
    </button>
  );

  // ── Section renderers ──────────────────────────────────────
  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
      <div className="space-y-4">
        {/* Basic text fields */}
        {[
          { label: 'Full Name',     key: 'name',        type: 'text',  placeholder: 'Enter your name' },
          { label: 'Email',         key: 'email',       type: 'email', placeholder: 'your.email@example.com' },
          { label: 'Date of Birth', key: 'dateOfBirth', type: 'date'  },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-stone-300 mb-2">{label}</label>
            <input
              type={type}
              value={profileData?.[key] || ''}
              onChange={(e) => onSaveProfile({ ...profileData, [key]: e.target.value })}
              className="w-full bg-stone-900 border-2 border-stone-700 text-white px-4 py-3 focus:outline-none focus:border-orange-500"
              placeholder={placeholder}
            />
          </div>
        ))}

        {/* Blood type – options from Data.js */}
        <div>
          <label className="block text-sm font-medium text-stone-300 mb-2">Blood Type</label>
          <select
            value={profileData?.bloodType || ''}
            onChange={(e) => onSaveProfile({ ...profileData, bloodType: e.target.value })}
            className="w-full bg-stone-900 border-2 border-stone-700 text-white px-4 py-3 focus:outline-none focus:border-orange-500"
          >
            <option value="">Select blood type</option>
            {BLOOD_TYPES.map((bt) => (
              <option key={bt} value={bt}>{bt}</option>
            ))}
          </select>
        </div>

        <div className="bg-stone-900 border-2 border-stone-700 p-4">
          <p className="text-stone-400 text-sm">
            💡 Changes are automatically saved. Click the user icon in the header to edit full profile.
          </p>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Notification Settings</h2>
      <div className="space-y-4">
        {[
          { key: 'notificationsEnabled',  title: 'Enable Notifications',   desc: 'Receive all app notifications'            },
          { key: 'medicationReminders',   title: 'Medication Reminders',   desc: 'Get reminded to take your medications'    },
          { key: 'appointmentReminders',  title: 'Appointment Reminders',  desc: 'Notifications for upcoming appointments'  },
          { key: 'activityReminders',     title: 'Activity Reminders',     desc: 'Daily activity and exercise reminders'    },
        ].map(({ key, title, desc }) => (
          <div key={key} className="flex items-center justify-between p-4 bg-stone-900 border-2 border-stone-700">
            <div>
              <h3 className="font-bold text-white">{title}</h3>
              <p className="text-sm text-stone-400">{desc}</p>
            </div>
            <Toggle value={notifPrefs[key]} onToggle={() => togglePref(key)} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Appearance</h2>
      <div className="space-y-4">
        {/* Dark mode toggle */}
        <div className="flex items-center justify-between p-4 bg-stone-900 border-2 border-stone-700">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon size={24} className="text-white" /> : <Sun size={24} className="text-yellow-500" />}
            <div>
              <h3 className="font-bold text-white">Dark Mode</h3>
              <p className="text-sm text-stone-400">{darkMode ? 'Currently enabled' : 'Currently disabled'}</p>
            </div>
          </div>
          <Toggle value={darkMode} onToggle={handleDarkModeToggle} />
        </div>

        {/* Color picker – options from THEME_COLORS in Data.js */}
        <div className="p-4 bg-stone-900 border-2 border-stone-700">
          <h3 className="font-bold text-white mb-2">Theme Color</h3>
          <p className="text-sm text-stone-400 mb-4">Choose your accent color</p>
          <div className="grid grid-cols-5 gap-3">
            {THEME_COLORS.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleColorChange(theme.id)}
                title={theme.name}
                className={`w-full aspect-square ${theme.color} transition-all ${
                  selectedColor === theme.id
                    ? 'border-4 border-white scale-110 shadow-lg'
                    : 'border-2 border-stone-700 hover:border-white hover:scale-105'
                }`}
              >
                {selectedColor === theme.id && (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-white text-2xl font-bold">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="mt-3 text-center">
            <p className="text-sm text-stone-400">
              Selected:{' '}
              <span className="text-white font-bold">
                {THEME_COLORS.find((c) => c.id === selectedColor)?.name}
              </span>
            </p>
          </div>
        </div>

        <div className="p-4 bg-blue-900 border-2 border-blue-700">
          <p className="text-blue-300 text-sm">ℹ️ Theme changes are saved automatically</p>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Privacy & Data</h2>
      <div className="space-y-4">
        <div className="p-4 bg-stone-900 border-2 border-stone-700">
          <h3 className="font-bold text-white mb-2">Data Storage</h3>
          <p className="text-sm text-stone-400 mb-4">
            All your health data is stored locally in your browser. No data is sent to external servers.
          </p>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 font-bold hover:bg-blue-600 transition-colors"
          >
            <Download size={20} /> EXPORT DATA
          </button>
        </div>

        <div className="p-4 bg-stone-900 border-2 border-red-900">
          <h3 className="font-bold text-red-500 mb-2">Danger Zone</h3>
          <p className="text-sm text-stone-400 mb-4">
            Permanently delete all your health data. This action cannot be undone.
          </p>
          <button
            onClick={handleClearData}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 font-bold hover:bg-red-700 transition-colors"
          >
            <Trash2 size={20} /> CLEAR ALL DATA
          </button>
        </div>

        <div className="p-4 bg-stone-900 border-2 border-stone-700">
          <h3 className="font-bold text-white mb-2">About HealthTrack</h3>
          <p className="text-sm text-stone-400">Version 1.0.0</p>
          <p className="text-sm text-stone-400">Medical Dashboard for Personal Health Management</p>
        </div>
      </div>
    </div>
  );

  const SECTION_RENDERERS = {
    profile:       renderProfile,
    notifications: renderNotifications,
    appearance:    renderAppearance,
    privacy:       renderPrivacy,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-stone-800 border-4 border-stone-700 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-stone-700">
          <h1 className="text-2xl font-bold text-white">SETTINGS</h1>
          <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors">
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar – sections from SETTINGS_SECTIONS in Data.js */}
          <div className="w-64 bg-stone-900 border-r-4 border-stone-700 p-4">
            <nav className="space-y-2">
              {SETTINGS_SECTIONS.map((section) => {
                const Icon = ICON_MAP[section.iconName];
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 font-bold transition-colors ${
                      activeSection === section.id
                        ? 'bg-orange-500 text-white'
                        : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                    }`}
                  >
                    {Icon && <Icon size={20} />}
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {(SECTION_RENDERERS[activeSection] || renderProfile)()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
