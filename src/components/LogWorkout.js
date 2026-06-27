import React, { useState } from 'react';
import './LogWorkout.css';

const TYPES = ['Cardio', 'Strength', 'Yoga', 'Cycling', 'Swimming', 'Other'];
const TYPE_EMOJI = {
  Cardio: '🏃', Strength: '💪', Yoga: '🧘', Cycling: '🚴', Swimming: '🏊', Other: '⚡',
};

const today = new Date().toISOString().split('T')[0];

const EMPTY = {
  date: today,
  exercise: '',
  type: 'Cardio',
  duration: '',
  calories: '',
  steps: '',
  notes: '',
};

export default function LogWorkout({ onAdd }) {
  const [form, setForm] = useState(EMPTY);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.exercise.trim()) e.exercise = true;
    if (!form.duration || isNaN(form.duration) || Number(form.duration) <= 0) e.duration = true;
    if (!form.calories || isNaN(form.calories) || Number(form.calories) < 0) e.calories = true;
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onAdd({
      ...form,
      duration: Number(form.duration),
      calories: Number(form.calories),
      steps: Number(form.steps) || 0,
    });
    setForm({ ...EMPTY, date: form.date });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="log-card">
      <div className="log-title">Log a Workout</div>
      <div className="log-subtitle">Record your session and track your progress</div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-input"
            value={form.date}
            onChange={(e) => set('date', e.target.value)}
            max={today}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Exercise name *</label>
          <input
            type="text"
            className={`form-input${errors.exercise ? ' error' : ''}`}
            placeholder="e.g. Morning Run"
            value={form.exercise}
            onChange={(e) => set('exercise', e.target.value)}
          />
        </div>

        <div className="form-group full">
          <label className="form-label">Exercise type *</label>
          <div className="type-grid">
            {TYPES.map((t) => (
              <button
                key={t}
                className={`type-btn${form.type === t ? ' selected' : ''}`}
                onClick={() => set('type', t)}
              >
                {TYPE_EMOJI[t]} {t}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Duration (min) *</label>
          <input
            type="number"
            className={`form-input${errors.duration ? ' error' : ''}`}
            placeholder="e.g. 30"
            value={form.duration}
            onChange={(e) => set('duration', e.target.value)}
            min="1"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Calories burned (kcal)*</label>
          <input
            type="number"
            className={`form-input${errors.calories ? ' error' : ''}`}
            placeholder="e.g. 250"
            value={form.calories}
            onChange={(e) => set('calories', e.target.value)}
            min="0"
          />
        </div>

        <div className="form-group full">
          <label className="form-label">Steps (optional)</label>
          <input
            type="number"
            className="form-input"
            placeholder="e.g. 5000"
            value={form.steps}
            onChange={(e) => set('steps', e.target.value)}
            min="0"
          />
        </div>

        <div className="form-group full">
          <label className="form-label">Notes (optional)</label>
          <textarea
            className="form-textarea"
            placeholder="How did it go? Any details..."
            value={form.notes}
            onChange={(e) => set('notes', e.target.value)}
          />
        </div>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Save Workout →
      </button>

      {success && (
        <div className="success-toast">🎉 Workout logged successfully!</div>
      )}
    </div>
  );
}
