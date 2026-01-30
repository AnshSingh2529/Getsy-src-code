import { motion } from "framer-motion";
import { UserPlus, Settings, Rocket, BarChart3 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Account",
      description: "Sign up and select a plan aligned with your business goals",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Settings,
      title: "Brand & Configure",
      description:
        "Customize your website with branding, layouts, and listings",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Rocket,
      title: "Publish & Operate",
      description: "List properties, manage leads, and close deals efficiently",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: BarChart3,
      title: "Scale with Insights",
      description:
        "Track performance, capture demand, and grow with confidence",
      color: "from-orange-500 to-red-500",
      highlight: true,
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
          From Sign-Up to Scale
        </h2>
        <p className="text-gray-300 text-sm lg:text-lg max-w-2xl mx-auto">
          Launch faster, operate smarter, and grow your real estate business on
          a platform built for momentum
        </p>
      </motion.div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="relative group"
          >
            {/* Connector */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-gray-700/70 to-transparent z-0" />
            )}

            <div
              className={`relative rounded-xl p-6 border transition-all duration-300 z-5
              bg-gradient-to-br from-[#1a1d1d] to-[#252929]
              ${
                step.highlight
                  ? "border-orange-500/40 shadow-xl shadow-orange-500/20 scale-[1.03]"
                  : "border-gray-800 hover:border-gray-700 hover:shadow-lg hover:shadow-cyan-500/10"
              }`}
            >
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500">
                {index + 1}
              </div>

              {/* Icon */}
              <div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${step.color} mb-6`}
              >
                <step.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
