import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import LogWorkout from './components/LogWorkout';
import History from './components/History';
import './App.css';

const STORAGE_KEY = 'fitness_tracker_v1';

const DEFAULT_LOGS = [
  {
    id: 1,
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    exercise: 'Morning Run',
    type: 'Cardio',
    duration: 30,
    calories: 280,
    steps: 4200,
    notes: 'Morning jog around the park',
  },
  {
    id: 2,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    exercise: 'Push-ups & Squats',
    type: 'Strength',
    duration: 45,
    calories: 220,
    steps: 0,
    notes: '3 sets of 20 reps each',
  },
  {
    id: 3,
    date: new Date().toISOString().split('T')[0],
    exercise: 'Outdoor Cycling',
    type: 'Cycling',
    duration: 40,
    calories: 340,
    steps: 0,
    notes: 'Outdoor cycling session',
  },
];

function App() {
  const [logs, setLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_LOGS;
    } catch {
      return DEFAULT_LOGS;
    }
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  const handleAddLog = (entry) => {
    const newLog = { ...entry, id: Date.now() };
    setLogs((prev) => [newLog, ...prev]);
    setActiveTab('dashboard');
  };

  const handleDeleteLog = (id) => {
    setLogs((prev) => prev.filter((l) => l.id !== id));
  };

  const tabs = [
    { key: 'dashboard', label: '📊 Dashboard' },
    { key: 'log', label: '➕ Log Workout' },
    { key: 'history', label: '📋 History' },
  ];

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <header className="app-header">
          <div className="header-left">
            <div className="header-icon-wrap">🏋️</div>
            <div>
              <h1 className="app-title">FitTrack</h1>
              <p className="app-subtitle">Track · Move · Improve</p>
            </div>
          </div>
          <div className="header-badge">PRO</div>
        </header>

        <nav className="tab-bar">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`tab-btn${activeTab === t.key ? ' active' : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {activeTab === 'dashboard' && <Dashboard logs={logs} />}
        {activeTab === 'log' && <LogWorkout onAdd={handleAddLog} />}
        {activeTab === 'history' && <History logs={logs} onDelete={handleDeleteLog} />}
      </div>
    </div>
  );
}

export default App;
