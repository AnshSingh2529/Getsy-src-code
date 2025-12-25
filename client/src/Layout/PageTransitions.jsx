// Layout/PageTransition.jsx
import { motion } from "framer-motion";

const PageTransition = ({ children, keyProp, isFullHeightRoute, navbarHeight }) => {
  return (
    <motion.div
      key={keyProp}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      className={`w-full ${
        isFullHeightRoute ? `min-h-[calc(100vh-${navbarHeight}px)]` : "min-h-[60vh]"
      }`}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
