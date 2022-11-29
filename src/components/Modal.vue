<script setup>
import { reactive, ref } from '@vue/reactivity'

const props = defineProps({
	show: {
		type: Boolean,
		default: false,
	},
	headerTitle: {
		type: String,
		default: 'Create Report',
	},
	data: Object,
})

const emit = defineEmits(['handleSaveWorkingReport', 'handleCancel'])
</script>

<template>
	<div class="modal-form" v-if="show">
		<div class="modal-box">
			<div class="header">
				<h4>{{ headerTitle }}</h4>
				<span
					class="material-symbols-outlined icon-close"
					@click="emit('handleCancel')">
					close
				</span>
			</div>
			<div class="body">
				<div class="row-1">
					<div class="date-report">
						<p class="title">Date Report</p>
						<input
							type="date"
							v-model="date"
							@input="$emit('date', $event.target.value)" />
					</div>
					<div class="project">
						<p class="title">Project in charge</p>
						<select v-model="selected.project">
							<option v-for="item in projectOptions" :key="item" :value="item.value">
								{{ item.text }}
							</option>
						</select>
					</div>
				</div>
				<div class="row-2">
					<div class="ticket">
						<p class="title">Ticket</p>
						<input type="text" />
					</div>
					<div class="task">
						<p class="title">Task</p>
						<select v-model="selected.task">
							<option v-for="item in taskOptions" :key="item" :value="item.value">
								{{ item.text }}
							</option>
						</select>
					</div>
				</div>
				<div class="row-3">
					<div class="time">
						<p class="title">Time</p>
						<input type="text" v-model="time" />
					</div>
					<div class="note">
						<p class="title">Note</p>
						<input type="text" v-model="note" />
					</div>
				</div>
			</div>

			<div class="footer">
				<button class="btn-save" @click="emit('handleSaveWorkingReport')">
					Save
				</button>
				<button class="btn-cancel" @click="emit('handleCancel')"> Cancel </button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.modal-form {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.271);
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
	.modal-box {
		width: auto;
		min-height: 400px;
		background: white;
		display: flex;
		justify-content: space-between;
		flex-direction: column;

		.header {
			height: 50px;
			width: 100%;
			border-bottom: 1px solid grey;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 0.5rem;
			.icon-close {
				font-weight: bold;
				cursor: pointer;
				transform: rotate(-90deg);
				transition: 0.2s linear;

				&:hover {
					transform: rotate(90deg);
					transition: 0.2s linear;
				}
			}
		}

		.body {
			width: 100%;
			height: calc(400px - 100px);
			display: flex;
			flex-direction: column;
			justify-content: start;
			padding: 1rem 2rem;
			gap: 1rem;

			.row-1,
			.row-2,
			.row-3 {
				display: flex;
				gap: 2rem;

				.title {
					font-weight: 600;
					width: 130px;
				}

				.date-report,
				.project,
				.ticket,
				.task,
				.time,
				.note {
					display: flex;
					align-items: center;
				}
			}

			input,
			select {
				width: 200px;
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
		}
		.footer {
			width: 100%;
			height: 50px;
			border-top: 1px solid grey;
			display: flex;
			justify-content: end;
			align-items: center;
			padding: 0 0.5rem;
			gap: 0.5rem;

			.btn-save {
				background: #4cd137;

				&:hover {
					background: #299718;
				}
			}
			.btn-cancel {
				background: #e74c3c;

				&:hover {
					background: #bb2919;
				}
			}
		}
	}
	button {
		width: 100px;
		height: 35px;
		font-weight: bold;
		color: white;
		border: none;
	}
}
</style>
