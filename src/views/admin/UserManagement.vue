<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { useAdminStore } from '@/stores/admin.js'
import { storeToRefs } from 'pinia'

const {
	fetchUser,
	createUser,
	createUserByUpload,
	updateUser,
	deleteUser,
	fetchDeparments,
} = useAdminStore()

const { listUser, departments } = storeToRefs(useAdminStore())

onMounted(async () => {
	fetchUser()
	fetchDeparments()
})
const file = ref('')

const isEditing = ref(false)

const department = ref('');

const data = reactive({
	id: '',
	username: '',
	name: '',
	password: '',
	phone: '',
	address: '',
	birthday: '',
	role: 'employee',
	department: '',
})

const roleList = reactive([
	{
		value: 'admin',
		text: 'Admin',
	},
	{
		value: 'employee',
		text: 'Employee',
	},
	{
		value: 'hr',
		text: 'Human Resources',
	},
	{
		value: 'accountancy',
		text: 'Accountant',
	},
	{
		value: 'head_department',
		text: 'Head department',
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
		key: 'phone',
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

const handleCreateUser = async () => {
	const requestBody = {
		username: data.username,
		name: data.name,
		password: data.password,
		birthday: data.birthday,
		phone: data.phone,
		address: data.address,
		role: data.role === 'employee' ? ['employee'] : ['employee', data.role],
		department: data.department,
	}

	const response = await createUser(requestBody)
	if (response.data.status === true) {
		fetchUser()
		handleResetInput()
	}
}

const handleCreateUserByUpload = async (event) => {
	file.value = event.target.files[0]
	let formData = new FormData()
	formData.append('file', file.value)
	const response = await createUserByUpload(formData)
	if (response === true) {
		fetchUser()
		handleResetInput()
	}
}

const handleUpdateUser = async () => {
	const requestBody = {
		username: data.username,
		name: data.name,
		phone: data.phone,
		address: data.address,
		role: data.role === 'employee' ? ['employee'] : ['employee', data.role],
		birthday: data.birthday,
		department: data.department,
	}

	const response = await updateUser(requestBody, data.id)
	if (response === true) {
		handleResetInput()
		fetchUser(department.value)
		isEditing.value = false
	}
}

const handleEdit = item => {
	data.id = item.id
	data.username = item.username
	data.name = item.name
	data.password = item.password
	data.phone = item.phone
	data.address = item.address
	data.role = item.role
	data.birthday = item.birthday
	data.department = item.department
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
	data.phone = ''
	data.address = ''
	data.role = 'employee'
	data.birthday = '', 
	data.department = 'Dept1'
}

const handleCancelUpdate = () => {
	handleResetInput()
	isEditing.value = false
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
			<div class="form-input-file d-flex gap-2">
				<input type="file" ref="fileInput" @change="handleCreateUserByUpload($event)" hidden />
				<button
					class="btn-create border-0 py-2 px-3 bg-green btn btn-success"
					@click="$refs.fileInput.click()">
					Create user by upload
				</button>
			</div>
			<h3 v-if="isEditing === false"><p id="create-title">Create User Manual</p></h3>
			<h3 v-else><p id="create-title">Update User</p></h3>
			<div class="form-input d-flex flex-column gap-2">
				<div class="d-flex gap-3">
					<div>
						<p>User name</p>
						<input type="text" v-model="data.username" />
					</div>
					<div v-if="isEditing == false">
						<p>Password</p>
						<input type="text" v-model="data.password" />
					</div>
					<div>
						<p>Phone number</p>
						<input type="text" v-model="data.phone" />
					</div>
					<div>
						<p>Birthday</p>
						<input type="text" v-model="data.birthday" />
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
					<div>
						<p>Department</p>
						<select v-model="data.department">
							<option
								v-for="department in departments"
								:key="department.name"
								:value="department.id">
								{{ department.name }}
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
					v-if="isEditing === false"
					>Reset</button
				>
				<button
					class="btn-reset border-0 py-2 px-3 btn btn-danger"
					@click="handleCancelUpdate"
					v-else
					>Cancle</button
				>
			</div>
		</div>
		<div>
			<br> <br>
			<p>Search with department</p>
			<select v-model="department" @change="fetchUser(department)">
				<option
					v-for="department in departments"
					:key="department.name"
					:value="department.id">
					{{ department.name }}
				</option>
			</select>
			<table class="table-user mt-3">
				<tr>
					<th
						v-for="header in headers"
						@click="sortTable(header.key)"
						:key="header"
						class="header-title py-1 px-2">
						{{ header.text }}
					</th>
				</tr>
				<tr v-for="item in listUser" :key="item" class="table-body py-1 px-2">
					<td v-for="header in headers" :key="header">
						<span v-if="header.type === 'string'">{{ item[header.key] }}</span>
						<p v-if="header.type === 'action'" class="action">
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
			<div v-if="listUser.length == 0" style="text-align:center; border: solid 1px gray; padding: 1rem;">
				<span>No data here...</span>
			</div>
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
			text-align: center;
		}

		.table-body {
			height: 50px;
			td:last-child {
				text-align: center;
			}
			td {
				text-align: center;
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
				span {
					font-size: 13px;
				}
				.action {
					width: auto;
				}
			}

			.btn-edit,
			.btn-delete {
				cursor: pointer;
				font-size: 20px;
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
		margin-bottom: 0px;
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
	#create-title {
		width: 400px;
	}
}
</style>
