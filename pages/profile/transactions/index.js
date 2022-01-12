import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import dataTransactions from "../../../mock_data/transactions.json";
import TransactionItem from "../../../components/elements/TransactionItem";
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { wrapper } from "../../../store/store";
import { useSelector } from "react-redux";

// export const getServerSideProps = wrapper.getServerSideProps((store) => () => {
// 	console.log(store.getState());
// });

// export async function getServerSideProps() {
// 	// const user = useSelector((state) => state.user);
// 	// const user = localStorage.getItem("persist:root");
// 	// console.log(user);
// 	const API_URL = process.env.BE_API_URL_LOCAL;
// 	let dataMembership, dataClass;
// 	let pageMembership, pageClass;
// 	axios
// 		.get(`${API_URL}/transaction-membership?idUser=${""}`)
// 		.then((res) => {
// 			if (res.status !== 204) {
// 				console.log("member: ", res.data.data);
// 				dataMembership = res.data.data;
// 				pageMembership = res.data.page;
// 			}
// 			return {
// 				props: { error: "No transaction has been made" },
// 			};
// 		})
// 		.catch((error) => {
// 			if (error.response) {
// 				return {
// 					props: { error: error.response.data.meta.messages },
// 				};
// 			}
// 		});

// 	axios
// 		.get(`${API_URL}/transaction-class?idUser=1`)
// 		.then((res) => {
// 			if (res.status !== 204) {
// 				console.log("class: ", res.data.data);
// 				dataClass = res.data.data;
// 				pageClass = res.data.page;
// 			}
// 			return {
// 				props: { error: "No transaction has been made" },
// 			};
// 		})
// 		.catch((error) => {
// 			if (error.response) {
// 				return {
// 					props: { error: error.response.data.meta.messages },
// 				};
// 			}
// 		});

// 	return {
// 		props: { dataMembership, pageMembership, dataClass, pageClass },
// 	};
// }

export default function MySchedule({
	dataMembership,
	pageMembership,
	dataClass,
	pageClass,
	error,
}) {
	// const user = localStorage.getItem("persist:root");
	// console.log(user);
	const [open, setOpen] = useState(false);
	return (
		<Layout>
			<NavbarTop title={"Transactions"} />
			<div className="d-flex flex-column pb-5 mb-5">
				<div className="px-4 mt-4">
					<Button
						onClick={() => setOpen(!open)}
						aria-controls="example-collapse-text"
						aria-expanded={open}
						variant="outline-primary"
						className="me-3"
					>
						Memberships
					</Button>
					<Button
						onClick={() => setOpen(!open)}
						aria-controls="example-collapse-text"
						aria-expanded={open}
						variant="outline-primary"
					>
						Transactions
					</Button>
				</div>

				{dataTransactions.data.map((item) => (
					<TransactionItem key={item.id} entries={item} />
				))}
			</div>
		</Layout>
	);
}
