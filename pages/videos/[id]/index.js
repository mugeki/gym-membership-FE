import axios from "axios";
import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import useFormatDatetime from "../../../hooks/useFormatDatetime";

export async function getServerSideProps(ctx) {
	const API_URL = "https://youtube.googleapis.com/youtube/v3/videos";
	const API_KEY = process.env.YOUTUBE_API_KEY;
	const res = await axios.get(
		`${API_URL}?part=snippet&id=${ctx.query.videoID}&key=${API_KEY}`
	);
	const dataYT = await res.data.items[0];
	if (!dataYT) {
		return {
			notFound: true,
		};
	}
	const data = { ...ctx.query };
	return {
		props: { data, dataYT },
	};
}

export default function Video({ data, dataYT }) {
	const { formatDatetime } = useFormatDatetime();
	const date = formatDatetime(data.created_at);
	const description = dataYT.snippet.description.split("\n").map((str, i) => (
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
				<h6 className="fw-bolder mb-0 fs-5">{data.title}</h6>
				<p className="text-light" style={{ fontSize: "14px" }}>
					{date.day} {date.month} {date.year}
				</p>
				<iframe
					id="player"
					type="text/html"
					src={data.url + "?modestbranding=1&rel=0"}
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
