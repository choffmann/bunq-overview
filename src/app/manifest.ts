import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wie gehts BUNQ?",
    short_name: "BUNQ Overview",
    description: "Deine bunq Kontoübersicht",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f5",
    theme_color: "#4a89dc",
    icons: [
      { src: "/icons/logo-72.png", sizes: "72x72", type: "image/png" },
      { src: "/icons/logo-96.png", sizes: "96x96", type: "image/png" },
      { src: "/icons/logo-128.png", sizes: "128x128", type: "image/png" },
      { src: "/icons/logo-144.png", sizes: "144x144", type: "image/png" },
      { src: "/icons/logo-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/logo-384.png", sizes: "384x384", type: "image/png" },
      {
        src: "/icons/logo-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
