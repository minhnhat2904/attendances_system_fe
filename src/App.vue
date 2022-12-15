<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import DefaultLayout from '@/layouts/defaultLayout.vue'
import QRLayout from '@/layouts/qrLayout.vue'
import AuthLayout from '@/layouts/authLayout.vue'

const { getAuthenticate } = useAuthStore()

const route = useRoute()
const currentLayout = computed(() => {
	switch (route.meta.layout) {
		case 'defaultLayout':
			return DefaultLayout
		case 'qrLayout':
			return QRLayout
		case 'authLayout':
			return AuthLayout
		default:
			return DefaultLayout
	}
})

const isRouter = computed(() => {
	if (route.name !== null) return true
	return false
})

onMounted(() => {
	getAuthenticate()
})
</script>

<template>
	<component :is="currentLayout" v-if="isRouter">
		<router-view />
	</component>
</template>

<style>
@import '@/assets/base.css';
</style>
