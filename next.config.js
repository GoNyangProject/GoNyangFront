/** @type {import('next').NextConfig} */

const nextConfig = {
    publicRuntimeConfig: {
        basePath: '/',
    },
    compiler: {
        styledComponents: true,
    },
};

module.exports = nextConfig;
