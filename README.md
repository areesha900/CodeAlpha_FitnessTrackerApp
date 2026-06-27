# 🏋️ Fitness Tracker App

A React-based fitness tracking web app built as part of the **CodeAlpha App Development Internship** (Task 2).

## Screenshots
<img width="266" height="435" alt="Screenshot 2026-06-27 162310" src="https://github.com/user-attachments/assets/535d20ec-559e-4609-81b0-53fc558f3579" />
<img width="269" height="266" alt="Screenshot 2026-06-27 162327" src="https://github.com/user-attachments/assets/20ab612b-783d-4c2e-95f4-1905ef9b3551" />
<img width="266" height="275" alt="Screenshot 2026-06-27 162346" src="https://github.com/user-attachments/assets/b6928d8a-5378-47b2-8564-fb3e8e80f460" />

### updated

<img width="365" height="422" alt="image" src="https://github.com/user-attachments/assets/5ec4cdaf-d313-41e6-973a-4819eac72477" />
<img width="370" height="413" alt="image" src="https://github.com/user-attachments/assets/b4900639-b670-40a5-8e25-a65be755fa39" />
<img width="371" height="407" alt="image" src="https://github.com/user-attachments/assets/0772cbad-217d-4c2f-a739-5c9ea78d24e0" />



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
