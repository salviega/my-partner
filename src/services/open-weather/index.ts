import { ensureEnvVar } from '@/helpers'

type OpenWeatherConfig = {
	host: string
	apiKey: string
}

export function getHost(): OpenWeatherConfig {
	const host: string = 'https://api.openweathermap.org'

	const apiKey: string = ensureEnvVar(
		process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY,
		'NEXT_PUBLIC_OPEN_WEATHER_API_KEY'
	)

	return { host, apiKey }
}
