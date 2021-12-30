import Image from "next/image";
import useFormatDatetime from "../../hooks/useFormatDatetime";
import styles from "../../styles/HomeClassesItem.module.css";

export default function HomeClassesItem({ entries }) {
	const { formatDatetime } = useFormatDatetime();
	const dateStart = formatDatetime(entries.date_start);
	const dateEnd = formatDatetime(entries.date_end);
	return (
		<div
			className={`${styles.item} position-relative d-flex align-items-end text-white text-center rounded m-0`}
		>
			<Image
				src={entries.url_image}
				layout="fill"
				objectFit="cover"
				alt="class"
				className="rounded"
			/>
			<div className={`${styles.overlay} d-flex flex-column w-100 p-2 rounded`}>
				<p className="mb-0 fw-bolder">{entries.name}</p>
				<p className="mb-0">{dateStart.dayName}</p>
				<p className="mb-0">
					{dateStart.hours}:{dateStart.minutes} {dateStart.period} -{" "}
					{dateEnd.hours}:{dateEnd.minutes} {dateEnd.period}
				</p>
			</div>
		</div>
	);
}
