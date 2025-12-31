import { useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaImage } from "react-icons/fa6";
import { motion } from "framer-motion";
import RentPriceAndCharges from "../../pages/postProperty/components/RentPriceAndCharges.jsx";
import RentAdditionalDetails from "../../pages/postProperty/components/RentAdditionalDetails.jsx";
import CustomSelect from "../../pages/postProperty/components/CustomSelect.jsx";
import { colors } from "../../utils/Colors.js";

const PostProperty = () => {
  const [selectedUnitType, setSelectedUnitType] = useState(""); // Start with empty string
  const [unitName, setUnitName] = useState("");

  const unitType = [{ value: "for-rent", label: "For Rent" }];
  const PriceAndChargesComponent = ({ type }) => {
    if (type === "for-rent") return <RentPriceAndCharges />;
    return null;
  };

  // Component to render appropriate additional details based on unit type
  const AdditionalDetailsComponent = ({ type }) => {
    if (type === "for-rent") return <RentAdditionalDetails />;
    return null;
  };

  return (
    // Outer container
    <form
      className="w-full min-h-screen flex flex-col xl:flex-row gap-4 lg:gap-6 text-gray-200 p-2 sm:p-4 lg:p-6 rounded-md bg-gray-800/50 border-gray-600"
      // style={{ backgroundColor: colors.buttonbackground }}
    >
      {/* Main Form Container */}
      <div className="flex-1 w-full max-w-none xl:max-w-4xl">
        {/* Heading */}
        <div className="flex space-x-2 items-center mb-4 sm:mb-6">
          <div className="h-6 w-[2px] bg-[#131515]"></div>
          <h1 className="text-2xl xl:text-3xl font-bold text-white mb-2">
            Post Property
          </h1>
        </div>

        {/* Inner container */}
        <div
          className="bg-[#131515] rounded-xl lg:rounded-2xl shadow-lg 
                p-3 sm:p-4 lg:p-6  
                min-h-screen max-h-screen 
                overflow-y-scroll scrollbar-hide  
                lg:h-screen lg:overflow-y-auto xl:h-screen xl:overflow-y-auto
                pb-40 lg:pb-44 xl:pb-48"
        >
          <div className="space-y-6 lg:space-y-8">
            {/* Section: Unit Information */}
            <section>
              <h2 className="text-sm lg:text-base font-semibold text-gray-300 mb-4">
                Unit Information
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* Unit Name */}
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-1">
                    Unit name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-700 rounded-lg px-3 py-2 sm:py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-[#3a6ea5] transition-colors"
                    placeholder="Enter unit name"
                    style={{ backgroundColor: colors.buttonbackground }}
                  />
                </div>

                {/* Unit Type */}
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-1">
                    Unit type <span className="text-red-400">*</span>
                  </label>
                  <CustomSelect
                    options={unitType}
                    selectedValue={selectedUnitType}
                    onSelect={setSelectedUnitType}
                    placeholder="Select unit type"
                    clearable={true}
                  />
                </div>
              </div>

              {/* Upload Image */}
              <div className="mt-6">
                <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-2">
                  Unit image <span className="text-red-400">*</span>
                </label>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center w-full sm:w-32 h-24 sm:h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <FaImage size={20} className="text-[#3a6ea5] mb-2" />
                  <p className="text-xs text-gray-500 text-center leading-4 px-2">
                    Upload or drag a photo
                  </p>
                </motion.div>
              </div>
            </section>

            <hr className="border-gray-800" />

            {/* Section: Unit Location */}
            <section>
              <h2 className="text-sm lg:text-base font-semibold text-gray-300 mb-4">
                Unit Location
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-1">
                    Street address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 sm:py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-[#3a6ea5] transition-colors"
                    placeholder="Enter street address"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-1">
                      Unit number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 sm:py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-[#3a6ea5] transition-colors"
                      placeholder="Unit number"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-1">
                      Zip code <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 sm:py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-[#3a6ea5] transition-colors"
                      placeholder="Zip code"
                    />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-1">
                      State <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 sm:py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-[#3a6ea5] transition-colors"
                      placeholder="State"
                    />
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-gray-800" />

            {/* Section: Pricing */}
            <section>
              <h2 className="text-sm lg:text-base font-semibold text-gray-300 flex flex-wrap items-center gap-1 mb-4">
                Price & Charges
                <span className="text-xs text-gray-500 font-normal">
                  (if applicable)
                </span>
              </h2>
              <PriceAndChargesComponent type={selectedUnitType} />
            </section>

            <hr className="border-gray-800" />

            {/* Section: Additional Info */}
            <section>
              <h2 className="text-sm lg:text-base font-semibold text-gray-300 flex flex-wrap items-center gap-1 mb-4">
                Additional Information
                <span className="text-xs text-gray-500 font-normal">
                  (required)
                </span>
              </h2>
              <AdditionalDetailsComponent type={selectedUnitType} />
            </section>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 pb-6 xl:pb-0">
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto px-6 py-2.5 sm:py-2 font-normal bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg transition-all duration-200 text-white text-sm rounded-lg  hover:bg-[#18426f] "
              >
                Submit Property
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Preview Sidebar */}
      <div className="w-full xl:w-80 xl:flex-shrink-0">
        <div className="sticky top-4">
          <div className="flex items-center text-sm sm:text-base font-medium text-gray-300 mb-3">
            <span>Quick Preview</span>
            <AiFillQuestionCircle className="ml-2 text-gray-400" />
          </div>

          <div className="bg-[#131515] rounded-lg shadow-lg p-4 min-h-[200px] sm:min-h-[300px] xl:min-h-[400px]">
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-sm text-center">
                Property preview will appear here as you fill the form
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostProperty;
