import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
} from '@heroicons/react/24/outline'

import { setSidebarOpen } from '../../store/slices/uiSlice'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Tasks', href: '/tasks', icon: ClipboardDocumentListIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
]

const Navbar = () => {
  const dispatch = useDispatch()
  const { sidebarOpen } = useSelector((state) => state.ui)

  return (
    <>
      {/* Mobile menu overlay */}
      <div className={`lg:hidden ${sidebarOpen ? 'fixed inset-0 z-40' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => dispatch(setSidebarOpen(false))} />
        
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => dispatch(setSidebarOpen(false))}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          
          <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-xl font-bold text-gray-900">MERN Tasks</h1>
            </div>
            <nav className="mt-5 space-y-1 px-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActive
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                  onClick={() => dispatch(setSidebarOpen(false))}
                >
                  <item.icon className="mr-4 h-6 w-6 flex-shrink-0" aria-hidden="true" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop and Mobile Navbar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            
            {/* Left side - Logo and Navigation */}
            <div className="flex">
              {/* Logo */}
              <div className="flex flex-shrink-0 items-center">
                <h1 className="text-xl font-bold text-gray-900">MERN Tasks</h1>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:ml-8 lg:flex lg:space-x-8">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'border-b-2 border-primary-500 text-primary-600'
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                      }`
                    }
                  >
                    <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right side - User actions */}
            <div className="flex items-center">
              {/* Notifications */}
              <button
                type="button"
                className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown placeholder */}
              <div className="ml-4 relative flex-shrink-0">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="ml-4 lg:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                  onClick={() => dispatch(setSidebarOpen(true))}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar