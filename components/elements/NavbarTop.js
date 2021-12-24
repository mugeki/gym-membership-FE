import { Icon } from "@iconify/react";
import styles from "../../styles/NavbarTop.module.css";
import { useRouter } from "next/router";

export default function NavbarTop({ title }) {
	const router = useRouter();
	const onClick = () => router.back();

	return (
		<div
			className={`${styles.container} d-flex align-items-center p-3 bg-white shadow-sm`}
		>
			<span onClick={onClick} style={{ cursor: "pointer" }}>
				<Icon icon="dashicons:arrow-left-alt2" width={25} />
			</span>
			<span className="ms-3">{title}</span>
		</div>
	);
}
