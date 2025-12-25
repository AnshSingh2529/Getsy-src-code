import { motion } from "framer-motion";
import {
  UserCheck2Icon,
  ImageUp,
  LogOutIcon,
  User,
  Mail,
  UploadCloud,
  Edit2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  clearProfile,
  updateProfile,
} from "../../../features/profile/profileSlice.js";
import toast from "react-hot-toast";
import {
  useGetProfileQuery,
  useGetPresignedUrlMutation,
  useUploadAvatarToS3Mutation,
  useSaveProfileMutation,
} from "../../../api/services/profileApi.js";

import SharedMemberCard from "./SharedMemberCard";
import { logout } from "../../../features/auth/authSlice.js";

const ShowUserProfile = ({ isOpen, toggleDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const storedAvatar = useSelector((state) => state.profile.avatar_url);
  const storedBio = useSelector((state) => state.profile.bio);

  const [preview, setPreview] = useState(file || storedAvatar);

  const { data: profileData } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [getPresignedUrl] = useGetPresignedUrlMutation();
  const [uploadAvatarToS3] = useUploadAvatarToS3Mutation();
  const [saveProfile] = useSaveProfileMutation();

  useEffect(() => {
    if (profileData) {
      dispatch(
        updateProfile({
          avatar_url: profileData?.profile?.avatar_url ?? null,
          bio: profileData?.profile?.bio ?? null,
        })
      );

      setBio(profileData?.profile?.bio || "");
      setPreview(profileData?.profile?.avatar_url || null);
    }
  }, [profileData, dispatch]);

  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleUpload = async () => {
    try {
      if (!file && bio === storedBio) {
        toast("No changes to update.");
        return;
      }

      toast.loading("Updating profile...", { id: "profileUpload" });

      let publicUrl = storedAvatar;

      if (file) {
        const ext = file?.name.split(".").pop();
        const presignedURL = await getPresignedUrl(ext).unwrap();

        const s3UploadUrl = presignedURL.avatar_url;

        if (!s3UploadUrl) {
          toast.error("Failed to get upload URL.", { id: "profileUpload" });
          return;
        }

        await uploadAvatarToS3({ file: file, url: s3UploadUrl }).unwrap();
        toast.success('uploaded on s3', { id: "profileUpload" });
        publicUrl = s3UploadUrl.split("?")[0];
      }

      const updated = await saveProfile({
        avatar_url: publicUrl,
        bio,
      }).unwrap();

      dispatch(updateProfile(updated));

      setPreview(publicUrl);
      setIsEditing(false);
      setFile(null);

      toast.success("Profile updated successfully!", { id: "profileUpload" });

      // Force refetch to sync with database
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (err) {
      toast.error(err.message || "Failed to update profile.", {
        id: "profileUpload",
      });
    }
  };

  const handleLogoutUser = () => {
    dispatch(logout());
    dispatch(clearProfile());
    navigate("/auth/login");
  };

  const handleDashboardRedirect = () => {
    switch (user?.role) {
      case "dealer":
        navigate("/agent-dashboard");
        break;
      case "user":
        navigate("/user-dashboard");
        break;
      default:
        navigate("/");
    }
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "agent":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "user":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "admin":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  // const getInitials = (name) => {
  //   return (
  //     name
  //       ?.split(" ")
  //       .map((n) => n[0])
  //       .join("")
  //       .toUpperCase()
  //       .slice(0, 2) || "U"
  //   );
  // };

  return (
    <div>
      {/* Backdrop */}
      <motion.div
        className={`fixed inset-0 bg-black/50 z-40 ${
          isOpen ? "block" : "hidden"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        exit={{ opacity: 0 }}
        onClick={toggleDrawer}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="fixed z-50 rounded-tl-3xl rounded-bl-3xl overflow-hidden
          h-full w-full max-w-[480px] top-0 right-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
          shadow-2xl border-l border-slate-700/50"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        exit={{ x: "100%" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
      >
        {/* Header with Gradient */}
        <div className="relative bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600/50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-xl border border-blue-500/30">
                <UserCheck2Icon className="text-blue-400 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Profile</h2>
                <p className="text-slate-400 text-sm">Manage your account</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDrawer}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 
                rounded-xl transition-colors outline-none"
              aria-label="Close Profile"
            >
              <MdCancel size={24} />
            </motion.button>
          </div>
        </div>

        <div className="overflow-y-auto scrollbar-hide h-[calc(100vh-120px)] pb-6">
          {" "}
          <div className="p-6 space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-xl border-2 border-slate-700 overflow-hidden">
                  <img
                    src={isEditing && preview ? preview : storedAvatar}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() =>
                    isEditing ? handleUpload() : setIsEditing(true)
                  }
                  className="absolute -right-3 -bottom-4 bg-blue-600 text-white p-3 rounded-xl shadow"
                >
                  {isEditing ? <UploadCloud /> : <Edit2 />}
                </motion.button>

                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                )}
              </div>
            </div>

            <textarea
              disabled={!isEditing}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={
                isEditing
                  ? `w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600`
                  : `w-full p-3 rounded-lg bg-slate-800 text-white`
              }
              placeholder="Write something about yourself..."
            />

            {/* Welcome Message */}
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-white">
                Welcome back, {user?.name?.split(" ")[0] || "User"}!
              </h3>
              <p className="text-slate-400">
                Manage your account and preferences
              </p>
            </div>
            {/* User Details Cards */}
            <div className="space-y-4">
              {/* Name Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 
                  hover:bg-slate-800/70 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                    <User className="text-blue-400 w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-400 text-sm font-medium">
                      Full Name
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-white font-semibold text-lg">
                        {user?.name || "Not provided"}
                      </p>
                      {user?.role && (
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {user.role.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Email Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 
                  hover:bg-slate-800/70 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                    <Mail className="text-emerald-400 w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-400 text-sm font-medium">
                      Email Address
                    </p>
                    <p className="text-white font-semibold text-lg">
                      {user?.email || "Not provided"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Dashboard Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDashboardRedirect}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 
                  hover:to-blue-800 text-white py-4 px-6 rounded-2xl flex items-center justify-center 
                  space-x-3 shadow-lg transition-all duration-300 outline-none"
              >
                <FaCircleChevronLeft className="w-5 h-5" />
                <span className="font-semibold">Go to Dashboard</span>
              </motion.button>

              {/* Logout Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  handleLogoutUser();
                  toggleDrawer();
                }}
                className="w-full bg-slate-800/70 hover:bg-red-600/20 border border-slate-700/50 
                  hover:border-red-500/50 text-slate-300 hover:text-red-400 py-4 px-6 rounded-2xl 
                  flex items-center justify-center space-x-3 transition-all duration-300 outline-none"
              >
                <span className="font-semibold">Sign Out</span>
                <LogOutIcon className="w-5 h-5" />
              </motion.button>
            </div>
            {/* Shared Members */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <SharedMemberCard />
            </motion.div>
            {/* Info Footer */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 
                rounded-2xl p-4 flex items-start space-x-4"
            >
              <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30 flex-shrink-0">
                <svg
                  className="w-5 h-5 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-amber-300 font-semibold text-sm">
                  Important Notice
                </h4>
                <p className="text-slate-400 text-sm mt-1">
                  Admin approval is required before your property details become
                  publicly visible.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ShowUserProfile;
