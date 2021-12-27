export default function useFormatDatetime() {
	const formatDatetime = (datetime) => {
		const days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		const date = new Date(datetime);
		const day = date.getDay();
		const month = months[date.getMonth()];
		const year = date.getFullYear();
		const dayName = days[date.getDay()];
		const hours = date.getHours();
		const hoursFormatted = hours % 12 || 12;
		const minutes = date.getMinutes().toString();
		const minutesFormatted = minutes < 10 ? minutes.padStart(2, "0") : minutes;
		const period = hours < 12 ? "AM" : "PM";

		return {
			minutes: minutesFormatted,
			hours: hoursFormatted,
			period,
			dayName,
			day,
			month,
			year,
		};
	};

	return { formatDatetime };
}
