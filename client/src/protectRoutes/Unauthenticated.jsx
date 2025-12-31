const Unauthenticated = ({ tokenValid }) => {
  const { login } = useAuth();

  const handleQuickLogin = (role) => {
    login({ name: `Test ${role}`, email: `${role}@example.com`, role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-blue-600" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {tokenValid ? "Authentication Required" : "Session Expired"}
        </h1>

        <p className="text-gray-600 mb-6">
          {tokenValid
            ? "Please sign in to access this page."
            : "Your session has expired. Please sign in to continue."}
        </p>

        <div className="space-y-3">
          <button
            onClick={() => handleQuickLogin("user")}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            Sign In (Demo)
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Demo Quick Login:</p>
          <div className="flex gap-2 flex-wrap justify-center">
            {["user", "agency", "dealer", "admin"].map((role) => (
              <button
                key={role}
                onClick={() => handleQuickLogin(role)}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors capitalize"
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
