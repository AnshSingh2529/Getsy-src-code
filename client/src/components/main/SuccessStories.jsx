import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, Urban Nest Properties",
    rating: 5,
    text:
      "Within three months, our listings scaled significantly and client engagement improved across every channel. The platform delivered exactly what a growing brokerage needs.",
    stat: {
      label: "Revenue Growth",
      value: "150%",
    },
  },
  {
    name: "Michael Chen",
    role: "Senior Broker, Prime Estate Group",
    rating: 5,
    text:
      "The analytics layer alone changed how we operate. We now make decisions backed by data instead of intuition.",
    stat: {
      label: "Qualified Leads",
      value: "2,500+",
    },
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, Horizon Brokers",
    rating: 5,
    text:
      "The white-label experience allowed us to maintain our brand while gaining enterprise-grade tooling. Onboarding was smooth and support has been reliable.",
    stat: {
      label: "Time Saved",
      value: "20 hrs/week",
    },
  },
  {
    name: "David Thompson",
    role: "Managing Director, Elite Properties Co.",
    rating: 5,
    text:
      "Managing multiple agents and thousands of properties is no longer operationally heavy. The system scales cleanly with our business.",
    stat: {
      label: "Active Listings",
      value: "5,000+",
    },
  },
];

const SuccessStories = () => {
  return (
    <section className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl lg:text-4xl font-semibold text-gray-100">
          Trusted by Leading Real Estate Firms
        </h2>
        <p className="mt-3 text-gray-400 max-w-2xl mx-auto text-sm lg:text-base">
          Real outcomes from agencies building scalable, compliant businesses on our platform.
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="h-full"
          >
            <div className="h-full rounded-xl border border-gray-800 bg-gray-900/60 p-6 transition hover:border-gray-700">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-blue-500 text-blue-500"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 leading-relaxed mb-6 text-sm lg:text-base">
                “{t.text}”
              </p>

              {/* Outcome */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-blue-500/30 bg-blue-500/10 mb-6">
                <span className="text-blue-400 font-semibold">
                  {t.stat.value}
                </span>
                <span className="text-gray-400 text-xs">
                  {t.stat.label}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-200">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-gray-100 font-medium text-sm">
                    {t.name}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-300 mb-4 text-base">
          Build a scalable, compliant real-estate business.
        </p>
        <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition font-medium text-white">
          Get Started
        </button>
      </motion.div>
    </section>
  );
};

export default SuccessStories;
