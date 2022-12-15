import { defineStore } from 'pinia'
import http from '@/service/http.js'
import { useToast } from 'vue-toastification'

export const useQrStore = defineStore({
	id: 'qr',

	state: () => {
		return {
			url: '',
		}
	},

	actions: {
		async getQrcode() {
			try {
				const response = await http.get('/qrCodes', {createdAt: new Date()})
				this.url = response.data.data.url;
			} catch (error) {
				console.log(error)
			}
		},
	},
})
