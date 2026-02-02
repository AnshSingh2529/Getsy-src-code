import { Users, Building2, TrendingUp, Award } from "lucide-react";

const stats = [
  { icon: Building2, value: "500+", label: "Active Firms & Brokers" },
  { icon: Users, value: "10K+", label: "Properties Listed" },
  { icon: TrendingUp, value: "95%", label: "Client Satisfaction" },
  { icon: Award, value: "24/7", label: "Dedicated Support" },
];

const PlatformStats = () => {
  return (
    <section className="w-full border border-gray-800/40 rounded-lg bg-gray-900/40">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div key={index} className="p-4 bg-gray-900/60">
              <Icon className="w-4 h-4 text-gray-500 mb-3" />

              <div className="text-lg font-semibold text-gray-100">
                {stat.value}
              </div>

              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PlatformStats;
