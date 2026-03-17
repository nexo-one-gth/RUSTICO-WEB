"use strict";

// next.config.js
var nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    // Agregar dominios externos si las imágenes se sirven desde Firebase Storage
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com"
      }
    ]
  }
};
module.exports = nextConfig;
