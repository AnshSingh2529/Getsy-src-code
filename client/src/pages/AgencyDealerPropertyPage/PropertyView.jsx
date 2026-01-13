import { HeartHandshakeIcon } from "lucide-react";
import React from "react";

function PropertyView() {
  return (
    <div className="flex flex-col space-y-2 flex-1 border border-gray-800/20 shadow-inner shadow-gray-800/40 p-1 rounded-md bg-gray-800/20">
      {/* Property Photos Slider */}
      <div className="relative flex items-start justify-center  bg-gray-900/30 rounded-md p-0  shadow-inner shadow-gray-900/30 border border-gray-950 w-56 h-28">
        Property Photos
        {/* Interested Tag */}
        <span className="absolute top-1 right-1 bg-gray-800/20 border border-gray-700 rounded-full p-1 text-[5px] text-gray-600 cursor-pointer hover:bg-red-800">
          <HeartHandshakeIcon color="white" width={14} height={14} />
        </span>
      </div>
      {/* Property Title and Details */}
      <div className="flex flex-col space-y-2 w-56">
        {/* search bhk title */}
        <p className="text-[8px] text-gray-400 font-normal">Title 2 Bhk</p>
        {/* price and area */}
        <div className="flex items-center justify-between space-x-2 bg-gray-800/30 rounded-sm p-1 border border-gray-800 w-full">
          {/* price */}
          <p className="text-sm text-gray-300 font-medium">Rs.70 lac</p>
          {/* divider */}
          <div className="w-[1px] h-5 bg-gray-800/80"></div>
          {/* Area with measure */}
          <div className="flex items-center flex-1 justify-center space-x-2">
            {" "}
            <span className="text-xs font-normal text-gray-400">1200</span>
            <span className="text-[6px] font-normal text-gray-400">sqft</span>
          </div>
        </div>
        {/* Property Title/Name */}
        <div className="truncate w-full text-xs text-gray-400">
          Property Name...
        </div>
        {/* Other small details */}
        <div className="flex items-center justify-center text-xs bg-gray-800/70 rounded-sm p-1 text-gray-400">
          Ready to move
        </div>
      </div>
    </div>
  );
}

export default PropertyView;
