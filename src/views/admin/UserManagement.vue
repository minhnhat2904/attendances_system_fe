<script setup>
import { reactive, ref, onMounted, computed } from 'vue'

onMounted(async () => {})
const isEditing = ref(false)
const data = reactive({
	username: '',
	name: '',
	password: '',
	phoneNumber: '',
	address: '',
	role: 1,
	department: '',
})

const roleList = reactive([
	{
		value: 1,
		text: 'Admin',
	},
	{
		value: 2,
		text: 'Employeee',
	},
	{
		value: 3,
		text: 'Human Resources',
	},
	{
		value: 4,
		text: 'Accountant',
	},
])

const headers = reactive([
	{
		type: 'string',
		text: 'Name',
		key: 'name',
	},
	{
		type: 'string',
		text: 'User name',
		key: 'username',
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
		text: 'Role',
		key: 'role',
	},
	{
		type: 'action',
		text: 'Action',
	},
])

const listTable = reactive([
	{
		id: 1,
		username: 'user1',
		name: 'name1',
		phoneNumber: '123',
		address: 'abc',
		role: 'Admin',
	},
	{
		id: 2,
		username: 'user2',
		name: 'name2',
		phoneNumber: '123',
		address: 'ab2',
		role: 'Employeee',
	},
	{
		id: 3,
		username: 'user3',
		name: 'name3',
		phoneNumber: '123',
		address: 'abc',
		role: 'Employeee',
	},
])
const handleCreateUser = async () => {
	const requestBody = {
		username: data.username,
		name: data.name,
		password: data.password,
		phoneNumber: data.phoneNumber,
		address: data.address,
		role: data.role,
		department: data.department,
	}

	const response = await createUser()
	if (response === true) {
		handleResetInput()
	}
}

const handleUpdateUser = async () => {
	const requestBody = {
		username: data.username,
		name: data.name,
		password: data.password,
		phoneNumber: data.phoneNumber,
		address: data.address,
		role: data.role,
	}

	const response = await updateUser()
	if (response === true) {
		handleResetInput()
		isEditing.value = false
	}
}

const handleEdit = item => {
	data.username = item.username
	data.name = item.name
	data.password = item.password
	data.phoneNumber = item.phoneNumber
	data.address = item.address
	data.role = item.role
	isEditing.value = true
}

const handleDelete = async id => {
	const response = await deleteUser(id)
	if (response === true) {
		await fetchUser()
	}
}

const handleResetInput = () => {
	data.username = ''
	data.name = ''
	data.password = ''
	data.phoneNumber = ''
	data.address = ''
	data.role = ''
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
	return listTable.sort((a, b) => {
		let modifier = 1
		if (currentSortDir.value === 'desc') modifier = -1
		if (a[currentSort.value] < b[currentSort.value]) return -1 * modifier
		if (a[currentSort.value] > b[currentSort.value]) return 1 * modifier
		return 0
	})
})
</script>
<template>
	<div class="user-manager p-4">
		<div>
			<h3 v-if="isEditing === false"><p>Create User</p></h3>
			<h3 v-else><p>Update User</p></h3>
			<div class="form-input d-flex flex-column gap-2">
				<div class="d-flex gap-3">
					<div>
						<p>User name</p>
						<input type="text" v-model="data.username" />
					</div>
					<div>
						<p>Password</p>
						<input type="text" v-model="data.password" />
					</div>
					<div>
						<p>Phone number</p>
						<input type="number" v-model="data.phoneNumber" />
					</div>
				</div>
				<div class="d-flex gap-3">
					<div>
						<p>Name</p>
						<input type="text" v-model="data.name" />
					</div>
					<div>
						<p>Address</p>
						<input type="text" v-model="data.address" />
					</div>
					<div>
						<p>Role</p>
						<select v-model="data.role">
							<option v-for="role in roleList" :key="role.value" :value="role.value">
								{{ role.text }}
							</option>
						</select>
					</div>
				</div>
			</div>
			<div class="request mt-3 d-flex gap-3">
				<button
					class="btn-create border-0 py-2 px-3 bg-green btn btn-success"
					@click="handleCreateUser"
					v-if="isEditing === false">
					Create user
				</button>
				<button
					class="btn-update border-0 py-2 px-3 btn btn-primary"
					@click="handleUpdateUser"
					v-else>
					Update user
				</button>
				<button
					class="btn-reset border-0 py-2 px-3 btn btn-danger"
					@click="handleResetInput"
					>Reset</button
				>
			</div>
		</div>
		<div>
			<table class="table-user mt-5">
				<tr>
					<th
						v-for="header in headers"
						@click="sortTable(header.key)"
						:key="header"
						class="header-title py-1 px-2">
						{{ header.text }}
					</th>
				</tr>
				<tr v-for="item in sortedList" :key="item" class="table-body py-1 px-2">
					<td v-for="header in headers" :key="header">
						<span v-if="header.type === 'string'">{{ item[header.key] }}</span>
						<p v-if="header.type === 'action'">
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
						</p>
					</td>
				</tr>
			</table>
		</div>
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
