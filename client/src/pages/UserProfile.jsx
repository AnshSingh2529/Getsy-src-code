import React, { useState } from 'react';
import { User, MessageSquare, Heart, Building2, Users, Eye, Clock, HelpCircle, Settings, LogOut, Edit, Key, Phone, Mail, MapPin, DollarSign, Check, X, ChevronRight } from 'lucide-react';

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Mock user data
  const user = {
    name: 'Sarah Anderson',
    email: 'sarah.anderson@email.com',
    phone: '+1 (555) 123-4567',
    role: 'USER',
    avatar: 'SA',
    verified: true,
    status: 'Active'
  };

  // Mock data
  const mockChats = [
    { id: 1, name: 'Metropolitan Realty', role: 'AGENCY', lastMessage: 'Thank you for your interest...', time: '2 hours ago', unread: 2 },
    { id: 2, name: 'John Parker', role: 'DEALER', lastMessage: 'I can schedule a viewing for...', time: '5 hours ago', unread: 0 },
    { id: 3, name: 'Coastal Properties', role: 'AGENCY', lastMessage: 'The property is still available', time: '1 day ago', unread: 1 }
  ];

  const mockProperties = [
    { id: 1, title: 'Modern Downtown Apartment', location: 'Manhattan, NY', price: '$850,000', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400' },
    { id: 2, title: 'Luxury Beach Villa', location: 'Miami, FL', price: '$2,500,000', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400' },
    { id: 3, title: 'Suburban Family Home', location: 'Austin, TX', price: '$650,000', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400' }
  ];

  const mockAgencies = [
    { id: 1, name: 'Metropolitan Realty Group', verified: true, properties: 145 },
    { id: 2, name: 'Coastal Properties LLC', verified: true, properties: 89 },
    { id: 3, name: 'Urban Living Solutions', verified: false, properties: 56 }
  ];

  const mockDealers = [
    { id: 1, name: 'John Parker', role: 'DEALER', verified: true, listings: 23 },
    { id: 2, name: 'Emily Chen', role: 'DEALER', verified: true, listings: 45 },
    { id: 3, name: 'Michael Ross', role: 'DEALER', verified: true, listings: 31 }
  ];

  const mockFollowingAgencies = [
    { id: 1, name: 'Prime Estates', followedDate: '2 weeks ago' },
    { id: 2, name: 'Elite Realty Partners', followedDate: '1 month ago' },
    { id: 3, name: 'Horizon Properties', followedDate: '3 months ago' }
  ];

  const mockFollowingDealers = [
    { id: 1, name: 'David Miller', role: 'DEALER', followedDate: '1 week ago' },
    { id: 2, name: 'Lisa Thompson', role: 'DEALER', followedDate: '3 weeks ago' }
  ];

  const mockRecentContacts = [
    { id: 1, name: 'Metropolitan Realty', role: 'AGENCY', type: 'Chat', time: '2 hours ago' },
    { id: 2, name: 'John Parker', role: 'DEALER', type: 'Inquiry', time: '1 day ago' },
    { id: 3, name: 'Coastal Properties', role: 'AGENCY', type: 'Call', time: '3 days ago' }
  ];

  const navigation = [
    { id: 'profile', label: 'Profile Overview', icon: User },
    { id: 'chats', label: 'Chats / Messages', icon: MessageSquare },
    { id: 'properties', label: 'Saved Properties', icon: Heart },
    { id: 'agencies', label: 'Saved Agencies', icon: Building2 },
    { id: 'dealers', label: 'Saved Dealers', icon: Users },
    { id: 'following-agencies', label: 'Following Agencies', icon: Eye },
    { id: 'following-dealers', label: 'Following Dealers', icon: Eye },
    { id: 'recent', label: 'Recently Contacted', icon: Clock },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'AGENCY': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'DEALER': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    // Handle logout logic here
    console.log('User logged out');
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    <Key className="w-4 h-4" />
                    Change Password
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                    {user.name}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                    <Phone className="w-4 h-4" />
                    {user.phone}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Role</label>
                  <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Account Status</h3>
                    <p className="text-sm text-gray-500 mt-1">Your account is active and verified</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Verified</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="text-sm font-medium text-blue-700">{user.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'chats':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
              <p className="text-sm text-gray-500 mt-1">Your conversations with agencies and dealers</p>
            </div>
            <div className="divide-y divide-gray-200">
              {mockChats.map(chat => (
                <div key={chat.id} className="p-6 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-medium">
                        {chat.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{chat.name}</h3>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getRoleBadgeColor(chat.role)}`}>
                            {chat.role}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{chat.time}</span>
                      {chat.unread > 0 && (
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                          {chat.unread}
                        </span>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'properties':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Saved Properties</h2>
              <p className="text-sm text-gray-500 mt-1">Properties you've bookmarked for later</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProperties.map(property => (
                <div key={property.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48 bg-gray-200">
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors">
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{property.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <MapPin className="w-4 h-4" />
                      {property.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-gray-700" />
                        <span className="text-lg font-bold text-gray-900">{property.price}</span>
                      </div>
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'agencies':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Saved Agencies</h2>
              <p className="text-sm text-gray-500 mt-1">Agencies you've bookmarked</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockAgencies.map(agency => (
                <div key={agency.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        {agency.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{agency.name}</h3>
                          {agency.verified && (
                            <Check className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{agency.properties} properties</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                      View Profile
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'dealers':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Saved Dealers</h2>
              <p className="text-sm text-gray-500 mt-1">Dealers you've bookmarked for quick access</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDealers.map(dealer => (
                <div key={dealer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-bold">
                        {dealer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{dealer.name}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getRoleBadgeColor(dealer.role)}`}>
                          {dealer.role}
                        </span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{dealer.listings} active listings</p>
                  <button className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    Contact Dealer
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'following-agencies':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Following Agencies</h2>
              <p className="text-sm text-gray-500 mt-1">Agencies you're keeping an eye on</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
              {mockFollowingAgencies.map(agency => (
                <div key={agency.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {agency.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{agency.name}</h3>
                        <p className="text-sm text-gray-500">Following since {agency.followedDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                        View Agency
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Unfollow
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'following-dealers':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Following Dealers</h2>
              <p className="text-sm text-gray-500 mt-1">Dealers you're keeping track of</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockFollowingDealers.map(dealer => (
                <div key={dealer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {dealer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{dealer.name}</h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getRoleBadgeColor(dealer.role)}`}>
                        {dealer.role}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Following since {dealer.followedDate}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                      Contact
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      Unfollow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'recent':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recently Contacted</h2>
              <p className="text-sm text-gray-500 mt-1">Your recent interactions with agencies and dealers</p>
            </div>
            <div className="divide-y divide-gray-200">
              {mockRecentContacts.map(contact => (
                <div key={contact.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-medium">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{contact.name}</h3>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getRoleBadgeColor(contact.role)}`}>
                            {contact.role}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">{contact.type}</span>
                          <span>{contact.time}</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Help & Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-left">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <HelpCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">FAQ</h3>
                  <p className="text-sm text-gray-500">Browse frequently asked questions</p>
                </button>
                
                <button className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-left">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Contact Support</h3>
                  <p className="text-sm text-gray-500">Get in touch with our team</p>
                </button>
                
                <button className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-left">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Edit className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Raise Ticket</h3>
                  <p className="text-sm text-gray-500">Submit a support request</p>
                </button>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div className="pb-6 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Preferences</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-700">Email notifications</span>
                      <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-700">Push notifications</span>
                      <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-700">Marketing emails</span>
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    </label>
                  </div>
                </div>
                
                <div className="pb-6 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Privacy & Security</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="font-medium text-sm text-gray-900">Two-factor authentication</div>
                      <div className="text-xs text-gray-500 mt-1">Add an extra layer of security</div>
                    </button>
                    <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="font-medium text-sm text-gray-900">Privacy settings</div>
                      <div className="text-xs text-gray-500 mt-1">Control your data and visibility</div>
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Appearance</h3>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-3 border-2 border-gray-900 bg-gray-50 rounded-lg font-medium text-sm">
                      Light
                    </button>
                    <button className="flex-1 px-4 py-3 border border-gray-200 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
                      Dark
                    </button>
                    <button className="flex-1 px-4 py-3 border border-gray-200 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
        {/* User Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 truncate">{user.name}</h2>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
            {user.role}
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {navigation.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {renderContent()}
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Logout</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to logout? Your session will be securely terminated.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
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