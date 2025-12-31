import React, { useState } from "react";
import { motion } from "framer-motion";
import { colors } from "../../../utils/Colors.js";
import CustomSelect from "./CustomSelect";

const SaleAdditionalDetails = () => {
  const [selectedAreaUnit, setSelectedAreaUnit] = useState("");
  const [selectedBHK, setSelectedBHK] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedFacing, setSelectedFacing] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedFurnishing, setSelectedFurnishing] = useState("");
  const [selectedParking, setSelectedParking] = useState("");
  const [propertyDescription, setPropertyDescription] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const areaUnits = [
    { value: "sq_ft", label: "Square Feet (sq.ft.)" },
    { value: "sq_yards", label: "Square Yards (sq.yards)" },
    { value: "sq_m", label: "Square Meters (sq.m.)" },
    { value: "grounds", label: "Grounds" },
    { value: "aankadam", label: "Aankadam" },
    { value: "rood", label: "Rood" },
    { value: "chataks", label: "Chataks" },
    { value: "perch", label: "Perch" },
    { value: "guntha", label: "Guntha" },
    { value: "ares", label: "Ares" },
    { value: "biswa", label: "Biswa" },
    { value: "acres", label: "Acres" },
    { value: "bigha", label: "Bigha" },
    { value: "kottah", label: "Kottah" },
    { value: "hectares", label: "Hectares" },
    { value: "marla", label: "Marla" },
    { value: "kanal", label: "Kanal" },
    { value: "cents", label: "Cents" },
  ];

  const bhkOptions = [
    { value: "1bhk", label: "1 BHK" },
    { value: "2bhk", label: "2 BHK" },
    { value: "3bhk", label: "3 BHK" },
    { value: "4bhk", label: "4 BHK" },
    { value: "5bhk", label: "5+ BHK" },
    { value: "studio", label: "Studio" },
    { value: "independent_house", label: "Independent House" },
  ];

  const propertyTypes = [
    { value: "apartment", label: "Apartment" },
    { value: "villa", label: "Villa" },
    { value: "independent_house", label: "Independent House" },
    { value: "builder_floor", label: "Builder Floor" },
    { value: "penthouse", label: "Penthouse" },
    { value: "duplex", label: "Duplex" },
    { value: "triplex", label: "Triplex" },
    { value: "plot", label: "Plot/Land" },
    { value: "farmhouse", label: "Farmhouse" },
  ];

  const facingOptions = [
    { value: "north", label: "North" },
    { value: "south", label: "South" },
    { value: "east", label: "East" },
    { value: "west", label: "West" },
    { value: "north_east", label: "North-East" },
    { value: "north_west", label: "North-West" },
    { value: "south_east", label: "South-East" },
    { value: "south_west", label: "South-West" },
  ];

  const floorOptions = [
    { value: "ground", label: "Ground Floor" },
    { value: "1", label: "1st Floor" },
    { value: "2", label: "2nd Floor" },
    { value: "3", label: "3rd Floor" },
    { value: "4", label: "4th Floor" },
    { value: "5", label: "5th Floor" },
    { value: "6", label: "6th Floor" },
    { value: "7", label: "7th Floor" },
    { value: "8", label: "8th Floor" },
    { value: "9", label: "9th Floor" },
    { value: "10+", label: "10+ Floor" },
  ];

  const furnishingOptions = [
    { value: "unfurnished", label: "Unfurnished" },
    { value: "semi_furnished", label: "Semi-Furnished" },
    { value: "fully_furnished", label: "Fully Furnished" },
  ];

  const parkingOptions = [
    { value: "no_parking", label: "No Parking" },
    { value: "1_car", label: "1 Car" },
    { value: "2_car", label: "2 Car" },
    { value: "3_car", label: "3+ Car" },
    { value: "bike_only", label: "Bike Only" },
    { value: "both", label: "Car & Bike" },
  ];

  const amenitiesList = [
    "Swimming Pool",
    "Gym",
    "Security",
    "Power Backup",
    "Lift/Elevator",
    "Garden/Park",
    "Club House",
    "Air Conditioning",
    "Modular Kitchen",
    "Servant Room",
    "Study Room",
    "Prayer Room",
    "Intercom",
    "Maintenance Staff",
    "Visitor Parking",
    "CCTV Surveillance",
    "Fire Safety",
    "Water Storage",
    "Waste Management",
    "Children's Play Area",
  ];

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-3 sm:p-4 lg:p-6 border border-gray-600 rounded-lg lg:rounded-xl mt-2"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center text-gray-300 text-sm sm:text-base font-medium mb-6"
      >
        <span>Area & Key Property Highlights</span>
        <span className="text-red-400 ml-1">*</span>
      </motion.div>

      <div className="space-y-6 lg:space-y-8">
        {/* Total Area Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-2">
            <span className="text-xs sm:text-sm text-gray-400 font-medium">
              Total area
            </span>
            <span className="text-red-400 ml-1">*</span>
          </div>
          <div
            className="flex justify-between items-center w-full rounded-lg border border-gray-700  focus-within:border-[#3a6ea5] transition-colors"
            style={{ backgroundColor: colors.buttonbackground }}
          >
            <input
              type="number"
              placeholder="Enter area"
              min="0"
              className="px-3 py-2 sm:py-2.5 text-sm text-gray-300 placeholder-gray-500 outline-none bg-transparent"
            />

            <CustomSelect
              options={areaUnits}
              selectedValue={selectedAreaUnit}
              onSelect={setSelectedAreaUnit}
              placeholder="Select unit"
              size="default"
              clearable
            />
          </div>
        </motion.div>

        {/* Primary Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* BHK Configuration */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-2">
              <span className="text-xs sm:text-sm text-gray-400 font-medium">
                BHK Configuration
              </span>
              <span className="text-red-400 ml-1">*</span>
            </div>
            <CustomSelect
              options={bhkOptions}
              selectedValue={selectedBHK}
              onSelect={setSelectedBHK}
              placeholder="Select BHK type"
            />
          </motion.div>

          {/* Property Type */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-2">
              <span className="text-xs sm:text-sm text-gray-400 font-medium">
                Property Type
              </span>
              <span className="text-red-400 ml-1">*</span>
            </div>
            <CustomSelect
              options={propertyTypes}
              selectedValue={selectedPropertyType}
              onSelect={setSelectedPropertyType}
              placeholder="Select property type"
            />
          </motion.div>
        </div>

        {/* Property Details Grid */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h4 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-2">
            Property Details
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Property Age */}
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-2">
                Property Age (Years)
              </label>
              <input
                type="number"
                min="0"
                placeholder="Age in years"
                className="w-full text-sm px-3 py-2 sm:py-2.5 rounded-lg outline-none caret-gray-200 text-gray-300 placeholder-gray-500 border border-gray-700 focus:border-[#3a6ea5] transition-colors"
                style={{ backgroundColor: colors.buttonbackground }}
              />
            </div>

            {/* Total Floors */}
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-2">
                Total Floors in Building
              </label>
              <input
                type="number"
                min="1"
                placeholder="Total floors"
                className="w-full text-sm px-3 py-2 sm:py-2.5 rounded-lg outline-none caret-gray-200 text-gray-300 placeholder-gray-500 border border-gray-700 focus:border-[#3a6ea5] transition-colors"
                style={{ backgroundColor: colors.buttonbackground }}
              />
            </div>

            {/* Floor Number */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-2">
                Floor Number
              </label>
              <CustomSelect
                options={floorOptions}
                selectedValue={selectedFloor}
                onSelect={setSelectedFloor}
                placeholder="Select floor"
              />
            </div>

            {/* Facing Direction */}
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-2">
                Facing Direction
              </label>
              <CustomSelect
                options={facingOptions}
                selectedValue={selectedFacing}
                onSelect={setSelectedFacing}
                placeholder="Select facing"
              />
            </div>

            {/* Furnishing Status */}
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-2">
                Furnishing Status
              </label>
              <CustomSelect
                options={furnishingOptions}
                selectedValue={selectedFurnishing}
                onSelect={setSelectedFurnishing}
                placeholder="Select furnishing"
              />
            </div>

            {/* Parking */}
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-2">
                Parking
              </label>
              <CustomSelect
                options={parkingOptions}
                selectedValue={selectedParking}
                onSelect={setSelectedParking}
                placeholder="Select parking"
              />
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-2">
                Bathrooms
              </label>
              <input
                type="number"
                min="0"
                placeholder="Number of bathrooms"
                className="w-full text-sm px-3 py-2 sm:py-2.5 rounded-lg outline-none caret-gray-200 text-gray-300 placeholder-gray-500 border border-gray-700 focus:border-[#3a6ea5] transition-colors"
                style={{ backgroundColor: colors.buttonbackground }}
              />
            </div>

            {/* Balconies */}
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-2">
                Balconies
              </label>
              <input
                type="number"
                min="0"
                placeholder="Number of balconies"
                className="w-full text-sm px-3 py-2 sm:py-2.5 rounded-lg outline-none caret-gray-200 text-gray-300 placeholder-gray-500 border border-gray-700 focus:border-[#3a6ea5] transition-colors"
                style={{ backgroundColor: colors.buttonbackground }}
              />
            </div>

            {/* Built-up Area */}
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-2">
                Built-up Area (sq.ft.)
              </label>
              <input
                type="number"
                min="0"
                placeholder="Built-up area"
                className="w-full text-sm px-3 py-2 sm:py-2.5 rounded-lg outline-none caret-gray-200 text-gray-300 placeholder-gray-500 border border-gray-700 focus:border-[#3a6ea5] transition-colors"
                style={{ backgroundColor: colors.buttonbackground }}
              />
            </div>
          </div>
        </motion.div>

        {/* Property Description */}
        <motion.div variants={itemVariants}>
          <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-2">
            Property Description
          </label>
          <textarea
            value={propertyDescription}
            onChange={(e) => setPropertyDescription(e.target.value)}
            placeholder="Describe your property in detail including:
• Key features and highlights
• Nearby amenities and facilities
• Transportation connectivity
• Neighborhood advantages
• Any special features or unique selling points..."
            rows="5"
            maxLength="1000"
            className="w-full text-sm px-3 py-3 rounded-lg outline-none caret-gray-200 text-gray-300 placeholder-gray-500 border border-gray-700 focus:border-[#3a6ea5] transition-colors resize-none"
            style={{ backgroundColor: colors.buttonbackground }}
          />
          <div className="mt-2 text-xs text-gray-500 text-right">
            {propertyDescription.length}/1000 characters
          </div>
        </motion.div>

        {/* Amenities Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-300">
              Available Amenities
            </h4>
            <span className="text-xs text-gray-500">
              {selectedAmenities.length} selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {amenitiesList.map((amenity, index) => (
              <motion.label
                key={amenity}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors group"
              >
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  className="w-4 h-4 text-[#3a6ea5] border-gray-600 rounded focus:ring-[#3a6ea5] focus:ring-2 bg-gray-800 transition-colors"
                />
                <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
                  {amenity}
                </span>
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Summary Section */}
        {(selectedBHK ||
          selectedPropertyType ||
          selectedAmenities.length > 0) && (
          <motion.div
            variants={itemVariants}
            className="p-4 rounded-lg border border-gray-700"
            style={{ backgroundColor: colors.buttonbackground }}
          >
            <h4 className="text-sm font-medium text-gray-300 mb-3">
              Property Summary
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-gray-400">
              {selectedBHK && (
                <div>
                  Configuration:{" "}
                  <span className="text-gray-300">
                    {bhkOptions.find((opt) => opt.value === selectedBHK)?.label}
                  </span>
                </div>
              )}
              {selectedPropertyType && (
                <div>
                  Type:{" "}
                  <span className="text-gray-300">
                    {
                      propertyTypes.find(
                        (opt) => opt.value === selectedPropertyType
                      )?.label
                    }
                  </span>
                </div>
              )}
              {selectedAmenities.length > 0 && (
                <div>
                  Amenities:{" "}
                  <span className="text-gray-300">
                    {selectedAmenities.length} selected
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SaleAdditionalDetails;
