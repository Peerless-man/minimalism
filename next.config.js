/** @type {import('next').NextConfig} */
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
}

module.exports = nextConfig
