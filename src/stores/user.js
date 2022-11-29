import { defineStore } from 'pinia'
import http from '@/service/http.js'
import { useToast } from 'vue-toastification'

export const useUserStore = defineStore({
	id: 'user',

	state: () => {
		return {
			email: null,
			userInfo: {},
		}
	},

	actions: {
		async changePassword(payload) {
			const toast = useToast()
			try {
				const response = await http.put('/auth/updatePassword', payload)
				toast.success('Change password successfully!', {
					timeout: 2000,
				})
				return response.data.status
			} catch (error) {
				toast.error('Change password failed!', {
					timeout: 2000,
				})
				console.log(error)
			}
		},

		async getProfile() {
			try {
				const response = await http.get('/auth/profile')
				this.userInfo = response.data.data
			} catch (error) {
				console.log(error)
			}
		},
	},
})
