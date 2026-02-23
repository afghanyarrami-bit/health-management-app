# Health Management App

A comprehensive health tracking application built with React and Tailwind CSS featuring a distinctive brutalist-medical aesthetic design.

## Features

### Dashboard
- Real-time health metrics (heart rate, blood pressure, weight, sleep)
- Interactive charts showing 7-day trends
- Next appointment preview
- Active goals with progress tracking
- Recent activities summary

### Vitals Tracking
- Heart rate monitoring
- Blood pressure readings
- Weight tracking
- Sleep duration
- Visual charts and complete data table

### Medications Management
- Track all medications with dosage and frequency
- Set reminder times
- Active/inactive status

### Appointments
- Schedule and view upcoming appointments
- Doctor information and appointment types
- Date and time management

### Activities Log
- Track different exercise types (cardio, strength, yoga, etc.)
- Duration and calorie tracking
- Activity notes

### Goals System
- Set health goals with targets
- Track progress with visual indicators
- Categories: Weight, Fitness, Sleep, Nutrition, Mental Health

## Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Recharts** - Data Visualization
- **Lucide React** - Icons
- **LocalStorage** - Data Persistence

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Project Structure

```
health-management-app/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx
│   │   ├── MetricCard.jsx
│   │   ├── ProgressBar.jsx
│   │   └── AddDataModal.jsx
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Vitals.jsx
│   │   ├── Medications.jsx
│   │   ├── Appointments.jsx
│   │   ├── Activities.jsx
│   │   └── Goals.jsx
│   ├── hooks/              # Custom React hooks
│   │   └── useLocalStorage.js
│   ├── utils/              # Utility functions
│   │   └── initialData.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Features in Detail

### Data Persistence
All data is automatically saved to browser's localStorage, ensuring your health records persist between sessions.

### Responsive Design
Fully responsive design that works seamlessly on desktop, tablet, and mobile devices.

### Brutalist Aesthetic
- Bold borders and shadows
- Monospace fonts (Space Mono)
- Dark medical theme with red accents
- High contrast for accessibility
- Distinctive visual identity

### Interactive Charts
Real-time data visualization using Recharts library for tracking health metrics over time.

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License
