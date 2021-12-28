import Link from "next/link";
import { Button } from "react-bootstrap";
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
				{!regexUrl.test(entries.location) && (
					<p className="m-0 text-light">{entries.location}</p>
				)}
			</div>
			{regexUrl.test(entries.location) && (
				<Link href={entries.location} passHref>
					<div
						className="d-flex flex-column align-items-center"
						style={{ cursor: "pointer" }}
					>
						<Icon icon="logos:google-meet" height="40" width="40" />
						<p className="m-0 text-light" style={{ fontSize: "14px" }}>
							Join Meet
						</p>
					</div>
				</Link>
			)}
		</div>
	);
}
