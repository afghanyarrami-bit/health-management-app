// ============================================================
//  Data.js  –  Single source of truth for all static data
//  Used by: AddDataModal, Header, MetricCard, Notifications,
//           Profile, ProgressBar, Settings
// ============================================================

// ─────────────────────────────────────────────
//  AddDataModal – form field definitions
// ─────────────────────────────────────────────

export const VITALS_FIELDS = [
  { label: 'Date',              name: 'date',          type: 'date'   },
  { label: 'Heart Rate (BPM)', name: 'heartRate',     type: 'number' },
  { label: 'Blood Pressure',   name: 'bloodPressure', type: 'text',   placeholder: '120/80' },
  { label: 'Weight (kg)',      name: 'weight',        type: 'number', step: '0.1' },
  { label: 'Sleep (hours)',    name: 'sleep',         type: 'number', step: '0.5' },
];

export const MEDICATIONS_FIELDS = [
  { label: 'Medication Name', name: 'name',     type: 'text' },
  { label: 'Dosage',          name: 'dosage',   type: 'text', placeholder: 'e.g., 500mg' },
  { label: 'Time',            name: 'time',     type: 'time' },
];

export const MEDICATIONS_FREQUENCY_OPTIONS = ['', 'Daily', 'Twice Daily', 'Weekly', 'As Needed'];

export const APPOINTMENTS_FIELDS = [
  { label: 'Title',  name: 'title',  type: 'text' },
  { label: 'Doctor', name: 'doctor', type: 'text' },
  { label: 'Date',   name: 'date',   type: 'date' },
  { label: 'Time',   name: 'time',   type: 'time' },
];

export const APPOINTMENTS_TYPE_OPTIONS = ['', 'General', 'Dental', 'Vision', 'Specialist', 'Follow-up'];

export const ACTIVITIES_FIELDS = [
  { label: 'Date',               name: 'date',     type: 'date'   },
  { label: 'Duration (minutes)', name: 'duration', type: 'number' },
  { label: 'Calories Burned',    name: 'calories', type: 'number' },
  { label: 'Notes (optional)',   name: 'notes',    type: 'textarea' },
];

export const ACTIVITIES_TYPE_OPTIONS = ['', 'Cardio', 'Strength', 'Yoga', 'Sports', 'Walking', 'Swimming', 'Cycling'];

export const GOALS_FIELDS = [
  { label: 'Goal Title',    name: 'title',    type: 'text'   },
  { label: 'Target Value',  name: 'target',   type: 'number', step: '0.1' },
  { label: 'Current Value', name: 'current',  type: 'number', step: '0.1' },
  { label: 'Unit',          name: 'unit',     type: 'text',   placeholder: 'e.g., kg, days, hours' },
  { label: 'Deadline',      name: 'deadline', type: 'date'   },
];

export const GOALS_CATEGORY_OPTIONS = ['', 'Weight', 'Fitness', 'Sleep', 'Nutrition', 'Mental Health'];

// ─────────────────────────────────────────────
//  Header – navigation tabs
// ─────────────────────────────────────────────

export const NAV_TABS = [
  { id: 'dashboard',    label: 'DASHBOARD'    },
  { id: 'vitals',       label: 'VITALS'       },
  { id: 'medications',  label: 'MEDICATIONS'  },
  { id: 'appointments', label: 'APPOINTMENTS' },
  { id: 'activities',   label: 'ACTIVITIES'   },
  { id: 'goals',        label: 'GOALS'        },
];

// Header – accent colour map
export const ACCENT_COLORS = {
  orange: '#f97316',
  blue:   '#3b82f6',
  green:  '#22c55e',
  purple: '#a855f7',
  red:    '#ef4444',
  pink:   '#ec4899',
  yellow: '#eab308',
  cyan:   '#06b6d4',
  indigo: '#6366f1',
  teal:   '#14b8a6',
};

// ─────────────────────────────────────────────
//  Notifications – filter list & static items
// ─────────────────────────────────────────────

export const NOTIFICATION_FILTERS = [
  { id: 'all',         label: 'All'          },
  { id: 'unread',      label: 'Unread'       },
  { id: 'medication',  label: 'Medications'  },
  { id: 'appointment', label: 'Appointments' },
  { id: 'activity',    label: 'Activities'   },
];

export const STATIC_NOTIFICATIONS = [
  {
    id:       'activity-1',
    type:     'activity',
    iconType: 'Activity',
    title:    'Daily Activity Goal',
    message:  "You're 2,000 steps away from your daily goal!",
    time:     '1 hour ago',
    priority: 'low',
    read:     false,
  },
  {
    id:       'info-1',
    type:     'info',
    iconType: 'Info',
    title:    'Health Tip',
    message:  'Remember to stay hydrated! Aim for 8 glasses of water today.',
    time:     '3 hours ago',
    priority: 'low',
    read:     true,
  },
  {
    id:       'success-1',
    type:     'success',
    iconType: 'CheckCircle2',
    title:    'Goal Achieved!',
    message:  'You completed your weekly exercise goal. Great job!',
    time:     '1 day ago',
    priority: 'medium',
    read:     true,
  },
];

// Notification colour helpers
export const NOTIFICATION_PRIORITY_BORDER = {
  high:    'border-red-500',
  medium:  'border-orange-500',
  low:     'border-blue-500',
  default: 'border-stone-700',
};

export const NOTIFICATION_TYPE_COLOR = {
  medication:  'text-red-500',
  appointment: 'text-blue-500',
  activity:    'text-green-500',
  success:     'text-green-500',
  info:        'text-blue-400',
  default:     'text-stone-400',
};

// ─────────────────────────────────────────────
//  Profile – blood types & default form shape
// ─────────────────────────────────────────────

export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const DEFAULT_PROFILE = {
  name:             '',
  email:            '',
  phone:            '',
  dateOfBirth:      '',
  bloodType:        '',
  address:          '',
  emergencyContact: '',
  emergencyPhone:   '',
  allergies:        '',
  conditions:       '',
  height:           '',
  weight:           '',
};

// ─────────────────────────────────────────────
//  Settings – sections & theme colours
// ─────────────────────────────────────────────

export const SETTINGS_SECTIONS = [
  { id: 'profile',       label: 'Profile',       iconName: 'User'    },
  { id: 'notifications', label: 'Notifications', iconName: 'Bell'    },
  { id: 'appearance',    label: 'Appearance',    iconName: 'Palette' },
  { id: 'privacy',       label: 'Privacy & Data',iconName: 'Shield'  },
];

export const THEME_COLORS = [
  { id: 'orange', color: 'bg-orange-500', name: 'Orange' },
  { id: 'blue',   color: 'bg-blue-500',   name: 'Blue'   },
  { id: 'green',  color: 'bg-green-500',  name: 'Green'  },
  { id: 'purple', color: 'bg-purple-500', name: 'Purple' },
  { id: 'red',    color: 'bg-red-500',    name: 'Red'    },
];

export const DEFAULT_NOTIFICATION_PREFS = {
  notificationsEnabled:  true,
  medicationReminders:   true,
  appointmentReminders:  true,
  activityReminders:     false,
};


