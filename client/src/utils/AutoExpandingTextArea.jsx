import React, { useState, useRef, useEffect } from "react";
import { MapPin, X } from "lucide-react";

const AutoExpandingTextarea = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const textareaRef = useRef(null);

  // Rotating placeholders
  const placeholders = [
    "Connect with dealers/Owners",
    "Try: 2BHK in Mumbai under ₹50L",
    "Find trusted agents in Delhi NCR",
    "Affordable rentals in Bangalore",
    "Top-rated agents for villas in Goa",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate placeholder every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-resize textarea based on content
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Dynamic font size
  const getDynamicFontSize = (textLength) => {
    if (textLength < 50) return "text-base";
    if (textLength < 100) return "text-sm";
    if (textLength < 200) return "text-xs";
    return "text-xs";
  };

  // Handle textarea changes
  const handleChange = (e) => {
    setSearchLocation(e.target.value);
  };

  // Adjust height when text changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [searchLocation]);

  // Clear input
  const clearInput = () => {
    setSearchLocation("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="mx-auto w-full">
      {/* Enhanced textarea container */}
      <div className="relative">
        <div className="flex items-center ">

          <textarea
            ref={textareaRef}
            value={searchLocation}
            onChange={handleChange}
            placeholder={placeholders[placeholderIndex]} // Rotating placeholder
            rows={1}
            className={`flex-1 bg-transparent outline-none ${getDynamicFontSize(
              searchLocation.length
            )} text-white caret-blue-400 placeholder-gray-300 focus:placeholder-gray-500 transition-all duration-200 resize-none overflow-hidden leading-relaxed text-sm text-ellipsis w-full`}
            style={{
              minHeight: "24px",
              maxHeight: "100px",
            }}
          />

          {searchLocation && (
            <button
              onClick={clearInput}
              className="text-gray-400 hover:text-white transition-colors p-1 mt-1"
              aria-label="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoExpandingTextarea;
