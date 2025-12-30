import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  User,
  MessageSquare,
  Heart,
  Building2,
  Users,
  Eye,
  Clock,
  HelpCircle,
  Settings,
  LogOut,
  Edit,
  Key,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Check,
  X,
  ChevronRight,
  Home,
  Menu,
} from "lucide-react";
import { logout as logoutAction } from "../features/auth/authSlice";
import { authApi, useLogoutMutation } from "../api/api/authApi.js";
import store from "../store/store.js";
import { useAuth } from "../features/auth/hooks.js";

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [theme, setTheme] = useState("auto");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user } = useAuth();
  const data = {
    name: user?.username,
    email: user?.email,
    role: user?.role,
    avatar: user?.username[0],
    verified: user?.isAuthenticated,
    status: !user?.username ? "not_active" : "active"
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    applyTheme(savedTheme);

    if (savedTheme === "auto") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e) => {
        document.documentElement.classList.toggle("dark", e.matches);
      };
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;

    if (newTheme === "auto") {
      root.classList.toggle(
        "dark",
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } else {
      root.classList.toggle("dark", newTheme === "dark");
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
  };

  // Mock data
  const mockChats = [
    {
      id: 1,
      name: "Metropolitan Realty",
      role: "AGENCY",
      lastMessage: "Thank you for your interest...",
      time: "2 hours ago",
      unread: 2,
    },
    {
      id: 2,
      name: "John Parker",
      role: "DEALER",
      lastMessage: "I can schedule a viewing for...",
      time: "5 hours ago",
      unread: 0,
    },
    {
      id: 3,
      name: "Coastal Properties",
      role: "AGENCY",
      lastMessage: "The property is still available",
      time: "1 day ago",
      unread: 1,
    },
  ];

  const mockProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      location: "Manhattan, NY",
      price: "$850,000",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
    },
    {
      id: 2,
      title: "Luxury Beach Villa",
      location: "Miami, FL",
      price: "$2,500,000",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
    },
    {
      id: 3,
      title: "Suburban Family Home",
      location: "Austin, TX",
      price: "$650,000",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
    },
  ];

  const mockAgencies = [
    {
      id: 1,
      name: "Metropolitan Realty Group",
      verified: true,
      properties: 145,
    },
    { id: 2, name: "Coastal Properties LLC", verified: true, properties: 89 },
    { id: 3, name: "Urban Living Solutions", verified: false, properties: 56 },
  ];

  const mockDealers = [
    {
      id: 1,
      name: "John Parker",
      role: "DEALER",
      verified: true,
      listings: 23,
    },
    { id: 2, name: "Emily Chen", role: "DEALER", verified: true, listings: 45 },
    {
      id: 3,
      name: "Michael Ross",
      role: "DEALER",
      verified: true,
      listings: 31,
    },
  ];

  const mockFollowingAgencies = [
    { id: 1, name: "Prime Estates", followedDate: "2 weeks ago" },
    { id: 2, name: "Elite Realty Partners", followedDate: "1 month ago" },
    { id: 3, name: "Horizon Properties", followedDate: "3 months ago" },
  ];

  const mockFollowingDealers = [
    { id: 1, name: "David Miller", role: "DEALER", followedDate: "1 week ago" },
    {
      id: 2,
      name: "Lisa Thompson",
      role: "DEALER",
      followedDate: "3 weeks ago",
    },
  ];

  const mockRecentContacts = [
    {
      id: 1,
      name: "Metropolitan Realty",
      role: "AGENCY",
      type: "Chat",
      time: "2 hours ago",
    },
    {
      id: 2,
      name: "John Parker",
      role: "DEALER",
      type: "Inquiry",
      time: "1 day ago",
    },
    {
      id: 3,
      name: "Coastal Properties",
      role: "AGENCY",
      type: "Call",
      time: "3 days ago",
    },
  ];

  const navigation = [
    { id: "profile", label: "Profile Overview", icon: User },
    { id: "chats", label: "Chats / Messages", icon: MessageSquare },
    { id: "properties", label: "Saved Properties", icon: Heart },
    { id: "agencies", label: "Saved Agencies", icon: Building2 },
    { id: "dealers", label: "Saved Dealers", icon: Users },
    { id: "following-agencies", label: "Following Agencies", icon: Eye },
    { id: "following-dealers", label: "Following Dealers", icon: Eye },
    { id: "recent", label: "Recently Contacted", icon: Clock },
    { id: "help", label: "Help & Support", icon: HelpCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "AGENCY":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";
      case "DEALER":
        return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    setShowLogoutModal(false);

    try {
      const refresh = store.getState().auth.refresh;

      if (refresh) {
        await logoutApi(refresh).unwrap();
      }
    } catch (error) {
      console.error("Error in logging out - ", error);
    } finally {
      dispatch(logoutAction());

      dispatch(authApi.util.resetApiState());

      navigate("/", { replace: true });
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Profile Information
                </h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 dark:bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors">
                    <Key className="w-4 h-4" />
                    Change Password
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm sm:text-base">
                    {data.name}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{data.email}</span>
                  </div>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm sm:text-base">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    {data.phone}
                  </div>
                </div> */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Account Role
                  </label>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(
                        data.role
                      )}`}
                    >
                      {data.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Account Status
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Your account is active and verified
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-400">
                        Verified
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                        {data.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "chats":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Messages
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Your conversations with agencies and dealers
              </p>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockChats.map((chat) => (
                <div
                  key={chat.id}
                  className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-medium text-sm sm:text-base flex-shrink-0">
                        {chat.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
                            {chat.name}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getRoleBadgeColor(
                              chat.role
                            )} flex-shrink-0`}
                          >
                            {chat.role}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                      <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:inline">
                        {chat.time}
                      </span>
                      {chat.unread > 0 && (
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                          {chat.unread}
                        </span>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 hidden sm:block" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "properties":
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Saved Properties
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Properties you've bookmarked for later
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {mockProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-40 sm:h-48 bg-gray-200 dark:bg-gray-700">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
                        <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                          {property.price}
                        </span>
                      </div>
                      <button className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 whitespace-nowrap">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "agencies":
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Saved Agencies
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Agencies you've bookmarked
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {mockAgencies.map((agency) => (
                <div
                  key={agency.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                        {agency.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                            {agency.name}
                          </h3>
                          {agency.verified && (
                            <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {agency.properties} properties
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors flex-shrink-0">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="flex-1 px-4 py-2 bg-gray-900 dark:bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors">
                      View Profile
                    </button>
                    <button className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "dealers":
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Saved Dealers
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Dealers you've bookmarked for quick access
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {mockDealers.map((dealer) => (
                <div
                  key={dealer.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {dealer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                          {dealer.name}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getRoleBadgeColor(
                            dealer.role
                          )}`}
                        >
                          {dealer.role}
                        </span>
                      </div>
                    </div>
                    <button className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors flex-shrink-0">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {dealer.listings} active listings
                  </p>
                  <button className="w-full px-4 py-2 bg-gray-900 dark:bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors">
                    Contact Dealer
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "following-agencies":
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Following Agencies
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Agencies you're keeping an eye on
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
              {mockFollowingAgencies.map((agency) => (
                <div
                  key={agency.id}
                  className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                        {agency.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
                          {agency.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Following since {agency.followedDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 sm:flex-none px-4 py-2 bg-gray-900 dark:bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors whitespace-nowrap">
                        View Agency
                      </button>
                      <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Unfollow
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "following-dealers":
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Following Dealers
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Dealers you're keeping track of
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {mockFollowingDealers.map((dealer) => (
                <div
                  key={dealer.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {dealer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                        {dealer.name}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getRoleBadgeColor(
                          dealer.role
                        )}`}
                      >
                        {dealer.role}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Following since {dealer.followedDate}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="flex-1 px-4 py-2 bg-gray-900 dark:bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors">
                      Contact
                    </button>
                    <button className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      Unfollow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "recent":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recently Contacted
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Your recent interactions with agencies and dealers
              </p>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockRecentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                        {contact.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
                            {contact.name}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getRoleBadgeColor(
                              contact.role
                            )} flex-shrink-0`}
                          >
                            {contact.role}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium">
                            {contact.type}
                          </span>
                          <span className="text-xs">{contact.time}</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "help":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Help & Support
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all text-left">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                    <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    FAQ
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Browse frequently asked questions
                  </p>
                </button>

                <button className="p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all text-left">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Contact Support
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get in touch with our team
                  </p>
                </button>

                <button className="p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all text-left">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Edit className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Raise Ticket
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Submit a support request
                  </p>
                </button>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Account Settings
              </h2>

              <div className="space-y-6">
                <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Preferences
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Email notifications
                      </span>
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600"
                        defaultChecked
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Push notifications
                      </span>
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600"
                        defaultChecked
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Marketing emails
                      </span>
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600"
                      />
                    </label>
                  </div>
                </div>

                <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Privacy & Security
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="font-medium text-sm text-gray-900 dark:text-white">
                        Two-factor authentication
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Add an extra layer of security
                      </div>
                    </button>
                    <button className="w-full text-left px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="font-medium text-sm text-gray-900 dark:text-white">
                        Privacy settings
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Control your data and visibility
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Appearance
                  </h3>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <button
                      onClick={() => handleThemeChange("light")}
                      className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium text-xs sm:text-sm transition-colors ${
                        theme === "light"
                          ? "border-2 border-gray-900 dark:border-blue-500 bg-gray-50 dark:bg-blue-900/20 text-gray-900 dark:text-blue-400"
                          : "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => handleThemeChange("dark")}
                      className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium text-xs sm:text-sm transition-colors ${
                        theme === "dark"
                          ? "border-2 border-gray-900 dark:border-blue-500 bg-gray-50 dark:bg-blue-900/20 text-gray-900 dark:text-blue-400"
                          : "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Dark
                    </button>
                    <button
                      onClick={() => handleThemeChange("auto")}
                      className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium text-xs sm:text-sm transition-colors ${
                        theme === "auto"
                          ? "border-2 border-gray-900 dark:border-blue-500 bg-gray-50 dark:bg-blue-900/20 text-gray-900 dark:text-blue-400"
                          : "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Auto
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-200">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
        flex flex-col transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* User Info */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
              {data.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 dark:text-white truncate text-sm sm:text-base">
                {data.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                {data.email}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(
              data.role
            )}`}
          >
            {data.role}
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-gray-900 dark:bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Exit to Home & Logout */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <button
            onClick={handleGoHome}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">Exit to Home</span>
          </button>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {navigation.find((item) => item.id === activeSection)?.label}
          </h1>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Are you sure you want to logout? Your session will be securely
              terminated.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
