import { Icon } from "@iconify/react";
import styles from "../../styles/ModalAcc.module.css";
import CloseButton from 'react-bootstrap/CloseButton'
import { useRouter } from 'next/router'

export default function ModalTimeout() {
    const router = useRouter()
	return (
        <div className={` ${styles.containerModal} col-10 shadow rounded mb-5 bg-body d-flex position-absolute zindex-modal top-50 start-50 translate-middle shadow-lg bg-body rounded justify-content-center`}>
            <div className={`${styles.modalAccepted} bg-danger p-3 py-4 rounded-3 d-flex flex-column  align-items-center`}>
                <CloseButton className='align-self-end' onClick={() => router.push("/profile/transactions")} />
                <p className="fw-bold fs-5 m-0 text-center text-white">Your Order Out of Time Limit</p>
                <div className=' mt-3'>
                    <p className="text-start  text-white m-0 p-0 text-center">Sorry, your payment has been out of limit. Please re-order your class/membership subcription</p>
                </div>

            </div>
        </div>

        
	);
}