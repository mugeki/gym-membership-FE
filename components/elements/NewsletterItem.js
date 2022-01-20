import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import useHandleDate from "../../hooks/useHandleDate";
import styles from "../../styles/NewsletterItem.module.css";
import MemberOnlyModal from "./MemberOnlyModal";

export default function NewsletterItem({ entries }) {
	const user = useSelector((state) => state.user);
	const router = useRouter();
	const [modalShow, setModalShow] = useState(false);
	const { formatDatetime } = useHandleDate();
	const date = formatDatetime(entries.created_at);
	const onClick = () => {
		if (!user.is_member) {
			setModalShow(true);
		}
	};
	const pathname =
		entries.member_only && !user.is_member
			? router.pathname
			: "/newsletters/[id]";
	const href =
		entries.member_only && !user.is_member
			? router.pathname
			: `/newsletters/${entries.id}`;
	return (
		<>
			<Link
				href={{
					pathname: pathname,
					query: { ...entries },
				}}
				as={href}
				passHref
				scroll={!entries.member_only || !!user.is_member}
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
						<p
							className="mb-1 bg-secondary px-2 py- rounded-pill shadow-sm"
							hidden={!entries.member_only}
						>
							Member Only
						</p>
						<p className="mb-0 fw-bolder fs-6 text-start text-truncate w-100">
							{entries.title}
						</p>
						<p className="mb-0">
							{date.day} {date.month} {date.year}
						</p>
					</div>
				</div>
			</Link>
			<MemberOnlyModal show={modalShow} onHide={() => setModalShow(false)} />
		</>
	);
}
