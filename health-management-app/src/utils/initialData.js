export const initialHealthData = {
  vitals: [
    { date: '2026-02-04', heartRate: 72, bloodPressure: '120/80', weight: 70, sleep: 7.5 },
    { date: '2026-02-05', heartRate: 75, bloodPressure: '118/78', weight: 69.8, sleep: 8 },
    { date: '2026-02-06', heartRate: 70, bloodPressure: '122/82', weight: 69.5, sleep: 6.5 },
    { date: '2026-02-07', heartRate: 73, bloodPressure: '119/79', weight: 69.7, sleep: 7 },
    { date: '2026-02-08', heartRate: 71, bloodPressure: '121/80', weight: 69.4, sleep: 8.5 },
    { date: '2026-02-09', heartRate: 74, bloodPressure: '117/77', weight: 69.2, sleep: 7.5 },
    { date: '2026-02-10', heartRate: 72, bloodPressure: '120/79', weight: 69, sleep: 8 }
  ],
  medications: [
    { id: 1, name: 'Vitamin D3', dosage: '1000 IU', frequency: 'Daily', time: '08:00', active: true },
    { id: 2, name: 'Omega-3', dosage: '500mg', frequency: 'Daily', time: '20:00', active: true },
    { id: 3, name: 'Multivitamin', dosage: '1 tablet', frequency: 'Daily', time: '08:00', active: true }
  ],
  appointments: [
    { id: 1, title: 'Annual Checkup', doctor: 'Dr. Sarah Johnson', date: '2026-02-15', time: '10:00 AM', type: 'General' },
    { id: 2, title: 'Dental Cleaning', doctor: 'Dr. Mike Chen', date: '2026-02-20', time: '02:30 PM', type: 'Dental' },
    { id: 3, title: 'Eye Exam', doctor: 'Dr. Emily White', date: '2026-03-01', time: '09:00 AM', type: 'Vision' }
  ],
  goals: [
    { id: 1, title: 'Lose 5kg', target: 5, current: 1, unit: 'kg', category: 'Weight', deadline: '2026-06-01' },
    { id: 2, title: 'Exercise 5x/week', target: 5, current: 3, unit: 'days', category: 'Fitness', deadline: '2026-03-31' },
    { id: 3, title: 'Sleep 8hrs/night', target: 8, current: 7.5, unit: 'hours', category: 'Sleep', deadline: '2026-12-31' }
  ],
  activities: [
    { id: 1, date: '2026-02-10', type: 'Cardio', duration: 45, calories: 380, notes: 'Morning run - felt great!' },
    { id: 2, date: '2026-02-09', type: 'Strength', duration: 60, calories: 250, notes: 'Upper body workout' },
    { id: 3, date: '2026-02-08', type: 'Yoga', duration: 30, calories: 120, notes: 'Evening relaxation' }
  ]
};
