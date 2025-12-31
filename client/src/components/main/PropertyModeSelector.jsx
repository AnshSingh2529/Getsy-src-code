import React, { useState } from "react";
import { Home, Key, Building2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PropertyModeSelector = () => {
  const [activeMode, setActiveMode] = useState(null);
  const navigate = useNavigate();

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    navigate(`/property-view/common?mode=${mode}`);
  };

  const modes = [
    {
      mode: "rent",
      label: "Rent",
      icon: <Key className="w-5 h-5 text-emerald-400" />,
      gradient: "from-emerald-500/10 to-teal-500/5",
      ring: "ring-emerald-400/30",
    },
    {
      mode: "buy",
      label: "Buy",
      icon: <Home className="w-5 h-5 text-blue-400" />,
      gradient: "from-blue-500/10 to-indigo-500/5",
      ring: "ring-blue-400/30",
    },
    {
      mode: "lease",
      label: "Lease",
      icon: <Building2 className="w-5 h-5 text-purple-400" />,
      gradient: "from-purple-500/10 to-indigo-500/5",
      ring: "ring-purple-400/30",
    },
    {
      mode: "bachelor-students",
      label: "Bachelor / Students",
      icon: <Users className="w-5 h-5 text-fuchsia-400" />,
      gradient: "from-fuchsia-500/10 to-pink-500/5",
      ring: "ring-fuchsia-400/30",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {modes.map(({ mode, label, icon, gradient, ring }) => (
          <div
            key={mode}
            onClick={() => handleModeChange(mode)}
            className={`relative group cursor-pointer flex flex-col items-center justify-center gap-2 px-3 py-3 rounded-xl border transition-all duration-300 text-sm font-medium backdrop-blur-sm ${
              activeMode === mode
                ? `text-white bg-gradient-to-br ${gradient} border-transparent ring-2 ${ring} shadow-md`
                : "text-gray-300 border-gray-700 hover:border-gray-500 hover:text-white hover:bg-gray-800/40"
            }`}
          >
            <div className="flex items-center justify-center">{icon}</div>
            <span className="text-center">{label}</span>

            {activeMode === mode && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PropertyModeSelector;
