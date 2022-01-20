import { Icon } from "@iconify/react";
import styles from "../../styles/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
	const router = useRouter();
	const path = router.pathname.split("/")[1];
	return (
		<div
			className={`${styles.container} d-flex justify-content-evenly m-auto pb-2 fixed-bottom bg-white`}
		>
			<Link href="/" passHref>
				<div
					className={`${styles.navLink} d-flex flex-column align-items-center`}
				>
					<div
						className={path === "" ? "bg-black mb-2" : "bg-transparent mb-2"}
						style={{ width: "50px", height: "2px" }}
					></div>
					<Icon
						icon="ant-design:home-filled"
						data-align="center"
						width="20"
						height="20"
					/>
					<p className={styles.text}>Home</p>
				</div>
			</Link>

			<Link href="/classes" passHref>
				<div
					className={`${styles.navLink} d-flex flex-column align-items-center`}
				>
					<div
						className={
							path === "classes" ? "bg-black mb-2" : "bg-transparent mb-2"
						}
						style={{ width: "50px", height: "2px" }}
					></div>
					<Icon
						icon="eva:clock-fill"
						data-align="center"
						width="20"
						height="20"
					/>
					<p className={styles.text}>Classes</p>
				</div>
			</Link>

			<Link href="/videos" passHref>
				<div
					className={`${styles.navLink} d-flex flex-column align-items-center`}
				>
					<div
						className={
							path === "videos" ? "bg-black mb-2" : "bg-transparent mb-2"
						}
						style={{ width: "50px", height: "2px" }}
					></div>
					<Icon
						icon="ant-design:play-circle-filled"
						data-align="center"
						width="20"
						height="20"
					/>
					<p className={styles.text}>Videos</p>
				</div>
			</Link>

			<Link href="/newsletters" passHref>
				<div
					className={`${styles.navLink} d-flex flex-column align-items-center`}
				>
					<div
						className={
							path === "newsletters" ? "bg-black mb-2" : "bg-transparent mb-2"
						}
						style={{ width: "50px", height: "2px" }}
					></div>
					<Icon icon="bx:bxs-news" data-align="center" width="20" height="20" />
					<p className={styles.text}>Newsletters</p>
				</div>
			</Link>

			<Link href="/profile" passHref>
				<div
					className={`${styles.navLink} d-flex flex-column align-items-center`}
				>
					<div
						className={
							path === "profile" ? "bg-black mb-2" : "bg-transparent mb-2"
						}
						style={{ width: "50px", height: "2px" }}
					></div>
					<Icon icon="vs:profile" data-align="center" width="20" height="20" />
					<p className={styles.text}>Profile</p>
				</div>
			</Link>
		</div>
	);
}
