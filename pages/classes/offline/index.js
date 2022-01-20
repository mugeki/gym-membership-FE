import axios from "axios";
import Layout from "../../../components/Layout";
import mockClass from "../../../mock_data/classes.json"
import ClassItem from "../../../components/elements/ClassItemOffline";
import Image from "next/image";
import styles from "../../../styles/ClassItem.module.css";
// import { Hoverable, Pressable } from 'react-native-web-hover'
// import dataClasses from "../../../mock_data/classes.json";
import React, { useState, useEffect} from 'react';

// export async function getServerSideProps() {
// 	const API_URL =
// 		"http://ec2-3-142-219-49.us-east-2.compute.amazonaws.com:8000";
// 	const res = await axios.get(`${API_URL}/users/videos`).catch((error) => {
// 		if (error.response) {
// 			console.log("err response ", error.response)
// 			return {
// 				props: { error: "An error occured, please try again later" },
// 			};
// 		}
// 	});
// 	console.log("res fetching",res)
// 	if (res.status === 204) {
// 		console.log("err")
// 		return {
// 			props: { error: "No Classes" },
// 		};
// 	}
// 	const data = await res.data;
// 	console.log("res ", res, "data ",data)
// 	return {
// 		props: { data },
// 	};
// }

export default function Classes({ data, error }) {
	const [classData, setClassData]= useState(mockClass.data)

	// useEffect(() => {
	// 	const API_URL=process.env.BE_API_URL_LOCAL;
	// 	axios.get(`${API_URL}/class`).then((response) =>
	// 	setClassData(response.data.data))

	//  },[setClassData]);


	return (
		<Layout>
			<div className="container p-4 mb-5">
				<div className="d-flex flex-column justify-content-center ">
					<h4 className="text-start fw-bolder">Offline Classes</h4>
                    {classData?.map((item) => (
						<ClassItem key={item.id} entries={item} />
					))}
				</div>
			</div>
		</Layout>
	);
}