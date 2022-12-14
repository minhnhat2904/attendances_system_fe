<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { useCreateRequestStore } from '@/stores/createRequest.js'
import { formatDay } from '../../helper/helper'
import { storeToRefs } from 'pinia';


const isShowModal = ref(false)
const isConfirm = ref(false)
const reasonForRefusal = ref('')
const { getProfile } = useUserStore()
const { fetchRequestResult, updateRequestOff } = useCreateRequestStore()
const { userInfo } = storeToRefs(useUserStore())
const { requestResultList } = storeToRefs(useCreateRequestStore())

const entrySelected = ref(25)
const entryOptions = reactive([
	{ text: 10, value: '10' },
	{ text: 25, value: '25' },
	{ text: 50, value: '50' },
	{ text: 100, value: '100' },
])

onMounted(async () => {
	await getProfile()
	fetchRequestResult(userInfo.value.department)
})

const from = ref('');
const to = ref('');

const idLeave = ref();
const typeRequest = ref(0)
const requestTypes = reactive([
	{ text: 'Waiting', value: 0 },
	{ text: 'Approved', value: 1 },
	{ text: 'Rejected', value: 2 },
])

const headers = reactive([
	{
		type: 'string',
		value: 'User Name',
		key: 'username',
	},
	{
		type: 'dateTime',
		value: 'Created',
		key: 'createdAt',
	},
	{
		type: 'dateTime',
		value: 'From',
		key: 'startDate',
	},
	{
		type: 'dateTime',
		value: 'To',
		key: 'endDate',
	},
	{
		type: 'string',
		value: 'Time Off',
		key: 'timeOff',
	},
	{
		type: 'string',
		value: 'Type Off',
		key: 'typeOff',
	},
	{
		type: 'string',
		value: 'Reason',
		key: 'reason',
	},
	{
		type: 'action',
		text: 'Action',
		key: 'action',
	},
])

const handleShowAcceptRequest = (id) => {
	idLeave.value = id;
	isShowModal.value = true
	isConfirm.value = true
}

const handleShowDoesNotAcceptRequest = (id) => {
	idLeave.value = id;
	isShowModal.value = true
	isConfirm.value = false
}

const handleAcceptRequest = async () => {
	const requestBody = {
		status: 1,
	}
	const response = await updateRequestOff(requestBody, idLeave.value);
	fetchRequestResult(userInfo.value.department, '', 1)
	isShowModal.value = false
	isConfirm.value = false
}

const handleDoesNotAcceptRequest = async () => {
	const requestBody = {
		status: 2,

	}
	const response = await updateRequestOff(requestBody, idLeave.value);
	fetchRequestResult(userInfo.value.department,'',2)
	isShowModal.value = false
	isConfirm.value = false
}

const handleCancel = () => {
	isShowModal.value = false
	isConfirm.value = false
}

const handleSearch = async () => {
	fetchRequestResult(userInfo.value.department, '', typeRequest.value, from.value, to.value, entrySelected.value);
}
</script>
<template>
	<div class="project-manager p-4">
		<div class="request-history-header">
			<h2 class="request-history-title">Request History</h2>
		</div>

		<details class="search-area">
			<summary class="search-area-toggle">Search area </summary>

			<div class="search-from">
				<p><b>From</b></p>
				<input type="date" class="search-area-input" v-model="from"/>
			</div>
			<div class="search-to">
				<p><b>To</b></p>
				<input type="date" class="search-area-input" v-model="to"/>
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
					<th
						v-for="header in headers"
						:key="header"
						@click="sortTable(header)"
						class="header-title text-center">
						{{ header.value }}
					</th>
				</tr>
			</thead>
			<tbody class="table-body">
				<tr v-for="item in requestResultList" :key="item">
					<td v-for="header in headers" :key="header">
						<span v-if="header.type === 'string'">{{ item[header.key] }}</span>
						<span v-if="header.key === 'timeOff'">
							{{
								!item.amountDay
									? '0d 0h'
									: item.amountDay + 'd' + ' ' + item.amountHour + 'h'
							}}
						</span>
						<span v-if="header.type === 'dateTime'">
							{{ formatDay(item[header.key]) }}
						</span>
						<span v-if="header.type === 'Status'">
							{{
								item[header.key] === 0
									? 'Not approved yet'
									: item[header.key] === 1
									? 'Approved'
									: item[header.key] === 2
									? 'Does not accept'
									: 'Unknown'
							}}
						</span>
						<p v-if="header.type === 'action'" class="d-flex gap-2">
							<button
								type="button"
								class="btn btn-success"
								:disabled="item.status != 0"
								@click="handleShowAcceptRequest(item.id)">
								Accept
							</button>
							<button
								type="button"
								class="btn btn-danger"
								:disabled="item.status != 0"
								@click="handleShowDoesNotAcceptRequest(item.id)">
								Unaccept
							</button>
						</p>
					</td>
				</tr>
			</tbody>
		</table>
		<div
			class="modal-form d-flex justify-content-center align-items-center"
			v-if="isShowModal">
			<div class="modal-box d-flex justify-content-between">
				<div class="header d-flex justify-content-end align-items-center">
					<span class="material-symbols-outlined icon-close" @click="handleCancel">
						close
					</span>
				</div>
				<div class="body d-flex justify-content-start">
					<div v-if="isConfirm">
						<span>Accept request</span>
					</div>
					<div v-else class="d-flex flex-column">
						<p>Reason for refusal</p>
						<input type="text" v-model="reasonForRefusal" />
					</div>
				</div>

				<div class="footer">
					<button
						type="button"
						class="btn btn-outline-success"
						@click="handleAcceptRequest"
						v-if="isConfirm">
						Accept
					</button>
					<button
						type="button"
						class="btn btn-outline-success"
						@click="handleDoesNotAcceptRequest"
						v-else>
						Confrim
					</button>
					<button type="button" class="btn btn-outline-danger" @click="handleCancel">
						Cancel
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.project-manager {
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
	.table {
		width: 100%;

		.header-title {
			font-weight: bold;
			color: white;
			background: #337ab7;
		}

		&-body {
			tr td:first-child,
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
	p {
		margin-bottom: 0;
		font-weight: bold;
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

	.modal-form {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.271);
		z-index: 999;
		.modal-box {
			width: 500px;
			min-height: 200px;
			background: white;
			flex-direction: column;

			.header {
				height: 50px;
				width: 100%;
				border-bottom: 1px solid grey;
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
				display: flex;
				flex-direction: column;
				justify-content: start;
				padding: 1rem 2rem;
				gap: 1rem;
			}

			input {
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
}
</style>
