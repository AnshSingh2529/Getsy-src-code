// Layout/NavbarContainer.jsx
import { motion } from "framer-motion";
import { Navbar } from "../components/Navbar.jsx";

const NavbarContainer = ({ navbarHeight, scrollY, toggleDrawer }) => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 w-full"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ height: navbarHeight }}
    >
      <div
        className={`h-full w-full transition-all duration-300 ${
          scrollY > 50
            ? "backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-lg"
            : "bg-white dark:bg-gray-900 shadow-sm"
        }`}
      >
        <Navbar toggleDrawer={toggleDrawer} />
      </div>
    </motion.nav>
  );
};

export default NavbarContainer;
