import axios, { AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create()

axiosInstance.interceptors.response.use(
	response => response,
	error => {
		const customError = {
			message:
				error.response?.data?.message || error.message || 'Unknown error',
			status: error.response?.status || 500,
			details: error.response?.data || {}
		}
		return Promise.reject(customError)
	}
)

export default axiosInstance
