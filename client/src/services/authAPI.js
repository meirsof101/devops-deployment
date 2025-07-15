import api from './api'

const authAPI = {
  // Register a new user
  register: (userData) => {
    return api.post('/auth/register', userData)
  },

  // Login user
  login: (credentials) => {
    return api.post('/auth/login', credentials)
  },

  // Get current user
  getCurrentUser: () => {
    return api.get('/auth/me')
  },

  // Update user profile
  updateProfile: (userData) => {
    return api.put('/auth/profile', userData)
  },

  // Logout user (client-side only)
  logout: () => {
    localStorage.removeItem('token')
    return Promise.resolve()
  },
}

export default authAPI