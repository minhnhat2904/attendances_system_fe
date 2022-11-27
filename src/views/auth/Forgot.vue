<template>
	<div class="forgot">
		<form @submit.prevent="forgotFn" class="forgot-form">
			<h3 class="forgot-form_title">Forgot your password?</h3>
			<p class="forgot-form_desc">
				Let us know your email address and we will email you a password reset link
				that will allow you to choose a new one.
			</p>
			<p>Email</p>
			<input
				id="email"
				v-model="email"
				type="text"
				placeholder="Enter your email"
				cl
				required
				class="forgot-form_input" />

			<div class="forgot-form_action">
				<RouterLink to="/login" class="action-transition"> Back to login</RouterLink>
				<button type="submit" class="action-submit">Reset password</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref(null)

const forgotFn = async () => console.log('Still work in progress') //	await auth.forgotPassword({email: email.value})
</script>

<style lang="scss" scoped>
.forgot {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;

	&-form {
		width: 350px;
		height: 350px;
		padding: 15px;
		display: flex;
		flex-direction: column;
		box-shadow: grey 2px 6px 10px 0px;

		&_title {
			display: flex;
			justify-content: center;
			font-size: 24px;
			margin: 10px 0;
			color: #006699;
			font-weight: bold;
		}

		&_desc {
			margin-bottom: 0;
			margin-bottom: 10px;
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
			.action-submit {
				margin-top: 20px;
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
