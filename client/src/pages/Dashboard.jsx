import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

import { fetchTaskStats } from '../store/slices/taskSlice'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { stats, isLoading } = useSelector((state) => state.tasks)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchTaskStats())
  }, [dispatch])

  const getStatusCount = (status) => {
    const statusStat = stats?.statusStats?.find((stat) => stat._id === status)
    return statusStat?.count || 0
  }

  const getPriorityCount = (priority) => {
    const priorityStat = stats?.priorityStats?.find((stat) => stat._id === priority)
    return priorityStat?.count || 0
  }

  const statisticsCards = [
    {
      name: 'Total Tasks',
      value: stats?.totalTasks || 0,
      icon: ClipboardDocumentListIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Completed',
      value: getStatusCount('completed'),
      icon: CheckCircleIcon,
      color: 'bg-green-500',
    },
    {
      name: 'In Progress',
      value: getStatusCount('in-progress'),
      icon: ClockIcon,
      color: 'bg-yellow-500',
    },
    {
      name: 'High Priority',
      value: getPriorityCount('high'),
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
    },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <div className="h-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Welcome back, {user?.name}!
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Here's an overview of your tasks and productivity.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/tasks"
            className="btn-primary"
          >
            View All Tasks
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statisticsCards.map((card) => (
          <div key={card.name} className="card">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md ${card.color}`}>
                    <card.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-500">{card.name}</div>
                  <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="card-body space-y-3">
            <Link
              to="/tasks"
              className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <ClipboardDocumentListIcon className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-900">Manage Tasks</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Create, edit, and organize your tasks
              </p>
            </Link>
            <Link
              to="/profile"
              className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm font-medium text-gray-900">Update Profile</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Manage your account settings and preferences
              </p>
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Task Summary</h3>
          </div>
          <div className="card-body">
            {stats?.statusStats && stats.statusStats.length > 0 ? (
              <div className="space-y-4">
                {stats.statusStats.map((stat) => (
                  <div key={stat._id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        stat._id === 'completed' ? 'bg-green-100 text-green-800' :
                        stat._id === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {stat._id.replace('-', ' ')}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{stat.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <ClipboardDocumentListIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating your first task.
                </p>
                <div className="mt-6">
                  <Link to="/tasks" className="btn-primary">
                    Create Task
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard