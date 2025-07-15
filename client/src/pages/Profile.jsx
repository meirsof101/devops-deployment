import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { UserCircleIcon, KeyIcon } from '@heroicons/react/24/outline'

import { updateProfile, clearError } from '../store/slices/authSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const { user, isLoading, error } = useSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState('profile')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm()

  const newPassword = watch('newPassword')

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
    }
  }, [user, setValue])

  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  const onSubmitProfile = (data) => {
    dispatch(updateProfile(data))
  }

  const onSubmitPassword = (data) => {
    // In a real application, you would have a separate endpoint for changing passwords
    console.log('Password change:', data)
    resetPassword()
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
    { id: 'security', name: 'Security', icon: KeyIcon },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Account Settings
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account information and security settings.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-5 w-5 inline mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
            <p className="mt-1 text-sm text-gray-500">
              Update your account's profile information and email address.
            </p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  {user?.avatar ? (
                    <img
                      className="h-20 w-20 rounded-full object-cover"
                      src={user.avatar}
                      alt={user.name}
                    />
                  ) : (
                    <UserCircleIcon className="h-20 w-20 text-gray-400" />
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    className="btn-secondary text-sm"
                  >
                    Change Avatar
                  </button>
                  <p className="mt-1 text-xs text-gray-500">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    })}
                    type="text"
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="form-error">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    type="email"
                    className="form-input"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="form-error">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="avatar" className="form-label">
                  Avatar URL (Optional)
                </label>
                <input
                  {...register('avatar')}
                  type="url"
                  className="form-input"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="spinner mr-2"></div>
                      Updating...
                    </div>
                  ) : (
                    'Update Profile'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Password</h3>
              <p className="mt-1 text-sm text-gray-500">
                Update your password to keep your account secure.
              </p>
            </div>
            <div className="card-body">
              <form onSubmit={handlePasswordSubmit(onSubmitPassword)} className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="form-label">
                    Current Password
                  </label>
                  <input
                    {...registerPassword('currentPassword', {
                      required: 'Current password is required',
                    })}
                    type="password"
                    className="form-input"
                    placeholder="Enter your current password"
                  />
                  {passwordErrors.currentPassword && (
                    <p className="form-error">{passwordErrors.currentPassword.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    {...registerPassword('newPassword', {
                      required: 'New password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    type="password"
                    className="form-input"
                    placeholder="Enter your new password"
                  />
                  {passwordErrors.newPassword && (
                    <p className="form-error">{passwordErrors.newPassword.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm New Password
                  </label>
                  <input
                    {...registerPassword('confirmPassword', {
                      required: 'Please confirm your new password',
                      validate: (value) =>
                        value === newPassword || 'Passwords do not match',
                    })}
                    type="password"
                    className="form-input"
                    placeholder="Confirm your new password"
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="form-error">{passwordErrors.confirmPassword.message}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="btn-primary">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <div>
                    <span className="text-sm font-medium text-gray-900">Member since</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <div>
                    <span className="text-sm font-medium text-gray-900">Last login</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">
                      {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <div>
                    <span className="text-sm font-medium text-gray-900">Account status</span>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile