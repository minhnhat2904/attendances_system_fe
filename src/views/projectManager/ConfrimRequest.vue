<script setup>
import { reactive, onMounted } from 'vue'

onMounted(async () => {})
const headers = reactive([
	{
		type: 'string',
		text: 'Name',
		key: 'name',
	},
	{
		type: 'string',
		text: 'User name',
		key: 'userName',
	},
	{
		type: 'string',
		text: 'Phone number',
		key: 'phoneNumber',
	},
	{
		type: 'string',
		text: 'Address',
		key: 'address',
	},
	{
		type: 'string',
		text: 'Reason',
		key: 'reason',
	},
	{
		type: 'action',
		text: 'Action',
	},
])

const listTable = reactive([
	{
		id: 1,
		userName: 'user1',
		name: 'name1',
		phoneNumber: '123',
		reason: 'Im tired',
	},
	{
		id: 2,
		userName: 'user2',
		name: 'name2',
		phoneNumber: '123',
		reason: 'Im tired',
	},
	{
		id: 3,
		userName: 'user3',
		name: 'name3',
		phoneNumber: '123',
		reason: 'Im tired',
	},
])

const handleAcceptRequest = () => {}

const handleCanCelRequest = () => {}
</script>
<template>
	<div class="user-manager p-4">
		<table class="table-user mt-5">
			<tr>
				<th v-for="header in headers" :key="header" class="header-title py-1 px-2">
					{{ header.text }}
				</th>
			</tr>
			<tr v-for="item in listTable" :key="item" class="table-body py-1 px-2">
				<td v-for="header in headers" :key="header">
					<span v-if="header.type === 'string'">{{ item[header.key] }}</span>
					<p v-if="header.type === 'action'">
						<span
							class="material-symbols-outlined btn-edit"
							@click="handleAcceptRequest">
							edit
						</span>
						<span
							class="material-symbols-outlined btn-delete"
							@click="handleCanCelRequest">
							delete
						</span>
					</p>
				</td>
			</tr>
		</table>
	</div>
</template>
<style lang="scss" scoped>
.user-manager {
	.table-user {
		.header-title {
			font-weight: bold;
			border-right: 1px solid white;
			color: white;
			background: #337ab7;
			width: 200px;
			&:last-child {
				border-right: none !important;
			}
		}

		.table-body {
			height: 50px;
			td:last-child {
				text-align: center;
			}
			td {
				padding: 0 1rem;
				border-color: #337ab7;
				border-style: solid none solid solid;
				border-width: 1px 0px 1px 1px;

				&:nth-child(5),
				&:nth-child(4),
				&:nth-child(3) {
					border-left: 0.5px solid #337ab7;
				}
				&:nth-child(6) {
					border-right: 0.5px solid #337ab7;
				}
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
		font-weight: bold;
		width: 200px;
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
</style>
