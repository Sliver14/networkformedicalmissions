/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
    async rewrites() {
        return [
            {
                source: '/uploads/:filename*',
                destination: '/api/uploads/:filename*',
            },
        ]
    }
};

export default nextConfig;
