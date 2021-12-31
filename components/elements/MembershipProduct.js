import Image from "next/image";
import styles from "../../styles/MembershipProduct.module.css";

export default function MembershipProduct({ entries }) {
	return (
		<div
			className={`${styles.item} position-relative d-flex align-items-end text-white text-center rounded my-2`}
		>
			<Image
				src={entries.url_image}
				layout="fill"
				objectFit="cover"
				alt="class"
				className="rounded"
			/>
			<div
				className={`${styles.overlay} d-flex flex-column align-items-start w-100 h-100 p-3 rounded`}
			>
				<h5 className="mb-0 fw-bolder">{entries.name}</h5>
				<h6 className="mb-0 fw-normal">
					Rp{entries.price.toLocaleString().replace(/,/g, ".")}
				</h6>
			</div>
		</div>
	);
}
