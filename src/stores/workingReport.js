import { defineStore } from 'pinia'
import http from '@/service/http.js'
import { useToast } from 'vue-toastification'

export const useWorkingReportStore = defineStore({
	id: 'workingReport',

	state: () => {
		return {
			workingReport: [],
		}
	},

	actions: {
		async getWorkingReport(userId) {
			try {
				const response = await http.get(`/reports?userId=${userId}`)
				this.workingReport = response.data.data
			} catch (error) {
				console.log(error)
			}
		},
		async createWorkingReport(params) {
			const toast = useToast()
			try {
				const response = await http.post('/reports', params)
				toast.success('Create working report successfully!', {
					timeout: 2000,
				})
				this.workingReport.push(response.data.data)
				return response
			} catch (error) {
				toast.error('Create working report failed!', {
					timeout: 2000,
				})
				console.log(error)
			}
		},
		async updateWorkingReport(params, id) {
			const toast = useToast()
			try {
				const response = await http.put(`/reports/${id}`, params)
				toast.success('Update working report successfully!', {
					timeout: 2000,
				})
				return response
			} catch (error) {
				toast.error('Update working report failed!', {
					timeout: 2000,
				})
				console.log(error)
			}
		},
		async deleteWorkingReport(id) {
			const toast = useToast()
			try {
				const response = await http.delete('/reports', id)
				toast.success('Delete working report successfully!', {
					timeout: 2000,
				})
				return response
			} catch (error) {
				toast.error('Delete working report failed!', {
					timeout: 2000,
				})
				console.log(error)
			}
		},
	},
})
