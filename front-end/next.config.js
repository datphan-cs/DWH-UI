/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: "/:path*",
                destination: "http://localhost:8000/:path*",
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
