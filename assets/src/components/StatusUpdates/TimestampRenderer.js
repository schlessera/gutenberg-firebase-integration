class TimestampRenderer {
	render ( timestamp ) {
		const date = timestamp.toDate();

		const year  = date.getUTCFullYear();
		const month = date.getUTCMonth();
		const day   = date.getUTCDay();

		const dateString = year + '-'
			+ ((month < 10) ? '0' : '') + month + ':'
			+ ((day < 10) ? '0' : '') + day;

		const hours   = date.getUTCHours();
		const minutes = date.getUTCMinutes();
		const seconds = date.getUTCSeconds();

		const timeString = ((hours < 10) ? '0' : '') + hours + ':'
			+ ((minutes < 10) ? '0' : '') + minutes + ':'
			+ ((seconds < 10) ? '0' : '') + seconds;

		return `${dateString} — ${timeString} UTC`;
	}
}

export default TimestampRenderer;
