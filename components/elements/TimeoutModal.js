import { Icon } from "@iconify/react";
import styles from "../../styles/ModalTimeout.module.css";
import CloseButton from 'react-bootstrap/CloseButton'
import { useRouter } from 'next/router'

export default function TimeoutModal() {
    const router = useRouter()
    const hrefTo="/profile/transactions"
	return (
        <div className="d-flex position-absolute  top-50 start-50 translate-middle shadow-lg bg-body rounded justify-content-center">
            <div className={`${styles.modalAccepted} p-3 rounded-3 d-flex flex-column  align-items-center`}>
                <CloseButton className='align-self-end' onClick={() => router.push(hrefTo)} />
                <p className="fw-bold fs-5 m-0 text-danger text-center">Your Order Out of Time Limit</p>
                <div className='col-10 mt-2'>
                    {/* <Icon icon="la:check-circle" color="#69ba5b" width="220" height="220" /> */}
                    <p className="text-start m-0 p-0">Sorry, your payment has been out of limit. Please re-order your class/membership</p>
                </div>

            </div>
        </div>

        
	);
}