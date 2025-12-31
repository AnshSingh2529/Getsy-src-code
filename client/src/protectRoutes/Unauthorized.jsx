const Unauthorized = ({ userRole, requiredRoles }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-amber-600" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Access Denied
        </h1>

        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Your Role:</span>
            <span className="font-medium text-gray-900 capitalize">
              {userRole}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Required:</span>
            <span className="font-medium text-gray-900 capitalize">
              {requiredRoles.join(", ")}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go to Dashboard
          </button>

          <button
            onClick={() => alert("Support contact form would open here")}
            className="w-full bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};