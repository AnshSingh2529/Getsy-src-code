import React from "react";
import PropertyView from "./PropertyView";
import { motion } from "framer-motion";

function PropertySection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.80 }}
      className="grid grid-cols-3 grid-rows-2 p-3 gap-4"
    >
      <PropertyView />
    </motion.div>
  );
}

export default PropertySection;
