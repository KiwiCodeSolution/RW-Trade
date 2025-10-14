// /** @type {import('next').NextConfig} */
// const nextConfig = {
// 	experimental: {
// 		turbo: {
// 			rules: {
// 				'*.svg': {
// 					loaders: ['@svgr/webpack'],
// 					as: '*.jsx'
// 				}
// 			}
// 		}
// 	}
// }
// export default nextConfig
import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

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
	}
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
