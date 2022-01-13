import Layout from "../components/Layout";
import HomeClassesItem from "../components/elements/HomeClassesItem";
import NewsletterItem from "../components/elements/NewsletterItem";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { generateAxiosConfig, handleUnauthorized } from "../utils/helper";

export default function Home() {
	const user = useSelector((state) => state.user);
	const [newsletters, setNewsletters] = useState();
	const [classes, setClasses] = useState();
	const splitData = (array, chunkSize) =>
		Array(Math.ceil(array.length / chunkSize))
			.fill()
			.map((_, index) => index * chunkSize)
			.map((begin) => array.slice(begin, begin + chunkSize));

	useEffect(() => {
		const API_URL = process.env.BE_API_URL_LOCAL;
		axios
			.get(`${API_URL}/articles`, generateAxiosConfig())
			.then((res) => {
				setNewsletters(res.data.data.slice(0, 4));
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
				res.status !== 204 && setClasses(splitData(res.data.data), 3);
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
					<h4 className="text-start mb-4 fs-6 fw-bolder">
						Hello, {user.fullname}
					</h4>
					<h5>Your Classes</h5>

					<Carousel
						showIndicators={false}
						showThumbs={false}
						showStatus={false}
					>
						{!classes || error ? (
							<p className="text-center text-light mt-5">
								You are not participated in any class
							</p>
						) : (
							classes?.map((chunk, i) => (
								<div key={i} className="d-flex justify-content-between">
									{chunk.map((item) => (
										<HomeClassesItem key={item.id} entries={item} />
									))}
								</div>
							))
						)}
					</Carousel>

					<div className="d-flex justify-content-between mt-5">
						<h5>Latest Newsletter</h5>
						<Link href={"/newsletters"} passHref>
							<a className="text-light m-0 text-decoration-none">View All</a>
						</Link>
					</div>

					{!newsletters ? (
						<p className="text-center text-light mt-5">Newsletter not found</p>
					) : (
						newsletters?.map((item) => (
							<NewsletterItem key={item.id} entries={item} />
						))
					)}
				</main>
			</div>
		</Layout>
	);
}
