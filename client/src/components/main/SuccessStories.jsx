import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const CARD_WIDTH = 320; // must match card width
const GAP = 16;

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, Urban Nest Properties",
    rating: 5,
    text: "Within three months, our listings scaled significantly and client engagement improved across every channel.",
    stat: { label: "Revenue Growth", value: "150%" },
  },
  {
    name: "Michael Chen",
    role: "Senior Broker, Prime Estate Group",
    rating: 5,
    text: "Decisions are now backed by data instead of intuition. It changed how we operate.",
    stat: { label: "Qualified Leads", value: "2,500+" },
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, Horizon Brokers",
    rating: 5,
    text: "We retained our brand identity while gaining enterprise-grade tooling.",
    stat: { label: "Time Saved", value: "20 hrs/week" },
  },
  {
    name: "David Thompson",
    role: "Managing Director, Elite Properties Co.",
    rating: 5,
    text: "The system scales cleanly as our portfolio grows.",
    stat: { label: "Active Listings", value: "5,000+" },
  },
];

const SuccessStories = () => {
  const [index, setIndex] = useState(0);

  const maxIndex = testimonials.length - 1;

  const slideX = -(index * (CARD_WIDTH + GAP));

  return (
    <section className="w-full border-t border-gray-800/60 bg-[#0f1111]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-100">
              Success Stories
            </h3>
            <p className="text-xs text-gray-500">
              Measurable outcomes from real estate teams
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIndex((i) => Math.max(i - 1, 0))}
              disabled={index === 0}
              className="
                p-1.5 rounded-md border border-gray-800
                text-gray-400 hover:text-white
                disabled:opacity-30 disabled:cursor-not-allowed
                cursor-pointer transition
              "
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={() => setIndex((i) => Math.min(i + 1, maxIndex))}
              disabled={index === maxIndex}
              className="
                p-1.5 rounded-md border border-gray-800
                text-gray-400 hover:text-white
                disabled:opacity-30 disabled:cursor-not-allowed
                cursor-pointer transition
              "
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: slideX }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
            className="flex gap-4"
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="
                  shrink-0
                  w-[320px]
                  rounded-xl
                  border border-gray-800
                  bg-gray-900/50
                  p-4
                "
              >
                {/* Rating */}
                <div className="flex gap-1 mb-2">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-3.5 h-3.5 fill-blue-500 text-blue-500"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                  “{t.text}”
                </p>

                {/* Metric */}
                <div
                  className="inline-flex items-center gap-2 px-2.5 py-1
                                rounded-md border border-blue-500/30
                                bg-blue-500/10 mb-4"
                >
                  <span className="text-blue-400 font-semibold text-sm">
                    {t.stat.value}
                  </span>
                  <span className="text-gray-400 text-[11px]">
                    {t.stat.label}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700
                                  flex items-center justify-center
                                  text-xs font-semibold text-gray-200"
                  >
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-gray-100 text-xs font-medium">
                      {t.name}
                    </p>
                    <p className="text-gray-400 text-[11px]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
