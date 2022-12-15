import { defineStore } from 'pinia'
import http from '@/service/http.js'

export const useAttendanceStore = defineStore({
	id: 'attendance',

	state: () => {
		return {
			workDays: [],
			workDaysDepartment: []
		}
	},
	actions: {
		async get(params = null) {
			try {
				const response = await http.get('/workdays/user', params)
				this.workDays = response.data.data
			} catch (error) {
				console.log('Error at login: ', error.message)
				throw error
			}
		},
		async getWorkDayDepartment(department = '', startDate = '', endDate = '') {
			try {
				const response = await http.get(`/workdays/department/${department}?startDate=${startDate}&endDate=${endDate}`)
				this.workDaysDepartment = response.data.data
			} catch (error) {
				console.log('Error at login: ', error.message)
				throw error
			}
		},
	},
})
