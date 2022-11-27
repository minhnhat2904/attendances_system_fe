<script setup>
import { useUserStore } from '@/stores/user.js'
import { useAttendanceStore } from '@/stores/attendances.js'
import { storeToRefs } from 'pinia'
import { reactive, ref, onMounted } from 'vue'
import Modal from '@/components/Modal.vue'

const { get } = useAttendanceStore()

onMounted(() => {
	get()
})

const user = useUserStore()
const { workDays } = storeToRefs(useAttendanceStore())
const entryOptions = reactive([
	{ text: 10, value: '10' },
	{ text: 25, value: '25' },
	{ text: 50, value: '50' },
	{ text: 100, value: '100' },
])
const entrySelected = ref(25)
const fields = [
	{
		type: 'string',
		value: 'Report date',
		id: '',
	},
	{
		type: 'string',
		value: 'Employee',
	},
	{
		type: 'string',
		value: 'Project',
	},
	{
		type: 'string',
		value: 'Ticket',
	},
	{
		type: 'string',
		value: 'Task',
	},
	{
		type: 'string',
		value: 'Task type',
	},
	{
		type: 'string',
		value: 'Hour',
	},
	{
		type: 'string',
		value: 'Note',
	},
	{
		type: 'action',
		value: 'action',
	},
]

const isShowModal = ref(false)

const handleCreate = () => {
	isShowModal.value = true
}

const handleCancel = () => {
	isShowModal.value = false
}
</script>
<template>
	<div class="working-report-page">
		<h3>Working time report</h3>
		<details class="search-area">
			<summary class="search-area-toggle">Search area </summary>

			<div class="search-from">
				<p><b>From</b></p>
				<input type="date" class="search-area-input" />
			</div>
			<div class="search-to">
				<p><b>To</b></p>
				<input type="date" class="search-area-input" />
			</div>
			<div class="search-status">
				<p><b>Status</b></p>
				<select name="requestType" id="requestTypeId" v-model="typeRequest">
					<option
						v-for="(type, index) in requestTypes"
						:key="index"
						:value="type.value">
						{{ type.text }}
					</option>
				</select>
			</div>
			<div class="action">
				<button class="action-search" @click="handleSearch">Search</button>
				<button class="action-reset" @click="handleReset">Reset</button>
			</div>
		</details>

		<button class="btn-create" @click="handleCreate">Create Report</button>

		<div class="show-list">
			<span> Show </span>
			<select
				name="requestHistoryTable_length"
				id="reqeustHistoryTableId"
				v-model="entrySelected">
				<option
					v-for="(entry, index) in entryOptions"
					:key="index"
					:value="entry.value">
					{{ entry.text }}
				</option>
			</select>
			<span> entries </span>
		</div>
		<table id="tableComponent" class="table table-bordered table-striped">
			<thead>
				<tr>
					<th v-for="field in fields" :key="field" class="header-title">
						{{ field.value }}
					</th>
				</tr>
			</thead>
			<tbody class="table-body">
				<tr v-for="item in workDays" :key="item">
					<td v-for="field in fields" :key="field">
						<span v-if="field.type === 'string'">{{ item[field.value] }}</span>
						<span v-if="field.type === 'action'">
							<span
								class="material-symbols-outlined btn-edit"
								@click="handleEdit(item)">
								edit
							</span>

							<span
								class="material-symbols-outlined btn-delete"
								@click="handleDelete(item.id)">
								delete
							</span>
						</span>
					</td>
				</tr>
			</tbody>
		</table>

		<Modal
			:show="isShowModal"
			@handleCancel="handleCancel"
			@handleSaveWorkingReport="handleSaveWorkingReport" />
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
}
</style>
