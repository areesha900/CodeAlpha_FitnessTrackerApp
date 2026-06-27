import React, { useState } from 'react';
import './History.css';

const TYPE_EMOJI = {
  Cardio: '🏃', Strength: '💪', Yoga: '🧘', Cycling: '🚴', Swimming: '🏊', Other: '⚡',
};
const TYPE_CLASS = {
  Cardio: 'cardio', Strength: 'strength', Yoga: 'yoga',
  Cycling: 'cycling', Swimming: 'swimming', Other: 'other',
};

const FILTERS = ['All', 'Cardio', 'Strength', 'Yoga', 'Cycling', 'Swimming', 'Other'];

export default function History({ logs, onDelete }) {
  const [filter, setFilter] = useState('All');

  const filtered = [...logs]
    .filter((l) => filter === 'All' || l.type === filter)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="history">
      <div className="history-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          {filter === 'All'
            ? 'No workouts yet — go log your first one! 🏋️'
            : `No ${filter} workouts logged yet.`}
        </div>
      ) : (
        <>
          <div className="history-count">{filtered.length} workout{filtered.length !== 1 ? 's' : ''}</div>
          <div className="history-list">
            {filtered.map((log) => (
              <div key={log.id} className="history-item">
                <div className={`history-icon-wrap ${TYPE_CLASS[log.type] || 'other'}`}>
                  {TYPE_EMOJI[log.type] || '⚡'}
                </div>
                <div className="history-body">
                  <div className="history-name">{log.exercise}</div>
                  <div className="history-chips">
                    <span className="chip">{log.date}</span>
                    <span className="chip">{log.type}</span>
                    <span className="chip">{log.duration} min</span>
                    {log.steps > 0 && <span className="chip">👟 {Number(log.steps).toLocaleString()}</span>}
                    <span className="chip cal">🔥 {log.calories} kcal</span>
                  </div>
                  {log.notes ? <div className="history-notes">"{log.notes}"</div> : null}
                </div>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(log.id)}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
