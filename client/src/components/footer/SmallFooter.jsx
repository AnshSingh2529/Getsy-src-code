import React from "react";

function SmallFooter() {
  return (
    <footer className="w-full border-t border-white/5 bg-transparent backdrop-blur mt-7">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between text-[11px] text-white/50">
          {/* Left: Brand */}
          <div className="flex items-center gap-2">
            <span className="font-medium text-white/70">Getsy</span>
            <span className="hidden sm:inline">—</span>
            <span className="hidden sm:inline">
              Trusted firms & broker marketplace
            </span>
          </div>

          {/* Right: Minimal Utilities */}
          <div className="flex items-center gap-3">
            <a href="/privacy" className="hover:text-white/80 transition">
              Privacy
            </a>
            <span className="opacity-30">•</span>
            <a href="/terms" className="hover:text-white/80 transition">
              Terms
            </a>
            <span className="opacity-30">•</span>
            <span className="text-emerald-400/70">Secure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SmallFooter;
