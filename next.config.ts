import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
	experimental: {
		turbo: {
			rules: {
				'*.svg': {
					loaders: ['@svgr/webpack'],
					as: '*.jsx'
				}
			}
		}
	},

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
				protocol: 'https',
				hostname: 'rw-trade.netlify.app'
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '5000'
			},
			{
				protocol: 'https',
				hostname: 'devtestapps.online',
				port: '',
				pathname: '/uploads/**'
			}
		]
	},

	// 🟡 Fallback для Netlify — тут гарантуємо, що .svg рендериться як React-компонент
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		})
		return config
	}
}

export default withNextIntl(nextConfig)
