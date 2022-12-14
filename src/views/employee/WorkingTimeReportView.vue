<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { formatDay } from '../../helper/helper'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.js'
import { useAttendanceStore } from '@/stores/attendances.js'
import { useWorkingReportStore } from '@/stores/workingReport.js'

// const { get } = useAttendanceStore()
const { getProfile } = useUserStore()
const {
	createWorkingReport,
	getWorkingReport,
	deleteWorkingReport,
	updateWorkingReport,
} = useWorkingReportStore()

// const { workDays } = storeToRefs(useAttendanceStore())
const { workingReport } = storeToRefs(useWorkingReportStore())
const { userInfo } = storeToRefs(useUserStore())

onMounted(async () => {
	await getProfile()
	getWorkingReport(userInfo.value.id, '', '')
})

const entrySelected = ref(25)
const isShowModal = ref(false)
const isEditMode = ref(false)

const queryParamsWorkingReport = reactive({
	time: '',
	note: '',
	date: new Date().toISOString().slice(0, 10),
	ticket: '',
	workingreportId: '',
	project: '',
	task: '',
})

const entryOptions = reactive([
	{ text: 10, value: '10' },
	{ text: 25, value: '25' },
	{ text: 50, value: '50' },
	{ text: 100, value: '100' },
])
const headers = [
	{
		type: 'string',
		value: 'Report date',
		key: 'date',
		id: '',
	},
	{
		type: 'string',
		value: 'Employee',
		key: 'updatedBy',
	},
	{
		type: 'string',
		value: 'Project',
		key: 'project',
	},
	{
		type: 'string',
		value: 'Ticket',
		key: 'ticket',
	},
	{
		type: 'string',
		key: 'task',
		value: 'Task',
	},
	{
		type: 'string',
		key: 'time',
		value: 'Time',
	},
	{
		type: 'string',
		key: 'note',
		value: 'Note',
	},
	{
		type: 'action',
		value: 'action',
	},
]

const projectOptions = reactive([
	{ text: 'project 1', value: '1' },
	{ text: 'project 2', value: '2' },
	{ text: 'project 3', value: '3' },
])

const taskOptions = reactive([
	{ text: 'Meeting', value: '1' },
	{ text: 'Coding', value: '2' },
	{ text: 'Study', value: '3' },
])

const handleShowModalCreate = () => {
	isShowModal.value = true
}

const handleSaveWorkingReport = async () => {
	const requestBody = {
		date: queryParamsWorkingReport.date,
		project: queryParamsWorkingReport.project,
		ticket: queryParamsWorkingReport.ticket,
		task: queryParamsWorkingReport.task,
		time: queryParamsWorkingReport.time,
		note: queryParamsWorkingReport.note,
	}

	const result = await createWorkingReport(requestBody)

	if (result.data.status === true) {
		clearInput()
		isShowModal.value = false
	}
}

const handleShowModalEdit = async item => {
	queryParamsWorkingReport.date = item.date
	queryParamsWorkingReport.project = item.project
	queryParamsWorkingReport.ticket = item.ticket
	queryParamsWorkingReport.task = item.task
	queryParamsWorkingReport.time = item.time
	queryParamsWorkingReport.note = item.note
	queryParamsWorkingReport.workingreportId = item.id
	isShowModal.value = true
	isEditMode.value = true
}

const handleUpdateWorkingReport = async () => {
	const requestBody = {
		date: queryParamsWorkingReport.date,
		project: queryParamsWorkingReport.project,
		ticket: queryParamsWorkingReport.ticket,
		task: queryParamsWorkingReport.task,
		time: queryParamsWorkingReport.time,
		note: queryParamsWorkingReport.note,
	}

	const result = await updateWorkingReport(
		requestBody,
		queryParamsWorkingReport.workingreportId
	)

	if (result.data.status === true) {
		await getWorkingReport(userInfo.value.id)
		clearInput()
		isEditMode.value = false
		isShowModal.value = false
	}
}

const clearInput = () => {
	queryParamsWorkingReport.date = new Date(null)
	queryParamsWorkingReport.project = '1'
	queryParamsWorkingReport.ticket = ''
	queryParamsWorkingReport.task = '1'
	queryParamsWorkingReport.time = ''
	queryParamsWorkingReport.note = ''
	queryParamsWorkingReport.workingreportId = ''
}

const handleDeleteWorkingReport = async id => {
	const requestBody = {
		ids: [id],
	}
	const result = await deleteWorkingReport(requestBody)
	if (result.data.status === true) {
		await getWorkingReport(userInfo.value.id)
	}
}

const handleCancel = () => {
	isShowModal.value = false
	isEditMode.value = false
	clearInput()
}

const currentSort = ref('createdAt')
const currentSortDir = ref('desc')

const sortTable = header => {
	if (header === currentSort.value) {
		currentSortDir.value = currentSortDir.value === 'asc' ? 'desc' : 'asc'
	}
	currentSort.value = header
}

const sortedList = computed(() => {
	return workingReport.value.sort((a, b) => {
		let modifier = 1
		if (currentSortDir.value === 'desc') modifier = -1
		if (a[currentSort.value] < b[currentSort.value]) return -1 * modifier
		if (a[currentSort.value] > b[currentSort.value]) return 1 * modifier
		return 0
	})
})

