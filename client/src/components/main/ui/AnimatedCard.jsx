import { motion } from "framer-motion";

export default function AnimatedCard({ delay = 0, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
    >
      {children}
    </motion.div>
  );
}
