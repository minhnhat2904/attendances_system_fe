<script setup>
import { computed, reactive, ref } from 'vue'

const headers = reactive([
	{
		type: 'string',
		text: 'Id',
		key: 'id',
	},
	{
		type: 'string',
		text: 'User name',
		key: 'userName',
	},
	{
		type: 'string',
		text: 'Phone Number',
		key: 'phoneNumber',
	},
	{
		type: 'string',
		text: 'address',
		key: 'address',
	},
	{
		type: 'string',
		text: 'From',
		key: 'from',
	},
	{
		type: 'string',
		text: 'To',
		key: 'to',
	},
	{
		type: 'string',
		text: 'Working Hours',
		key: 'workingHours',
	},
])

const tableData = reactive([
	{
		id: 1,
		userName: 'Nhat',
		phoneNumber: '123123123',
		address: 'Da Nang',
		from: '05/10/2022',
		to: '05/11/2022',
		workingHours: '180',
	},
	{
		id: 1,
		userName: 'Nhat',
		phoneNumber: '123123123',
		address: 'Da Nang',
		from: '05/10/2022',
		to: '05/11/2022',
		workingHours: '180',
	},
	{
		id: 1,
		userName: 'Nhat',
		phoneNumber: '123123123',
		address: 'Da Nang',
		from: '05/10/2022',
		to: '05/11/2022',
		workingHours: '180',
	},
	{
		id: 1,
		userName: 'Nhat',
		phoneNumber: '123123123',
		address: 'Da Nang',
		from: '05/10/2022',
		to: '05/11/2022',
		workingHours: '180',
	},
	{
		id: 1,
		userName: 'Nhat',
		phoneNumber: '123123123',
		address: 'Da Nang',
		from: '05/10/2022',
		to: '05/11/2022',
		workingHours: '180',
	},
	{
		id: 1,
		userName: 'Nhat',
		phoneNumber: '123123123',
		address: 'Da Nang',
		from: '05/10/2022',
		to: '05/11/2022',
		workingHours: '180',
	},
	{
		id: 1,
		userName: 'Nhat',
		phoneNumber: '123123123',
		address: 'Da Nang',
		from: '05/10/2022',
		to: '05/11/2022',
		workingHours: '180',
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
	return tableData.sort((a, b) => {
		let modifier = 1
		if (currentSortDir.value === 'desc') modifier = -1
		if (a[currentSort.value] < b[currentSort.value]) return -1 * modifier
		if (a[currentSort.value] > b[currentSort.value]) return 1 * modifier
		return 0
	})
})
</script>

<template>
	<div class="create-qr p-4">
		<table id="tableComponent" class="table table-bordered table-striped">
			<thead>
				<tr>
					<th
						v-for="header in headers"
						:key="header"
						@click="sortTable(header.key)"
						class="header-title text-center">
						{{ header.text }}
					</th>
				</tr>
			</thead>
			<tbody class="table-body">
				<tr v-for="item in sortedList" :key="item">
					<td v-for="header in headers" :key="header">
						<span v-if="header.type === 'string'">{{ item[header.key] }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<style lang="scss" scoped>
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
