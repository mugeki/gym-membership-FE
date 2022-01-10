//"[2021-12-16T07:00:00.000Z,2021-12-16T09:08:00.000Z],[2021-12-17T07:00:00.000Z,2021-12-17T09:08:00.000Z],[2021-12-18T07:00:00.000Z,2021-12-18T09:08:00.000Z]"
import useFormatDatetime from "./useFormatDatetime";
import React, { useState } from 'react';

export default function useGetDateList() {
	const GetDateList = (listSchedule) => {
        const [scheduleResult, setScheduleResult] = useState([]);
        for (var i = 0; i < listSchedule.length;i++){
			var dateStart = useFormatDatetime(listSchedule[i][0])
			var dateEnd = useFormatDatetime(listSchedule[i][1])
            var schedule = `${dateStart.dayName}, ${dateStart.day}, ${dateStart.month},  , ${dateStart.year} - ${dateEnd.dayName}, ${dateEnd.day}, ${dateEnd.month}, ${dateEnd.year}`
            setScheduleResult(...scheduleList,schedule)
        }
		return {
			scheduleResult
		};
	};

	return { GetDateList };
}
