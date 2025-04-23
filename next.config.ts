import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		domains: [
			'dummyimage.com',
			'external-content.duckduckgo.com', // ← el host del error
			'media.licdn.com'
		]
	}
}

export default nextConfig
