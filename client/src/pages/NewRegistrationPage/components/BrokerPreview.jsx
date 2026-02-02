import React from "react";
import { motion } from "framer-motion";
import {
  Globe2,
  MessageCircle,
  LineChart,
  Lock,
  ArrowUpRight,
} from "lucide-react";

function BrokerPreview() {
  return (
    <div className="relative rounded-2xl border border-gray-800/60 overflow-hidden bg-gradient-to-br from-black via-gray-950 to-black">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800/50">
        <div>
          <p className="text-sm font-semibold text-white">
            Broker Intelligence Hub
          </p>
          <p className="text-xs text-gray-400">
            Individual brokers • Region-wise • Deal-focused
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold
                     px-3 py-1.5 rounded-lg
                     bg-indigo-600/20 text-indigo-300
                     border border-indigo-500/30
                     hover:bg-indigo-600/30 transition"
        >
          Enter
          <ArrowUpRight size={12} />
        </motion.button>
      </div>

      {/* Main Preview Area */}
      <div className="grid grid-cols-12 min-h-[170px]">
        {/* Left: Channel / Country List */}
        <div className="col-span-4 border-r border-gray-800/50 p-3 space-y-2 bg-gray-950/40">
          {["India", "UAE", "UK"].map((region) => (
            <div
              key={region}
              className="flex items-center justify-between
                         px-3 py-2 rounded-lg
                         bg-gray-900/40
                         border border-gray-800/50
                         text-xs text-gray-300"
            >
              <div className="flex items-center gap-2">
                <Globe2 size={14} className="text-indigo-400" />
                {region}
              </div>

              <Lock size={12} className="text-gray-500" />
            </div>
          ))}
        </div>

        {/* Right: Content / Chat / Deal Area */}
        <div className="col-span-8 p-4 relative">
          {/* Abstract Content Blocks */}
          <div className="space-y-3">
            <div className="h-10 rounded-lg bg-gradient-to-r from-gray-800/40 to-gray-700/20 border border-gray-800/50" />
            <div className="h-10 rounded-lg bg-gradient-to-r from-gray-800/30 to-gray-700/10 border border-gray-800/50" />
          </div>

          {/* Floating Indicators */}
          <div className="absolute bottom-2 right-2 flex items-center gap-2 text-[3px] text-gray-400">
            <div className="flex items-center gap-1 flex-1">
              <MessageCircle size={12} />
              Live broker chats
            </div>
            <span className="opacity-40">•</span>
            <div className="flex items-center gap-1 flex-1">
              <LineChart size={12} />
              Deal signals
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-800/50 bg-black/40">
        <p className="text-[11px] text-gray-400">
          Inside the member area: country-specific broker channels, live pricing
          intelligence, private deal rooms, and direct broker conversations —
          organized like a professional chat workspace.
        </p>
      </div>
    </div>
  );
}

export default BrokerPreview;
