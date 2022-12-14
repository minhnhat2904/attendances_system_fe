<script setup>
import { storeToRefs } from 'pinia'
import { formatDay } from '../../helper/helper'
import { useUserStore } from '@/stores/user.js'
import { useCreateRequestStore } from '@/stores/createRequest.js'
import { computed, onMounted, reactive, ref } from 'vue'
import { hoursToDaysAndHours } from '@/helper/helper.js'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useToast } from 'vue-toastification'
const { getProfile } = useUserStore()
const { fetchRequestResult } = useCreateRequestStore()
const { getRequestResultList } = storeToRefs(useCreateRequestStore())
const { getRemainHours } = useUserStore()
const { remainHours, userInfo } = storeToRefs(useUserStore())

onMounted(async () => {
	await getProfile()
	fetchRequestResult('', userInfo.value.id, 3, '', '')
	getRemainHours()
})
const currentSort = ref('createdAt')
const currentSortDir = ref('desc')

const checkbox = ref('')
const entrySelected = ref(25)
const entryOptions = reactive([
	{ text: 10, value: '10' },
	{ text: 25, value: '25' },
	{ text: 50, value: '50' },
	{ text: 100, value: '100' },
])
const typeRequest = ref(0)
const requestTypes = reactive([
	{ text: 'Waiting', value: 0 },
	{ text: 'Approved', value: 1 },
	{ text: 'Rejected', value: 2 },
])

const headers = [
	{
		type: 'dateTime',
		value: 'Created',
		key: 'createdAt',
		id: '',
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
		type: 'Status',
		value: 'Status',
		key: 'status',
	},
]

const dateTime = computed(() => {
	return hoursToDaysAndHours(remainHours.value)
})

const filterWorkingReport = reactive({
	from: '',
	to: '',
})

const rules = computed(() => {
	return {
		from: { required },
		to: { required },
	}
})

const v$ = useVuelidate(rules, filterWorkingReport)

const handleSearch = async () => {
	const toast = useToast()
	const result = await v$.value.$validate()

	if (result) {
		await fetchRequestResult(
			userInfo.value.department,
			'',
			typeRequest.value,
			filterWorkingReport.from,
			filterWorkingReport.to,
			entrySelected.value
		)
	} else {
		toast.error(`${v$.value.$errors[0].$property}-${v$.value.$errors[0].$message}`, {
			timeout: 2000,
		})
	}
}

const handleReset = async () => {
	filterWorkingReport.from = ''
	filterWorkingReport.to = ''
	typeRequest.value = 0
	await fetchRequestResult(
		userInfo.value.department,
		'',
		typeRequest.value,
		filterWorkingReport.from,
		filterWorkingReport.to,
		entrySelected.value
	)
}

const sortTable = header => {
	if (header === currentSort.value) {
		currentSortDir.value = currentSortDir.value === 'asc' ? 'desc' : 'asc'
	}
	currentSort.value = header
}

const sortedList = computed(() => {
	return getRequestResultList.value.sort((a, b) => {
		let modifier = 1
		if (currentSortDir.value === 'desc') modifier = -1
		if (a[currentSort.value] < b[currentSort.value]) return -1 * modifier
		if (a[currentSort.value] > b[currentSort.value]) return 1 * modifier
		return 0
	})
})
</script>
<template>
	<div class="request-history-page">
		<div class="request-history-header">
			<h3 class="request-history-title"><b>Request History</b></h3>
			<span>
				You have <b>{{ dateTime }}</b> of leave
			</span>
		</div>

		<details class="search-area">
			<summary class="search-area-toggle">Search area </summary>

			<div class="search-from">
				<p><b>From</b></p>
				<input
					type="date"
					class="search-area-input"
					v-model="filterWorkingReport.from" />
			</div>
			<div class="search-to">
				<p><b>To</b></p>
				<input
					type="date"
					:min="filterWorkingReport.from"
					class="search-area-input"
					v-model="filterWorkingReport.to" />
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
			<div class="d-flex gap-3 mt-4">
				<button class="btn btn-primary px-4" @click="handleSearch">Search</button>
				<button class="btn btn-danger px-4" @click="handleReset">Reset</button>
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
						@click="sortTable(header.key)"
						class="header-title">
						{{ header.value }}
					</th>
				</tr>
			</thead>
			<tbody class="table-body">
				<tr v-for="item in sortedList" :key="item">
					<td v-for="header in headers" :key="header">
						<span v-if="header.type === 'select'">
							<input type="checkbox" v-model="checkbox" />
						</span>
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
									? 'Waiting'
									: item[header.key] === 1
									? 'Approved'
									: item[header.key] === 2
									? 'Rejected'
									: 'Unknown'
							}}
						</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<style lang="scss" scoped>
.request-history-page {
	padding: 1rem 2rem;
	.search-area {
		.search-to,
		.search-status,
		.action {
			margin-top: 0.5rem;
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
}
</style>
