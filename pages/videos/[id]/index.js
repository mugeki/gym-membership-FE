import axios from "axios";
import { Base64 } from "js-base64";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import useFormatDatetime from "../../../hooks/useFormatDatetime";
import { generateAxiosConfig, handleUnauthorized } from "../../../utils/helper";

export default function Video() {
	const router = useRouter();
	const [video, setVideo] = useState();
	const [error, setError] = useState();

	useEffect(() => {
		if (router.query.videoID) {
			const cookies = new Cookies();
			cookies.set("v_id", Base64.encode(router.query.videoID));
			const fetchYT = (id) => {
				const YT_API_URL = "https://youtube.googleapis.com/youtube/v3/videos";
				const YT_API_KEY = process.env.YOUTUBE_API_KEY;
				axios
					.get(`${YT_API_URL}?part=snippet&id=${id}&key=${YT_API_KEY}`)
					.then((res) => {
						setVideo({
							...router.query,
							description: res.data.items[0].snippet.description,
						});
					})
					.catch((error) => {
						console.log(error);
					});
			};

			fetchYT(router.query.videoID);
		}
	}, [router.query]);

	useEffect(() => {
		if (!router.query.videoID) {
			const cookies = new Cookies();
			const videoID = Base64.decode(cookies.get("v_id"));
			const fetchYT = (id) => {
				const YT_API_URL = "https://youtube.googleapis.com/youtube/v3/videos";
				const YT_API_KEY = process.env.YOUTUBE_API_KEY;
				axios
					.get(`${YT_API_URL}?part=snippet&id=${id}&key=${YT_API_KEY}`)
					.then((res) => {
						setVideo((state) => {
							console.log(res.data);
							return {
								...state,
								description: res.data.items[0]?.snippet.description,
							};
						});
					})
					.catch((error) => {
						console.log(error);
					});
			};

			const API_URL = process.env.BE_API_URL_LOCAL;
			axios
				.get(`${API_URL}/videos/${router.query.id}`, generateAxiosConfig())
				.then((res) => {
					setVideo(res.data.data);
				})
				.catch((error) => {
					handleUnauthorized(error.response);
					setError(error.response.data.meta.messages[0]);
					console.log(error);
				});
			fetchYT(videoID);
		}
	}, [router.query]);

	const { formatDatetime } = useFormatDatetime();
	const date = formatDatetime(video?.created_at);
	const description = video?.description?.split("\n").map((str, i) => (
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
			<NavbarTop title={"Videos"} />
			{error && <p className="text-center text-light mt-5">{error}</p>}
			{video && (
				<div className="container d-flex flex-column justify-content-center p-4 mb-5">
					<h6 className="fw-bolder mb-0 fs-5">{video.title}</h6>
					<p className="text-light" style={{ fontSize: "14px" }}>
						{date.day} {date.month} {date.year}
					</p>
					<iframe
						id="player"
						type="text/html"
						src={video.url + "?modestbranding=1&rel=0"}
						height={"200px"}
						frameBorder="0"
						className="w-100 mb-4"
					></iframe>
					<div className="d-flex flex-column align-items-start">
						{description}
					</div>
				</div>
			)}
		</Layout>
	);
}
