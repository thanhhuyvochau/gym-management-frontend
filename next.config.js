/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  images: {
    // remotePatterns: [{ protocol: 'http', hostname: 'localhost' }],
    domains: ['localhost'],
  },
};
module.exports = nextConfig;
