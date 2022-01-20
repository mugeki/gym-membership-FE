export default function useHandleDate() {
	const parseDateList = (dateList) => {
		let dateStart, dateEnd;
		let dateArr = [];
		const dates = dateList.split(";");
		for (const date of dates) {
			const currDate = date.split(",");
			const currDateTimestamp = new Date(currDate[0]).getTime();
			const difference = currDateTimestamp - Date.now();
			const isThisWeek = difference >= -86400000 && difference <= 604800000;
			if (isThisWeek) {
				console.log();
				dateStart = currDate[0];
				dateEnd = currDate[1];
				dateArr.push([dateStart, dateEnd]);
			}
		}

		return dateArr;
	};
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
		const day = date.getDate();
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

	return { parseDateList, formatDatetime };
}
