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
  } catch {
    return null;
  }
};