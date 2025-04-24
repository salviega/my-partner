export interface OpenWeatherLocationDto {
	name: string
	local_names?: Record<string, string> // { [languageCode: string]: string }
	lat: number
	lon: number
	country: string
}
