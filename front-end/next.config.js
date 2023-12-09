/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: "/api/:path*",
                destination: "http://192.168.35.101:8000/api/:path*",
            },
        ];
    },
    reactStrictMode: true,
    images: {
        domains: ["rb.gy", "cdn.sanity.io", "lh3.googleusercontent.com"],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

module.exports = nextConfig
