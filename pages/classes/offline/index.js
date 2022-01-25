import axios from "axios";
import Layout from "../../../components/Layout";
import ClassItemOffline from "../../../components/elements/ClassItemOffline";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { generateAxiosConfig, handleUnauthorized } from "../../../utils/helper";
import Head from "next/head";

export default function Classes() {
	const [classData, setClassData] = useState();
	const user = useSelector((state) => state.user);
	const [errorClass, setErrorClass] = useState();

	useEffect(() => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(`${API_URL}/classes?class-type=offline`, generateAxiosConfig())
			.then((res) => {
				if (res.status === 204) {
					setErrorClass("There is no classes");
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
			<Head>
				<title>Offline Classes | Alta2Gym</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="container p-4 mb-5">
				<div className="d-flex flex-column justify-content-center ">
					<h4 className="text-start fw-bolder">Offline Classes</h4>
					{errorClass && (
						<p className="text-center text-light mt-5">{errorClass}</p>
					)}
					{classData?.data?.map((item) => (
						<ClassItemOffline key={item.id} entries={item} />
					))}
				</div>
			</div>
		</Layout>
	);
}
