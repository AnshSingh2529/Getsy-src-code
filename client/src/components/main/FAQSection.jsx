import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How quickly can I get my portfolio website live?",
      answer:
        "Most agencies go live within 24 hours. Our onboarding flow is streamlined, and our team assists with setup and listings if needed.",
    },
    {
      question: "Can I use my own domain?",
      answer:
        "Yes. Professional and Enterprise plans support custom domains. We handle configuration and SSL for you.",
    },
    {
      question: "What kind of support is included?",
      answer:
        "Starter includes email support. Professional adds priority chat, and Enterprise offers 24/7 support with a dedicated manager.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "You can upgrade anytime. Downgrades apply at the end of the billing cycle with no penalties.",
    },
    {
      question: "Is there a listing limit?",
      answer:
        "Starter supports up to 25 listings. Professional and Enterprise plans allow unlimited properties.",
    },
  ];

  return (
    <section className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl lg:text-3xl font-semibold text-gray-100">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-gray-400 text-sm max-w-xl mx-auto">
          Clear answers to common questions about our platform.
        </p>
      </motion.div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto divide-y divide-gray-800 border border-gray-800 rounded-xl overflow-hidden bg-gray-900/50">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-900 transition"
            >
              <span className="text-sm lg:text-base font-medium text-gray-100 pr-4">
                {faq.question}
              </span>

              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Compact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-gray-400 mb-3">Need more clarity?</p>
        <button className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 transition text-sm font-medium text-white">
          Contact Support
        </button>
      </motion.div>
    </section>
  );
};

export default FAQSection;
