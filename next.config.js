/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	headers: async () => {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Content-Security-Policy',
						value: `frame-ancestors verify.walletconnect.org verify.walletconnect.com;`,
					},
				],
			},
		]
	},
	webpack: config => {
		config.externals.push('pino-pretty', 'lokijs', 'encoding')
		return config
	},
}

module.exports = nextConfig
