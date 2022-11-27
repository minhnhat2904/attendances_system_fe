<script setup>
import { useUserStore } from '@/stores/user.js'
import { ref } from 'vue'
import http from '@/service/http.js'

const user = useUserStore()

const currentPassword = ref('')
const newPassword = ref('')
const repeatNewPassword = ref('')

const handleChangePassword = async () => {
	const data = {
		password: currentPassword.value,
		newPassword: newPassword.value,
	}
	const response = await http.put('/auth/updatePassword', data)
	handleReset()
}

const handleReset = async () => {
	currentPassword.value = ''
	newPassword.value = ''
	repeatNewPassword.value = ''
}
</script>
<template>
	<div class="change-password-page">
		<h3><b>Change password</b></h3>
		<div class="form-input">
			<div>
				<p>Current password</p>
				<input type="password" v-model="currentPassword" class="input" />
			</div>
			<div>
				<p>New password</p>
				<input type="password" v-model="newPassword" class="input" />
			</div>
			<div>
				<p>Repeat new password</p>
				<input type="password" v-model="repeatNewPassword" class="input" />
			</div>
		</div>
		<div class="btn-handle">
			<button @click="handleChangePassword">Save</button>
			<button @click="handleReset">Reset</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.change-password-page {
	padding: 1rem 2rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	.form-input {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		.input {
			width: 400px;
			height: 40px;
			padding: 0 0.5rem;
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

		p {
			font-weight: 600;
			margin-bottom: 0;
		}
	}
	.btn-handle {
		margin-top: 0.5rem;

		button {
			width: 100px;
			height: 35px;
			border: none;
			padding: 5px;
			margin-right: 10px;
			background: #337ab7;
			color: white;
			font-weight: 500;

			&:hover {
				background: #104b80;
			}

			&:active {
				background: #053660;
			}
		}
	}
}
</style>
