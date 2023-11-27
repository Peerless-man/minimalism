/** @type {import('next').NextConfig} */

const { withContentlayer } = require('next-contentlayer')

const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://mrzym.top:8888/:path*',
			},
			{
				source: '/:path*/api/:path*',
				destination: 'http://mrzym.top:8888/:path*',
			},
		]
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'img.mrzym.top',
			},
		],
	},
	reactStrictMode: true,
	swcMinify: true,
}

module.exports = withContentlayer(nextConfig)
