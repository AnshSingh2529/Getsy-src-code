import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";

import SmallFooter from "../../components/footer/SmallFooter";
import MemberWorkspaceBanner from "../../components/main/ui/MemberWorkspaceBanner";
import PropertyCard from "../FirmsView/PropertyCard";

export default function PropertyWishlist() {
  const wishlist = useSelector((state) => state.wishlist.items);

  const [category, setCategory] = useState("All");
  const [subType, setSubType] = useState("All");
  const [openCategory, setOpenCategory] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  /* ---------------------------------------------
     URL Sync
  --------------------------------------------- */
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (subType !== "All") params.set("type", subType);
    setSearchParams(params, { replace: true });
  }, [category, subType, setSearchParams]);

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    const urlType = searchParams.get("type");
    if (urlCategory) setCategory(urlCategory);
    if (urlType) setSubType(urlType);
  }, []);

  /* ---------------------------------------------
     Focus management
  --------------------------------------------- */
  useEffect(() => {
    if (openCategory) setFocusedIndex(0);
  }, [openCategory]);

  /* ---------------------------------------------
     Persist filter preference
  --------------------------------------------- */
  useEffect(() => {
    localStorage.setItem(
      "wishlistCategoryPrefs",
      JSON.stringify({ category, subType }),
    );
  }, [category, subType]);

  useEffect(() => {
    const saved = localStorage.getItem("wishlistCategoryPrefs");
    if (saved) {
      const parsed = JSON.parse(saved);
      setCategory(parsed.category || "All");
      setSubType(parsed.subType || "All");
    }
  }, []);

  /* ---------------------------------------------
     Build Category → SubCategory Map
  --------------------------------------------- */
  const CATEGORY_MAP = useMemo(() => {
    const map = {};

    wishlist.forEach((item) => {
      if (!map[item.type]) {
        map[item.type] = new Set();
      }
      map[item.type].add(item.subType);
    });

    Object.keys(map).forEach((key) => {
      map[key] = Array.from(map[key]);
    });

    return map;
  }, [wishlist]);

  /* ---------------------------------------------
     Filter Wishlist
  --------------------------------------------- */
  const filteredWishlist = useMemo(() => {
    return wishlist.filter((property) => {
      if (category !== "All" && property.type !== category) return false;
      if (subType !== "All" && property.subType !== subType) return false;
      return true;
    });
  }, [wishlist, category, subType]);

  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  /* ---------------------------------------------
     Render
  --------------------------------------------- */
  return (
    <div className="w-full">
      <div className="min-h-screen bg-transparent border border-gray-800/60 mx-2 sm:mx-4 lg:mx-6 rounded-md mb-2 md:mb-10 text-gray-200 shadow-lg shadow-black/15">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-800/30">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
            {/* Title */}
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-100">
                Your Wishlist
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                {filteredWishlist.length}{" "}
                {filteredWishlist.length === 1 ? "property" : "properties"}{" "}
                saved
              </p>
            </div>

            {/* Filters */}
            <div className="flex-1 sm:max-w-max">
              {/* Mobile */}
              <div className="md:hidden">
                <MobileCategoryDropdown
                  category={category}
                  subType={subType}
                  setCategory={setCategory}
                  setSubType={setSubType}
                  categoryMap={CATEGORY_MAP}
                />
              </div>

              {/* Desktop */}
              <div className="hidden md:flex flex-col gap-3">
                <div className="text-[11px] uppercase tracking-wide text-gray-500 font-medium">
                  Property Category
                </div>

                <div className="flex gap-2 flex-wrap">
                  {["All", "Residential", "Commercial", "Land / Plot"].map(
                    (item) => {
                      const hasSubCategories =
                        item !== "All" && CATEGORY_MAP[item]?.length > 0;

                      const isActive = category === item;

                      return (
                        <div
                          key={item}
                          className="relative"
                          onMouseEnter={() =>
                            !isTouchDevice &&
                            hasSubCategories &&
                            setOpenCategory(item)
                          }
                          onMouseLeave={() =>
                            !isTouchDevice && setOpenCategory(null)
                          }
                        >
                          <button
                            onClick={() => {
                              if (hasSubCategories && isTouchDevice) {
                                setOpenCategory((prev) =>
                                  prev === item ? null : item,
                                );
                                return;
                              }
                              setCategory(item);
                              setSubType("All");
                              setOpenCategory(null);
                            }}
                            className={`px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm rounded-md border transition-all ${
                              isActive
                                ? "bg-cyan-700/90 border-cyan-500 text-white"
                                : "border-gray-700 text-gray-400 hover:border-gray-500 hover:bg-gray-800/40"
                            }`}
                          >
                            {item}
                          </button>

                          {hasSubCategories && openCategory === item && (
                            <div className="absolute left-0 top-full mt-1 z-50 min-w-[210px] rounded-lg border border-gray-800 bg-gray-950/70 backdrop-blur-sm shadow-xl">
                              <div className="p-2 flex flex-col gap-1 max-h-[300px] overflow-y-auto">
                                {CATEGORY_MAP[item].map((type, index) => (
                                  <button
                                    key={type}
                                    onClick={() => {
                                      setCategory(item);
                                      setSubType(type);
                                      setOpenCategory(null);
                                      setFocusedIndex(-1);
                                    }}
                                    className={`text-left px-3 py-2 text-xs rounded-md ${
                                      focusedIndex === index
                                        ? "bg-gray-700 text-white"
                                        : subType === type
                                          ? "bg-gray-800 text-white"
                                          : "text-gray-400 hover:bg-gray-800/60"
                                    }`}
                                  >
                                    {type}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>

                {category !== "All" && (
                  <div className="text-xs text-gray-500">
                    Showing{" "}
                    <span className="text-gray-300 font-medium">
                      {category}
                    </span>
                    {subType !== "All" && (
                      <>
                        {" "}
                        →{" "}
                        <span className="text-gray-300 font-medium">
                          {subType}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="px-4 sm:px-6 py-4">
          <MemberWorkspaceBanner />
        </div>

        {/* Content */}
        {filteredWishlist.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="px-4 sm:px-6 pb-6">
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-4 border-t border-gray-800/30">
                {filteredWishlist.map((item, index) => (
                  <PropertyCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </AnimatePresence>
          </div>
        )}
      </div>

      <SmallFooter />
    </div>
  );
}

/* ---------------------------------------------
   Empty State
--------------------------------------------- */
function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 text-center">
      <Heart size={48} className="text-gray-600 mb-4" />
      <p className="text-base sm:text-lg font-medium text-gray-300">
        Your wishlist is empty
      </p>
      <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-sm">
        Save properties you like and compare them later.
      </p>

      <button
        onClick={() => navigate("/top-firms")}
        className="mt-6 rounded-lg bg-cyan-700 hover:bg-cyan-600 px-6 py-2.5 text-sm font-medium text-white transition"
      >
        Explore Properties
      </button>
    </div>
  );
}

/* ---------------------------------------------
   Mobile Dropdown
--------------------------------------------- */
function MobileCategoryDropdown({
  category,
  subType,
  setCategory,
  setSubType,
  categoryMap,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] uppercase tracking-wide text-gray-500 font-medium">
        Property Type
      </label>

      <select
        value={`${category}|${subType}`}
        onChange={(e) => {
          const [cat, sub] = e.target.value.split("|");
          setCategory(cat);
          setSubType(sub);
        }}
        className="w-full rounded-lg bg-gray-900 border border-gray-700 text-sm text-gray-200 px-3 py-2.5"
      >
        <option value="All|All">All Properties</option>

        {Object.entries(categoryMap).map(([cat, types]) => (
          <optgroup key={cat} label={cat}>
            <option value={`${cat}|All`}>All {cat}</option>
            {types.map((type) => (
              <option key={type} value={`${cat}|${type}`}>
                {type}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
