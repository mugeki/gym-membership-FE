import axios from "axios";
import Layout from "../../../components/Layout";
import ClassItemOnline from "../../../components/elements/ClassItemOnline";
import React, { useState, useEffect } from "react";
import { generateAxiosConfig, handleUnauthorized } from "../../../utils/helper";
import NavbarTop from "../../../components/elements/NavbarTop";
import Head from "next/head";
import { Button } from "react-bootstrap";

export default function Classes() {
	const [classData, setClassData] = useState();
	const [pages, setPages] = useState();
	const [errorClass, setErrorClass] = useState();

	const fetch = (page) => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(
				`${API_URL}/classes?class-type=online&page=${page}`,
				generateAxiosConfig()
			)
			.then((res) => {
				if (res.status === 204) {
					setErrorClass("There is no classes");
				} else {
					setClassData((state) => {
						if (state) {
							return [...state, ...res.data.data];
						}
						return res.data.data;
					});
					setPages(() => {
						const page = { ...res.data.page };
						const active = page.offset / page.limit + 1;
						return { ...res.data.page, currPage: active };
					});
				}
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					setErrorClass(error.response.data.meta.messages[0]);
					console.log(error);
				}
			});
	};

	useEffect(() => {
		fetch(1);
	}, []);

	const fetchMore = () => {
		fetch(pages.currPage + 1);
	};

	return (
		<Layout>
			<Head>
				<title>Online Classes | Alta2Gym</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<NavbarTop title="Classes" />
			<div className="container p-4 mb-5">
				<div className="d-flex flex-column justify-content-center ">
					<h4 className="text-start fw-bolder">Online Classes</h4>
					{errorClass && (
						<p className="text-center text-light mt-5">{errorClass}</p>
					)}
					{classData?.data?.map((item) => (
						<ClassItemOnline key={item.id} entries={item} />
					))}
				</div>
				<div className="d-flex justify-content-center">
					<Button
						hidden={!classData || classData?.length >= pages?.total_data}
						variant="outline-primary m-auto"
						onClick={fetchMore}
					>
						Load more
					</Button>
				</div>
			</div>
		</Layout>
	);
}
