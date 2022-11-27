import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import { useApi } from '@/api/useAPI'
import axios from 'axios'
import http from '@/service/http.js'

export const useAuthStore = defineStore({
	id: 'auth',

	state: () => {
		return {
			isLoggedIn: false,
		}
	},
	actions: {
		async login({ username, password }) {
			const user = useUserStore()
			try {
				const response = await http.post('/auth/login', { username, password })
				localStorage.setItem('token', response.data.data)
				this.isLoggedIn = true
			} catch (error) {
				console.log('Error at login: ', error.message)
				throw error
			}
		},
		async register(props) {
			const user = useUserStore()
			try {
			} catch (error) {}
		},
		async forgotPassword({ email }) {
			try {
			} catch (error) {}
		},

		async logout() {
			const user = useUserStore()
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
