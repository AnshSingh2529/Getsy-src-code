import { motion } from "framer-motion";

const TrustedBySection = () => {
  const companies = [
    "Stellar Realty",
    "Urban Nest Properties",
    "Prime Estate Group",
    "Horizon Brokers",
    "Elite Properties Co.",
    "Metro Real Estate",
  ];

  return (
    <section className="w-full border-t border-gray-800/60 bg-[#0f1111]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-4"
        >
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Trusted by professionals worldwide
          </p>
        </motion.div>

        {/* Logos / Names Row */}
        <div className="relative overflow-hidden">
          {/* Soft edge fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0f1111] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0f1111] to-transparent z-10" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 28,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex items-center gap-10 whitespace-nowrap"
          >
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors"
              >
                {company}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
