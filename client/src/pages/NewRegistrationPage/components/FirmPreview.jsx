import { ArrowUpRightFromCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FirmPreview() {
  const navigate = useNavigate();

  const handlePreviewVisit = () => {
   navigate("/top-agencies")
  }
  return (
    <div className="relative border border-gray-800/60 rounded-md overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Preview Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800/60">
        <span className="text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
          Website Preview
        </span>

        <span className="flex items-center gap-1 text-[10px] text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full bg-emerald-500/10">
          Live Layout
        </span>
      </div>

      {/* Fake Navbar */}
      <div className="px-3 py-2 border-b border-gray-800/50 flex items-center justify-between">
        <div className="h-3 w-20 rounded bg-gray-700/60" />
        <div className="flex gap-2">
          <div className="h-3 w-10 rounded bg-gray-800/70" />
          <div className="h-3 w-10 rounded bg-gray-800/70" />
        </div>
      </div>

      {/* Main Body */}
      <div className="p-3">
        {/* Filter Chips */}
        <div className="flex gap-2 mb-3">
          <div className="h-4 w-14 rounded bg-yellow-700/40 border border-yellow-600/40" />
          <div className="h-4 w-20 rounded bg-green-700/30 border border-green-600/40" />
        </div>

        {/* Split View */}
        <div className="flex gap-2">
          {/* Profile Section */}
          <div className="w-[30%] rounded-md border border-gray-800/50 bg-gray-950/40 p-2 space-y-2">
            <div className="h-8 w-8 rounded-full bg-gray-700/60" />
            <div className="h-2 w-full rounded bg-gray-700/50" />
            <div className="h-2 w-5/6 rounded bg-gray-800/60" />
            <div className="h-2 w-4/6 rounded bg-gray-800/60" />
          </div>

          {/* Property Feed */}
          <div className="w-[70%] rounded-md border border-gray-800/50 bg-gray-950/40 p-2 space-y-2">
            {/* Tabs */}
            <div className="flex gap-1 mb-2">
              {["Rent", "Sale", "Lease"].map((t) => (
                <div
                  key={t}
                  className="h-4 w-12 rounded bg-indigo-500/10 border border-indigo-400/20"
                />
              ))}
            </div>

            {/* Property Cards */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-10 rounded-md bg-gradient-to-r from-slate-800/60 to-slate-900/60 border border-gray-700/50"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="px-3 py-2 border-t border-gray-800/60 bg-black/40 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="h-3 w-10 rounded bg-gray-700/60" />
          <div className="h-3 w-12 rounded bg-emerald-600/30 border border-emerald-500/40" />
          <div className="h-3 w-14 rounded bg-indigo-600/30 border border-indigo-500/40" />
        </div>

        <div className="h-4 w-10 rounded bg-indigo-600/60" />
      </div>

      {/* Overlay CTA */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition">
        <div
          onClick={handlePreviewVisit}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-700 text-white shadow-lg cursor-pointer"
        >
          Preview Full Page
          <ArrowUpRightFromCircleIcon size={14} />
        </div>
      </div>
    </div>
  );
}
