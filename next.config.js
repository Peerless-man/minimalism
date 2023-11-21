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
}

module.exports = nextConfig
