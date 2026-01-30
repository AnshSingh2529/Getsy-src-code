import { motion } from "framer-motion";
import { Check, Star, Zap, Crown } from "lucide-react";
import { useState } from "react";

const ServicePackages = ({ canBecomeDealer }) => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const packages = [
    {
      name: "Starter",
      icon: Star,
      description: "Perfect for new brokers getting started",
      monthlyPrice: 49,
      yearlyPrice: 490,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Custom Portfolio Website",
        "Up to 25 Property Listings",
        "Basic Analytics Dashboard",
        "Email Support",
        "Mobile Responsive Design",
        "SSL Certificate Included",
      ],
      popular: false,
    },
    {
      name: "Professional",
      icon: Zap,
      description: "For growing agencies and firms",
      monthlyPrice: 99,
      yearlyPrice: 990,
      color: "from-purple-500 to-pink-500",
      features: [
        "Everything in Starter",
        "Unlimited Property Listings",
        "Advanced Analytics & Reports",
        "Priority Email & Chat Support",
        "Custom Domain Integration",
        "SEO Optimization Tools",
        "Lead Management System",
        "Social Media Integration",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      icon: Crown,
      description: "For established real estate businesses",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      color: "from-orange-500 to-red-500",
      features: [
        "Everything in Professional",
        "Multi-Agent Management",
        "White-Label Solutions",
        "24/7 Priority Support",
        "API Access",
        "Custom Integrations",
        "Dedicated Account Manager",
        "Advanced CRM Features",
        "Training & Onboarding",
      ],
      popular: false,
    },
  ];

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
          Choose Your Plan
        </h2>
        <p className="text-gray-400 text-sm lg:text-lg max-w-2xl mx-auto mb-8">
          Flexible subscription plans designed to scale with your business
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-4 bg-[#1a1d1d] rounded-full p-1 border border-gray-800">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              billingCycle === "monthly"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              billingCycle === "yearly"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Yearly
            <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              Save 17%
            </span>
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {packages.map((pkg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className={`relative group ${
              pkg.popular ? "lg:scale-105 lg:-mt-4" : ""
            }`}
          >
            {/* Popular Badge */}
            {pkg.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                  MOST POPULAR
                </div>
              </div>
            )}

            <div
              className={`relative bg-gradient-to-br from-[#1a1d1d] to-[#252929] rounded-2xl p-8 border ${
                pkg.popular ? "border-purple-500/50" : "border-gray-800"
              } hover:border-gray-700 transition-all duration-300 hover:shadow-xl ${
                pkg.popular ? "hover:shadow-purple-500/20" : "hover:shadow-cyan-500/10"
              }`}
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${pkg.color} bg-opacity-10 mb-6`}>
                <pkg.icon className={`w-8 h-8 bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`} />
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {pkg.name}
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                {pkg.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl lg:text-5xl font-bold text-white">
                    ${billingCycle === "monthly" ? pkg.monthlyPrice : pkg.yearlyPrice}
                  </span>
                  <span className="text-gray-400 text-sm">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                {billingCycle === "yearly" && (
                  <p className="text-green-400 text-xs mt-2">
                    Save ${(pkg.monthlyPrice * 12) - pkg.yearlyPrice} per year
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 mb-8 ${
                  pkg.popular
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30"
                    : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                } ${!canBecomeDealer ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={!canBecomeDealer}
              >
                {canBecomeDealer ? "Get Started" : "Contact Sales"}
              </button>

              {/* Features */}
              <div className="space-y-4">
                <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide">
                  What's Included:
                </p>
                {pkg.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${pkg.color} bg-opacity-20 flex items-center justify-center mt-0.5`}>
                      <Check className={`w-3 h-3 bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`} />
                    </div>
                    <span className="text-gray-300 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Custom Enterprise Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 text-center"
      >
        <div className="inline-block bg-gradient-to-r from-[#1a1d1d] to-[#252929] rounded-xl p-6 border border-gray-800">
          <p className="text-gray-300 mb-2">
            Need a custom solution for your organization?
          </p>
          <button className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
            Contact our sales team →
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicePackages;
