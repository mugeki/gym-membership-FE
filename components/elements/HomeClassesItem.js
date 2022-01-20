import Image from "next/image";
import useHandleDate from "../../hooks/useHandleDate";
import styles from "../../styles/HomeClassesItem.module.css";

export default function HomeClassesItem({ entries }) {
	const { formatDatetime } = useHandleDate();
	const formattedDateStart = formatDatetime(entries.date[0]);
	const formattedDateEnd = formatDatetime(entries.date[1]);
	return (
		<div
			className={`${styles.item} position-relative d-flex align-items-end text-white text-center rounded m-0 shadow`}
		>
			<Image
				src={entries.url_image}
				layout="fill"
				objectFit="cover"
				alt="class"
				className="rounded"
			/>
			<div
				className={`${styles.overlay} d-flex flex-column w-100 p-2 pt-4 rounded`}
			>
				<p className="mb-0 fw-bolder text-truncate">{entries.name}</p>
				<p className="mb-0">
					{formattedDateStart.dayName}, {formattedDateStart.day}
				</p>
				<p className="mb-0">
					{formattedDateStart.hours}:{formattedDateStart.minutes}{" "}
					{formattedDateStart.period} - {formattedDateEnd.hours}:
					{formattedDateEnd.minutes} {formattedDateEnd.period}
				</p>
			</div>
		</div>
	);
}
