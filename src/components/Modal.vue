<script setup>
import { reactive } from '@vue/reactivity'

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

const TABLE_REPORT_HEADER = reactive([
	{
		id: 1,
		type: 'date',
		value: 'Day report',
	},
	{
		id: 2,
		type: 'select',
		value: 'Project in charge',
	},
	{
		id: 3,
		type: 'select',
		value: 'Type of work',
	},
	{
		id: 4,
		type: 'input',
		value: 'Ticket',
	},
	{
		id: 5,
		type: 'select',
		value: 'Task',
	},
	{
		id: 6,
		type: 'select',
		value: 'TaskType',
	},
	{
		id: 7,
		type: 'input',
		value: 'hours',
	},
	{
		id: 8,
		type: 'input',
		value: 'Note',
	},
	{
		id: 9,
		type: 'action',
		value: 'Note',
	},
])

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
				<div>
					<table id="tableComponent" class="table table-bordered table-striped">
						<tr>
							<th v-for="header in TABLE_REPORT_HEADER" :key="header.id">
								{{ header.value }}
							</th>
						</tr>
						<tr v-for="item in data" :key="item.id">
							<td v-for="header in TABLE_REPORT_HEADER" :key="header.id">
								<span v-if="header.type === 'date'">
									<input type="date" />
								</span>
								<span v-if="header.type === 'input'"> <input type="text" /> </span>
								<span v-if="header.type === 'select'">
									<select id="">
										<option
											v-for="(hour, index) in hoursOfLeave"
											:key="index"
											:value="hour.value">
											{{ hour.text }}
										</option>
									</select>
								</span>
								<span
									v-if="header.type === 'action'"
									class="material-symbols-outlined">
									delete
								</span>
							</td>
						</tr>
					</table>
				</div>
				<div class="action">
					<button>+ Add</button>
				</div>
			</div>
			<div class="footer">
				<button class="btn-save" @click="emit('handleSaveWorkingReport')"
					>Save</button
				>
				<button class="btn-cancel" @click="emit('handleCancel')">Cancel</button>
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
		width: 1200px;
		min-height: 320px;
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
			height: calc(320px - 100px);
			display: flex;
			flex-direction: column;
			justify-content: start;
			padding: 1rem 2rem;

			.action {
				button {
					background: #337ab7;

					&:hover {
						background: #104b80;
					}

					&:active {
						background: #053660;
					}
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
