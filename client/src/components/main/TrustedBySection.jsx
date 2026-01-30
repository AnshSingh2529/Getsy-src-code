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
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          Trusted by Leading Firms
        </h2>
        <p className="text-gray-400 text-sm lg:text-base">
          Join hundreds of successful real estate professionals
        </p>
      </motion.div>

      <div className="relative overflow-hidden py-8">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#131515] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#131515] to-transparent z-10" />

        {/* Scrolling Container */}
        <motion.div
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex gap-8 lg:gap-12"
        >
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-gradient-to-br from-[#1a1d1d] to-[#252929] rounded-lg px-8 py-4 border border-gray-800"
            >
              <p className="text-gray-300 font-semibold whitespace-nowrap">
                {company}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TrustedBySection;
