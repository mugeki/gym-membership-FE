import axios from "axios";
import VideoItem from "../../components/elements/VideoItem";
import Layout from "../../components/Layout";

export async function getServerSideProps() {
	const API_URL = process.env.BE_API_URL_LOCAL;
	const res = await axios.get(`${API_URL}/videos`).catch((error) => {
		if (error.response) {
			return {
				props: { error: error.response.data.meta.messages },
			};
		}
	});
	if (res.status === 204) {
		return {
			props: { error: "Videos not found" },
		};
	}
	const data = await res.data.data;
	const page = await res.data.page;
	return {
		props: { data, page },
	};
}

export default function Videos({ data, page, error }) {
	return (
		<Layout>
			<div className="container p-4 mb-5">
				<div className="d-flex flex-column justify-content-center">
					<h4 className="text-start fw-bolder mb-4">Videos</h4>
					{error ? (
						<p className="text-center text-light mt-5">Video not found</p>
					) : (
						data?.map((item) => <VideoItem key={item.id} entries={item} />)
					)}
				</div>
			</div>
		</Layout>
	);
}
