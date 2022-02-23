import api from 'services/api.service';

export const getCurrent = () => api.get('/users/current');
export const updateCurrent = (data) => api.post('/users/current', data);
export const uploadProfilePhoto = (data) => api.post('/users/upload-photo', data);
export const removeProfilePhoto = () => api.delete('/users/remove-photo');
export const list = (data) => api.get('/users', data);
