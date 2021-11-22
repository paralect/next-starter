import api from 'services/api.service';

export const signUp = ({
  firstName,
  lastName,
  email,
  password,
}) => api.post('/account/signup', {
  firstName,
  lastName,
  email,
  password,
});

export const signIn = (data) => api.post('/account/signin', data);
export const signOut = () => api.post('/account/logout');
export const resetPassword = (data) => api.post('/account/reset-password', data);
export const forgotPassword = (data) => api.post('/account/forgot-password', data);

export const getCurrentUser = () => api.get('/users/current');
