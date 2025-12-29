export const getTokenExpiry = (token) => {
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000; // convert to ms
  } catch {
    return null;
  }
};

export const isTokenExpiringSoon = (token, bufferMs = 60_000) => {
  const expiry = getTokenExpiry(token);
  if (!expiry) return true;
  return Date.now() + bufferMs >= expiry;
};
