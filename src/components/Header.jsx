import React from 'react';

export default function Header({ total, onAddClick }) {
  return (
    <header className="page-header">
      <div>
        <p className="page-header__eyebrow">Registrar Desk</p>
        <h1 className="page-header__title">Student Records</h1>
        <p className="page-header__meta">
          {total} {total === 1 ? 'student' : 'students'} on file
        </p>
      </div>
      <button type="button" className="btn btn--primary" onClick={onAddClick}>
        Add student
      </button>
    </header>
  );
}
