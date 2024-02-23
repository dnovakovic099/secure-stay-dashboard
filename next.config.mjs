/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },

  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "connect.getseam.com",
        port: "",
        pathname:
          "/assets/images/devices/schlage_sense-smart-deadbolt-with-camelot-trim_front.png",
      },
    ],
  },
};

export default nextConfig;
