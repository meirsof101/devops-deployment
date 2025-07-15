const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="spinner w-8 h-8 mx-auto mb-4"></div>
        <h2 className="text-lg font-medium text-gray-900 mb-2">Loading...</h2>
        <p className="text-sm text-gray-500">Please wait while we load the application</p>
      </div>
    </div>
  )
}

export default LoadingScreen