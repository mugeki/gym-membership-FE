import axios from "axios";
import Layout from "../../../../../components/Layout";
// import ClassItem from "../../../../../components/elements/ClassItemOffline";
import PaymentItem from "../../../../../components/elements/PaymentItem";
import styles from "../../../../../styles/ClassItem.module.css";
import NavbarTop from "../../../../../components/elements/NavbarTop";
import paymentData from "../../../../../mock_data/paymentAccount.json";
import {useState} from 'react'

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
    const [idActive, setIdActive]=useState(1)


	return (
		<Layout>
            <NavbarTop title = "Book Class"/>
			<div className="container p-4 mb-5 d-flex flex-column align-content-center">
				<div className="d-flex flex-row justify-content-between ">
                    {paymentData.data.map((item) => (
						<PaymentItem key={item.id} entries={item} setIdActive={setIdActive} />
					))}
				</div>
                <div className="card p-3 rounded-3">
                    <p className="fw-bold mb-0">Transfer to</p>
                    <p className="mb-0">{paymentData.data[idActive-1].name}</p>
                    <p className="">{`${paymentData.data[idActive-1].no_card} (a/n ${paymentData.data[idActive-1].owner})`}</p>
                    <p className="fw-bold mb-0">Description</p>
                    <p className="">{paymentData.data[idActive-1].desc}</p>
                    <p className="text-danger fs-6 warningText">Note : Maximum payment for a book class is 1x24 hours after booking have been placed </p>
                </div>
                <button className={`${styles.button} rounded-3 btn mt-4`}>Book and Checkout Class</button>
			</div>
            
		</Layout>
	);
}