<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCreateRequestStore } from '@/stores/createRequest.js'
import { useUserStore } from '@/stores/user.js'
import { hoursToDaysAndHours } from '@/helper/helper.js'
import { useVuelidate } from '@vuelidate/core'
import { required, numeric, minLength, maxValue } from '@vuelidate/validators'
import { useToast } from 'vue-toastification'

const { getRemainHours } = useUserStore()
const { remainHours } = storeToRefs(useUserStore())

const { createRequestOff } = useCreateRequestStore()

onMounted(async () => {
	if (localStorage.getItem('token')) {
		getRemainHours()
	}
})

const leave = reactive({
	offDays: 0,
	offHours: 0,
	periodFrom: new Date().toISOString().slice(0, 10),
	periodTo: new Date().toISOString().slice(0, 10),
	typeOffSelected: 1,
	hourFromSelected: '08',
	minuteFromSelected: '00',
	hourToSelected: '17',
	minuteToSelected: '00',
	reasonSelected: 5,
	reasonDetail: '',
})

const rules = computed(() => {
	return {
		offDays: {
			required,
			numeric,
			maxValue: maxValue(15),
		},
		offHours: {
			required,
			numeric,
			maxValue: maxValue(8),
		},
		periodFrom: { required },
		periodTo: { required, minValue: maxValue(leave.periodFrom) },
		typeOffSelected: { required },
		hourFromSelected: { required },
		minuteFromSelected: { required },
		hourToSelected: { required },
		minuteToSelected: { required },
		reasonSelected: { required },
		reasonDetail: { required, minLength: minLength(12) },
	}
})

const v$ = useVuelidate(rules, leave)

const hoursOfLeave = reactive([
	{ text: '0', value: 0 },
	{ text: '0.5', value: 0.5 },
	{ text: '1', value: 1 },
	{ text: '1.5', value: 1.5 },
	{ text: '2', value: 2 },
	{ text: '2.5', value: 2.5 },
	{ text: '3', value: 3 },
	{ text: '3.5', value: 3.5 },
	{ text: '4', value: 4 },
	{ text: '4.5', value: 4.5 },
	{ text: '5', value: 5 },
	{ text: '5.5', value: 5.5 },
	{ text: '6', value: 6 },
	{ text: '6.5', value: 6.5 },
	{ text: '7', value: 7 },
	{ text: '7.5', value: 7.5 },
])

const hourOptions = reactive([
	{ text: 8, value: '08' },
	{ text: 9, value: '09' },
	{ text: 10, value: '10' },
	{ text: 11, value: '11' },
	{ text: 12, value: '12' },
	{ text: 13, value: '13' },
	{ text: 14, value: '14' },
	{ text: 15, value: '15' },
	{ text: 16, value: '16' },
	{ text: 17, value: '17' },
])
const minuteOptions = reactive([
	{ text: '00', value: '00' },
	{ text: '05', value: '05' },
	{ text: '10', value: '10' },
	{ text: '15', value: '15' },
	{ text: '20', value: '20' },
	{ text: '25', value: '25' },
	{ text: '30', value: '30' },
	{ text: '35', value: '35' },
	{ text: '40', value: '40' },
	{ text: '45', value: '45' },
	{ text: '50', value: '50' },
	{ text: '55', value: '55' },
])
const typeOff = reactive([
	{ text: 'Annual leave', value: 'Annual leave' },
	{ text: 'Unpaid leave', value: 'Unpaid leave' },
	{ text: 'Paid personal leave', value: 'Paid personal leave' },
	{ text: 'Insurance Leave', value: 'Insurance Leave' },
])
const reasonOff = reactive([
	{ text: 'Sick', value: 'Sick' },
	{ text: 'Vacation', value: 'Vacation' },
	{ text: 'Personal Reason', value: 'Personal Reason' },
	{ text: 'Other Reason', value: 'Other Reason' },
])
const dateTime = computed(() => {
	return hoursToDaysAndHours(remainHours.value)
})

const handleSendRequest = async () => {
	const toast = useToast()
	const result = await v$.value.$validate()

	if (result) {
		const data = {
			startDate:
				leave.periodFrom +
				' ' +
				leave.hourFromSelected +
				':' +
				leave.minuteFromSelected +
				':00',
			endDate:
				leave.periodTo +
				' ' +
				leave.hourToSelected +
				':' +
				leave.minuteToSelected +
				':00',
			amountDay: leave.offDays,
			amountHour: leave.offHours,
			typeOff: leave.typeOffSelected,
			reason: leave.reasonSelected,
			reasonDetail: leave.reasonDetail,
			status: 0,
			receiver: 'Dept1',
		}
		const response = await createRequestOff(data)

		if (response.data.status === true) {
			getRemainHours()
			handleResetRequest()
		}
	} else {
		toast.error(`${v$.value.$errors[0].$property}-${v$.value.$errors[0].$message}`, {
			timeout: 2000,
		})
	}
}
const handleResetRequest = () => {
	leave.offDays = ''
	leave.offHours = ''
	;(leave.periodFrom = new Date().toISOString().slice(0, 10)),
		(leave.periodTo = new Date().toISOString().slice(0, 10)),
		(leave.typeOffSelected = 1)
	leave.hourFromSelected = '08'
	leave.minuteFromSelected = '00'
	leave.hourToSelected = '17'
	leave.minuteToSelected = '00'
	leave.reasonSelected = '00'
	leave.reasonDetail = ''
}
</script>

