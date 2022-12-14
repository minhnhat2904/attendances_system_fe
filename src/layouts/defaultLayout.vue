<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { useUserStore } from '@/stores/user.js'
import jwtDecode from 'jwt-decode'
import Sidebar from '@/components/Sidebar.vue'
const { getRemainHours } = useUserStore()

const userInfo = ref({})
const auth = useAuthStore()
const { remainHours } = storeToRefs(useUserStore())
onMounted(async () => {
	if (localStorage.getItem('token')) {
		const token = localStorage.getItem('token')
		userInfo.value = jwtDecode(token)
		// getRemainHours();
	}
})
const logoutFn = async () => {
	await auth.logout()
}
</script>

<template>
	<div class="layout-default d-flex">
		<div class="layout-default_navbar">
			<Sidebar :userInfo="userInfo" />
		</div>
		<div class="w-100">
			<header class="layout-default_header">
				<div class="wrapper">
					<nav class="d-flex">
						<span class="user-name">{{ userInfo.username }}</span>
						<span class="mx-1">|</span>
						<span class="material-symbols-outlined icon-logout" @click="logoutFn">
							logout
						</span>
					</nav>
				</div>
			</header>

			<main class="layout-default_main">
				<div class="layout-default_content">
					<slot />
				</div>
			</main>

			<footer class="layout-default_footer">
				<p>© Copyright 2022</p>
				<p>Attendance System Project (2022)</p>
			</footer>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.layout-default {
	z-index: 900;
	width: 100%;
	height: 100vh;

	&_header {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 0px 20px;
		height: 56px !important;
		color: #337ab7;
		box-shadow: 0px 1px 5px 1px;
		.user-name {
			cursor: pointer;
		}
		.icon-logout {
			color: #337ab7;
			font-weight: bold;
			font-style: 1.2rem;
			cursor: pointer;
		}
	}

	&_main {
		display: flex;
		height: calc(100vh - 140px);

		.layout-default_content {
			width: 100%;
			height: 100%;
			overflow: auto;
		}
	}

	&_footer {
		width: 100%;
		height: 80px;
		background-color: #f8f8f8;
		border-top: 1px solid #e7e7e7;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		p {
			margin: 0;
		}
	}
}
</style>
