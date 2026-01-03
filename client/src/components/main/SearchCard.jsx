import { motion } from "framer-motion";
import { useState } from "react";
import { Filter, Home, DollarSign, Star } from "lucide-react";
// local imports...
import SearchBar from "../../components/header/SearchBar.jsx";
import PropertyModeSelector from "./PropertyModeSelector.jsx";

const SearchCard = ({ onFiltersChange, currentFilters }) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [pincode, setPincode] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [bedrooms, setBedrooms] = useState("any");
  const [amenities, setAmenities] = useState([]);

  // Handle search submission
  const handleSearch = () => {
    console.log({
      location: searchLocation,
      pincode,
      propertyType,
      priceRange,
      bedrooms,
      amenities,
    });
  };

  const [open, setOpen] = useState(false);

  // Clear all filters
  const clearFilters = () => {
    setSearchLocation("");
    setPincode("");
    setPropertyType("all");
    setPriceRange([0, 100000]);
    setBedrooms("any");
    setAmenities([]);
  };

  // Toggle amenities
  const toggleAmenity = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* Main Search Bar */}
      <SearchBar onSearch={handleSearch} />
      <div className="w-full h-[1px] bg-gray-800 mt-2"></div>
    </motion.div>
  );
};

export default SearchCard;
