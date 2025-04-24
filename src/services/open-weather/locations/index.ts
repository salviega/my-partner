// openWeatherService.ts
import axiosInstance from '@/config/axios.config'
import { OpenWeatherLocationDto } from '@/dtos/open-weather-location.dto'
import { mapOpenWeatherLocationDtoToLocationString } from '@/mappings/open-weather-location-dto-to-location-string.mapping'

import { getHost } from '..'

type OpenWeatherService = {
	getLocation: (
		city: string,
		state?: string,
		country?: string,
		limit?: number
	) => Promise<string>
}

export function openWeatherService(): OpenWeatherService {
	const { host, apiKey } = getHost()

	const getLocation = async (
		city: string,
		state?: string,
		country?: string,
		limit: number = 1
	): Promise<string> => {
		try {
			const queryParts: string[] = [city]

			if (state) {
				queryParts.push(state)
			}

			if (country) {
				queryParts.push(country)
			}

			const query: string = queryParts.join(',')

			const response = await axiosInstance.get(`${host}/geo/1.0/direct`, {
				params: {
					q: query,
					limit,
					appid: apiKey
				}
			})

			const locationArrayDto: OpenWeatherLocationDto[] = response.data

			if (locationArrayDto.length === 0) {
				return 'City not found'
			}

			const location: string[] = locationArrayDto.map(
				(locationDto: OpenWeatherLocationDto) =>
					mapOpenWeatherLocationDtoToLocationString(locationDto)
			)

			if (location.length > 0) {
				return location[0]
			}

			return 'City not found'
		} catch (error) {
			console.error('❌', error)
			return 'City not found'
		}
	}

	return {
		getLocation
	}
}
