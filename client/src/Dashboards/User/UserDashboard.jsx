import React, { useEffect, useState } from "react";
import {
  Lock,
  MessageSquare,
  RefreshCcw,
  Clock,
  TrendingUp,
  Activity,
  Bell,
  Zap,
  Target,
  Home,
  FileText,
  Users,
  BarChart3,
  DollarSign,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../features/auth/hooks";
import { ProfileDropdown } from "../utils/ProfileDropdown";

function UserDashboard() {
  const [isSpinning, setSpinning] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [onlineStatus] = useState(true);
  const [sessionTime, setSessionTime] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(3);
  const [todayStats, setTodayStats] = useState({
    activeTime: 145,
    tasksCompleted: 7,
    streak: 12,
    productivity: 87,
  });

  const { user } = useAuth();

  // Helper to capitalize role
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  };

  const userRole = user?.role?.capitalize();

  const colors = {
    primary: "#101935",
    accent: "#fff",
    background: "#131515",
    surface: "#2e2e2e66",
    textPrimary: "#adb5bd",
    textSecondary: "#6B7280",
    border: "rgb(55 65 81 / 0.5)",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: <Home className="w-4 h-4" /> },
    {
      id: "properties",
      label: "Properties",
      icon: <FileText className="w-4 h-4" />,
      badge: "12",
    },
    { id: "tenants", label: "Tenants", icon: <Users className="w-4 h-4" /> },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: "payments",
      label: "Payments",
      icon: <DollarSign className="w-4 h-4" />,
      badge: "3",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 60000);

    const activityInterval = setInterval(() => {
      setTodayStats((prev) => ({
        ...prev,
        activeTime: prev.activeTime + 1,
      }));
    }, 60000);

    return () => {
      clearInterval(interval);
      clearInterval(activityInterval);
    };
  }, []);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleRefresh = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 1200);
  };

  const handleMenuItemClick = (id) => {
    setActiveTab(id);
    setSidebarOpen(false);
  };

  const handleNotificationClick = () => {
    setNotifications(0);
  };

  const handleMessagesClick = () => {
    setMessages(0);
  };

  const handleTaskComplete = () => {
    setTodayStats((prev) => ({
      ...prev,
      tasksCompleted: prev.tasksCompleted + 1,
      productivity: Math.min(100, prev.productivity + 2),
    }));
  };

  return (
    <div
      className="flex h-full fixed top-0 left-0 right-0 bottom-0 overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 h-full flex flex-col shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          backgroundColor: colors.surface,
          borderRight: `1px solid ${colors.border}`,
        }}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg"
          style={{ backgroundColor: colors.background }}
        >
          <X className="w-5 h-5" style={{ color: colors.textPrimary }} />
        </button>

        {/* Header */}
        <div
          className="flex flex-col px-4 py-4 border-b"
          style={{ borderColor: colors.border }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg bg-green-800/50"
              >
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3
                  className="font-semibold text-sm"
                  style={{ color: colors.textPrimary }}
                >
                  Secure Portal
                </h3>
                <p className="text-xs" style={{ color: colors.textSecondary }}>
                  {userRole} Dashboard
                </p>
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-between px-3 py-2 rounded-lg"
            style={{ backgroundColor: colors.background }}
          >
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div
                  className={`w-2 h-2 rounded-full ${
                    onlineStatus ? "animate-pulse" : ""
                  }`}
                  style={{
                    backgroundColor: onlineStatus
                      ? colors.success
                      : colors.textSecondary,
                  }}
                />
                {onlineStatus && (
                  <div
                    className="absolute inset-0 w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: colors.success, opacity: 0.5 }}
                  />
                )}
              </div>
              <span
                className="text-xs font-medium"
                style={{ color: colors.textSecondary }}
              >
                {onlineStatus ? "Online" : "Offline"}
              </span>
            </div>
            <div
              className="flex items-center text-xs"
              style={{ color: colors.textSecondary }}
            >
              <Clock className="w-3 h-3 mr-1" />
              {formatTime(sessionTime)}
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div
          className="px-4 py-4 border-b"
          style={{ borderColor: colors.border }}
        >
          <h4
            className="text-xs font-semibold mb-3 uppercase tracking-wide"
            style={{ color: colors.textSecondary }}
          >
            Today's Performance
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: colors.background }}
            >
              <div className="flex items-center mb-1">
                <Activity
                  className="w-3 h-3 mr-1"
                  style={{ color: colors.info }}
                />
                <span
                  className="text-xs"
                  style={{ color: colors.textSecondary }}
                >
                  Active
                </span>
              </div>
              <p
                className="text-sm font-bold"
                style={{ color: colors.textPrimary }}
              >
                {formatTime(todayStats.activeTime)}
              </p>
            </div>

            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: colors.background }}
            >
              <div className="flex items-center mb-1">
                <Target
                  className="w-3 h-3 mr-1"
                  style={{ color: colors.success }}
                />
                <span
                  className="text-xs"
                  style={{ color: colors.textSecondary }}
                >
                  Tasks
                </span>
              </div>
              <p
                className="text-sm font-bold"
                style={{ color: colors.textPrimary }}
              >
                {todayStats.tasksCompleted}
              </p>
            </div>

            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: colors.background }}
            >
              <div className="flex items-center mb-1">
                <Zap
                  className="w-3 h-3 mr-1"
                  style={{ color: colors.warning }}
                />
                <span
                  className="text-xs"
                  style={{ color: colors.textSecondary }}
                >
                  Streak
                </span>
              </div>
              <p
                className="text-sm font-bold"
                style={{ color: colors.textPrimary }}
              >
                {todayStats.streak} days
              </p>
            </div>

            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: colors.background }}
            >
              <div className="flex items-center mb-1">
                <TrendingUp
                  className="w-3 h-3 mr-1"
                  style={{ color: colors.accent }}
                />
                <span
                  className="text-xs"
                  style={{ color: colors.textSecondary }}
                >
                  Score
                </span>
              </div>
              <p
                className="text-sm font-bold"
                style={{ color: colors.textPrimary }}
              >
                {todayStats.productivity}%
              </p>
            </div>
          </div>

        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide py-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuItemClick(item.id)}
              className="relative w-full flex items-center justify-between rounded-lg p-3 mx-3 cursor-pointer mb-2 transition-all duration-300"
              style={{
                backgroundColor:
                  activeTab === item.id ? "#16653480" : "transparent",
                color: activeTab === item.id ? "#FFFFFF" : colors.textPrimary,
              }}
            >
              {activeTab === item.id && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                  style={{ backgroundColor: colors.background }}
                />
              )}
              <div className="w-full flex items-center">
                <span className="mr-3 opacity-80">{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
                {item.badge && (
                  <span
                    className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      backgroundColor:
                        activeTab === item.id ? colors.accent : colors.info,
                      color: "#353535",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          ))}
        </nav>

        {/* Chat Button */}
        <div
          className="px-3 pb-3 border-t pt-3"
          style={{ borderColor: colors.border }}
        >
          <button
            onClick={handleMessagesClick}
            className="w-full px-4 py-2.5 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:opacity-90"
            style={{ backgroundColor: colors.info, color: "#FFFFFF" }}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            <span className="font-medium text-sm">Messages</span>
            {messages > 0 && (
              <span className="ml-2 px-1.5 py-0.5 bg-white bg-opacity-20 rounded text-xs">
                {messages}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header
          className="h-16 px-4 sm:px-6 flex items-center justify-between shadow-lg"
          style={{
            backgroundColor: colors.surface,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg"
              style={{ backgroundColor: colors.background }}
            >
              <Menu className="w-5 h-5" style={{ color: colors.textPrimary }} />
            </button>
            <div
              className="w-1 h-8 rounded-full hidden sm:block"
              style={{ backgroundColor: colors.background }}
            />
            <div>
              <h1
                className="text-base sm:text-lg font-semibold"
                style={{ color: colors.textPrimary }}
              >
                {menuItems.find((item) => item.id === activeTab)?.label ||
                  "Dashboard"}
              </h1>
              <p
                className="text-xs hidden sm:block"
                style={{ color: colors.textSecondary }}
              >
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* User Profile dropdown (replace the previous <div className="px-3 pb-3 ..."> block) */}
            <ProfileDropdown
              user={user}
              colors={{
                border: "#E5E7EB",
                background: "rgba(0,0,0,0.04)",
                primary: "#2563EB",
                textPrimary: "#ffffff",
                textSecondary: "#6B7280",
                card: colors.background,
                error: "#EF4444",
              }}
            />

            <button
              onClick={handleNotificationClick}
              className="relative p-2 rounded-lg transition-colors hover:bg-opacity-80"
              style={{ backgroundColor: colors.background }}
            >
              <Bell
                className="w-4 h-4 sm:w-5 sm:h-5"
                style={{ color: colors.textSecondary }}
              />
              {notifications > 0 && (
                <span
                  className="absolute top-1 right-1 w-2 h-2 rounded-full"
                  style={{ backgroundColor: colors.error }}
                />
              )}
            </button>

            <button
              onClick={handleRefresh}
              className="px-3 sm:px-4 py-2 rounded-lg flex items-center text-white text-xs sm:text-sm font-medium shadow-lg transition-all hover:opacity-90"
              style={{ backgroundColor: colors.border }}
            >
              <RefreshCcw
                className={`w-3 h-3 sm:w-4 sm:h-4 sm:mr-2 ${
                  isSpinning ? "animate-spin" : ""
                }`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main
          className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-hide"
          style={{ backgroundColor: colors.background }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Welcome Card */}
            <div
              className="rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-md border-[1px] border-gray-700/50"
              style={{ backgroundColor: colors.surface }}
            >
              <h2
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: colors.textPrimary }}
              >
                Welcome back, John!
              </h2>
              <p
                className="text-sm sm:text-base"
                style={{ color: colors.textSecondary }}
              >
                Here's what's happening with your properties today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-6">
              <div
                className="rounded-xl p-4 sm:p-5 shadow-lg"
                style={{ backgroundColor: colors.surface }}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${colors.info}20` }}
                  >
                    <FileText
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      style={{ color: colors.info }}
                    />
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-full font-semibold"
                    style={{
                      backgroundColor: `${colors.success}20`,
                      color: colors.success,
                    }}
                  >
                    +12%
                  </span>
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold mb-1"
                  style={{ color: colors.textPrimary }}
                >
                  24
                </h3>
                <p
                  className="text-xs sm:text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  Total Properties
                </p>
              </div>

              <div
                className="rounded-xl p-4 sm:p-5 shadow-lg"
                style={{ backgroundColor: colors.surface }}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${colors.success}20` }}
                  >
                    <Users
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      style={{ color: colors.success }}
                    />
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-full font-semibold"
                    style={{
                      backgroundColor: `${colors.success}20`,
                      color: colors.success,
                    }}
                  >
                    +8%
                  </span>
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold mb-1"
                  style={{ color: colors.textPrimary }}
                >
                  18
                </h3>
                <p
                  className="text-xs sm:text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  Active Tenants
                </p>
              </div>

              <div
                className="rounded-xl p-4 sm:p-5 shadow-lg"
                style={{ backgroundColor: colors.surface }}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${colors.warning}20` }}
                  >
                    <DollarSign
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      style={{ color: colors.warning }}
                    />
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-full font-semibold"
                    style={{
                      backgroundColor: `${colors.warning}20`,
                      color: colors.warning,
                    }}
                  >
                    Pending
                  </span>
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold mb-1"
                  style={{ color: colors.textPrimary }}
                >
                  $12,450
                </h3>
                <p
                  className="text-xs sm:text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  Monthly Revenue
                </p>
              </div>

              <div
                className="rounded-xl p-4 sm:p-5 shadow-lg"
                style={{ backgroundColor: colors.surface }}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${colors.accent}20` }}
                  >
                    <BarChart3
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      style={{ color: colors.accent }}
                    />
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-full font-semibold"
                    style={{
                      backgroundColor: `${colors.success}20`,
                      color: colors.success,
                    }}
                  >
                    +5%
                  </span>
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold mb-1"
                  style={{ color: colors.textPrimary }}
                >
                  94%
                </h3>
                <p
                  className="text-xs sm:text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  Occupancy Rate
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div
              className="rounded-xl p-4 sm:p-6 shadow-lg border-[1px] border-gray-700/50"
              style={{ backgroundColor: colors.surface }}
            >
              <h3
                className="text-base sm:text-lg font-semibold mb-3 sm:mb-4"
                style={{ color: colors.textPrimary }}
              >
                Recent Activity
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    title: "New tenant application received",
                    property: "123 Main Street",
                    time: "2 hours ago",
                  },
                  {
                    title: "Maintenance request submitted",
                    property: "456 Oak Avenue",
                    time: "5 hours ago",
                  },
                  {
                    title: "Rent payment received",
                    property: "789 Pine Road",
                    time: "1 day ago",
                  },
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg transition-colors hover:bg-opacity-50"
                    style={{ backgroundColor: colors.background }}
                  >
                    <div className="flex items-start sm:items-center space-x-3 mb-2 sm:mb-0">
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: colors.border }}
                      >
                        <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <p
                          className="font-medium text-xs sm:text-sm"
                          style={{ color: colors.textPrimary }}
                        >
                          {activity.title}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: colors.textSecondary }}
                        >
                          Property: {activity.property} • {activity.time}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleTaskComplete}
                      className="w-full sm:w-auto px-3 py-1 rounded-lg text-xs font-medium transition-colors hover:opacity-80"
                      style={{
                        backgroundColor: colors.info,
                        color: "#FFFFFF",
                      }}
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;
