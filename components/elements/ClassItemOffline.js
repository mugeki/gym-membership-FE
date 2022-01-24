import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/ClassItem.module.css";

export default function ClassItem({ entries }) {
	const classID = entries.id;
	const dataByID = JSON.stringify(entries);
	const href = `/classes/offline/${entries.id}`;

	return (
		<>
			<Link
				href={{
					pathname: href,
					query: {
						classID: classID,
						dataByID: dataByID,
					},
				}}
				as={`/classes/offline/${entries.id}`}
				passHref
			>
				<div
					className={`${styles.item} position-relative d-flex align-items-end text-white text-center rounded mb-3 shadow-sm`}
					onClick={entries.member_only ? () => onClick() : undefined}
				>
					<Image
						src={entries.url_image}
						layout="fill"
						objectFit="cover"
						alt="class"
						className="rounded"
					/>
					<div
						className={`${styles.overlay} d-flex flex-column align-items-start justify-content-end h-100 w-100 p-3 rounded`}
					>
						<p className="mb-0 fw-bolder fs-6 text-start text-truncate w-100">
							{entries.name}
						</p>
						<p className="mb-0 text-start text-truncate w-100">
							{entries.description}
						</p>
					</div>
				</div>
			</Link>
		</>
	);
}
