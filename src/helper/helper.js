import moment, { isDate } from 'moment'

export function formatDay(date) {
	return moment(date).add(-7, 'hours').format('DD/MM/YYYY HH:mm')
}

export function hoursToDaysAndHours(hour) {
	let days = (hour / 8).toFixed()
	let hours = hour % 8
	return days + ' days and ' + hours + ' hours'
}
