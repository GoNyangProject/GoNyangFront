/** @type {import('next').NextConfig} */

const nextConfig = {
    publicRuntimeConfig: {
        basePath: '/',
    },
    compiler: {
        styledComponents: true,
    },
    async rewrites() {
        return [
            {
                source: '/auth/:provider',
                destination: 'http://localhost:8080/auth/:provider',
            },
        ];
    },
};

module.exports = nextConfig;
