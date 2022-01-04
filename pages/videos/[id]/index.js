import axios from "axios";
import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import useFormatDatetime from "../../../hooks/useFormatDatetime";
import dataVideo from "../../../mock_data/video_getbyid.json";

export async function getServerSideProps(context) {
	const API_URL = "https://youtube.googleapis.com/youtube/v3/videos";
	const API_KEY = process.env.YOUTUBE_API_KEY;
	const res = await axios.get(
		`${API_URL}?part=snippet&id=${context.query.id}&key=${API_KEY}`
	);
	const data = await res.data.items[0];
	if (!data) {
		return {
			notFound: true,
		};
	}
	return {
		props: { data },
	};
}

export default function Video({ data }) {
	const { formatDatetime } = useFormatDatetime();
	const date = formatDatetime(dataVideo.data.created_at);
	const description = data.snippet.description.split("\n").map((str, i) => (
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
			<div className="container d-flex flex-column justify-content-center p-4 mb-5">
				<h6 className="fw-bolder mb-0 fs-5">{dataVideo.data.title}</h6>
				<p className="text-light" style={{ fontSize: "14px" }}>
					{date.day} {date.month} {date.year}
				</p>
				<iframe
					id="player"
					type="text/html"
					src={dataVideo.data.url + "?modestbranding=1&rel=0"}
					height={"200px"}
					frameBorder="0"
					className="w-100 mb-4"
				></iframe>
				<div className="d-flex flex-column align-items-start">
					{description}
				</div>
			</div>
		</Layout>
	);
}
