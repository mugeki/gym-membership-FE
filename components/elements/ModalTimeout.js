import { Icon } from "@iconify/react";
import styles from "../../styles/ModalAcc.module.css";
import CloseButton from 'react-bootstrap/CloseButton'
import { useRouter } from 'next/router'

export default function ModalTimeout() {
    const router = useRouter()
	return (
        <div className="d-flex position-absolute top-50 start-50 translate-middle shadow-lg bg-body rounded justify-content-center">
            <div className={`${styles.modalAccepted}  p-3 rounded-3 d-flex flex-column  align-items-center`}>
                <CloseButton className='align-self-end' onClick={() => router.push("/profile/transactions")} />
                <p className="fw-bold fs-4 m-0">Success to Upload Receipt</p>
                {/* <Icon icon="la:check-circle" color="#69ba5b" width="220" height="220" /> */}
                <p className="text-center">Your payment will be check and confirmed in very soon.</p>
                {/* <a className={`${styles.linkTo}`} href={hrefTo}>{messageHref}</a>
                <a className={`${styles.linkTo} m-1`} href={hrefTo_2}>{messageHref_2}</a> */}
            </div>
        </div>

        
	);
}