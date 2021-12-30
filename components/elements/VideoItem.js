import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/VideoItem.module.css";
import MemberOnlyModal from "./MemberOnlyModal";

export default function VideosItem({ entries }) {
	const [modalShow, setModalShow] = useState(false);
	const videoID = entries.url.split("embed/")[1];
	const thumbnail = `https://img.youtube.com/vi/${videoID}/0.jpg`;
	const onClick = (e) => {
		console.log("masuk");
	};
	return (
		<>
			<Link href={`/videos/${videoID}`} passHref>
				<div
					className={`${styles.item} position-relative d-flex align-items-end text-white text-center rounded mb-3`}
					onClick={onClick}
				>
					<Image
						src={thumbnail}
						layout="fill"
						objectFit="cover"
						alt="class"
						className="rounded"
					/>
					<div
						className={`${styles.overlay} d-flex flex-column h-100 w-100 p-3 rounded`}
					>
						<Icon
							icon="ant-design:play-circle-filled"
							color="white"
							width={"50px"}
							className="m-auto"
						/>
						<div className="d-flex justify-content-between w-100">
							<p className="mb-0 fw-bolder fs-6 d-inline-block text-truncate">
								{entries.title}
							</p>
							{entries.member_only && (
								<p
									className="ms-1 mb-0 bg-secondary px-3 py-1 rounded-pill"
									style={{ width: "110px" }}
								>
									Member Only
								</p>
							)}
						</div>
					</div>
				</div>
			</Link>
			<MemberOnlyModal show={modalShow} onHide={() => setModalShow(false)} />
		</>
	);
}
