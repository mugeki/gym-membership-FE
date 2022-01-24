import { Icon } from "@iconify/react";
import useGetListSchedule from "../../hooks/useGetListSchedule";
import React, { useState } from "react";

export default function ScheduleItem({ entries }) {
	const { GetListSchedule } = useGetListSchedule();
	const listScheduleFormated = GetListSchedule(entries.date);
	const regexUrl =
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
	return (
		<>
			{listScheduleFormated.map((item, i) => (
				<div
					key={i}
					className="d-flex justify-content-between align-items-center border-0 border-bottom p-4 py-3"
				>
					<div className="d-flex flex-column">
						<p className="mb-2 fw-bolder text-primary">{item.date}</p>
						<p className="mb-0 text-capitalize">{entries.name}</p>
						<p className="mb-0">{item.hours}</p>
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
			))}
		</>
	);
}
