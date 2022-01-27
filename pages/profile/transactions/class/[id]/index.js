import NavbarTop from "../../../../../components/elements/NavbarTop";
import Layout from "../../../../../components/Layout";
import StatusTimeout from "../../../../../components/elements/StatusTimeout";
import Payment from "../../../../../components/elements/Payment";
import Receipt from "../../../../../components/elements/Receipt";
import StatusWaiting from "../../../../../components/elements/StatusWaiting";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
	generateAxiosConfig,
	handleUnauthorized,
} from "../../../../../utils/helper";
import { useRouter } from "next/router";
import StatusDecline from "../../../../../components/elements/StatusDecline";

export default function TransactionByID({ ID, type }) {
	const user = useSelector((state) => state.user);
	const router = useRouter();
	const idTransactionClass = router.query.id;
	const [classTx, setClassTx] = useState("");
	const [errorClass, setErrorClass] = useState();
	useEffect(() => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(
				`${API_URL}/transaction-class/user/${idTransactionClass}`,
				generateAxiosConfig()
			)
			.then((res) => {
				if (res.status === 204) {
					setError("No transaction has been made");
				}
				setClassTx({ data: res.data.data, page: res.data.page });
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					setErrorClass(error.response.data.meta.messages[0]);
					console.log(error);
				}
			});
	}, [setClassTx, user.id, idTransactionClass]);

	return (
		<Layout>
			<NavbarTop title="Transactions" />
			<div className="p-4">
				{classTx === "" ? (
					<div className="d-flex justify-content-center text-primary">
						<div className="spinner-border" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				) : classTx.data.status === "waiting-for-payment" ? (
					<Payment
						id={idTransactionClass}
						entries={classTx.data}
						type={"class"}
					/>
				) : classTx.data.status === "accepted" ? (
					<Receipt
						id={idTransactionClass}
						entries={classTx.data}
						type={"class"}
					/>
				) : classTx?.data?.status === "waiting-for-confirmation" ? (
					<StatusWaiting />
				) : classTx?.data?.status === "failed" ? (
					<StatusTimeout />
				) : classTx?.data?.status === "decline" ? (
					<StatusDecline entries={classTx.data} type={"class"} />
				) : null}
			</div>
		</Layout>
	);
}
