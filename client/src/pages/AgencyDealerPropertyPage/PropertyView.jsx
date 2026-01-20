import { HeartHandshakeIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

function PropertyView({
  prop_image,
  prop_title,
  prop_price,
  prop_area,
  prop_measure,
  prop_name,
}) {
  return (
    <div className="flex flex-col space-y-2 flex-1 border border-gray-800/20 shadow-inner shadow-gray-800/40 p-1 rounded-md bg-gray-800/20 cursor-pointer">
      {/* Property Photos Slider */}
      <div className="relative flex items-start justify-center  bg-gray-900/30 rounded-md p-0  shadow-inner shadow-gray-900/30 border border-gray-950 w-56 h-28 overflow-hidden">
        <img
          src={prop_image}
          alt={prop_name}
          className="w-full h-full object-cover hover:scale-[1.09]"
        />
        {/* Interested Tag */}
        <motion.span
          whileTap={{ scale: 0.7 }}
          className="absolute top-1 right-1 bg-gray-800/20 border hover:border hover:border-white border-gray-800/20 shadow-inner shadow-gray-100/70 rounded-full p-2 text-[5px] text-gray-600 cursor-pointer hover:bg-red-800"
        >
          <HeartHandshakeIcon color="white" width={14} height={14} />
        </motion.span>
      </div>
      {/* Property Title and Details */}
      <div className="flex flex-col space-y-2 w-56">
        {/* search bhk title */}
        <p className="text-[8px] text-gray-400 font-normal truncate">
          {prop_title}
        </p>
        {/* price and area */}
        <div className="flex items-center justify-between space-x-2 bg-gray-800/30 rounded-sm p-1 border border-gray-800 w-full">
          {/* price */}
          <p className="text-sm text-gray-300 font-medium">{prop_price}</p>
          {/* divider */}
          <div className="w-[1px] h-5 bg-gray-800/80"></div>
          {/* Area with measure */}
          <div className="flex items-center flex-1 justify-center space-x-2">
            {" "}
            <span className="text-xs font-normal text-gray-400">
              {prop_area}
            </span>
            <span className="text-[6px] font-normal text-gray-400">
              {prop_measure}
            </span>
          </div>
        </div>
        {/* Property Title/Name */}
        <div className="truncate w-full text-xs text-gray-400">{prop_name}</div>
        {/* Other small details */}
        <div className="flex items-center justify-center text-xs bg-gray-800/70 rounded-sm p-1 text-gray-400">
          Ready to move
        </div>
      </div>
    </div>
  );
}

export default PropertyView;
