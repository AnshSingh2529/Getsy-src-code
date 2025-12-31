import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MapPin,
  X,
  Home,
  DollarSign,
  Building2,
  Wifi,
  Dumbbell,
  Waves,
  Shield,
  Car,
  CheckCircle2,
  Loader2,
  Navigation,
  MapPinCheckIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import CustomSelect from "../../pages/postProperty/components/CustomSelect.jsx";
import {
  charcoal,
  deepBlue,
  glassGreen,
  modernGreen,
  oceanBlue,
  skyBlueGlass,
  steelGray,
} from "../../utils/EnhanceButtons.js";
import { setCurrentRequest } from "../../store/tenant/tenantSlice.js";
import BroadcastModal from "../../modalForms/broadcastingSearch/BroadcastModal.jsx";

/*
  TenantRequestFormEnhanced.jsx
  - Single-file enhanced tenant/property search & broadcast form
  - Features:
    * Top-level toggle: Buy / Rent
    * Sub-categories: Residential / Commercial / Plot-Land
    * Property-type selector (dynamic based on sub-category)
    * Rich filter set (price, area, bhk, bathrooms, furnishing, amenities, etc.)
    * Smooth animations with framer-motion
    * Larger responsive modal to house many options
    * Accessible controls and keyboard-friendly interactions
    * Re-uses existing CustomSelect and BroadcastModal
*/

const DEFAULT_ANIM = { type: "spring", stiffness: 300, damping: 30 };

