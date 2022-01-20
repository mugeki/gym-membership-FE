import Layout from "../components/Layout";
import NewsletterItem from "../components/elements/NewsletterItem";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { generateAxiosConfig, handleUnauthorized } from "../utils/helper";
import HomeClassesList from "../components/elements/HomeClassesList";
import Image from "next/image";

export default function Home() {
	const user = useSelector((state) => state.user);
	const [newsletters, setNewsletters] = useState();
	const [classes, setClasses] = useState();
	const [errorClass, setErrorClass] = useState();
	const [errorNewsletter, setErrorNewsletter] = useState();

	useEffect(() => {
		const API_URL = process.env.BE_API_URL_LOCAL;
		axios
			.get(`${API_URL}/articles`, generateAxiosConfig())
			.then((res) => {
				if (res.status === 204) {
					setErrorNewsletter((state) => {
						return { ...state, classes: "Newsletter not found" };
					});
				} else {
					setNewsletters(res.data.data.slice(0, 4));
				}
			})
			.catch((error) => {
				handleUnauthorized(error.response);
				console.log(error);
			});
	}, [setNewsletters]);

	useEffect(() => {
		const API_URL = process.env.BE_API_URL_LOCAL;
		axios
			.get(
				`${API_URL}/transaction-class/active/${user.id}`,
				generateAxiosConfig()
			)
			.then((res) => {
				if (res.status === 204) {
					setErrorClass("You are not participated in any class");
				} else {
					setClasses(res.data.data);
				}
			})
			.catch((error) => {
				handleUnauthorized(error.response);
				console.log(error);
			});
	}, [setClasses, user.id]);

	return (
		<Layout>
			<div className="container p-4 mb-5">
				<main className="d-flex flex-column justify-content-center">
					<div className="d-flex align-items-center justify-content-between flex-nowrap mb-4">
						<h4 className="fs-6 fw-bolder text-truncate m-0 me-1">
							Hello, {user.fullname}
						</h4>
						<Link href="/profile" passHref>
							<Image
								width={"45px"}
								height={"45px"}
								src={user.url_image}
								alt="profile"
								className="rounded-circle"
							/>
						</Link>
					</div>
					<h5 className="mb-0">Your Schedules</h5>
					<p
						className="text-light text-decoration-none"
						style={{ fontSize: "14px" }}
					>
						Your class schedule in the next 1 week
					</p>
					{errorClass && (
						<p className="text-center text-light mt-5">{errorClass}</p>
					)}{" "}
					{classes && <HomeClassesList entries={classes} />}
					<div className="d-flex justify-content-between align-items-center mt-5">
						<h5>Latest Newsletter</h5>
						<Link href="/newsletters" passHref>
							<a
								className="text-light mb-1 text-decoration-none"
								style={{ fontSize: "14px" }}
							>
								View All
							</a>
						</Link>
					</div>
					{errorNewsletter && (
						<p className="text-center text-light mt-5">{errorNewsletter}</p>
					)}{" "}
					{newsletters &&
						newsletters?.map((item) => (
							<NewsletterItem key={item.id} entries={item} />
						))}
				</main>
			</div>
		</Layout>
	);
}
