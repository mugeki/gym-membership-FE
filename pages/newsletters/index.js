import axios from "axios";
import NewsletterItem from "../../components/elements/NewsletterItem";
import Layout from "../../components/Layout";

export async function getServerSideProps() {
	const API_URL = process.env.BE_API_URL_LOCAL;
	const res = await axios.get(`${API_URL}/article`).catch((error) => {
		if (error.response) {
			return {
				props: { error: error.response.data.meta.messages },
			};
		}
	});
	if (res.status === 204) {
		return {
			props: { error: "Newsletter not found" },
		};
	}
	const data = await res.data.data;
	const page = await res.data.page;
	return {
		props: { data, page },
	};
}

export default function Newsletters({ data, page, error }) {
	return (
		<Layout>
			<div className="container p-4 mb-5">
				<main className="d-flex flex-column justify-content-center">
					<h4 className="text-start fw-bolder mb-4">Newsletters</h4>

					{error ? (
						<p className="text-center text-light mt-5">Newsletter not found</p>
					) : (
						data?.map((item) => <NewsletterItem key={item.id} entries={item} />)
					)}
				</main>
			</div>
		</Layout>
	);
}
