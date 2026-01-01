import React, { useState } from "react";
import { Lock, Home } from "lucide-react";

export function GetsyAuthPage({ tokenValid }) {
  // const [isFailMode] = useState(false);
  const currentYear = new Date().getFullYear();
  const content = {
    "auth-required": {
      heading: "Authentication Required",
      description: "Please sign in to access this page.",
    },
    "session-expired": {
      heading: "Session Expired",
      description:
        "Your session has expired. Please sign in again to continue.",
    },
  };

  const [pageState, setPageState] = useState(
    tokenValid ? "auth-required" : "session-expired"
  );

  const currentContent = content[pageState];
  const handleGoogleSignIn = () => {
    // Integrate with Google OAuth flow
    console.log("Initiating Google Sign-In...");
    // window.location.href = '/auth/google';
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  // const handleDemoLogin = (role) => {
  //   console.log(`Demo login as: ${role}`);
  // Simulate role-based login
  // window.location.href = `/demo-login?role=${role}`;
  // };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center p-4">
      {/* Subtle Texture Overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />

      {/* Soft Gradient Orbs */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl" />

      {/* Main Content Card */}
      <div className="relative z-10 max-w-md w-full animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-10">
          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Lock className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="text-center mb-8 space-y-3">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {currentContent.heading}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              {currentContent.description}
            </p>
          </div>

          {/* Primary Action - Google Sign-In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 hover:border-slate-400 px-6 py-4 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
            <span>Continue with Google</span>
          </button>

          {/* Secondary Action - Go Home */}
          <button
            onClick={handleGoHome}
            className="w-full flex items-center justify-center gap-2 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-6 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </button>

          {/* Demo Section (Only in Demo Mode) */}
          {/* {isFailMode && (
            <>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 text-xs font-medium text-slate-500 bg-white uppercase tracking-wider">
                    Quick Login
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {["user", "agency", "dealer"].map((role) => (
                  <button
                    key={role}
                    onClick={() => handleDemoLogin(role)}
                    className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-lg transition-all duration-200 capitalize focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </>
          )} */}
        </div>

        {/* Brand Footer & State Toggle (Demo) */}
        <div className="mt-8 text-center space-y-3">
          <p className="flex justify-center text-xs text-gray-500 text-center md:text-left">
            &copy; {currentYear} Getsy. All rights reserved. Made with care in
            India.
          </p>

          {/* State Toggle for Demo */}
          <button
            onClick={() =>
              setPageState(
                pageState === "auth-required"
                  ? "session-expired"
                  : "auth-required"
              )
            }
            className="text-xs text-slate-400 hover:text-slate-600 underline transition-colors"
          >
            Toggle:{" "}
            {pageState === "auth-required"
              ? "Show Session Expired"
              : "Show Auth Required"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
