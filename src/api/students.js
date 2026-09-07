import api from './axios';

export const getStudents = (search = '') =>
  api.get('/students', { params: search ? { search } : {} });

export const getStudent = (id) => api.get(`/students/${id}`);

export const createStudent = (student) => api.post('/students', student);

export const updateStudent = (id, student) => api.put(`/students/${id}`, student);

export const deleteStudent = (id) => api.delete(`/students/${id}`);
