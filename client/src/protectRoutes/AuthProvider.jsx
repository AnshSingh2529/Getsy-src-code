const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    tokenValid: true,
  });

  // Simulate auth check on mount
  useEffect(() => {
    const checkAuth = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Simulate checking stored token
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (storedUser && token) {
        try {
          const user = JSON.parse(storedUser);
          // Simulate token validation
          const isValid = token === "valid-token";

          setAuthState({
            isAuthenticated: isValid,
            user: isValid ? user : null,
            isLoading: false,
            tokenValid: isValid,
          });
        } catch {
          setAuthState({
            isAuthenticated: false,
            user: null,
            isLoading: false,
            tokenValid: false,
          });
        }
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          tokenValid: true,
        });
      }
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", "valid-token");
    setAuthState({
      isAuthenticated: true,
      user: userData,
      isLoading: false,
      tokenValid: true,
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      tokenValid: true,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
