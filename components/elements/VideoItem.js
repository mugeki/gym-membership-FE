import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/VideoItem.module.css";
import MemberOnlyModal from "./MemberOnlyModal";

export default function VideoItem({ entries }) {
	const user = useSelector((state) => state.user);
	const router = useRouter();
	const [modalShow, setModalShow] = useState(false);
	const videoID = entries.url.split("embed/")[1];
	const thumbnail = `https://img.youtube.com/vi/${videoID}/0.jpg`;
	const onClick = () => {
		if (!user.is_member) {
			setModalShow(true);
		}
	};
	const pathname =
		entries.member_only && !user.is_member ? router.pathname : "/videos/[id]";
	const href =
		entries.member_only && !user.is_member
			? router.pathname
			: `/videos/${entries.id}`;
	return (
		<>
			<Link
				href={{
					pathname: pathname,
					query: {
						...entries,
						videoID,
					},
				}}
				as={href}
				passHref
				scroll={!entries.member_only || !!user.is_member}
			>
				<div
					className={`${styles.item} position-relative d-flex text-white text-center rounded mb-3`}
					onClick={entries.member_only ? () => onClick() : undefined}
				>
					<Image
						src={thumbnail}
						layout="fill"
						objectFit="cover"
						alt="class"
						className="rounded"
					/>
					<div
						className={`${styles.overlay} d-flex flex-column align-items-start justify-content-end h-100 w-100 p-3 rounded`}
					>
						<Icon
							icon="ant-design:play-circle-filled"
							color="white"
							width={"45px"}
							className="position-absolute top-50 start-50 translate-middle"
						/>
						<p
							className="mb-1 bg-secondary px-2 py- rounded-pill shadow-sm"
							hidden={!entries.member_only}
						>
							Member Only
						</p>
						<p className="mb-0 fw-bolder fs-6 text-start text-truncate w-100">
							{entries.title}
						</p>
					</div>
				</div>
			</Link>
			<MemberOnlyModal show={modalShow} onHide={() => setModalShow(false)} />
		</>
	);
}
