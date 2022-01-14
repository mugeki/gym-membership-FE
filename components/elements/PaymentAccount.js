import styles from "../../styles/Payment.module.css";
import PaymentItem from "./PaymentItem";
import {useState} from 'react'
import paymentAccountData from "../../mock_data/paymentAccount.json";

export default function PaymentAccount(){
    const [idActive, setIdActive]=useState(1)
    return(
        <>
            <div className="d-flex flex-row justify-content-between ">
                {paymentAccountData.data.map((item) => (
                    <PaymentItem key={item.id} entries={item} setIdActive={setIdActive} idActive={idActive} />
                ))}
            </div>
            <div className={`card p-3 rounded-3 ${styles.bgGrey}`}>
                <p className="fw-bold mb-0">Transfer to</p>
                <p className="mb-0">{paymentAccountData.data[idActive-1].name}</p>
                <p className="">{`${paymentAccountData.data[idActive-1].no_card} (a/n ${paymentAccountData.data[idActive-1].owner})`}</p>
                <p className="fw-bold mb-0">Description</p>
                <p className="">{paymentAccountData.data[idActive-1].desc}</p>
                {/* <p className="text-danger fs-6 warningText">Note : Maximum payment for a book class is 1x24 hours after booking have been placed </p> */}
            </div>
        </>

    )

}