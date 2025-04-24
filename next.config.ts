import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		domains: [
			'maps.gstatic.com',
			'lh3.googleusercontent.com',
			'dummyimage.com',
			's3.amazonaws.com',
			'dummyimage.com',
			'external-content.duckduckgo.com', // ← el host del error
			'media.licdn.com'
		]
	}
}

export default nextConfig
