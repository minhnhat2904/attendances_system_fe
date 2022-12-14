import { defineStore } from 'pinia'
import http from '@/service/http.js'
import { useToast } from 'vue-toastification'
import moment from 'moment'

export const useCreateRequestStore = defineStore({
	id: 'createRequest',

	state: () => {
		return {
			requestResultList: [],
		}
	},

	getters: {
		getRequestResultList() {
			// this.requestResultList.map((request) => {
			// 	request.createdAt = moment(request.createdAt).format('DD/MM/YYYY hh:mm')
			// 	return request
			// })
			return this.requestResultList
		}
	},

	actions: {
		async fetchRequestResult(department = '', userId = '', status = 3, startDate = '', endDate = '', limit = 25) {
			try {
				const response = await http.get(`/leaves?department=${department}&userId=${userId}&startDate=${startDate}&endDate=${endDate}&status=${status}&limit=${limit}`)
				this.requestResultList = response.data.data
			} catch (error) {
				console.log(error)
			}
		},
		async createRequestOff(params) {
			const toast = useToast()
			try {
				const response = await http.post('/leaves', params)
				toast.success('Create request off successfully!', {
					timeout: 2000,
				})
				return response
			} catch (error) {
				toast.error('Create request off failed!', {
					timeout: 2000,
				})
				console.log(error)
			}
		},
		async updateRequestOff(params, id) {
			const toast = useToast()
			try {
				const response = await http.put(`/leaves/${id}`, params)
				toast.success('Update request off successfully!', {
					timeout: 2000,
				})
				return response
			} catch (error) {
				toast.error('Update request off failed!', {
					timeout: 2000,
				})
				console.log(error)
			}
		},
		async deleteRequestOff(id) {
			const toast = useToast()
			try {
				const response = await http.delete('/leaves', id)
				toast.success('Delete request off successfully!', {
					timeout: 2000,
				})
				return response
			} catch (error) {
				toast.error('Delete request off failed!', {
					timeout: 2000,
				})
				console.log(error)
			}
		},
	},
})
