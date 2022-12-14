<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { useAdminStore } from '@/stores/admin.js'
import { storeToRefs } from 'pinia'

const { fetchUserForAccountancy, fetchDeparments } = useAdminStore()

const { listUserForAccountancy, departments } = storeToRefs(useAdminStore())

onMounted(async () => {
	fetchUserForAccountancy()
	fetchDeparments()
})

const department = ref('')

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
		text: 'Hours off annual',
		key: 'hours_off_annual',
	},
	{
		type: 'string',
		text: 'Hours off unpaid',
		key: 'hours_off_unpaid',
	},
])

const username = ref('')
</script>

<template>
	<div class="create-qr p-4">
		<h5>Search with condition</h5>
		<div class="mt-3 d-flex gap-2">
			<span><b>Username:</b></span>
			<input type="text" v-model="username" />
			<span><b>Department</b></span>
			<select v-model="department">
				<option
					v-for="department in departments"
					:key="department.name"
					:value="department.id">
					{{ department.name }}
				</option>
			</select>
		</div>
		<div class="m-3">
			<button
				class="btn btn-primary px-4"
				@click="
					fetchUserForAccountancy({ department: department, username: username })
				">
				Search
			</button>
		</div>
		<table id="tableComponent" class="table table-bordered table-striped">
			<thead>
				<tr>
					<th
						v-for="header in headers"
						@click="sortTable(header.key)"
						:key="header"
						class="header-title text-center">
						{{ header.text }}
					</th>
				</tr>
			</thead>
			<tbody class="table-body">
				<tr
					v-for="item in listUserForAccountancy"
					:key="item"
					class="table-body py-1 px-2">
					<td v-for="header in headers" :key="header">
						<span v-if="header.type === 'string'">{{ item[header.key] }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<style lang="scss" scoped>
input,
select {
	width: 300px;
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
</style>
