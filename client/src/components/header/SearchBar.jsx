// src/components/common/SearchBar.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

// local imports...
import AutoExpandingTextarea from "../../utils/AutoExpandingTextArea.jsx";
import SearchNearbyCTA from "../main/cta/SearchNearbyCTA.jsx";

const SearchBar = ({
  onSearch,
  placeholder = "Search properties, areas or budgets...",
  variant = "default", // "default" | "compact",
}) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(searchText);
  };

  const compact = variant === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`w-full flex flex-1 lg:space-x-2 items-center justify-stretch box-content`}
    >
      <div className="hidden lg:flex">
        <SearchNearbyCTA showNearby={true} variant="compact" />
      </div>

      {/* Search box */}
      <div
        className={`flex w-full box-content items-center justify-center ${
          compact ? "px-2 py-0.5 truncate" : "pl-1 pr-1 py-1.5"
        } bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-300 w-full space-x-4 `}
      >
        <div className="flex lg:hidden">
          <SearchNearbyCTA showNearby={true} variant="compact" />
        </div>

        <AutoExpandingTextarea
          placeholder={placeholder}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={`bg-transparent outline-none text-gray-200 resize-none ${
            compact ? "text-xs truncate" : "text-base"
          }`}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleSearch}
          className={`flex items-center justify-center ${
            compact
              ? "p-2 bg-blue-700/70 hover:bg-blue-600 rounded-full"
              : "p-4 bg-gradient-to-br from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-gray-100 rounded-full shadow-lg"
          } transition-all duration-300 ring-1 ring-blue-500/40 hover:ring-blue-400/60`}
        >
          <Search size={compact ? 18 : 22} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SearchBar;
