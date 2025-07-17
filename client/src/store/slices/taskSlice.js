import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import taskAPI from '../../services/taskAPI'
import { toast } from 'react-hot-toast'

// Async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await taskAPI.getTasks(params)
      return response.data
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to fetch tasks'
      return rejectWithValue(message)
    }
  }
)

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await taskAPI.createTask(taskData)
      toast.success('Task created successfully!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create task'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const response = await taskAPI.updateTask(id, taskData)
      toast.success('Task updated successfully!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update task'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await taskAPI.deleteTask(id)
      toast.success('Task deleted successfully!')
      return id
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to delete task'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)

export const fetchTaskStats = createAsyncThunk(
  'tasks/fetchTaskStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await taskAPI.getTaskStats()
      return response.data
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to fetch task stats'
      return rejectWithValue(message)
    }
  }
)

const initialState = {
  tasks: [],
  stats: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    hasNext: false,
    hasPrev: false,
  },
  filters: {
    status: '',
    priority: '',
    search: '',
  },
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        status: '',
        priority: '',
        search: '',
      }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.tasks = action.payload.data
        state.pagination = {
          page: action.payload.pagination?.page || 1,
          limit: action.payload.pagination?.limit || 10,
          total: action.payload.total || 0,
          hasNext: action.payload.pagination?.next ? true : false,
          hasPrev: action.payload.pagination?.prev ? true : false,
        }
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to fetch tasks'
      })
      // Create task
      .addCase(createTask.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.tasks.unshift(action.payload.data)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to create task'
      })
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.error = null
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload.data._id)
        if (index !== -1) {
          state.tasks[index] = action.payload.data
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to update task'
      })
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.error = null
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload)
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to delete task'
      })
      // Fetch task stats
      .addCase(fetchTaskStats.pending, (state) => {
        state.error = null
      })
      .addCase(fetchTaskStats.fulfilled, (state, action) => {
        state.stats = action.payload.data
      })
      .addCase(fetchTaskStats.rejected, (state, action) => {
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to fetch task stats'
      })
  },
})

export const { clearError, setFilters, clearFilters, setPagination } = taskSlice.actions
export default taskSlice.reducer