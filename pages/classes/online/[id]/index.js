
import NavbarTop from "../../../../components/elements/NavbarTop";
import Layout from "../../../../components/Layout";
import useGetDateList from "../../../../hooks/useGetDateList";
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { generateAxiosConfig, handleUnauthorized } from "../../../../utils/helper";
import Image from "next/image";
import axios from "axios";
import styles from "../../../../styles/ClassItem.module.css";


export default function ClassById() {
    const user = useSelector((state) => state.user);
    const router = useRouter();
    const idClass=router.query.id
	console.log("user ID", user.id  )
	const [classData, setClassData] = useState();
	const [errorClass, setErrorClass] = useState();
    const [stringDate, setStringDate]=useState("00:00:00.000Z,00:00:00.000Z;00:00:00.000Z,00:00:00.000Z;00:00:00.000Z,00:00:00.000Z,00:00:00.000Z,00:00:00.000Z");
    const { GetDateList } = useGetDateList();
    const listScheduleFormatted = GetDateList(stringDate)

	useEffect(() => {
		const API_URL = process.env.BE_API_URL_LOCAL;
		axios
			.get(
				`${API_URL}/classes/${idClass}`,
				generateAxiosConfig()
			)
			.then((res) => {
				if (res.status === 204) {
					setError("There is no classes");
				}
				setStringDate(res.data.data.date)
				setClassData({ data: res.data.data, page: res.data.page });
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					setClassData(error.response.data.meta.messages[0]);
					console.log(error);
				}
			});
	}, [setClassData, user.id, idClass]);

    const nf = new Intl.NumberFormat('en-US');
    const price = nf.format(classData?.data?.price)
    const href =`/classes/online/${idClass}/book-class`
	return (
		<Layout>
			<NavbarTop title={"Online Classes"} />
			<div className="container d-flex flex-column justify-content-center p-4 mb-5">
				<h6 className="fw-bolder mb-0 fs-5 text-capitalize">{classData?.data?.name}</h6>
				{/* <p className="text-light" style={{ fontSize: "14px" }}>
					{date.day} {date.month} {date.year}
				</p> */}
                
                <div className={`${styles.item} mt-3 bg-dark position-relative d-flex align-items-end text-white text-center rounded-3 mb-3`}>
						{classData?.data?.url_image?
						<Image
						src={classData?.data?.url_image}
						layout="fill"
						objectFit="cover"
						alt="class"
						className={`rounded-3`}
						/>
						: 
						<Icon icon="bi:card-image" color="rgba(0, 0, 17, 0.06666666666666667)" width="100" height="100" />
						}
					
                </div>
                <div className="d-flex flex-row justify-content-between">
                    <h4 className={`${styles.textPurple} fw-bold`}>{`Rp ${price}`}</h4>
                    <p>{`Available Slot ${classData?.data?.participant}/${classData?.data?.kuota}`}</p>
                </div>
				<div className="d-flex flex-column align-items-start">
                    <p className="fw-bold mb-0">Description</p>
					<p className="fs-smaller">{classData?.data?.description}</p>
				</div>
                <div className="d-flex flex-column align-items-start">
                    <p className="fw-bold mb-0">Schedule</p>
					{listScheduleFormatted.map(item=>(<p className="m-0 p-0">{item}</p>))}
				</div>
                <div className="d-flex flex-column align-items-start">
                    <p className="fw-bold mb-0 mt-2">Location</p>
					{/* <p className="fs-smaller">{dataClass.data.location}</p> */}
                    <p className="fs-smaller">Online Zoom Meeting</p>
				</div>
                 <button className={`btn ${styles.button} rounded-3`} onClick={() => router.push(href)} >Book</button>
			</div>
		</Layout>
	);
}