import axios from "axios";
import { Base64 } from "js-base64";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import NewsletterItem from "../../components/elements/NewsletterItem";
import Layout from "../../components/Layout";
import { handleUnauthorized } from "../../utils/helper";

// export async function getServerSideProps() {
// 	const API_URL = process.env.BE_API_URL_LOCAL;
// 	const res = await axios.get(`${API_URL}/articles`).catch((error) => {
// 		if (error.response) {
// 			return {
// 				props: { error: error.response.data.meta.messages },
// 			};
// 		}
// 	});
// 	if (res.status === 204) {
// 		return {
// 			props: { error: "Newsletter not found" },
// 		};
// 	}
// 	const data = await res.data.data;
// 	const page = await res.data.page;
// 	return {
// 		props: { data, page },
// 	};
// }

export default function Newsletters() {
	const [newsletters, setNewsletters] = useState();
	const [page, setPages] = useState();
	const [error, setError] = useState();

	useEffect(() => {
		const token = Base64.decode(new Cookies().get("token"));
		const API_URL = process.env.BE_API_URL_LOCAL;
		const config = {
			headers: {
				Authorization: "Bearer " + token,
			},
		};
		axios
			.get(`${API_URL}/articles`, config)
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
