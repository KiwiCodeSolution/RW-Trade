import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: '/images/:path*',
				destination: '/images/:path*'
			}
		]
	},

	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '5000'
			},
			{
				protocol: 'https',
				hostname: 'rwavto.shop',
				pathname: '/uploads/**'
			}
		]
	}
}

export default withNextIntl(nextConfig)
