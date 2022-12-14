import { defineStore } from 'pinia'
import http from '@/service/http.js'
import { useToast } from 'vue-toastification'

export const useAdminStore = defineStore({
	id: 'admin',

	state: () => {
		return {
			listUser: [],
			listUserForAccountancy: [],
			qr: {},
			departments: []
		}
	},
	actions: {
		async fetchDeparments() {
			try {
				const response = await http.get('/departments')
				this.departments = response.data.data;
				return response.data.data
			} catch (error) {
				console.log(error)
			}
		},
		async fetchUser(params) {
			try {
				console.log(params);
				const response = await http.get('/users', params)
				this.listUser = response.data.data;
				return response
			} catch (error) {
				console.log(error)
			}
		},
		async fetchUserForAccountancy(params) {
			try {
				const response = await http.get('/users/getUserForAccountancy', params)
				this.listUserForAccountancy = response.data.data;
				return response.data.data
			} catch (error) {
				console.log(error)
			}
		},
		async createUser(params) {
			const toast = useToast()

			try {
				const response = await http.post('/users', params)
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
		async createUserByUpload(params) {
			const toast = useToast()
			try {
				const response = await http.post('/users/file', params)
				if (response.data.status === true) {
					toast.success('Create user success!', {
						timeout: 2000,
					})
				}
				return response
			} catch (error) {
				toast.error('Create user failed!', {
					timeout: 2000,
				})
				console.log(error)
			}
		},
		async updateUser(params, id) {
			const toast = useToast()

			try {
				const response = await http.put(`/users/${id}`, params)
				if (response.data.status === true) {
					toast.success('Update user success!', {
						timeout: 2000,
					})
				}
				return response
			} catch (error) {
				toast.error('Update user failed!', {
					timeout: 2000,
				})
				console.log(error)
			}
		},
		async deleteUser(id) {
			const toast = useToast()

			try {
				const response = await http.delete('/users', id)
				if (response.data.status === true) {
					toast.success('Delete user success!', {
						timeout: 2000,
					})
				}
				return response
			} catch (error) {
				toast.error('Delete user failed!', {
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
				toast.error('Create QR failed!', {
					timeout: 2000,
				})
				console.log(error)
			}
		},
	},
})
