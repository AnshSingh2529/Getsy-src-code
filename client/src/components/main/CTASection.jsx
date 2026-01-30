import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";

const CTASection = ({ showCTA }) => {
  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-2xl border border-gray-800 bg-gray-900/70 px-6 py-12 lg:px-12 lg:py-16"
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-2xl lg:text-4xl font-semibold text-gray-100 leading-tight">
            Build a Scalable, Professional Real Estate Business
          </h2>

          {/* Subtext */}
          <p className="mt-4 text-gray-400 text-sm lg:text-base max-w-2xl mx-auto">
            A secure, compliant platform designed for firms and brokers who
            want clarity, control, and long-term growth.
          </p>

          {/* Value Points */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <ValueItem
              icon={TrendingUp}
              text="Go live in under 24 hours"
            />
            <ValueItem
              icon={ShieldCheck}
              text="No credit card required"
            />
            <ValueItem
              icon={ShieldCheck}
              text="Cancel anytime"
            />
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              disabled={!showCTA}
              className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition
                ${
                  showCTA
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              Register Your Firm
              <ArrowRight className="w-4 h-4" />
            </button>

            <button className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-medium text-gray-300 border border-gray-700 hover:border-gray-600 hover:bg-gray-800 transition">
              Request a Demo
            </button>
          </div>

          {/* Trust Line */}
          <p className="mt-6 text-xs text-gray-500">
            Trusted by 500+ real estate firms and independent brokers
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;

/* Supporting Component */
const ValueItem = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 text-sm text-gray-300">
    <Icon className="w-4 h-4 text-blue-500" />
    <span>{text}</span>
  </div>
);
