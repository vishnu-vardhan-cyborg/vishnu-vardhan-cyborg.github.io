import React from 'react';
import './GlassyProgressBar.css';

export default function GlassyProgressBar({ label, percentage }) {
  return (
    <div className="glass-progress-wrapper">
      <div className="glass-progress-label">
        {label} <span>{percentage}%</span>
      </div>
      <div className="glass-progress-bar">
        <div className="glass-progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
