import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/ClassItem.module.css";
// import MemberOnlyModal from "./MemberOnlyModal";
import dataMember from "../../mock_data/member_by_userid.json";

export default function ClassItem({ entries }) {
	const classID = entries.id;
	const dataByID=JSON.stringify(entries)
	const href = `/classes/online/${entries.id}`
	return (
		<>
			<Link
				href={{
					pathname: href,
					query: {
						classID: classID,
						dataByID:dataByID,
					},
				}}
				as={`/classes/online/${entries.id}`}
				passHref
				
			>
				<div
					className={`${styles.item} position-relative d-flex align-items-end text-white text-center rounded-3 mb-3`}
				>
					<Image
						src={entries.url_image}
						layout="fill"
						objectFit="cover"
						alt="class"
						className="rounded-3"
					/>

					<p className= {`${styles.overlay}  ms-3 text-start fs-6 text-capitalize`}>
							{entries.name}
					</p>

				</div>
			</Link>
		</>
	);
}