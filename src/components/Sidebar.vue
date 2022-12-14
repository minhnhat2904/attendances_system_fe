<script setup>
import { ref } from 'vue'
const props = defineProps({
	userInfo: Object,
})

const isExpanded = ref(true)
const toggleMenu = () => {
	isExpanded.value = !isExpanded.value
}
</script>

<template>
	<div :class="isExpanded ? 'is-expanded' : ''" class="side-bar">
		<div class="logo w-100 px-3">
			<router-link to="/">
				<img alt="Vue logo" class="logo" src="@/assets/verified-account.png" />
			</router-link>
		</div>
		<div class="side-bar_toggle-wrap" @click="toggleMenu">
			<span class="material-symbols-outlined side-bar-icon" v-if="isExpanded">
				keyboard_double_arrow_left
			</span>
			<span class="material-symbols-outlined side-bar-icon" v-else>
				keyboard_double_arrow_right
			</span>
		</div>
		<!-- Role employee -->
		<div
			class="side-bar_list mt-5"
			v-if="userInfo.role !== undefined && userInfo.role.includes('employee')">
			<router-link class="side-bar-item" to="/">
				<span class="material-symbols-outlined side-bar-icon"> add_circle </span>
				<span class="title" v-if="isExpanded">Create Request off</span>
			</router-link>
			<router-link class="side-bar-item" to="/requestHistory">
				<span class="material-symbols-outlined side-bar-icon"> manage_history </span>
				<span class="title" v-if="isExpanded">Request History</span>
			</router-link>
			<router-link class="side-bar-item" to="/changePassword">
				<span class="material-symbols-outlined side-bar-icon"> lock </span>
				<span class="title" v-if="isExpanded">Change password</span>
			</router-link>
			<router-link class="side-bar-item" to="/workingReport">
				<span class="material-symbols-outlined" side-bar-icon> problem </span>
				<span class="title" v-if="isExpanded">Working report</span>
			</router-link>
		</div>
		<!-- Role Admin -->
		<div class="side-bar_list" v-if="userInfo.role === 'admin'">
			<router-link class="side-bar-item" to="/admin/">
				<span class="material-symbols-outlined side-bar-icon">
					manage_accounts
				</span>
				<span class="title" v-if="isExpanded">User Management</span>
			</router-link>
			<router-link class="side-bar-item" to="/admin/createQr">
				<span class="material-symbols-outlined side-bar-icon">
					qr_code_scanner
				</span>
				<span class="title" v-if="isExpanded">Create QR Code</span>
			</router-link>
		</div>
		<!-- Role Accountancy -->
		<div
			class="side-bar_list"
			v-if="userInfo.role !== undefined && userInfo.role.includes('accountancy')">
			<router-link class="side-bar-item" to="/accountant/">
				<span class="material-symbols-outlined side-bar-icon"> badge </span>
				<span class="title" v-if="isExpanded">User Info</span>
			</router-link>
			<router-link class="side-bar-item" to="/accountant/amountHourWork">
				<span class="material-symbols-outlined side-bar-icon"> home_work </span>
				<span class="title" v-if="isExpanded">List amount hour work</span>
			</router-link>
		</div>
		<!-- Role Head Department -->
		<div
			class="side-bar_list"
			v-if="
				userInfo.role !== undefined && userInfo.role.includes('head_department')
			">
			<!-- <router-link class="side-bar-item" to="/headDepartment/">
				<span class="material-symbols-outlined side-bar-icon"> add_circle </span>
				<span class="title" v-if="isExpanded">History Request</span>
			</router-link> -->
			<router-link class="side-bar-item" to="/headDepartment/confirmRequest">
				<span class="material-symbols-outlined side-bar-icon"> check </span>
				<span class="title" v-if="isExpanded">Confirm request</span>
			</router-link>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.side-bar {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: 100%;
	overflow: visible;
	background-color: #282c34;
	transition: 0.2s ease-out;
	position: relative;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px;
	transition: 0.2s ease-out;

	.logo {
		height: 56px;
	}

	&_toggle-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 40%;
		right: -16px;
		width: 40px;
		height: 40px;
		border-radius: 0.4rem;
		background: white;
		cursor: pointer;
		transition: 0.2s ease-out;
		border: 1px solid gray;
		.side-bar-icon {
			color: rgb(10, 122, 241);
			font-size: 20px;
			font-weight: bold;
		}

		&:hover {
			transform: translateX(-2px);
		}
	}
	.button .text {
		opacity: 0;
		transition: 0.3s ease-out;
	}
	&_list {
		.side-bar-item {
			display: flex;
			align-items: center;
			text-decoration: none;
			gap: 0.5rem;
			padding: 0rem 1rem;
			transition: 0.22 ease-out;
			height: 50px;
			border-bottom: 1px solid rgb(181, 181, 181);
			color: white;

			.side-bar-icon {
				color: white;
				font-size: 1.2rem;
				font-weight: bold;
				transition: 0.2 ease-out;
			}
			.title {
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;
				text-overflow: ellipsis;
				word-break: break-word;
				transition: 0.2 ease-out;
				font-weight: 500;
			}

			&:hover {
				color: #124c7f;
				background-color: #f3f3f3;
				.side-bar-icon {
					color: #124c7f;
				}
			}
		}
	}

	&.is-expanded {
		width: 300px;
		transition: 0.2 ease-out;
	}
	.router-link-active {
		color: #124c7f;
		background-color: #f3f3f3;

		.side-bar-icon {
			color: #124c7f;
		}
	}
}
</style>
