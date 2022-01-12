import axios from "axios";
import Image from "next/image";
import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import useFormatDatetime from "../../../hooks/useFormatDatetime";

export async function getServerSideProps(ctx) {
	console.log(ctx.query.title);
	let data;
	if (ctx.query.title) {
		data = ctx.query;
	} else {
		const API_URL = process.env.BE_API_URL_LOCAL;
		axios.get(`${API_URL}/article/`); // unfinished
	}
	return {
		props: { data },
	};
}

export default function Newsletter({ data }) {
	const { formatDatetime } = useFormatDatetime();
	const date = formatDatetime(data.created_at);
	const content = data.text.split("\n").map((str, i) => (
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
			<NavbarTop title={"Newsletter"} />
			<div className="container d-flex flex-column justify-content-center p-4 mb-5">
				<h6 className="fw-bolder mb-0 fs-5">{data.title}</h6>
				<p className="text-light" style={{ fontSize: "14px" }}>
					{date.day} {date.month} {date.year}
				</p>
				<Image
					src={data.url_image}
					width={"100%"}
					height={"200px"}
					alt="newsletter"
					objectFit="cover"
					className="mb-4"
				/>
				<div className="d-flex flex-column align-items-start">{content}</div>
			</div>
		</Layout>
	);
}
