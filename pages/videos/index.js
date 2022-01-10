import axios from "axios";
import VideoItem from "../../components/elements/VideoItem";
import Layout from "../../components/Layout";

export async function getServerSideProps() {
	const API_URL =
		"http://ec2-3-142-219-49.us-east-2.compute.amazonaws.com:8000";
	const res = await axios.get(`${API_URL}/users/videos`).catch((error) => {
		if (error.response) {
			return {
				props: { error: "An error occured, please try again later" },
			};
		}
	});
	if (res.status === 204) {
		return {
			props: { error: "Videos not found" },
		};
	}
	const data = await res.data;
	return {
		props: { data },
	};
}

export default function Videos({ data, error }) {
	return (
		<Layout>
			<div className="container p-4 mb-5">
				<div className="d-flex flex-column justify-content-center">
					<h4 className="text-start fw-bolder mb-4">Videos</h4>
					{error
						? error
						: data?.map((item) => <VideoItem key={item.id} entries={item} />)}
				</div>
			</div>
		</Layout>
	);
}
