import NewsletterItem from "../../components/elements/NewsletterItem";
import Layout from "../../components/Layout";
import dataNewsletter from "../../mock_data/newsletter.json";

export default function Newsletters() {
	return (
		<Layout>
			<div className="container p-4 mb-5">
				<main className="d-flex flex-column justify-content-center">
					<h4 className="text-start fw-bolder mb-4">Newsletters</h4>

					{dataNewsletter.data.map((item) => (
						<NewsletterItem key={item.id} entries={item} />
					))}
				</main>
			</div>
		</Layout>
	);
}
