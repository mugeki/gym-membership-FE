// import axios from "axios";
import NavbarTop from "../../../../components/elements/NavbarTop";
import Layout from "../../../../components/Layout";
import useGetDateList from "../../../../hooks/useGetDateList";
import dataClass from "../../../../mock_data/class_by_id.json";
import { useRouter } from 'next/router'
import React, { useState } from 'react';
import Image from "next/image";
import styles from "../../../../styles/ClassItem.module.css";
// import dataClass from "../../../../mock_data/class_by_id.json";

// export async function getServerSideProps(context){
//     const dataByID=JSON.parse(context.query.dataByID)
//     return {
//         props: {dataByID},
//     }
// }
export default function ClassById({dataaByID}) {
    
    const { GetDateList } = useGetDateList();
    const dataByID= dataClass.data
    const listScheduleFormatted = GetDateList(dataByID.date)

    const nf = new Intl.NumberFormat('en-US');
    const price = nf.format(dataByID.price)
    const router = useRouter()
    const href =`/classes/offline/${dataByID.id}/book-class`
    const regexUrl =
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
	return (
		<Layout>
			<NavbarTop title={"Offline Classes"} />
			<div className="container d-flex flex-column justify-content-center p-4 mb-5">
				<h6 className="fw-bolder mb-0 fs-5 text-capitalize">{dataByID.name}</h6>
                
                <div className={`${styles.item} mt-3 bg-dark position-relative d-flex align-items-end text-white text-center rounded-3 mb-3`}>
                    <Image
                        src={dataByID.url_image}
                        layout="fill"
                        objectFit="cover"
                        alt="class"
                        className={`rounded-3`}
                    />
                </div>
                <div className="d-flex flex-row justify-content-between">
                    <h4 className={`${styles.textPurple} fw-bold`}>{`Rp ${price}`}</h4>
                    <p>{`available slot ${dataByID.participant}/${dataByID.kuota}`}</p>
                </div>
				<div className="d-flex flex-column align-items-start">
                    <p className="fw-bold mb-0">Description</p>
					<p className="fs-smaller">{dataByID.desc}</p>
				</div>
                <div className="d-flex flex-column align-items-start">
                    <p className="fw-bold mb-0">Schedule</p>
					{listScheduleFormatted.map(item=>(<p className="m-0 p-0">{item}</p>))}
				</div>
                <div className="d-flex flex-column align-items-start">
                    <p className="fw-bold mb-0 mt-2">Location</p>
					{/* <p className="fs-smaller">{dataByID.location}</p> */}
                    {!regexUrl.test(dataByID.location) ? (
							<p className="fs-smaller">{dataByID.location}</p>
						) : (
							<p className="fs-smaller">Online Meeting</p>
                    )}
				</div>
                 <button className={`btn ${styles.button} rounded-3`} onClick={() => router.push(href)} >Book</button>
			</div>
		</Layout>
	);
}