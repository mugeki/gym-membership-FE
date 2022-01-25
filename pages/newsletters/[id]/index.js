import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import useHandleDate from "../../../hooks/useHandleDate";
import { generateAxiosConfig, handleUnauthorized } from "../../../utils/helper";

export default function Newsletter() {
	const router = useRouter();
	const [newsletter, setNewsletter] = useState();
	const [error, setError] = useState();

	useEffect(() => {
		if (!router.query.title) {
			const API_URL = process.env.BE_API_URL;
			axios
				.get(`${API_URL}/articles/${router.query.id}`, generateAxiosConfig())
				.then((res) => {
					setNewsletter(res.data.data);
				})
				.catch((error) => {
					handleUnauthorized(error.response);
					setError(error.response.data.meta.messages[0]);
					console.log(error);
				});
		} else {
			setNewsletter(router.query);
		}
	}, [setNewsletter, router]);

	const { formatDatetime } = useHandleDate();
	const date = formatDatetime(newsletter?.created_at);
	const content = newsletter?.text.split("\n").map((str, i) => (
		<p
			key={i}
			className="mw-100 text-truncate"
			style={{ fontSize: "14px", whiteSpace: "normal" }}
		>
			{str}
		</p>
	));

	return (
		<Layout>
			<Head>
				<title>{newsletter?.title} | Alta2Gym</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<NavbarTop title={"Newsletter"} />
			{error && <p className="text-center text-light mt-5">{error}</p>}
			{newsletter && (
				<div className="container d-flex flex-column justify-content-center p-4 mb-5">
					<h6 className="fw-bolder mb-0 fs-5">{newsletter.title}</h6>
					<p className="text-light" style={{ fontSize: "14px" }}>
						{date.day} {date.month} {date.year}
					</p>
					<Image
						src={newsletter.url_image}
						width={"100%"}
						height={"200px"}
						alt="newsletter"
						objectFit="cover"
						className="mb-4"
					/>
					<div className="d-flex flex-column align-items-start">{content}</div>
				</div>
			)}
		</Layout>
	);
}
