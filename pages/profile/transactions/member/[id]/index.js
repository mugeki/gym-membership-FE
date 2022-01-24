import NavbarTop from "../../../../../components/elements/NavbarTop";
import Payment from "../../../../../components/elements/Payment";
import Receipt from "../../../../../components/elements/Receipt";
import StatusWaiting from "../../../../../components/elements/SeeStatus";
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
		<>
			<NavbarTop title={title()} />
			<div className="p-4">
				{memberTx === "" ? (
					<p>setLoading </p>
				) : memberTx?.data?.status === "waiting-for-payment" ? (
					<Payment id={idTransactionMember} entries={memberTx?.data} />
				) : memberTx?.data?.status === "accepted" ? (
					<Receipt
						id={idTransactionMember}
						entries={memberTx?.data}
						type={"membership"}
					/>
				) : (
					<StatusWaiting />
				)}
			</div>
		</>
	);
}

// {transactionDetailHandle()}
// <Payment entries={memberTx?.data}/>
// <Receipt id={idTransactionMember} type={"member"}/>
// <StatusWaiting/>
// <p>{memberTx?.data?.product_name}</p>
// <p>tess</p>
