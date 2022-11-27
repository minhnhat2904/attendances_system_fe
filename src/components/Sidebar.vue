<script setup>
import { ref } from 'vue'

const isExpanded = ref(true)
const toggleMenu = () => {
	isExpanded.value = !isExpanded.value
}
</script>

<template>
	<div :class="isExpanded ? 'is-expanded' : ''" class="side-bar">
		<div class="side-bar_toggle-wrap">
			<button class="menu-toggle" @click="toggleMenu">
				<span class="material-symbols-outlined side-bar-icon" v-if="isExpanded">
					keyboard_double_arrow_left
				</span>
				<span class="material-symbols-outlined side-bar-icon" v-else>
					keyboard_double_arrow_right
				</span>
			</button>
		</div>

		<div class="side-bar_list">
			<router-link class="side-bar-item" to="/">
				<span class="material-symbols-outlined side-bar-icon"> add_circle </span>
				<span class="title" v-if="isExpanded">Create Request off</span>
			</router-link>
			<router-link class="side-bar-item" to="/requestHistory">
				<span class="material-symbols-outlined side-bar-icon"> list_alt </span>
				<span class="title" v-if="isExpanded">Request History</span>
			</router-link>
			<router-link class="side-bar-item" to="/changePassword">
				<span class="material-symbols-outlined side-bar-icon"> lock </span>
				<span class="title" v-if="isExpanded">Change password</span>
			</router-link>
			<router-link class="side-bar-item" to="/workingReport">
				<span class="material-symbols-outlined side-bar-icon">
					business_center
				</span>
				<span class="title" v-if="isExpanded">Working report</span>
			</router-link>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.side-bar {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 3.2rem;
	height: 100%;
	overflow: visible;
	background-color: white;
	border-right: 1px solid gray;
	transition: 0.2s ease-out;
	position: relative;

	&_toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;
		margin: 0;
		position: absolute;
		top: 40%;
		right: -16px;
		width: fit-content;
		transition: 0.2s ease-out;

		.menu-toggle {
			transition: 0.2s ease-out;
			padding: 0.6rem;
			background: white;
			border-radius: 0.5rem;
			border: 1px solid gray;
			display: flex;
			justify-self: center;
			align-items: center;

			.side-bar-icon {
				color: rgb(10, 122, 241);
				font-size: 20px;
				font-weight: bold;
			}

			&:hover {
				.side-bar-icon {
					font-size: 20px;
					transition: 0.2s ease-out;
				}
			}
		}
	}
	.button .text {
		opacity: 0;
		transition: 0, 3s ease-out;
		color: black;
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
			border-bottom: 1px solid gray;
			color: #337ab7;

			.side-bar-icon {
				color: #337ab7;
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
			}
		}
	}

	&.is-expanded {
		width: 250px;
		transition: 0.2 ease-out;
	}
	.router-link-active {
		background-color: #f3f3f3;
	}
}
</style>
