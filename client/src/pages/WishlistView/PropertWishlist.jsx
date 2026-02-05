import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Trash2, MapPin, IndianRupee, PhoneCall } from "lucide-react";
import SmallFooter from "../../components/footer/SmallFooter";
import MemberWorkspaceBanner from "../../components/main/ui/MemberWorkspaceBanner";
const PROPERTY_CATEGORY_MAP = {
  Residential: [
    "Apartment",
    "Villa",
    "Builder Floor",
    "Studio",
    "Penthouse",
    "Plot",
  ],
  Commercial: [
    "Office Space",
    "Retail Shop",
    "Showroom",
    "Warehouse",
    "Industrial Unit",
    "Co-working Space",
  ],
  "Land / Plot": [
    "Residential Plot",
    "Commercial Plot",
    "Agricultural Land",
    "Industrial Land",
  ],
};

const MOCK_WISHLIST = [
  {
    id: 1,
    title: "3 BHK Luxury Apartment",
    location: "Andheri West, Mumbai",
    price: "₹1.85 Cr",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
  {
    id: 2,
    title: "Commercial Office Space",
    location: "Cyber City, Gurgaon",
    price: "₹3.2 Cr",
    type: "Commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
  },
];

export default function PropertyWishlist() {
  const [category, setCategory] = useState("All");
  const [subType, setSubType] = useState("All");
  const [wishlist, setWishlist] = useState(MOCK_WISHLIST);
  const [openCategory, setOpenCategory] = useState(null);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const filteredWishlist = wishlist.filter((item) => {
    if (category !== "All" && item.type !== category) return false;
    if (subType !== "All" && item.subType !== subType) return false;
    return true;
  });

  const removeItem = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="min-h-screen bg-transparent border border-gray-800/60 mx-2 rounded-md mb-2 text-gray-200 px-6 py-3 shadow-lg shadow-black/15">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-800/30">
          <div>
            <h1 className="text-lg font-semibold">Your Wishlist</h1>
            <p className="text-xs text-gray-400">
              {wishlist.length} properties saved
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-2">
            <div className="text-[11px] uppercase tracking-wide text-gray-500">
              Property Category
            </div>

            {/* Main Categories */}
            <div className="flex gap-2 flex-wrap">
              {["All", "Residential", "Commercial", "Land / Plot"].map(
                (item) => {
                  const hasSubCategories =
                    item !== "All" && PROPERTY_CATEGORY_MAP[item];

                  const isActive = category === item;

                  return (
                    <div
                      key={item}
                      className="relative"
                      onMouseEnter={() =>
                        hasSubCategories && setOpenCategory(item)
                      }
                      onMouseLeave={() => setOpenCategory(null)}
                    >
                      {/* Parent Button */}
                      <button
                        onClick={() => {
                          setCategory(item);
                          setSubType("All");
                          setOpenCategory(null);
                        }}
                        className={`px-3 py-1.5 text-xs rounded-md border transition ${
                          isActive
                            ? "bg-cyan-700/90 border-cyan-500 text-white shadow"
                            : "border-gray-700 text-gray-400 hover:border-gray-500"
                        }`}
                      >
                        {item}
                      </button>

                      {/* Dropdown */}
                      {hasSubCategories && openCategory === item && (
                        <div className="absolute left-0 top-full mt-2 z-50 min-w-[210px] rounded-lg border border-gray-800 bg-gray-950/95 shadow-xl">
                          <div className="p-2 flex flex-col gap-1">
                            {PROPERTY_CATEGORY_MAP[item].map((type) => (
                              <button
                                key={type}
                                onClick={() => {
                                  setCategory(item);
                                  setSubType(type);
                                  setOpenCategory(null); // 👈 closes dropdown
                                }}
                                className={`text-left px-3 py-1.5 text-[11px] rounded-md transition ${
                                  subType === type
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

            {/* Selection Indicator */}
            {category !== "All" && (
              <div className="text-[11px] text-gray-500">
                Showing results from{" "}
                <span className="text-gray-300 font-medium">{category}</span>
                {subType !== "All" && (
                  <>
                    {" "}
                    →{" "}
                    <span className="text-gray-300 font-medium">{subType}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <MemberWorkspaceBanner />

        {/* Wishlist Content */}
        {filteredWishlist.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 px-4 pb-4 border-t border-gray-800/30 pt-4">
            {filteredWishlist.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl overflow-hidden border border-gray-800 bg-gray-950/60"
              >
                {/* Image */}
                <div className="relative h-32">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />

                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 rounded-full bg-black/60 p-1 hover:bg-red-600 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-3 space-y-2">
                  <p className="text-sm font-medium">{item.title}</p>

                  <div className="flex items-center text-[11px] text-gray-400 gap-1">
                    <MapPin size={12} />
                    {item.location}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-green-400">
                      <IndianRupee size={12} />
                      {item.price}
                    </div>

                    <span className="text-[10px] rounded-md border border-gray-700 px-2 py-0.5 text-gray-400">
                      {item.type}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 rounded-lg bg-blue-700/80 py-1 text-xs text-white hover:bg-blue-700 transition">
                      View Details
                    </button>

                    <button className="flex items-center justify-center rounded-lg border border-gray-700 px-2 hover:border-cyan-500">
                      <PhoneCall size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <SmallFooter />
    </div>
  );
}

function EmptyState() {
  const navigate = useNavigate();
  const handleExploreProperties = () => {
    navigate("/top-firms");
  };
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <Heart size={40} className="text-gray-600 mb-3" />
      <p className="text-sm font-medium text-gray-300">
        Your wishlist is empty
      </p>
      <p className="text-xs text-gray-500 mt-1 max-w-xs">
        Save properties you like and come back to compare them later.
      </p>

      <button
        onClick={handleExploreProperties}
        className="mt-4 rounded-lg bg-cyan-700 px-4 py-2 text-xs text-white"
      >
        Explore Properties
      </button>
    </div>
  );
}
