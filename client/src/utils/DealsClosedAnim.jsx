import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { colors } from "./Colors";
import { CheckCheck } from "lucide-react";

const DealsClosedAnim = () => {
  const buttonRef = useRef(null);
  const iconRef = useRef(null);
  const textRef = useRef(null);

  const handleClick = () => {
    gsap.to(iconRef.current, {
      scale: 1.5,
      x: "-220%",
      duration: 0.3,
      ease: "power3.inOut",
    });

    gsap.to(textRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power3.inOut",
    });
    setTimeout(() => {}, 1000);
  };
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className="flex items-center rounded-md p-[4px] overflow-hidden bg-blue-200 border border-blue-300"
      onClick={handleClick}
      ref={buttonRef}
    >
      <span ref={textRef} className="transition-all duration-300">
        Deal Close
      </span>
      <CheckCheck ref={iconRef} className="size-3 ml-1" />
    </motion.button>
  );
};

export default DealsClosedAnim;
