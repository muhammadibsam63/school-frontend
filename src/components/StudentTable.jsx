import React from 'react';

export default function StudentTable({ students, loading, onEdit, onDelete }) {
  if (loading) {
    return <div className="state-panel">Loading students&hellip;</div>;
  }

  if (students.length === 0) {
    return (
      <div className="state-panel">
        <p className="state-panel__title">No students found</p>
        <p className="state-panel__body">Add a student or adjust your search to see records here.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="student-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Course</th>
            <th scope="col" className="student-table__actions-col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td data-label="Name">{student.name}</td>
              <td data-label="Email">{student.email}</td>
              <td data-label="Age">{student.age}</td>
              <td data-label="Course">{student.course}</td>
              <td data-label="Actions" className="student-table__actions">
                <button type="button" className="btn btn--ghost" onClick={() => onEdit(student)}>
                  Edit
                </button>
                <button type="button" className="btn btn--danger-ghost" onClick={() => onDelete(student)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