<template>
	<div class="request">
		<div class="request-header">
			<h3 class="request-header-title"><b>Create request</b></h3>
			<span class="request-header-desc">
				You have <b>{{ dateTime }}</b> of leave
			</span>
		</div>
		<div class="request-body">
			<div class="time-off">
				<span><b>Time off</b></span>
				<div class="time-off-input">
					<span>Date</span>
					<input type="number" maxlength="2" v-model="leave.offDays" />
					<span>Hours</span>
					<select id="hoursOfLeave" v-model="leave.offHours">
						<option
							v-for="(hour, index) in hoursOfLeave"
							:key="index"
							:value="hour.value">
							{{ hour.text }}
						</option>
					</select>
				</div>
			</div>

			<div class="period-from">
				<span><b>Period from</b></span>
				<div class="period-input">
					<input type="date" v-model="leave.periodFrom" />
					<div>
						<span><b>Hour</b></span>
						<select name="hourFrom" id="hourFromId" v-model="leave.hourFromSelected">
							<option
								v-for="(hour, index) in hourOptions"
								:key="index"
								:value="hour.value">
								{{ hour.text }}
							</option>
						</select>
						<span>:</span>
						<select
							name="minuteFrom"
							id="minuteFromId"
							v-model="leave.minuteFromSelected">
							<option
								v-for="(minute, index) in minuteOptions"
								:key="index"
								:value="minute.value">
								{{ minute.text }}
							</option>
						</select>
					</div>
				</div>
			</div>

			<div class="period-to">
				<span><b>Period to</b></span>
				<div class="period-input">
					<input type="date" v-model="leave.periodTo" />
					<div>
						<span><b>Hour</b></span>
						<select name="hourTo" id="hourToId" v-model="leave.hourToSelected">
							<option
								v-for="(hour, index) in hourOptions"
								:key="index"
								:value="hour.value">
								{{ hour.text }}
							</option>
						</select>
						<span>:</span>
						<select name="minuteTo" id="minuteToId" v-model="leave.minuteToSelected">
							<option
								v-for="(minute, index) in minuteOptions"
								:key="index"
								:value="minute.value">
								{{ minute.text }}
							</option>
						</select>
					</div>
				</div>
			</div>

			<div class="type-off">
				<span><b>Type off</b></span>
				<select
					name="dayOffType"
					id="id_dayOffType"
					v-model="leave.typeOffSelected"
					class="w-50">
					<option
						v-for="(typeOff, index) in typeOff"
						:key="index"
						:value="typeOff.value">
						{{ typeOff.text }}
					</option>
				</select>
			</div>

			<div class="reason">
				<span><b>Reason</b></span>
				<select
					name="reasonType"
					id="id_reasonType"
					v-model="leave.reasonSelected"
					class="w-50">
					<option
						v-for="(reason, index) in reasonOff"
						:key="index"
						:value="reason.value">
						{{ reason.text }}
					</option>
				</select>
			</div>

			<div class="reason-detail">
				<span><b>Reason details</b></span>
				<input type="textarea" v-model="leave.reasonDetail" class="w-50" />
			</div>

			<div class="mt-3 d-flex gap-3">
				<button class="btn btn-success px-4" @click="handleSendRequest">
					Create
				</button>
				<button type="button" class="btn btn-danger px-4" @click="handleResetRequest"
					>Reset</button
				>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.request {
	padding: 1rem 2rem;
	&-header {
	}

	.time-off {
		&-input {
			display: flex;
			gap: 0.5rem;
			align-items: center;
		}

		span {
			font-weight: 600;
		}

		input,
		select {
			width: 100px;
		}
	}

	.period-from,
	.period-to {
		margin-top: 0.5rem;
		input {
			width: 250px;
		}
		select {
			width: 100px;
		}

		.period-input {
			display: flex;
			gap: 1rem;

			span {
				margin: 0 0.5rem;
			}
		}
	}

	.type-off,
	.reason,
	.reason-detail,
	.receiver {
		margin-top: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	input,
	select {
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
