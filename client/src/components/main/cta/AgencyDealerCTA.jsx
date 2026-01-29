import { Building2, Briefcase } from "lucide-react";

const AgencyDealerCTA = ({ compact = false }) => {
  const basePadding = compact ? "px-4 py-2" : "px-6 py-4";

  return (
    <div className="flex flex-wrap gap-3">
      {/* Register Agency */}
      <button
        className={`group relative ${basePadding} bg-gradient-to-r from-green-800 text-white font-semibold rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-emerald-700`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center gap-3">
          <Building2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span>Register Your Firm</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </button>

      {/* Become Dealer */}
      <button
        className={`group relative ${basePadding} bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-700`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center gap-3">
          <Briefcase className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span>Become Solo Broker</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default AgencyDealerCTA;
