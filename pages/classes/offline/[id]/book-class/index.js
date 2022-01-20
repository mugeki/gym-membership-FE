import axios from "axios";
import Layout from "../../../../../components/Layout";
// import ClassItem from "../../../../../components/elements/ClassItemOffline";
import PaymentItem from "../../../../../components/elements/PaymentItem";
import styles from "../../../../../styles/ClassItem.module.css";
import NavbarTop from "../../../../../components/elements/NavbarTop";


import {useState} from 'react'
import PaymentAccepted from "../../../../../components/elements/PaymentAcc";
import PaymentAccount from "../../../../../components/elements/PaymentAccount";

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

export default function BookClass({ data, error }) {
    
	const [seeModalAcc, setSeeModalAcc]=useState(false)
	const acceptedModal=()=>{
		setSeeModalAcc(true)
	}
	return (
		<Layout>
            <NavbarTop title={"Book Class"}/>
			<div className="container p-4 mb-5 d-flex flex-column align-content-center">
				<PaymentAccount/>
                <button className={`${styles.button} rounded-3 btn mt-4`} onClick={acceptedModal}>Book and Checkout Class</button>
			</div>
			{
			seeModalAcc?
			<PaymentAccepted title={"Accepted"} message={"please make payment in 1x24 hours after"} hrefTo={`/classes/offline`} messageHref={'See Another Classes'} hrefTo_2={`/classes/online`} messageHref_2={'Pay Now'}/>
			: null
			}
			
            
		</Layout>
	);
}