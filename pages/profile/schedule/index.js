import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import ScheduleItem from "../../../components/elements/ScheduleItem";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { generateAxiosConfig, handleUnauthorized } from "../../../utils/helper";

export default function MySchedule() {
	const user = useSelector((state) => state.user);
	const [classes, setClasses] = useState();
	const [error, setError] = useState();

	useEffect(() => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(
				`${API_URL}/transaction-class/active/${user.id}`,
				generateAxiosConfig()
			)
			.then((res) => {
				if (res.status === 204) {
					setError("You are not participated in any class");
				} else {
					setClasses(res.data.data);
				}
			})
			.catch((error) => {
				handleUnauthorized(error.response);
				console.log(error);
			});
	}, [setClasses, user.id]);

	return (
		<Layout>
			<NavbarTop title={"My Schedule"} />
			<div className="d-flex flex-column pb-5 mb-5">
				{error && <p className="text-center text-light mt-5">{error}</p>}
				{classes?.map((item) => (
					<ScheduleItem key={item.id} entries={item} />
				))}
			</div>
		</Layout>
	);
}
