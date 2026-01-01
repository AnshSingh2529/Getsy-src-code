import SocialMediaCards from "./SocialMediaCards.jsx";
import {
  Mail,
  Phone,
  MapPin,
  Home,
  Building2,
  Users,
  Shield,
  FileText,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about", icon: Users },
      { name: "How It Works", href: "/how-it-works", icon: HelpCircle },
      { name: "Careers", href: "/careers", icon: Building2 },
      { name: "Contact", href: "/contact", icon: Mail },
    ],
    resources: [
      { name: "Blog", href: "/blog", icon: FileText },
      { name: "Help Center", href: "/help", icon: HelpCircle },
      { name: "Privacy Policy", href: "/privacy", icon: Shield },
      { name: "Terms of Service", href: "/terms", icon: FileText },
    ],
    properties: [
      { name: "Featured Listings", href: "/featured", icon: Home },
      { name: "New Properties", href: "/new", icon: Building2 },
      { name: "Popular Locations", href: "/locations", icon: MapPin },
      { name: "Property Types", href: "/types", icon: Building2 },
    ],
  };

  return (
    <footer className="relative bg-[#131515] text-gray-300 w-full border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <Home className="w-6 h-6 text-blue-400" />
                Getsy
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Finding homes in cities with ease. Your trusted partner in
                discovering the perfect property for your next chapter.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:info@getsy.com"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-blue-400 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@getsy.com</span>
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-blue-400 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 123 456 7890</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <div className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Lucknow, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <link.icon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <link.icon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Properties
            </h4>
            <ul className="space-y-3">
              {footerLinks.properties.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <link.icon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-white font-semibold text-lg mb-2">
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm mb-6">
              Subscribe to our newsletter for the latest property listings and
              market insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-80 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                aria-label="Email for newsletter"
              />
              <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 group">
                Subscribe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-[#0a0b0b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-xs text-gray-500 text-center md:text-left">
              &copy; {currentYear} Getsy. All rights reserved. Made with care in
              India.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 hidden sm:inline">
                Follow us:
              </span>
              <SocialMediaCards />
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <a
                href="/sitemap"
                className="hover:text-blue-400 transition-colors"
              >
                Sitemap
              </a>
              <span className="text-gray-700">|</span>
              <a
                href="/accessibility"
                className="hover:text-blue-400 transition-colors"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
    </footer>
  );
};

export { Footer };
