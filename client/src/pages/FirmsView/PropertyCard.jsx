import { motion } from "framer-motion";
import { Heart, MapPin, PhoneCall, Calendar, IndianRupee } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../store/wishlist/wishlistSlice.jsx";

export default function PropertyCard({ item, index }) {
  const dispatch = useDispatch();

  const isWishlisted = useSelector((state) =>
    state.wishlist.items.some((i) => i.id === item.id),
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      className="group relative flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition"
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden rounded-t-xl bg-zinc-800">
        <img
          src={item.image}
          alt={item.title}
          className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Wishlist Toggle */}
        <button
          onClick={() => dispatch(toggleWishlist(item))}
          className="absolute right-2 top-2 rounded-md bg-black/60 p-1.5 transition"
        >
          <Heart
            size={14}
            className={
              isWishlisted ? "fill-red-500 text-red-500" : "text-zinc-300"
            }
          />
        </button>

        <span className="absolute left-2 bottom-2 rounded-md bg-black/60 px-2 py-0.5 text-[11px] text-zinc-200">
          {item.status}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3">
        <span className="mb-1 text-[11px] uppercase tracking-wide text-zinc-400">
          {item.type} · {item.subType}
        </span>

        <h3 className="mb-1 line-clamp-1 text-sm font-medium text-zinc-100">
          {item.title}
        </h3>

        <div className="mb-2 flex items-center gap-1 text-xs text-zinc-400">
          <MapPin size={12} />
          <span className="truncate">{item.location}</span>
        </div>

        <div className="flex-1" />

        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm font-semibold text-zinc-100">
            <IndianRupee size={14} />
            {item.price}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-zinc-500">
            <Calendar size={12} />
            {item.listedDate}
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 rounded-md border border-zinc-700 bg-zinc-800 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition">
            View
          </button>

          <button className="rounded-md border border-zinc-700 bg-zinc-800 px-3 hover:bg-zinc-700 transition">
            <PhoneCall size={14} className="text-zinc-300" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