const from = ref('');
const to = ref('');

const handleSearch = async () => {
	getWorkingReport(userInfo.value.id, from.value, to.value)
}

const handleReset = async () => {
	from.value = '';
	to.value = '';
	getWorkingReport(userInfo.value.id, '', '')
}
</script>
<template>
	<div class="working-report-page">
		<h3><b>Working time report</b></h3>
		<details class="search-area">
			<summary class="search-area-toggle">Search area </summary>

			<div class="search-from">
				<p><b>From</b></p>
				<input type="date" v-model="from" class="search-area-input" />
			</div>
			<div class="search-to">
				<p><b>To</b></p>
				<input type="date" v-model="to" class="search-area-input" />
			</div>

			<div class="action">
				<button class="action-search" @click="handleSearch">Search</button>
				<button class="action-reset" @click="handleReset">Reset</button>
			</div>
		</details>

		<button class="btn-create" @click="handleShowModalCreate">Create Report</button>

		<div class="show-list">
			<span> Show </span>
			<select
				name="requestHistoryTable_length"
				id="reqeustHistoryTableId"
				v-model="entrySelected">
				<option
					v-for="(entry, index) in entryOptions"
					:key="index"
					:value="entry.text">
					{{ entry.text }}
				</option>
			</select>
			<span> entries </span>
		</div>
		<table id="tableComponent" class="table table-bordered table-striped">
			<thead>
				<tr>
					<th
						v-for="header in headers"
						:key="header"
						@click="sortTable(header.key)"
						class="header-title">
						{{ header.value }}
					</th>
				</tr>
			</thead>
			<tbody class="table-body">
				<tr v-for="item in sortedList" :key="item">
					<td v-for="header in headers" :key="header">
						<span v-if="header.type === 'string'">
							{{
								header.key === 'date'
									? formatDay(item[header.key])
									: item[header.key]
							}}
						</span>
						<span v-if="header.type === 'action'">
							<span
								class="material-symbols-outlined btn-edit"
								@click="handleShowModalEdit(item)">
								edit
							</span>

							<span
								class="material-symbols-outlined btn-delete"
								@click="handleDeleteWorkingReport(item.id)">
								delete
							</span>
						</span>
					</td>
				</tr>
			</tbody>
		</table>

		<div class="modal-form" v-if="isShowModal">
			<div class="modal-box">
				<div class="header">
					<h4 v-if="isEditMode === false">Create Report</h4>
					<h4 v-else>Update Report</h4>
					<span class="material-symbols-outlined icon-close" @click="handleCancel">
						close
					</span>
				</div>
				<div class="body">
					<div class="row-1">
						<div class="date-report">
							<p class="title">Date Report</p>
							<input type="date" v-model="queryParamsWorkingReport.date" />
						</div>
						<div class="project">
							<p class="title">Project in charge</p>
							<select v-model="queryParamsWorkingReport.project">
								<option
									v-for="item in projectOptions"
									:key="item"
									:value="item.text">
									{{ item.text }}
								</option>
							</select>
						</div>
					</div>
					<div class="row-2">
						<div class="ticket">
							<p class="title">Ticket</p>
							<input type="text" v-model="queryParamsWorkingReport.ticket" />
						</div>
						<div class="task">
							<p class="title">Task</p>
							<select v-model="queryParamsWorkingReport.task">
								<option v-for="item in taskOptions" :key="item" :value="item.text">
									{{ item.text }}
								</option>
							</select>
						</div>
					</div>
					<div class="row-3">
						<div class="time">
							<p class="title">Time</p>
							<input type="text" v-model="queryParamsWorkingReport.time" />
						</div>
						<div class="note">
							<p class="title">Note</p>
							<input type="text" v-model="queryParamsWorkingReport.note" />
						</div>
					</div>
				</div>

				<div class="footer">
					<button
						class="btn-save"
						@click="handleSaveWorkingReport"
						v-if="isEditMode === false">
						Save
					</button>
					<button class="btn-save" @click="handleUpdateWorkingReport" v-else>
						Update
					</button>
					<button class="btn-cancel" @click="handleCancel"> Cancel </button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.working-report-page {
	padding: 1rem 2rem;

	.search-area {
		.search-to,
		.search-status,
		.action {
			margin-top: 0.5rem;
		}

		.action {
			display: flex;
			gap: 0.2rem;

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

		input,
		select {
			width: 600px;
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

	.btn-create {
		margin-top: 1rem;
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
	.show-list {
		margin: 1rem 0;
		select {
			width: 100px;
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

	p {
		margin-bottom: 0;
	}
	.table {
		width: 100%;

		.header-title {
			font-weight: bold;
			color: white;
			background: #337ab7;
			cursor: pointer;
		}

		&-body {
			td:last-child {
				text-align: center;
			}

			.btn-edit,
			.btn-delete {
				cursor: pointer;
			}

			.btn-edit {
				color: rgb(69, 69, 220);
				&:hover {
					color: rgb(23, 23, 156);
				}
			}
			.btn-delete {
				color: red;
				&:hover {
					color: rgb(158, 12, 12);
				}
			}
		}
	}

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
			min-height: 300px;
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
				height: calc(300px - 100px);
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
}
</style>
