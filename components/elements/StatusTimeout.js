import { Icon } from "@iconify/react";
import styles from "../../styles/ModalAcc.module.css";
import CloseButton from 'react-bootstrap/CloseButton'
import { useRouter } from 'next/router'
import Link from "next/link";
import { Button} from "react-bootstrap";

export default function StatusTimeout() {
    const router = useRouter()
	return (
        <>
        <div className="d-flex bg-body rounded justify-content-center">
            <div className={`p-3 shadow-lg rounded-3 d-flex flex-column col-10  align-items-start mt-6`}>
                <p className="text-primary fw-bold fs-4">Hi!</p>
                <p className="m-0">Sorry, your payment have a timeout limit.</p>
                <p>Please re-order your product</p>
                <div className="d-flex flex-column align-items-center align-self-center">
                    <Link href="/classes" passHref>
                    <Button variant="primary rounded-pill" className="mt-2">See Classes Product</Button>
                    </Link>
                    <Link href="/profile/membership" passHref>
                    <Button variant="primary rounded-pill" className="mt-2">See Membership Product</Button>
                    </Link>
                </div>

            </div>
        </div>
        </>
	);
}