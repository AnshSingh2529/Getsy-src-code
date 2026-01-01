import React from "react";
import { ArrowLeft } from "lucide-react";

export default function Getsy404Page() {
  const handleBackHome = () => {
    window.location.href = "/";
  };
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Textured Background Layer */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Gradient Orbs for Depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Main Content Card */}
      <div className="relative z-10 max-w-2xl w-full animate-fadeIn">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-12 md:p-16">
          {/* Large 404 Display */}
          <div className="mb-8">
            <h1
              className="text-9xl md:text-[12rem] font-bold leading-none tracking-tighter bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              404
            </h1>
          </div>

          {/* Primary Message - English */}
          <div className="mb-6 space-y-2">
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
              Page Not Found
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              The page you're trying to reach doesn't exist or may have been
              moved.
            </p>
          </div>

          {/* Secondary Message - Hindi */}
          <div className="mb-10 space-y-2 pb-10 border-b border-white/10">
            <h3 className="text-2xl md:text-3xl font-medium text-slate-200 tracking-tight">
              यह पेज उपलब्ध नहीं है
            </h3>
            <p className="text-base text-slate-400 leading-relaxed">
              जिस पेज को आप ढूंढ रहे हैं, वह मौजूद नहीं है या स्थानांतरित किया
              जा चुका है।
            </p>
          </div>

          {/* Navigation Button */}
          <button
            onClick={handleBackHome}
            className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-sm font-semibold">Back to Home</span>
              <span className="text-xs opacity-90">होम पेज पर वापस जाएं</span>
            </span>
          </button>
        </div>

        {/* Brand Subtle Footer */}
        <div className="mt-8 text-center">
          <p className="flex justify-center text-xs text-gray-500 text-center md:text-left">
            &copy; {currentYear} Getsy. All rights reserved. Made with care in
            India.
          </p>
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
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
