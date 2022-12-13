<template>
	<div class="login">
		<form @submit.prevent="handleLogin" class="login-form">
			<h3 class="login-form_title">Login</h3>
			<input
				id="username"
				name="address"
				v-model.trim="credentials.username"
				type="text"
				placeholder="User name"
				class="login-form_input" />
			<input
				id="password"
				name="passwd"
				v-model.trim="credentials.password"
				type="password"
				placeholder="Password"
				class="login-form_input" />

			<div class="to-end">
				<!-- <RouterLink to="/forgot-password">Forgot your password?</RouterLink> -->
				<RouterLink to="/register">You don't have an account?</RouterLink>
				<button type="submit" class="login-form_submit">Login</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useToast } from 'vue-toastification'

const router = useRouter()
const auth = useAuthStore()

const credentials = reactive({
	username: null,
	password: null,
})

const rules = computed(() => {
	return {
		username: { required, email, minLength: minLength(10) },
		password: { required, minLength: minLength(6) },
	}
})

const v$ = useVuelidate(rules, credentials)

const handleLogin = async () => {
	const toast = useToast()
	const result = await v$.value.$validate()
	if (result) {
		await auth.login(credentials)
		await router.push('/')
	} else {
		toast.error(`${v$.value.$errors[0].$property}-${v$.value.$errors[0].$message}`, {
			timeout: 2000,
		})
	}
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

		.error {
			width: 100%;
			height: 50px;
		}

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

		.to-end {
			display: flex;
			flex-direction: column;

			a {
				text-decoration: none;
			}

			.login-form_submit {
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
}
</style>
