import { Icon } from "@iconify/react";
import styles from "../../styles/ModalTimeout.module.css";
import CloseButton from 'react-bootstrap/CloseButton'
import { useRouter } from 'next/router'
import { Button, Modal } from "react-bootstrap";

export default function TimeoutModal(props) {
    const router = useRouter()
    const hrefTo="/profile/transactions"
	return (
        <Modal
            {...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
        >   
            <Modal.Body className={`d-flex flex-column align-items-center`}>
                    <CloseButton className='align-self-end' onClick={() => router.push(hrefTo)} />
                    <p className="fw-bold fs-5 m-0 text-danger text-center">Your Order Out of Time Limit</p>
                    <div className=' mt-2'>
                        {/* <Icon icon="la:check-circle" color="#69ba5b" width="220" height="220" /> */}
                        <p className="text-start m-0 p-0 text-center">Sorry, your payment has been out of limit. Please re-order your class/membership</p>
                    </div>
            </Modal.Body>
            </Modal>

        
	);
}