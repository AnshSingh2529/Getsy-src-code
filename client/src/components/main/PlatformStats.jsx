import { motion } from "framer-motion";
import { Users, Building2, TrendingUp, Award } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "500+",
    label: "Active Firms & Brokers",
  },
  {
    icon: Users,
    value: "10K+",
    label: "Properties Listed",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Client Satisfaction",
  },
  {
    icon: Award,
    value: "24/7",
    label: "Dedicated Support",
  },
];

const PlatformStats = () => {
  return (
    <section className="border border-gray-800/30 rounded-lg p-2 ">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="grid grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-4"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group"
            >
              <div className="h-full rounded-xl border border-gray-800 bg-gray-900/60 p-5 transition-all duration-300 hover:border-gray-700 hover:bg-gray-900 ">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors" />
                </div>

                <div className="text-sm lg:text-base font-semibold text-gray-100 tracking-tight">
                  {stat.value}
                </div>

                <div className="mt-1 text-xs text-gray-400">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default PlatformStats;
