import React, { useState } from "react";
import {
  Users,
  Shield,
  Zap,
  TrendingUp,
  CheckCircle,
  UsersRoundIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/services/authApi.js"; // ✅ RTK Query hook
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice.js";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, isError}] = useLoginMutation(); // ✅ mutation hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      console.log("Login successful:", response);

      // Extract the actual structure
      const { user, access, refresh } = response;

      dispatch(setCredentials({ user, access, refresh }));

      if (!rememberMe) {
        localStorage.removeItem("auth");
      }

      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleRegister = () => {
    navigate("/auth/register");
  };

  return (
    <div className="flex md:min-h-screen items-start justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 shadow-sm rounded-lg p-5">
      {/* Left Side - Enhanced Professional Design */}
      <div className="hidden md:flex md:flex-col items-start justify-center ml-5 md:h-auto w-3/5 pr-8">
        {/* Main Content Container */}
        <div className="w-full max-w-2xl">
          <div>
            {/* Hero Message */}
            <div className="mb-8">
              <h2 className="text-5xl font-bold text-white leading-tight mb-4">
                Transform Your
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {" "}
                  Estate
                </span>
              </h2>
              <div className="text-xl text-gray-300 leading-relaxed">
                Connect thousands of agents nearby who trust our platform to{" "}
                <br />
                <div className="flex-row">
                  <div className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-sm">
                    - Streamline property management, enhance safe and secure
                    listing.
                  </div>
                  <div className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-sm">
                    - Its on You to choose your agent wisely.
                  </div>
                  <div className="flex items-center gap-1 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-sm">
                    - Every agents are authenticated and verified{" "}
                    <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Agent–Owner Security */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Shield className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Verified Agents & Owners
              </h3>
              <p className="text-gray-300 text-sm">
                Every profile is authenticated to ensure trust and secure
                transactions.
              </p>
            </div>

            {/* Property Listings */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Zap className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Instant Property Access
              </h3>
              <p className="text-gray-300 text-sm">
                Explore properties across multiple cities with lightning-fast
                search.
              </p>
            </div>

            {/* Collaboration */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Users className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Owner-Agent Collaboration
              </h3>
              <p className="text-gray-300 text-sm">
                Manage deals, share insights, and close faster with built-in
                tools.
              </p>
            </div>

            {/* Growth Insights */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-yellow-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Market Insights
              </h3>
              <p className="text-gray-300 text-sm">
                Real-time analytics to help agents and owners grow their
                portfolios.
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Trusted by Real Estate Leaders
              </h3>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-green-400 font-medium">
                  Verified Partnerships
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white mb-1">50K+</div>
                <div className="text-gray-400 text-sm">Listed Properties</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">500+</div>
                <div className="text-gray-400 text-sm">Active Agents</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">100+</div>
                <div className="text-gray-400 text-sm">Cities Covered</div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-8 relative">
            <div className="absolute -left-2 -top-2 w-8 h-8 bg-blue-500 rounded-full opacity-20"></div>
            <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-purple-500 rounded-full opacity-10"></div>
            <blockquote className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <p className="text-gray-300 italic mb-4">
                "Getsy made it easier for us to connect with trusted agents and
                manage our properties seamlessly. The platform brought
                transparency and efficiency into our deals."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RS</span>
                </div>
                <div className="ml-3">
                  <div className="text-white font-semibold">Rohit Sharma</div>
                  <div className="text-gray-400 text-sm">
                    Property Owner, Mumbai
                  </div>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
      {/* Right Side - Login Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-[#131515] rounded-xl">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-6">
            <div className="w-max py-2 px-8 bg-gradient-to-r from-gray-800 to-gray-700 shadow-sm rounded-lg mx-auto mb-4 flex items-center justify-center">
              <UsersRoundIcon className="w-4 h-4 text-white" />
              <p className="text-xl font-semibold font-sans text-white ml-2">
                Welcome Back
              </p>
            </div>

            <p className="text-gray-600 text-sm">
              Please enter your credentials to login...
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Phone email Field */}

            <div className="space-y-4">
              {/* Phone email Field */}
              <div className="flex items-center bg-white rounded-md p-[0.2px] border border-l[#131515] overflow-hidden">
                <label
                  htmlFor="email"
                  className="whitespace-nowrap xl:w-60 w-64 xl:text-md px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-sm font-medium text-slate-400 rounded-md"
                >
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-transparent w-full px-3 py-2 outline-none text-black placeholder-gray-400 focus:placeholder-gray-300 hover:bg-white/80 text-ellipsis"
                />
              </div>

              {/* Password Field */}
              <div className="flex items-center bg-white rounded-md p-[0.2px] border border-l[#131515] overflow-hidden">
                <label
                  htmlFor="password"
                  className="whitespace-nowrap xl:w-60 w-64 xl:text-md px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-sm font-medium text-slate-400 rounded-md"
                >
                  Secure Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  required
                  placeholder="Enter your secure password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-transparent w-full px-3 py-2 outline-none text-black placeholder-gray-400 focus:placeholder-gray-300 hover:bg-white/80 text-ellipsis"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-slate-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm font-medium text-slate-600 hover:text-slate-400 transition-colors duration-200"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 px-4 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Login"
              )}
            </button>

            {/* Divider */}
            <div className="flex justify-center text-xs">
              <span className="px-2  text-gray-500">Or continue with</span>
            </div>

            {/* Social Login */}
            <button
              type="button"
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transform hover:scale-[1.02] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 " viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </div>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-3 text-center">
            <p className="text-gray-600 text-xs">
              Don't have an account?{" "}
              <button
                className="font-medium text-green-500 hover:text-green-700 transition-colors duration-200 text-sm"
                onClick={handleRegister}
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
