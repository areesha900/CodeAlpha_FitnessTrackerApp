import React from 'react';
import './Dashboard.css';

const TYPE_EMOJI = {
  Cardio: '🏃', Strength: '💪', Yoga: '🧘', Cycling: '🚴', Swimming: '🏊', Other: '⚡',
};
const TYPE_CLASS = {
  Cardio: 'cardio', Strength: 'strength', Yoga: 'yoga',
  Cycling: 'cycling', Swimming: 'swimming', Other: 'other',
};

function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
}

const SHORT_DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export default function Dashboard({ logs }) {
  const today = new Date().toISOString().split('T')[0];
  const todayLogs = logs.filter((l) => l.date === today);

  const totalCaloriesToday = todayLogs.reduce((s, l) => s + Number(l.calories || 0), 0);
  const totalDurationToday = todayLogs.reduce((s, l) => s + Number(l.duration || 0), 0);
  const totalStepsToday = todayLogs.reduce((s, l) => s + Number(l.steps || 0), 0);
  const workoutsThisWeek = logs.filter((l) => {
    const diff = (new Date() - new Date(l.date)) / 86400000;
    return diff <= 7;
  }).length;

  const last7 = getLast7Days();
  const caloriesByDay = last7.map((date) =>
    logs.filter((l) => l.date === date).reduce((s, l) => s + Number(l.calories || 0), 0)
  );
  const maxCal = Math.max(...caloriesByDay, 1);

  const recentLogs = [...logs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  const GOAL = 500;
  const pct = Math.min(totalCaloriesToday / GOAL, 1);
  const r = 42;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;

  return (
    <div className="dashboard">

      {/* Hero card — calories today */}
      <div className="hero-card">
        <div className="hero-label">Calories burned today</div>
        <div className="hero-value">
          {totalCaloriesToday}<span className="hero-unit"> kcal</span>
        </div>
        <div className="hero-sub">
          Goal: {GOAL} kcal · {Math.round(pct * 100)}% complete
        </div>
        <div className="hero-progress-bar">
          <div className="hero-progress-fill" style={{ width: `${pct * 100}%` }} />
        </div>
      </div>

      {/* Stats row */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon-wrap purple">⏱️</div>
          <div className="stat-value">{totalDurationToday}<span style={{ fontSize: '0.85rem' }}>m</span></div>
          <div className="stat-label">Active today</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrap blue">👟</div>
          <div className="stat-value">{totalStepsToday > 999 ? (totalStepsToday/1000).toFixed(1)+'k' : totalStepsToday}</div>
          <div className="stat-label">Steps today</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrap orange">📅</div>
          <div className="stat-value">{workoutsThisWeek}</div>
          <div className="stat-label">This week</div>
        </div>
      </div>

      {/* Weekly bar chart */}
      <div className="section-card">
        <div className="section-header">
          <div className="section-title">Weekly Calories</div>
          <div className="section-tag">7 days</div>
        </div>
        <div className="weekly-bars">
          {last7.map((date, i) => {
            const heightPct = caloriesByDay[i] / maxCal;
            const isToday = date === today;
            const dayLabel = SHORT_DAYS[new Date(date + 'T12:00:00').getDay()].charAt(0);
            return (
              <div key={date} className="week-col">
                <div className="bar-wrap">
                  <div
                    className={`bar-fill${isToday ? ' today' : ''}`}
                    style={{ height: `${Math.max(heightPct * 100, caloriesByDay[i] > 0 ? 8 : 0)}%` }}
                    title={`${caloriesByDay[i]} kcal`}
                  />
                </div>
                <span className={`week-day${isToday ? ' today-label' : ''}`}>
                  {isToday ? '●' : dayLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily calorie ring */}
      <div className="section-card">
        <div className="section-header">
          <div className="section-title">Daily Goal Ring</div>
          <div className="section-tag">{GOAL} kcal</div>
        </div>
        <div className="ring-section">
          <div className="ring-wrap">
            <svg width="110" height="110" viewBox="0 0 110 110">
              <circle cx="55" cy="55" r={r} fill="none" stroke="#E8F5C8" strokeWidth="13" />
              <circle
                cx="55" cy="55" r={r} fill="none"
                stroke={pct >= 1 ? '#4A6741' : '#1A6B8A'}
                strokeWidth="13"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circ - dash}`}
                strokeDashoffset={circ / 4}
                style={{ transition: 'stroke-dasharray 0.6s ease' }}
              />
              <text x="55" y="51" textAnchor="middle" fill="#2D3A28" fontSize="16" fontWeight="800" fontFamily="Inter, sans-serif">
                {Math.round(pct * 100)}%
              </text>
              <text x="55" y="66" textAnchor="middle" fill="#7A9A6A" fontSize="10" fontFamily="Inter, sans-serif">
                of goal
              </text>
            </svg>
          </div>
          <div className="ring-legend">
            <div className="legend-row">
              <div className="legend-dot" style={{ background: '#1A6B8A' }} />
              <span className="legend-text">Burned: <span className="legend-val">{totalCaloriesToday} kcal</span></span>
            </div>
            <div className="legend-row">
              <div className="legend-dot" style={{ background: '#B8D8EC' }} />
              <span className="legend-text">Goal: <span className="legend-val">{GOAL} kcal</span></span>
            </div>
            <div className="legend-row">
              <div className="legend-dot" style={{ background: '#7BBDD6' }} />
              <span className="legend-text">Remaining: <span className="legend-val">{Math.max(0, GOAL - totalCaloriesToday)} kcal</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent workouts */}
      <div className="section-card">
        <div className="section-header">
          <div className="section-title">Recent Workouts</div>
          <div className="section-tag">Latest 4</div>
        </div>
        {recentLogs.length === 0 ? (
          <p className="empty-state">No workouts yet — go crush it! 💪</p>
        ) : (
          <div className="recent-list">
            {recentLogs.map((log) => (
              <div key={log.id} className="recent-item">
                <div className={`recent-icon-wrap ${TYPE_CLASS[log.type] || 'other'}`}>
                  {TYPE_EMOJI[log.type] || '⚡'}
                </div>
                <div className="recent-info">
                  <div className="recent-name">{log.exercise}</div>
                  <div className="recent-meta">{log.date} · {log.duration} min · {log.type}</div>
                </div>
                <span className="recent-cal">{log.calories} kcal</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
