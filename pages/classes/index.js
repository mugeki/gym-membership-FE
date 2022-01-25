import axios from "axios";
import ClassItemOnline from "../../components/elements/ClassItemOnline";
import ClassItemOffline from "../../components/elements/ClassItemOffline";
import Layout from "../../components/Layout";
import styles from "../../styles/ClassItem.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { generateAxiosConfig, handleUnauthorized } from "../../utils/helper";
import Head from "next/head";

export default function Classes() {
	const [offlineClass, setOfflineClass] = useState();
	const [onlineClass, setOnlineClass] = useState();
	const [errorOffline, setErrorOffline] = useState();
	const [errorOnline, setErrorOnline] = useState();

	useEffect(() => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(`${API_URL}/classes?class-type=offline`, generateAxiosConfig())
			.then((res) => {
				if (res.status === 204) {
					setErrorOffline("There is no class");
				}
				setOfflineClass(res.data.data.slice(0, 4));
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					setErrorOffline(error.response.data.meta.messages[0]);
					console.log(error);
				}
			});
	}, [setOfflineClass]);

	useEffect(() => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(`${API_URL}/classes?class-type=online`, generateAxiosConfig())
			.then((res) => {
				if (res.status === 204) {
					setErrorOnline("There is no class");
				}
				setOnlineClass(res.data.data.slice(0, 4));
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					setErrorOnline(error.response.data.meta.messages[0]);
					console.log(error);
				}
			});
	}, [setOnlineClass]);

	return (
		<Layout>
			<Head>
				<title>Classes| Alta2Gym</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="container p-4 mb-5">
				<div className="d-flex flex-column justify-content-center ">
					<h4 className="text-start fw-bolder">Classes</h4>
					<div className="d-flex flex-row justify-content-between mt-4">
						<p className="fw-bolder">Online Categories</p>
						<Link href="/classes/online" passHref>
							<p className={`${styles.link} mb-0`}>See All</p>
						</Link>
					</div>
					{onlineClass?.map((item, i) => (
						<ClassItemOnline key={i} entries={item} />
					))}
					{errorOnline && (
						<p className="text-center text-light mt-5">{errorOnline}</p>
					)}{" "}
					<div className="d-flex flex-row justify-content-between mt-4">
						<p className="fw-bolder">Offline Categories</p>
						<Link href="/classes/offline" passHref>
							<p className={`${styles.link} mb-0`}>See All</p>
						</Link>
					</div>
					{offlineClass?.map((item, i) => (
						<ClassItemOffline key={i} entries={item} />
					))}
					{errorOffline && (
						<p className="text-center text-light mt-5">{errorOffline}</p>
					)}{" "}
				</div>
			</div>
		</Layout>
	);
}
