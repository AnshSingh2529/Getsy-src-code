import React, { useState, useEffect } from "react";
import {
  Search,
  X,
  MapPin,
  Clock,
  Home,
  User,
  MessageSquare,
} from "lucide-react";

const BroadcastModal = ({
  openModal,
  closeModal,
  selectedType,
  setSelectedType,
}) => {
  const [radius, setRadius] = useState(5);
  const [properties, setProperties] = useState([]);
  const [phase, setPhase] = useState("searching"); // searching, properties, chat
  const [timer, setTimer] = useState(30);
  const [acceptedProvider, setAcceptedProvider] = useState(null);

  // Mock properties
  const mockProperties = [
    {
      id: 1,
      title: "3BHK Luxury Apartment",
      location: "Downtown",
      price: "₹85 Lakhs",
      area: "1450 sq ft",
      image: "🏢",
    },
    {
      id: 2,
      title: "2BHK Modern Villa",
      location: "Suburbs",
      price: "₹65 Lakhs",
      area: "1200 sq ft",
      image: "🏠",
    },
    {
      id: 3,
      title: "4BHK Penthouse",
      location: "City Center",
      price: "₹1.2 Cr",
      area: "2200 sq ft",
      image: "🏛️",
    },
  ];

  // Timer countdown while searching
  useEffect(() => {
    if (openModal && phase === "searching" && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && phase === "searching") {
      setProperties(mockProperties);
      setAcceptedProvider({ name: "John Doe", type: selectedType }); // Mock provider
      setPhase("properties");
    }
  }, [openModal, phase, timer, selectedType]);

  const handleSearchAgain = () => {
    setPhase("searching");
    setTimer(30);
    setRadius(radius + 5);
    setProperties([]);
    setAcceptedProvider(null);
  };

  const handleAccept = () => {
    setPhase("chat");
  };

  if (!openModal) return null;

  return (
    openModal && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-green-800/50 border-b border-gray-700/50 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {phase === "searching" && (
                <Search className="w-5 h-5 text-gray-300 animate-pulse" />
              )}
              {phase === "properties" && (
                <Home className="w-5 h-5 text-gray-300" />
              )}
              {phase === "chat" && (
                <MessageSquare className="w-5 h-5 text-gray-300" />
              )}
              <h2 className="text-lg font-semibold text-gray-300">
                {phase === "searching" && `Searching for ${selectedType}s...`}
                {phase === "properties" &&
                  `Properties from ${acceptedProvider?.name}`}
                {phase === "chat" && `Chat with ${acceptedProvider?.name}`}
              </h2>
            </div>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {phase === "searching" && (
              <div className="flex flex-col items-center justify-center py-12 space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-green-800/30 rounded-full"></div>
                  <div className="w-24 h-24 border-4 border-green-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                  <Search className="w-10 h-10 text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span>
                      Searching within{" "}
                      <span className="font-semibold text-green-400">
                        {radius} km
                      </span>{" "}
                      radius
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>
                      Time remaining:{" "}
                      <span className="font-semibold text-green-400">
                        {timer}s
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {phase === "properties" && (
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-800/50 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-300" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-300">
                        {acceptedProvider?.name}
                      </h3>
                      <p className="text-sm text-gray-400 capitalize">
                        {acceptedProvider?.type}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {properties.map((property) => (
                    <div
                      key={property.id}
                      className="bg-gray-800/30 border border-gray-700/30 rounded-lg p-4"
                    >
                      <div className="flex gap-3">
                        <div className="text-4xl">{property.image}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-300 text-sm truncate">
                            {property.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1">
                            {property.location}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-green-400 font-semibold text-sm">
                              {property.price}
                            </span>
                            <span className="text-xs text-gray-500">
                              {property.area}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {phase === "properties" && (
            <div className="bg-gray-800/30 border-t border-gray-700/50 px-6 py-4 flex gap-2 justify-end">
              <button
                onClick={handleSearchAgain}
                className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg"
              >
                Search Again
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 bg-green-700 text-white rounded-lg"
              >
                Accept & Chat
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default BroadcastModal;
