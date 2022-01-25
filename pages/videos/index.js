import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import VideoItem from "../../components/elements/VideoItem";
import Layout from "../../components/Layout";
import { generateAxiosConfig, handleUnauthorized } from "../../utils/helper";

export default function Videos() {
	const [videos, setVideos] = useState();
	const [page, setPages] = useState();
	const [error, setError] = useState();

	useEffect(() => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(`${API_URL}/videos`, generateAxiosConfig())
			.then((res) => {
				setVideos(res.data.data);
				setPages(res.data.page);
			})
			.catch((error) => {
				handleUnauthorized(error.response);
				setError(error.response.data.meta.messages[0]);
				console.log(error);
			});
	}, [setVideos]);

	return (
		<Layout>
			<Head>
				<title>Videos | Alta2Gym</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="container p-4 mb-5">
				<div className="d-flex flex-column justify-content-center">
					<h4 className="text-start fw-bolder mb-4">Videos</h4>
					{error ? (
						<p className="text-center text-light mt-5">{error}</p>
					) : (
						videos?.map((item) => <VideoItem key={item.id} entries={item} />)
					)}
				</div>
			</div>
		</Layout>
	);
}
