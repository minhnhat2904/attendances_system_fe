import { defineStore } from 'pinia'
import http from '@/service/http.js'
import { useToast } from 'vue-toastification'

export const useAdminStore = defineStore({
	id: 'admin',

	state: () => {
		return {
			listUser: [],
			qr: {},
		}
	},
	actions: {
		async fetchUser() {
			try {
				const response = await http.get('')
				return response
			} catch (error) {
				console.log(error)
			}
		},
		async createUser(params) {
			const toast = useToast()

			try {
				const response = await http.post('', params)
				if (response.data.status === true) {
					toast.success('Create user success!', {
						timeout: 2000,
					})
				}
				return response
			} catch (error) {
				toast.error('Create user failse!', {
					timeout: 2000,
				})
				console.log(error)
			}
		},
		async updateUser(params, id) {
			const toast = useToast()

			try {
				const response = await http.put(`${id}`, params)
				if (response.data.status === true) {
					toast.success('Update user success!', {
						timeout: 2000,
					})
				}
				return response
			} catch (error) {
				toast.error('Update user failse!', {
					timeout: 2000,
				})
				console.log(error)
			}
		},
		async deleteUser(id) {
			const toast = useToast()

			try {
				const response = await http.delete('', id)
				if (response.data.status === true) {
					toast.success('Delete user success!', {
						timeout: 2000,
					})
				}
				return response
			} catch (error) {
				toast.error('Delete user failse!', {
					timeout: 2000,
				})
				console.log(error)
			}
		},
		async createQr() {
			const toast = useToast()

			try {
				const response = await http.post('/qrcodes')
				if (response.data.status === true) {
					this.qr = response.data.data
					toast.success('Create QR success!', {
						timeout: 2000,
					})
				}
				return this.qr
			} catch (error) {
				toast.error('Create QR failse!', {
					timeout: 2000,
				})
				console.log(error)
			}
		},
	},
})
