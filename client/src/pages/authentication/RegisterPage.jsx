import React, { useState } from "react";
import {
  Users,
  Shield,
  Zap,
  TrendingUp,
  CheckCircle,
  UserPlus,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../api/services/authApi"; // ✅ RTK Query hook

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirm: "",
    role: "", // added role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showpassword_confirm, setShowpassword_confirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const navigate = useNavigate();
  const [register, { isLoading, isError, error }] = useRegisterMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("Please agree to the Terms and Privacy Policy.");
      return;
    }

    if (formData.password !== formData.password_confirm) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        password_confirm: formData.password_confirm,
        role: formData.role, // only send if selected
      }).unwrap();

      console.log("Registration successful:", res);
      navigate("/auth/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const handleLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className="flex md:min-h-screen items-start justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 shadow-sm rounded-lg p-5">
      {/* Left Side - Value Proposition */}
      <div className="hidden md:flex md:flex-col items-start justify-center ml-5 md:h-auto w-3/5 pr-8">
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-white leading-tight mb-4">
              Join the Future of <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-3xl">
                Real Estate in just One Click
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Thousands of agents and property owners trust our platform to:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                Get verified and build trust with clients.
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                Showcase and manage properties securely.
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                Collaborate seamlessly with agents and owners.
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Shield className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Verified Network
              </h3>
              <p className="text-gray-300 text-sm">
                Only trusted agents & owners gain access.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Zap className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Fast Onboarding
              </h3>
              <p className="text-gray-300 text-sm">
                Register in minutes and start managing properties instantly.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Users className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Connect & Grow
              </h3>
              <p className="text-gray-300 text-sm">
                Network with agents & owners across multiple cities.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <TrendingUp className="w-8 h-8 text-yellow-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Smart Insights
              </h3>
              <p className="text-gray-300 text-sm">
                Access market analytics to make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#131515] rounded-xl">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="w-max py-2 px-8 bg-gradient-to-r from-gray-800 to-gray-700 shadow-sm rounded-lg mx-auto mb-4 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-white" />
              <p className="text-xl font-semibold font-sans text-white ml-2">
                Create your account
              </p>
            </div>
            <p className="text-gray-600 text-sm">
              New User? Please register to start exploring...
            </p>
          </div>

          {/* Sign Up Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="flex items-center bg-white rounded-md overflow-hidden p-[0.2px] border border-l[#131515]">
              <label
                htmlFor="name"
                className="whitespace-nowrap xl:w-60 w-64 xl:text-md px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-sm font-medium text-slate-400 rounded-md"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-transparent w-full px-3 py-2 outline-none text-black placeholder-gray-400 focus:placeholder-gray-300 hover:bg-white/80"
              />
            </div>

            {/* Email Field */}
            <div className="flex items-center bg-white rounded-md overflow-hidden p-[0.2px] border border-l[#131515]">
              <label
                htmlFor="email"
                className="whitespace-nowrap xl:w-60 w-64 xl:text-md px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-sm font-medium text-slate-400 rounded-md"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-transparent w-full px-3 py-2 outline-none text-black placeholder-gray-400 focus:placeholder-gray-300 hover:bg-white/80"
              />
            </div>

            {/* phone Field */}
            <div className="flex items-center bg-white rounded-md overflow-hidden p-[0.2px] border border-l[#131515]">
              <label
                htmlFor="phone"
                className="whitespace-nowrap xl:w-60 w-64 xl:text-md px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-sm font-medium text-slate-400 rounded-md"
              >
                Phone phone
              </label>
              <input
                type="tel"
                id="phone"
                autoComplete="phone"
                name="phone"
                required
                placeholder="Enter your phone phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-transparent w-full px-3 py-2 outline-none text-black placeholder-gray-400 focus:placeholder-gray-300 hover:bg-white/80"
              />
            </div>

            {/* Role Dropdown */}
            <div className="flex items-center bg-white rounded-md overflow-hidden p-[0.2px] border border-l[#131515] relative">
              <label
                htmlFor="role"
                className="whitespace-nowrap xl:w-60 w-64 xl:text-md px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-sm font-medium text-slate-400 rounded-md"
              >
                Role (Optional)
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={`appearance-none bg-transparent w-full px-3 py-2 pr-10 outline-none text-${
                  formData.role ? "black" : "gray-400"
                } hover:bg-white/80`}
              >
                <option value="user">None</option>
                <option value="dealer">Dealer</option>
                <option value="agency">Agency</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Password Field */}
            <div className="flex items-center bg-white rounded-md overflow-hidden p-[0.2px] border border-l[#131515]">
              <label
                htmlFor="password"
                className="whitespace-nowrap xl:w-60 w-64 xl:text-md px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-sm font-medium text-slate-400 rounded-md"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                name="password"
                required
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleInputChange}
                className="bg-transparent w-full px-3 py-2 outline-none text-black placeholder-gray-400 focus:placeholder-gray-300 hover:bg-white/80"
              />
              <button
                type="button"
                className="px-2 py-2 bg-[#131515] rounded-md"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="flex items-center bg-white rounded-md overflow-hidden p-[0.2px] border border-l[#131515]">
              <label
                htmlFor="password_confirm"
                className="whitespace-nowrap xl:w-60 w-64 xl:text-md px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-sm font-medium text-slate-400 rounded-md"
              >
                Confirm
              </label>
              <input
                type={showpassword_confirm ? "text" : "password"}
                id="password_confirm"
                autoComplete="new-password"
                name="password_confirm"
                required
                placeholder="Confirm your password"
                value={formData.password_confirm}
                onChange={handleInputChange}
                className="bg-transparent w-full px-3 py-2 outline-none text-black placeholder-gray-400 focus:placeholder-gray-300 hover:bg-white/80"
              />
              <button
                type="button"
                className="px-2 py-2 bg-[#131515] rounded-md"
                onClick={() => setShowpassword_confirm(!showpassword_confirm)}
              >
                {showpassword_confirm ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <input
                id="agree-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-emerald-600 border-gray-300 rounded"
              />
              <label
                htmlFor="agree-terms"
                className="ml-3 block text-sm text-gray-400"
              >
                I agree to the{" "}
                <button
                  type="button"
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-700 to-green-600 text-white py-3 px-4 rounded-xl font-medium hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating account...
                </div>
              ) : (
                "Create account"
              )}
            </button>

            {/* Error */}
            {isError && (
              <p className="text-red-500 text-sm mt-2">
                {error?.data?.message ||
                  "Registration failed. Please try again."}
              </p>
            )}
          </form>

          {/* Divider */}
          <div className="flex justify-center my-4">
            <span className="px-2 text-gray-500 text-xs">Or continue with</span>
          </div>

          {/* Social Login */}
          <button
            type="button"
            className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transform hover:scale-[1.02] transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-center">
              {/* Google Icon */}
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
                onClick={handleLogin}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
