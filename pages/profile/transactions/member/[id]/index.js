import NavbarTop from "../../../../../components/elements/NavbarTop";
import Layout from "../../../../../components/Layout";
import Payment from "../../../../../components/elements/Payment";
import Receipt from "../../../../../components/elements/Receipt";
import StatusWaiting from "../../../../../components/elements/StatusWaiting";
import StatusTimeout from "../../../../../components/elements/StatusTimeout";
import StatusDecline from "../../../../../components/elements/StatusDecline";
import {
	generateAxiosConfig,
	handleUnauthorized,
} from "../../../../../utils/helper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function TransactionByID({ ID, type }) {
	const user = useSelector((state) => state.user);
	const router = useRouter();
	const idTransactionMember = router.query.id;
	const [memberTx, setMemberTx] = useState();
	const [errorMember, setErrorMember] = useState();
	const title = () => {
		if (memberTx?.status == "accepted") {
			return "Receipt";
		} else {
			if (memberTx?.status == "waiting-for-confirmation") {
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
				`${API_URL}/transaction-membership/user/${idTransactionMember}`,
				generateAxiosConfig()
			)
			.then((res) => {
				if (res.status === 204) {
					setError("No transaction has been made");
				}
				setMemberTx({ data: res.data.data, page: res.data.page });
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					setErrorMember(error.response.data.meta.messages[0]);
					console.log(error);
				}
			});
	}, [setMemberTx, user.id, idTransactionMember]);

	return (
		<Layout>
			<NavbarTop title="Transactions" />
			<div className="p-4">
				{memberTx == null ? (
					<div className="d-flex justify-content-center text-primary align-items-center">
						<div className="spinner-border" role="status"></div>
						<span className="sr-only ms-1">Loading...</span>
					</div>
				) : memberTx?.data?.status === "waiting for payment" ? (
					<Payment
						id={idTransactionMember}
						entries={memberTx?.data}
						type={"membership"}
					/>
				) : memberTx?.data?.status === "accepted" ? (
					<Receipt
						id={idTransactionMember}
						entries={memberTx?.data}
						type={"membership"}
					/>
				) : memberTx?.data?.status === "waiting for confirmation" ? (
					<StatusWaiting />
				) : memberTx?.data?.status === "failed" ? (
					<StatusTimeout />
				) : memberTx?.data?.status === "decline" ? (
					<StatusDecline entries={memberTx?.data} type={"membership"} />
				) : null}
			</div>
		</Layout>
	);
}
