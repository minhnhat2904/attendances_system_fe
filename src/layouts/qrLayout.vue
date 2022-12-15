<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useQrStore } from '@/stores/qr.js'

const { url } = storeToRefs(useQrStore());
const { getQrcode } = useQrStore();

onMounted(async () => {
	getQrcode()
})

</script>

<template>
	<div class="layout-qr">
		<img :src="url" alt="">
	</div>
</template>

<style lang="scss" scoped>
.layout-qr {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
    width: 300px;
}
}

</style>