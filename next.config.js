/** @type {import('next').NextConfig} */

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    reactStrictMode: false,
    publicRuntimeConfig: {
        basePath: '/',
    },
    compiler: {
        styledComponents: true,
    },
    async rewrites() {
        return [
            {
                source: '/api/auth/:provider',
                destination: `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/:provider`,
            },
        ];
    },
};

module.exports = nextConfig;
