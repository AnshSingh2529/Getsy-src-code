import React from "react";

const SharedMemberCard = () => {
  return (
    <div className="relative w-full max-w-md mx-auto md:mt-5 mt-2 p-6 border-2 border-yellow-400 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-yellow-500 text-center mb-2">
        Welcome to the Family!
      </h2>
      <p className="text-gray-700 text-center mb-4">
        Congratulations! You've successfully posted your property and are now a
        valued member of our community.
      </p>
      <p className="text-gray-600 text-center mb-6">
        As a member, you’ll enjoy exclusive support and visibility to help
        connect with potential buyers and renters. We're excited to have you
        with us!
      </p>
      <button className="w-full py-3 bg-yellow-200 border border-yellow-400 text-zinc-800 font-bold rounded-lg hover:bg-yellow-400 transition duration-300">
        Explore Member Benefits
      </button>
    </div>
  );
};

export default SharedMemberCard;
