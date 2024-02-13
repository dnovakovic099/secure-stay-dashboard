/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false
}

const redirects = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/login",
                permanent: false
            }
        ];
    }
}

const imagesConfig = {
    images: {
        domains: ['images.unsplash.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'connect.getseam.com',
                port: '',
                pathname: '/assets/images/devices/schlage_sense-smart-deadbolt-with-camelot-trim_front.png',
            },
        ],
    },
}

const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([nextConfig, [redirects], imagesConfig])
