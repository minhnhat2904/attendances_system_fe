import axios from 'axios'
import middleware401 from './middleware401'

/**
 * Initialize Axios instance to call the API
 * @param {string} endpoint either 'web' or 'api' (default)
 * @returns {AxiosInstance}
 */
export const useApi = (endpoint = 'api') => {
	const { API_HOST, API_PATH } = import.meta.env

	let baseURL

	if (endpoint === 'api') {
		baseURL = API_HOST + API_PATH || 'http://localhost:8000/api'
	} else if (endpoint === 'web') {
		baseURL = API_HOST || 'http://localhost:8000'
	}

	const axiosInstance = axios.create({
		baseURL,
		withCredentials: true,
	})

	// axiosInstance.interceptors.response.use(resp => resp, middleware401)
	axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
	axiosInstance.defaults.headers.common['Access-Control-Allow-Headers'] =
		'authorization'

	axiosInstance.interceptors.request.use(async request => {
		const token = localStorage.getItem('token')
		request.headers.authorization = `Bearer ${token}`
		return request
	})
	return axiosInstance
}
