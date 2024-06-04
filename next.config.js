/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    // 添加别名配置
    config.resolve.alias['@'] = path.resolve(__dirname);
    // config.resolve.alias['@/notion'] = path.resolve(__dirname, 'lib', 'notion');
    // config.resolve.alias['dns'] = path.resolve(__dirname, 'empty.js');
    // config.resolve.alias['fs'] = path.resolve(__dirname, 'empty.js');

    // 如果需要在服务器端进行别名配置，则还需要进行服务端的别名配置
    if (isServer) {
      config.resolve.alias['@'] = path.resolve(__dirname);
    }

    return config;
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.wp.**',
      },
      {
        protocol: 'https',
        hostname: '*.nextjswp.**',
      },
      {
        protocol: 'https',
        hostname: '*.githubusercontent.**',
      },
      {
        protocol: 'https',
        hostname: '*.aglty.**',
      },
    ],
  },
};
