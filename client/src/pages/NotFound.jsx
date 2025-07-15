import { Link } from 'react-router-dom'
import { HomeIcon } from '@heroicons/react/24/outline'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h2>
          <p className="mt-2 text-base text-gray-500">
            Sorry, we couldn't find the page you're looking for.
          </p>
          
          <div className="mt-8 space-y-4">
            <Link
              to="/dashboard"
              className="btn-primary inline-flex items-center"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Go back home
            </Link>
            
            <div>
              <Link
                to="/tasks"
                className="text-primary-600 hover:text-primary-500 font-medium"
              >
                View your tasks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound