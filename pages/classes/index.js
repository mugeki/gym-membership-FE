import axios from "axios";
import ClassItem from "../../components/elements/ClassItemOnline";
import Layout from "../../components/Layout";
import Image from "next/image";
import styles from "../../styles/ClassItem.module.css";
import { useEffect } from "react";
// import { Hoverable, Pressable } from 'react-native-web-hover'

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
					<h4 className="text-start fw-bolder">Classes</h4>
					<div className="d-flex flex-row justify-content-between mt-4">
						<p className="fw-bolder">Online Categories</p>
						<a  
						className= {`${styles.link}`}
						href="/classes/online"
						>See All</a>
					</div>
					<div className={`${styles.item} bg-dark position-relative d-flex align-items-end text-white text-center rounded-3 mb-3`}>
						<Image
							src="https://images.unsplash.com/photo-1570655652364-2e0a67455ac6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=822&q=80"
							layout="fill"
							objectFit="cover"
							alt="class"
							className="rounded-3"
						/>
						<p className= {`${styles.overlay}  ms-3 text-start fs-6 text-capitalize`}>
							Yoga Class for Beginner : this is title of the classes
						</p>
					</div>
					<div className="d-flex flex-row justify-content-between mt-4">
						<p className="fw-bolder">Offline Categories</p>
						<a  
						className= {`${styles.link}`}
						href="/classes/offline"
						>See All</a>
					</div>
					<div className={`${styles.item} position-relative d-flex align-items-end text-white text-center rounded-3 mb-3`}>
						<Image
							src="https://images.unsplash.com/photo-1570655652364-2e0a67455ac6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=822&q=80"
							layout="fill"
							objectFit="cover"
							alt="class"
							className="rounded-3"
						/>
						<p className= {`${styles.overlay}  ms-3 text-start fs-6 text-capitalize`}>
							Yoga Class for Beginner : this is title of the classes
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
}