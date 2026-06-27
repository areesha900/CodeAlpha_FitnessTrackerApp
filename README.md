# 🏋️ Fitness Tracker App — CodeAlpha Internship Task 3

A React-based fitness tracking web app built as part of the **CodeAlpha App Development Internship**.

## Features

- **📊 Dashboard** — Today's summary (calories, duration, steps, weekly workouts), an animated 7-day calorie bar chart, a daily calorie goal ring, and recent workout list.
- **➕ Log Workout** — Form to log exercise name, type, duration, calories, steps, and notes with validation.
- **📋 History** — Full workout history with type filters and delete support.
- **💾 LocalStorage** — All data persists across sessions automatically.

## Exercise Types

Cardio · Strength · Yoga · Cycling · Swimming · Other

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- React 18
- CSS (no external UI library)
- localStorage for data persistence

## Project Structure

```
src/
├── App.js              # Main app with tab routing
├── App.css
├── components/
│   ├── Dashboard.js    # Stats, charts, recent workouts
│   ├── Dashboard.css
│   ├── LogWorkout.js   # Workout logging form
│   ├── LogWorkout.css
│   ├── History.js      # Workout history with filters
│   └── History.css
└── index.js
```

---

**CodeAlpha Internship** | App Development Track
