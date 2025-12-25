// src/utils/socket.js
let socket;

export const initSocket = (url, tenantId) => {
  if (!socket) {
    socket = new WebSocket(`${url}?tenant_id=${tenantId}`);
  }

  socket.onopen = () => {
    console.log("✅ WebSocket connected");
  };

  socket.onclose = () => {
    console.log("❌ WebSocket disconnected");
    socket = null;
  };

  socket.onerror = (err) => {
    console.error("⚠️ WebSocket error", err);
  };

  return socket;
};

export const getSocket = () => socket;
