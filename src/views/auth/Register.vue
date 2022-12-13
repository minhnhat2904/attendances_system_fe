<template>
	<div class="register">
		<form @submit.prevent="registerFn" class="register-form">
			<h3 class="register-form_title">Create Account</h3>
			<input
				id="name"
				v-model="credentials.name"
				type="text"
				placeholder="User name"
				class="register-form_input" />
			<input
				id="email"
				v-model="credentials.email"
				type="text"
				placeholder="Email"
				class="register-form_input" />
			<input
				id="password"
				v-model="credentials.password"
				type="password"
				class="register-form_input"
				placeholder="Password" />
			<input
				id="confirmation"
				v-model="credentials.password_confirmation"
				type="password"
				placeholder="Confirm Password"
				class="register-form_input" />

			<div class="register-form_action">
				<RouterLink to="/login" class="action-transition">
					Back to login
				</RouterLink>
				<button type="submit" class="action-register">Register</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { useToast } from 'vue-toastification'
const auth = useAuthStore()
const router = useRouter()
const credentials = reactive({
	name: '',
	email: '',
	password: '',
	password_confirmation: '',
})

const rules = computed(() => {
	return {
		name: { required, minLength: minLength(3) },
		email: { required, email, minLength: minLength(10) },
		password: { required, minLength: minLength(6) },
		password_confirmation: { required, sameAs: sameAs(credentials.password) },
	}
})

const v$ = useVuelidate(rules, credentials)

const registerFn = async () => {
	const toast = useToast()
	const result = await v$.value.$validate()
	if (result) {
		await auth.register(credentials)
		await router.push('/')
	} else {
		toast.error(`${v$.value.$errors[0].$property}-${v$.value.$errors[0].$message}`, {
			timeout: 2000,
		})
	}
}
</script>

<style lang="scss" scoped>
.register {
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

		&_action {
			margin-top: 10px;
			display: flex;
			flex-direction: column;

			.action-register {
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
			.action-transition {
				text-decoration: none;
			}
		}
	}
}
</style>
