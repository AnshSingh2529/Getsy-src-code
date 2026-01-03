import { Home, Award, Users, Building } from "lucide-react";
import { motion } from "framer-motion";

const actions = [
  { icon: Home, label: "New Listings", color: "blue" },
  { icon: Award, label: "Top Rated", color: "green" },
  { icon: Users, label: "Most Viewed", color: "purple" },
  { icon: Building, label: "Luxury", color: "orange" },
];
const colorMap = {
  blue: {
    bg: "from-blue-600/20 to-blue-500/20",
    border: "border-blue-800/30",
    text: "text-blue-400 hover:text-blue-300",
  },
  green: {
    bg: "from-green-600/20 to-green-500/20",
    border: "border-green-500/30",
    text: "text-green-400 hover:text-green-300",
  },
  purple: {
    bg: "from-purple-600/20 to-purple-500/20",
    border: "border-purple-500/30",
    text: "text-purple-400 hover:text-purple-300",
  },
  orange: {
    bg: "from-orange-600/20 to-orange-500/20",
    border: "border-orange-500/30",
    text: "text-orange-400 hover:text-orange-300",
  },
};

export default function QuickActions() {
  return (
    <div className="grid md:grid-cols-2 md:gap-3 grid-cols-4 gap-2">
      {actions.map(({ icon: Icon, label, color }) => {
        const styles = colorMap[color];

        return (
          <motion.button
            key={label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              bg-gradient-to-r ${styles.bg}
              ${styles.border}
              ${styles.text}
              rounded-lg p-3
              transition-all
              flex flex-col items-center gap-2
            `}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
