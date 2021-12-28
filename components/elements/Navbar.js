import { Icon } from "@iconify/react";
import styles from "../../styles/Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
	return (
		<div
			className={`${styles.container} d-flex justify-content-evenly m-auto py-2 fixed-bottom bg-white`}
		>
			<Link href="/" passHref>
				<div
					className={`${styles.navLink} d-flex flex-column align-items-center`}
				>
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
					<Icon icon="bx:bxs-news" data-align="center" width="20" height="20" />
					<p className={styles.text}>Newsletters</p>
				</div>
			</Link>

			<Link href="/profile" passHref>
				<div
					className={`${styles.navLink} d-flex flex-column align-items-center`}
				>
					<Icon icon="vs:profile" data-align="center" width="20" height="20" />
					<p className={styles.text}>Profile</p>
				</div>
			</Link>
		</div>
	);
}
