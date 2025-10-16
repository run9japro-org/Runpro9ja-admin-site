// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "https://runpro9ja-pxqoa.ondigitalocean.app";

export const initSocket = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  // Connect with authentication
  const socket = io(SOCKET_URL, {
    auth: { token },
  });

  socket.on("connect", () => {
    console.log("✅ Connected to socket server");
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected from socket server");
  });

  return socket;
};
