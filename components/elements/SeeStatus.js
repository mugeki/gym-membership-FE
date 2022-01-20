import { Icon } from "@iconify/react";
import styles from "../../styles/ModalAcc.module.css";
import CloseButton from 'react-bootstrap/CloseButton'
import { useRouter } from 'next/router'

export default function StatusWaiting({hrefTo}) {
    const router = useRouter()
	return (
        <>
        {/* <NavbarTop title={title}/> */}
        <div className="d-flex bg-body rounded justify-content-center">
            <div className={`p-3 shadow-lg rounded-3 d-flex flex-column col-10  align-items-start mt-6`}>
                <p className="text-primary fw-bold fs-4">Hi!</p>
                <p className="m-0">At the moment your payment still processing to verification.</p>
                <p>Please kindly wait for an update from us</p>
                <p className="m-0">We're sorry for incovenience, </p>
                <p className="m-0">Your Payment will be confirmed in very soon</p>
                {/* <p className="text-center">{message}</p> */}
                {/* <a className={`${styles.linkTo}`} href={hrefTo}>{messageHref}</a> */}
            </div>
        </div>
        </>

        
	);
}