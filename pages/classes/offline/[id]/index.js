// import axios from "axios";
import NavbarTop from "../../../../components/elements/NavbarTop";
import Layout from "../../../../components/Layout";
import useGetDateList from "../../../../hooks/useGetDateList";
import dataClass from "../../../../mock_data/class_by_id.json";
import { useRouter } from 'next/router'
import React, { useState } from 'react';
import Image from "next/image";
import styles from "../../../../styles/ClassItem.module.css";

// export async function getServerSideProps(context) {
// 	const API_URL = "https://youtube.googleapis.com/youtube/v3/videos";
// 	const API_KEY = process.env.YOUTUBE_API_KEY;
// 	const res = await axios.get(
// 		`${API_URL}?part=snippet&id=${context.query.id}&key=${API_KEY}`
// 	);
// 	const data = await res.data.items[0];
// 	if (!data) {
// 		return {
// 			notFound: true,
// 		};
// 	}
// 	return {
// 		props: { data },
// 	};
// }

export default function ClassById() {
    const { GetDateList } = useGetDateList();
    const listScheduleFormatted = GetDateList(dataClass.data.date)

    const nf = new Intl.NumberFormat('en-US');
    const price = nf.format(dataClass.data.price)
    const router = useRouter()
    const href =`/classes/offline/${dataClass.data.id}/book-class`
	return (
		<Layout>
			<NavbarTop title={"Offline Classes"} />
			<div className="container d-flex flex-column justify-content-center p-4 mb-5">
				<h6 className="fw-bolder mb-0 fs-5">{dataClass.data.name}</h6>
                
                <div className={`${styles.item} mt-3 bg-dark position-relative d-flex align-items-end text-white text-center rounded-3 mb-3`}>
                    <Image
                        src={dataClass.data.url_image}
                        layout="fill"
                        objectFit="cover"
                        alt="class"
                        className={`rounded-3`}
                    />
                </div>
                <div className="d-flex flex-row justify-content-between">
                    <h4 className={`${styles.textPurple} fw-bold`}>{`Rp ${price}`}</h4>
                    <p>{`Available Slot ${dataClass.data.participant}/${dataClass.data.kuota}`}</p>
                </div>
				<div className="d-flex flex-column align-items-start">
                    <p className="fw-bold mb-0">Description</p>
					<p className="fs-smaller">{dataClass.data.desc}</p>
				</div>
                <div className="d-flex flex-column align-items-start">
                    <p className="fw-bold mb-0">Schedule</p>
					{listScheduleFormatted.map(item=>(<p className="m-0 p-0">{item}</p>))}
				</div>
                <div className="d-flex flex-column align-items-start">
                    <p className="fw-bold mb-0 mt-2">Location</p>
					<p className="fs-smaller">{dataClass.data.location}</p>
				</div>
                 <button className={`btn ${styles.button} rounded-3`} onClick={() => router.push(href)} >Book</button>
			</div>
		</Layout>
	);
}