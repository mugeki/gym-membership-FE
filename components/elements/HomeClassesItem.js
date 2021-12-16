import Image from "next/image";
import styles from "../../styles/HomeClassesItem.module.css";

export default function HomeClassesItem({ entries }) {
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const date = new Date(entries.date);
	const dayName = days[date.getDay()];
	const hours = date.getHours();
	const hoursFormatted = hours % 12 || 12;
	const minutes = date.getMinutes().toString();
	const minutesFormatted = minutes < 10 ? minutes.padStart(2, "0") : minutes;
	const amOrPm = hours < 12 ? "AM" : "PM";

	return (
		<div
			className={`${styles.item} position-relative d-flex align-items-end text-white text-center rounded m-0`}
		>
			<Image
				src={entries.url_image}
				layout="fill"
				objectFit="cover"
				alt="class"
			/>
			<div className={`${styles.overlay} d-flex flex-column w-100 p-2`}>
				<p className="mb-0 fw-bolder">{entries.name}</p>
				<p className="mb-0">{dayName}</p>
				<p className="mb-0">
					{hoursFormatted}:{minutesFormatted} {amOrPm}
				</p>
			</div>
		</div>
	);
}