const TenantRequestForm = ({ isOpen, onClose, onSubmit }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [otherDetails, setOtherDetails] = useState("");

  // Location state
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationFetched, setLocationFetched] = useState(false);
  const [address, setAddress] = useState("");
  const [locationError, setLocationError] = useState("");

  // High-level selection
  const [transactionType, setTransactionType] = useState("Buy"); // Buy | Rent
  const [category, setCategory] = useState("Residential"); // Residential | Commercial | Plot-Land
  const [propertyType, setPropertyType] = useState("");

  // Filters
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [areaRange, setAreaRange] = useState({ min: "", max: "" });
  const [bhk, setBhk] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [parking, setParking] = useState(null); // true / false / null
  const [amenities, setAmenities] = useState([]);
  const [possession, setPossession] = useState("");
  const [propertyAge, setPropertyAge] = useState("");
  const [ownership, setOwnership] = useState("");
  const [floorPref, setFloorPref] = useState("");
  const [deposit, setDeposit] = useState("");
  const [leaseType, setLeaseType] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [plotAreaUnit, setPlotAreaUnit] = useState("sqft");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const dispatch = useDispatch();
  const authUser = useSelector((s) => s.auth?.user);
  const tenantId = authUser?.id || "mock-tenant-id";

  // Category state
  const categories = ["Residential", "Commercial", "Plot-Land"];

  const availableAmenities = useMemo(
    () => [
      { name: "WiFi", icon: Wifi },
      { name: "Gym", icon: Dumbbell },
      { name: "Pool", icon: Waves },
      { name: "Security", icon: Shield },
      { name: "Parking", icon: Car },
      { name: "Power Backup", icon: CheckCircle2 },
    ],
    []
  );

  const taxonomy = useMemo(
    () => ({
      Residential: [
        "Apartment / Flat",
        "Independent House / Villa",
        "Builder Floor",
        "Studio Apartment",
        "PG / Shared",
      ],
      Commercial: [
        "Office Space",
        "Shop / Retail Space",
        "Showroom",
        "Co-working Space",
        "Warehouse / Industrial Shed",
      ],
      "Plot-Land": [
        "Residential Plot",
        "Commercial Land",
        "Agricultural Land / Farmhouse",
        "Industrial Land",
      ],
    }),
    []
  );

  // helper: reverse geocode
  const fetchAddress = async (latv, lonv) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latv}&lon=${lonv}`
      );
      const data = await res.json();
      setAddress(data.display_name || "Address not found");
    } catch (e) {
      setAddress("Unable to fetch address");
    }
  };

  const handleGetLocation = () => {
    setIsLoadingLocation(true);
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported by your browser");
      setIsLoadingLocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latv = position.coords.latitude.toFixed(6);
        const lonv = position.coords.longitude.toFixed(6);
        setLat(latv);
        setLon(lonv);
        setLocationFetched(true);
        setIsLoadingLocation(false);
        fetchAddress(latv, lonv);
      },
      () => {
        setLocationError("Enable location services to continue.");
        setIsLoadingLocation(false);
      }
    );
  };

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setIsVisible(true))
      );
      if (!locationFetched) handleGetLocation();
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 220);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const toggleAmenity = (name) =>
    setAmenities((a) =>
      a.includes(name) ? a.filter((x) => x !== name) : [...a, name]
    );

  // Build payload for broadcast/save
  const buildPayload = () => ({
    tenant_id: tenantId,
    lat: lat ? Number(lat) : null,
    lon: lon ? Number(lon) : null,
    transaction: transactionType,
    category,
    property_type: propertyType,
    filters: {
      priceRange: {
        min: priceRange.min ? Number(priceRange.min) : null,
        max: priceRange.max ? Number(priceRange.max) : null,
      },
      areaRange: {
        min: areaRange.min ? Number(areaRange.min) : null,
        max: areaRange.max ? Number(areaRange.max) : null,
      },
      bhk: bhk || null,
      bathrooms: bathrooms || null,
      furnishing: furnishing || null,
      amenities,
      parking,
      possession,
      propertyAge,
      ownership,
      floorPref,
      deposit: deposit || null,
      leaseType: leaseType || null,
      pricePerUnit: pricePerUnit || null,
      plotAreaUnit,
    },
  });

  const handleBroadcast = (target) => {
    if (!lat || !lon) {
      setLocationError("Please fetch your location first");
      return;
    }

    const payload = buildPayload();

    // Save in Redux
    dispatch(setCurrentRequest(payload));

    // Send via WebSocket
    const socket = getSocket();
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({ action: "broadcast_request", target, ...payload })
      );
    } else {
      console.warn("WebSocket not connected - request queued in Redux");
    }

    onSubmit?.(payload);
    setSelectedType(target);
    setIsModalOpen(true);
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose?.(), 180);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ backdropFilter: "blur(6px)" }}
      />

      {/* Modal shell - larger canvas */}
      <motion.div
        className="w-[95vw] max-w-[1200px] max-h-[92vh] -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden flex flex-col"
        initial={{ opacity: 0, scale: 0.98, y: -8 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.98,
          y: 0,
        }}
        transition={DEFAULT_ANIM}
      >
        {/* Header */}
        <div className="p-3 bg-green-800/50 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-white" />
            <div>
              <h3 className="text-white text-xl font-sans font-semibold truncate">
                Property Search & Preferences
              </h3>
            </div>
          </div>

          <div className="md:flex items-center gap-2 justify-between mt-4 space-y-3 md:space-y-0">
            <div className="inline-flex justify-center rounded-md bg-gray-500/20 p-1 md:p-2 border-[1px] border-green-700/40 md:w-max w-full">
              {["Buy", "Rent"].map((type) => (
                <button
                  key={type}
                  onClick={() => setTransactionType(type)}
                  className={`${
                    transactionType === type
                      ? modernGreen
                      : "text-gray-300/80 py-3 px-4 w-full"
                  }`}
                  aria-pressed={transactionType === type}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="inline-flex justify-center rounded-md bg-gray-500/20 p-1 md:p-2 border-[1px] border-green-700/40 md:w-max w-full">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`${
                    category === c
                      ? glassGreen
                      : "text-gray-300/80 py-3 px-4 w-full"
                  }`}
                  aria-pressed={category === c}
                >
                  {c === "Plot-Land" ? "Plots/Land" : c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Body: two-column layout - left: filters, right: preview / actions */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left: Filters (wide scroll area) */}
          <div
            className="col-span-2 overflow-y-auto p-5 space-y-6"
            style={{
              scrollbarColor: "rgba(100, 116, 139, 0.5) transparent",
              scrollbarWidth: "thin",
            }}
          >
            {/* Location card */}
            <section className="space-y-3 bg-gray-800/40 p-4 rounded-lg border border-gray-700/40">
              <label className="flex items-center gap-2 text-gray-300 font-medium text-sm">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <div className="flex flex-col sm:flex-row gap-1">
                <button
                  onClick={handleGetLocation}
                  disabled={isLoadingLocation}
                  className="flex-1 flex items-center gap-3 px-4 py-2 rounded-md bg-green-800/60 hover:bg-green-700/70 text-white text-sm font-medium transition truncate"
                >
                  {isLoadingLocation ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Fetching...
                    </>
                  ) : locationFetched && address ? (
                    <>
                      <MapPinCheckIcon className="w-4 h-4 text-green-300" />{" "}
                      <span className="text-xs truncate">{address}</span>
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4" /> Use Current Location
                    </>
                  )}
                </button>

                <input
                  type="text"
                  placeholder="City / Locality / Landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-md bg-gray-800/30 border border-gray-700/40 text-gray-200 placeholder-gray-500 focus:outline-none truncate"
                />
              </div>
              {locationError && (
                <p className="text-xs text-red-400">{locationError}</p>
              )}
            </section>

            {/* Taxonomy row - multi-select property types */}
            <section className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">
                Property Type (multiple)
              </label>

              <div className="flex flex-wrap gap-2">
                {(taxonomy[category] || []).map((t) => {
                  const selected = Array.isArray(propertyType)
                    ? propertyType.includes(t)
                    : propertyType === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        const current = Array.isArray(propertyType)
                          ? propertyType.slice()
                          : propertyType
                          ? [propertyType]
                          : [];
                        if (current.includes(t)) {
                          setPropertyType(current.filter((x) => x !== t));
                        } else {
                          setPropertyType([...current, t]);
                        }
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                        selected
                          ? "bg-green-800/50 border border-green-700/40 text-white"
                          : "bg-gray-800/40 border border-gray-700/30 text-gray-300 hover:border-gray-600"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="truncate">{t}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 mt-3">
                <CustomSelect
                  options={[
                    { value: "sqft", label: "sqft" },
                    { value: "sqm", label: "sqm" },
                    { value: "acre", label: "acre" },
                  ]}
                  selectedValue={plotAreaUnit}
                  onSelect={setPlotAreaUnit}
                  placeholder="Area Unit"
                  size="default"
                  clearable
                />

                <button
                  type="button"
                  onClick={() =>
                    setPropertyType(Array.isArray(propertyType) ? [] : "")
                  }
                  className="px-3 py-2 rounded-md bg-gray-800/40 border border-gray-700/30 text-sm text-gray-300 hover:bg-gray-700/20"
                >
                  Clear
                </button>
              </div>
            </section>

            {/* Core filters grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Price Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange((p) => ({ ...p, min: e.target.value }))
                    }
                    placeholder={
                      transactionType === "Rent" ? "Min rent" : "Min price"
                    }
                    className="px-3 py-2 rounded-md bg-gray-800/30 border border-gray-700/40 text-gray-200"
                  />
                  <input
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange((p) => ({ ...p, max: e.target.value }))
                    }
                    placeholder={
                      transactionType === "Rent" ? "Max rent" : "Max price"
                    }
                    className="px-3 py-2 rounded-md bg-gray-800/30 border border-gray-700/40 text-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">
                  Area Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={areaRange.min}
                    onChange={(e) =>
                      setAreaRange((a) => ({ ...a, min: e.target.value }))
                    }
                    placeholder="Min area"
                    className="px-3 py-2 rounded-md bg-gray-800/30 border border-gray-700/40 text-gray-200"
                  />
                  <input
                    value={areaRange.max}
                    onChange={(e) =>
                      setAreaRange((a) => ({ ...a, max: e.target.value }))
                    }
                    placeholder="Max area"
                    className="px-3 py-2 rounded-md bg-gray-800/30 border border-gray-700/40 text-gray-200"
                  />
                </div>
              </div>

              {/* BHK / Bedrooms */}
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">
                  Bedrooms
                </label>
                <CustomSelect
                  options={[
                    { value: "1BHK", label: "1BHK" },
                    { value: "2BHK", label: "2BHK" },
                    { value: "3BHK", label: "3BHK" },
                    { value: "4BHK", label: "4BHK" },
                    { value: "Studio", label: "Studio" },
                    { value: "+4BHK", label: "+4BHK" },
                  ]}
                  selectedValue={bhk}
                  onSelect={setBhk}
                  placeholder="Select"
                  size="default"
                  clearable
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">
                  Bathrooms
                </label>
                <CustomSelect
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "+3", label: "+3" },
                  ]}
                  selectedValue={bathrooms}
                  onSelect={setBathrooms}
                  placeholder="Select"
                  size="default"
                  clearable
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">
                  Furnishing
                </label>
                <CustomSelect
                  options={[
                    { value: "Unfurnished", label: "Unfurnished" },
                    { value: "Semi", label: "Semi-Furnished" },
                    { value: "Fully", label: "Fully-Furnished" },
                    { value: "Plug-and-play", label: "Plug-and-play" },
                  ]}
                  selectedValue={furnishing}
                  onSelect={setFurnishing}
                  placeholder="Select"
                  size="default"
                  clearable
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">
                  Possession
                </label>
                <CustomSelect
                  options={[
                    { value: "Ready", label: "Ready to move" },
                    { value: "UnderConstruction", label: "Under construction" },
                  ]}
                  selectedValue={possession}
                  onSelect={setPossession}
                  placeholder="Select"
                  size="default"
                  clearable
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">
                  Property Age
                </label>
                <CustomSelect
                  options={[
                    { value: "New", label: "New" },
                    { value: "0-5", label: "0-5 yrs" },
                    { value: "5-10", label: "5-10 yrs" },
                    { value: "+10", label: "+10 yrs" },
                  ]}
                  selectedValue={propertyAge}
                  onSelect={setPropertyAge}
                  placeholder="Select"
                  size="default"
                  clearable
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">
                  Ownership
                </label>
                <CustomSelect
                  options={[
                    { value: "Freehold", label: "Freehold" },
                    { value: "Leasehold", label: "Leasehold" },
                  ]}
                  selectedValue={ownership}
                  onSelect={setOwnership}
                  placeholder="Select"
                  size="default"
                  clearable
                />
              </div>
            </section>

            {/* Extra filters: deposit, lease, parking, floor pref, price/unit */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CustomSelect
                options={[
                  { value: "Family", label: "Family" },
                  { value: "Bachelors", label: "Bachelors" },
                  { value: "Company", label: "Company lease" },
                ]}
                selectedValue={leaseType}
                onSelect={setLeaseType}
                placeholder="Lease Type"
                size="default"
                clearable
              />
              <CustomSelect
                options={[
                  { value: "Ground", label: "Ground" },
                  { value: "High", label: "High-rise" },
                ]}
                selectedValue={floorPref}
                onSelect={setFloorPref}
                placeholder="Floor"
                size="default"
                clearable
              />
            </section>

            {/* Amenities */}
            <section className="space-y-2 bg-gray-800/30 p-3 rounded-lg border border-gray-700/30">
              <label className="text-gray-300 text-sm font-medium">
                Amenities
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {availableAmenities.map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    onClick={() => toggleAmenity(name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                      amenities.includes(name)
                        ? "bg-green-800/50 border border-green-700/40 text-white"
                        : "bg-gray-800/40 border border-gray-700/30 text-gray-300 hover:border-gray-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {name}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <textarea
                id="other-details"
                name="other-details"
                rows="8"
                value={otherDetails}
                onChange={(e) => setOtherDetails(e.target.value)}
                placeholder="Add any additional query such as:
• Nearby amenities and facilities
• Transportation access
• Special features or inclusions
• House rules or preferences
• Available dates 
• Any other relevant details..."
                className="w-full bg-[#131515] border border-gray-700 rounded-lg p-3 sm:p-4 text-sm text-gray-300 placeholder-gray-500 outline-none focus:border-[#3a6ea5] transition-colors resize-none"
              />
            </section>

            {/* Price per unit / Plot details for Plot-Land */}
            {category === "Plot-Land" && (
              <section className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">
                  Plot / Price specifics
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={pricePerUnit}
                    onChange={(e) => setPricePerUnit(e.target.value)}
                    placeholder="Price per unit area"
                    className="px-3 py-2 rounded-md bg-gray-800/30 border border-gray-700/40 text-gray-200"
                  />
                  <CustomSelect
                    options={[
                      { value: "sqft", label: "sqft" },
                      { value: "sqyard", label: "sqyard" },
                      { value: "acre", label: "acre" },
                    ]}
                    selectedValue={plotAreaUnit}
                    onSelect={setPlotAreaUnit}
                    placeholder="Unit"
                    size="default"
                    clearable
                  />
                </div>
              </section>
            )}
          </div>

          {/* Right: compact preview + actions */}
          <div className="col-span-1 border-l border-gray-800/40 p-6 overflow-y-auto">
            <div className="space-y-4">
              {/* Action buttons */}
              <div className="space-y-3">
                <div className="gap-x-3 flex justify-between items-center">
                  <button
                    onClick={() => handleBroadcast("dealers")}
                    className={deepBlue}
                  >
                    Search Dealers
                  </button>
                  <button
                    onClick={() => handleBroadcast("agencies")}
                    className={deepBlue}
                  >
                    Search Agencies
                  </button>
                </div>
                <button
                  onClick={() => {
                    dispatch(setCurrentRequest(buildPayload()));
                    alert("Saved search locally");
                  }}
                  className={steelGray}
                >
                  Save Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer small */}
        <div className="px-6 py-4 border-t border-gray-700/40 bg-gray-900">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose?.(), 140);
              }}
              className={steelGray + " hover:shadow-none"}
            >
              Close
            </button>
            <button
              onClick={() => handleBroadcast("both")}
              className={oceanBlue}
            >
              Dealers & Agencies
            </button>
          </div>
          <div className="text-xs text-gray-400 bg-blue-200/20 mt-3 rounded-md p-2">
            Tip: Use filters to narrow results.
          </div>
        </div>
      </motion.div>

      {/* Broadcast Modal reused */}
      <BroadcastModal
        openModal={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
      />
    </motion.div>
  );
};

export default TenantRequestForm;
