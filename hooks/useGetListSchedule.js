import useHandleDate from "./useHandleDate"

export default function useGetListSchedule() {
	
	const GetListSchedule = (scheduleString) => {
		const { formatDatetime} = useHandleDate();
        const listSchedule = scheduleString.split(";")
		let listScheduleFormatted=[]
    	for (var i = 0; i < listSchedule.length;i++){
			var oneSchedule = listSchedule[i].split(",")
			var dateStart = formatDatetime(oneSchedule[0])
			var dateEnd = formatDatetime(oneSchedule[1])
			var hours = `(${dateStart.hours}:${dateStart.minutes}${dateStart.period} - ${dateEnd.hours}:${dateEnd.minutes}${dateEnd.period})`
			var date = `${dateStart.dayName},${dateStart.day} ${dateStart.month} ${dateStart.year}`
			listScheduleFormatted.push({
				date,
				hours
			})
    	}
		return listScheduleFormatted
	};

	return {GetListSchedule};
}
