import { OpenWeatherLocationDto } from '@/dtos/open-weather-location.dto'

export function mapOpenWeatherLocationDtoToLocationString(
	location: OpenWeatherLocationDto
): string {
	const cityEn: string = location.local_names?.en ?? location.name
	return `${cityEn}, ${location.country}`
}
