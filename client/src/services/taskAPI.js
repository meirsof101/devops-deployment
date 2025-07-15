import api from './api'

const taskAPI = {
  // Get all tasks with optional filters and pagination
  getTasks: (params = {}) => {
    const queryParams = new URLSearchParams()
    
    Object.keys(params).forEach(key => {
      if (params[key] !== '' && params[key] !== null && params[key] !== undefined) {
        queryParams.append(key, params[key])
      }
    })

    const queryString = queryParams.toString()
    return api.get(`/tasks${queryString ? `?${queryString}` : ''}`)
  },

  // Get a single task
  getTask: (id) => {
    return api.get(`/tasks/${id}`)
  },

  // Create a new task
  createTask: (taskData) => {
    return api.post('/tasks', taskData)
  },

  // Update a task
  updateTask: (id, taskData) => {
    return api.put(`/tasks/${id}`, taskData)
  },

  // Delete a task
  deleteTask: (id) => {
    return api.delete(`/tasks/${id}`)
  },

  // Get task statistics
  getTaskStats: () => {
    return api.get('/tasks/user/stats')
  },
}

export default taskAPI