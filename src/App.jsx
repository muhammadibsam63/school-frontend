import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import StudentTable from './components/StudentTable';
import StudentFormModal from './components/StudentFormModal';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';
import { getStudents, createStudent, updateStudent, deleteStudent } from './api/students';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [loadError, setLoadError] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => setToast({ message, type });

  const fetchStudents = useCallback(async (searchTerm) => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await getStudents(searchTerm);
      setStudents(res.data.data);
    } catch (err) {
      setLoadError(
        err.response?.data?.message || 'Could not reach the server. Confirm the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handle = setTimeout(() => fetchStudents(search), 300);
    return () => clearTimeout(handle);
  }, [search, fetchStudents]);

  const openAddModal = () => {
    setEditingStudent(null);
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setFormError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setModalOpen(false);
    setEditingStudent(null);
    setFormError('');
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setFormError('');
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, values);
        showToast('Student updated successfully');
      } else {
        await createStudent(values);
        showToast('Student added successfully');
      }
      setModalOpen(false);
      setEditingStudent(null);
      fetchStudents(search);
    } catch (err) {
      const apiErrors = err.response?.data?.errors;
      if (apiErrors?.length) {
        setFormError(apiErrors.map((e) => e.message).join(' '));
      } else {
        setFormError(err.response?.data?.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteStudent(deleteTarget.id);
      showToast('Student removed');
      setDeleteTarget(null);
      fetchStudents(search);
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not remove student', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="page">
      <div className="page__inner">
        <Header total={students.length} onAddClick={openAddModal} />

        <div className="toolbar">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {loadError ? (
          <div className="state-panel state-panel--error">
            <p className="state-panel__title">Couldn&rsquo;t load students</p>
            <p className="state-panel__body">{loadError}</p>
            <button type="button" className="btn btn--ghost" onClick={() => fetchStudents(search)}>
              Try again
            </button>
          </div>
        ) : (
          <StudentTable
            students={students}
            loading={loading}
            onEdit={openEditModal}
            onDelete={setDeleteTarget}
          />
        )}
      </div>

      {modalOpen && (
        <StudentFormModal
          student={editingStudent}
          onClose={closeModal}
          onSubmit={handleSubmit}
          submitting={submitting}
          serverError={formError}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          student={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
          deleting={deleting}
        />
      )}

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
