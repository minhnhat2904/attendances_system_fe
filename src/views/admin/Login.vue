<template>
	<div class="login">
		<form @submit.prevent="handleLogin" class="login-form">
			<h3 class="login-form_title">Login</h3>
			<input
				id="username"
				name="address"
				v-model.trim="credentials.username"
				type="text"
				required
				placeholder="User name"
				class="login-form_input" />
			<input
				id="password"
				name="passwd"
				v-model.trim="credentials.password"
				type="password"
				required
				placeholder="Password"
				class="login-form_input" />

			<button type="submit" class="login-form_submit d-flex">
				<span class="material-symbols-outlined"> admin_panel_settings </span>
				Login</button
			>
		</form>
	</div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()
const { loginAdmin } = useAuthStore()

const credentials = reactive({
	username: null,
	password: null,
})

const handleLogin = async () => {
	await loginAdmin(credentials)
	router.push('/admin')
}
</script>

<style lang="scss" scoped>
.login {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;

	&-form {
		width: 350px;
		height: 250px;
		padding: 15px;

		display: flex;
		flex-direction: column;

		gap: 10px;

		&_title {
			display: flex;
			justify-content: center;
			font-size: 24px;
			margin: 10px 0;
			color: #006699;
			font-weight: bold;
		}

		&_input {
			width: 100%;
			height: 45px;
			box-sizing: border-box;
			padding: 10px;
			font-size: 16px;
			border-radius: 5px;
			border-style: solid;
			border-width: 1px;
			border: 1px solid #d9d9d9;

			&:focus {
				border: 1px solid #9bcbf0;
				outline: none;
				box-shadow: #9bcbf0 0px 0px 5px 0px;
			}
		}

		.login-form_submit {
			align-items: center;
			justify-content: center;
			gap: 5px;
			margin-top: 5px;
			width: 100%;
			height: 45px;
			background: #337ab7;
			border: none;
			border-radius: 6px;
			font-weight: 600;
			color: white;

			&:hover {
				background: #125895;
			}

			&:active {
				background: #09477d;
			}
		}
	}
}
</style>
