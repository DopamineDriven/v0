import withPWAInit from "@ducanh2912/next-pwa";

export default withPWAInit({ dest: "public", register: true, scope: "/app" })({
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false, tsconfigPath: "./tsconfig.json" },
  images: {
    loader: "default",
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        hostname: "localhost",
        port: "3004",
        protocol: "http"
      },
      {
        hostname: "takeda-ai-sync.vercel.app",
        protocol: "https"
      },
      {
        hostname: "dev-takeda-ai-sync.vercel.app",
        protocol: "https"
      },
      { hostname: "res.cloudinary.com", protocol: "https" },
      {
        hostname: "latency-dsn.algolia.net",
        protocol: "https"
      },
      { hostname: "assets-dam.takeda.com", protocol: "https" },
      { hostname: "images.unsplash.com", protocol: "https" },
      { hostname: "tailwindui.com", protocol: "https" },
      {
        hostname: "futurebot-standard1-search.azurewebsites.net",
        protocol: "https"
      },
      {
        hostname: "futurebot-search-eu-standard1.azurewebsites.net",
        protocol: "https"
      }
    ]
  },
  productionBrowserSourceMaps: true,
  swcMinify: true
});
