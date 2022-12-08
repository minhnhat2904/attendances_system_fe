import moment from 'moment'
export function formatDay(date) {
	return moment(date).format('DD-MM-YYYY')
}

export function hoursToDaysAndHours(hour) {
	let days = (hour / 8).toFixed(0);
	let hours = hour % 8;
	console.log(days);
	console.log(hours);
	return days + ' days and ' + hours + ' hours';
}
