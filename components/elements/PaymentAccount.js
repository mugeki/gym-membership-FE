import styles from "../../styles/Payment.module.css";
import PaymentItem from "./PaymentItem";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { generateAxiosConfig, handleUnauthorized } from "../../utils/helper";

export default function PaymentAccount() {
	const router = useRouter();
	const [idActive, setIdActive] = useState(1);
	const [paymentAccount, setPaymentAccount] = useState();
	const [errorPayment, setErrorPayment] = useState();
	useEffect(() => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(`${API_URL}/payment-account`, generateAxiosConfig())
			.then((res) => {
				if (res.status === 204) {
					setError("There is no payment account");
				}
				setPaymentAccount(res.data.data);
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					setErrorPayment(error.response.data.meta.messages[0]);
					console.log(error);
				}
			});
	}, [setPaymentAccount, router]);
	console.log(paymentAccount, "paymemnt account");
	return (
		<>
			<div className="d-flex flex-row justify-content-between ">
				{paymentAccount?.map((item) => (
					<PaymentItem
						key={item.id}
						entries={item}
						setIdActive={setIdActive}
						idActive={idActive}
					/>
				))}
			</div>
			{paymentAccount != null ? (
				<div className={`card p-3 rounded-3 ${styles.bgGrey}`}>
					<p className="fw-bold mb-0">Transfer to</p>
					<p className="mb-0">{paymentAccount[idActive - 1]?.name}</p>
					<p className="">{`${paymentAccount[idActive - 1]?.no_card} ( ${
						paymentAccount[idActive - 1].owner_name
					})`}</p>
					<p className="fw-bold mb-0">Description</p>
					<p className="">{paymentAccount[idActive - 1]?.desc}</p>
				</div>
			) : null}
		</>
	);
}
