import { defineStore } from 'pinia'
import http from '@/service/http.js'

export const useAttendanceStore = defineStore({
	id: 'attendance',

	state: () => {
		return {
			workDays: [],
		}
	},
	actions: {
		async get(params = null) {
			try {
				const response = await http.get('/workday/user', params)
				this.workDays = response.data.data
			} catch (error) {
				console.log('Error at login: ', error.message)
				throw error
			}
		},
	},
})
