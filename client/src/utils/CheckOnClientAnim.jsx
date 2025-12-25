import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { colors } from "./Colors";
import { Handshake } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CheckOnClient = () => {
  const buttonRef = useRef(null);
  const iconRef = useRef(null);
  const textRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    gsap.to(iconRef.current, {
      scale: 1.5,
      x: "50px",
      duration: 0.4,
      ease: "power3.inOut",
    });

    gsap.to(textRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power3.inOut",
    });
    setTimeout(() => {
      navigate("/owner-dashboard/check-clients");
    }, 1000);
  };
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className="flex items-center rounded-md py-2 px-8 overflow-hidden bg-blue-200 text-zinc-800 border border-blue-300"
      onClick={handleClick}
      ref={buttonRef}
    >
      <Handshake ref={iconRef} className="size-4 mr-1" />
      <span ref={textRef} className="transition-all duration-300">
        Check your client
      </span>
    </motion.button>
  );
};

export default CheckOnClient;
