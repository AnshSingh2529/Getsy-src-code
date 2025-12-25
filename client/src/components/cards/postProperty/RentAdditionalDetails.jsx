import React, { useState } from "react";
import { motion } from "framer-motion";
import CustomSelect from "./CustomSelect";
import { colors } from "../../../utils/Colors.js";

const RentAdditionalDetails = () => {
  const [selectedAreaUnit, setSelectedAreaUnit] = useState("");
  const [kitchenType, setKitchenType] = useState("");
  const [bathType, setBathType] = useState("");
  const [numberOfBaths, setNumberOfBaths] = useState("");
  const [numberOfBeds, setNumberOfBeds] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [preferedTenants, setPreferedTenants] = useState([]);

  const [otherDetails, setOtherDetails] = useState("");

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

  const tenantOptions = [
    { value: "boys", label: "Boys/Men" },
    { value: "girls", label: "Girls/Women" },
    { value: "family", label: "Family" },
    { value: "working_professionals", label: "Working Professionals" },
    { value: "students", label: "Students" },
    { value: "bachelors", label: "Bachelors" },
    { value: "couples", label: "Couples" },
    { value: "any", label: "Any" },
  ];

  // Get minimum date (today)
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Handle tenant selection
  const handleTenantSelection = (tenantValue) => {
    if (tenantValue === "any") {
      setPreferedTenants(["any"]);
      return;
    }

    const currentTenants = preferedTenants.filter((t) => t !== "any");

    if (currentTenants.includes(tenantValue)) {
      setPreferedTenants(currentTenants.filter((t) => t !== tenantValue));
    } else {
      setPreferedTenants([...currentTenants, tenantValue]);
    }
  };

  // Get display text for selected tenants
  const getSelectedTenantsText = () => {
    if (preferedTenants.length === 0) return "Your tenant preference";
    if (preferedTenants.includes("any")) return "Any";
    if (preferedTenants.length === 1) {
      const option = tenantOptions.find(
        (opt) => opt.value === preferedTenants[0]
      );
      return option ? option.label : preferedTenants[0];
    }
    return `${preferedTenants.length} selected`;
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 border border-gray-600 rounded-lg lg:rounded-xl mt-2">
      {/* Header Section */}
      <div className="flex items-center text-gray-300 text-sm sm:text-base font-medium mb-4 sm:mb-6">
        <span>Area & Key Property Highlights</span>
        <span className="text-red-400 ml-1">*</span>
      </div>

      {/* Total Area Section */}
      <div className="mb-6">
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
            className="text-ellipsis px-3 py-2 sm:py-2.5 text-sm text-gray-300 placeholder-gray-500 outline-none bg-transparent"
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
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Column - Property Details */}
        <div className="space-y-6">
          {/* Kitchen Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <label className="block text-xs sm:text-sm text-gray-400 font-medium">
              Kitchen Type <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors group">
                <input
                  type="checkbox"
                  name="kitchen"
                  value="separate"
                  checked={kitchenType === "separate"}
                  onChange={(e) => setKitchenType(e.target.value)}
                  className="w-4 h-4 text-[#3a6ea5] border-gray-600 bg-gray-800"
                />
                <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
                  Separate
                </span>
              </label>
              <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors group">
                <input
                  type="checkbox"
                  name="kitchen"
                  value="common"
                  checked={kitchenType === "common"}
                  onChange={(e) => setKitchenType(e.target.value)}
                  className="w-4 h-4 text-[#3a6ea5] border-gray-600 bg-gray-800"
                />
                <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
                  Common
                </span>
              </label>
            </div>
          </motion.div>

          {/* Bathrooms Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {/* Bathrooms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Number of Baths */}
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-2 w-max">
                  Number of Bathrooms
                </label>
                <input
                  type="number"
                  min="0"
                  value={numberOfBaths}
                  onChange={(e) => setNumberOfBaths(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 sm:py-2.5 text-sm text-gray-300 placeholder-gray-500 outline-none focus:border-[#3a6ea5] transition-colors"
                  placeholder="Number"
                />
              </div>

              {/* Bath Type */}
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 font-medium mb-2">
                  Bathroom Type
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors group">
                    <input
                      type="checkbox"
                      name="bathType"
                      value="separate"
                      checked={bathType === "separate"}
                      onChange={(e) => setBathType(e.target.value)}
                      className="w-4 h-4 text-[#3a6ea5] border-gray-600 bg-gray-800"
                    />
                    <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
                      Separate
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors group">
                    <input
                      type="checkbox"
                      name="bathType"
                      value="common"
                      checked={bathType === "common"}
                      onChange={(e) => setBathType(e.target.value)}
                      className="w-4 h-4 text-[#3a6ea5] border-gray-600 bg-gray-800"
                    />
                    <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
                      Common
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bedrooms section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <label className="block text-xs sm:text-sm text-gray-400 font-medium w-max">
              Number of Bedrooms <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={numberOfBeds}
              onChange={(e) => setNumberOfBeds(e.target.value)}
              className="w-full sm:w-32 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 sm:py-2.5 text-sm text-gray-300 placeholder-gray-500 outline-none focus:border-[#3a6ea5] transition-colors"
              placeholder="Number"
            />
          </motion.div>

          {/* Available From Section - Enhanced with Date Picker */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-2"
          >
            <label className="block text-xs sm:text-sm text-gray-400 font-medium">
              Available From <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
                min={getTodayDate()}
                className="w-full sm:w-48 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 sm:py-2.5 text-sm text-gray-300 placeholder-gray-500 outline-none focus:border-[#3a6ea5] transition-colors [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              When will the property be available for rent?
            </p>
          </motion.div>

          {/* Preferred Tenants Section - Enhanced with Multi-Select */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <label className="block text-xs sm:text-sm text-gray-400 font-medium">
              Preferred Tenants <span className="text-red-400">*</span>
            </label>

            {/* Selected Display */}
            <div
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 sm:py-2.5 text-sm text-gray-300 min-h-[42px] flex items-center justify-between cursor-pointer hover:border-gray-600 transition-colors"
              style={{ backgroundColor: colors.buttonbackground }}
            >
              <span
                className={
                  preferedTenants.length === 0
                    ? "text-gray-500"
                    : "text-gray-300"
                }
              >
                {getSelectedTenantsText()}
              </span>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tenantOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-700 group"
                >
                  <input
                    type="checkbox"
                    checked={preferedTenants.includes(option.value)}
                    onChange={() => handleTenantSelection(option.value)}
                    className="w-4 h-4 text-[#3a6ea5] border-gray-600 bg-gray-800 rounded focus:ring-[#3a6ea5] focus:ring-2"
                  />
                  <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Selected Count */}
            {preferedTenants.length > 0 && !preferedTenants.includes("any") && (
              <div className="flex flex-wrap gap-2 mt-2">
                {preferedTenants.map((tenant) => {
                  const option = tenantOptions.find(
                    (opt) => opt.value === tenant
                  );
                  return option ? (
                    <span
                      key={tenant}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#3a6ea5]/20 text-[#3a6ea5] border border-[#3a6ea5]/30"
                    >
                      {option.label}
                      <button
                        type="button"
                        onClick={() => handleTenantSelection(tenant)}
                        className="ml-1 hover:text-red-400 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ) : null;
                })}
              </div>
            )}

            <p className="text-xs text-gray-500">
              Select your preferred tenant type(s). You can choose multiple
              options.
            </p>
          </motion.div>
        </div>

        {/* Right Column - Other Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <div
            className="p-4 sm:p-6 rounded-lg lg:rounded-xl border border-gray-700"
            style={{ backgroundColor: colors.buttonbackground }}
          >
            <label
              htmlFor="other-details"
              className="block text-sm sm:text-base font-medium text-gray-300 mb-3"
            >
              Other Details
            </label>
            <textarea
              id="other-details"
              name="other-details"
              rows="8"
              value={otherDetails}
              onChange={(e) => setOtherDetails(e.target.value)}
              placeholder="Add any additional information about your rental unit such as:
• Nearby amenities and facilities
• Transportation access
• Special features or inclusions
• House rules or preferences
• Available dates 
• Any other relevant details..."
              className="w-full bg-[#131515] border border-gray-700 rounded-lg p-3 sm:p-4 text-sm text-gray-300 placeholder-gray-500 outline-none focus:border-[#3a6ea5] transition-colors resize-none"
            />
            <div className="mt-2 text-xs text-gray-500">
              {otherDetails.length}/500 characters
            </div>
          </div>
        </motion.div>
      </div>

      {/* Additional Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 space-y-4"
      >
        <h4 className="text-sm font-medium text-gray-300">
          Available Amenities
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            "WiFi",
            "AC",
            "Parking",
            "Security",
            "Laundry",
            "Balcony",
            "Garden",
            "Gym Access",
            "Swimming Pool",
            "Power Backup",
            "Water Supply",
            "Furnished",
          ].map((amenity, index) => (
            <label
              key={amenity}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer transition-colors group"
            >
              <input
                type="checkbox"
                className="w-4 h-4 text-[#3a6ea5] border-gray-600 rounded bg-gray-800"
              />
              <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RentAdditionalDetails;
