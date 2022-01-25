import NavbarTop from "../../../../../components/elements/NavbarTop";
import Payment from "../../../../../components/elements/Payment";
import Receipt from "../../../../../components/elements/Receipt";
import StatusWaiting from "../../../../../components/elements/SeeStatus";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
	generateAxiosConfig,
	handleUnauthorized,
} from "../../../../../utils/helper";
import { useRouter } from "next/router";
import Head from "next/head";

export default function TransactionByID({ ID, type }) {
	const user = useSelector((state) => state.user);
	const router = useRouter();
	const idTransactionClass = router.query.id;
	const [classTx, setClassTx] = useState("");
	const [errorClass, setErrorClass] = useState();
	const title = () => {
		if (classTx?.status == "accepted") {
			return "Receipt";
		} else {
			if (classTx?.status == "waiting-for-confirmation") {
				return "Transaction Status";
			} else {
				return "Payment";
			}
		}
	};

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
		<>
			<Head>
				<title>Payment | Alta2Gym</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<NavbarTop title={title} />
			{/* <Receipt entries={entries} productType={productType}/> */}
			<div className="p-4">
				{classTx === "" ? (
					<p>setLoading </p>
				) : classTx.data.status === "waiting-for-payment" ? (
					<Payment id={idTransactionClass} entries={classTx.data} />
				) : classTx.data.status === "completed" ? (
					<Receipt
						id={idTransactionClass}
						entries={classTx.data}
						type={"class"}
					/>
				) : (
					<StatusWaiting />
				)}
			</div>
		</>
	);
}
