import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/VideoItem.module.css";

export default function VideosItem({ entries }) {
	const videoID = entries.url.split("embed/")[1];
	const thumbnail = `https://img.youtube.com/vi/${videoID}/0.jpg`;
	return (
		<div
			className={`${styles.item} position-relative d-flex align-items-end text-white text-center rounded mb-3`}
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
							className="mb-0 bg-secondary px-3 py-1 rounded-pill"
							style={{ width: "105px" }}
						>
							Member Only
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
