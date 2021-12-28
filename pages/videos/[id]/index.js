import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import dataVideo from "../../../mock_data/video_getbyid.json";

export default function Video() {
	return (
		<Layout>
			<NavbarTop title={"Videos"} />
			<div className="container">
				<h6 className="fw-bolder">{dataVideo.data.title}</h6>
			</div>
		</Layout>
	);
}
