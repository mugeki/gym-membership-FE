import axios from "axios";
import Layout from "../../../../../components/Layout";
// import ClassItem from "../../../../../components/elements/ClassItemOffline";
import PaymentItem from "../../../../../components/elements/PaymentItem";
import styles from "../../../../../styles/ClassItem.module.css";
import NavbarTop from "../../../../../components/elements/NavbarTop";
// import paymentData from "../../../../../mock_data/paymentAccount.json";
import PaymentAccepted from "../../../../../components/elements/PaymentAcc";
import PaymentAccount from "../../../../../components/elements/PaymentAccount";
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { generateAxiosConfig, handleUnauthorized } from "../../../../../utils/helper";

export default function BookClass({ data, error }) {
	const router = useRouter();
    const idClass=router.query.id
	const user = useSelector((state) => state.user);
	const userId=user.id
    const [idActive, setIdActive]=useState(1)
	const [seeModalAcc, setSeeModalAcc]=useState(false)
	const acceptedModal=()=>{
		setSeeModalAcc(true)
	}

	const [paymentData, setPaymentData]=useState()
	useEffect(() => {
		const API_URL = process.env.BE_API_URL_LOCAL;
		axios
			.get(
				`${API_URL}/payment-account`,
				generateAxiosConfig()
			)
			.then((res) => {
				if (res.status === 204) {
					setError("There is no payment account");
				}
				setPaymentData(res.data.data);
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					setPaymentData(error.response.data.meta.messages[0]);
					console.log(error);
				}
			});
	}, [setPaymentData]);
	return (
		<Layout>
            <NavbarTop title={"Book Class"}/>
			{/* <p>{JSON.stringify(paymentData)}</p> */}
			<div className="container p-4 mb-5 d-flex flex-column align-content-center">
				<div className="d-flex flex-row justify-content-between ">
                    {paymentData?.map((item)=> (
						<PaymentItem key={item.id} entries={item} setIdActive={setIdActive} idActive={idActive} />
					))}
				</div>
                <div className={`card p-3 rounded-3 ${styles.bgGrey}`}>
                    <p className="fw-bold mb-0">Transfer to</p>
                    <p className="mb-0">{paymentData[idActive-1]?.name}</p>
                    <p className="">{`${paymentData[idActive-1]?.no_card} (a/n ${paymentData[idActive-1]?.owner})`}</p>
                    <p className="fw-bold mb-0">Description</p>
                    <p className="">{paymentData[idActive-1]?.desc}</p>
                    <p className="text-danger fs-6 warningText">Note : Maximum payment for a book class is 1x24 hours after booking have been placed </p>
                </div>
                <button className={`${styles.button} rounded-3 btn mt-4`} onClick={acceptedModal}>Book and Checkout Class</button>
			</div>
			{
			seeModalAcc?
			<PaymentAccepted title={"Accepted"} message={"please make payment in 1x24 hours after"} hrefTo={`/classes/online`} messageHref={'See Another Classes'} hrefTo_2={`/classes/online`} messageHref_2={'Pay Now'}/>
			: null
			}
			
            
		</Layout>
	);
}