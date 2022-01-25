import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import NewsletterItem from "../../components/elements/NewsletterItem";
import Layout from "../../components/Layout";
import { generateAxiosConfig, handleUnauthorized } from "../../utils/helper";

export default function Newsletters() {
	const [newsletters, setNewsletters] = useState();
	const [page, setPages] = useState();
	const [error, setError] = useState();

	useEffect(() => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(`${API_URL}/articles`, generateAxiosConfig())
			.then((res) => {
				setNewsletters(res.data.data);
				setPages(res.data.page);
			})
			.catch((error) => {
				handleUnauthorized(error.response);
				setError(error.response.data.meta.messages[0]);
				console.log(error);
			});
	}, [setNewsletters]);

	return (
		<Layout>
			<Head>
				<title>Newsletters | Alta2Gym</title>
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
			</div>
		</Layout>
	);
}
