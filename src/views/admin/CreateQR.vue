<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useAdminStore } from '@/stores/admin.js'
const { createQr } = useAdminStore()
const { qr } = storeToRefs(useAdminStore())

const handleCreateQr = async () => {
	await createQr()
}
</script>
<template>
	<div class="create-qr p-4">
		<div class="image d-flex justify-content-center">
			<img :src="qr.url" />
		</div>
		<div class="d-flex justify-content-center mt-3">
			<button class="btn btn-success px-3 py-2" @click="handleCreateQr"
				>Create QR</button
			>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.create-qr {
	width: 300px;
	justify-content: center;
	.image {
		img {
			width: 200px;
			height: 200px;
		}
	}
}
</style>
