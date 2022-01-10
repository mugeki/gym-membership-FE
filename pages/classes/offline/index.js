import axios from "axios";
import Layout from "../../../components/Layout";
import ClassItem from "../../../components/elements/ClassItemOffline";
import Image from "next/image";
import styles from "../../../styles/ClassItem.module.css";
// import { Hoverable, Pressable } from 'react-native-web-hover'
import dataClasses from "../../../mock_data/classes.json";

// export async function getServerSideProps() {
// 	const API_URL =
// 		"http://ec2-3-142-219-49.us-east-2.compute.amazonaws.com:8000";
// 	const res = await axios.get(`${API_URL}/users/videos`).catch((error) => {
// 		if (error.response) {
// 			return {
// 				props: { error: "An error occured, please try again later" },
// 			};
// 		}
// 	});
// 	if (res.status === 204) {
// 		return {
// 			props: { error: "No Classes" },
// 		};
// 	}
// 	const data = await res.data;
// 	return {
// 		props: { data },
// 	};
// }

export default function Classes({ data, error }) {
	return (
		<Layout>
			<div className="container p-4 mb-5">
				<div className="d-flex flex-column justify-content-center ">
					<h4 className="text-start fw-bolder">Online Classes</h4>
                    {dataClasses.data.map((item) => (
						<ClassItem key={item.id} entries={item} />
					))}
				</div>
			</div>
		</Layout>
	);
}