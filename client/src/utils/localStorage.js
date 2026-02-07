const KEY = "auth";
const ProfileKey = "profile";

export const saveAuthToStorage = (payload) => {
  localStorage.setItem(KEY, JSON.stringify(payload));
};

export const loadAuthFromStorage = () => {
  try {
    const s = localStorage.getItem(KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
};

export const clearAuthFromStorage = () => {
  localStorage.removeItem(KEY);
};

export const saveProfileToStorage = (data) => {
  if (!data) return localStorage.removeItem("profile");
  localStorage.setItem("profile", JSON.stringify(data));
};

export const loadProfileFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("profile"));
  } catch (error) {
    console.log(error);
  }
};

// export const savePropertyWislistedToStorage = (wishlistedProperty) => {
//   if (wishlistedProperty) return localStorage.removeItem("wishlistedProperty");
//   localStorage.setItem(
//     "wishlistedProperty",
//     JSON.stringify(wishlistedProperty),
//   );
// };

// export const loadWishlistedPropertyFromStorage = () => {
//   try {
//     return JSON.parse(localStorage.getItem("wishlistedProperty"));
//   } catch (error) {
//     console.error(error);
//   }
// };
