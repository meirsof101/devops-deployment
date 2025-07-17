import axios from 'axios'
import { toast } from 'react-hot-toast'

// Create axios instance
const api = axios.create({
  baseURL: 'https://devops-deployment.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { response } = error

    if (response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      window.location.href = '/login'
      toast.error('Your session has expired. Please login again.')
    } else if (response?.status === 403) {
      toast.error('You do not have permission to perform this action.')
    } else if (response?.status === 404) {
      toast.error('The requested resource was not found.')
    } else if (response?.status >= 500) {
      toast.error('A server error occurred. Please try again later.')
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please check your connection.')
    } else if (!response) {
      toast.error('Network error. Please check your connection.')
    }

    return Promise.reject(error)
  }
)

export default api