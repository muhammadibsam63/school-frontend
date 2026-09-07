import React from 'react';

export default function ConfirmDialog({ student, onCancel, onConfirm, deleting }) {
  return (
    <div className="modal-overlay" role="presentation" onMouseDown={onCancel}>
      <div
        className="modal modal--small"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id="confirm-title" className="modal__title">
            Remove student
          </h2>
          <button type="button" className="modal__close" aria-label="Close dialog" onClick={onCancel}>
            &times;
          </button>
        </div>
        <div className="modal__body">
          <p>
            This removes <strong>{student?.name}</strong> from the student records. This action can&rsquo;t be
            undone.
          </p>
        </div>
        <div className="modal__footer">
          <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={deleting}>
            Cancel
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm} disabled={deleting}>
            {deleting ? 'Removing…' : 'Remove student'}
          </button>
        </div>
      </div>
    </div>
  );
}
