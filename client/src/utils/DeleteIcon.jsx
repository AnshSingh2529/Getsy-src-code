import React, { useRef } from "react";
import { Trash2 } from "lucide-react";
import { gsap } from "gsap";

const InteractiveTrashIcon = () => {
  const trashRef = useRef(null);
  const lidRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(lidRef.current, {
      rotateX: -90,
      duration: 0.4,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(lidRef.current, {
      rotateX: 0,
      duration: 0.3,
      ease: "power1.in",
    });
  };

  const handleClick = () => {
    const trash = trashRef.current;

    gsap.to(trash, {
      x: -200,
      opacity: 0,
      duration: 0.6,
      scale: 2,
      ease: "power2.out",
    });

    setTimeout(() => {
      
    }, 1000);
  };

  return (
    <div
      ref={trashRef}
      className="relative inline-block text-red-500 cursor-pointer"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Trash2 size={15} />
      <div
        ref={lidRef}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-500 w-2 h-1 rounded-t-xl"
      ></div>
    </div>
  );
};

export default InteractiveTrashIcon;
