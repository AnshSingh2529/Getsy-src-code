import React from "react";
import { motion } from "framer-motion";
import { Globe2, MessageSquareText, Layers3, Lock } from "lucide-react";
import BecomeMemberCTA from "../cta/BecomeMemberCTA";

function MemberWorkspaceBanner() {
  return (
    <section className="relative w-full overflow-hidden border-b border-gray-800/60 bg-gradient-to-b from-black/30 via-gray-950/70 to-black/80 rounded-md">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:18px_18px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left Content */}
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold tracking-wide text-indigo-400 uppercase">
              Member-Only Workspace
            </p>

            <h1 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">
              A Structured Intelligence Layer for
              <span className="text-indigo-400"> Global Property Markets</span>
            </h1>

            <p className="text-sm text-gray-400 leading-relaxed">
              Join a private, chat-driven environment where brokers, deals, and
              regional property insights are organized into country-wise
              channels—built for speed, clarity, and serious decision-making.
            </p>

            {/* CTA Row */}
            <div className="flex items-center gap-3 pt-2">
              <BecomeMemberCTA />

              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Lock size={12} />
                Members only
              </div>
            </div>
          </div>

          {/* Right Architecture Preview */}
          <div className="w-full lg:w-[420px] rounded-2xl border border-gray-800/60 bg-gray-950/50 p-4 backdrop-blur-sm">
            {/* Fake Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-300">
                Workspace Architecture
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-indigo-500/30 text-indigo-400 bg-indigo-500/10">
                Preview
              </span>
            </div>

            <div className="grid grid-cols-12 gap-3 min-h-[160px]">
              {/* Channels */}
              <div className="col-span-4 rounded-lg border border-gray-800/50 bg-black/40 p-2 space-y-2">
                {["India", "UAE", "UK"].map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-gray-900/50 text-xs text-gray-300"
                  >
                    <Globe2 size={12} className="text-indigo-400" />
                    {c}
                  </div>
                ))}
              </div>

              {/* Chat / Intelligence Area */}
              <div className="col-span-8 rounded-lg border border-gray-800/50 bg-black/30 p-2 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-3 rounded bg-gray-800/60" />
                  <div className="h-3 rounded bg-gray-800/40 w-5/6" />
                  <div className="h-3 rounded bg-gray-800/30 w-4/6" />
                </div>

                <div className="flex items-center justify-end gap-3 text-[11px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <MessageSquareText size={12} />
                    Live chats
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers3 size={12} />
                    Deal signals
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MemberWorkspaceBanner;
