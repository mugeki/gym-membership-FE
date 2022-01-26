import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import VideoItem from "../../components/elements/VideoItem";
import Layout from "../../components/Layout";
import { generateAxiosConfig, handleUnauthorized } from "../../utils/helper";

export default function Videos() {
	const [videos, setVideos] = useState();
	const [pages, setPages] = useState();
	const [error, setError] = useState();

	const fetch = (page) => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(`${API_URL}/videos?page=${page}`, generateAxiosConfig())
			.then((res) => {
				if (res.status === 204) {
					setError("No video found");
				} else {
					setVideos((state) => {
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
				<div className="d-flex justify-content-center">
					<Button
						hidden={!videos || videos?.length >= pages?.total_data}
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
