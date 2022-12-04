import moment from 'moment'
export function formatDay(date) {
	return moment(date).format('DD-MM-YYYY')
}
