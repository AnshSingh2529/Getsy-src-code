import { motion } from "framer-motion";

const PageTransition = ({
  children,
  keyProp,
  isFullHeightRoute,
  navbarHeight = 0,
}) => {
  return (
    <motion.div
      key={keyProp}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full"
      style={{
        minHeight: isFullHeightRoute
          ? `calc(100vh - ${navbarHeight}px)`
          : "60vh",
        paddingTop: navbarHeight,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
