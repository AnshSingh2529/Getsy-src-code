// Layout/FooterContainer.jsx
import { motion } from "framer-motion";
import { Footer } from "../components/footer/Footer.jsx";

const FooterContainer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div>
        <Footer />
      </div>
    </motion.footer>
  );
};

export default FooterContainer;
