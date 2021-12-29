import Image from "next/image";
import Link from "next/link";
import useFormatDatetime from "../../hooks/useFormatDatetime";
import styles from "../../styles/NewsletterItem.module.css";

export default function NewsletterItem({ entries }) {
	const { formatDatetime } = useFormatDatetime();
	const date = formatDatetime(entries.created_at);
	return (
		<Link href={`/newsletters/${entries.id}`} passHref>
			<div
				className={`${styles.item} position-relative d-flex align-items-end text-white text-center rounded mb-3`}
			>
				<Image
					src={entries.url_image}
					layout="fill"
					objectFit="cover"
					alt="class"
					className="rounded"
				/>
				<div
					className={`${styles.overlay} d-flex flex-column align-items-start w-100 p-3 rounded`}
				>
					<p className="mb-0 fw-bolder fs-6">{entries.title}</p>
					<p className="mb-0">
						{date.day} {date.month} {date.year}
					</p>
				</div>
			</div>
		</Link>
	);
}
