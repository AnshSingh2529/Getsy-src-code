import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageCircleMore,
  PhoneCallIcon,
  PhoneIncomingIcon,
  VerifiedIcon,
} from "lucide-react";

function ProfileSection() {
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (feedback) {
      const t = setTimeout(() => setFeedback(""), 3000);
      return () => clearTimeout(t);
    }
  }, [feedback]);

  return (
    <div className="space-y-2 h-full overflow-y-hidden outline-none">
      <div className="flex flex-col space-y-3 relative">
        {/* Background Banner Image */}
        <div className="relative flex items-center justify-center w-full bg-gray-500/10 rounded-md p-0 text-gray-400 h-20 text-xs">
          Company Banner
          {/* Negotiable tag */}
          <span className="absolute top-1 right-1 bg-green-800/20 border border-green-700 rounded-sm p-1 text-[5px] text-green-600">
            Negotiable
          </span>
        </div>
        {/* Owner details */}
        <div className="flex items-center justify-stretch box-content w-full outline-none">
          <div className="w-full"></div>
          <div className="flex flex-col space-y-2 w-full">
            {/* Owner-Name */}
            <span className="flex items-center justify-center bg-gray-800/10 border border-gray-800/30 rounded-md px-3 py-0.5 text-sm font-medium text-gray-300">
              Owner Name
            </span>
            {/* Working experiance Since */}
            <span className="flex items-center justify-between space-x-2">
              <p className="text-[8px] text-gray-600">Operating Since:</p>
              <p className="flex items-center justify-center bg-gray-800/10 border border-gray-800/30 rounded-md px-4 py-0.5 text-[10px] font-medium text-gray-500">
                Year*
              </p>
            </span>
            <span className="flex items-center justify-between space-x-2">
              <p className="text-[8px] text-gray-600">Deals Closed:</p>
              <p className="flex items-center justify-center bg-gray-800/10 border border-gray-800/30 rounded-md px-4 py-0.5 text-[10px] font-medium text-gray-500">
                Deals*
              </p>
            </span>
          </div>
        </div>
        <div className="absolute top-8 rounded-full bg-gray-800/10 w-28 h-28 border border-gray-800/30 flex items-center justify-center text-gray-500">
          Profile
        </div>
      </div>
      {/* Contact CTAs */}
      <div className="flex flex-1 items-center justify-between w-full bg-gray-950/30 rounded-md border border-gray-800/40 py-2 px-1">
        <div className="flex items-center justify-center space-x-1">
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 0.98, backgroundColor: "green" }}
            onClick={() => setOpenRequestModal(true)}
            className="rounded-md py-2 px-2 text-xs bg-green-800 text-green-100 font-medium shadow-lg  flex items-center justify-center space-x-2"
          >
            <p>Request Call</p> <PhoneIncomingIcon width={12} height={12} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 0.98, backgroundColor: "blue" }}
            onClick={() =>
              setFeedback(
                "Contact details for instant call have been sent via SMS.",
              )
            }
            className="rounded-lg py-2 px-2 text-xs bg-blue-700 text-blue-100 font-medium shadow-lg border-t-2 border-blue-400 flex items-center justify-center space-x-2"
          >
            <p>Instant Call </p>
            <PhoneCallIcon width={12} height={12} />
          </motion.button>
        </div>
        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 0.98, backgroundColor: "green" }}
          onClick={() => {
            const phone = "919999999999"; // dealer number
            const msg = encodeURIComponent(
              "Hi, I'm interested in your property listing.",
            );
            window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
          }}
          className="rounded-xl py-2 px-2 text-xs bg-green-700 text-green-100 font-medium shadow-lg flex items-center justify-center space-x-2 border-t-2 border-green-400"
        >
          <p>WhatsApp</p> <MessageCircleMore width={12} height={12} />
        </motion.button>
      </div>
      {/* Contact Modals */}
      {openRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-[340px] rounded-xl bg-gray-900 border border-gray-700 p-4"
          >
            <p className="text-sm font-semibold text-gray-200">
              Request a Call Back
            </p>

            <p className="text-[11px] text-gray-400 mt-1">
              Help us understand your requirement better
            </p>

            {/* Transaction Type */}
            <div className="mt-3">
              <label className="text-[10px] text-gray-400">Looking to</label>
              <select className="mt-1 w-full rounded-md bg-gray-800 border border-gray-700 text-xs text-gray-300 p-2">
                <option value="">Select intent</option>
                <option>Buy</option>
                <option>Rent</option>
                <option>Lease</option>
                <option>Explore New Projects</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-gray-400">
                  Property Type
                </label>
                <select className="mt-1 w-full rounded-md bg-gray-800 border border-gray-700 text-xs text-gray-300 p-2">
                  <option value="">Select</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-gray-400">Occupancy</label>
                <select className="mt-1 w-full rounded-md bg-gray-800 border border-gray-700 text-xs text-gray-300 p-2">
                  <option value="">Select</option>
                  <option>Family</option>
                  <option>Individual</option>
                  <option>Business Use</option>
                </select>
              </div>
            </div>

            {/* Budget */}
            <div className="mt-3">
              <label className="text-[10px] text-gray-400">Budget Range</label>
              <select className="mt-1 w-full rounded-md bg-gray-800 border border-gray-700 text-xs text-gray-300 p-2">
                <option value="">Select range</option>
                <option>Under ₹25 Lakhs</option>
                <option>₹25 – ₹50 Lakhs</option>
                <option>₹50 – ₹1 Cr</option>
                <option>₹1 Cr+</option>
              </select>
            </div>

            {/* Buyer Profile */}
            <div className="mt-3">
              <label className="text-[10px] text-gray-400">
                Employment Type
              </label>
              <select className="mt-1 w-full rounded-md bg-gray-800 border border-gray-700 text-xs text-gray-300 p-2">
                <option value="">Select</option>
                <option>Salaried</option>
                <option>Self-Employed</option>
                <option>Business Owner</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setOpenRequestModal(false)}
                className="text-xs text-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setOpenRequestModal(false);
                  setFeedback(
                    "Thanks! Our property expert will contact you shortly.",
                  );
                }}
                className="rounded-md bg-green-700 px-4 py-1.5 text-xs text-green-100"
              >
                Request Call
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="w-full h-[1px] bg-gray-700/10"></div>
      {/* Introduction – Video Placeholders */}
      <div className="p-3 bg-gray-950/30 rounded-xl">
        <div className="grid grid-cols-3 gap-3">
          {/* Main Videos */}
          {[1, 2].map((_, idx) => (
            <div
              key={idx}
              className="
          relative h-24
          rounded-lg
          border border-gray-800/60
          bg-gradient-to-br from-gray-900/60 to-gray-950/60
          flex items-center justify-center
          overflow-hidden
        "
            >
              {/* Play Icon */}
              <div
                className="
          flex items-center justify-center
          w-8 h-8
          rounded-full
          bg-black/50
          border border-gray-700
          backdrop-blur-sm cursor-pointer
        "
              >
                <svg
                  className="w-5 h-5 text-white ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              {/* Label */}
              <span className="absolute bottom-1 left-2 translate-x-0 text-[8px] text-gray-400 tracking-wide">
                Partner Overview
              </span>
            </div>
          ))}

          {/* Show More */}
          <div
            className="
        relative h-24
        rounded-lg
        border border-dashed border-gray-700
        bg-gray-900/20
        flex flex-col items-center justify-center
        text-gray-400
        cursor-pointer
        hover:border-gray-500 hover:text-gray-300
        transition
      "
          >
            <span className="text-sm font-semibold">+ More</span>
            <span className="text-[10px] tracking-wide mt-1">
              View all videos
            </span>
          </div>
        </div>
      </div>

      {/* Testimonials – Client Deal Avatars */}
      <div className="p-3 bg-gray-950/30 rounded-xl">
        <p className="text-xs font-semibold text-gray-400 mb-2 tracking-wide">
          RECENT DEALS CLOSED
        </p>

        <div className="grid grid-cols-6 gap-3 items-center">
          {[1, 2, 3, 4, 5].map((_, idx) => (
            <div
              key={idx}
              className="
          flex flex-col items-center gap-1
        "
            >
              {/* Client Image */}
              <div
                className="
          w-10 h-10
          rounded-full
          border border-gray-700
          bg-gray-800
          overflow-hidden
        "
              >
                <img
                  src={`https://i.pravatar.cc/100?img=${idx + 10}`}
                  alt="Client"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Deal Tag */}
              <span className="text-[5px] text-gray-500">Client Name</span>
            </div>
          ))}

          {/* More indicator */}
          <div
            className="
      flex items-center justify-center
      w-10 h-10
      rounded-full
      border border-dashed border-gray-700
      text-xs text-gray-500
      cursor-pointer
      hover:border-gray-500 hover:text-gray-300
      transition
    "
          >
            +12
          </div>
        </div>
      </div>
      {feedback && (
        <div className="fixed top-16 z-50 inset-x-0 flex justify-center pointer-events-none">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="pointer-events-auto flex items-center rounded-lg bg-gray-900 border border-gray-700 px-4 py-2 text-xs text-gray-200 shadow-xl"
          >
            <VerifiedIcon className="text-green-500 mr-2" />
            {feedback}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default ProfileSection;
