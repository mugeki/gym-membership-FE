import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/NewsletterItem.module.css";

export default function NewsletterItem({ entries }) {
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
	const date = new Date(entries.date);
	const day = date.getDay();
	const month = months[date.getMonth()];
	const year = date.getFullYear();
	return (
		<div
			className={`${styles.item} position-relative d-flex align-items-end text-white text-center rounded mb-3`}
		>
			<Image
				src={entries.url_image}
				layout="fill"
				objectFit="cover"
				alt="class"
			/>
			<div
				className={`${styles.overlay} d-flex flex-column align-items-start w-100 p-3`}
			>
				<p className="mb-0 fw-bolder fs-6">{entries.name}</p>
				<p className="mb-0">
					{day} {month} {year}
				</p>
			</div>
		</div>
	);
}
