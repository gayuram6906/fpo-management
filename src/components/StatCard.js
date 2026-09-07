import React from "react";

export default function StatCard({icon: Icon, label, value, note}) {
  return (
    <div className="stat-card">
      <div className="stat-icon"><Icon size={21}/></div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        {note && <small>{note}</small>}
      </div>
    </div>
  );
}