import { Icon } from "@iconify/react";
import useFormatDatetime from "../../hooks/useFormatDatetime";

export default function ScheduleItem({ entries }) {
	const { formatDatetime } = useFormatDatetime();
	const dateStart = formatDatetime(entries.date_start);
	const dateEnd = formatDatetime(entries.date_end);
	const regexUrl =
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
	return (
		<div className="d-flex justify-content-between align-items-center border-0 border-bottom p-4 py-3">
			<div className="d-flex flex-column">
				<p className="mb-2 fw-bolder text-primary">
					{dateStart.dayName}, {dateStart.day} {dateStart.month}{" "}
					{dateStart.year}
				</p>
				<p className="mb-0">{entries.name}</p>
				<p className="mb-0">
					{dateStart.hours}:{dateStart.minutes} {dateStart.period} -{" "}
					{dateEnd.hours}:{dateEnd.minutes} {dateEnd.period}
				</p>
				{!regexUrl.test(entries.location) ? (
					<p className="m-0 text-light">{entries.location}</p>
				) : (
					<a
						className="text-light"
						href={entries.location}
						target="_blank"
						rel="noopener noreferrer"
					>
						{entries.location}
					</a>
				)}
			</div>
		</div>
	);
}