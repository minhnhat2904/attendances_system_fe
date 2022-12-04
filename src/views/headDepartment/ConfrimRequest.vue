<script setup>
import { reactive, ref } from 'vue'

const isShowModal = ref(false)
const isConfirm = ref(false)
const reasonForRefusal = ref('')

const headers = reactive([
	{
		type: 'string',
		text: 'Id',
		key: 'id',
	},
	{
		type: 'string',
		value: 'User Name',
		key: 'userName',
	},
	{
		type: 'string',
		value: 'Phone number',
		key: 'phoneNumber',
	},
	{
		type: 'string',
		value: 'Created',
		key: 'createdAt',
	},
	{
		type: 'string',
		value: 'From',
		key: 'startDate',
	},
	{
		type: 'string',
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

const listTable = reactive([
	{
		id: 1,
		userName: 'Name 1',
		phoneNumber: '0987653132',
		createdAt: 'createdAt',
		startDate: 'startDate',
		endDate: 'endDate',
		timeOff: 'timeOff',
		typeOff: 'typeOff',
		reason: 'Examination for military service',
	},
	{
		id: 2,
		userName: 'Name 1',
		phoneNumber: '0987653132',
		createdAt: 'createdAt',
		startDate: 'startDate',
		endDate: 'endDate',
		timeOff: 'timeOff',
		typeOff: 'typeOff',
		reason: 'Examination for military service',
	},
	{
		id: 3,
		userName: 'Name 1',
		phoneNumber: '0987653132',
		createdAt: 'createdAt',
		startDate: 'startDate',
		endDate: 'endDate',
		timeOff: 'timeOff',
		typeOff: 'typeOff',
		reason: 'Examination for military service',
	},
])

const handleShowAcceptRequest = () => {
	isShowModal.value = true
	isConfirm.value = true
}

const handleShowDoesNotAcceptRequest = () => {
	isShowModal.value = true
	isConfirm.value = false
}

const handleAcceptRequest = () => {}

const handleDoesNotAcceptRequest = () => {}

const handleCancel = () => {
	isShowModal.value = false
	isConfirm.value = false
}
</script>
<template>
	<div class="project-manager p-4">
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
				<tr v-for="item in listTable" :key="item">
					<td v-for="header in headers" :key="header">
						<span v-if="header.type === 'string'">{{ item[header.key] }}</span>
						<p v-if="header.type === 'action'" class="d-flex gap-2">
							<button
								type="button"
								class="btn btn-success"
								@click="handleShowAcceptRequest">
								Accept
							</button>
							<button
								type="button"
								class="btn btn-danger"
								@click="handleShowDoesNotAcceptRequest">
								Doesn't Accept
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
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
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
