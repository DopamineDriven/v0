import withPWAInit from "@ducanh2912/next-pwa";

export default withPWAInit({ dest: "public", register: true, scope: "/app" })({
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["@dd/ui"] },
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false, tsconfigPath: "./tsconfig.json" },
  images: {
    loader: "default",
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        hostname: "localhost",
        port: "3000",
        protocol: "http"
      },
      {
        hostname: "ddd.vercel.app",
        protocol: "https"
      },
      {
        hostname: "dev-ddd.vercel.app",
        protocol: "https"
      },
      { hostname: "res.cloudinary.com", protocol: "https" },
      { hostname: "images.unsplash.com", protocol: "https" },
      { hostname: "tailwindui.com", protocol: "https" }
    ]
  },
  productionBrowserSourceMaps: true,
  swcMinify: true
});
