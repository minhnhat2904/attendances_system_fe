import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import http from '@/service/http.js'
import { useToast } from 'vue-toastification'

export const useAuthStore = defineStore({
	id: 'auth',

	state: () => {
		return {
			isLoggedIn: false,
		}
	},
	actions: {
		async loginAdmin({ username, password }) {
			const toast = useToast()
			try {
				const response = await http.post('/admin/login', { username, password })
				if (response.data.status === true) {
					this.isLoggedIn = true
					localStorage.setItem('token', response.data.data)
					toast.success('Login success!', {
						timeout: 2000,
					})
				}
			} catch (error) {
				toast.error('Login failed!', {
					timeout: 2000,
				})
				console.log('Error at login: ', error.message)
				throw error
			}
		},

		async login({ username, password }) {
			const toast = useToast()
			try {
				const response = await http.post('/auth/login', { username, password })
				if (response.data.status === true) {
					localStorage.setItem('token', response.data.data)
					toast.success('Login success!', {
						timeout: 2000,
					})
					this.isLoggedIn = true
				}
			} catch (error) {
				console.log('Error at login: ', error.message)
				toast.error('Login failed!', {
					timeout: 2000,
				})
				throw error
			}
		},

		async logout() {
			const router = useRouter()

			localStorage.clear() // always clean localStorage before reset the state
			this.$reset()

			try {
				// await web.post('/logout')
				this.isLoggedIn = true
				localStorage.removeItem('token')
				await router.push({ name: 'login' })
			} catch (error) {
				window.location.pathname = '/login'
			}
		},

		async getAuthenticate() {
			this.isLoggedIn = localStorage.getItem('token') ? true : false
		},
	},
})
