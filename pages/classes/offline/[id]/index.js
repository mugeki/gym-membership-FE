import NavbarTop from "../../../../components/elements/NavbarTop";
import Layout from "../../../../components/Layout";
import useGetDateList from "../../../../hooks/useGetDateList";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
	generateAxiosConfig,
	handleUnauthorized,
} from "../../../../utils/helper";
import Image from "next/image";
import axios from "axios";
import styles from "../../../../styles/ClassItem.module.css";
import Head from "next/head";

export default function OfflineClassById() {
	const user = useSelector((state) => state.user);
	const router = useRouter();
	const idClass = router.query.id;
	const [classData, setClassData] = useState();
	const [errorClass, setErrorClass] = useState();
	const [stringDate, setStringDate] = useState(
		"00:00:00.000Z,00:00:00.000Z;00:00:00.000Z,00:00:00.000Z;00:00:00.000Z,00:00:00.000Z,00:00:00.000Z,00:00:00.000Z"
	);
	const { GetDateList } = useGetDateList();
	const listScheduleFormatted = GetDateList(stringDate);

	useEffect(() => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(`${API_URL}/classes/${idClass}`, generateAxiosConfig())
			.then((res) => {
				if (res.status === 204) {
					setErrorClass("There is no classes");
				}
				setStringDate(res.data.data.date);
				setClassData(res.data.data);
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					setErrorClass(error.response.data.meta.messages[0]);
					console.log(error);
				}
			});
	}, [setClassData, user.id, idClass]);

	useEffect(() => {
		console.log(classData);
	}, [classData]);

	const nf = new Intl.NumberFormat("en-US");
	const price = nf.format(classData?.price);
	const href = `/classes/offline/${idClass}/book-class`;
	return (
		<Layout>
			<Head>
				<title>{classData?.name} | Gymbro</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<NavbarTop title={"Offline Classes"} />
			<div className="container d-flex flex-column justify-content-center p-4 mb-5">
				<h6 className="fw-bolder mb-0 fs-5 text-capitalize">
					{classData?.name}
				</h6>

				<div
					className={`${styles.item} mt-3 bg-dark position-relative d-flex align-items-end text-white text-center rounded-3 mb-3`}
				>
					{classData?.url_image ? (
						<Image
							src={classData?.url_image}
							layout="fill"
							objectFit="cover"
							alt="class"
							className={`rounded-3`}
						/>
					) : (
						<Icon
							icon="bi:card-image"
							color="rgba(0, 0, 17, 0.06666666666666667)"
							width="100"
							height="100"
						/>
					)}
				</div>
				<div className="d-flex flex-row justify-content-between">
					<h4 className={`${styles.textPurple} fw-bold`}>{`Rp ${price}`}</h4>
					<p>{`available slot ${classData?.participant}/${classData?.kuota}`}</p>
				</div>
				<div className="d-flex flex-column align-items-start">
					<p className="fw-bold mb-0">Description</p>
					<p className="fs-smaller">{classData?.desc}</p>
				</div>
				<div className="d-flex flex-column align-items-start mb-3">
					<p className="fw-bold mb-0">Schedule</p>
					{listScheduleFormatted.map((item, i) => (
						<p key={i} className="m-0 p-0">
							{item}
						</p>
					))}
				</div>
				<div className="d-flex flex-column align-items-start mb-3">
					<p className="fw-bold mb-0 mt-2">Location</p>
					<p className="fs-smaller">{classData?.location}</p>
				</div>
				<button
					className={`btn ${styles.button} rounded-3`}
					onClick={() => router.push(href)}
				>
					Book
				</button>
			</div>
		</Layout>
	);
}
