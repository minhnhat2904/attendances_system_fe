import axios from 'axios'
import jwtDecode from 'jwt-decode'
import qs from 'qs'

const handleOkResponse = (response, resolve) => {
	resolve(response)
}

const handleErrorResponse = (error, reject) => {
	if (!error.response) {
		reject(error)
		return
	}
	const reponseErrors = error.response.data?.errors
	let errors = []
	if (!reponseErrors || reponseErrors.length === 0) {
		errors = [error.response.data.message]
	} else {
		errors = Object.keys(reponseErrors).reduce(
			(currentErrors, key) => currentErrors.concat(reponseErrors[key]),
			errors
		)
	}
	reject(error)
}

const axiosInstance = axios.create({
	baseURL: 'https://attendances.onrender.com/api',
	timeout: 180000,
	headers: {
		'Content-Type': 'application/json',
	},
})

axiosInstance.interceptors.request.use(async request => {
	try {
		const token = localStorage.getItem('token')
		if (token) {
			request.headers.Authorization = `Bearer ${token}`
			const decoded = jwtDecode(token)

			let isExpired = decoded.exp * 1000 - Date.parse(Date()) < 1
			if (!isExpired) return request
		}

		return request
	} catch (exception) {
		console.log(exception)
	}
})

const service = {
	get(endPoint, params) {
		return new Promise((resolve, reject) => {
			axiosInstance
				.get(`${endPoint}`, {
					params,
					paramsSerializer: params => {
						return qs.stringify(params)
					},
				})
				.then(response => {
					handleOkResponse(response, resolve)
				})
				.catch(error => {
					handleErrorResponse(error, reject)
				})
		})
	},
	post(endPoint, params) {
		return new Promise((resolve, reject) => {
			axiosInstance
				.post(`${endPoint}`, params)
				.then(response => {
					handleOkResponse(response, resolve)
				})
				.catch(error => {
					handleErrorResponse(error, reject)
				})
		})
	},
	put(endPoint, params) {
		return new Promise((resolve, reject) => {
			axiosInstance
				.put(`${endPoint}`, params)
				.then(response => {
					handleOkResponse(response, resolve)
				})
				.catch(error => {
					handleErrorResponse(error, reject)
				})
		})
	},
	delete(endPoint, params) {
		return new Promise((resolve, reject) => {
			axiosInstance
				.delete(`${endPoint}`, { data: params })
				.then(response => {
					handleOkResponse(response, resolve)
				})
				.catch(error => {
					handleErrorResponse(error, reject)
				})
		})
	},
}

export default service
