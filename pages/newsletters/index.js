import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import NewsletterItem from "../../components/elements/NewsletterItem";
import Layout from "../../components/Layout";
import { generateAxiosConfig, handleUnauthorized } from "../../utils/helper";

export default function Newsletters() {
	const [newsletters, setNewsletters] = useState();
	const [pages, setPages] = useState();
	const [error, setError] = useState();

	const fetch = (page) => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(`${API_URL}/articles?page=${page}`, generateAxiosConfig())
			.then((res) => {
				if (res.status === 204) {
					setError("No video found");
				} else {
					setNewsletters((state) => {
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
				handleUnauthorized(error.response);
				setError(error.response.data.meta.messages[0]);
				console.log(error);
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
				<title>Newsletters | Gymbro</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="container p-4 mb-5">
				<main className="d-flex flex-column justify-content-center">
					<h4 className="text-start fw-bolder mb-4">Newsletters</h4>

					{error ? (
						<p className="text-center text-light mt-5">{error}</p>
					) : (
						newsletters?.map((item) => (
							<NewsletterItem key={item.id} entries={item} />
						))
					)}
				</main>
				<div className="d-flex justify-content-center">
					<Button
						hidden={!newsletters || newsletters?.length >= pages?.total_data}
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
