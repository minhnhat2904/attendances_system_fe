import { defineStore } from 'pinia'
import { useApi } from '@/api/useAPI.js'

const api = useApi()

export const useUserStore = defineStore({
	id: 'user',

	state: () => {
		return {
			email: null
		}
	},

	actions: {
	},
})
