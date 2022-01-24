import axios from "axios";
import Layout from "../../../components/Layout";
import ClassItem from "../../../components/elements/ClassItemOnline";
import Image from "next/image";
import styles from "../../../styles/ClassItem.module.css";
import React, { useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { generateAxiosConfig, handleUnauthorized } from "../../../utils/helper";
// import { Hoverable, Pressable } from 'react-native-web-hover'
// import dataClasses from "../../../mock_data/classes.json";


export default function Classes() {
	const [classData, setClassData]= useState()
    const user = useSelector((state) => state.user);
	const [errorClass, setErrorClass] = useState();

	useEffect(() => {
		const API_URL = process.env.BE_API_URL_LOCAL;
		axios
			.get(
				`${API_URL}/classes?class-type=online`,
				generateAxiosConfig()
			)
			.then((res) => {
				if (res.status === 204) {
					setError("There is no classes");
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
	}, [setClassData, user.id]);
	return (
		<Layout>
			<div className="container p-4 mb-5">
				<div className="d-flex flex-column justify-content-center ">
					<h4 className="text-start fw-bolder">Online Classes</h4>
                    {classData?.data?.map((item) => (
						<ClassItem key={item.id} entries={item} />
					))}
				</div>
			</div>
		</Layout>
	);
}