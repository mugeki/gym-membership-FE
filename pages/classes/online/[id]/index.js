
import NavbarTop from "../../../../components/elements/NavbarTop";
import Layout from "../../../../components/Layout";
import useGetDateList from "../../../../hooks/useGetDateList";
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { generateAxiosConfig, handleUnauthorized } from "../../../../utils/helper";
import Image from "next/image";
import styles from "../../../../styles/ClassItem.module.css";


export default function ClassById() {
    const user = useSelector((state) => state.user);
    const router = useRouter();
    const idClass=router.query.id
	const [classData, setClassData] = useState();
	const [errorClass, setErrorClass] = useState();
    
	useEffect(() => {
        console.log("date===== ",res?.data?.data?.date) 
		const API_URL = process.env.BE_API_URL_LOCAL;
		axios
			.get(
				`${API_URL}/classes/${idClass}`,
				generateAxiosConfig()
			)
			.then((res) => {
				if (res.status === 204) {
					setError("No transaction has been made");
				}
                
				setClassData({ data: res.data.data, page: res.data.page });
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					setErrorClass(error.response.data.meta.messages[0]);
					console.log(error);
				}
			});
	}, [setClassData, user.id,router.query]);
    const { GetDateList } = useGetDateList();
    // const listScheduleFormatted = GetDateList(classData?.data?.date)

    const nf = new Intl.NumberFormat('en-US');
    const price = nf.format(dataClass?.data?.price)
    const href =`/classes/online/${idClass}/book-class`
    console.log()
	return (
		<Layout>
			<NavbarTop title={"Online Classes"} />
			<div className="container d-flex flex-column justify-content-center p-4 mb-5">
				<h6 className="fw-bolder mb-0 fs-5">{classData?.data?.name}</h6>
				{/* <p className="text-light" style={{ fontSize: "14px" }}>
					{date.day} {date.month} {date.year}
				</p> */}
                
                <div className={`${styles.item} mt-3 bg-dark position-relative d-flex align-items-end text-white text-center rounded-3 mb-3`}>
                    <Image
                        src={classData?.data?.url_image}
                        layout="fill"
                        objectFit="cover"
                        alt="class"
                        className={`rounded-3`}
                    />
                </div>
                <div className="d-flex flex-row justify-content-between">
                    <h4 className={`${styles.textPurple} fw-bold`}>{`Rp ${price}`}</h4>
                    <p>{`Available Slot ${classData?.data?.participant}/${classData?.data?.kuota}`}</p>
                </div>
				<div className="d-flex flex-column align-items-start">
                    <p className="fw-bold mb-0">Description</p>
					<p className="fs-smaller">{classData?.data?.desc}</p>
				</div>
                <div className="d-flex flex-column align-items-start">
                    <p className="fw-bold mb-0">Schedule</p>
					{/* {listScheduleFormatted.map(item=>(<p className="m-0 p-0">{item}</p>))} */}
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