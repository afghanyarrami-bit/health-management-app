# 🏥 HealthTrack — Medical Dashboard

> A personal health management dashboard built with React. Track your vitals, medications, appointments, activities, and goals — all stored locally in your browser.

![Version](https://img.shields.io/badge/version-1.0.0-orange)
![React](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📸 Overview

HealthTrack is a brutalist-styled medical dashboard that gives users a complete view of their health data. It features role-based authentication, real-time charts, smart notifications, and full theme customization — with zero backend required.

---

## ✨ Features

- 🔐 **Role-Based Authentication** — Three access levels: Super Admin, Doctor, and Nurse
- 📊 **Interactive Dashboard** — Live charts for heart rate trends and weight progress
- 💊 **Medications Tracker** — Log medications with dosage, frequency, and scheduling
- 🩺 **Vitals Monitoring** — Record heart rate, blood pressure, weight, and sleep hours
- 📅 **Appointments Manager** — Schedule and manage upcoming medical appointments
- 🏃 **Activity Log** — Track workouts with duration and calories burned
- 🎯 **Health Goals** — Set targets and visualize progress with progress bars
- 🔔 **Smart Notifications** — Auto-generated reminders from your health data
- 🎨 **Theme Customization** — Dark/light mode + 10 accent color options
- 👤 **User Profile** — Store personal and medical information including emergency contacts
- 💾 **Local Storage** — All data persists in the browser, no server needed
- 📤 **Data Export** — Download your health data as a JSON file

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation bar with tabs and action buttons
│   ├── AddDataModal.jsx    # Universal modal for adding health entries
│   ├── Settings.jsx        # App settings (profile, theme, notifications, privacy)
│   ├── Notifications.jsx   # Notification center with filters
│   ├── Profile.jsx         # User profile viewer and editor
│   ├── MetricCard.jsx      # Reusable stat card component
│   └── ProgressBar.jsx     # Goal progress bar component
├── pages/
│   ├── Dashboard.jsx       # Main overview with charts and summaries
│   ├── Vitals.jsx          # Vitals history with bar charts and table
│   ├── Medications.jsx     # Medication cards grid
│   ├── Appointments.jsx    # Appointment list
│   ├── Activities.jsx      # Activity log with totals
│   ├── Goals.jsx           # Goals grid with progress tracking
│   └── Login.jsx           # Authentication page
├── data/
│   ├── admindata.js        # Auth logic, credentials, permissions
│   └── HeaderData.js       # All static data (form fields, nav tabs, colors, etc.)
├── hooks/
│   └── useLocalStorage.js  # Custom hook for persistent local state
├── utils/
│   └── initialData.js      # Seed data for first-time load
├── App.jsx                 # Root component, routing, global state
├── main.jsx                # React DOM entry point
└── index.css               # Global styles and utility classes
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/healthtrack.git
cd healthtrack

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🔑 Demo Credentials

The app ships with three pre-configured accounts. Click any role on the login page to auto-fill credentials.

| Role        | Username  | Password    |
|-------------|-----------|-------------|
| Super Admin | `admin`   | `admin123`  |
| Doctor      | `doctor`  | `doctor123` |
| Nurse       | `nurse`   | `nurse123`  |

> ⚠️ **Note:** These are demo credentials for local use. Do not deploy this app with these defaults in a production environment.

---

## 🔒 Role Permissions

| Permission        | Super Admin | Doctor | Nurse |
|-------------------|:-----------:|:------:|:-----:|
| View All Data     | ✅          | ✅     | ✅    |
| Edit Settings     | ✅          | ✅     | ❌    |
| Delete Data       | ✅          | ❌     | ❌    |
| Export Data       | ✅          | ✅     | ❌    |
| Manage Users      | ✅          | ❌     | ❌    |

---

## 🧭 Pages & Navigation

| Tab          | Description                                              |
|--------------|----------------------------------------------------------|
| Dashboard    | Overview of latest vitals, charts, appointments, goals   |
| Vitals       | Full history table + heart rate and sleep bar charts     |
| Medications  | Card grid of all medications with status badges          |
| Appointments | List of scheduled appointments with type and doctor info |
| Activities   | Logged workouts with duration and calorie totals         |
| Goals        | Progress cards for each health goal with deadlines       |

---

## 🎨 Theming

Switch between **dark and light mode**, and choose from **10 accent colors**:

`Orange` · `Blue` · `Green` · `Purple` · `Red` · `Pink` · `Yellow` · `Cyan` · `Indigo` · `Teal`

Theme preferences are saved automatically via `localStorage`.

---

## 💾 Data Storage

All health data is stored **entirely in the browser** using `localStorage`. No data is sent to any server.

- Health data key: `healthManagementData`
- Auth session key: `healthtrack-auth`
- Notifications key: `healthtrack-notifications`
- Theme key: `appTheme`
- Profile key: `userProfile`

Sessions expire automatically after **24 hours**.

You can export all your data as a `.json` file from **Settings → Privacy & Data**.

---

## 🧰 Tech Stack

| Technology     | Purpose                        |
|----------------|--------------------------------|
| React 18       | UI framework                   |
| Recharts       | Line and bar charts            |
| Lucide React   | Icon library                   |
| Tailwind CSS   | Utility-first styling          |
| Vite           | Build tool and dev server      |
| localStorage   | Client-side data persistence   |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
  <strong>HEALTH<span style="color:#f97316">TRACK</span></strong> · Medical Dashboard v1.0.0 · © 2026
</div>
