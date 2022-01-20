import Head from "next/head";
import Layout from "../components/Layout";
import HomeClassesItem from "../components/elements/HomeClassesItem";
import NewsletterItem from "../components/elements/NewsletterItem";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import dataClasses from "../mock_data/classes.json";
import dataNewsletter from "../mock_data/newsletter.json";
import dataUser from "../mock_data/user.json";

export default function Home() {
	const splitData = (array, chunkSize) =>
		Array(Math.ceil(array.length / chunkSize))
			.fill()
			.map((_, index) => index * chunkSize)
			.map((begin) => array.slice(begin, begin + chunkSize));
	const chunks = splitData(dataClasses.data, 3);
	return (
		<Layout>
			<div className="container p-4 mb-5">
				<main className="d-flex flex-column justify-content-center">
					<h4 className="text-start mb-4 fw-bolder">
						Hello, {dataUser.data.full_name}
					</h4>
					<h5>Your Classes</h5>

					<Carousel showIndicators={false} showThumbs={false}>
						{chunks.map((chunk, i) => (
							<div key={i} className="d-flex justify-content-between">
								{chunk.map((item) => (
									<HomeClassesItem key={item.id} entries={item} />
								))}
							</div>
						))}
					</Carousel>

					<div className="d-flex justify-content-between mt-5">
						<h5>Latest Newsletter</h5>
						<Link href={"/newsletters"} passHref>
							<a className="text-light m-0 text-decoration-none">View All</a>
						</Link>
					</div>

					{dataNewsletter.data.slice(0, 4).map((item) => (
						<NewsletterItem key={item.id} entries={item} />
					))}
				</main>
			</div>
		</Layout>
	);
}
