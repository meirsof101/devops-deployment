import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarOpen: false,
  theme: 'light',
  notifications: [],
  loading: {
    global: false,
    tasks: false,
    auth: false,
  },
  modals: {
    createTask: false,
    editTask: false,
    deleteTask: false,
    profile: false,
  },
  selectedTask: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload
    },
    setTasksLoading: (state, action) => {
      state.loading.tasks = action.payload
    },
    setAuthLoading: (state, action) => {
      state.loading.auth = action.payload
    },
    openModal: (state, action) => {
      const { modal, data } = action.payload
      state.modals[modal] = true
      if (data) {
        state.selectedTask = data
      }
    },
    closeModal: (state, action) => {
      const modal = action.payload
      state.modals[modal] = false
      if (modal === 'editTask' || modal === 'deleteTask') {
        state.selectedTask = null
      }
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(modal => {
        state.modals[modal] = false
      })
      state.selectedTask = null
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        type: action.payload.type || 'info',
        message: action.payload.message,
        timestamp: new Date().toISOString(),
      }
      state.notifications.unshift(notification)
      
      // Keep only last 50 notifications
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50)
      }
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  setGlobalLoading,
  setTasksLoading,
  setAuthLoading,
  openModal,
  closeModal,
  closeAllModals,
  addNotification,
  removeNotification,
  clearNotifications,
  setSelectedTask,
} = uiSlice.actions

export default uiSlice.reducer