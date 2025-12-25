import React, { useRef } from "react";
import { motion } from "framer-motion";
import { colors } from "./Colors";
import { Headset } from "lucide-react";
import gsap from "gsap";

const ConnectAnimation = () => {
  const buttonRef = useRef(null);
  const iconRef = useRef(null);
  const textRef = useRef(null);

  const handleClick = () => {
    gsap.to(iconRef.current, {
      scale: 1.5,
      x: "-25px",
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
      className="flex items-center text-zinc-800 bg-green-200 border border-green-300 hover:bg-green-300  rounded-md p-[4px] overflow-hidden"
      onClick={handleClick}
      ref={buttonRef}
    >
      <span ref={textRef} className="transition-all duration-300">
        Connect
      </span>
      <Headset ref={iconRef} className="size-3 ml-1" />
    </motion.button>
  );
};

export default ConnectAnimation;
