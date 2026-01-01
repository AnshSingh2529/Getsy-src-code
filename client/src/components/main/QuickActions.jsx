import { Home, Award, Users, Building } from "lucide-react";
import { motion } from "framer-motion";

const actions = [
  { icon: Home, label: "New Listings", color: "blue" },
  { icon: Award, label: "Top Rated", color: "green" },
  { icon: Users, label: "Most Viewed", color: "purple" },
  { icon: Building, label: "Luxury", color: "orange" },
];

export default function QuickActions() {
  return (
    <div className="grid md:grid-cols-2 md:gap-3 grid-cols-4 gap-2">
      {actions.map(({ icon: Icon, label, color }) => (
        <motion.button
          key={label}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className={`bg-gradient-to-r from-${color}-600/20 to-${color}-500/20 border border-${color}-500/30 rounded-lg p-3 text-${color}-400 hover:text-${color}-300 transition-all flex flex-col items-center gap-2`}
        >
          <Icon className="w-5 h-5" />
          <span className="text-xs">{label}</span>
        </motion.button>
      ))}
    </div>
  );
}
