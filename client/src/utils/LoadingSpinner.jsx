import React from "react";
import { motion } from "framer-motion";
import { ActivityIcon } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className=" flex items-center justify-center relative overflow-hidden">
      <motion.div
        className="outine-none flex items-center justify-center w-8 h-8 border-4  border-t-4 border-t-transparent border-b-4 border-b-transparent rounded-full"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{
          rotate: { repeat: Infinity, duration: 1, ease: "linear" },
          scale: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
        }}
      >
        <ActivityIcon />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
