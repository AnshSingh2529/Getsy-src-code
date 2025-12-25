// Layout/DrawerContainer.jsx
import { AnimatePresence, motion } from "framer-motion";
import ShowUserProfile from "../components/cards/profile/ShowUserProfile.jsx";

const DrawerContainer = ({ isOpen, isMobile, navbarHeight, toggleDrawer, closeDrawer }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeDrawer}
            style={{ top: navbarHeight }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: isMobile ? "100%" : "400px", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isMobile ? "100%" : "400px", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.4,
            }}
            className="fixed right-0 z-50"
            style={{
              top: navbarHeight,
              height: `calc(100vh - ${navbarHeight}px)`,
            }}
          >
            <ShowUserProfile isOpen={isOpen} toggleDrawer={toggleDrawer} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DrawerContainer;
