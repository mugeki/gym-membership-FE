import VideoItem from "../../components/elements/VideoItem";
import Layout from "../../components/Layout";
import dataVideos from "../../mock_data/videos.json";

export default function Videos() {
	return (
		<Layout>
			<div className="container p-4 mb-5">
				<div className="d-flex flex-column justify-content-center">
					<h4 className="text-start fw-bolder mb-4">Videos</h4>
					{dataVideos.data.map((item) => (
						<VideoItem key={item.id} entries={item} />
					))}
				</div>
			</div>
		</Layout>
	);
}
