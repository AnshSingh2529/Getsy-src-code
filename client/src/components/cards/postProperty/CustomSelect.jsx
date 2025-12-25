import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, X } from "lucide-react";

// Mock colors object
const colors = {
  buttonbackground: "#374151", // gray-700
};

// Fixed CustomSelect component with proper controlled behavior
const CustomSelect = ({
  options,
  selectedValue,
  onSelect,
  placeholder = "Select option",
  disabled = false,
  clearable = false,
  searchable = false,
  size = "default",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Find selected option - this is the key fix
  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const handleSelect = (option) => {
    onSelect(option.value);
    setIsOpen(false);
    setSearchTerm("");
    setFocusedIndex(-1);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onSelect("");
    setSearchTerm("");
  };

  const calculateDropdownPosition = () => {
    if (!selectRef.current) return;

    const selectRect = selectRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const dropdownHeight = Math.min(
      filteredOptions.length * 40 + (searchable ? 50 : 0),
      300
    );
    const spaceBelow = windowHeight - selectRect.bottom;
    const spaceAbove = selectRect.top;

    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      setDropdownPosition("top");
    } else {
      setDropdownPosition("bottom");
    }
  };

  const handleKeyDown = (event) => {
    if (!isOpen) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (event.key) {
      case "Escape":
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case "ArrowDown":
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case "Enter":
        event.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[focusedIndex]);
        }
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      calculateDropdownPosition();

      if (searchable && searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 0);
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, searchable]);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        calculateDropdownPosition();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm("");
    }
  };

  const sizeClasses = {
    sm: "px-2 py-1.5 text-xs",
    default: "px-3 py-2.5 text-sm",
    lg: "px-4 py-3 text-base",
  };

  const optionSizeClasses = {
    sm: "px-2 py-1.5 text-xs",
    default: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
  };

  return (
    <div className="relative w-full" ref={selectRef}>
      <div
        type="button"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          w-full flex justify-between items-center
          ${sizeClasses[size]}
          border border-gray-700 rounded-lg
          text-gray-200 placeholder-gray-500
          transition-all duration-200
          outline-none focus:border-[#3a6ea5]
          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-gray-600 cursor-pointer"
          }
          ${isOpen ? "border-[#3a6ea5]" : ""}
        `}
        style={{ backgroundColor: colors.buttonbackground }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate text-left flex-1 min-w-0">
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <div className="flex items-center gap-1 ml-2 flex-shrink-0">
          {clearable && selectedOption && !disabled && (
            <button
              onClick={handleClear}
              className="p-0.5 hover:bg-gray-600 rounded transition-colors"
              tabIndex={-1}
            >
              <X className="w-3 h-3 text-gray-400" />
            </button>
          )}
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black bg-opacity-25 sm:hidden" />

          <div
            ref={dropdownRef}
            className={`
              absolute z-50 w-full min-w-[200px] overflow-y-auto scroll-smooth
              ${
                dropdownPosition === "bottom"
                  ? "top-full mt-1"
                  : "bottom-full mb-1"
              }
              bg-gray-800 border border-gray-600 rounded-lg shadow-2xl
              max-h-32 sm:max-h-32 overflow-hidden scrollbar-hide
            `}
            role="listbox"
          >
            {searchable && (
              <div className="p-2 border-b border-gray-600">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setFocusedIndex(-1);
                  }}
                  placeholder="Search options..."
                  className="w-full px-2 py-1.5 text-xs bg-gray-700 border border-gray-600 rounded text-gray-300 placeholder-gray-400 outline-none focus:border-blue-400"
                  onKeyDown={handleKeyDown}
                />
              </div>
            )}

            <div className="py-1 overflow-y-auto max-h-48 sm:max-h-60">
              {filteredOptions.length === 0 ? (
                <div
                  className={`${optionSizeClasses[size]} text-gray-400 italic`}
                >
                  {searchTerm ? "No results found" : "No options available"}
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className={`
                      ${optionSizeClasses[size]}
                      cursor-pointer transition-colors duration-150 flex items-center justify-between
                      ${focusedIndex === index ? "bg-gray-600" : ""}
                      ${
                        selectedValue === option.value
                          ? "bg-[#3a6ea5] text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }
                    `}
                    role="option"
                    aria-selected={selectedValue === option.value}
                  >
                    <span className="block truncate flex-1">
                      {option.label}
                    </span>
                    {selectedValue === option.value && (
                      <Check className="w-4 h-4 ml-2 flex-shrink-0" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomSelect;
